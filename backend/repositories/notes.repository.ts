import { db } from "@/config/database"
import type { Note } from "@/types/note.type"

export async function findAll(): Promise<Note[]> {
  const res = await db.query(`
    SELECT id, user_id, title, note, created_at, updated_at
    FROM notes
    ORDER BY created_at DESC
  `)

  return res.rows
}

export async function findNotesByUserId(user_id: string): Promise<Note[]> {
  const res = await db.query(`
    SELECT id, user_id, title, note, created_at, updated_at
    FROM notes
    WHERE user_id = $1
    ORDER BY created_at DESC
  `, [user_id])

  return res.rows
}
export async function findNotesById(id: string): Promise<Note | null> {
  const res = await db.query(`
    SELECT id, user_id, title, note, created_at, updated_at
    FROM notes
    WHERE id = $1
    LIMIT 1
  `, [id])

  return res.rows[0]
}

export async function insert(
  user_id: string,
  title: string,
  note?: string
): Promise<Note> {
  const res = await db.query(`
    INSERT INTO notes (user_id, title, note)
    VALUES ($1, $2, $3)
    RETURNING id, user_id, title, note, created_at, updated_at
  `, [user_id, title, note ?? null])

  return res.rows[0]
}

export async function update(
  id: string,
  title: string,
  note?: string
): Promise<Note | undefined> {
  const res = await db.query(`
    UPDATE notes
    SET
      title = $1,
      note = $2,
      updated_at = NOW()
    WHERE id = $3
    RETURNING id, user_id, title, note, created_at, updated_at
  `, [title, note ?? null, id])

  return res.rows[0]
}

export async function updatePatch(
  id: string,
  data: {
    title?: string
    note?: string
  }
): Promise<Note | null> {
  const fields: string[] = []
  const values: unknown[] = []
  let index = 1

  if (data.title !== undefined) {
    fields.push(`title = $${index++}`)
    values.push(data.title)
  }

  if (data.note !== undefined) {
    fields.push(`note = $${index++}`)
    values.push(data.note)
  }

  if (fields.length === 0) {
    return findNotesById(id)
  }

  fields.push(`updated_at = NOW()`)

  values.push(id)

  const res = await db.query(`
    UPDATE notes
    SET ${fields.join(", ")}
    WHERE id = $${index}
    RETURNING id, user_id, title, note, created_at, updated_at
  `, values)

  return res.rows[0]
}

export async function remove(id: string): Promise<Note | null> {
  const res = await db.query(`
    DELETE FROM notes
    WHERE id = $1
    RETURNING id, user_id, title, note, created_at, updated_at
  `, [id])

  return res.rows[0]
}
