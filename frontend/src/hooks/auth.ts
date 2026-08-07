import { useCallback, useEffect, useState } from "react"
import { me } from "@/services/auth"

import type User from "@/types/user"

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)

    try {
      const data = await me()

      setUser(data.user)
      setIsLoggedIn(true)
    } catch {
      setUser(null)
      setIsLoggedIn(false)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  return {
    user,
    isLoggedIn,
    loading,
    refresh,
    setUser,
    setIsLoggedIn,
  }
}
