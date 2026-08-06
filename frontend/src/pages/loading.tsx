import { LoaderCircle } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

export default function Loading() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <HugeiconsIcon
        icon={LoaderCircle}
        size={29}
        className="animate-spin"
      />
    </div>
  )
}
