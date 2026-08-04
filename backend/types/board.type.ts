export interface Board {
  id: string
  owner_id: string
  name: string
  description: string | null
  created_at: Date
  updated_at: Date
}

export interface BoardResponse {
  id: string
  owner_id: string
  name: string
  description: string | null
  created_at: Date
  updated_at: Date
  member_count?: number
}

export interface CreateBoardInput {
  name: string
  description?: string
}

export interface UpdateBoardInput {
  name?: string
  description?: string
}
