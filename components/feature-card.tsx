import type { LucideIcon } from "lucide-react"

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-cloud-gray/30 bg-sky-white/80 p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-primary-blue/30 hover:shadow-lg">
      <div className="absolute -right-6 -top-6 h-16 w-16 rounded-full bg-primary-blue/5 transition-all duration-300 group-hover:scale-150 group-hover:bg-primary-blue/10"></div>

      <div className="relative flex flex-col items-center space-y-4 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary-blue/80 to-primary-blue p-3 text-sky-white shadow-md transition-all duration-300 group-hover:shadow-lg">
          <Icon className="h-7 w-7" />
        </div>
        <h3 className="text-xl font-bold text-charcoal">{title}</h3>
        <p className="text-charcoal/70">{description}</p>
      </div>
    </div>
  )
}
