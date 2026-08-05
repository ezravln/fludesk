import { createBrowserRouter, RouterProvider } from "react-router"
import type { RouteObject } from "react-router"

import ProtectedLayout from "@/layouts/protected"
import AuthLayout from "@/layouts/auth"

import Landing from "@/pages/landing"
import Home from "@/pages/home"
import Login from "@/pages/auth/login"
import Register from "@/pages/auth/register"

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Landing />,
  },
  {
    element: <ProtectedLayout />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]

const router = createBrowserRouter(routes)

export default function AppRouter() {
  return <RouterProvider router={router} />
}
