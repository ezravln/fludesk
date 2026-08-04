export default async function api(
  url: string,
  options?: RequestInit
) {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}${url}`,
    options
  )

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`)
  }

  return response.json()
}
