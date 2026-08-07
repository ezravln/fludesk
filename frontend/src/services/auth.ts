import api from './api'


export async function me() {
  const response = await api(`/auth/me`, {
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

export async function login(email: string, password: string) {
  const response = await api(`/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password
    })
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(`Login failed: ${result.message}`)
  }

  return result
}

export async function register(name: string, email: string, password: string) {
  const response = await api(`/auth/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password
    })
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(`Register failed: ${result.message}`)
  }

  return result
}
