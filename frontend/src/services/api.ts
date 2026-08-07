
export default async function api(url: string, init?: RequestInit) {
  let response = await fetch(`${import.meta.env.VITE_BASE_URL}/api${url}`, {
    ...init,
    credentials: "include",
  })

  if (response.status === 401) {
    const refresh = await fetch(`${import.meta.env.VITE_BASE_URL}/api/auth/refresh`, {
      method: "POST",
      credentials: "include"
    })

    if (refresh.ok) {
      response = await fetch(`${import.meta.env.VITE_BASE_URL}/api${url}`, {
        ...init,
        credentials: "include",
      })
    }
  }

  return response
}
