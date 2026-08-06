import { useEffect } from "react"
import { useNavigate, Outlet } from "react-router"
import { useAuth } from "@/hooks/auth"
import Loading from "@/pages/loading"


export default function AuthLayout() {
  const { isLoggedIn, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoggedIn && !loading) {
      navigate('/home')
    }
  }, [isLoggedIn, navigate])

  if (loading) {
    return <Loading/>
  }

  return <>
    <Outlet/>
  </>
}
