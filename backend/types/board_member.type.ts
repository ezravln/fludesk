export interface BoardMember {
  id: string
  board_id: string
  user_id: string
  role: string
  created_at: Date
}

export interface BoardMemberResponse {
  id: string
  board_id: string
  user_id: string
  role: string
  created_at: Date
  user?: {
    id: string
    name: string
    email: string
  }
}

export interface AddBoardMemberInput {
  board_id: string
  user_id: string
  role?: string
}

export interface UpdateBoardMemberInput {
  role?: string
}
