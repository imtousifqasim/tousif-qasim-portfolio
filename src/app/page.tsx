"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import { Sun, Moon, Menu, X, Mail, Phone, MapPin, Code, Server, Globe, Shield, Headphones, Palette, Database, GraduationCap, Award, Calendar, Building2, Layers, ExternalLink, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HeroBackground } from "@/components/HeroBackground"
import { SectionHeader } from "@/components/SectionHeader"
import { TypingEffect } from "@/components/TypingEffect"
import { StatsCounter } from "@/components/StatsCounter"
import { BackToTop } from "@/components/BackToTop"
import { PortfolioSection } from "@/components/PortfolioSection"
import { ReviewsSection } from "@/components/ReviewsSection"
import { PricingSection } from "@/components/PricingSection"
import { ContactSection } from "@/components/ContactSection"
import { EnhancedFooter } from "@/components/EnhancedFooter"

const EMAILJS_SERVICE_ID = "service_h0vy9vu"
const EMAILJS_TEMPLATE_ID = "template_d1uho8h"
const EMAILJS_PUBLIC_KEY = "agnGT8GGLKKIdV3RJ"

const navigation = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Services", href: "#services" },
  { name: "Pricing", href: "#pricing" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Reviews", href: "#reviews" },
  { name: "Contact", href: "#contact" },
]

const workExperience = [
  {
    title: "WordPress Architect",
    company: "DigiScripts",
    period: "Jan 2020 – Present",
    description: "Architect and maintain enterprise WordPress ecosystems including custom plugin development, multisite networks, and headless CMS implementations. Lead technical roadmap for WHMCS-WordPress integration, automate hosting provisioning workflows, and build scalable REST API solutions for client portals.",
    icon: Building2,
    color: "from-emerald-700 to-teal-500",
    current: true,
    featured: true,
    skills: ["WordPress", "WHMCS", "PHP", "JavaScript", "API Integration", "MySQL", "cPanel API", "Laravel"],
  },
  {
    title: "Senior WHMCS Developer",
    company: "KodeXs",
    period: "Mar 2019 – Dec 2020",
    description: "Designed and deployed custom WHMCS modules for domain registration, SSL provisioning, and server management automation. Built payment gateway integrations including PayPal, Stripe, and 2Checkout. Automated cPanel account creation, suspension, and resource monitoring through WHMCS API hooks.",
    icon: Server,
    color: "from-emerald-500 to-teal-500",
    current: false,
    featured: false,
    skills: ["WHMCS", "WordPress", "PHP", "cPanel/WHM API", "Payment Gateways", "Automation", "MySQL"],
  },
  {
    title: "WordPress & WHMCS Developer",
    company: "DigiX",
    period: "Jun 2018 – Feb 2019",
    description: "Built custom WordPress plugins for membership management and e-commerce. Integrated WHMCS with WordPress for unified client billing and support ticketing. Optimized database queries and caching layers for high-traffic WordPress sites. Developed RESTful APIs connecting WHMCS to third-party provisioning platforms.",
    icon: Layers,
    color: "from-emerald-500 to-teal-500",
    current: false,
    featured: false,
    skills: ["WordPress", "WHMCS", "PHP", "JavaScript", "API Development", "MySQL", "Redis"],
  },
  {
    title: "Junior WordPress Developer",
    company: "AZ Software House",
    period: "Sep 2016 – May 2018",
    description: "Developed custom WordPress themes from PSD/Figma mockups using PHP, HTML/CSS, and JavaScript. Built and maintained plugins for contact forms, sliders, and SEO optimization. Assisted in WHMCS template customization and email automation. Collaborated directly with clients on requirements gathering and revision cycles.",
    icon: Code,
    color: "from-[#00674b] to-[#00674b]",
    current: false,
    featured: true,
    skills: ["WordPress", "WHMCS", "PHP", "HTML/CSS", "JavaScript", "Plugin Development"],
  },
]

