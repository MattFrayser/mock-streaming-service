import { createClient } from '@supabase/supabase-js'
import { createClientComponentClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import type { Database } from '../types/database'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Client-side Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Client component client (for use in components)
export const createSupabaseClient = () => 
  createClientComponentClient<Database>()

// Server component client (for use in server components)
export const createSupabaseServerClient = () => 
  createServerComponentClient<Database>({ cookies })

// Admin client (service role for admin operations)
export const getServiceSupabase = () => {
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
  return createClient<Database>(supabaseUrl, supabaseServiceKey)
}

// Database helper functions
export class DatabaseError extends Error {
  constructor(message: string, public code?: string) {
    super(message)
    this.name = 'DatabaseError'
  }
}

export const handleDatabaseError = (error: any): never => {
  console.error('Database error:', error)
  throw new DatabaseError(
    error.message || 'An unexpected database error occurred',
    error.code
  )
}

// Query helpers
export const withErrorHandling = async <T>(
  operation: () => Promise<{ data: T | null; error: any }>
): Promise<T> => {
  const { data, error } = await operation()
  
  if (error) {
    handleDatabaseError(error)
  }
  
  if (!data) {
    throw new DatabaseError('No data returned from query')
  }
  
  return data
}

// Pagination helper
export interface PaginationParams {
  page?: number
  limit?: number
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

export const paginate = (
  page: number = 1,
  limit: number = 20
): { from: number; to: number } => {
  const from = (page - 1) * limit
  const to = from + limit - 1
  return { from, to }
}
