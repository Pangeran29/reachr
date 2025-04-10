"use client"

import { useEffect, useRef } from "react"

export function AnimatedGradientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight

    const resizeCanvas = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Colors based on the brand palette
    const colors = [
      { r: 37, g: 99, b: 235 }, // Primary blue
      { r: 168, g: 85, b: 247 }, // Secondary purple
      { r: 255, g: 255, b: 255 }, // White
    ]

    // Create gradient circles
    const circles: any[] = []
    for (let i = 0; i < 5; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)]
      circles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 300 + 100,
        vx: Math.random() * 0.2 - 0.1,
        vy: Math.random() * 0.2 - 0.1,
        color: `rgba(${color.r}, ${color.g}, ${color.b}, 0.07)`,
      })
    }

    const animate = () => {
      // Clear canvas with a very subtle background
      ctx.fillStyle = "rgba(10, 10, 10, 0.01)"
      ctx.fillRect(0, 0, width, height)

      // Draw and update circles
      circles.forEach((circle) => {
        // Move circle
        circle.x += circle.vx
        circle.y += circle.vy

        // Bounce off edges
        if (circle.x - circle.radius < 0 || circle.x + circle.radius > width) {
          circle.vx = -circle.vx
        }
        if (circle.y - circle.radius < 0 || circle.y + circle.radius > height) {
          circle.vy = -circle.vy
        }

        // Draw circle
        ctx.beginPath()
        const gradient = ctx.createRadialGradient(circle.x, circle.y, 0, circle.x, circle.y, circle.radius)
        gradient.addColorStop(0, circle.color)
        gradient.addColorStop(1, "rgba(10, 10, 10, 0)")
        ctx.fillStyle = gradient
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 -z-10 h-full w-full opacity-70" />
}
