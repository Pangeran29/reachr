"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { Twitter, Instagram, Linkedin } from "lucide-react"
import { smoothScrollTo } from "@/lib/utils"

export function Footer() {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    smoothScrollTo(sectionId)
  }

  return (
    <footer className="relative w-full border-t border-neutral-200/20 bg-neutral-50 py-10 sm:py-12 dark:border-neutral-800/20 dark:bg-neutral-900">
      {/* Enhanced background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-tr from-neutral-100 via-neutral-50 to-neutral-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950"></div>
        <div className="absolute inset-0 bg-grid-neutral-200/40 bg-[size:24px_24px] opacity-20 dark:bg-grid-neutral-800/20"></div>
      </div>

      <div className="container relative px-4 md:px-6">
        <div className="mx-auto max-w-5xl">
          {/* Main footer content */}
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:gap-10">
            {/* Brand column */}
            <div className="w-full space-y-4 md:w-1/2 lg:pr-12">
              <Link
                href="/"
                className="inline-flex items-center gap-2 transition-transform duration-300 hover:scale-105"
              >
                <Image
                  src="/images/logo.png"
                  alt="Reachr Logo"
                  width={120}
                  height={40}
                  className="h-8 w-auto sm:h-10"
                />
              </Link>
              <p className="max-w-md text-xs sm:text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                AI-powered client acquisition for businesses of all sizes. Find and convert potential clients without
                the hassle.
              </p>
              <div className="flex space-x-3 sm:space-x-4 pt-2">
                <Link
                  href="#"
                  className="rounded-full bg-primary/10 p-1.5 sm:p-2 text-primary transition-all duration-300 hover:bg-primary/20 hover:shadow-sm dark:bg-primary/20 dark:hover:bg-primary/30"
                >
                  <span className="sr-only">Twitter</span>
                  <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
                <Link
                  href="#"
                  className="rounded-full bg-primary/10 p-1.5 sm:p-2 text-primary transition-all duration-300 hover:bg-primary/20 hover:shadow-sm dark:bg-primary/20 dark:hover:bg-primary/30"
                >
                  <span className="sr-only">Instagram</span>
                  <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
                <Link
                  href="#"
                  className="rounded-full bg-primary/10 p-1.5 sm:p-2 text-primary transition-all duration-300 hover:bg-primary/20 hover:shadow-sm dark:bg-primary/20 dark:hover:bg-primary/30"
                >
                  <span className="sr-only">LinkedIn</span>
                  <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </div>
            </div>

            {/* Navigation column */}
            <div className="w-full md:w-auto">
              <div className="space-y-4">
                <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">Product</h3>
                <ul className="space-y-2 sm:space-y-3">
                  <li>
                    <Link
                      href="#features"
                      className="group inline-flex items-center text-xs sm:text-sm text-neutral-600 transition-colors hover:text-primary dark:text-neutral-400 dark:hover:text-primary"
                      onClick={(e) => handleLinkClick(e, "features")}
                    >
                      <span className="relative">
                        Features
                        <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#how-it-works"
                      className="group inline-flex items-center text-xs sm:text-sm text-neutral-600 transition-colors hover:text-primary dark:text-neutral-400 dark:hover:text-primary"
                      onClick={(e) => handleLinkClick(e, "how-it-works")}
                    >
                      <span className="relative">
                        How It Works
                        <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#faq"
                      className="group inline-flex items-center text-xs sm:text-sm text-neutral-600 transition-colors hover:text-primary dark:text-neutral-400 dark:hover:text-primary"
                      onClick={(e) => handleLinkClick(e, "faq")}
                    >
                      <span className="relative">
                        FAQ
                        <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Copyright section */}
          <div className="mt-8 sm:mt-12 border-t border-neutral-200/20 pt-4 sm:pt-6 dark:border-neutral-800/20">
            <div className="flex flex-col items-center justify-between gap-3 sm:gap-4 text-center md:flex-row md:text-left">
              <p className="text-xs text-neutral-500 dark:text-neutral-500">
                © {new Date().getFullYear()} Reachr. All rights reserved.
              </p>
              <div className="h-1 w-1 rounded-full bg-neutral-300 dark:bg-neutral-700 md:block"></div>
              <p className="text-xs text-neutral-500 dark:text-neutral-500">Powered by AI technology</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
