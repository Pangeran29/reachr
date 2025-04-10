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
    <div className="group relative overflow-hidden rounded-xl border border-cloud-gray/30 bg-sky-white/80 p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
      <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary-blue/5 transition-all duration-500 group-hover:-right-16 group-hover:-top-16 group-hover:bg-primary-blue/10"></div>
      <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-accent-orange/5 transition-all duration-500 group-hover:-bottom-16 group-hover:-left-16 group-hover:bg-accent-orange/10"></div>

      <div className="relative flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-cloud-gray/30">
            <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
          </div>
          <div>
            <h4 className="font-bold text-charcoal">{name}</h4>
            <p className="text-sm text-charcoal/70">
              {role}, {company}
            </p>
          </div>
        </div>

        <div className="flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < rating ? "fill-accent-orange text-accent-orange" : "text-cloud-gray"}`}
            />
          ))}
        </div>

        <blockquote className="text-charcoal">"{testimonial}"</blockquote>
      </div>
    </div>
  )
}
