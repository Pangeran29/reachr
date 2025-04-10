"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Sparkles, ArrowRight, Search, AlertCircle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function CreationPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialBusinessInfo = searchParams.get("info") || ""

  // Form state
  const [formData, setFormData] = useState({
    businessName: initialBusinessInfo,
    productService: "",
    description: "",
    targetAudience: "",
  })

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [aiSummary, setAiSummary] = useState("")
  const [showExitWarning, setShowExitWarning] = useState(false)
  const [selectedAction, setSelectedAction] = useState<string | null>(null)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  // Prevent accidental navigation away
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (
        !isSubmitted &&
        (formData.businessName || formData.productService || formData.description || formData.targetAudience)
      ) {
        e.preventDefault()
        e.returnValue = ""
        return ""
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => window.removeEventListener("beforeunload", handleBeforeUnload)
  }, [isSubmitted, formData])

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

    if (!formData.businessName.trim()) {
      errors.businessName = "Business name is required"
    }

    if (!formData.productService.trim()) {
      errors.productService = "Product or service information is required"
    }

    if (!formData.description.trim()) {
      errors.description = "Description is required"
    }

    if (!formData.targetAudience.trim()) {
      errors.targetAudience = "Target audience is required"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const generateAISummary = () => {
    // In a real application, this would be an API call to an AI service
    // For now, we'll simulate the AI response
    return `Based on your input, I've analyzed your business profile for "${formData.businessName}".

Your business offers ${formData.productService} and targets ${formData.targetAudience}.

From your description, I've identified several key strengths that can be leveraged in your client acquisition strategy. Your business appears to focus on quality and customer satisfaction, which will be central to our marketing approach.

We recommend targeting potential clients who value solutions that address specific pain points mentioned in your description. Our AI-powered system can now begin crafting personalized outreach campaigns designed to highlight your unique value proposition.`
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulate AI processing time
    setTimeout(() => {
      // Generate AI summary
      const summary = generateAISummary()
      setAiSummary(summary)

      // Update state to show summary
      setIsSubmitted(true)
      setIsSubmitting(false)
    }, 2000)
  }

  const handleActionSelect = (action: string) => {
    setSelectedAction(action)

    // In a real application, this would trigger different API calls based on the selected action
    setTimeout(() => {
      router.push("/")
    }, 1500)
  }

  const handleExitConfirm = () => {
    router.push("/")
  }

  const handleExitCancel = () => {
    setShowExitWarning(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-white/10 bg-neutral-900/90 backdrop-blur-md">
        <div className="container px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo and title */}
            <div className="flex items-center gap-3">
              <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-primary to-secondary p-0.5">
                <div className="absolute inset-0.5 rounded-full bg-neutral-900">
                  <Image src="/images/logo.png" alt="Reachr Logo" fill className="scale-75 object-contain p-1" />
                </div>
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">Business Profile</h1>
                <p className="text-xs text-white/60">
                  {isSubmitted ? "Profile Created" : "Create your business profile"}
                </p>
              </div>
            </div>

            {/* Center indicator */}
            <div className="hidden items-center gap-2 md:flex">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
              </div>
              <span className="text-sm font-medium text-white/80">AI-powered analysis</span>
            </div>

            {/* Exit button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowExitWarning(true)}
              className="border-white/10 bg-white/5 text-white hover:bg-white/10"
            >
              Exit
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="container mx-auto max-w-3xl px-4 py-8">
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            /* Form content */
            <motion.div key="form-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* Introduction card */}
              <Card className="mb-6 border-white/10 bg-white/5 text-white shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Sparkles className="h-5 w-5 text-primary" />
                    Create Your Business Profile
                  </CardTitle>
                  <CardDescription className="text-white/70">
                    Fill in the details below to create your business profile and get AI-powered client acquisition
                    strategies.
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Form */}
              <form onSubmit={handleSubmit}>
                <Card className="border-white/10 bg-white/5 text-white shadow-md">
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      {/* Business Name */}
                      <div className="space-y-2">
                        <Label htmlFor="businessName" className="text-white">
                          Business Name
                        </Label>
                        <Input
                          id="businessName"
                          name="businessName"
                          value={formData.businessName}
                          onChange={handleInputChange}
                          placeholder="Enter your business name"
                          className={`border-white/10 bg-white/5 text-white placeholder:text-white/50 focus:border-primary ${
                            formErrors.businessName ? "border-red-500" : ""
                          }`}
                        />
                        {formErrors.businessName && <p className="text-xs text-red-500">{formErrors.businessName}</p>}
                      </div>

                      {/* Product/Service */}
                      <div className="space-y-2">
                        <Label htmlFor="productService" className="text-white">
                          Product/Service
                        </Label>
                        <Input
                          id="productService"
                          name="productService"
                          value={formData.productService}
                          onChange={handleInputChange}
                          placeholder="What products or services do you offer?"
                          className={`border-white/10 bg-white/5 text-white placeholder:text-white/50 focus:border-primary ${
                            formErrors.productService ? "border-red-500" : ""
                          }`}
                        />
                        {formErrors.productService && (
                          <p className="text-xs text-red-500">{formErrors.productService}</p>
                        )}
                      </div>

                      {/* Description */}
                      <div className="space-y-2">
                        <Label htmlFor="description" className="text-white">
                          Description
                        </Label>
                        <Textarea
                          id="description"
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          placeholder="Describe your business in detail"
                          className={`min-h-[100px] border-white/10 bg-white/5 text-white placeholder:text-white/50 focus:border-primary ${
                            formErrors.description ? "border-red-500" : ""
                          }`}
                        />
                        {formErrors.description && <p className="text-xs text-red-500">{formErrors.description}</p>}
                      </div>

                      {/* Target Audience */}
                      <div className="space-y-2">
                        <Label htmlFor="targetAudience" className="text-white">
                          Target Audience
                        </Label>
                        <Textarea
                          id="targetAudience"
                          name="targetAudience"
                          value={formData.targetAudience}
                          onChange={handleInputChange}
                          placeholder="Who are your ideal customers?"
                          className={`min-h-[80px] border-white/10 bg-white/5 text-white placeholder:text-white/50 focus:border-primary ${
                            formErrors.targetAudience ? "border-red-500" : ""
                          }`}
                        />
                        {formErrors.targetAudience && (
                          <p className="text-xs text-red-500">{formErrors.targetAudience}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t border-white/10 bg-white/[0.02] px-6 py-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowExitWarning(true)}
                      className="border-white/10 bg-white/5 text-white hover:bg-white/10"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="rounded-full bg-gradient-to-r from-primary to-secondary px-8 py-2 text-white transition-all duration-300 hover:shadow-lg"
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="mr-2 h-4 w-4 animate-spin"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        "Create Profile"
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </form>
            </motion.div>
          ) : (
            /* Summary content */
            <motion.div key="summary-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              {/* AI Summary Card */}
              <Card className="overflow-hidden border-white/10 bg-white/5 text-white shadow-md">
                <CardHeader className="border-b border-white/10 bg-gradient-to-r from-primary/20 to-secondary/20">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary">
                      <Sparkles className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle>AI-Generated Summary</CardTitle>
                      <CardDescription className="text-white/70">Based on your business profile</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    {/* AI Analysis */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                        <h3 className="font-medium text-white">Business Analysis</h3>
                      </div>

                      <div className="rounded-md bg-white/5 p-4">
                        <p className="text-white/90">
                          {aiSummary.split("\n\n").map((paragraph, i) => (
                            <span key={i} className="block mb-3">
                              {paragraph}
                            </span>
                          ))}
                        </p>
                      </div>
                    </div>

                    {/* Business Details Summary */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                        <h3 className="font-medium text-white">Your Business Profile</h3>
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="rounded-md bg-white/5 p-4">
                          <p className="text-sm font-medium text-white/60">Business Name</p>
                          <p className="mt-1 text-white">{formData.businessName}</p>
                        </div>

                        <div className="rounded-md bg-white/5 p-4">
                          <p className="text-sm font-medium text-white/60">Product/Service</p>
                          <p className="mt-1 text-white">{formData.productService}</p>
                        </div>

                        <div className="rounded-md bg-white/5 p-4 sm:col-span-2">
                          <p className="text-sm font-medium text-white/60">Description</p>
                          <p className="mt-1 text-white">{formData.description}</p>
                        </div>

                        <div className="rounded-md bg-white/5 p-4 sm:col-span-2">
                          <p className="text-sm font-medium text-white/60">Target Audience</p>
                          <p className="mt-1 text-white">{formData.targetAudience}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4 border-t border-white/10 bg-white/[0.02] px-6 py-4">
                  <div className="flex w-full items-center">
                    <div className="flex items-center gap-2 text-white/70">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Profile created successfully</span>
                    </div>
                  </div>
                </CardFooter>
              </Card>

              {/* Action Options Card */}
              <Card className="border-white/10 bg-white/5 text-white shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Next Steps</CardTitle>
                  <CardDescription className="text-white/70">
                    Choose what you'd like to do with your business profile
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-4">
                    {!selectedAction ? (
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div
                          onClick={() => handleActionSelect("find-prospects")}
                          className="cursor-pointer rounded-lg border border-white/10 bg-white/5 p-4 transition-all hover:border-primary/50 hover:bg-white/10"
                        >
                          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                            <Search className="h-5 w-5 text-primary" />
                          </div>
                          <h3 className="mb-2 font-medium text-white">Find Prospects</h3>
                          <p className="text-sm text-white/70">
                            Discover potential clients that match your business profile and target audience.
                          </p>
                        </div>

                        <div
                          onClick={() => handleActionSelect("create-strategy")}
                          className="cursor-pointer rounded-lg border border-white/10 bg-white/5 p-4 transition-all hover:border-primary/50 hover:bg-white/10"
                        >
                          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                            <Sparkles className="h-5 w-5 text-primary" />
                          </div>
                          <h3 className="mb-2 font-medium text-white">AI Create Promotion Strategy</h3>
                          <p className="text-sm text-white/70">
                            Let our AI create a customized promotion strategy based on your business profile.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="rounded-lg bg-primary/10 p-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                            {selectedAction === "find-prospects" ? (
                              <Search className="h-5 w-5 text-primary" />
                            ) : (
                              <Sparkles className="h-5 w-5 text-primary" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium text-white">
                              {selectedAction === "find-prospects"
                                ? "Finding prospects for your business..."
                                : "Creating your promotion strategy..."}
                            </h3>
                            <p className="text-sm text-white/70">Redirecting you to the dashboard...</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="border-t border-white/10 bg-white/[0.02] px-6 py-4">
                  <Button
                    onClick={() => router.push("/")}
                    className="ml-auto rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-2 text-white transition-all duration-300 hover:shadow-lg"
                  >
                    <span>Go to Dashboard</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Exit warning modal */}
      {showExitWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mx-4 max-w-md rounded-lg border border-white/10 bg-neutral-900 p-6 shadow-xl"
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex-shrink-0">
                <AlertCircle className="h-6 w-6 text-red-500" />
              </div>
              <div>
                <h2 className="text-lg font-medium text-white">Exit without saving?</h2>
                <p className="mt-2 text-sm text-white/70">
                  Your progress will be lost if you exit now. Are you sure you want to continue?
                </p>

                <div className="mt-6 flex gap-3">
                  <Button
                    variant="outline"
                    onClick={handleExitCancel}
                    className="flex-1 border-white/10 bg-white/5 text-white hover:bg-white/10"
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleExitConfirm} className="flex-1 bg-red-500 text-white hover:bg-red-600">
                    Exit Anyway
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
