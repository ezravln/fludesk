import React from "react"
import { useNavigate, Outlet } from "react-router"
import { useAuth } from "@/hooks/auth"


export default function AuthLayout() {
  const { user } = useAuth()
  const navigate = useNavigate()

  if (user) {
    return navigate('/dashboard')
  }

  return <>
    <Outlet/>
  </>
}
