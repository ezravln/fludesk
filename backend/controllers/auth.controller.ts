import type { Request, Response } from "express"
import * as authService from "@/services/auth.service"

export async function register(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email, and password are required",
      })
    }

    const user = await authService.register({ name, email, password })

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error: any) {
    if (error.message === "Email already registered") {
      return res.status(409).json({
        message: error.message,
      })
    }

    console.error("[Auth] Register error:", error)
    res.status(500).json({
      message: "Internal server error",
    })
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      })
    }

    const result = await authService.login(email, password)

    res.cookie("token", result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000, // 15 minutes
    })

    res.status(200).json({
      message: "Login successful",
      user: result.user,
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    })
  } catch (error: any) {
    if (error.message === "Invalid credentials") {
      return res.status(401).json({
        message: error.message,
      })
    }

    console.error("[Auth] Login error:", error)
    res.status(500).json({
      message: "Internal server error",
    })
  }
}

export async function logout(req: Request, res: Response) {
  try {
    const { refreshToken } = req.body

    if (refreshToken) {
      await authService.logout(refreshToken)
    }

    res.clearCookie("token")

    res.status(200).json({
      message: "Logout successful",
    })
  } catch (error: any) {
    console.error("[Auth] Logout error:", error)
    res.status(500).json({
      message: "Internal server error",
    })
  }
}

export async function refresh(req: Request, res: Response) {
  try {
    const { refreshToken } = req.body

    if (!refreshToken) {
      return res.status(400).json({
        message: "Refresh token is required",
      })
    }

    const result = await authService.refreshAccessToken(refreshToken)

    res.cookie("token", result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000, // 15 minutes
    })

    res.status(200).json({
      accessToken: result.accessToken,
    })
  } catch (error: any) {
    if (error.message === "Invalid refresh token" || error.message === "Refresh token expired") {
      return res.status(401).json({
        message: error.message,
      })
    }

    console.error("[Auth] Refresh error:", error)
    res.status(500).json({
      message: "Internal server error",
    })
  }
}

export async function logoutAll(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized",
      })
    }

    await authService.logoutAll(req.user.id)

    res.clearCookie("token")

    res.status(200).json({
      message: "Logged out from all devices",
    })
  } catch (error: any) {
    console.error("[Auth] Logout all error:", error)
    res.status(500).json({
      message: "Internal server error",
    })
  }
}

export async function me(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized",
      })
    }

    res.status(200).json({
      user: req.user,
    })
  } catch (error: any) {
    console.error("[Auth] Me error:", error)
    res.status(500).json({
      message: "Internal server error",
    })
  }
}
