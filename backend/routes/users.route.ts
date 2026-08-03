import { Router } from "express"
import * as usersController from "@/controllers/users.controller"
import { authMiddleware } from "@/middlewares/auth.middleware"

const router = Router()

router.get("/", authMiddleware, usersController.getUsers)
router.get("/:id", authMiddleware, usersController.getUserById)
router.patch("/:id", authMiddleware, usersController.updateUser)
router.delete("/:id", authMiddleware, usersController.deleteUser)

export default router
