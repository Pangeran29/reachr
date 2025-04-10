"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { MobileMenu } from "@/components/ui/mobile-menu"
import { ScrollToTop } from "@/components/scroll-to-top"
import { HeroSection } from "@/components/sections/hero-section"
import { FeaturesSection } from "@/components/sections/features-section"
import { FAQSection } from "@/components/sections/faq-section"
import { IntegrationSection } from "@/components/sections/integration-section"
import { Footer } from "@/components/sections/footer"

export default function ClientPage() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    document.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      document.removeEventListener("scroll", handleScroll)
    }
  }, [scrolled])

  const navLinks = [
    {
      href: "#features",
      label: "Features",
    },
    {
      href: "#how-it-works",
      label: "How It Works",
    },
    {
      href: "#faq",
      label: "FAQ",
    },
  ]

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      <ScrollToTop />

      <header
        className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
          scrolled
            ? "border-cloud-gray/20 bg-sky-white/95 shadow-md backdrop-blur-md"
            : "border-transparent bg-sky-white/80 backdrop-blur-sm"
        }`}
      >
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 transition-transform duration-300 hover:scale-105">
            <Image src="/images/logo.png" alt="Reachr Logo" width={120} height={40} className="h-8 w-auto" />
          </Link>
          <nav className="hidden absolute left-1/2 -translate-x-1/2 md:flex">
            <ul className="flex gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group relative text-sm font-medium text-charcoal transition-colors hover:text-primary-blue"
                    onClick={(e) => {
                      e.preventDefault()
                      const element = document.querySelector(link.href)
                      if (element) {
                        window.scrollTo({
                          top: element.getBoundingClientRect().top + window.scrollY - 100,
                          behavior: "smooth",
                        })
                      }
                    }}
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary-blue transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="hidden items-center md:flex">
            <Button
              variant="default"
              className="rounded-full bg-primary-blue hover:bg-primary-blue/90 px-6 py-2 text-sky-white transition-all duration-300 hover:shadow-lg flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-log-in"
              >
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" x2="3" y1="12" y2="12" />
              </svg>
              <span>Log In</span>
            </Button>
          </div>
          <MobileMenu links={navLinks} />
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />
        <FeaturesSection />
        <IntegrationSection />
        <FAQSection />
      </main>

      <Footer />
    </div>
  )
}
