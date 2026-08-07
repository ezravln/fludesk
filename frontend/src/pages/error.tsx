import { Link } from "react-router"
import { ChevronLeft, House } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="relative z-10 flex flex-col items-center text-center px-2">
        <h1 className="select-none text-6xl md:text-8xl font-black tracking-tight text-[#79AC78]">
          404
        </h1>

        <h2 className="mt-4 text-xl md:text-2xl font-semibold text-zinc-800">
          Page not found
        </h2>

        <p className="mt-2 max-w-md text-zinc-500">
          The page you are looking for might have been moved or deleted, or the address is incorrect.
        </p>

        <div className="mt-8 flex items-center gap-5">
          <Button
            variant="link"
            onClick={() => history.back()}
            className="rounded-none cursor-pointer px-2 text-zinc-600 hover:text-zinc-900"
          >
            <ChevronLeft size={18} />
            Back
          </Button>

          <Button variant="link" asChild className="rounded-none cursor-pointer px-2 text-zinc-600 hover:text-zinc-900">
            <Link to="/app" className="flex items-center gap-1.5">
              <House size={18} />
              Home
            </Link>
          </Button>
        </div>
      </div>

      <div className="pointer-events-none absolute text-[9rem] md:text-[22rem] font-black leading-none text-[#79AC78]/20">
        404
      </div>
    </main>
  )
}
