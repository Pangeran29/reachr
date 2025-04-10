import type React from "react"
import type { Metadata } from "next"
import { Mona_Sans as FontSans } from "next/font/google"
import localFont from "next/font/local"

import "./globals.css"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

// Local display font for headings
const fontHeading = localFont({
  src: "../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
})

export const metadata: Metadata = {
  title: "Reachr | AI-Powered Client Acquisition",
  description: "Find and convert new clients with AI-powered WhatsApp marketing automation.",
  keywords: [
    "client acquisition",
    "AI marketing",
    "WhatsApp automation",
    "lead generation",
    "business growth",
    "marketing automation",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://reachr.ai",
    title: "Reachr | AI-Powered Client Acquisition",
    description: "Find and convert new clients with AI-powered WhatsApp marketing automation.",
    siteName: "Reachr",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reachr | AI-Powered Client Acquisition",
    description: "Find and convert new clients with AI-powered WhatsApp marketing automation.",
    creator: "@reachr",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable, fontHeading.variable)}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'