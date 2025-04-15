"use client"

import type React from "react"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronDown,
  Sparkles,
  ArrowRight,
  X,
  Search,
  Loader2,
  CheckCircle,
  AlertCircle,
  Check,
  ChevronsUpDown,
  Info,
  Phone,
  MapPin,
  BarChart3,
  Users,
  Megaphone,
  Repeat,
  ArrowUpRight,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { smoothScrollTo } from "@/lib/utils"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { offsetPositive } from "recharts/types/util/ChartUtils"

// Define the client data type
interface PotentialClient {
  id: string
  name: string
  address: string
  phoneNumber: string
  industry: string
  matchScore: number
  tags: string[]
}

// Define the marketing strategy type
interface MarketingStrategy {
  title: string
  description: string
  steps: {
    name: string
    description: string
    timing: string
    icon: React.ElementType
  }[]
  expectedResults: string[]
}

export function HeroSection() {
  const [businessInfo, setBusinessInfo] = useState("")
  const [currentView, setCurrentView] = useState<"initial" | "form" | "analyzing" | "clientResults">("initial")
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isSufficientInfo, setIsSufficientInfo] = useState(false)
  const [potentialCustomers, setPotentialCustomers] = useState(0)
  const [selectedAction, setSelectedAction] = useState<string | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // New state variables for marketing strategy
  const [isGeneratingStrategy, setIsGeneratingStrategy] = useState(false)
  const [marketingStrategy, setMarketingStrategy] = useState<MarketingStrategy | null>(null)
  const [analysisType, setAnalysisType] = useState<"clients" | "strategy">("clients")

  const initialViewRef = useRef<HTMLDivElement>(null)
  const formViewRef = useRef<HTMLDivElement>(null)
  const analyzingViewRef = useRef<HTMLDivElement>(null)
  const clientResultsViewRef = useRef<HTMLDivElement>(null)
  const strategyResultsRef = useRef<HTMLDivElement>(null)

  // Form data
  const [formData, setFormData] = useState({
    businessName: "",
    productService: [] as string[],
    description: "",
    targetAudience: "",
    location: "",
    sector: "",
  })

  // Add a state for screen reader announcements
  const [announcement, setAnnouncement] = useState("")

  // Add this after the other state declarations
  const [analysisResults, setAnalysisResults] = useState<{
    potentialCustomers: number
    insights: string[]
    timestamp: string
  } | null>(null)

  // Add these state variables after other state declarations
  const [analysisError, setAnalysisError] = useState<string | null>(null)
  const [analysisTimeout, setAnalysisTimeout] = useState<NodeJS.Timeout | null>(null)
  const [analysisAttempts, setAnalysisAttempts] = useState(0)

  // Add state for potential clients
  const [potentialClients, setPotentialClients] = useState<PotentialClient[]>([])
  const [activeTab, setActiveTab] = useState("overview")
  const [copiedId, setCopiedId] = useState<string | null>(null)

  // Product/Service categories and options
  const productServiceCategories = [
    {
      name: "Retail & E-commerce",
      options: [
        "Fashion & Apparel",
        "Electronics & Gadgets",
        "Health & Beauty",
        "Home & Furniture",
        "Books & Stationery",
        "Online Marketplaces",
        "Groceries & Food Delivery",
      ],
    },
    {
      name: "Food & Beverage",
      options: [
        "Restaurants & Cafes",
        "Food Trucks",
        "Catering Services",
        "Bakeries & Dessert Shops",
        "Beverage Brands",
        "Packaged Foods & Snacks",
      ],
    },
    {
      name: "Health & Wellness",
      options: [
        "Clinics & Medical Practices",
        "Dental Services",
        "Mental Health Services",
        "Fitness Studios / Gyms",
        "Yoga & Meditation Centers",
        "Nutrition & Supplements",
      ],
    },
    {
      name: "Professional Services",
      options: [
        "Legal Services",
        "Accounting & Tax",
        "Financial Advisory",
        "Consulting Firms",
        "Real Estate Agencies",
        "Architecture & Interior Design",
      ],
    },
    {
      name: "Creative & Digital Services",
      options: [
        "Marketing Agencies",
        "Graphic & Web Design",
        "Photography & Videography",
        "Software Development",
        "UI/UX Design",
        "Branding & Copywriting",
      ],
    },
    {
      name: "Education & Training",
      options: [
        "Tutoring Centers",
        "Online Courses / E-learning Platforms",
        "Language Schools",
        "Test Preparation",
        "Skill Training & Bootcamps",
        "Corporate Training",
      ],
    },
    {
      name: "Technology & SaaS",
      options: [
        "Software as a Service (SaaS)",
        "Mobile Apps",
        "Fintech",
        "Healthtech",
        "Edtech",
        "AI & Data Analytics",
      ],
    },
    {
      name: "Hospitality & Travel",
      options: [
        "Hotels & Hostels",
        "Travel Agencies",
        "Tour Operators",
        "Vacation Rentals",
        "Event Planning",
        "Transportation Services",
      ],
    },
    {
      name: "Manufacturing & Industrial",
      options: [
        "Machinery & Equipment",
        "Automotive & Spare Parts",
        "Chemicals & Materials",
        "Packaging",
        "Construction Supplies",
        "Printing & Publishing",
      ],
    },
    {
      name: "Agriculture & Farming",
      options: ["Crop Production", "Livestock", "Agrotech", "Organic Farming", "Aquaculture", "Agro-processing"],
    },
    {
      name: "Finance & Insurance",
      options: [
        "Banks & Credit Unions",
        "Investment Firms",
        "Insurance Companies",
        "Payment Solutions",
        "Loan Services",
        "Crypto & Blockchain",
      ],
    },
    {
      name: "Real Estate & Property",
      options: [
        "Property Development",
        "Rental Management",
        "Property Listing Platforms",
        "Real Estate Brokerage",
        "Commercial Leasing",
      ],
    },
  ]

  // Form errors
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  const scrollToFeatures = () => {
    smoothScrollTo("features")
  }

  const toggleProductService = (value: string) => {
    setFormData((prev) => {
      const current = [...prev.productService]
      const index = current.indexOf(value)

      if (index === -1) {
        // Add the value if it's not already selected
        current.push(value)
      } else {
        // Remove the value if it's already selected
        current.splice(index, 1)
      }

      // Clear error for this field when user makes a selection
      if (formErrors.productService) {
        setFormErrors((prev) => {
          const newErrors = { ...prev }
          delete newErrors.productService
          return newErrors
        })
      }

      return { ...prev, productService: current }
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error for this field when user types
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const errors: Record<string, string> = {}

    // Check required fields based on current step
    if (currentStep === 0) {
      if (formData.productService.length === 0) {
        errors.productService = "Please select at least one product or service"
      }
      if (!formData.description.trim()) {
        errors.description = "Description is required"
      }
      if (!formData.location.trim()) {
        errors.location = "Location is required"
      }
    } else {
      if (!formData.location.trim()) {
        errors.location = "Location is required"
      }
      if (!formData.sector.trim()) {
        errors.sector = "Sector is required"
      }
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const isAnalysisInsufficient = (data: typeof formData): { insufficient: boolean; reason: string } => {
    // Check for empty or very short description
    if (!data.description || data.description.length < 15) {
      return {
        insufficient: true,
        reason: "Your business description is too brief. Please provide more details about what your business does.",
      }
    }

    // Check for missing product/service selection
    if (!data.productService || data.productService.length === 0) {
      return {
        insufficient: true,
        reason: "Please select at least one product or service that your business offers.",
      }
    }

    // Check for missing or vague location
    if (!data.location || data.location.length < 2) {
      return {
        insufficient: true,
        reason: "Please specify your geographic focus area to help identify relevant clients.",
      }
    }

    // Check for timeout (simulated in this implementation)
    if (analysisAttempts > 2) {
      return {
        insufficient: true,
        reason:
          "Analysis timed out. This could be due to complex data or system load. Please try again with more specific information.",
      }
    }

    return { insufficient: false, reason: "" }
  }

  // Function to hash phone numbers for privacy
  const hashPhoneNumber = (phoneNumber: string): string => {
    // Keep first 3 digits and last 2 digits visible, hash the rest
    const firstPart = phoneNumber.substring(0, 3)
    const lastPart = phoneNumber.substring(phoneNumber.length - 2)
    const middleLength = phoneNumber.length - 5
    const hashedMiddle = "*".repeat(middleLength)
    return `${firstPart}${hashedMiddle}${lastPart}`
  }

  // Function to generate sample client data
  const generateSampleClients = (location: string, industry: string): PotentialClient[] => {
    // Company name generators based on industry
    const companyPrefixes: Record<string, string[]> = {
      default: ["Global", "Premier", "Elite", "Advanced", "Innovative"],
      Technology: ["Tech", "Digital", "Cyber", "Smart", "Cloud"],
      Healthcare: ["Care", "Health", "Wellness", "Medical", "Life"],
      Finance: ["Capital", "Financial", "Wealth", "Asset", "Trust"],
      Retail: ["Shop", "Store", "Retail", "Market", "Boutique"],
      Food: ["Taste", "Flavor", "Gourmet", "Culinary", "Fresh"],
    }

    const companySuffixes: Record<string, string[]> = {
      default: ["Solutions", "Group", "Partners", "Associates", "Enterprises"],
      Technology: ["Systems", "Networks", "Solutions", "Technologies", "Innovations"],
      Healthcare: ["Care", "Clinic", "Services", "Center", "Associates"],
      Finance: ["Advisors", "Partners", "Management", "Investments", "Consultants"],
      Retail: ["Emporium", "Outlet", "Marketplace", "Traders", "Depot"],
      Food: ["Kitchen", "Bistro", "Eatery", "Dining", "Catering"],
    }

    // Street names based on location
    const streets: Record<string, string[]> = {
      default: ["Main St", "Oak Ave", "Maple Rd", "Cedar Ln", "Pine Blvd"],
      "New York": ["Broadway", "5th Avenue", "Madison Ave", "Park Ave", "Lexington Ave"],
      "Los Angeles": ["Sunset Blvd", "Wilshire Blvd", "Rodeo Dr", "Venice Blvd", "Hollywood Blvd"],
      Chicago: ["Michigan Ave", "State St", "Wacker Dr", "Clark St", "Lake St"],
      London: ["Oxford St", "Baker St", "Bond St", "Regent St", "Piccadilly"],
      Tokyo: ["Ginza", "Shibuya", "Shinjuku", "Akihabara", "Roppongi"],
    }

    // Get appropriate name generators based on industry and location
    const prefixes = companyPrefixes[industry] || companyPrefixes.default
    const suffixes = companySuffixes[industry] || companySuffixes.default
    const streetNames = streets[location] || streets.default

    // Generate 5 sample clients
    return Array.from({ length: 5 }, (_, i) => {
      const prefix = prefixes[Math.floor(Math.random() * prefixes.length)]
      const suffix = suffixes[Math.floor(Math.random() * suffixes.length)]
      const name = `${prefix} ${suffix}`

      const streetNumber = Math.floor(Math.random() * 1000) + 1
      const street = streetNames[Math.floor(Math.random() * streetNames.length)]
      const address = `${streetNumber} ${street}, ${location}`

      // Generate a random phone number
      const areaCode = Math.floor(Math.random() * 900) + 100
      const firstPart = Math.floor(Math.random() * 900) + 100
      const secondPart = Math.floor(Math.random() * 9000) + 1000
      const phoneNumber = `${areaCode}-${firstPart}-${secondPart}`
      const hashedPhone = hashPhoneNumber(phoneNumber)

      // Generate random match score between 70 and 98
      const matchScore = Math.floor(Math.random() * 29) + 70

      // Generate random tags based on industry
      const allTags = [
        "High Growth",
        "New Business",
        "Expanding",
        "Local",
        "Enterprise",
        "SMB",
        "Startup",
        "Established",
        "B2B",
        "B2C",
      ]
      const numTags = Math.floor(Math.random() * 3) + 1
      const tags = Array.from({ length: numTags }, () => {
        const randomIndex = Math.floor(Math.random() * allTags.length)
        return allTags[randomIndex]
      })

      return {
        id: `client-${i + 1}`,
        name,
        address,
        phoneNumber: hashedPhone,
        industry,
        matchScore,
        tags,
      }
    })
  }

  // Function to generate marketing strategy
  const generateMarketingStrategy = (): MarketingStrategy => {
    // Get the business type from form data
    const businessType = formData.productService.length > 0 ? formData.productService[0] : "business"
    const location = formData.location || "your area"

    return {
      title: `WhatsApp Marketing Strategy for ${businessType}`,
      description: `Based on your business profile and the identified potential clients in ${location}, we've developed a comprehensive WhatsApp marketing strategy designed to maximize engagement and conversion rates.`,
      steps: [
        {
          name: "Initial Awareness Message",
          description: `Introduction to your ${businessType} with a value proposition tailored to the client's specific needs. This message establishes your brand identity and creates initial awareness.`,
          timing: "Day 1",
          icon: Megaphone,
        },
        {
          name: "Educational Content",
          description: `Share industry insights, tips, or how-to content related to ${businessType} that provides immediate value to the prospect without asking for anything in return.`,
          timing: "Day 3",
          icon: Info,
        },
        {
          name: "Social Proof",
          description:
            "Share testimonials, case studies, or success stories from existing clients, demonstrating the real-world benefits of your services.",
          timing: "Day 5",
          icon: Users,
        },
        {
          name: "Special Offer",
          description:
            "Present a time-limited offer or exclusive promotion designed specifically for WhatsApp contacts, creating urgency and incentivizing action.",
          timing: "Day 8",
          icon: ArrowUpRight,
        },
        {
          name: "Follow-up & Engagement",
          description:
            "Personalized follow-up based on previous interactions, addressing specific pain points and answering any questions.",
          timing: "Day 10",
          icon: Repeat,
        },
        {
          name: "Direct Call-to-Action",
          description:
            "Clear invitation to take the next step, whether scheduling a consultation, requesting a demo, or making a purchase.",
          timing: "Day 12",
          icon: ArrowRight,
        },
        {
          name: "Relationship Nurturing",
          description:
            "Continued value-adding content and occasional check-ins to maintain the relationship, even if they haven't converted yet.",
          timing: "Ongoing",
          icon: BarChart3,
        },
      ],
      expectedResults: [
        `Reach at least 80% of the ${analysisResults?.potentialCustomers || 500} identified potential clients`,
        "Achieve a 35-45% response rate to initial messages",
        "Convert 15-25% of engaged prospects into qualified leads",
        "Generate 5-10% conversion rate from lead to customer",
        "Establish ongoing relationships with 30% of contacts for future marketing",
      ],
    }
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setAnalysisError(null)

    if (!validateForm()) return

    // Set the view to "analyzing" while the form is being submitted
    setCurrentView("analyzing")
    setIsSubmitting(true)

    try {
      // Prepare the request body
      const requestBody = {
        businessDescription: formData.description,
      }

      // Make the API call
      const response = await fetch(
        "https://reacher-api.alifwide.workers.dev/api/generate-potential-clients",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        },
      )

      if (!response.ok) {
        throw new Error("Failed to fetch potential clients. Please try again.")
      }

      // Parse the response
      const data = await response.json();

      // Extract places and map them to the PotentialClient format
      const places = data.places.places || [];
      const potentialClients = places.map((place, index) => ({
        id: `client-${index + 1}`,
        name: place.displayName.text,
        address: place.formattedAddress,
        phoneNumber: place.nationalPhoneNumber,
        industry: "Unknown", // You can update this if the API provides industry info
        matchScore: Math.floor(Math.random() * 30) + 70, // Generate a random match score
        tags: ["High Growth", "Local"], // Add default tags or customize based on API response
      }));

      // Update state with the API response
      setPotentialClients(potentialClients);
      setAnalysisResults({
        potentialCustomers: places.length,
        insights: data.keywords || [],
        timestamp: new Date().toLocaleString(),
      });

      // Transition to client results view
      setTimeout(() => {
        setIsSubmitting(false);
        setIsAnalyzing(false);
        setCurrentView("clientResults");
      }, 1000);
    } catch (error) {
      setIsSubmitting(false);
      setIsAnalyzing(false);
      setAnalysisError(error.message || "An unexpected error occurred.");
      setCurrentView("form");
    }
  }

  // Function to handle creating marketing strategy
  const handleCreateMarketingStrategy = () => {
    setIsGeneratingStrategy(true)
    setCurrentView("analyzing")
    setAnalysisType("strategy")

    // Simulate strategy generation
    setTimeout(() => {
      const strategy = generateMarketingStrategy()
      setMarketingStrategy(strategy)
      setIsGeneratingStrategy(false)
      setCurrentView("clientResults")
      setAnalysisType("strategy")
    }, 3000)
  }

  const handleActionSelect = (action: string) => {
    setSelectedAction(action)

    // Simulate action processing
    setTimeout(() => {
      // In a real app, this would navigate to the appropriate page or show more content
      resetForm()
    }, 2000)
  }

  const resetForm = () => {
    setCurrentView("initial")
    setBusinessInfo("")
    setFormData({
      businessName: "",
      productService: [] as string[],
      description: "",
      targetAudience: "",
      location: "",
      sector: "",
    })
    setCurrentStep(0)
    setIsAnalyzing(false)
    setIsSufficientInfo(false)
    setSelectedAction(null)
    setAnalysisResults(null)
    setAnalysisError(null)
    setAnalysisAttempts(0)
    setPotentialClients([])
    setActiveTab("overview")
    setMarketingStrategy(null)
    setAnalysisType("clients")
    if (analysisTimeout) {
      clearTimeout(analysisTimeout)
      setAnalysisTimeout(null)
    }
  }

  const handleCopyContact = (id: string) => {
    const client = potentialClients.find((c) => c.id === id)
    if (client) {
      // In a real app, this would copy the contact info to clipboard
      // For this demo, we'll just show the copied state
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    }
  }

  const returnToForm = () => {
    setCurrentView("form")
  }

  // Add a new function to handle responsive scrolling based on screen size
  // Add this after the scrollToActiveView function

  const getScrollOffset = useCallback(() => {
    // Adjust offset based on screen size
    if (typeof window !== "undefined") {
      // For mobile devices
      if (window.innerWidth < 640) {
        return -40 // Smaller offset for mobile
      }
      // For tablets
      else if (window.innerWidth < 1024) {
        return -200 // Medium offset for tablets
      }
      // For desktops
      else {
        return -158 // Larger offset for desktops
      }
    }
    return -40 // Default offset
  }, [])

  // Update the scrollToActiveView function to use the offset
  const scrollToActiveView = useCallback(
    (view: "initial" | "form" | "analyzing" | "clientResults") => {
      // Determine which ref to use based on the current view
      let targetRef: React.RefObject<HTMLDivElement> | null = null

      switch (view) {
        case "initial":
          targetRef = initialViewRef
          break
        case "form":
          targetRef = formViewRef
          break
        case "analyzing":
          targetRef = analyzingViewRef
          break
        case "clientResults":
          targetRef = clientResultsViewRef
          break
        default:
          targetRef = null
      }

      // Scroll to the target element if it exists
      if (targetRef?.current) {
        // Use a small timeout to ensure the DOM has updated
        setTimeout(() => {
          const offset = getScrollOffset()
          const targetPosition = targetRef?.current?.getBoundingClientRect().top || 0
          const offsetPosition = targetPosition + window.pageYOffset + offset

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          })
        }, 100)
      }
    },
    [getScrollOffset],
  )

  // Add a new effect to handle window resize events
  useEffect(() => {
    // Re-scroll when window is resized to maintain proper positioning
    const handleResize = () => {
      scrollToActiveView(currentView)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [currentView, scrollToActiveView])

  // Auto-resize textarea
  useEffect(() => {
    const adjustHeight = () => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto"
        const newHeight = Math.min(textareaRef.current.scrollHeight, 120)
        textareaRef.current.style.height = `${newHeight}px`
      }
    }

    adjustHeight()
    window.addEventListener("resize", adjustHeight)
    return () => window.removeEventListener("resize", adjustHeight)
  }, [businessInfo])

  // Update the effect that handles view changes to include announcements
  useEffect(() => {
    // Set appropriate announcement based on current view
    switch (currentView) {
      case "initial":
        setAnnouncement("Welcome to Reachr. Get started by telling us about your business.")
        break
      case "form":
        setAnnouncement("Please provide additional details about your business.")
        break
      case "analyzing":
        setAnnouncement(
          analysisType === "clients"
            ? "Analyzing your business information. Please wait."
            : "Generating marketing strategy. Please wait.",
        )
        break
      case "clientResults":
        setAnnouncement(
          analysisType === "clients"
            ? "Analysis complete. Potential clients identified."
            : "Marketing strategy generated.",
        )
        break
      default:
        setAnnouncement("")
    }

    scrollToActiveView(currentView)
  }, [currentView, scrollToActiveView, analysisType])

  useEffect(() => {
    scrollToActiveView(currentView)
  }, [currentView, scrollToActiveView])

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!businessInfo.trim()) return

    // Set initial business info
    setFormData((prev) => ({
      ...prev,
      businessName: businessInfo,
      productService: [], // Initialize as empty array
      description: businessInfo, // Auto-populate description with businessInfo
    }))

    // Transition to form view
    setCurrentView("form")
  }

  // Enhance the focus management for keyboard users
  // Add this function after the existing functions but before the return statement

  const focusFirstInteractiveElement = useCallback((view: "initial" | "form" | "analyzing" | "clientResults") => {
    // Use a timeout to ensure the DOM has updated
    setTimeout(() => {
      let targetRef: React.RefObject<HTMLDivElement> | null = null

      switch (view) {
        case "initial":
          targetRef = initialViewRef
          break
        case "form":
          targetRef = formViewRef
          break
        case "analyzing":
          targetRef = analyzingViewRef
          break
        case "clientResults":
          targetRef = clientResultsViewRef
          break
        default:
          targetRef = null
      }

      if (targetRef?.current) {
        // Find the first focusable element in the view
        const focusableElements = targetRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        )

        // Only focus if there are focusable elements and we're not in the initial view
        // (to avoid stealing focus when the page first loads)
        if (focusableElements.length > 0 && view !== "initial") {
          // Focus the first interactive element
          ;(focusableElements[0] as HTMLElement).focus({ preventScroll: true })
        }
      }
    }, 300) // Slightly longer timeout to ensure animations have started
  }, [])

  // Update the effect that handles view changes to include focus management
  useEffect(() => {
    // Set appropriate announcement based on current view
    switch (currentView) {
      case "initial":
        setAnnouncement("Welcome to Reachr. Get started by telling us about your business.")
        break
      case "form":
        setAnnouncement("Please provide additional details about your business.")
        break
      case "analyzing":
        setAnnouncement(
          analysisType === "clients"
            ? "Analyzing your business information. Please wait."
            : "Generating marketing strategy. Please wait.",
        )
        break
      case "clientResults":
        setAnnouncement(
          analysisType === "clients"
            ? "Analysis complete. Potential clients identified."
            : "Marketing strategy generated.",
        )
        break
      default:
        setAnnouncement("")
    }

    scrollToActiveView(currentView)

    // Only focus elements for non-initial views to avoid stealing focus on page load
    if (currentView !== "initial") {
      focusFirstInteractiveElement(currentView)
    }
  }, [currentView, scrollToActiveView, focusFirstInteractiveElement, analysisType])

  // Reset analysis results when form data changes significantly
  useEffect(() => {
    if (
      analysisResults &&
      (formData.productService.length === 0 || formData.description.length < 10 || !formData.location)
    ) {
      setAnalysisResults(null)
    }
  }, [formData.productService, formData.description, formData.location, analysisResults])

  // Add this useEffect after other useEffect hooks
  useEffect(() => {
    // Cleanup function to clear timeout when component unmounts
    return () => {
      if (analysisTimeout) {
        clearTimeout(analysisTimeout)
      }
    }
  }, [analysisTimeout])

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 py-20 sm:py-24 md:py-32 lg:py-40">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]"></div>

      {/* Animated gradient orbs */}
      <div className="absolute left-1/4 top-1/4 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl"></div>
      <div className="absolute right-1/4 bottom-1/4 h-64 w-64 translate-x-1/2 translate-y-1/2 rounded-full bg-secondary/20 blur-3xl"></div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-white/30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
              opacity: [0.7, 0],
              scale: [1, Math.random() * 2 + 0.5],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
          />
        ))}
      </div>

      <div className="container relative px-4 md:px-6">
        <div className="mx-auto max-w-5xl">
          <AnimatePresence mode="wait">
            {currentView === "initial" && (
              <motion.div
                key="initial-view"
                ref={initialViewRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="grid gap-12 md:grid-cols-2 md:items-center"
              >
                {/* Left column: Content */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="space-y-6 text-center md:text-left"
                >
                  {/* Badge */}
                  <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs sm:text-sm font-medium text-white backdrop-blur-sm">
                    <Sparkles className="mr-1.5 h-3.5 w-3.5 text-primary" />
                    AI-Powered Client Acquisition
                  </div>

                  {/* Main headline */}
                  <h1 className="text-balance text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white">
                    Find & Convert{" "}
                    <span className="relative">
                      <span className="relative z-10 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        New Clients
                      </span>
                      <span className="absolute -bottom-1.5 left-0 z-0 h-3 w-full rounded-sm bg-gradient-to-r from-primary/20 to-secondary/20 blur-sm"></span>
                    </span>{" "}
                    With AI
                  </h1>

                  {/* Subheading */}
                  <p className="text-base sm:text-lg md:text-xl text-neutral-300">
                    Reachr uses artificial intelligence to help your business discover, engage, and convert high-quality
                    leads without the complexity of traditional marketing.
                  </p>

                  {/* Value propositions */}
                  <div className="flex flex-wrap justify-center gap-4 md:justify-start">
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                        <CheckCircle className="h-3.5 w-3.5 text-primary" />
                      </div>
                      <span className="text-sm text-neutral-300">Easy to use</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                        <CheckCircle className="h-3.5 w-3.5 text-primary" />
                      </div>
                      <span className="text-sm text-neutral-300">AI-powered</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                        <CheckCircle className="h-3.5 w-3.5 text-primary" />
                      </div>
                      <span className="text-sm text-neutral-300">Free to start</span>
                    </div>
                  </div>
                </motion.div>

                {/* Right column: Input form */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                  className="relative"
                >
                  <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                    {/* Glow effect */}
                    <div className="absolute -top-10 right-10 h-40 w-40 rounded-full bg-primary/30 blur-3xl"></div>
                    <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-secondary/30 blur-3xl"></div>

                    {/* Form content */}
                    <div className="relative">
                      <h2 className="mb-4 text-xl font-bold text-white">Get Started</h2>
                      <p className="mb-6 text-sm text-neutral-300">
                        Tell us about your business and we'll help you find potential clients.
                      </p>

                      <form onSubmit={handleInitialSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="businessInfo" className="text-sm font-medium text-white">
                            Business Information
                          </Label>
                          <div className="relative">
                            <Textarea
                              id="businessInfo"
                              ref={textareaRef}
                              placeholder="Tell me anything about your business..."
                              value={businessInfo}
                              onChange={(e) => setBusinessInfo(e.target.value)}
                              className="min-h-[80px] w-full rounded-xl border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-primary focus:ring-primary resize-none scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-track-transparent scrollbar-thumb-primary/40 hover:scrollbar-thumb-primary/60"
                              disabled={isSubmitting}
                              rows={3}
                            />
                            <div className="absolute bottom-3 right-3 text-xs text-white/40">
                              {businessInfo.length > 0 ? businessInfo.length : "0"}/500
                            </div>
                          </div>
                        </div>

                        <Button
                          type="submit"
                          className={`group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-primary to-secondary py-3 text-white transition-all duration-300 hover:shadow-lg ${
                            !businessInfo.trim() ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                          disabled={!businessInfo.trim() || isSubmitting}
                        >
                          <span className="relative z-10 flex items-center justify-center text-base font-medium">
                            {isSubmitting ? (
                              <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                Processing...
                              </>
                            ) : (
                              <>
                                Get Started
                                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                              </>
                            )}
                          </span>
                          <span className="absolute inset-0 -z-10 bg-white/0 transition-all duration-300 group-hover:bg-white/10"></span>
                        </Button>
                      </form>

                      <div className="mt-4 flex items-center justify-center gap-2">
                        <div className="h-1 w-1 rounded-full bg-white/30"></div>
                        <p className="text-xs text-white/50">Powered by advanced AI</p>
                        <div className="h-1 w-1 rounded-full bg-white/30"></div>
                        <p className="text-xs text-white/50">Get started in minutes</p>
                      </div>
                    </div>
                  </div>

                  {/* Floating elements */}
                  <div className="absolute -right-8 -top-8 hidden md:block">
                    <div className="relative h-16 w-16 rounded-lg bg-white/5 p-4 backdrop-blur-sm border border-white/10 shadow-xl">
                      <Search className="h-8 w-8 text-primary" />
                      <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                        AI
                      </div>
                    </div>
                  </div>

                  <div className="absolute -bottom-6 -left-6 hidden md:block">
                    <div className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 backdrop-blur-sm border border-white/10 shadow-xl">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span className="text-xs font-medium text-white">Early access available now</span>
                    </div>
                  </div>
                </motion.div>

                {/* Scroll down indicator */}
                <motion.div
                  className="mt-16 flex cursor-pointer flex-col items-center md:col-span-2"
                  onClick={scrollToFeatures}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 1,
                    ease: "easeOut",
                  }}
                >
                  <p className="mb-2 text-sm font-medium text-white/70">Discover how it works</p>
                  <motion.div
                    animate={{
                      y: [0, 8, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "loop",
                      ease: "easeInOut",
                    }}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-sm"
                  >
                    <ChevronDown className="h-5 w-5 text-white" />
                  </motion.div>
                </motion.div>
              </motion.div>
            )}

            {currentView === "form" && (
              <motion.div
                key="form-view"
                ref={formViewRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="mx-auto max-w-3xl"
              >
                {/* Enhanced AI Agent Header */}
                <div className="mb-8 flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-primary to-secondary opacity-50 blur-sm"></div>
                    <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary">
                      <Sparkles className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Reachr Business Analyst</h2>
                    <p className="text-sm text-white/70">Advanced AI-powered business intelligence</p>
                  </div>
                  <Button
                    onClick={resetForm}
                    className="ml-auto rounded-full bg-white/10 p-1.5 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Form Content */}
                {currentStep === 0 ? (
                  <div>
                    {analysisError && (
                      <div className="mb-6 rounded-lg bg-red-500/10 p-5 border border-red-500/20">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
                          <div>
                            <p className="font-medium text-white">Analysis Could Not Be Completed</p>
                            <p className="mt-1 text-sm text-white/80">{analysisError}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                              <Badge variant="outline" className="bg-white/5 text-white/80 border-white/10">
                                <div className="flex items-center gap-1.5">
                                  <Info className="h-3 w-3 text-primary" />
                                  <span>Be more specific</span>
                                </div>
                              </Badge>
                              <Badge variant="outline" className="bg-white/5 text-white/80 border-white/10">
                                <div className="flex items-center gap-1.5">
                                  <Info className="h-3 w-3 text-primary" />
                                  <span>Include industry terms</span>
                                </div>
                              </Badge>
                              <Badge variant="outline" className="bg-white/5 text-white/80 border-white/10">
                                <div className="flex items-center gap-1.5">
                                  <Info className="h-3 w-3 text-primary" />
                                  <span>Mention target audience</span>
                                </div>
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="mb-6 rounded-lg bg-white/5 p-5 border border-white/10">
                      <p className="text-white leading-relaxed">
                        Thank you for providing your business information. To conduct a comprehensive analysis and
                        identify optimal client acquisition opportunities, I'll need a few additional details about your
                        enterprise.
                      </p>
                    </div>
                    {analysisResults && (
                      <div className="mb-6 rounded-lg bg-green-500/10 p-5 border border-green-500/20">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                          <div>
                            <div className="flex items-center justify-between">
                              <p className="font-medium text-white">Analysis Results</p>
                              <span className="text-xs text-white/50">{analysisResults.timestamp}</span>
                            </div>
                            <div className="mt-3 flex items-center gap-3 bg-white/5 rounded-lg p-3 border border-white/10">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                                <Search className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-white">
                                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                    {analysisResults.potentialCustomers.toLocaleString()}
                                  </span>{" "}
                                  Potential Clients Identified
                                </p>
                              </div>
                            </div>
                            <div className="mt-3 space-y-2">
                              {analysisResults.insights.map((insight, index) => (
                                <div key={index} className="flex items-start gap-2">
                                  <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></div>
                                  <p className="text-sm text-white/80">{insight}</p>
                                </div>
                              ))}
                            </div>
                            <div className="mt-3 flex justify-end">
                              <Button
                                type="button"
                                onClick={() => setAnalysisResults(null)}
                                variant="ghost"
                                size="sm"
                                className="text-xs text-white/70 hover:text-white hover:bg-white/10"
                              >
                                Clear Results
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <form onSubmit={handleFormSubmit} className="space-y-5">
                      <div className="space-y-2">
                        <Label htmlFor="productService" className="text-white font-medium">
                          Products & Services
                        </Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={open}
                              className={`w-full justify-between border border-white/10 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 hover:text-white transition-all duration-200 py-6 px-4 rounded-xl shadow-sm ${
                                formErrors.productService ? "border-red-500" : "hover:border-primary/50"
                              }`}
                              disabled={isSubmitting}
                            >
                              <div className="flex items-center gap-2">
                                {formData.productService.length > 0 ? (
                                  <div className="flex items-center gap-2">
                                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20">
                                      <Check className="h-3 w-3 text-primary" />
                                    </div>
                                    <span className="text-sm font-medium">
                                      {formData.productService.length}{" "}
                                      {formData.productService.length === 1 ? "item" : "items"} selected
                                    </span>
                                  </div>
                                ) : (
                                  <span className="text-sm text-white/60">Select your offerings</span>
                                )}
                              </div>
                              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                                <ChevronsUpDown className="h-3.5 w-3.5 text-primary" />
                              </div>
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-full p-0 max-h-[350px] overflow-y-auto border border-white/10 bg-neutral-800/95 backdrop-blur-md shadow-xl rounded-xl scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-track-transparent scrollbar-thumb-primary/40 hover:scrollbar-thumb-primary/60"
                            align="start"
                            sideOffset={5}
                          >
                            <div className="sticky top-0 z-10 bg-neutral-800/95 backdrop-blur-md border-b border-white/10 px-3 py-2">
                              <Command className="bg-transparent text-white">
                                <CommandInput
                                  placeholder="Search products or services..."
                                  className="border-none py-3 text-white placeholder:text-white/40 focus:ring-0 focus:outline-none"
                                />
                              </Command>
                            </div>
                            <Command className="bg-transparent text-white">
                              <CommandList className="max-h-[300px] overflow-auto py-2">
                                <CommandEmpty className="py-6 text-center text-sm text-white/60">
                                  No results found.
                                </CommandEmpty>
                                {productServiceCategories.map((category) => (
                                  <CommandGroup
                                    key={category.name}
                                    heading={
                                      <div className="flex items-center px-1 py-1.5 text-xs uppercase font-semibold tracking-wider text-primary/80">
                                        <div className="h-1 w-1 rounded-full bg-primary/60 mr-2"></div>
                                        {category.name}
                                      </div>
                                    }
                                    className="pb-2 pt-1"
                                  >
                                    {category.options.map((option) => {
                                      const isSelected = formData.productService.includes(option)
                                      return (
                                        <CommandItem
                                          key={option}
                                          value={option}
                                          onSelect={() => toggleProductService(option)}
                                          className={`flex items-center justify-between py-2.5 px-3 text-sm transition-all duration-200 ${
                                            isSelected
                                              ? "bg-primary/15 text-white font-medium"
                                              : "text-white/80 hover:bg-white/10 hover:text-white"
                                          }`}
                                        >
                                          <div className="flex items-center gap-2">
                                            <div
                                              className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${
                                                isSelected ? "bg-primary/30" : "bg-white/10"
                                              }`}
                                            >
                                              {isSelected ? (
                                                <Check className="h-3 w-3 text-white" />
                                              ) : (
                                                <div className="h-2 w-2 rounded-full bg-white/30"></div>
                                              )}
                                            </div>
                                            <span>{option}</span>
                                          </div>
                                          {isSelected && (
                                            <Badge className="ml-2 bg-primary/20 text-primary text-xs py-0.5 px-2 rounded-full">
                                              Selected
                                            </Badge>
                                          )}
                                        </CommandItem>
                                      )
                                    })}
                                  </CommandGroup>
                                ))}
                              </CommandList>
                              {formData.productService.length > 0 && (
                                <div className="sticky bottom-0 border-t border-white/10 bg-neutral-800/95 backdrop-blur-md p-2 flex items-center justify-between">
                                  <span className="text-xs text-white/70 pl-2">
                                    {formData.productService.length}{" "}
                                    {formData.productService.length === 1 ? "item" : "items"} selected
                                  </span>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                      e.preventDefault()
                                      e.stopPropagation()
                                      setFormData((prev) => ({ ...prev, productService: [] }))
                                    }}
                                    className="h-8 text-xs text-white/70 hover:text-white hover:bg-white/10"
                                  >
                                    Clear all
                                  </Button>
                                </div>
                              )}
                            </Command>
                          </PopoverContent>
                        </Popover>
                        {formErrors.productService && (
                          <p className="text-xs text-red-500">{formErrors.productService}</p>
                        )}

                        {formData.productService.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {formData.productService.map((service) => (
                              <Badge
                                key={service}
                                variant="outline"
                                className="bg-primary/15 text-white border-primary/30 py-1.5 pl-3 pr-2 rounded-full transition-all hover:bg-primary/25 flex items-center gap-1"
                              >
                                <span className="max-w-[150px] truncate">{service}</span>
                                <button
                                  type="button"
                                  className="ml-1 rounded-full p-1 hover:bg-primary/30 transition-colors"
                                  onClick={(e) => {
                                    e.preventDefault()
                                    toggleProductService(service)
                                  }}
                                  aria-label={`Remove ${service}`}
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description" className="text-white font-medium">
                          Business Description
                        </Label>
                        <Textarea
                          id="description"
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          placeholder="Provide a detailed description of your business model, value proposition, and competitive advantages"
                          className={`min-h-[100px] border-white/10 bg-white/5 text-white placeholder:text-white/40 scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-track-transparent scrollbar-thumb-primary/40 hover:scrollbar-thumb-primary/60 ${
                            formErrors.description ? "border-red-500" : ""
                          }`}
                        />
                        {formErrors.description ? (
                          <p className="text-xs text-red-500">{formErrors.description}</p>
                        ) : (
                          <p className="text-xs text-white/50">
                            A comprehensive description enables more precise client targeting
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location" className="text-white font-medium">
                          Geographic Focus
                        </Label>
                        <Input
                          id="location"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          placeholder="City, Region, Country or Global"
                          className={`border-white/10 bg-white/5 text-white placeholder:text-white/40 ${
                            formErrors.location ? "border-red-500" : ""
                          }`}
                        />
                        {formErrors.location ? (
                          <p className="text-xs text-red-500">{formErrors.location}</p>
                        ) : (
                          <p className="text-xs text-white/50">Specify your target market geography</p>
                        )}
                      </div>

                      <div className="pt-2">
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full rounded-xl bg-gradient-to-r from-primary to-secondary py-6 text-white transition-all duration-300 hover:shadow-lg"
                        >
                          {isSubmitting ? (
                            <div className="flex items-center">
                              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                              <span>Processing Analysis</span>
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <Sparkles className="mr-2 h-5 w-5" />
                              <span>{analysisResults ? "Update Analysis" : "Generate Strategic Analysis"}</span>
                            </div>
                          )}
                        </Button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div>
                    <div className="mb-6 rounded-lg bg-primary/10 p-5 border border-primary/20">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                        <div>
                          <p className="font-medium text-white">Additional Information Required</p>
                          <p className="mt-1 text-sm text-white/80">
                            To optimize your client acquisition strategy and enhance targeting precision, please provide
                            the following supplementary details:
                          </p>
                        </div>
                      </div>
                    </div>

                    <form onSubmit={handleFormSubmit} className="space-y-5">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="location" className="text-white font-medium">
                            Geographic Focus
                          </Label>
                          <Input
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            placeholder="City, Region, Country or Global"
                            className={`border-white/10 bg-white/5 text-white placeholder:text-white/40 ${
                              formErrors.location ? "border-red-500" : ""
                            }`}
                          />
                          {formErrors.location && <p className="text-xs text-red-500">{formErrors.location}</p>}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="sector" className="text-white font-medium">
                            Industry Sector
                          </Label>
                          <Input
                            id="sector"
                            name="sector"
                            value={formData.sector}
                            onChange={handleInputChange}
                            placeholder="e.g. Technology, Healthcare, Finance"
                            className={`border-white/10 bg-white/5 text-white placeholder:text-white/40 ${
                              formErrors.sector ? "border-red-500" : ""
                            }`}
                          />
                          {formErrors.sector ? (
                            <p className="text-xs text-red-500">{formErrors.sector}</p>
                          ) : (
                            <p className="text-xs text-white/50">Specify your primary industry</p>
                          )}
                        </div>
                      </div>

                      <div className="pt-2">
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full rounded-xl bg-gradient-to-r from-primary to-secondary py-6 text-white transition-all duration-300 hover:shadow-lg"
                        >
                          {isSubmitting ? (
                            <div className="flex items-center">
                              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                              <span>Finalizing Analysis</span>
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <Sparkles className="mr-2 h-5 w-5" />
                              <span>Complete Strategic Analysis</span>
                            </div>
                          )}
                        </Button>
                      </div>
                    </form>
                  </div>
                )}
              </motion.div>
            )}

            {currentView === "analyzing" && (
              <motion.div
                key="analyzing-view"
                ref={analyzingViewRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="mx-auto max-w-3xl flex flex-col items-center justify-center py-8"
              >
                <div className="relative h-24 w-24">
                  <div className="absolute inset-0 animate-ping rounded-full bg-primary/20"></div>
                  <div className="relative flex h-full w-full items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary">
                    <Sparkles className="h-12 w-12 text-white" />
                  </div>
                </div>
                <h3 className="mt-8 text-2xl font-medium text-white">
                  {analysisType === "clients" ? "Analyzing Business Parameters" : "Generating Marketing Strategy"}
                </h3>
                <p className="mt-3 text-center text-sm text-white/70 max-w-md">
                  {analysisType === "clients"
                    ? "Our advanced AI is processing your business data to identify optimal client segments, market opportunities, and strategic acquisition channels."
                    : "Our AI is creating a customized marketing strategy based on your business profile and identified potential clients."}
                </p>
                <div className="mt-8 h-2 w-64 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full animate-progress bg-gradient-to-r from-primary via-secondary to-primary bg-size-200 bg-pos-0"></div>
                </div>
                <Button
                  onClick={resetForm}
                  className="mt-8 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white"
                >
                  Cancel
                </Button>
              </motion.div>
            )}

            {currentView === "clientResults" && (
              <motion.div
                key="client-results-view"
                ref={clientResultsViewRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="mx-auto max-w-4xl"
              >
                {/* Enhanced AI Agent Header */}
                <div className="mb-8 flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-primary to-secondary opacity-50 blur-sm"></div>
                    <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary">
                      <Sparkles className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Reachr Business Analyst</h2>
                    <p className="text-sm text-white/70">Advanced AI-powered business intelligence</p>
                  </div>
                  <Button
                    onClick={resetForm}
                    className="ml-auto rounded-full bg-white/10 p-1.5 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Results Content */}
                {analysisType === "clients" ? (
                  <Card className="mb-6 border-white/10 bg-white/5 text-white shadow-md">
                    <CardHeader className="border-b border-white/10 bg-gradient-to-r from-primary/20 to-secondary/20 pb-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl">Potential Clients</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-5">
                      {/* Simplified client count indicator with explanation */}
                      <div className="mb-5 rounded-lg border border-white/10 bg-white/5 p-4">
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                            <Search className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-white/70">Total Potential Clients</p>
                            <p className="text-xl font-bold">
                              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                {analysisResults?.potentialCustomers.toLocaleString() || "0"}
                              </span>
                            </p>
                          </div>
                        </div>
                        <p className="mt-3 text-sm text-white/70 border-t border-white/10 pt-3">
                          These are businesses that match your target criteria and have shown indicators of potential
                          interest in your services. Our AI has analyzed their business profiles, online behavior, and
                          market position to identify them as high-quality prospects for your outreach campaigns.
                        </p>
                      </div>

                      {/* Streamlined potential clients list */}
                      <div className="space-y-2">
                        {potentialClients.map((client) => (
                          <div
                            key={client.id}
                            className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3 hover:bg-white/[0.07] transition-colors"
                          >
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <h5 className="text-base font-medium text-white truncate">{client.name}</h5>
                                <Badge className="bg-primary/20 text-primary text-xs h-5 px-1.5">
                                  {client.matchScore}%
                                </Badge>
                              </div>
                              <div className="mt-1 flex flex-col sm:flex-row sm:items-center sm:gap-3 text-xs text-white/60">
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3 flex-shrink-0" />
                                  <span className="truncate">{client.address}</span>
                                </div>
                                <div className="hidden sm:block h-1 w-1 rounded-full bg-white/30"></div>
                                <div className="flex items-center gap-1">
                                  <Phone className="h-3 w-3 flex-shrink-0" />
                                  <span>{client.phoneNumber}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-center border-t border-white/10 bg-white/[0.02] px-6 py-4">
                      <Button
                        onClick={handleCreateMarketingStrategy}
                        className="rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-2 text-white transition-all duration-300 hover:shadow-lg"
                      >
                        <Sparkles className="mr-2 h-4 w-4" />
                        Create Marketing Strategy
                      </Button>
                    </CardFooter>
                  </Card>
                ) : (
                  <Card className="mb-6 border-white/10 bg-white/5 text-white shadow-md">
                    <CardHeader className="border-b border-white/10 bg-gradient-to-r from-primary/20 to-secondary/20 pb-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl">AI-Generated Marketing Strategy</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-5">
                      {marketingStrategy && (
                        <>
                          {/* Strategy title and description */}
                          <div className="mb-6 rounded-lg border border-white/10 bg-white/5 p-4">
                            <h3 className="text-lg font-medium text-white">{marketingStrategy.title}</h3>
                            <p className="mt-2 text-sm text-white/80">{marketingStrategy.description}</p>
                          </div>

                          {/* Customer Funneling Explanation */}
                          <div className="mb-6 rounded-lg border border-white/10 bg-white/5 p-4">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
                                <Users className="h-4 w-4 text-primary" />
                              </div>
                              <h3 className="font-medium text-white">Customer Funneling</h3>
                            </div>
                            <p className="text-sm text-white/80">
                              Customer funneling is a strategic marketing approach that guides potential clients through
                              a series of stages, from initial awareness to final conversion. This process begins with
                              casting a wide net to attract attention, then progressively narrows by qualifying leads,
                              nurturing interest, addressing objections, and finally converting prospects into clients.
                              Each stage requires tailored messaging and engagement strategies to move prospects closer
                              to a purchasing decision.
                            </p>
                          </div>

                          {/* Rule of 7 Explanation */}
                          <div className="mb-6 rounded-lg border border-white/10 bg-white/5 p-4">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
                                <Repeat className="h-4 w-4 text-primary" />
                              </div>
                              <h3 className="font-medium text-white">The Rule of 7 in Marketing</h3>
                            </div>
                            <p className="text-sm text-white/80">
                              The Rule of 7 is a marketing principle that states a prospect needs to see or hear your
                              marketing message at least seven times before they take action. This concept recognizes
                              that most consumers don't convert after a single exposure to your brand. Instead,
                              repeated, consistent messaging across multiple touchpoints builds familiarity, trust, and
                              eventually prompts action. Our WhatsApp strategy implements this principle through a
                              carefully timed sequence of messages that maintain engagement without overwhelming
                              prospects.
                            </p>
                          </div>

                          {/* Strategy Steps */}
                          <div className="mb-6">
                            <h3 className="font-medium text-white mb-4">Implementation Timeline</h3>
                            <div className="space-y-3">
                              {marketingStrategy.steps.map((step, index) => (
                                <div
                                  key={index}
                                  className="rounded-lg border border-white/10 bg-white/5 p-4 transition-colors hover:bg-white/[0.07]"
                                >
                                  <div className="flex items-start gap-3">
                                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 mt-0.5">
                                      <step.icon className="h-4 w-4 text-primary" />
                                    </div>
                                    <div>
                                      <div className="flex items-center justify-between">
                                        <h4 className="font-medium text-white">{step.name}</h4>
                                        <Badge className="bg-white/10 text-white/80 border-white/20">
                                          {step.timing}
                                        </Badge>
                                      </div>
                                      <p className="mt-1 text-sm text-white/70">{step.description}</p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Expected Results */}
                          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                            <h3 className="font-medium text-white mb-3">Expected Results</h3>
                            <div className="space-y-2">
                              {marketingStrategy.expectedResults.map((result, index) => (
                                <div key={index} className="flex items-start gap-2">
                                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></div>
                                  <p className="text-sm text-white/80">{result}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </CardContent>
                    <CardFooter className="flex justify-center border-t border-white/10 bg-white/[0.02] px-6 py-4">
                      <Button
                        onClick={() => setAnalysisType("clients")}
                        className="rounded-full bg-white/10 px-6 py-2 text-white transition-all duration-300 hover:bg-white/20"
                      >
                        <Search className="mr-2 h-4 w-4" />
                        View Potential Clients
                      </Button>
                    </CardFooter>
                  </Card>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      {announcement && (
        <div role="status" aria-live="polite" className="sr-only">
          {announcement}
        </div>
      )}
    </section>
  )
}
