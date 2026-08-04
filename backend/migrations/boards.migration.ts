import { db } from "@/config/database";

const TABLE_NAME = "boards"

export async function createBoardsTable() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        owner_id UUID NOT NULL,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW(),

        CONSTRAINT fk_boards_owner
          FOREIGN KEY (owner_id)
          REFERENCES users(id)
          ON DELETE CASCADE
      );
    `)

    console.log(`[Migration] Successfully created ${TABLE_NAME} table.`)
  } catch (error: any) {
    console.error(`[Migration] Failed to create ${TABLE_NAME} table.`, error)
  }
}
