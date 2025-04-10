import Image from "next/image"
import { Star } from "lucide-react"

interface TestimonialCardProps {
  name: string
  role: string
  company: string
  image: string
  rating: number
  testimonial: string
}

export function TestimonialCard({ name, role, company, image, rating, testimonial }: TestimonialCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-neutral-200/30 bg-white/80 p-6 shadow-lg transition-all duration-300 hover:shadow-xl dark:border-neutral-800/30 dark:bg-neutral-900/80">
      <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/5 transition-all duration-500 group-hover:-right-16 group-hover:-top-16 group-hover:bg-primary/10 dark:bg-primary/10 dark:group-hover:bg-primary/20"></div>
      <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-secondary/5 transition-all duration-500 group-hover:-bottom-16 group-hover:-left-16 group-hover:bg-secondary/10 dark:bg-secondary/10 dark:group-hover:bg-secondary/20"></div>

      <div className="relative flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-neutral-200/30 dark:border-neutral-800/30">
            <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
          </div>
          <div>
            <h4 className="font-bold text-neutral-900 dark:text-white">{name}</h4>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {role}, {company}
            </p>
          </div>
        </div>

        <div className="flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-neutral-300 dark:text-neutral-700"}`}
            />
          ))}
        </div>

        <blockquote className="text-neutral-700 dark:text-neutral-300">"{testimonial}"</blockquote>
      </div>
    </div>
  )
}
