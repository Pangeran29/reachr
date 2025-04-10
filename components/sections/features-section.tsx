"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Search, Sparkles, Settings, Smartphone, Target, BarChart3, Zap } from "lucide-react"
import { FeatureCard } from "@/components/ui/feature-card"

export function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const features = [
    {
      icon: Search,
      title: "Lead Finder",
      description: "Automatically gather and analyze business data to identify your ideal potential clients.",
    },
    {
      icon: Sparkles,
      title: "AI Prompting Engine",
      description: "Generate personalized marketing strategies and content tailored to your business goals.",
    },
    {
      icon: Settings,
      title: "Strategic Flow Engine",
      description: "Implement proven marketing strategies like the Rule of 7 to maximize conversion rates.",
    },
    {
      icon: Smartphone,
      title: "WhatsApp Automation",
      description: "Create and automate WhatsApp marketing campaigns with high open and response rates.",
    },
    {
      icon: Target,
      title: "Lead Scoring & Tracking",
      description: "Identify the most responsive prospects and track them through your conversion funnel.",
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Track campaign performance with detailed analytics and actionable insights.",
    },
  ]

  return (
    <section id="features" ref={ref} className="relative w-full overflow-hidden py-16 md:py-24 lg:py-32">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-50/80 via-white to-neutral-50/80 dark:from-neutral-950 dark:via-neutral-900/95 dark:to-neutral-950"></div>
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
              <span>Features</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-5xl dark:text-white">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Smart Tools
              </span>{" "}
              for Modern Businesses
            </h2>
            <p className="mx-auto max-w-[900px] text-lg text-neutral-700 dark:text-neutral-300 md:text-xl">
              Reachr combines AI-powered marketing strategies with automated campaigns to help you find and convert
              potential clients with minimal effort.
            </p>
          </motion.div>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mx-auto w-full max-w-[320px] sm:max-w-none"
            >
              <FeatureCard icon={feature.icon} title={feature.title} description={feature.description} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
