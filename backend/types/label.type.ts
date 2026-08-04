export interface Label {
  id: string
  board_id: string
  name: string
  color: string
  created_at: Date
}

export interface LabelResponse {
  id: string
  board_id: string
  name: string
  color: string
  created_at: Date
}

export interface CreateLabelInput {
  board_id: string
  name: string
  color: string
}

export interface UpdateLabelInput {
  name?: string
  color?: string
}
