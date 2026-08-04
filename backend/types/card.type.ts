import type { Label } from "./label.type"

export interface Card {
  id: string
  column_id: string
  title: string
  description: string | null
  position: number
  assignee_id: string | null
  due_date: Date | null
  created_at: Date
  updated_at: Date
}

export interface CardResponse {
  id: string
  column_id: string
  title: string
  description: string | null
  position: number
  assignee_id: string | null
  due_date: Date | null
  created_at: Date
  updated_at: Date
  labels?: Label[]
}

export interface CreateCardInput {
  column_id: string
  title: string
  description?: string
  position?: number
  assignee_id?: string
  due_date?: Date
}

export interface UpdateCardInput {
  title?: string
  description?: string
  position?: number
  column_id?: string
  assignee_id?: string
  due_date?: Date
}
