import type { Request, Response } from "express"
import * as userService from "@/services/users.service"
import AppError from "@/errors/appError"

export async function getUsers(req: Request, res: Response) {
  try {
    const users = await userService.getUsers()
    res.status(200).json({
      users,
    })
  } catch (error: AppError) {
    console.error("[Auth] Get all users error:", error)
    res.status(error.statusCode).json({
      message: error.message,
    })
  }
}

export async function getUserById(req: Request, res: Response) {
  try {
    const { id } = req.params
    const userId = Array.isArray(id) ? id[0] : id

    const user = await userService.getUserById(userId)

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      })
    }

    res.status(200).json({
      user,
    })
  } catch (error: AppError) {
    console.error("[Auth] Get user by id error:", error)
    res.status(error.statusCode).json({
      message: error.message,
    })
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const { id } = req.params
    const { name, password } = req.body
    const avatar_file = (req as any).file

    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized",
      })
    }

    // Users can only update their own profile
    if (req.user.id !== id) {
      return res.status(403).json({
        message: "Forbidden",
      })
    }

    const user = await userService.updateUser(
      { name, password, avatar_file },
      id
    )

    res.status(200).json({
      message: "User updated successfully",
      user,
    })
  } catch (error: AppError) {
    console.error("[Auth] Update user error:", error)
    res.status(error.statusCode).json({
      message: error.message,
    })
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const { id } = req.params

    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized",
      })
    }

    // Users can only delete their own profile
    if (req.user.id !== id) {
      return res.status(403).json({
        message: "Forbidden",
      })
    }

    await userService.removeUser(id)

    res.status(200).json({
      message: "User deleted successfully",
    })
  } catch (error: AppError) {
    console.error("[Auth] Delete user error:", error)
    res.status(error.statusCode).json({
      message: error.message,
    })
  }
}
