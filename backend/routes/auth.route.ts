import { Router } from "express"
import * as authController from "@/controllers/auth.controller"
import { authMiddleware } from "@/middlewares/auth.middleware"

const router = Router()

router.post("/register", authController.register)
router.post("/login", authController.login)
router.post("/refresh", authController.refresh)

router.post("/logout", authMiddleware, authController.logout)
router.post("/logout-all", authMiddleware, authController.logoutAll)
router.get("/me", authMiddleware, authController.me)

export default router
