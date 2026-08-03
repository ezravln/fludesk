import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import path from "path"
import authRoutes from "@/routes/auth.route"
import usersRoutes from "@/routes/users.route"

const app = express()

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
)

app.use(express.json())
app.use(cookieParser())

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Server is running",
    timestamp: new Date().toISOString()
  })
})

app.use("/api/auth", authRoutes)
app.use("/api/users", usersRoutes)

app.use(
  "/api/media",
  express.static(path.join(process.cwd(), "uploads"))
)

export default app
