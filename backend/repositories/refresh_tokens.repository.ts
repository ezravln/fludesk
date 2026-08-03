import { db } from "@/config/database"

export async function findByToken(token: string) {
  const result = await db.query(
    `SELECT * FROM refresh_tokens WHERE token = $1 LIMIT 1`,
    [token]
  )
  return result.rows[0] ?? null
}

export async function insert(userId: string, token: string, expiresAt: Date) {
  const res = await db.query(
    `INSERT INTO refresh_tokens (user_id, token, expires_at)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [userId, token, expiresAt]
  )

  return res.rows[0]
}

export async function removeByToken(token: string) {
  await db.query(
    `DELETE FROM refresh_tokens WHERE token = $1`,
    [token]
  )
}

export async function removeByUserId(userId: string) {
  await db.query(
    `DELETE FROM refresh_tokens WHERE user_id = $1`,
    [userId]
  )
}

export async function deleteExpiredTokens() {
  await db.query(
    `DELETE FROM refresh_tokens WHERE expires_at < NOW()`
  )
}
