import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="relative h-16 w-16 overflow-hidden rounded-full bg-gradient-to-br from-primary to-secondary p-0.5">
          <div className="absolute inset-0.5 flex items-center justify-center rounded-full bg-neutral-900">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </div>
        <p className="text-lg font-medium text-white">Loading...</p>
      </div>
    </div>
  )
}
