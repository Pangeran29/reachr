import type { LucideIcon } from "lucide-react"

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-neutral-200/30 bg-white/80 p-4 sm:p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg dark:border-neutral-800/30 dark:bg-neutral-900/80">
      <div className="absolute -right-6 -top-6 h-16 w-16 rounded-full bg-primary/5 transition-all duration-300 group-hover:scale-150 group-hover:bg-primary/10 dark:bg-primary/10 dark:group-hover:bg-primary/20"></div>

      <div className="relative flex flex-col items-center space-y-3 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 p-2 text-white shadow-md transition-all duration-300 group-hover:shadow-lg">
          <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
        </div>
        <h3 className="text-base sm:text-xl font-bold text-neutral-900 dark:text-white">{title}</h3>
        <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300">{description}</p>
      </div>
    </div>
  )
}
