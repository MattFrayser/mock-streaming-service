'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { createSupabaseClient } from '@/lib/supabase'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  PlayCircle, 
  Tv, 
  Plus,
  Edit,
  Eye,
  Shield,
  Trash2,
  Save,
  Search
} from 'lucide-react'

interface Show {
  id: string
  title: string
  description: string
  genre: string
  release_year: number
  total_seasons: number
  total_episodes: number
  status: string
  cover_image_url: string
  rating: number
}

interface Episode {
  id: string
  show_id: string
  season_number: number
  episode_number: number
  title: string
  description: string
  video_url: string
  duration_minutes: number
}

interface UserProfile {
  id: string
  first_name: string
  last_name: string
  subscription_tier: string
  device_type: string
  created_at: string
}

export default function AdminPage() {
  const { user, profile } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [shows, setShows] = useState<Show[]>([])
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const [users, setUsers] = useState<UserProfile[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  
  const supabase = createSupabaseClient()

  // Check if user is admin
  const isAdmin = profile?.subscription_tier === 'mega-fan' || user?.email === 'admin@admin.com'

  useEffect(() => {
    if (isAdmin) {
      fetchData()
    }
  }, [isAdmin])

  const fetchData = async () => {
    setLoading(true)
    try {
      // Fetch shows
      const { data: showsData } = await supabase
        .from('shows')
        .select('*')
        .order('created_at', { ascending: false })

      // Fetch episodes
      const { data: episodesData } = await supabase
        .from('episodes')
        .select('*')
        .order('created_at', { ascending: false })

      // Fetch user profiles
      const { data: usersData } = await supabase
        .from('user_profiles')
        .select('*')
        .order('created_at', { ascending: false })

      setShows(showsData || [])
      setEpisodes(episodesData || [])
      setUsers(usersData || [])
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteShow = async (showId: string) => {
    if (confirm('Are you sure you want to delete this show?')) {
      try {
        const { error } = await supabase
          .from('shows')
          .delete()
          .eq('id', showId)

        if (!error) {
          setShows(shows.filter(show => show.id !== showId))
        }
      } catch (error) {
        console.error('Error deleting show:', error)
      }
    }
  }

  const deleteEpisode = async (episodeId: string) => {
    if (confirm('Are you sure you want to delete this episode?')) {
      try {
        const { error } = await supabase
          .from('episodes')
          .delete()
          .eq('id', episodeId)

        if (!error) {
          setEpisodes(episodes.filter(episode => episode.id !== episodeId))
        }
      } catch (error) {
        console.error('Error deleting episode:', error)
      }
    }
  }

  const AddShowForm = () => {
    const [formData, setFormData] = useState({
      title: '',
      description: '',
      genre: '',
      release_year: new Date().getFullYear(),
      cover_image_url: '',
      rating: 0
    })

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      try {
        const { data, error } = await supabase
          .from('shows')
          .insert([formData])
          .select()

        if (!error && data) {
          setShows([data[0], ...shows])
          setFormData({
            title: '',
            description: '',
            genre: '',
            release_year: new Date().getFullYear(),
            cover_image_url: '',
            rating: 0
          })
          alert('Show added successfully!')
        }
      } catch (error) {
        console.error('Error adding show:', error)
        alert('Error adding show')
      }
    }

    return (
      <Card>
        <CardHeader>
          <CardTitle>Add New Show</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Show Title"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
            <Input
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
            />
            <Input
              placeholder="Genre"
              value={formData.genre}
              onChange={(e) => setFormData({...formData, genre: e.target.value})}
              required
            />
            <Input
              type="number"
              placeholder="Release Year"
              value={formData.release_year}
              onChange={(e) => setFormData({...formData, release_year: parseInt(e.target.value)})}
              required
            />
            <Input
              placeholder="Cover Image URL"
              value={formData.cover_image_url}
              onChange={(e) => setFormData({...formData, cover_image_url: e.target.value})}
            />
            <Input
              type="number"
              step="0.1"
              placeholder="Rating (0-10)"
              value={formData.rating}
              onChange={(e) => setFormData({...formData, rating: parseFloat(e.target.value)})}
            />
            <Button type="submit" variant="gradient" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Show
            </Button>
          </form>
        </CardContent>
      </Card>
    )
  }

  const AddEpisodeForm = () => {
    const [formData, setFormData] = useState({
      show_id: '',
      season_number: 1,
      episode_number: 1,
      title: '',
      description: '',
      video_url: '',
      duration_minutes: 24
    })

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      try {
        const { data, error } = await supabase
          .from('episodes')
          .insert([formData])
          .select()

        if (!error && data) {
          setEpisodes([data[0], ...episodes])
          setFormData({
            show_id: '',
            season_number: 1,
            episode_number: 1,
            title: '',
            description: '',
            video_url: '',
            duration_minutes: 24
          })
          alert('Episode added successfully!')
        }
      } catch (error) {
        console.error('Error adding episode:', error)
        alert('Error adding episode')
      }
    }

    return (
      <Card>
        <CardHeader>
          <CardTitle>Add New Episode</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <select
              className="w-full p-2 border rounded-md bg-background"
              value={formData.show_id}
              onChange={(e) => setFormData({...formData, show_id: e.target.value})}
              required
            >
              <option value="">Select Show</option>
              {shows.map(show => (
                <option key={show.id} value={show.id}>{show.title}</option>
              ))}
            </select>
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="number"
                placeholder="Season Number"
                value={formData.season_number}
                onChange={(e) => setFormData({...formData, season_number: parseInt(e.target.value)})}
                required
              />
              <Input
                type="number"
                placeholder="Episode Number"
                value={formData.episode_number}
                onChange={(e) => setFormData({...formData, episode_number: parseInt(e.target.value)})}
                required
              />
            </div>
            <Input
              placeholder="Episode Title"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
            <Input
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
            <Input
              placeholder="Video URL"
              value={formData.video_url}
              onChange={(e) => setFormData({...formData, video_url: e.target.value})}
              required
            />
            <Input
              type="number"
              placeholder="Duration (minutes)"
              value={formData.duration_minutes}
              onChange={(e) => setFormData({...formData, duration_minutes: parseInt(e.target.value)})}
            />
            <Button type="submit" variant="gradient" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Episode
            </Button>
          </form>
        </CardContent>
      </Card>
    )
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-96">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-6 h-6" />
              <span>Access Denied</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              You don't have permission to access the admin panel.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const filteredShows = shows.filter(show => 
    show.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    show.genre.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredEpisodes = episodes.filter(episode =>
    episode.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredUsers = users.filter(user =>
    `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gradient mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage your anime streaming platform</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="shows">Shows</TabsTrigger>
          <TabsTrigger value="episodes">Episodes</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Shows</CardTitle>
                <Tv className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{shows.length}</div>
                <p className="text-xs text-muted-foreground">Active shows in database</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Episodes</CardTitle>
                <PlayCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{episodes.length}</div>
                <p className="text-xs text-muted-foreground">Episodes available</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{users.length}</div>
                <p className="text-xs text-muted-foreground">Registered users</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="shows" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>All Shows</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Search className="w-4 h-4" />
                      <Input
                        placeholder="Search shows..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-64"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredShows.map(show => (
                      <div key={show.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <h3 className="font-semibold">{show.title}</h3>
                          <p className="text-sm text-muted-foreground">{show.genre} • {show.release_year}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge variant="secondary">{show.status}</Badge>
                            <span className="text-xs">⭐ {show.rating}/10</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => deleteShow(show.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            <div>
              <AddShowForm />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="episodes" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>All Episodes</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Search className="w-4 h-4" />
                      <Input
                        placeholder="Search episodes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-64"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredEpisodes.map(episode => {
                      const show = shows.find(s => s.id === episode.show_id)
                      return (
                        <div key={episode.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <h3 className="font-semibold">{episode.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {show?.title} • S{episode.season_number}E{episode.episode_number}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {episode.duration_minutes} minutes
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => deleteEpisode(episode.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
            <div>
              <AddEpisodeForm />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>All Users</CardTitle>
                <div className="flex items-center space-x-2">
                  <Search className="w-4 h-4" />
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredUsers.map(user => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold">{user.first_name} {user.last_name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {user.subscription_tier} • {user.device_type}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Joined: {new Date(user.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={user.subscription_tier === 'free' ? 'secondary' : 'default'}>
                        {user.subscription_tier}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
