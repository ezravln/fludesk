import { useNavigate } from "react-router"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import BackgroundWave from "@/components/ui/background"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Register() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center p-4">
      <Card className="w-full max-w-md rounded-3xl border border-zinc-200/80 bg-white shadow-xl shadow-zinc-200/40">
        <CardHeader className="space-y-2 px-4 pt-4 md:px-6 md:pt-6">
          <CardTitle className="text-2xl font-semibold tracking-tight">
            Create Account
          </CardTitle>

          <CardDescription className="text-[15px] leading-6 text-zinc-500">
            Welcome! Create your account and start organizing your work.
          </CardDescription>
        </CardHeader>

        <CardContent className="px-4 pb-4 md:px-8 md:pb-8">
          <form className="space-y-6">
            <div className="space-y-1">
              <Label htmlFor="name" className="text-sm font-medium text-zinc-700">
                Full Name
              </Label>

              <Input
                id="name"
                placeholder="John Doe"
                className="h-9 rounded-lg border-zinc-200 bg-zinc-50 focus-visible:ring-0 focus-visible:border-[#79AC78]"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="email" className="text-sm font-medium text-zinc-700">
                Email
              </Label>

              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
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
                className="h-9 rounded-lg border-zinc-200 bg-zinc-50 focus-visible:ring-0 focus-visible:border-[#79AC78]"
              />
            </div>

            <Button
              type="submit"
              className="h-9 cursor-pointer w-full rounded-2xl bg-[#79AC78] text-white transition-all duration-200 hover:bg-[#6B9C6A] active:scale-[0.98]"
            >
              Create Account
            </Button>

            <p className="text-center text-sm text-zinc-500">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="font-medium text-[#79AC78] hover:underline"
              >
                Sign In
              </button>
            </p>
          </form>
        </CardContent>
      </Card>

      <BackgroundWave />
    </div>
  )
}
