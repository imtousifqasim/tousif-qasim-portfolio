"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function HeroBackground() {
  const [mounted, setMounted] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 150 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  useEffect(() => {
    setMounted(true)
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  if (!mounted) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Animated Bubbles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-blue-500/10 blur-xl"
          style={{
            width: Math.random() * 300 + 100,
            height: Math.random() * 300 + 100,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}

      {/* Mouse Follower Glows */}
      <motion.div
        className="absolute w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[150px]"
        style={{
          x: x,
          y: y,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] bg-cyan-400/10 rounded-full blur-[100px]"
        style={{
          x: x,
          y: y,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      
      {/* Interactive Dots around mouse */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`dot-${i}`}
          className="absolute w-2 h-2 bg-blue-400/40 rounded-full blur-sm"
          style={{
            x: x,
            y: y,
            translateX: "-50%",
            translateY: "-50%",
          }}
          animate={{
            x: [0, (i % 2 === 0 ? 1 : -1) * (i * 20)],
            y: [0, (i % 3 === 0 ? 1 : -1) * (i * 15)],
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2 + i,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  )
}
