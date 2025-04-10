"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  previousInput?: string
  shouldAutoFill?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, previousInput, shouldAutoFill = false, ...props }, ref) => {
    const internalRef = React.useRef<HTMLTextAreaElement>(null)

    // Combine the external ref with our internal ref
    const combinedRef = React.useMemo(() => {
      return (element: HTMLTextAreaElement | null) => {
        // Update our internal ref
        internalRef.current = element

        // Forward to the external ref if it exists
        if (typeof ref === "function") {
          ref(element)
        } else if (ref) {
          ref.current = element
        }
      }
    }, [ref])

    // Auto-fill the textarea with previous input when specified
    React.useEffect(() => {
      if (shouldAutoFill && previousInput && internalRef.current) {
        // Only auto-fill if the field is empty or matches a previous auto-fill
        // This prevents overwriting user edits
        if (!props.value && !internalRef.current.value) {
          // Set the value
          internalRef.current.value = previousInput

          // Trigger an input event to notify React of the change
          const event = new Event("input", { bubbles: true })
          internalRef.current.dispatchEvent(event)
        }
      }
    }, [previousInput, shouldAutoFill, props.value])

    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          /* Custom scrollbar styling */
          "scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full",
          "scrollbar-track-transparent scrollbar-thumb-primary/40 hover:scrollbar-thumb-primary/60",
          "dark:scrollbar-thumb-primary/30 dark:hover:scrollbar-thumb-primary/50",
          className,
        )}
        ref={combinedRef}
        {...props}
      />
    )
  },
)

Textarea.displayName = "Textarea"

export { Textarea }
