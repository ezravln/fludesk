import { db } from "@/config/database"

const TABLE_NAME = "boards"

export async function createBoardsTable() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
    )`)

    console.log(`[Migration] Successfully created ${TABLE_NAME} table.`)
  } catch (error: any) {
    console.error(`[Migration] Failed to create ${TABLE_NAME} table.`)
    console.error(error)
  }
}
