import api from './api'

export async function getUserNotes() {
  const response = await api(`/notes/user`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    }
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(`Error: ${result.message}`)
  }

  return result
}
