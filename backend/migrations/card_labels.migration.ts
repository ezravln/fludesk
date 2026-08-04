import { db } from "@/config/database";

const TABLE_NAME = "card_labels"

export async function createCardLabelsTable() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
        card_id UUID NOT NULL,
        label_id UUID NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),

        CONSTRAINT fk_card_labels_card
          FOREIGN KEY (card_id)
          REFERENCES cards(id)
          ON DELETE CASCADE,

        CONSTRAINT fk_card_labels_label
          FOREIGN KEY (label_id)
          REFERENCES labels(id)
          ON DELETE CASCADE,

        CONSTRAINT unique_card_label
          UNIQUE(card_id, label_id)
      );
    `)

    console.log(`[Migration] Successfully created ${TABLE_NAME} table.`)
  } catch (error: any) {
    console.error(`[Migration] Failed to create ${TABLE_NAME} table.`, error)
  }
}
