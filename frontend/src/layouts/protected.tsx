import { Outlet, useNavigate } from 'react-router'
import { useAuth } from '@/hooks/auth'
import { useEffect } from 'react'
import Loading from '@/pages/loading'

export default function ProtectedLayout() {
  const { isLoggedIn, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      navigate('/login', { replace: true })
    }
  }, [loading, isLoggedIn, navigate])

  if (loading) {
    return <Loading />
  }

  return <Outlet />
}
