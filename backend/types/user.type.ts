import type { Media } from "./media.type"

export interface User {
  id: string
  name: string
  email: string
  password: string
  avatar_file_id: string | null
  created_at: Date
  updated_at: Date
}

export interface UserResponse {
  id: string
  name: string
  email: string
  avatar: Media | null
  created_at: Date
  updated_at: Date
}
