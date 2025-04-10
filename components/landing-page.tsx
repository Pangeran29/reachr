"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/sections/header"
import { HeroSection } from "@/components/sections/hero-section"
import { FeaturesSection } from "@/components/sections/features-section"
import { HowItWorksSection } from "@/components/sections/how-it-works-section"
import { FAQSection } from "@/components/sections/faq-section"
import { Footer } from "@/components/sections/footer"
import { ScrollToTop } from "@/components/ui/scroll-to-top"

export function LandingPage() {
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  )
}