const education = [
  { title: "Data Science", institution: "Ideoversity Training Institute, Arfa Tower", year: "Currently Studying", icon: Database },
  { title: "Web Development Diploma", institution: "Web Development Diploma", year: "2022-2023", icon: Code },
  { title: "Inter in Computer Science (ICS)", institution: "ICS", year: "2023-2025", icon: GraduationCap },
  { title: "Matric", institution: "Matriculation", year: "2021-2023", icon: Award },
]

const services = [
  {
    title: "WordPress Development",
    description: "Custom themes, plugins, and full website development with WooCommerce integration.",
    icon: Code,
  },
  {
    title: "WHMCS Setup & Integration",
    description: "Complete WHMCS configuration, automation, and seamless WordPress integration.",
    icon: Server,
  },
  {
    title: "Domain Reseller Solutions",
    description: "Full-featured domain reseller platforms with automated registration and renewal.",
    icon: Globe,
  },
  {
    title: "Website Recovery & Security",
    description: "Professional malware removal, hacked site restoration, and security hardening.",
    icon: Shield,
  },
  {
    title: "Web Hosting & Support",
    description: "Reliable hosting setup, server management, and round-the-clock technical support.",
    icon: Headphones,
  },
  {
    title: "Shopify",
    description: "Modern, responsive Shopify designs for exceptional user experiences.",
    icon: Palette,
  },
]

const staggerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08 },
  }),
}

