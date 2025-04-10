"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MobileMenu } from "@/components/ui/mobile-menu"
import { cn, smoothScrollTo } from "@/lib/utils"
import { motion } from "framer-motion"

export function Header() {
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
      href: "features",
      label: "Features",
    },
    {
      href: "how-it-works",
      label: "How It Works",
    },
    {
      href: "faq",
      label: "FAQ",
    },
  ]

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    smoothScrollTo(sectionId)
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-white/10 bg-neutral-900/80 backdrop-blur-md"
          : "border-transparent bg-gradient-to-r from-neutral-900/90 via-neutral-800/90 to-neutral-900/90 backdrop-blur-sm",
      )}
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 transition-transform duration-300 hover:scale-105">
          <Image src="/images/logo.png" alt="Reachr Logo" width={120} height={40} className="h-8 w-auto" priority />
        </Link>
        <nav className="absolute left-1/2 hidden -translate-x-1/2 md:flex">
          <ul className="flex gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={`#${link.href}`}
                  className="group relative text-sm font-medium text-neutral-300 transition-colors hover:text-white"
                  onClick={(e) => scrollToSection(e, link.href)}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-primary to-secondary transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="hidden items-center md:flex">
          <Button
            variant="default"
            className="relative overflow-hidden rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-2 text-white transition-all duration-300 hover:shadow-lg"
          >
            <span className="relative z-10 flex items-center gap-2">
              <LogIn className="h-4 w-4" />
              <span>Log In</span>
            </span>
            <span className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 hover:opacity-20"></span>
          </Button>
        </div>
        <MobileMenu links={navLinks} />
      </div>

      {/* Glossy effect overlay */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
    </motion.header>
  )
}
