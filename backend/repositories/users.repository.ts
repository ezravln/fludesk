import { db } from "@/config/database"
import type { User } from "@/types/user.type"

export async function findAll(): Promise<User[]> {
  const res = await db.query<User>(`SELECT id, name, email, avatar_file_id, created_at, updated_at FROM users`)
  return res.rows
}

export async function findById(id: string): Promise<User | null> {
  const result = await db.query<User>(
    `SELECT id, name, email, avatar_file_id, created_at, updated_at FROM users WHERE id = $1 LIMIT 1`,
    [id]
  )
  return result.rows[0] ?? null
}

export async function findByEmail(email: string): Promise<User | null> {
  const result = await db.query<User>(
    `SELECT * FROM users WHERE email = $1 LIMIT 1`,
    [email]
  )
  return result.rows[0] ?? null
}

export async function findByIdWithPassword(id: string): Promise<User | null> {
  const result = await db.query<User>(
    `SELECT * FROM users WHERE id = $1 LIMIT 1`,
    [id]
  )
  return result.rows[0] ?? null
}

export async function insert(name: string, email: string, password: string): Promise<User | null> {
  const res = await db.query<User>(
    `INSERT INTO users (name, email, password)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [name, email, password]
  );

  return res.rows[0]
}

export async function update(name: string, password: string, avatar_file_id: string | null, id: string): Promise<User | null> {
  const res = await db.query<User>(
    `UPDATE users SET
     name = $1, password = $2, avatar_file_id = $3, updated_at = NOW()
     WHERE id = $4
     RETURNING *`,
    [name, password, avatar_file_id, id]
  )

  return res.rows[0] ?? null
}

export async function remove(id: string) {
  await db.query(
    `DELETE FROM users WHERE id = $1`,
    [id]
  )
}
