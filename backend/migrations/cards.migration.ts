import { db } from "@/config/database";

const TABLE_NAME = "cards"

export async function createCardsTable() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        column_id UUID NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        position INTEGER NOT NULL DEFAULT 0,
        assignee_id UUID,
        due_date TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW(),

        CONSTRAINT fk_cards_column
          FOREIGN KEY (column_id)
          REFERENCES columns(id)
          ON DELETE CASCADE,

        CONSTRAINT fk_cards_assignee
          FOREIGN KEY (assignee_id)
          REFERENCES users(id)
          ON DELETE SET NULL
      );
    `)

    console.log(`[Migration] Successfully created ${TABLE_NAME} table.`)
  } catch (error: any) {
    console.error(`[Migration] Failed to create ${TABLE_NAME} table.`, error)
  }
}
