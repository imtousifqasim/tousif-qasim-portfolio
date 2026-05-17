"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface SectionHeaderProps {
  badge: string
  title: string
  highlighted: string
  description?: string
}

export function SectionHeader({ badge, title, highlighted, description }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <div className="inline-flex items-center gap-2 bg-[#00674b]/10 text-[#00674b] border border-[#00674b]/20 mb-4 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
        {badge}
      </div>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight">
        {title}{" "}
        <span className="text-[#00674b]">{highlighted}</span>
      </h2>
      {description && (
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </motion.div>
  )
}
