"use client"

import { useEffect, useState, useRef } from "react"
import { useInView } from "react-intersection-observer"

interface AnimatedNumberProps {
  value: number
  duration?: number
  suffix?: string
  prefix?: string
}

export function AnimatedNumber({ value, duration = 2000, suffix = "", prefix = "" }: AnimatedNumberProps) {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const countRef = useRef(0)
  const startTimeRef = useRef<number | null>(null)

  useEffect(() => {
    if (!inView) return

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp
      }

      const progress = timestamp - startTimeRef.current
      const percentage = Math.min(progress / duration, 1)

      // Easing function for smoother animation
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4)

      countRef.current = Math.floor(easeOutQuart * value)
      setCount(countRef.current)

      if (percentage < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(value)
      }
    }

    requestAnimationFrame(animate)

    return () => {
      startTimeRef.current = null
    }
  }, [inView, value, duration])

  return (
    <div ref={ref} className="font-bold">
      <span className="text-4xl font-bold text-primary-blue md:text-5xl">
        {prefix}
        {count.toLocaleString()}
        {suffix}
      </span>
    </div>
  )
}
