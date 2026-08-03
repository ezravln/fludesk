import jwt from "jsonwebtoken"
import * as userRepository from "@/repositories/users.repository"
import * as refreshTokenRepository from "@/repositories/refresh_tokens.repository"
import * as userService from "@/services/users.service"
import type { JwtPayload } from "@/types/jwt.type"

const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY || "15m"
const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY || "7d"

export async function register(data: {
  name: string
  email: string
  password: string
}) {
  const existingUser = await userRepository.findByEmail(data.email)
  if (existingUser) {
    throw new Error("Email already registered")
  }

  const user = await userService.createUser(data)
  return user
}

export async function login(email: string, password: string) {
  const user = await userRepository.findByEmail(email)
  if (!user) {
    throw new Error("Invalid credentials")
  }

  const isValidPassword = await userService.validatePassword(password, user.password)
  if (!isValidPassword) {
    throw new Error("Invalid credentials")
  }

  const accessToken = generateAccessToken(user)
  const refreshToken = await generateRefreshToken(user.id)

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    accessToken,
    refreshToken,
  }
}

export async function refreshAccessToken(refreshToken: string) {
  const tokenRecord = await refreshTokenRepository.findByToken(refreshToken)
  if (!tokenRecord) {
    throw new Error("Invalid refresh token")
  }

  if (new Date(tokenRecord.expires_at) < new Date()) {
    await refreshTokenRepository.removeByToken(refreshToken)
    throw new Error("Refresh token expired")
  }

  const user = await userRepository.findById(tokenRecord.user_id)
  if (!user) {
    throw new Error("User not found")
  }

  const accessToken = generateAccessToken({
    id: user.id,
    email: user.email,
    name: user.name
  })
  return { accessToken }
}

export async function logout(refreshToken: string) {
  await refreshTokenRepository.removeByToken(refreshToken)
}

export async function logoutAll(userId: string) {
  await refreshTokenRepository.removeByUserId(userId)
}

function generateAccessToken(user: { id: string; email: string; name: string }): string {
  const payload: JwtPayload = {
    id: user.id,
    email: user.email,
    name: user.name,
  }

  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  } as jwt.SignOptions)
}

async function generateRefreshToken(userId: string): Promise<string> {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
  } as jwt.SignOptions)

  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + 7)

  await refreshTokenRepository.insert(userId, token, expiresAt)

  return token
}
