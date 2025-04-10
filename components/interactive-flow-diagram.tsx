"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import {
  Search,
  Sparkles,
  Settings,
  Smartphone,
  Target,
  BarChart3,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Info,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface ModuleData {
  id: string
  title: string
  icon: React.ElementType
  description: string
  color: string
  position: "top" | "bottom"
  index: number
}

export function InteractiveFlowDiagram() {
  const [activeModule, setActiveModule] = useState<string | null>(null)
  const [animationComplete, setAnimationComplete] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const diagramRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  const modules: ModuleData[] = [
    {
      id: "lead-finder",
      title: "Lead Finder",
      icon: Search,
      description: "Gathers B2B business data: name, category, location, WhatsApp number.",
      color: "from-primary-blue to-primary-blue/80",
      position: "top",
      index: 0,
    },
    {
      id: "ai-prompting",
      title: "AI Prompting Engine",
      icon: Sparkles,
      description: "Generates promotional content, storytelling, and campaign strategies.",
      color: "from-accent-orange to-accent-orange/80",
      position: "top",
      index: 1,
    },
    {
      id: "strategic-flow",
      title: "Strategic Flow Engine",
      icon: Settings,
      description: "Implements strategies such as the Rule of 7, one-time blasts, and soft CTAs.",
      color: "from-emerald-500 to-emerald-500/80",
      position: "top",
      index: 2,
    },
    {
      id: "whatsapp-automation",
      title: "WhatsApp Automation",
      icon: Smartphone,
      description: "Sends automated messages according to the AI-designed flow.",
      color: "from-emerald-500 to-emerald-500/80",
      position: "bottom",
      index: 2,
    },
    {
      id: "lead-scoring",
      title: "Lead Scoring & Tracking",
      icon: Target,
      description: "Identifies the most responsive prospects.",
      color: "from-accent-orange to-accent-orange/80",
      position: "bottom",
      index: 1,
    },
    {
      id: "analytics-dashboard",
      title: "Analytics Dashboard",
      icon: BarChart3,
      description: "Displays campaign performance, conversions, and ROI in real-time.",
      color: "from-primary-blue to-primary-blue/80",
      position: "bottom",
      index: 0,
    },
  ]

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          startAnimation()
          observer.disconnect()
        }
      },
      {
        threshold: 0.2,
      },
    )

    if (diagramRef.current) {
      observer.observe(diagramRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  const startAnimation = () => {
    setTimeout(() => {
      setAnimationComplete(true)
    }, 1500)
  }

  const handleModuleClick = (moduleId: string) => {
    setActiveModule(activeModule === moduleId ? null : moduleId)
  }

  return (
    <div ref={diagramRef} className="relative mx-auto max-w-6xl px-4 py-8 md:py-16">
      {/* Mobile View */}
      {isMobile && (
        <div className="space-y-6">
          {modules.map((module, index) => (
            <div
              key={module.id}
              className={cn(
                "relative overflow-hidden rounded-xl border border-cloud-gray/30 bg-sky-white/80 shadow-md transition-all duration-300",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                activeModule === module.id ? "border-2 border-primary-blue" : "",
              )}
              style={{
                transitionDelay: `${index * 150}ms`,
              }}
            >
              <div
                className="flex items-center justify-between p-4 cursor-pointer"
                onClick={() => handleModuleClick(module.id)}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${module.color} p-2 text-sky-white shadow-md`}
                  >
                    <module.icon className="h-5 w-5" />
                  </div>
                  <div className="font-bold">{module.title}</div>
                </div>
                {activeModule === module.id ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </div>

              {activeModule === module.id && (
                <div className="p-4 pt-0 border-t border-cloud-gray/20">
                  <p className="text-charcoal/70">{module.description}</p>
                  <div className="mt-3 flex items-center">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-blue/10 mr-2">
                      <Info className="h-3 w-3 text-primary-blue" />
                    </div>
                    <p className="text-sm text-primary-blue">Step {index + 1} in the client acquisition process</p>
                  </div>
                </div>
              )}
            </div>
          ))}

          <div className="flex justify-center mt-8">
            <div className="inline-flex items-center rounded-full bg-primary-blue/10 px-3 py-1.5 text-sm text-primary-blue">
              <ArrowRight className="mr-2 h-4 w-4" />
              <span>Swipe through the modules to see the full process</span>
            </div>
          </div>
        </div>
      )}

      {/* Desktop View */}
      {!isMobile && (
        <div className="relative h-[600px]">
          {/* Central data flow visualization */}
          <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-dashed border-cloud-gray/30">
            <div
              className={cn(
                "absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-cloud-gray/20",
                isVisible ? "opacity-100" : "opacity-0",
                "transition-opacity duration-1000",
              )}
            >
              <div
                className={cn(
                  "absolute left-1/2 top-1/2 h-[140px] w-[140px] -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-cloud-gray/10",
                  isVisible ? "opacity-100" : "opacity-0",
                  "transition-opacity duration-1000 delay-300",
                )}
              >
                <div
                  className={cn(
                    "absolute left-1/2 top-1/2 h-[60px] w-[60px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-blue/20",
                    isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0",
                    "transition-all duration-1000 delay-600",
                  )}
                >
                  <div className="absolute left-1/2 top-1/2 h-[30px] w-[30px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-blue animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Data flow animations */}
            {animationComplete && (
              <>
                {/* Top to center flows */}
                <div className="absolute left-1/2 top-0 h-[150px] w-2 -translate-x-1/2 overflow-hidden">
                  <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-b from-transparent to-primary-blue/50 animate-flow-down"></div>
                </div>
                <div className="absolute left-1/4 top-1/4 h-[100px] w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 overflow-hidden">
                  <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-b from-transparent to-accent-orange/50 animate-flow-down"></div>
                </div>
                <div className="absolute left-3/4 top-1/4 h-[100px] w-2 -translate-x-1/2 -translate-y-1/2 -rotate-45 overflow-hidden">
                  <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-b from-transparent to-emerald-500/50 animate-flow-down"></div>
                </div>

                {/* Center to bottom flows */}
                <div className="absolute bottom-0 left-1/2 h-[150px] w-2 -translate-x-1/2 overflow-hidden">
                  <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-t from-transparent to-primary-blue/50 animate-flow-up"></div>
                </div>
                <div className="absolute bottom-1/4 left-1/4 h-[100px] w-2 -translate-x-1/2 translate-y-1/2 -rotate-45 overflow-hidden">
                  <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-t from-transparent to-accent-orange/50 animate-flow-up"></div>
                </div>
                <div className="absolute bottom-1/4 left-3/4 h-[100px] w-2 -translate-x-1/2 translate-y-1/2 rotate-45 overflow-hidden">
                  <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-t from-transparent to-emerald-500/50 animate-flow-up"></div>
                </div>
              </>
            )}
          </div>

          {/* Top row modules */}
          <div className="absolute left-0 right-0 top-0 flex justify-center gap-8">
            {modules
              .filter((m) => m.position === "top")
              .sort((a, b) => a.index - b.index)
              .map((module, idx) => (
                <ModuleCard
                  key={module.id}
                  module={module}
                  isActive={activeModule === module.id}
                  onClick={() => handleModuleClick(module.id)}
                  isVisible={isVisible}
                  delay={idx * 200}
                  position="top"
                />
              ))}
          </div>

          {/* Bottom row modules */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-8">
            {modules
              .filter((m) => m.position === "bottom")
              .sort((a, b) => a.index - b.index)
              .map((module, idx) => (
                <ModuleCard
                  key={module.id}
                  module={module}
                  isActive={activeModule === module.id}
                  onClick={() => handleModuleClick(module.id)}
                  isVisible={isVisible}
                  delay={idx * 200 + 600}
                  position="bottom"
                />
              ))}
          </div>

          {/* Central label */}
          <div
            className={cn(
              "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white p-4 shadow-lg",
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0",
              "transition-all duration-1000 delay-900",
            )}
          >
            <div className="text-center">
              <p className="font-bold text-primary-blue">Reachr AI</p>
              <p className="text-xs text-charcoal/70">Intelligent Client Acquisition</p>
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      {!isMobile && (
        <div
          className={cn(
            "mt-8 flex justify-center gap-8",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
            "transition-all duration-500 delay-1200",
          )}
        >
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-primary-blue"></div>
            <span className="text-sm text-charcoal/70">Data Collection & Analysis</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-accent-orange"></div>
            <span className="text-sm text-charcoal/70">AI-Powered Strategy</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
            <span className="text-sm text-charcoal/70">Execution & Automation</span>
          </div>
        </div>
      )}
    </div>
  )
}

interface ModuleCardProps {
  module: ModuleData
  isActive: boolean
  onClick: () => void
  isVisible: boolean
  delay: number
  position: "top" | "bottom"
}

function ModuleCard({ module, isActive, onClick, isVisible, delay, position }: ModuleCardProps) {
  return (
    <div
      className={cn(
        "group relative w-[250px] cursor-pointer overflow-hidden rounded-xl border border-cloud-gray/30 bg-sky-white/95 p-4 shadow-md transition-all duration-500",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0",
        position === "top"
          ? isVisible
            ? "translate-y-0"
            : "-translate-y-16"
          : isVisible
            ? "translate-y-0"
            : "translate-y-16",
        isActive ? "border-2 border-primary-blue shadow-lg" : "hover:border-primary-blue/30 hover:shadow-lg",
      )}
      style={{
        transitionDelay: `${delay}ms`,
        zIndex: isActive ? 10 : 1,
      }}
      onClick={onClick}
    >
      <div className="absolute -right-6 -top-6 h-16 w-16 rounded-full bg-primary-blue/5 transition-all duration-300 group-hover:scale-150 group-hover:bg-primary-blue/10"></div>

      <div className="relative space-y-3">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${module.color} p-2 text-sky-white shadow-md`}
          >
            <module.icon className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-charcoal">{module.title}</h3>
        </div>

        <p className="text-sm text-charcoal/70">{module.description}</p>

        <div
          className={cn(
            "flex items-center justify-between pt-2",
            isActive ? "opacity-100" : "opacity-0",
            "transition-opacity duration-300",
          )}
        >
          <span className="text-xs text-primary-blue">
            {position === "top" ? "Inputs data to system" : "Receives processed data"}
          </span>
          <Info className="h-4 w-4 text-primary-blue" />
        </div>
      </div>

      {isActive && (
        <div className="absolute bottom-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary-blue text-xs font-bold text-white">
          {modules.findIndex((m) => m.id === module.id) + 1}
        </div>
      )}
    </div>
  )
}
