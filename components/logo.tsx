import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative h-8 w-8 overflow-hidden rounded-lg bg-gradient-to-br from-primary to-primary-foreground">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-4 rounded-sm bg-background"></div>
        </div>
      </div>
      <span className="font-heading text-xl font-bold">Nexus</span>
    </div>
  )
}
