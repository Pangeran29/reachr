"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Zap, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function PricingSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [annual, setAnnual] = useState(true)

  const plans = [
    {
      name: "Starter",
      description: "Perfect for small businesses just getting started.",
      monthly: 49,
      annual: 39,
      features: [
        "Up to 500 contacts",
        "Basic AI marketing strategies",
        "5 WhatsApp campaigns per month",
        "Basic analytics",
      ],
      popular: false,
    },
    {
      name: "Professional",
      description: "Ideal for growing businesses with expanding needs.",
      monthly: 99,
      annual: 79,
      features: [
        "Up to 2,000 contacts",
        "Advanced AI marketing strategies",
        "20 WhatsApp campaigns per month",
        "Detailed analytics and reporting",
        "Priority support",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      description: "For large businesses with custom requirements.",
      monthly: 0,
      annual: 0,
      customPrice: true,
      features: [
        "Unlimited contacts",
        "Custom AI marketing strategies",
        "Unlimited WhatsApp campaigns",
        "Advanced analytics and insights",
        "Dedicated account manager",
        "API access",
      ],
      popular: false,
    },
  ]

  return (
    <section id="pricing" ref={ref} className="relative w-full overflow-hidden py-16 md:py-24 lg:py-32">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-white to-white/80 dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-950/80"></div>
      <div className="absolute inset-0 -z-10 opacity-5">
        <svg
          className="h-full w-full opacity-30"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          preserveAspectRatio="none"
        >
          <pattern
            id="pricing-grid-pattern"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <rect width="100%" height="100%" fill="none" />
            <path d="M 0,20 40,20" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.1" />
            <path d="M 20,0 20,40" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#pricing-grid-pattern)" />
        </svg>
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
              <span>Pricing</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-5xl dark:text-white">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Simple</span>,
              Transparent Pricing
            </h2>
            <p className="mx-auto max-w-[900px] text-lg text-neutral-700 dark:text-neutral-300 md:text-xl">
              Choose the plan that works best for your business needs with no hidden fees.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 flex items-center space-x-4"
          >
            <Label
              htmlFor="billing-toggle"
              className={`text-sm ${!annual ? "font-medium text-neutral-900 dark:text-white" : "text-neutral-500 dark:text-neutral-400"}`}
            >
              Monthly
            </Label>
            <Switch id="billing-toggle" checked={annual} onCheckedChange={setAnnual} />
            <Label
              htmlFor="billing-toggle"
              className={`text-sm ${annual ? "font-medium text-neutral-900 dark:text-white" : "text-neutral-500 dark:text-neutral-400"}`}
            >
              Annual <span className="rounded-full bg-green-500/10 px-2 py-0.5 text-xs text-green-500">Save 20%</span>
            </Label>
          </motion.div>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:gap-8 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className={`group relative overflow-hidden rounded-2xl border ${
                plan.popular
                  ? "border-2 border-primary shadow-lg dark:border-primary/70"
                  : "border-neutral-200 dark:border-neutral-800"
              } bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-neutral-900`}
            >
              {plan.popular && (
                <div className="absolute right-0 top-0 rounded-bl-lg bg-primary px-3 py-1 text-xs font-medium text-white">
                  Most Popular
                </div>
              )}
              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/5 transition-all duration-500 group-hover:-right-16 group-hover:-top-16 group-hover:bg-primary/10 dark:bg-primary/10 dark:group-hover:bg-primary/20"></div>

              <div className="relative space-y-4">
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">{plan.name}</h3>
                <p className="text-neutral-600 dark:text-neutral-400">{plan.description}</p>

                <div className="flex items-baseline text-neutral-900 dark:text-white">
                  {plan.customPrice ? (
                    <span className="text-5xl font-bold">Custom</span>
                  ) : (
                    <>
                      <span className="text-5xl font-bold">${annual ? plan.annual : plan.monthly}</span>
                      <span className="ml-1 text-neutral-500 dark:text-neutral-400">/month</span>
                    </>
                  )}
                </div>

                <ul className="space-y-3 pt-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                      <span className="text-neutral-700 dark:text-neutral-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`mt-6 w-full rounded-full ${
                    plan.popular
                      ? "bg-primary text-white hover:bg-primary/90 dark:bg-primary/90 dark:hover:bg-primary"
                      : plan.customPrice
                        ? "border-primary bg-transparent text-primary hover:bg-primary/10 dark:border-primary/70 dark:text-primary/90 dark:hover:bg-primary/20"
                        : "bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-white/90"
                  } py-6`}
                >
                  {plan.customPrice ? "Contact Sales" : "Get Started"}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
