import Header, { HeaderLabel, HeaderNav } from "@/components/ui/header";
import Logo from "@/assets/fludesk.png"
import { Link } from "react-router";
import { useAuth } from "@/hooks/auth";
import { cn } from "@/lib/utils";
import Loading from "../loading";
import Home from "@/components/landing/home";
import Features from "@/components/landing/features";
import { Button } from "@/components/ui/button";

export default function Landing() {
  const { isLoggedIn, loading } = useAuth()

  if (loading) {
    return <Loading/>
  }

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  return (
    <div className="p-4 px-2 min-h-screen bg-[#F5F7F9] dark:bg-[#0E1116] text-[#111827] dark:text-[#F5F5F7] flex flex-col font-sans selection:bg-[#79AC78] selection:text-white text-left transition-colors duration-200">
      <Header className="grid grid-cols-3 px-8">
        <HeaderLabel to="/" className="justify-self-start">
          <img src={Logo} alt="Fludesk" className="w-6 h-6"/>
          <span>Fludesk</span>
        </HeaderLabel>

        <HeaderNav className="gap-5 justify-self-center">
          <Button onClick={() => scrollToSection('feature')} variant={'ghost'} className="cursor-pointer hover:text-[#79AC78] text-sm transition-colors">Features</Button>
          <Button onClick={() => scrollToSection('showcase')} variant={'ghost'} className="cursor-pointer hover:text-[#79AC78] text-sm transition-colors">Showcase</Button>
          <Button onClick={() => scrollToSection('roadmap')} variant={'ghost'} className="cursor-pointer hover:text-[#79AC78] text-sm transition-colors">Roadmap</Button>
          <Button onClick={() => scrollToSection('github')} variant={'ghost'} className="cursor-pointer hover:text-[#79AC78] text-sm transition-colors">Github</Button>
          <Button onClick={() => scrollToSection('faq')} variant={'ghost'} className="cursor-pointer hover:text-[#79AC78] text-sm transition-colors">FAQ</Button>
        </HeaderNav>

        <HeaderNav className="justify-self-end">
          {!isLoggedIn ? <>
            <Link
              to="/login"
              className={cn(
                "inline-flex items-center justify-center rounded-full",
                "border border-[#79AC78]",
                "px-4 py-1.5",
                "text-sm font-medium text-[#79AC78]",
                "transition-all duration-200",
                "hover:bg-[#79AC78] hover:text-white",
                "active:scale-[0.98]"
              )}
            >
              Login
            </Link>

            <Link
              to="/register"
              className={cn(
                "inline-flex items-center justify-center rounded-full",
                "border border-[#79AC78] bg-[#79AC78]",
                "px-4 py-1.5",
                "text-sm font-medium text-white",
                "transition-all duration-200",
                "hover:bg-[#689867] hover:border-[#689867]",
                "active:scale-[0.98]"
              )}
            >
              Register
            </Link>
          </> : <>
            <Link
              to="/home"
              className={cn(
                "inline-flex items-center justify-center rounded-full",
                "border border-[#79AC78]",
                "px-4 py-1.5",
                "text-sm font-medium text-[#79AC78]",
                "transition-all duration-200",
                "hover:bg-[#79AC78] hover:text-white",
                "active:scale-[0.98]"
              )}
            >
              Your page
            </Link>
          </>}
        </HeaderNav>
      </Header>

      <Home />
      <Features/>
    </div>
  )
}
