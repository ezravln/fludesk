import { Pool } from "pg"
import dotenv from "dotenv"

dotenv.config()

export const db = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
})

export async function connectDatabase() {
  try {
    const client = await db.connect()

    console.log("[DB] Connected successfully")

    client.release()
  } catch (err: any) {
    console.error("[DB] Failed to connect\n", err)
    process.exit(1)
  }
}
