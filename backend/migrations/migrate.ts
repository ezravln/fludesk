import { createFilesTable } from "./media.migration"
import { createUsersTable } from "./users.migration"
import { createRefreshTokensTable } from "./refresh_tokens.migration"

async function migrate() {
  await createFilesTable()
  await createUsersTable()
  await createRefreshTokensTable()
  process.exit(0)
}

migrate()
