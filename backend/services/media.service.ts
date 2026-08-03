import * as mediaRepository from "@/repositories/media.repository"
import type { Media } from "@/types/media.type"
import { generate_uuid } from "@/utils/uuid"
import path from "path"
import fs from "fs/promises"

export async function getFileById(id: string): Promise<Media | null> {
  const file = await mediaRepository.findById(id)
  return file
}

export async function upload(
  file: any,
  directory: string
): Promise<Media> {
  const id = generate_uuid()
  const ext = path.extname(file.originalname)

  const filename = `${id}${ext}`
  const storageKey = path.join(directory, filename)

  const uploadDir = path.join(process.cwd(), "uploads", directory)

  await fs.mkdir(uploadDir, { recursive: true })
  await fs.writeFile(path.join(uploadDir, filename), file.buffer)

  return await mediaRepository.insert({
    filename,
    original_filename: file.originalname,
    mime_type: file.mimetype,
    size: file.size,
    storage_key: storageKey,
    url: `${process.env.FILE_BASE_URL}/${storageKey}`,
    created_at: new Date(),
    updated_at: new Date(),
  })
}

export async function remove(id: string) {
  await mediaRepository.remove(id)
}
