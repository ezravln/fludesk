import type { Request, Response } from "express"
import * as noteService from "@/services/notes.service"
import AppError from "@/errors/appError"

export async function getNotes(
  req: Request,
  res: Response
) {
  const notes = await noteService.getNotes()

  return res.status(200).json({
    status: 200,
    message: "Notes retrieved successfully.",
    data: notes,
  })
}

export async function getNotesByUserId(
  req: Request,
  res: Response
) {
  const user_id = req.user?.id as string

  if (!user_id) {
    res.status(400).json({
      status: 400,
      message: "Unknown user id",
      data: null,
    })
  }

  const notes = await noteService.getNotesByUserId(user_id)

  return res.status(200).json({
    status: 200,
    message: "Notes retrieved successfully.",
    data: notes,
  })
}

export async function getNoteById(
  req: Request,
  res: Response
) {
  const id = req.user?.id as string

  const note = await noteService.findNoteById(id)

  return res.status(200).json({
    status: 200,
    message: "Note retrieved successfully.",
    data: note,
  })
}

export async function createNote(
  req: Request,
  res: Response
) {
  const user_id = req.user?.id as string
  const { title, note } = req.body

  const newNote = await noteService.create(
    title,
    note,
    user_id
  )

  return res.status(201).json({
    status: 201,
    message: "Note created successfully.",
    data: newNote,
  })
}

export async function updateNote(
  req: Request,
  res: Response
) {
  const id = req.user?.id as string
  const { title, note } = req.body

  const updatedNote = await noteService.update(
    id,
    title,
    note
  )

  return res.status(200).json({
    status: 200,
    message: "Note updated successfully.",
    data: updatedNote,
  })
}

export async function updateNotePatch(
  req: Request,
  res: Response
) {
  const id = req.user?.id as string
  const { title, note } = req.body

  const updatedNote = await noteService.updatePatch(
    id,
    title,
    note
  )

  return res.status(200).json({
    status: 200,
    message: "Note updated successfully.",
    data: updatedNote,
  })
}

export async function deleteNote(
  req: Request,
  res: Response
) {
  const id = req.user?.id as string

  const deletedNote = await noteService.remove(id)

  return res.status(200).json({
    status: 200,
    message: "Note deleted successfully.",
    data: deletedNote,
  })
}
