"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Zap } from "lucide-react"
import { TestimonialCard } from "@/components/ui/testimonial-card"
import { Button } from "@/components/ui/button"

export function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechSolutions Inc.",
      image: "/images/testimonial-1.png",
      rating: 5,
      testimonial:
        "Reachr has completely transformed how we find and connect with potential clients. The AI-powered strategies have increased our conversion rates by 45% in just two months.",
    },
    {
      name: "Michael Chen",
      role: "CEO",
      company: "GrowthPartners",
      image: "/images/testimonial-2.png",
      rating: 5,
      testimonial:
        "As a small business owner, I couldn't afford a full marketing team. Reachr has been like having an entire department at a fraction of the cost. Our client base has grown by 60% since we started.",
    },
    {
      name: "Jessica Williams",
      role: "Sales Manager",
      company: "Innovate Retail",
      image: "/images/testimonial-3.png",
      rating: 4,
      testimonial:
        "The WhatsApp campaigns have been a game-changer for us. We're seeing response rates of over 80%, compared to just 15% with our previous email campaigns. Highly recommended!",
    },
  ]

  return (
    <section id="testimonials" ref={ref} className="w-full py-16 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="space-y-2"
          >
            <div className="inline-flex items-center rounded-full border border-primary bg-primary/10 px-3 py-1 text-sm text-primary dark:border-primary/30 dark:bg-primary/20">
              <Zap className="mr-1 h-3 w-3" />
              <span>Testimonials</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-5xl dark:text-white">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Success Stories
              </span>{" "}
              From Our Clients
            </h2>
            <p className="mx-auto max-w-[900px] text-lg text-neutral-700 dark:text-neutral-300 md:text-xl">
              Hear from businesses that have transformed their client acquisition with Reachr.
            </p>
          </motion.div>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <TestimonialCard
                name={testimonial.name}
                role={testimonial.role}
                company={testimonial.company}
                image={testimonial.image}
                rating={testimonial.rating}
                testimonial={testimonial.testimonial}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 flex justify-center"
        >
          <Button
            variant="outline"
            className="rounded-full border-primary px-6 py-6 text-primary transition-all duration-300 hover:bg-primary/10 dark:border-primary/70 dark:text-primary/90 dark:hover:bg-primary/20"
          >
            View More Success Stories
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
