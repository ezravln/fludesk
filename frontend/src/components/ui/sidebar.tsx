import { useAuth } from "@/hooks/auth";
import { cn } from "@/lib/utils";
import type React from "react";
import Logo from "@/assets/fludesk.png"
import { Label } from "./label";
import { Button } from "./button";
import { ChevronDown, ChevronUp, type LucideIcon } from "lucide-react";
import { useState } from "react";

type SidebarNavLinkProps = React.ComponentProps<"button"> & {
  active?: boolean
}

export function SidebarUserProfile() {
  const { user } = useAuth()

  return (
    <div className="w-full rounded-md px-1 flex items-center justify-between gap-2">
      <img src={Logo} className="w-8 h-8 rounded-full" />
      <div className="w-full text-nowrap overflow-clip">
        <Label className="text-[13px] tracking-wide font-bold text-[#0F0F0F]">{user?.name}</Label>
        <Label className="text-[12px] font-medium text-[#545454]">{user?.email}</Label>
      </div>
      <Button variant={'ghost'} onClick={() => console.log("Menu Context Dropdown")} className="cursor-pointer hover:bg-transparent">
        <ChevronDown size={24}/>
      </Button>
    </div>
  )
}

export function SidebarNavGroup({
  children,
  className,
  label,
  icon
}: {
    children?: React.ReactNode,
    className?: string,
    label?: string,
    icon?: LucideIcon
  }) {
  const [active, setActive] = useState<boolean>(true)
  const Icon = icon

  return (
    <>
      <button onClick={() => setActive(!active)} className={cn(
        "text-[12px] font-semibold text-zinc-600 flex items-center hover:text-[#79AC78] transition-all cursor-pointer justify-between py-1 px-2 gap-2 tracking-wider uppercase"
      )}>
        {icon && <Icon size={18} className='min-w-4.5'/>}
        <span className="w-full text-nowrap text-start overflow-clip">
          {label}
        </span>
        {!active ? <ChevronDown size={18} className='min-w-4.5' /> : <ChevronUp size={18} className='min-w-4.5' />}
      </button>
      <div className={cn(
        "w-full p-2 bg-gray-100 overflow-y-auto max-h-full rounded-lg flex flex-col gap-1",
        className,
        !active ? "hidden" : "static"
      )}>
        {children}
      </div>
    </>
  )
}

export function SidebarNavLink({
  active,
  children,
  className,
  ...props
}: SidebarNavLinkProps) {
  return (
    <button
      className={cn(
        "flex w-full text-nowrap overflow-clip cursor-pointer items-center gap-2 rounded-lg px-2 py-2 text-sm font-semibold transition-colors duration-200",
        active
          ? "bg-[#79AC78] text-white"
          : "text-zinc-700 hover:bg-[#79AC78]/20 hover:text-[#79AC78]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#79AC78]",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export function SidebarNavContainer({
  children,
  className,
}: {
  children?: React.ReactNode,
  className?: string
}) {
  return (
    <nav className={cn(
      "w-full h-full flex flex-col gap-1 overflow-auto scrollbar-sm-left",
      className
    )}>
      {children}
    </nav>
  )
}

export default function Sidebar({
  children,
  className,
  ...props
}: {
  children?: React.ReactNode
  className?: string
}) {
  return (
    <aside
      className={cn(
        "min-w-70 p-3 h-screen",
        className
      )}
      {...props}
    >
      <div className="bg-white flex flex-col gap-4 w-full h-full shadow-xl rounded-2xl py-3 px-2">
        {children}
      </div>
    </aside>
  )
}
