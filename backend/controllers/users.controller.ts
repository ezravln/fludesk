import type { Request, Response } from "express"
import * as userService from "@/services/users.service"

export async function getUsers(req: Request, res: Response) {
  try {
    const users = await userService.getUsers()
    res.status(200).json({
      users,
    })
  } catch (error: any) {
    console.error("[Users] Get users error:", error)
    res.status(500).json({
      message: "Internal server error",
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
  } catch (error: any) {
    console.error("[Users] Get user error:", error)
    res.status(500).json({
      message: "Internal server error",
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
  } catch (error: any) {
    if (error.message === "User not found.") {
      return res.status(404).json({
        message: error.message,
      })
    }

    console.error("[Users] Update user error:", error)
    res.status(500).json({
      message: "Internal server error",
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
  } catch (error: any) {
    console.error("[Users] Delete user error:", error)
    res.status(500).json({
      message: "Internal server error",
    })
  }
}
