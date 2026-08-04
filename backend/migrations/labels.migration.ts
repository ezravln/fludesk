import { db } from "@/config/database";

const TABLE_NAME = "labels"

export async function createLabelsTable() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        board_id UUID NOT NULL,
        name VARCHAR(100) NOT NULL,
        color VARCHAR(7) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),

        CONSTRAINT fk_labels_board
          FOREIGN KEY (board_id)
          REFERENCES boards(id)
          ON DELETE CASCADE
      );
    `)

    console.log(`[Migration] Successfully created ${TABLE_NAME} table.`)
  } catch (error: any) {
    console.error(`[Migration] Failed to create ${TABLE_NAME} table.`, error)
  }
}
