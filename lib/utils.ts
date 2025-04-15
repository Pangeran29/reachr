import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Smoothly scrolls to a target element with customizable behavior
 * @param elementId - The ID of the element to scroll to (without the # prefix)
 * @param offset - Offset from the top of the element (default: 80px)
 * @param duration - Duration of the scroll animation in ms (default: 800ms)
 */
export function smoothScrollTo(elementId: string, offset = -10, duration = 800) {
  const element = document.getElementById(elementId)
  if (!element) return

  const elementPosition = element.getBoundingClientRect().top + window.scrollY
  const offsetPosition = elementPosition - offset

  // Use native smooth scrolling with custom duration
  const startTime = performance.now()
  const startPosition = window.scrollY

  function scrollAnimation(currentTime: number) {
    const elapsedTime = currentTime - startTime
    const progress = Math.min(elapsedTime / duration, 1)

    // Easing function for smoother animation (easeInOutQuad)
    const easeProgress = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2

    window.scrollTo(0, startPosition + (offsetPosition - startPosition) * easeProgress)

    if (progress < 1) {
      requestAnimationFrame(scrollAnimation)
    }
  }

  requestAnimationFrame(scrollAnimation)
}
