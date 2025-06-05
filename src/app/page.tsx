'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AnimeGrid } from '@/components/anime/AnimeCard'
import { Show } from '@/types/database'
import { createSupabaseClient } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import { Play, TrendingUp, Clock, Star, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function HomePage() {
  const [featuredShow, setFeaturedShow] = useState<Show | null>(null)
  const [trendingShows, setTrendingShows] = useState<Show[]>([])
  const [recentShows, setRecentShows] = useState<Show[]>([])
  const [topRatedShows, setTopRatedShows] = useState<Show[]>([])
  const [loading, setLoading] = useState(true)
  const [watchlistIds, setWatchlistIds] = useState<Set<string>>(new Set())

  const { user } = useAuth()
  const supabase = createSupabaseClient()

  useEffect(() => {
    fetchHomeData()
    if (user) {
      fetchUserWatchlist()
    }
  }, [user])

  const fetchHomeData = async () => {
    try {
      setLoading(true)

      // Fetch featured show (highest rated ongoing)
      const { data: featured } = await supabase
        .from('shows')
        .select('*')
        .eq('status', 'ongoing')
        .order('rating', { ascending: false })
        .limit(1)
        .single()

      if (featured) {
        setFeaturedShow(featured)
      }

      // Fetch trending shows (recent with high ratings)
      const { data: trending } = await supabase
        .from('shows')
        .select('*')
        .gte('rating', 7.0)
        .order('created_at', { ascending: false })
        .limit(12)

      if (trending) {
        setTrendingShows(trending)
      }

      // Fetch recent shows
      const { data: recent } = await supabase
        .from('shows')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(12)

      if (recent) {
        setRecentShows(recent)
      }

      // Fetch top rated shows
      const { data: topRated } = await supabase
        .from('shows')
        .select('*')
        .order('rating', { ascending: false })
        .limit(12)

      if (topRated) {
        setTopRatedShows(topRated)
      }

    } catch (error) {
      console.error('Error fetching home data:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchUserWatchlist = async () => {
    if (!user) return

    try {
      const { data } = await supabase
        .from('user_watchlist')
        .select('show_id')
        .eq('user_id', user.id)

      if (data) {
        setWatchlistIds(new Set(data.map(item => item.show_id)))
      }
    } catch (error) {
      console.error('Error fetching watchlist:', error)
    }
  }

  const handleWatchlistToggle = async (showId: string, isInWatchlist: boolean) => {
    if (!user) return

    try {
      if (isInWatchlist) {
        const { error } = await supabase
          .from('user_watchlist')
          .delete()
          .eq('user_id', user.id)
          .eq('show_id', showId)

        if (!error) {
          setWatchlistIds(prev => {
            const newSet = new Set(prev)
            newSet.delete(showId)
            return newSet
          })
        }
      } else {
        const { error } = await supabase
          .from('user_watchlist')
          .insert({
            user_id: user.id,
            show_id: showId
          })

        if (!error) {
          setWatchlistIds(prev => new Set(prev).add(showId))
        }
      }
    } catch (error) {
      console.error('Error updating watchlist:', error)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {featuredShow && (
        <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={featuredShow.banner_image_url || featuredShow.cover_image_url || '/placeholder-banner.jpg'}
              alt={featuredShow.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-10 container mx-auto px-4 text-white">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-4 text-gradient">
                {featuredShow.title}
              </h1>
              <p className="text-lg md:text-xl mb-6 text-gray-200 leading-relaxed">
                {featuredShow.description}
              </p>
              
              <div className="flex items-center space-x-6 mb-8">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{featuredShow.rating.toFixed(1)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>{featuredShow.total_episodes} episodes</span>
                </div>
                <div className="px-3 py-1 bg-primary/20 rounded-full text-sm font-medium">
                  {featuredShow.genre}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="gradient" size="lg" className="group" asChild>
                  <Link href={`/anime/${featuredShow.id}`}>
                    <Play className="w-5 h-5 mr-2 fill-current" />
                    Watch Now
                  </Link>
                </Button>
                <Button 
                  variant="glass" 
                  size="lg"
                  onClick={() => handleWatchlistToggle(featuredShow.id, watchlistIds.has(featuredShow.id))}
                >
                  {watchlistIds.has(featuredShow.id) ? 'Remove from Watchlist' : 'Add to Watchlist'}
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Content Sections */}
      <main className="container mx-auto px-4 py-12 space-y-16">
        {/* Trending Now */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-6 h-6 text-primary" />
              <h2 className="text-3xl font-bold text-gradient">Trending Now</h2>
            </div>
            <Button variant="ghost" className="group" asChild>
              <Link href="/trending">
                View All
                <ChevronRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
          
          <AnimeGrid
            shows={trendingShows}
            loading={loading}
            onWatchlistToggle={user ? handleWatchlistToggle : undefined}
            watchlistIds={watchlistIds}
          />
        </motion.section>

        {/* Recently Added */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <Clock className="w-6 h-6 text-primary" />
              <h2 className="text-3xl font-bold text-gradient">Recently Added</h2>
            </div>
            <Button variant="ghost" className="group" asChild>
              <Link href="/recent">
                View All
                <ChevronRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
          
          <AnimeGrid
            shows={recentShows}
            loading={loading}
            onWatchlistToggle={user ? handleWatchlistToggle : undefined}
            watchlistIds={watchlistIds}
          />
        </motion.section>

        {/* Top Rated */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <Star className="w-6 h-6 text-primary" />
              <h2 className="text-3xl font-bold text-gradient">Top Rated</h2>
            </div>
            <Button variant="ghost" className="group" asChild>
              <Link href="/top-rated">
                View All
                <ChevronRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
          
          <AnimeGrid
            shows={topRatedShows}
            loading={loading}
            onWatchlistToggle={user ? handleWatchlistToggle : undefined}
            watchlistIds={watchlistIds}
          />
        </motion.section>

        {/* Call to Action for Non-Authenticated Users */}
        {!user && (
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center py-16"
          >
            <div className="max-w-2xl mx-auto">
              <h2 className="text-4xl font-bold mb-4 text-gradient">
                Ready to Start Watching?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of anime fans and discover your next favorite series.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="gradient" size="lg" asChild>
                  <Link href="/auth?mode=signup">
                    Start Free Trial
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/pricing">
                    View Plans
                  </Link>
                </Button>
              </div>
            </div>
          </motion.section>
        )}
      </main>
    </div>
  )
}
