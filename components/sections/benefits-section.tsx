"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Zap, Target, TrendingUp, Layers, Shield, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function BenefitsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-gradient-to-b from-primary to-primary/90 py-16 md:py-24 lg:py-32"
    >
      <div className="container px-4 md:px-6">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center space-y-4"
          >
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-3 py-1 text-sm text-white">
                <Zap className="mr-1 h-3 w-3" />
                <span>Why Choose Reachr</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                Transform Your Business Growth
              </h2>
              <p className="max-w-[600px] text-lg text-white/90 md:text-xl">
                Join thousands of businesses using Reachr to find and convert new clients with AI-powered marketing.
              </p>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="flex items-start space-x-3">
                <div className="rounded-full bg-secondary/20 p-2">
                  <Target className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Targeted Outreach</h3>
                  <p className="text-white/90">Reach the right clients at the right time</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="rounded-full bg-secondary/20 p-2">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Higher Conversion</h3>
                  <p className="text-white/90">Convert leads 3x faster than traditional methods</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="rounded-full bg-secondary/20 p-2">
                  <Layers className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Time Saving</h3>
                  <p className="text-white/90">Automate 90% of your marketing tasks</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="rounded-full bg-secondary/20 p-2">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Data Security</h3>
                  <p className="text-white/90">Enterprise-grade security for your data</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button className="group relative overflow-hidden rounded-full bg-white px-6 py-6 text-primary transition-all duration-300 hover:shadow-lg">
                <span className="relative z-10 flex items-center">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Button>
              <Button
                variant="outline"
                className="rounded-full border-white px-6 py-6 text-white transition-all duration-300 hover:bg-white/10"
              >
                Schedule a Demo
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative h-[400px] w-[400px] overflow-hidden rounded-2xl border-8 border-white/10 shadow-2xl lg:h-[500px] lg:w-[500px]">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-primary/20"></div>
              <Image src="/images/dashboard-mockup.png" alt="Reachr in Action" fill className="object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-secondary/30 blur-2xl"></div>
            <div className="absolute -left-6 -top-6 h-32 w-32 rounded-full bg-primary/30 blur-2xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
