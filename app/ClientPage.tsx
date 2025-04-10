"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { MobileMenu } from "@/components/ui/mobile-menu"
import { ScrollToTop } from "@/components/scroll-to-top"
import { HeroSection } from "@/components/sections/hero-section"
import { FeaturesSection } from "@/components/sections/features-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { PricingSection } from "@/components/sections/pricing-section"
import { IntegrationSection } from "@/components/sections/integration-section"
import { FAQSection } from "@/components/sections/faq-section"
import { CTASection } from "@/components/sections/cta-section"

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
      href: "#pricing",
      label: "Pricing",
    },
    {
      href: "#testimonials",
      label: "Testimonials",
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
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>

      <footer className="w-full border-t border-cloud-gray/20 bg-sky-white py-12">
        <div className="container grid gap-8 px-4 md:px-6 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/images/logo.png" alt="Reachr Logo" width={140} height={50} className="h-10 w-auto" />
            </Link>
            <p className="text-sm text-charcoal/70">
              AI-powered client acquisition for businesses of all sizes. Find and convert potential clients without the
              hassle.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="rounded-full bg-primary-blue/10 p-2 text-primary-blue transition-colors hover:bg-primary-blue/20"
              >
                <span className="sr-only">Twitter</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </Link>
              <Link
                href="#"
                className="rounded-full bg-primary-blue/10 p-2 text-primary-blue transition-colors hover:bg-primary-blue/20"
              >
                <span className="sr-only">Instagram</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </Link>
              <Link
                href="#"
                className="rounded-full bg-primary-blue/10 p-2 text-primary-blue transition-colors hover:bg-primary-blue/20"
              >
                <span className="sr-only">LinkedIn</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-charcoal">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#features" className="text-sm text-charcoal/70 hover:text-primary-blue">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="text-sm text-charcoal/70 hover:text-primary-blue">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="text-sm text-charcoal/70 hover:text-primary-blue">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#testimonials" className="text-sm text-charcoal/70 hover:text-primary-blue">
                  Testimonials
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-charcoal">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-charcoal/70 hover:text-primary-blue">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-charcoal/70 hover:text-primary-blue">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-charcoal/70 hover:text-primary-blue">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-charcoal/70 hover:text-primary-blue">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-charcoal">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-charcoal/70 hover:text-primary-blue">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-charcoal/70 hover:text-primary-blue">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-charcoal/70 hover:text-primary-blue">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-charcoal/70 hover:text-primary-blue">
                  GDPR Compliance
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="container mt-8 flex flex-col items-center justify-between gap-4 border-t border-cloud-gray/20 pt-8 md:flex-row md:px-6">
          <p className="text-xs text-charcoal/70">© {new Date().getFullYear()} Reachr. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-xs text-charcoal/70 hover:text-primary-blue">
              Terms
            </Link>
            <Link href="#" className="text-xs text-charcoal/70 hover:text-primary-blue">
              Privacy
            </Link>
            <Link href="#" className="text-xs text-charcoal/70 hover:text-primary-blue">
              Cookies
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
