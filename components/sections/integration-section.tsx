"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"

export function IntegrationSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const integrations = [
    { name: "Slack", logo: "/placeholder.svg?height=80&width=80" },
    { name: "GitHub", logo: "/placeholder.svg?height=80&width=80" },
    { name: "Google Drive", logo: "/placeholder.svg?height=80&width=80" },
    { name: "Dropbox", logo: "/placeholder.svg?height=80&width=80" },
    { name: "Figma", logo: "/placeholder.svg?height=80&width=80" },
    { name: "Notion", logo: "/placeholder.svg?height=80&width=80" },
    { name: "Zoom", logo: "/placeholder.svg?height=80&width=80" },
    { name: "Microsoft Teams", logo: "/placeholder.svg?height=80&width=80" },
    { name: "Asana", logo: "/placeholder.svg?height=80&width=80" },
    { name: "Trello", logo: "/placeholder.svg?height=80&width=80" },
  ]

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-neutral-100/70 py-16 sm:py-20 md:py-28 dark:bg-neutral-900/70"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-100/90 via-neutral-50/80 to-neutral-100/90 dark:from-neutral-900/90 dark:via-neutral-950/80 dark:to-neutral-900/90"></div>
        <div className="absolute inset-0 bg-grid-neutral-200/40 bg-[size:24px_24px] opacity-30 dark:bg-grid-neutral-800/20"></div>
      </div>
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-[800px] text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
          >
            Seamlessly integrates with your{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              favorite tools
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-base sm:text-lg text-muted-foreground"
          >
            Connect Nexus with over 100+ tools and services to create a unified workflow for your team.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 sm:mt-16 grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
        >
          {integrations.map((integration, index) => (
            <motion.div
              key={integration.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              className="flex flex-col items-center justify-center"
            >
              <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-xl bg-background p-3 sm:p-4 shadow-sm transition-all duration-200 hover:shadow-md">
                <Image
                  src={integration.logo || "/placeholder.svg"}
                  alt={integration.name}
                  width={80}
                  height={80}
                  className="h-10 w-10 sm:h-12 sm:w-12 object-contain"
                />
              </div>
              <span className="mt-2 text-xs sm:text-sm font-medium">{integration.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
