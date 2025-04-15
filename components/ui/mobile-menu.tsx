"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { smoothScrollTo } from "@/lib/utils"

interface MobileMenuProps {
  links: {
    href: string
    label: string
    icon?: React.ReactNode
  }[]
}

export function MobileMenu({ links }: MobileMenuProps) {
  const [open, setOpen] = React.useState(false)

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setOpen(false)

    // Use setTimeout to ensure the menu closes before scrolling
    setTimeout(() => {
      smoothScrollTo(href)
    }, 300)
  }

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10 hover:text-primary"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-full max-w-xs border-white/10 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 p-0"
        >
          <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
            <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
              <Image src="/images/logo.png" alt="Reachr Logo" width={120} height={40} className="h-8 w-auto" />
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(false)}
              className="text-white hover:bg-white/10 hover:text-primary"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          <div className="mt-8 px-4">
            <nav className="flex flex-col space-y-4">
              {links.map((link, index) => (
                <Link
                  key={link.href}
                  href={`#${link.href}`}
                  className={cn(
                    "flex items-center py-2 text-lg font-medium text-white hover:text-primary transition-colors",
                  )}
                  onClick={(e) => handleLinkClick(e, link.href)}
                >
                  {link.icon && <span className="mr-2">{link.icon}</span>}
                  <span>{link.label}</span>
                </Link>
              ))}
            </nav>
            <div className="mt-8 flex flex-col gap-4">
              <Button
                className="relative overflow-hidden rounded-full bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg"
                onClick={() => setOpen(false)}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  Get Access
                </span>
                <span className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 hover:opacity-20"></span>
              </Button>
            </div>
          </div>

          {/* Glossy effect overlay */}
          <div className="pointer-events-none absolute inset-x-0 top-16 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
