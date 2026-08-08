import * as noteRepository from "@/repositories/notes.repository"
import AppError from "@/errors/appError"
import type { Note } from "@/types/note.type"

export async function getNotes(): Promise<Note[]> {
  return await noteRepository.findAll()
}

export async function getNotesByUserId(
  user_id: string
): Promise<Note[]> {
  return await noteRepository.findNotesByUserId(user_id)
}

export async function findNoteById(
  id: string
): Promise<Note | null> {
  const note = await noteRepository.findNotesById(id)

  if (!note) {
    throw new AppError(404, "Note not found.")
  }

  return note
}

export async function create(
  title: string,
  note: string,
  user_id: string
): Promise<Note> {
  if (!title || !note) {
    throw new AppError(400, "Title or note are required.")
  }

  const res = await noteRepository.insert(
    user_id,
    title,
    note
  )

  if (!res) {
    throw new AppError(400, "Failed to create note.")
  }

  return res
}

export async function update(
  note_id: string,
  title: string,
  note: string
): Promise<Note> {
  if (!note_id) {
    throw new AppError(400, "Note ID is required.")
  }

  if (!title || !note) {
    throw new AppError(400, "Title or note are required.")
  }

  const existingNote = await noteRepository.findNotesById(note_id)

  if (!existingNote) {
    throw new AppError(404, "Note not found.")
  }

  const updatedNote = await noteRepository.update(
    note_id,
    title,
    note
  )

  if (!updatedNote) {
    throw new AppError(400, "Failed to update note.")
  }

  return updatedNote
}

export async function updatePatch(
  note_id: string,
  title?: string,
  note?: string
): Promise<Note> {
  if (!note_id) {
    throw new AppError(400, "Note ID is required.")
  }

  if (title === undefined && note === undefined) {
    throw new AppError(400, "At least one field is required.")
  }

  const existingNote = await noteRepository.findNotesById(note_id)

  if (!existingNote) {
    throw new AppError(404, "Note not found.")
  }

  const updatedNote = await noteRepository.updatePatch(
    note_id,
    {
      title,
      note,
    }
  )

  if (!updatedNote) {
    throw new AppError(400, "Failed to update note.")
  }

  return updatedNote
}

export async function remove(
  note_id: string
): Promise<Note> {
  if (!note_id) {
    throw new AppError(400, "Note ID is required.")
  }

  const existingNote = await noteRepository.findNotesById(note_id)

  if (!existingNote) {
    throw new AppError(404, "Note not found.")
  }

  const deletedNote = await noteRepository.remove(note_id)

  if (!deletedNote) {
    throw new AppError(400, "Failed to delete note.")
  }

  return deletedNote
}
