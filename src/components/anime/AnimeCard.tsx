'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Show, Episode } from '@/types/database'
import { formatDuration, generateImagePlaceholder } from '@/lib/utils'
import { Play, Plus, Check, Star, Calendar, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

interface AnimeCardProps {
  show: Show
  className?: string
  size?: 'sm' | 'md' | 'lg'
  showInfo?: boolean
  onWatchlistToggle?: (showId: string, isInWatchlist: boolean) => void
  isInWatchlist?: boolean
}

export function AnimeCard({ 
  show, 
  className, 
  size = 'md', 
  showInfo = true,
  onWatchlistToggle,
  isInWatchlist = false 
}: AnimeCardProps) {
  const [imageError, setImageError] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const sizeClasses = {
    sm: 'w-32 h-44',
    md: 'w-48 h-64',
    lg: 'w-64 h-80'
  }

  const handleWatchlistClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onWatchlistToggle?.(show.id, !isInWatchlist)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ongoing':
        return 'success'
      case 'completed':
        return 'default'
      case 'cancelled':
        return 'destructive'
      default:
        return 'secondary'
    }
  }

  return (
    <motion.div
      className={`group relative ${className}`}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-white/10 hover:border-primary/50 transition-all duration-300">
        <CardContent className="p-0">
          {/* Image Container */}
          <div className={`relative ${sizeClasses[size]} overflow-hidden`}>
            <Link href={`/anime/${show.id}`}>
              <Image
                src={imageError ? generateImagePlaceholder(300, 400, show.title) : (show.cover_image_url || generateImagePlaceholder(300, 400, show.title))}
                alt={show.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                onError={() => setImageError(true)}
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button variant="gradient" size="icon" className="rounded-full shadow-lg">
                  <Play className="w-5 h-5 fill-current" />
                </Button>
              </div>

              {/* Status Badge */}
              <div className="absolute top-2 left-2">
                <Badge variant={getStatusColor(show.status) as any} className="text-xs">
                  {show.status}
                </Badge>
              </div>

              {/* Rating */}
              {show.rating > 0 && (
                <div className="absolute top-2 right-2 flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-medium text-white">{show.rating.toFixed(1)}</span>
                </div>
              )}

              {/* Watchlist Button */}
              {onWatchlistToggle && (
                <motion.div 
                  className="absolute bottom-2 right-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button
                    variant="glass"
                    size="icon"
                    onClick={handleWatchlistClick}
                    className="rounded-full"
                  >
                    {isInWatchlist ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </Button>
                </motion.div>
              )}
            </Link>
          </div>

          {/* Info Section */}
          {showInfo && (
            <div className="p-3 space-y-2">
              <Link href={`/anime/${show.id}`}>
                <h3 className="font-semibold text-sm leading-tight line-clamp-2 hover:text-primary transition-colors">
                  {show.title}
                </h3>
              </Link>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>{show.release_year}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{show.total_episodes} eps</span>
                </div>
              </div>

              <div className="text-xs text-muted-foreground">
                <Badge variant="outline" className="text-xs">
                  {show.genre}
                </Badge>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

// AnimeGrid component
interface AnimeGridProps {
  shows: Show[]
  title?: string
  loading?: boolean
  onWatchlistToggle?: (showId: string, isInWatchlist: boolean) => void
  watchlistIds?: Set<string>
  className?: string
}

export function AnimeGrid({ 
  shows, 
  title, 
  loading = false, 
  onWatchlistToggle, 
  watchlistIds = new Set(),
  className 
}: AnimeGridProps) {
  if (loading) {
    return (
      <div className={className}>
        {title && (
          <h2 className="text-2xl font-bold mb-6 text-gradient">{title}</h2>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-muted rounded-lg aspect-[3/4] mb-2" />
              <div className="h-4 bg-muted rounded mb-1" />
              <div className="h-3 bg-muted rounded w-3/4" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (shows.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="text-muted-foreground">
          <p className="text-lg mb-2">No anime found</p>
          <p className="text-sm">Try adjusting your search or filters</p>
        </div>
      </div>
    )
  }

  return (
    <div className={className}>
      {title && (
        <h2 className="text-2xl font-bold mb-6 text-gradient">{title}</h2>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {shows.map((show) => (
          <AnimeCard
            key={show.id}
            show={show}
            onWatchlistToggle={onWatchlistToggle}
            isInWatchlist={watchlistIds.has(show.id)}
          />
        ))}
      </div>
    </div>
  )
}

// EpisodeCard component
interface EpisodeCardProps {
  episode: Episode
  show: Show
  onPlay?: (episodeId: string) => void
  progress?: number
  className?: string
}

export function EpisodeCard({ 
  episode, 
  show, 
  onPlay, 
  progress = 0, 
  className 
}: EpisodeCardProps) {
  const [imageError, setImageError] = useState(false)

  const handlePlay = () => {
    onPlay?.(episode.id)
  }

  return (
    <Card className={`group overflow-hidden bg-card/50 backdrop-blur-sm border-white/10 hover:border-primary/50 transition-all duration-300 ${className}`}>
      <CardContent className="p-0">
        <div className="flex">
          {/* Thumbnail */}
          <div className="relative w-32 h-20 flex-shrink-0">
            <Image
              src={imageError ? generateImagePlaceholder(200, 120, `S${episode.season_number}E${episode.episode_number}`) : (episode.thumbnail_url || generateImagePlaceholder(200, 120, `S${episode.season_number}E${episode.episode_number}`))}
              alt={episode.title}
              fill
              className="object-cover"
              onError={() => setImageError(true)}
            />
            
            {/* Progress Bar */}
            {progress > 0 && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/50">
                <div 
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}

            {/* Play Overlay */}
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button variant="glass" size="icon" onClick={handlePlay}>
                <Play className="w-4 h-4 fill-current" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-4 space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-semibold text-sm line-clamp-1">{episode.title}</h4>
                <p className="text-xs text-muted-foreground">
                  Season {episode.season_number} • Episode {episode.episode_number}
                </p>
              </div>
              {episode.duration_minutes && (
                <span className="text-xs text-muted-foreground">
                  {formatDuration(episode.duration_minutes)}
                </span>
              )}
            </div>
            
            {episode.description && (
              <p className="text-xs text-muted-foreground line-clamp-2">
                {episode.description}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
