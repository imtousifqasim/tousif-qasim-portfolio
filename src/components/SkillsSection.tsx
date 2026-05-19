"use client"

import { motion } from "framer-motion"
import { SectionHeader } from "./SectionHeader"
import {
  Code, Server, Globe, Database, Palette, Shield, Zap,
  Smartphone, Search, Cloud, Terminal, Layers, ShoppingCart, Cpu,
  type LucideIcon,
} from "lucide-react"

interface Skill {
  name: string
  level: number
  icon: LucideIcon
  category: string
  years: string
}

const skills: Skill[] = [
  { name: "WordPress", level: 95, icon: Code, category: "CMS & Platforms", years: "7+" },
  { name: "WHMCS", level: 90, icon: Server, category: "CMS & Platforms", years: "5+" },
  { name: "Shopify", level: 85, icon: ShoppingCart, category: "CMS & Platforms", years: "3+" },

  { name: "HTML / CSS", level: 95, icon: Globe, category: "Frontend", years: "7+" },
  { name: "JavaScript / React", level: 82, icon: Zap, category: "Frontend", years: "4+" },
  { name: "Tailwind CSS", level: 85, icon: Palette, category: "Frontend", years: "3+" },

  { name: "PHP / Laravel", level: 88, icon: Terminal, category: "Backend", years: "5+" },
  { name: "MySQL / Databases", level: 80, icon: Database, category: "Backend", years: "5+" },
  { name: "API Integration", level: 85, icon: Shield, category: "Backend", years: "4+" },
  { name: "Node.js", level: 70, icon: Cpu, category: "Backend", years: "2+" },

  { name: "cPanel / Hosting", level: 90, icon: Cloud, category: "DevOps & Tools", years: "6+" },
  { name: "SEO Optimization", level: 85, icon: Search, category: "DevOps & Tools", years: "5+" },
  { name: "Git / Version Control", level: 80, icon: Layers, category: "DevOps & Tools", years: "4+" },
  { name: "Responsive Design", level: 90, icon: Smartphone, category: "DevOps & Tools", years: "6+" },
]

const categories = [...new Set(skills.map((s) => s.category))]

const categoryIcons: Record<string, LucideIcon> = {
  "CMS & Platforms": Server,
  Frontend: Code,
  Backend: Database,
  "DevOps & Tools": Terminal,
}

const featured = skills.filter((s) => s.level >= 90)

export function SkillsSection() {
  return (
    <section className="relative py-24 overflow-hidden bg-muted/20">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/[0.04] rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-500/[0.04] rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-blue-500/[0.03] rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Skills & Proficiency"
          title="Technical"
          highlighted="Expertise"
          description="A comprehensive overview of the technologies and tools I work with daily."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-3 mb-14"
        >
          <span className="px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            {skills.length}+ Technologies
          </span>
          <span className="px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            7+ Years Experience
          </span>
          <span className="px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            50+ Projects Delivered
          </span>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-14">
          {featured.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="relative p-5 sm:p-6 rounded-[1.5rem] bg-white/[0.03] dark:bg-black/[0.03] backdrop-blur-3xl border border-white/10 dark:border-white/5 overflow-hidden hover:border-emerald-500/40 hover:shadow-[0_20px_40px_rgba(0,103,75,0.08)] transition-all duration-500 h-full">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/[0.03] rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-emerald-500/[0.06] transition-all duration-700" />

                <div className="flex flex-col items-center text-center gap-3 relative z-10">
                  <div className="relative">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-emerald-700 to-teal-500 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-emerald-600/20">
                      <skill.icon className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                    </div>
                    <span className="absolute -top-1 -right-1 text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 backdrop-blur-xl">
                      {skill.years}y
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-foreground text-sm sm:text-base group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {skill.name}
                    </h3>
                    <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1 block">
                      {skill.level}%
                    </span>
                  </div>

                  <div className="relative h-2 w-full rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1.5, delay: index * 0.15, ease: "easeOut" }}
                      viewport={{ once: true }}
                      className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-emerald-700 to-teal-500 shadow-[0_0_12px_rgba(0,103,75,0.3)]"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
          {categories.map((category, catIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="p-5 sm:p-6 rounded-[1.5rem] bg-white/[0.02] dark:bg-black/[0.02] backdrop-blur-3xl border border-white/10 dark:border-white/5 hover:border-emerald-500/40 hover:shadow-[0_20px_40px_rgba(0,103,75,0.05)] transition-all duration-500 h-full">
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-700 to-teal-500 flex items-center justify-center shadow-md shadow-emerald-600/20">
                    {(() => {
                      const CatIcon = categoryIcons[category]
                      return <CatIcon className="h-5 w-5 text-white" />
                    })()}
                  </div>
                  <h3 className="font-bold text-foreground text-base sm:text-lg">{category}</h3>
                </div>

                <div className="space-y-4 sm:space-y-5">
                  {skills
                    .filter((s) => s.category === category)
                    .map((skill, skillIndex) => (
                      <div key={skill.name}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <skill.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground shrink-0" />
                            <span className="text-xs sm:text-sm font-semibold text-foreground truncate">
                              {skill.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                              {skill.years}y
                            </span>
                            <span className="text-[11px] sm:text-xs font-bold text-muted-foreground tabular-nums">
                              {skill.level}%
                            </span>
                          </div>
                        </div>
                        <div className="relative h-2 rounded-full bg-white/5 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1.2, delay: skillIndex * 0.08, ease: "easeOut" }}
                            viewport={{ once: true }}
                            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-emerald-700 to-teal-500"
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
