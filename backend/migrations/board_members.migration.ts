import { db } from "@/config/database";

const TABLE_NAME = "board_members"

export async function createBoardMembersTable() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        board_id UUID NOT NULL,
        user_id UUID NOT NULL,
        role VARCHAR(50) DEFAULT 'member',
        created_at TIMESTAMP DEFAULT NOW(),

        CONSTRAINT fk_board_members_board
          FOREIGN KEY (board_id)
          REFERENCES boards(id)
          ON DELETE CASCADE,

        CONSTRAINT fk_board_members_user
          FOREIGN KEY (user_id)
          REFERENCES users(id)
          ON DELETE CASCADE,

        CONSTRAINT unique_board_user
          UNIQUE(board_id, user_id)
      );
    `)

    console.log(`[Migration] Successfully created ${TABLE_NAME} table.`)
  } catch (error: any) {
    console.error(`[Migration] Failed to create ${TABLE_NAME} table.`, error)
  }
}
