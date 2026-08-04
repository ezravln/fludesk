import { createFilesTable } from "./media.migration"
import { createUsersTable } from "./users.migration"
import { createRefreshTokensTable } from "./refresh_tokens.migration"
import { createBoardsTable } from "./boards.migration"
import { createBoardMembersTable } from "./board_members.migration"
import { createColumnsTable } from "./columns.migration"
import { createCardsTable } from "./cards.migration"
import { createLabelsTable } from "./labels.migration"
import { createCardLabelsTable } from "./card_labels.migration"

async function migrate() {
  await createFilesTable()
  await createUsersTable()
  await createRefreshTokensTable()
  await createBoardsTable()
  await createBoardMembersTable()
  await createColumnsTable()
  await createCardsTable()
  await createLabelsTable()
  await createCardLabelsTable()
  process.exit(0)
}

migrate()