export default function Home() {
  const { theme, setTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currency, setCurrency] = useState<"USD" | "PKR">("USD")
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [mobileMenuOpen])

  useEffect(() => {
    const detectCurrency = async () => {
      try {
        const response = await fetch("https://get.geojs.io/v1/ip/country.json")
        const data = await response.json()
        if (data.country === "PK") {
          setCurrency("PKR")
        }
      } catch (error) {
        console.error("Currency detection failed:", error)
      }
    }
    detectCurrency()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = navigation.map(n => n.href.slice(1))
      const scrollPos = window.scrollY + 150
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i])
          break
        }
      }
    }
    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen">
      <header className="fixed top-4 left-0 right-0 z-50 px-4">
        <nav className="max-w-6xl mx-auto bg-background/60 backdrop-blur-xl border border-white/10 dark:border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.12)] rounded-full px-6 py-2">
          <div className="flex items-center justify-between h-14">
            <a href="#home" className="text-xl font-bold text-[#00674b] hover:scale-105 transition-transform">
              Tousif.
            </a>

            <div className="hidden md:flex items-center gap-6">
              {navigation.map((item) => {
                const isActive = activeSection === item.href.slice(1)
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`text-sm font-medium transition-colors relative group ${
                      isActive ? "text-emerald-600" : "text-muted-foreground hover:text-emerald-600"
                    }`}
                  >
                    {item.name}
                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-emerald-600 transition-all ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`} />
                  </a>
                )
              })}
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center bg-muted/30 rounded-full p-1 border border-white/5">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrency("USD")}
                  className={`rounded-full px-3 h-7 text-[10px] font-bold transition-all ${
                    currency === "USD" 
                      ? "bg-gradient-to-r from-emerald-700 to-teal-500 !text-white hover:!text-white shadow-md shadow-emerald-700/10" 
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  }`}
                >
                  USD
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrency("PKR")}
                  className={`rounded-full px-3 h-7 text-[10px] font-bold transition-all ${
                    currency === "PKR" 
                      ? "bg-gradient-to-r from-emerald-700 to-teal-500 !text-white hover:!text-white shadow-md shadow-emerald-700/10" 
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  }`}
                >
                  PKR
                </Button>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full w-9 h-9 border border-white/5 hover:bg-white/5"
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="md:hidden w-9 h-9 rounded-full border border-white/5"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </nav>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden mt-2 px-4"
            >
              <div className="bg-background/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl space-y-1">
                {navigation.map((item) => {
                  const isActive = activeSection === item.href.slice(1)
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                        isActive
                          ? "text-emerald-600 bg-emerald-600/10"
                          : "text-muted-foreground hover:text-emerald-600 hover:bg-white/5"
                      }`}
                    >
                      {item.name}
                    </a>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <section id="home" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        <HeroBackground />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-6 sm:space-y-8 p-6 sm:p-8 lg:p-12 rounded-[2rem] bg-white/[0.02] dark:bg-black/[0.02] backdrop-blur-3xl border border-white/10 dark:border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.1)] relative overflow-hidden group"
            >
              {/* Decorative background element */}
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-emerald-600/10 rounded-full blur-3xl group-hover:bg-emerald-600/20 transition-all duration-700" />
              
              <div className="relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="inline-flex items-center gap-2 bg-emerald-600/10 text-emerald-600 border border-emerald-600/20 mb-6 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    Available for Projects
                  </div>
                </motion.div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-foreground leading-[1.05] tracking-tight">
                  Hi! I&apos;m{" "}
                  <span className="block text-[#00674b] drop-shadow-sm">Tousif Qasim</span>
                </h1>
                <p className="mt-8 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl font-medium">
                  Building professional, automated, and secure{" "}
                  <TypingEffect />{" "}
                  solutions for businesses worldwide.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row flex-wrap gap-4 relative z-10">
                  <Button
                    size="lg"
                    className="bg-[#00674b] hover:bg-[#00523b] text-white rounded-2xl px-8 h-14 text-lg font-bold shadow-xl shadow-emerald-900/20 transition-all hover:scale-105 active:scale-95"
                    asChild
                  >
                    <a href="https://wa.me/923286477314" target="_blank" rel="noopener noreferrer">
                      Start a Project
                    </a>
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="rounded-2xl px-8 h-14 text-lg font-bold border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all hover:scale-105 active:scale-95"
                    asChild
                  >
                    <a href="#portfolio">
                      Our Work
                      <ExternalLink className="ml-2 h-5 w-5 opacity-50" />
                    </a>
                  </Button>
                </div>

              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10 relative z-10">
                  <StatsCounter end={7} suffix="+" label="Experience" />
                  <StatsCounter end={50} suffix="+" label="Success" />
                  <StatsCounter end={100} suffix="%" label="Quality" />
                </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: "circOut" }}
              className="relative flex justify-center lg:justify-end"
            >
              <div className="relative group">
                {/* Modern Geometric Glows */}
                <div className="absolute -inset-10 bg-emerald-600/20 rounded-[3rem] blur-[100px] group-hover:bg-emerald-600/30 transition-all duration-1000" />
                
                <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-[420px] md:h-[420px] lg:w-[480px] lg:h-[480px]">
                  {/* Glass Card Container */}
                  <div className="relative w-full h-full rounded-[3rem] overflow-hidden border border-white/20 shadow-[0_32px_64px_rgba(0,0,0,0.2)] bg-muted/20 backdrop-blur-sm transform group-hover:rotate-2 group-hover:scale-[1.02] transition-all duration-700">
                    <Image
                      src="https://res.cloudinary.com/dy3l9ls1n/image/upload/q_auto/f_auto/v1781940829/Tousif-Qasim_y8xwis.webp"
                      alt="Tousif Qasim"
                      fill
                      sizes="(max-width: 640px) 288px, (max-width: 768px) 320px, (max-width: 1024px) 420px, 480px"
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      priority
                    />
                    {/* Bottom Green Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#00674b]/60 via-transparent to-transparent opacity-60" />
                  </div>
                  
                  {/* Floating Elements */}
                  <motion.div 
                    animate={{ y: [0, -15, 0], rotate: [0, 2, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -bottom-8 -left-8 bg-background/80 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl border border-white/10 z-20 hidden md:block"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#00674b] flex items-center justify-center">
                        <Code className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="text-[10px] text-emerald-600 font-black uppercase tracking-widest">Stack</p>
                        <p className="text-sm font-bold">WordPress Expert</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div 
                    animate={{ y: [0, 15, 0], rotate: [0, -2, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-10 -right-4 bg-background/80 backdrop-blur-2xl rounded-3xl p-5 shadow-2xl border border-white/10 z-20 hidden md:block"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-[#00674b] flex items-center justify-center">
                        <Shield className="h-5 w-5 text-white" />
                      </div>
                      <p className="text-sm font-bold">You Can Trust</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="hidden lg:flex justify-center mt-12"
          >
            <a
              href="#about"
              className="group flex flex-col items-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="text-xs font-bold uppercase tracking-widest mb-3 group-hover:translate-y-1 transition-transform">Explore More</span>
              <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center p-1">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-1.5 h-1.5 bg-emerald-600 rounded-full"
                />
              </div>
            </a>
          </motion.div>
        </div>
      </section>

      {/* About Section - Modern UI */}
      <section id="about" className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#00674b]/[0.02] rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-600/[0.02] rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="My Story"
            title="Know Me"
            highlighted="Better"
          />

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="p-8 lg:p-10 rounded-[2.5rem] bg-white/[0.02] dark:bg-black/[0.02] backdrop-blur-3xl border border-white/10 dark:border-white/5 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-[#00674b]/5 rounded-full blur-3xl group-hover:bg-[#00674b]/10 transition-all duration-700" />
                
                <div className="relative z-10 space-y-6 text-muted-foreground leading-relaxed text-lg">
                  <p>
                    Hi! I&apos;m <span className="text-[#00674b] font-bold">Tousif Qasim</span>, a passionate WordPress and Shopify developer and an ICS graduate, currently studying Data Science at Ideoversity Training Institute, Arfa Tower. I have 7+ years of experience in WordPress, Shopify, and WHMCS development, delivering professional and highly functional web solutions.
                  </p>
                  <p>
                    Currently diving into <span className="text-emerald-600 font-bold">Data Science</span> at Ideoversity Training Institute, I bring an analytical approach to web development—ensuring every line of code serves a business goal.
                  </p>
                  <p>
                    Whether you need a full-scale hosting platform or a conversion-focused eCommerce store, I deliver solutions that are not just beautiful, but <span className="text-[#00674b] font-bold underline decoration-emerald-600/30 underline-offset-8">engineered to scale.</span>
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 pt-8 mt-8 border-t border-white/10">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-xs font-bold">
                    <Mail className="h-4 w-4 text-[#00674b]" />
                    <span>contact@tousifqasim.dev</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-xs font-bold">
                    <Phone className="h-4 w-4 text-[#00674b]" />
                    <span>+92 328 6477314</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-xs font-bold">
                    <MapPin className="h-4 w-4 text-[#00674b]" />
                    <span>Hujra Shah Muqeem, Pakistan</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-10">
                <div className="w-14 h-14 rounded-2xl bg-[#00674b] flex items-center justify-center shadow-xl shadow-emerald-900/20">
                  <GraduationCap className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">Timeline</h3>
                  <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest">Academic & Professional Journey</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {education.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="p-5 rounded-2xl bg-white/[0.02] dark:bg-black/[0.02] border border-white/5 hover:border-[#00674b]/30 transition-all group flex items-center gap-5">
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-[#00674b]/10 transition-colors">
                        <item.icon className="h-5 w-5 text-muted-foreground group-hover:text-[#00674b] transition-colors" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-foreground text-base group-hover:text-[#00674b] transition-colors">{item.title}</h4>
                        <p className="text-xs text-muted-foreground font-medium mt-0.5">{item.institution}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-tighter opacity-50">{item.year}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Work Experience Section - Modern Bento Grid UI */}
      <section id="experience" className="relative py-24 overflow-hidden bg-muted/20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#00674b]/[0.02] rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-emerald-600/[0.02] rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Career Journey"
            title="Work"
            highlighted="Experience"
          />

          <div className="grid md:grid-cols-2 gap-6">
            {workExperience.map((job, index) => (
              <motion.div
                key={job.title}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={job.featured ? "md:col-span-2" : ""}
              >
                <div className={`relative overflow-hidden p-6 sm:p-8 rounded-[2rem] bg-white/[0.02] dark:bg-black/[0.02] backdrop-blur-3xl border border-white/10 dark:border-white/5 transition-all duration-500 group ${
                  job.featured 
                    ? "hover:border-[#00674b]/40 shadow-[0_20px_40px_rgba(0,103,75,0.05)]" 
                    : "hover:border-[#00674b]/30 shadow-lg"
                }`}>
                  <div className={`absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b ${job.color} opacity-40 group-hover:opacity-100 transition-opacity`} />
                  
                  <div className={`flex flex-col ${job.featured ? "lg:flex-row lg:items-center" : ""} gap-6`}>
                    <div className={`flex items-start gap-5 ${job.featured ? "lg:flex-1" : ""}`}>
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${job.color} flex items-center justify-center shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-500`}>
                        <job.icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          {job.current && (
                            <span className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                              <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                              </span>
                              Active
                            </span>
                          )}
                          <span className="bg-white/5 text-muted-foreground border border-white/5 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                            <Calendar className="h-3 w-3" />
                            {job.period}
                          </span>
                        </div>
                        <h3 className={`font-black text-foreground group-hover:text-[#00674b] transition-colors ${job.featured ? "text-2xl" : "text-xl"}`}>
                          {job.title}
                        </h3>
                        <p className="text-emerald-600 font-bold text-sm tracking-wide mt-0.5">{job.company}</p>
                      </div>
                    </div>
                    
                    <div className={job.featured ? "lg:max-w-md" : ""}>
                      <p className="text-muted-foreground leading-relaxed text-base font-medium">
                        {job.description}
                      </p>
                    </div>
                  </div>
                  
                  {job.skills && (
                    <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-white/5">
                      {job.skills.map((skill) => (
                        <span key={skill} className="px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-lg bg-[#00674b]/5 text-[#00674b] border border-[#00674b]/10 group-hover:bg-[#00674b]/10 transition-colors">
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section - Modern UI */}
      <section id="services" className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-[#00674b]/[0.02] rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-600/[0.02] rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Our Expertise"
            title="Solutions We"
            highlighted="Deliver"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="h-full p-8 rounded-[2.5rem] bg-white/[0.02] dark:bg-black/[0.02] backdrop-blur-3xl border border-white/10 dark:border-white/5 group hover:border-[#00674b]/40 hover:shadow-[0_20px_40px_rgba(0,103,75,0.05)] transition-all duration-500 relative overflow-hidden flex flex-col">
                  <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#00674b]/5 rounded-full blur-3xl group-hover:bg-[#00674b]/10 transition-colors" />
                  
                  <div className="relative z-10 flex flex-col flex-1">
                    <div className="w-16 h-16 rounded-2xl bg-[#00674b] flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl shadow-emerald-900/20">
                      <service.icon className="h-8 w-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-black text-foreground mb-4 group-hover:text-[#00674b] transition-colors leading-tight">
                      {service.title}
                    </h3>
                    
                    <p className="text-muted-foreground leading-relaxed text-base font-medium mb-8 flex-1">
                      {service.description}
                    </p>

                    <a href="#pricing" className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#00674b] group-hover:translate-x-2 transition-all duration-300">
                      Learn More <ChevronRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

<PricingSection currency={currency} />

<PortfolioSection />

<ReviewsSection />

<ContactSection />

      <BackToTop />

      <EnhancedFooter />
    </div>
  )
}
