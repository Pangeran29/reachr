"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Zap } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const faqs = [
    {
      question: "How does Reachr find potential clients?",
      answer:
        "Reachr uses AI to analyze business data and identify potential clients based on your business sector, location, and target audience. We gather information from various sources to create a comprehensive database of potential clients that match your ideal customer profile.",
    },
    {
      question: "Is WhatsApp marketing effective?",
      answer:
        "Yes, WhatsApp marketing has proven to be highly effective with open rates of over 90% and response rates significantly higher than email marketing. It provides a direct and personal way to connect with potential clients, leading to higher engagement and conversion rates.",
    },
    {
      question: "How does the AI create marketing content?",
      answer:
        "Our AI analyzes your business information, target audience, and industry trends to create personalized marketing strategies and content. It continuously learns and improves based on campaign performance to optimize your results and ensure your messaging resonates with your potential clients.",
    },
    {
      question: "Can I customize the marketing campaigns?",
      answer:
        "While our AI creates initial campaign strategies and content, you have full control to review, edit, and approve all campaigns before they are sent. You can customize messaging, timing, and targeting to ensure they align perfectly with your brand voice and business goals.",
    },
    {
      question: "How do I track campaign performance?",
      answer:
        "Reachr provides comprehensive analytics and reporting for all your campaigns. You can track metrics such as open rates, response rates, conversion rates, and ROI. Our dashboard gives you real-time insights into campaign performance, allowing you to make data-driven decisions.",
    },
  ]

  return (
    <section
      id="faq"
      ref={ref}
      className="relative w-full overflow-hidden bg-white py-16 md:py-24 lg:py-32 dark:bg-neutral-950"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-bl from-neutral-50/80 via-white to-neutral-50/80 dark:from-neutral-950 dark:via-neutral-900/95 dark:to-neutral-950"></div>
        <div className="absolute inset-0 bg-grid-neutral-200/40 bg-[size:24px_24px] opacity-30 dark:bg-grid-neutral-800/20"></div>
      </div>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="space-y-2"
          >
            <div className="inline-flex items-center rounded-full border border-primary bg-primary/10 px-3 py-1 text-sm text-primary dark:border-primary/30 dark:bg-primary/20">
              <Zap className="mr-1 h-3 w-3" />
              <span>FAQ</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-5xl dark:text-white">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Frequently
              </span>{" "}
              Asked Questions
            </h2>
            <p className="mx-auto max-w-[900px] text-lg text-neutral-700 dark:text-neutral-300 md:text-xl">
              Find answers to common questions about Reachr and how it can help your business.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-12 max-w-3xl px-0 sm:px-4"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b border-neutral-200/50 dark:border-neutral-800/50 px-1 sm:px-2"
              >
                <AccordionTrigger className="text-left text-base sm:text-lg font-medium text-neutral-900 dark:text-white py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
