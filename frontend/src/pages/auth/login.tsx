import React, { useState } from "react"
import { useNavigate } from "react-router"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Background from "@/components/ui/background"
import { useAuth } from "@/hooks/auth"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { login } from "@/services/auth"

export default function Login() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ error, setError ] = useState('')

  if (user) {
    return navigate('/home', { replace: true })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await login(email, password)
      return navigate('/home')
    } catch (error: any) {
      setError(error.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-2">
      <Background />
      <Card className="w-full max-w-md bg-white shadow-none rounded-3xl">
        <CardHeader className="space-y-2 px-4 pt-4 md:px-6 md:pt-6">
          <CardTitle className="text-2xl text-center font-semibold tracking-tight">
            Sign in
          </CardTitle>

          <CardDescription className="text-[15px] text-center leading-6 text-zinc-500">
            Welcome back! We're glad to see you again.
          </CardDescription>

          {error && (
            <p className="p-2 rounded bg-red-100/40 border border-red-100 text-red-400">
              {error}
            </p>
          )}
        </CardHeader>

        <CardContent className="px-4 pb-4 md:px-8 md:pb-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <Label htmlFor="email" className="text-sm font-medium text-zinc-700">
                Email
              </Label>

              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                onChange={(e) => setEmail(e.target.value)}
                className="h-9 rounded-lg border-zinc-200 bg-zinc-50 focus-visible:ring-0 focus-visible:border-[#79AC78]"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="password" className="text-sm font-medium text-zinc-700">
                Password
              </Label>

              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
                className="h-9 rounded-lg border-zinc-200 bg-zinc-50 focus-visible:ring-0 focus-visible:border-[#79AC78]"
              />
              {(password && password.length < 8) && (
                <p className="text-red-400">
                  The password must be at least 8 characters long.
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="h-9 cursor-pointer w-full rounded-2xl bg-[#79AC78] text-white transition-all duration-200 hover:bg-[#6B9C6A] active:scale-[0.98]"
              disabled={!email || !password || password.length < 8}
            >
              Sign In
            </Button>

            <p className="text-center text-sm text-zinc-500">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => navigate('/register')}
                className="font-medium text-[#79AC78] hover:underline"
              >
                Sign Up
              </button>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
