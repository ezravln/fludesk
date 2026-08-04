import { createBrowserRouter, RouterProvider } from 'react-router'
import type { RouteObject } from 'react-router'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
]

const router = createBrowserRouter(routes)

export default function AppRouter() {
  return <RouterProvider router={router} />
}
