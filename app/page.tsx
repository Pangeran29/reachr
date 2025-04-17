import type { Metadata } from "next"
import { LandingPage } from "@/components/landing-page"

export const metadata: Metadata = {
  title: "Reachr | AI-Powered Client Acquisition",
  description: "Find and convert new clients with AI-powered WhatsApp marketing automation.",
  // icons: "public/images/logo.png",
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
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Reachr Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reachr | AI-Powered Client Acquisition",
    description: "Find and convert new clients with AI-powered WhatsApp marketing automation.",
    creator: "@reachr",
  },
  icons: {
    icon: "/images/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

export default function Home() {
  return <LandingPage />
}
