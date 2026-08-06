import React, { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Link } from "react-router"

export function HeaderLabel({
  children,
  to,
  className,
}: {
  children?: React.ReactNode
  to?: string
  className?: string
}) {
  return (
      to?<Link
      to={to}
      className={cn(
        "flex items-center gap-2 text-[17px] font-semibold leading-none tracking-[-0.02em] text-zinc-900 dark:text-zinc-100 select-none",
        className
      )}
    >
      {children}
    </Link> :
    <div
      className={cn(
        "flex items-center gap-2 text-[17px] font-semibold leading-none tracking-[-0.02em] text-zinc-900 dark:text-zinc-100 select-none",
        className
      )}
    >
      {children}
    </div>
  )
}

export function HeaderNav({
  children,
  className
}: {
  children?: React.ReactNode,
  className?: string
}) {
  return <div className={cn(
    'flex items-center gap-2',
    className
  )}>
    {children}
  </div>
}

export default function Header({
  children,
  className,
  sticky = false,
  scrollBackground = false,
}: {
  children?: React.ReactNode
  className?: string
  sticky?: boolean
  scrollBackground?: boolean
}) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (!scrollBackground) return

    const handleScroll = () => setScrolled(window.scrollY > 12)

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrollBackground])

  return (
    <header
      className={cn(
        "w-full h-14 flex items-center justify-between px-6 transition-all duration-300",
        sticky && "sticky top-0 z-50",
        scrollBackground
          ? scrolled
            ? "bg-white/80 backdrop-blur-md border-b border-zinc-200 shadow-sm"
            : "bg-transparent"
          : "bg-transparent",
        className
      )}
    >
      {children}
    </header>
  )
}
