import { Router } from "express"
import * as noteController from "@/controllers/notes.controller"
import { authMiddleware } from "@/middlewares/auth.middleware"

const router = Router()

router.get("/", noteController.getNotes)
router.get("/user", authMiddleware, noteController.getNotesByUserId)
router.get("/:id", authMiddleware, noteController.getNoteById)

router.post("/", authMiddleware, noteController.createNote)

router.put("/:id", authMiddleware, noteController.updateNote)
router.patch("/:id", authMiddleware, noteController.updateNotePatch)

router.delete("/:id", authMiddleware, noteController.deleteNote)

export default router
