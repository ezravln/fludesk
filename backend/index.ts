import app from "./app"
import { connectDatabase } from "./config/database"

const PORT = Number(process.env.PORT) || 3000

async function bootstrap() {
  await connectDatabase()

  app.listen(PORT, () => {
    console.log("[Server] Listening on port", PORT)
  })
}

bootstrap()
