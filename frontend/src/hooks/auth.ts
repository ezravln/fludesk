import { useState, useEffect } from 'react'

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    let isMounted = true

    async function checkAuth() {
      try {
        const response = await fetch('http://localhost:3000/api/auth/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        })

        if (response.ok) {
          if (isMounted) setIsLoggedIn(true)
        } else {
          if (isMounted) setIsLoggedIn(false)
        }
      } catch (err) {
        if (isMounted) setIsLoggedIn(false)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    checkAuth()

    return () => {
      isMounted = false
    }
  }, [])

  return { isLoggedIn, loading }
}
