import * as userRepository from "@/repositories/users.repository"
import * as mediaService from "@/services/media.service"
import * as refreshTokenRepository from "@/repositories/refresh_tokens.repository"
import type { User, UserResponse } from "@/types/user.type"
import type { Express } from "express"
import bcrypt from "bcrypt"

export async function getUsers() {
  const users = await userRepository.findAll()
  // Remove password from response
  return users.map(({ password, ...user }) => user)
}

export async function getUserById(id: string): Promise<UserResponse | null> {
  const user = await userRepository.findById(id)
  if (!user) return null

  let avatar = null
  if (user.avatar_file_id) {
    avatar = await mediaService.getFileById(user.avatar_file_id)
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    avatar,
    created_at: user.created_at,
    updated_at: user.updated_at
  }
}

export async function createUser(user: {
  name: string,
  email: string,
  password: string
}): Promise<UserResponse> {
  const hashedPassword = await bcrypt.hash(user.password, 10)
  const newUser = await userRepository.insert(user.name, user.email, hashedPassword)

  if (!newUser) {
    throw new Error("Failed to create user.")
  }

  return {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    avatar: null,
    created_at: newUser.created_at,
    updated_at: newUser.updated_at
  }
}

export async function updateUser(
  input: {
    name?: string
    password?: string
    avatar_file?: any
  },
  id: string
): Promise<UserResponse> {
  const currentUser = await userRepository.findByIdWithPassword(id)

  if (!currentUser) {
    throw new Error("User not found.")
  }

  const name = input.name ?? currentUser.name
  const password = input.password 
    ? await bcrypt.hash(input.password, 10) 
    : currentUser.password

  let avatarFileId: string | null = currentUser.avatar_file_id ?? null
  let avatar = null

  if (avatarFileId) {
    avatar = await mediaService.getFileById(avatarFileId)
  }

  if (input.avatar_file) {
    avatar = await mediaService.upload(input.avatar_file, "avatars")
    avatarFileId = avatar.id ?? null
  }

  const updatedUser = await userRepository.update(
    name,
    password,
    avatarFileId,
    id
  )

  if (!updatedUser) {
    throw new Error("Failed to update user.")
  }

  return {
    id: updatedUser.id,
    name: updatedUser.name,
    email: updatedUser.email,
    avatar,
    created_at: updatedUser.created_at,
    updated_at: updatedUser.updated_at
  }
}

export async function removeUser(id: string) {
  await userRepository.remove(id)
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const result = await userRepository.findByEmail(email)
  return result
}

export async function validatePassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

