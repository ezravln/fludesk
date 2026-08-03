import { db } from "@/config/database"
import type { Media } from "@/types/media.type"

export async function findById(id: string): Promise<Media | null> {
  const res = await db.query<Media>(
    `SELECT * FROM media WHERE id = $1 LIMIT 1`,
    [id]
  )

  return res.rows[0] ?? null
}

export async function insert(file: Omit<Media, 'id'>): Promise<Media> {
  const res = await db.query<Media>(
    `INSERT INTO media (
      filename,
      original_filename,
      mime_type,
      size,
      storage_key,
      url
    )
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *`,
    [
      file.filename,
      file.original_filename,
      file.mime_type,
      file.size,
      file.storage_key,
      file.url
    ]
  )

  return res.rows[0]
}

export async function remove(id: string) {
  await db.query(
    `DELETE FROM media WHERE id = $1`,
    [id]
  )
}
