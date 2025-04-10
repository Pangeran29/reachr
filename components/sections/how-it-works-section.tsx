"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Zap } from "lucide-react"
import { InteractiveFlowDiagram } from "@/components/ui/interactive-flow-diagram"

export function HowItWorksSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="relative w-full overflow-hidden bg-neutral-50/50 py-16 md:py-24 lg:py-32 dark:bg-neutral-900/50"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-tr from-neutral-50/80 via-white to-neutral-50/80 dark:from-neutral-950 dark:via-neutral-900/95 dark:to-neutral-950"></div>
        <div className="absolute inset-0 bg-grid-neutral-200/40 bg-[size:24px_24px] opacity-30 dark:bg-grid-neutral-800/20"></div>
      </div>
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
              <span>How It Works</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-5xl dark:text-white">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Intelligent Process
              </span>
              , Exceptional Results
            </h2>
            <p className="mx-auto max-w-[900px] text-lg text-neutral-700 dark:text-neutral-300 md:text-xl">
              Explore our interactive visualization to see how Reachr's six powerful modules work together to transform
              your client acquisition process.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <InteractiveFlowDiagram />
        </motion.div>
      </div>
    </section>
  )
}
