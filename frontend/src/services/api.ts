
export default function api(route: string) {
  return `${import.meta.env.VITE_BASE_URL}/api${route}`
}
