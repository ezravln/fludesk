import { Navigate, Outlet } from "react-router"
import { useAuth } from "@/hooks/auth"

export default function ProtectedLayout() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
