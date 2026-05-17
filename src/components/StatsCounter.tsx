"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface StatsCounterProps {
  end: number
  suffix?: string
  label: string
}

export function StatsCounter({ end, suffix = "", label }: StatsCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const duration = 2000
          const steps = 60
          const increment = end / steps
          let current = 0
          const timer = setInterval(() => {
            current += increment
            if (current >= end) {
              setCount(end)
              clearInterval(timer)
            } else {
              setCount(Math.floor(current))
            }
          }, duration / steps)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end])

  return (
    <div ref={ref}>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl font-black text-[#00674b]"
      >
        {count}{suffix}
      </motion.p>
      <p className="text-[10px] sm:text-xs text-muted-foreground font-bold uppercase tracking-widest mt-1">
        {label}
      </p>
    </div>
  )
}
