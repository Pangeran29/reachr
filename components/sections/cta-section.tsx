"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CTASection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-gradient-to-r from-primary to-secondary py-16 md:py-24 lg:py-32"
    >
      <div className="absolute inset-0 bg-[url('/images/wave-pattern.svg')] bg-cover bg-center opacity-5"></div>

      <div className="container grid items-center gap-6 px-4 text-center md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl space-y-4"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
            Ready to <span className="text-white underline decoration-white/30 underline-offset-4">Revolutionize</span>{" "}
            Your Client Acquisition?
          </h2>
          <p className="mx-auto max-w-[800px] text-lg text-white/90 md:text-xl">
            Join thousands of businesses using Reachr to find and convert new clients with AI-powered marketing. Start
            your free trial today.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center"
          >
            <Button className="group relative overflow-hidden rounded-full bg-white px-8 py-6 text-primary transition-all duration-300 hover:shadow-lg">
              <span className="relative z-10 flex items-center text-lg font-medium">
                Start Your Free Trial
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Button>
            <Button
              variant="outline"
              className="rounded-full border-white px-8 py-6 text-lg font-medium text-white transition-all duration-300 hover:bg-white/10"
            >
              Schedule a Demo
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mx-auto mt-6 flex max-w-[500px] items-center justify-center space-x-4"
          >
            <p className="text-sm text-white/90">No credit card required. 14-day free trial. Cancel anytime.</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
