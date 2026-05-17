"use client"

import { motion } from "framer-motion"
import { SectionHeader } from "./SectionHeader"
import { Code, Server, Globe, Database, Palette, Shield, Zap } from "lucide-react"

const skills = [
  { name: "WordPress", level: 95, icon: Code },
  { name: "WHMCS", level: 90, icon: Server },
  { name: "Shopify", level: 85, icon: Palette },
  { name: "PHP / Laravel", level: 88, icon: Database },
  { name: "JavaScript / React", level: 82, icon: Zap },
  { name: "HTML / CSS", level: 95, icon: Globe },
  { name: "API Integration", level: 85, icon: Shield },
  { name: "MySQL / Databases", level: 80, icon: Database },
]

export function SkillsSection() {
  return (
    <section className="relative py-24 overflow-hidden bg-muted/20">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-[#00674b]/[0.02] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-600/[0.02] rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Skills & Proficiency"
          title="Technical"
          highlighted="Expertise"
          description="Technologies I work with daily to deliver exceptional results."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
            >
              <div className="p-6 rounded-[2rem] bg-white/[0.02] dark:bg-black/[0.02] backdrop-blur-3xl border border-white/10 dark:border-white/5 group hover:border-[#00674b]/40 hover:shadow-[0_20px_40px_rgba(0,103,75,0.05)] transition-all duration-500">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#00674b] flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <skill.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground group-hover:text-[#00674b] transition-colors">
                      {skill.name}
                    </h3>
                    <span className="text-xs text-muted-foreground font-medium">{skill.level}%</span>
                  </div>
                </div>

                <div className="relative h-2 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1.2, delay: index * 0.1, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-emerald-700 to-teal-500"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
