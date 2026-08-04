import type { Card } from "./card.type"

export interface Column {
  id: string
  board_id: string
  name: string
  position: number
  created_at: Date
  updated_at: Date
}

export interface ColumnResponse {
  id: string
  board_id: string
  name: string
  position: number
  created_at: Date
  updated_at: Date
  cards?: Card[]
}

export interface CreateColumnInput {
  board_id: string
  name: string
  position?: number
}

export interface UpdateColumnInput {
  name?: string
  position?: number
}
