/**
 * Laravel Model Types
 * 
 * Add your Laravel model types here
 */

export interface User {
  id: number
  name: string
  email: string
  email_verified_at: string | null
  created_at: string
  updated_at: string
}

export interface Post {
  id: number
  title: string
  slug: string
  content: string
  excerpt?: string
  published_at: string | null
  created_at: string
  updated_at: string
}

// Add more models as needed
