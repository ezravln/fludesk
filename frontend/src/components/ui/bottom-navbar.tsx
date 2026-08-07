import { cn } from "@/lib/utils"

export function BottomNavButton({
  children,
  className,
  active,
  ...props
}: React.ComponentProps<"button"> & {
    children?: React.ReactNode,
    className?: string,
    active?: boolean
}) {
  return (
    <button className={cn(
      "flex cursor-pointer items-center p-2 justify-center text-zinc-700 hover:text-[#79AC78]/70",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#79AC78]",
      "disabled:pointer-events-none disabled:opacity-50",
      active ? "text-[#79AC78]" : "text-zinc-700",
      className
    )}
    {...props}>
      {children}
    </button>
  )
}

export default function BottomNavigator({
  children,
  className,
  ...props
}: {
    children?: React.ReactNode,
    className?: string,
}) {
  return (
    <div className={cn(
      "fixed bottom-0 flex justify-center items-center w-full p-3",
      className
    )} {...props}>
      <div className="w-auto flex items-center gap-4 justify-between px-4 h-11 bg-white shadow-xl rounded-xl">
        {children}
      </div>
    </div>
  )
}
