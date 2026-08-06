import { useEffect, useState } from 'react'
import { me } from '@/services/auth'

import type User from "@/types/user"

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    let isMounted = true

    async function checkAuth() {
      try {
        const data = await me()

        if (!isMounted) return

        setUser(data.user)
        setIsLoggedIn(true)
      } catch {
        if (!isMounted) return

        setUser(null)
        setIsLoggedIn(false)
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    checkAuth()

    return () => {
      isMounted = false
    }
  }, [])

  return { user, isLoggedIn, loading }
}
