export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string
          first_name: string
          last_name: string
          subscription_tier: 'free' | 'fan' | 'super-fan' | 'mega-fan'
          device_type: 'mobile' | 'tablet' | 'desktop' | 'tv'
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          first_name: string
          last_name: string
          subscription_tier?: 'free' | 'fan' | 'super-fan' | 'mega-fan'
          device_type?: 'mobile' | 'tablet' | 'desktop' | 'tv'
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          first_name?: string
          last_name?: string
          subscription_tier?: 'free' | 'fan' | 'super-fan' | 'mega-fan'
          device_type?: 'mobile' | 'tablet' | 'desktop' | 'tv'
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      shows: {
        Row: {
          id: string
          title: string
          description: string | null
          genre: string
          release_year: number | null
          total_seasons: number
          total_episodes: number
          status: 'ongoing' | 'completed' | 'cancelled'
          cover_image_url: string | null
          banner_image_url: string | null
          rating: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          genre: string
          release_year?: number | null
          total_seasons?: number
          total_episodes?: number
          status?: 'ongoing' | 'completed' | 'cancelled'
          cover_image_url?: string | null
          banner_image_url?: string | null
          rating?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          genre?: string
          release_year?: number | null
          total_seasons?: number
          total_episodes?: number
          status?: 'ongoing' | 'completed' | 'cancelled'
          cover_image_url?: string | null
          banner_image_url?: string | null
          rating?: number
          created_at?: string
          updated_at?: string
        }
      }
      episodes: {
        Row: {
          id: string
          show_id: string
          season_number: number
          episode_number: number
          title: string
          description: string | null
          duration_minutes: number | null
          video_url: string
          thumbnail_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          show_id: string
          season_number?: number
          episode_number: number
          title: string
          description?: string | null
          duration_minutes?: number | null
          video_url: string
          thumbnail_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          show_id?: string
          season_number?: number
          episode_number?: number
          title?: string
          description?: string | null
          duration_minutes?: number | null
          video_url?: string
          thumbnail_url?: string | null
          created_at?: string
        }
      }
      watch_history: {
        Row: {
          id: string
          user_id: string
          episode_id: string
          progress_seconds: number
          completed: boolean
          last_watched_at: string
        }
        Insert: {
          id?: string
          user_id: string
          episode_id: string
          progress_seconds?: number
          completed?: boolean
          last_watched_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          episode_id?: string
          progress_seconds?: number
          completed?: boolean
          last_watched_at?: string
        }
      }
      subscription_plans: {
        Row: {
          id: string
          name: string
          display_name: string
          price_cents: number
          duration_days: number
          features: string[]
          max_concurrent_streams: number
          hd_quality: boolean
          offline_downloads: boolean
          active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          display_name: string
          price_cents: number
          duration_days: number
          features?: string[]
          max_concurrent_streams?: number
          hd_quality?: boolean
          offline_downloads?: boolean
          active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          display_name?: string
          price_cents?: number
          duration_days?: number
          features?: string[]
          max_concurrent_streams?: number
          hd_quality?: boolean
          offline_downloads?: boolean
          active?: boolean
          created_at?: string
        }
      }
      user_subscriptions: {
        Row: {
          id: string
          user_id: string
          plan_id: string
          stripe_subscription_id: string | null
          status: 'active' | 'cancelled' | 'expired' | 'past_due'
          current_period_start: string
          current_period_end: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          plan_id: string
          stripe_subscription_id?: string | null
          status?: 'active' | 'cancelled' | 'expired' | 'past_due'
          current_period_start: string
          current_period_end: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          plan_id?: string
          stripe_subscription_id?: string | null
          status?: 'active' | 'cancelled' | 'expired' | 'past_due'
          current_period_start?: string
          current_period_end?: string
          created_at?: string
          updated_at?: string
        }
      }
      user_watchlist: {
        Row: {
          id: string
          user_id: string
          show_id: string
          added_at: string
        }
        Insert: {
          id?: string
          user_id: string
          show_id: string
          added_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          show_id?: string
          added_at?: string
        }
      }
      admin_logs: {
        Row: {
          id: string
          admin_user_id: string | null
          action: string
          table_name: string | null
          record_id: string | null
          old_values: any | null
          new_values: any | null
          created_at: string
        }
        Insert: {
          id?: string
          admin_user_id?: string | null
          action: string
          table_name?: string | null
          record_id?: string | null
          old_values?: any | null
          new_values?: any | null
          created_at?: string
        }
        Update: {
          id?: string
          admin_user_id?: string | null
          action?: string
          table_name?: string | null
          record_id?: string | null
          old_values?: any | null
          new_values?: any | null
          created_at?: string
        }
      }
      anime: {
        Row: {
          id: string
          title: string
          description: string
          cover_image: string
          banner_image: string
          release_year: number
          rating: number
          genres: string[]
          status: 'ongoing' | 'completed' | 'upcoming'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          title: string
          description: string
          cover_image: string
          banner_image: string
          release_year: number
          rating: number
          genres: string[]
          status: 'ongoing' | 'completed' | 'upcoming'
          created_at: string
          updated_at: string
        }
        Update: {
          id: string
          title?: string
          description?: string
          cover_image?: string
          banner_image?: string
          release_year?: number
          rating?: number
          genres?: string[]
          status?: 'ongoing' | 'completed' | 'upcoming'
          created_at?: string
          updated_at?: string
        }
      }
      episodes: {
        Row: {
          id: string
          anime_id: string
          episode_number: number
          title: string
          description: string
          video_url: string
          thumbnail_url: string
          duration: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          anime_id: string
          episode_number: number
          title: string
          description: string
          video_url: string
          thumbnail_url: string
          duration: number
          created_at: string
          updated_at: string
        }
        Update: {
          id: string
          anime_id: string
          episode_number: number
          title?: string
          description?: string
          video_url?: string
          thumbnail_url?: string
          duration?: number
          created_at?: string
          updated_at?: string
        }
      }
      watchlist: {
        Row: {
          id: string
          user_id: string
          anime_id: string
          created_at: string
        }
        Insert: {
          id: string
          user_id: string
          anime_id: string
          created_at: string
        }
        Update: never
      }
      watch_history: {
        Row: {
          id: string
          user_id: string
          episode_id: string
          progress: number
          last_watched: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          user_id: string
          episode_id: string
          progress: number
          last_watched: string
          created_at: string
          updated_at: string
        }
        Update: {
          id: string
          user_id: string
          episode_id: string
          progress?: number
          last_watched?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// Utility types
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type InsertTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type UpdateTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']

// Specific entity types
export type UserProfile = Tables<'user_profiles'>
export type Show = Tables<'shows'>
export type Episode = Tables<'episodes'>
export type WatchHistory = Tables<'watch_history'>
export type SubscriptionPlan = Tables<'subscription_plans'>
export type UserSubscription = Tables<'user_subscriptions'>
export type UserWatchlist = Tables<'user_watchlist'>
export type AdminLog = Tables<'admin_logs'>

// Extended types with relations
export interface ShowWithEpisodes extends Show {
  episodes: Episode[]
}

export interface UserWithProfile {
  id: string
  email: string
  profile: UserProfile
  subscription?: UserSubscription
}

export interface EpisodeWithShow extends Episode {
  show: Show
}

export interface WatchHistoryWithDetails extends WatchHistory {
  episode: EpisodeWithShow
}

export type Anime = {
  id: string;
  title: string;
  description: string;
  cover_image: string;
  banner_image: string;
  release_year: number;
  rating: number;
  genres: string[];
  status: 'ongoing' | 'completed' | 'upcoming';
  created_at: string;
  updated_at: string;
};

export type Watchlist = {
  id: string;
  user_id: string;
  anime_id: string;
  created_at: string;
};

export type WatchHistory = {
  id: string;
  user_id: string;
  episode_id: string;
  progress: number;
  last_watched: string;
  created_at: string;
  updated_at: string;
};
