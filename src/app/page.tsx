"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import emailjs from "@emailjs/browser"
import {
  Moon,
  Sun,
  Menu,
  X,
  Mail,
  Phone,
  MapPin,
  Code,
  Server,
  Globe,
  Shield,
  Headphones,
  Palette,
  Database,
  ChevronRight,
  ExternalLink,
  Send,
  Instagram,
  Facebook,
  MessageCircle,
  GraduationCap,
  Award,
  Calendar,
  Check,
  Sparkles,
  Zap,
  Crown,
  Star,
  Quote,
  Building2,
  Layers,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { HeroBackground } from "@/components/HeroBackground"
import { FiverrIcon } from "@/components/FiverrIcon"
import { SectionHeader } from "@/components/SectionHeader"
import { TypingEffect } from "@/components/TypingEffect"
import { StatsCounter } from "@/components/StatsCounter"
import { BackToTop } from "@/components/BackToTop"
import { SkillsSection } from "@/components/SkillsSection"

const EMAILJS_SERVICE_ID = "service_d2gjkb9"
const EMAILJS_TEMPLATE_ID = "template_e08qfnl"
const EMAILJS_PUBLIC_KEY = "n5vtuVWEKDKDgQ8qe"

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
    description: "Enterprise-level WordPress architecture, plugin development, scalable solutions, technical roadmap leadership.",
    icon: Building2,
    color: "from-emerald-700 to-teal-500",
    current: true,
    featured: true,
    skills: ["WordPress", "PHP", "WHMCS", "JavaScript", "API Integration", "MySQL"],
  },
  {
    title: "Senior WHMCS Developer",
    company: "KodeXs",
    period: "Mar 2019 – Dec 2020",
    description: "Custom WHMCS modules, hosting automation, payment integrations.",
    icon: Server,
    color: "from-emerald-500 to-teal-500",
    current: false,
    featured: false,
    skills: ["WHMCS", "PHP", "Automation", "Payment Gateways"],
  },
  {
    title: "Full Stack Developer",
    company: "DigiX",
    period: "Jun 2018 – Feb 2019",
    description: "PHP, JavaScript, APIs, database optimization, end-to-end web solutions.",
    icon: Layers,
    color: "from-emerald-500 to-teal-500",
    current: false,
    featured: false,
    skills: ["Full Stack", "JavaScript", "PHP", "API Development"],
  },
  {
    title: "Junior Developer",
    company: "AZ Software House",
    period: "Sep 2016 – May 2018",
    description: "WordPress themes/plugins, web fundamentals, client communication.",
    icon: Code,
    color: "from-[#00674b] to-[#00674b]",
    current: false,
    featured: true,
    skills: ["WordPress", "HTML/CSS", "PHP", "Web Basics"],
  },
]

const fiverrReviews = [
  { name: "John M.", country: "USA", review: "Exceptional work on my WordPress site! Tousif delivered beyond expectations with clean code and excellent communication throughout.", rating: 5 },
  { name: "Ahmed R.", country: "UAE", review: "Professional WHMCS integration. The automation system works flawlessly. Highly recommend for any hosting business needs.", rating: 5 },
  { name: "Sarah L.", country: "UK", review: "Transformed our outdated website into a modern, fast-loading masterpiece. Great attention to detail!", rating: 5 },
  { name: "Michael T.", country: "Canada", review: "Best developer I've worked with on Fiverr. Completed the project ahead of schedule with perfect results.", rating: 5 },
  { name: "Hassan A.", country: "Pakistan", review: "Outstanding domain reseller platform setup. Very knowledgeable and patient throughout the process.", rating: 5 },
  { name: "Daniel K.", country: "Germany", review: "Excellent security audit and malware removal. My site is now faster and more secure than ever.", rating: 5 },
  { name: "Olivia P.", country: "Australia", review: "Amazing WooCommerce customization! Sales have increased significantly since the redesign.", rating: 5 },
  { name: "Robert S.", country: "USA", review: "Professional, responsive, and delivers quality work. Will definitely hire again for future projects.", rating: 5 },
]

const whatsappReviews = [
  { name: "Ali Khan", review: "Bhai ne bohat zabardast kaam kiya hai. WordPress site bilkul professional lagti hai ab.", rating: 5 },
  { name: "Mark Wilson", review: "Tousif fixed my hacked website within hours. Incredible turnaround time and very reasonable rates.", rating: 5 },
  { name: "Ayesha Noor", review: "Best WHMCS developer in Pakistan! Very cooperative and delivers exactly what you need.", rating: 5 },
  { name: "James Brown", review: "The domain reseller platform is working perfectly. Automated everything as promised.", rating: 5 },
  { name: "Bilal Ahmed", review: "Third project with Tousif, never disappointed. Always on time and budget.", rating: 5 },
  { name: "Steven Cole", review: "Helped me set up my entire hosting business from scratch. Couldn't have done it without him.", rating: 5 },
  { name: "Usman Raza", review: "Super responsive on WhatsApp, answers all questions patiently. Great working with him!", rating: 5 },
  { name: "Kevin Moore", review: "Quality work at fair prices. My e-commerce site runs smoothly thanks to his optimizations.", rating: 5 },
]

const reviewImages = [
  "https://i.postimg.cc/52fnQ5cJ/1.png",
  "https://i.postimg.cc/YCtbL65Z/2.png",
  "https://i.postimg.cc/dVJ4ZRMY/3.png",
  "https://i.postimg.cc/pLPq5QNx/4.png",
]

const pricingPlans = [
  {
    name: "Starter",
    price: "$80",
    pricePKR: "15,000 PKR",
    originalPKR: "22,000 PKR",
    description: "Perfect for landing pages or portfolios",
    icon: Sparkles,
    popular: false,
    features: [
      "1 Page Website",
      "Contact Form",
      "Basic SEO Setup",
      "Responsive Design",
      "Speed Optimization",
      "Delivery in 2–3 Days",
    ],
    cta: "Get Started",
  },
  {
    name: "Professional",
    price: "$120",
    pricePKR: "25,000 PKR",
    originalPKR: "33,500 PKR",
    description: "Ideal for small businesses",
    icon: Zap,
    popular: true,
    features: [
      "Up to 5 Pages",
      "Contact Form",
      "Basic SEO Setup",
      "Online Booking",
      "Social Media Integration",
      "Delivery in 5-6 Days",
    ],
    cta: "Get Started",
  },
  {
    name: "Enterprise",
    price: "$150",
    pricePKR: "35,000 PKR",
    originalPKR: "42,000 PKR",
    description: "For growing businesses",
    icon: Crown,
    popular: false,
    features: [
      "Up to 10 Pages",
      "Ecommerce",
      "Online Payment",
      "Basic SEO Setup",
      "Speed Optimization",
      "Delivery in 8-10 Days",
    ],
    cta: "Get Started",
  },
]

const customPlan = {
  name: "Custom",
  price: "Let's Talk",
  description: "Tailored solutions for unique requirements. Have a specific project in mind? Let's discuss your needs and create a custom package that fits your goals perfectly.",
  icon: Code,
  features: [
    "Fully Custom Solution",
    "Dedicated Project Manager",
    "Scalable Architecture",
    "API Integrations",
    "Custom Plugins/Modules",
    "Ongoing Maintenance",
    "Training & Documentation",
    "Flexible Timeline",
  ],
  cta: "Discuss Project",
}

const education = [
  { title: "Data Science", institution: "Ideoversity Training Institute, Arfa Tower", year: "Currently Studying", icon: Database },
  { title: "Web Development Diploma", institution: "Web Development Diploma", year: "2022-2023", icon: Code },
  { title: "Inter in FCS Medical", institution: "FCS Medical", year: "2015-2016", icon: GraduationCap },
  { title: "Matric", institution: "Matriculation", year: "2013-2014", icon: Award },
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

const projects = [
  {
    title: "Purace Travel Colombia",
    description: "Tour Booking Website",
    image: "https://i.postimg.cc/YSKSfwKP/1.png",
    link: "https://puracetravelcolombia.com/",
  },
  {
    title: "RRR Motor Sports",
    description: "Rental Website",
    image: "https://i.postimg.cc/YSKSfwBw/2.png",
    link: "https://officialrrrmotorsports.com/",
  },
  {
    title: "Royal Oasis HTX",
    description: "Business Website",
    image: "https://i.postimg.cc/7L8LMyrL/6.png",
    link: "https://royaloasishtx.fun/",
  },
  {
    title: "AAA Consultant",
    description: "Visa Consultancy Website",
    image: "https://i.postimg.cc/W4L46PcR/4.png",
    link: "https://aaasconsultants.com/",
  },
  {
    title: "AL Mehdi Care Services",
    description: "Maid Services",
    image: "https://i.postimg.cc/xdDdySV2/3.png",
    link: "https://almehdicareservices.com/",
  },
  {
    title: "Upper Class Deals",
    description: "Flight Booking",
    image: "https://i.postimg.cc/Bv9vcGf3/5.png",
    link: "https://upperclassdeals.com/",
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
  const [formData, setFormData] = useState({ name: "", email: "", message: "", budget: "", interest: "" })
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [showModal, setShowModal] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isCarouselPaused, setIsCarouselPaused] = useState(false)
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

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % reviewImages.length)
  }, [])

  useEffect(() => {
    if (isCarouselPaused) return
    const interval = setInterval(nextImage, 3000)
    return () => clearInterval(interval)
  }, [isCarouselPaused, nextImage])

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus("submitting")
    
    try {
      await emailjs.send(
        "service_h0vy9vu",
        "template_d1uho8h",
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          budget: formData.budget,
          interest: formData.interest,
        },
        "agnGT8GGLKKIdV3RJ"
      )
      
      setFormStatus("success")
      setShowModal(true)
      setFormData({ name: "", email: "", message: "", budget: "", interest: "" })
    } catch {
      setFormStatus("error")
      setTimeout(() => setFormStatus("idle"), 3000)
    }
  }

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
                      src="https://i.postimg.cc/9Qj2mDzg/Tousif-Qasim.png"
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

      <SkillsSection />

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

      {/* Pricing Section */}
      <section id="pricing" className="relative py-24 overflow-hidden bg-muted/20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="bg-emerald-600/10 text-emerald-600 border-emerald-600/20 mb-4 px-4 py-1">
              Pricing Plans
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              Transparent{" "}
              <span className="bg-gradient-to-r from-emerald-700 to-teal-500 bg-clip-text text-transparent">
                Pricing
              </span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect plan for your needs. All plans include quality work and dedicated support.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group flex"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <Badge className="bg-gradient-to-r from-emerald-700 to-teal-500 text-white border-0 px-4 py-1 shadow-lg">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <Card className={`w-full relative overflow-hidden transition-all duration-500 flex flex-col ${
                  plan.popular 
                    ? "border-emerald-600/50 bg-gradient-to-b from-emerald-600/5 to-transparent shadow-xl shadow-emerald-600/10" 
                    : "border-border/50 bg-white/5 dark:bg-black/5 backdrop-blur-xl"
                } hover:border-emerald-600/50 hover:shadow-xl hover:shadow-emerald-600/10 group-hover:scale-[1.02]`}>
                  
                  <div className="absolute inset-0 bg-gradient-to-b from-emerald-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <CardContent className="p-6 relative z-10 flex flex-col flex-1">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${
                      plan.popular 
                        ? "bg-gradient-to-br from-emerald-700 to-teal-500 shadow-lg shadow-emerald-600/30" 
                        : "bg-gradient-to-br from-emerald-700/80 to-emerald-900/80"
                    }`}>
                      <plan.icon className="h-7 w-7 text-white" />
                    </div>

                    <h3 className="text-xl font-bold text-foreground mb-1">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4 min-h-[40px]">{plan.description}</p>

                    <div className="mb-6 min-h-[80px] flex flex-col justify-end">
                      {currency === "PKR" ? (
                        <div className="flex flex-col">
                          <span className="text-sm text-muted-foreground line-through opacity-60 mb-1">
                            {plan.originalPKR}
                          </span>
                          <span className={`text-3xl sm:text-4xl font-bold ${
                            plan.popular ? "bg-gradient-to-r from-emerald-700 to-teal-500 bg-clip-text text-transparent" : "text-foreground"
                          }`}>
                            {plan.pricePKR}
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-baseline gap-1">
                          <span className={`text-4xl font-bold ${
                            plan.popular ? "bg-gradient-to-r from-emerald-700 to-teal-500 bg-clip-text text-transparent" : "text-foreground"
                          }`}>
                            {plan.price}
                          </span>
                        </div>
                      )}
                      <span className="text-muted-foreground text-xs font-medium uppercase tracking-wider mt-1">per project</span>
                    </div>

                    <ul className="space-y-3 mb-8 flex-1">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-sm">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            plan.popular 
                              ? "bg-emerald-600/20 text-emerald-600" 
                              : "bg-muted text-muted-foreground"
                          }`}>
                            <Check className="h-3 w-3" />
                          </div>
                          <span className="text-muted-foreground/90">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="space-y-3 mt-auto">
                      <Button
                        className={`w-full h-12 font-bold transition-all duration-300 rounded-xl ${
                          plan.popular
                            ? "bg-gradient-to-r from-emerald-700 to-teal-500 hover:from-emerald-800 hover:to-teal-600 text-white shadow-lg shadow-emerald-600/25 hover:scale-[1.02] active:scale-[0.98]"
                            : "bg-foreground text-background hover:bg-foreground/90 shadow-lg shadow-foreground/5 hover:scale-[1.02] active:scale-[0.98]"
                        }`}
                        asChild
                      >
                        <a href="#contact">{plan.cta}</a>
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full h-12 font-bold rounded-xl border-emerald-500/20 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
                        asChild
                      >
                        <a href={`https://wa.me/923286477314?text=Hi Tousif! I'm interested in your ${plan.name} Package.`} target="_blank" rel="noopener noreferrer">
                          <MessageCircle className="h-5 w-5" />
                          WhatsApp
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Custom Plan - Landscape Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-10"
          >
            <Card className="relative overflow-hidden border-dashed border-2 border-emerald-500/30 bg-gradient-to-r from-emerald-500/5 via-teal-500/5 to-emerald-600/5 backdrop-blur-xl hover:border-emerald-500/50 transition-all duration-500 group">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-emerald-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <CardContent className="p-5 sm:p-6 lg:p-8 relative z-10">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-8">
                  <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 flex-1">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-emerald-700 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/30 flex-shrink-0">
                      <customPlan.icon className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">{customPlan.name}</h3>
                      <p className="text-sm sm:text-base text-muted-foreground">{customPlan.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-4 sm:gap-6">
                    <div className="grid grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-2">
                      {customPlan.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2 text-xs sm:text-sm">
                          <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                            <Check className="h-2.5 w-2.5 text-emerald-500" />
                          </div>
                          <span className="text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-emerald-500/20 lg:border-0 lg:pt-0">
                      <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                        {customPlan.price}
                      </span>
                      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                          <Button
                            className="bg-gradient-to-r from-emerald-700 to-teal-500 hover:from-emerald-800 hover:to-teal-600 text-white px-8 h-12 font-bold rounded-xl shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                            asChild
                          >
                            <a href="#pricing">{customPlan.cta}</a>
                          </Button>
                        <Button
                          variant="outline"
                          className="px-8 h-12 font-bold rounded-xl border-emerald-500/20 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-sm"
                          asChild
                        >
                          <a href="https://wa.me/923286477314?text=Hi Tousif! I have a custom project I'd like to discuss." target="_blank" rel="noopener noreferrer">
                            <MessageCircle className="h-5 w-5" />
                            WhatsApp
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-muted-foreground">
              All plans include free consultation.{" "}
              <a href="#contact" className="text-emerald-600 hover:text-emerald-500 font-medium underline underline-offset-4">
                Let&apos;s discuss your requirements
              </a>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Section - Modern Grid UI */}
      <section id="portfolio" className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/[0.03] rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-[#00674b]/[0.03] rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Selected Work"
            title="Featured"
            highlighted="Projects"
            description="A curated selection of digital experiences built with precision and care."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <Card className="overflow-hidden border-white/10 bg-white/[0.02] dark:bg-black/[0.02] backdrop-blur-xl transition-all duration-500 hover:border-[#00674b]/40 hover:shadow-[0_20px_40px_rgba(0,103,75,0.1)] rounded-3xl h-full flex flex-col">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                      <Button 
                        size="sm" 
                        className="w-full bg-[#00674b] hover:bg-[#00523b] text-white rounded-xl h-12 font-bold transform translate-y-4 group-hover:translate-y-0 transition-all duration-500" 
                        asChild
                      >
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                          Live Demo
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-[#00674b] transition-colors">{project.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                    <div className="mt-auto pt-4 flex items-center justify-between">
                      <div className="flex gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="w-2 h-2 rounded-full bg-teal-500" />
                        <span className="w-2 h-2 rounded-full bg-amber-500" />
                      </div>
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-[#00674b] font-bold text-xs uppercase tracking-widest flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all">
                        Explore <ChevronRight className="h-4 w-4" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <Button
              variant="outline"
              size="lg"
              className="rounded-2xl px-10 h-14 font-bold border-[#00674b]/20 hover:border-[#00674b]/50 hover:bg-[#00674b]/5 transition-all"
              asChild
            >
              <a href="https://wa.me/923286477314" target="_blank" rel="noopener noreferrer">
                View All Projects
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Reviews Section - Modern Card UI */}
      <section id="reviews" className="relative py-24 overflow-hidden bg-muted/20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-emerald-600/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="bg-emerald-600/10 text-emerald-600 border-emerald-600/20 mb-4 px-4 py-1">
              Client Reviews
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              What Clients{" "}
              <span className="bg-gradient-to-r from-emerald-700 to-teal-500 bg-clip-text text-transparent">
                Say
              </span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Trusted by clients worldwide. Here&apos;s what they have to say about my work.
            </p>
          </motion.div>

          {/* Image Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-16"
            onMouseEnter={() => setIsCarouselPaused(true)}
            onMouseLeave={() => setIsCarouselPaused(false)}
          >
            <div className="relative max-w-4xl mx-auto">
              <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] rounded-3xl overflow-hidden">
                {reviewImages.map((img, index) => (
                  <motion.div
                    key={img}
                    initial={false}
                    animate={{
                      opacity: currentImageIndex === index ? 1 : 0.3,
                      scale: currentImageIndex === index ? 1 : 0.95,
                      filter: currentImageIndex === index ? "blur(0px)" : "blur(4px)",
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className={`absolute inset-0 ${currentImageIndex === index ? "z-10" : "z-0"}`}
                  >
                    <Image
                      src={img}
                      alt={`Review screenshot ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 800px"
                      className="object-contain"
                    />
                  </motion.div>
                ))}
              </div>
              
              <div className="flex justify-center gap-2 mt-6">
                {reviewImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentImageIndex === index 
                        ? "bg-gradient-to-r from-emerald-700 to-teal-500 w-8" 
                        : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Fiverr Reviews */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-[#1DBF73] flex items-center justify-center">
                <FiverrIcon className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Fiverr Reviews</h3>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {fiverrReviews.map((review, index) => (
                <motion.div
                  key={review.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className={index >= 4 ? "hidden lg:block" : ""}
                >
                  <Card className="h-full border-border/50 bg-white/5 dark:bg-black/5 backdrop-blur-xl group hover:border-emerald-600/30 hover:shadow-xl hover:shadow-emerald-600/5 hover:-translate-y-1 transition-all duration-300">
                    <CardContent className="p-3 sm:p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0 mb-2 sm:mb-3">
                        <div>
                          <p className="font-semibold text-foreground text-xs sm:text-sm">{review.name}</p>
                          <p className="text-[10px] sm:text-xs text-muted-foreground">{review.country}</p>
                        </div>
                        <div className="flex gap-0.5">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                      </div>
                      <div className="relative">
                        <Quote className="absolute -top-1 -left-1 h-3 w-3 sm:h-4 sm:w-4 text-emerald-600/30" />
                        <p className="text-[10px] sm:text-xs text-muted-foreground leading-relaxed pl-3 sm:pl-4 line-clamp-3 group-hover:line-clamp-none transition-all">
                          {review.review}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* WhatsApp Reviews */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground">WhatsApp Reviews</h3>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {whatsappReviews.map((review, index) => (
                <motion.div
                  key={review.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className={index >= 4 ? "hidden lg:block" : ""}
                >
                  <Card className="h-full border-border/50 bg-white/5 dark:bg-black/5 backdrop-blur-xl group hover:border-emerald-600/30 hover:shadow-xl hover:shadow-emerald-600/5 hover:-translate-y-1 transition-all duration-300">
                    <CardContent className="p-3 sm:p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0 mb-2 sm:mb-3">
                        <p className="font-semibold text-foreground text-xs sm:text-sm">{review.name}</p>
                        <div className="flex gap-0.5">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                      </div>
                      <div className="relative">
                        <Quote className="absolute -top-1 -left-1 h-3 w-3 sm:h-4 sm:w-4 text-emerald-600/30" />
                        <p className="text-[10px] sm:text-xs text-muted-foreground leading-relaxed pl-3 sm:pl-4 line-clamp-3 group-hover:line-clamp-none transition-all">
                          {review.review}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Modern UI */}
      <section id="contact" className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="bg-emerald-600/10 text-emerald-600 border-emerald-600/20 mb-4 px-4 py-1">
              Contact
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              Get In{" "}
              <span className="bg-gradient-to-r from-emerald-700 to-teal-500 bg-clip-text text-transparent">
                Touch
              </span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Get in touch for custom WordPress, WHMCS, or web development solutions. 
              I&apos;m ready to help bring your project to life!
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <Card className="border-border/50 bg-white/5 dark:bg-black/5 backdrop-blur-xl">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-700 to-teal-500 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-white" />
                    </div>
                    Contact Information
                  </h3>
                  <div className="space-y-4">
                    <a href="mailto:contact@tousifqasim.dev" className="flex items-center gap-4 p-3 rounded-xl bg-emerald-600/5 hover:bg-emerald-600/10 transition-colors group">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-700 to-teal-500 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-emerald-600/20">
                        <Mail className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-semibold text-foreground">contact@tousifqasim.dev</p>
                      </div>
                    </a>
                    <a href="tel:+923286477314" className="flex items-center gap-4 p-3 rounded-xl bg-emerald-600/5 hover:bg-emerald-600/10 transition-colors group">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-emerald-500/20">
                        <Phone className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Phone / WhatsApp</p>
                        <p className="font-semibold text-foreground">+92 328 6477314</p>
                      </div>
                    </a>
                    <div className="flex items-center gap-4 p-3 rounded-xl bg-emerald-600/5">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                        <MapPin className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p className="font-semibold text-foreground">Hujra Shah Muqeem, Pakistan</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-white/5 dark:bg-black/5 backdrop-blur-xl">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    Follow Me
                  </h3>
                  <div className="flex flex-wrap gap-3">
                                <a
  href="https://wa.me/923286477314"
  target="_blank"
  rel="noopener noreferrer"
  className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center hover:bg-green-500/20 hover:border-green-500/40 hover:scale-110 transition-all"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-5 w-5 text-green-500"
  >
    <path d="M12.04 2C6.48 2 2 6.48 2 12.04c0 2.12.56 4.1 1.53 5.8L2 22l4.27-1.43c1.65.91 3.57 1.43 5.77 1.43 5.56 0 10.04-4.48 10.04-10.04C22.08 6.48 17.6 2 12.04 2zm5.7 14.32c-.23.66-1.33 1.27-1.92 1.35-.5.06-1.1.09-3.42-.86-3.1-1.3-5.09-5.25-5.25-5.46-.15-.21-1.3-1.8-1.3-3.44 0-1.64.87-2.44 1.17-2.77.3-.33.66-.41.88-.41.23 0 .45 0 .64.01.21.02.5-.08.78.57.28.64.94 2.22 1.02 2.38.08.16.12.34.03.54-.1.2-.15.32-.3.5-.15.18-.31.39-.44.53-.14.15-.28.32-.13.63.15.31.65 1.08 1.4 1.74.96.86 1.77 1.14 2.08 1.27.31.13.5.11.69-.07.19-.18.81-.94 1.01-1.26.2-.31.41-.26.68-.16.27.1 1.72.81 2.02.95.3.14.5.21.57.33.07.12.07.71-.16 1.37z" />
  </svg>
</a>
                    <a
                      href="https://www.instagram.com/tousifqasim/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center hover:bg-pink-500/20 hover:border-pink-500/40 hover:scale-110 transition-all"
                    >
                      <Instagram className="h-5 w-5 text-pink-500" />
                    </a>
                    <a
                      href="https://www.facebook.com/imtousifqasim"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-xl bg-emerald-600/10 border border-emerald-600/20 flex items-center justify-center hover:bg-emerald-600/20 hover:border-emerald-600/40 hover:scale-110 transition-all"
                    >
                      <Facebook className="h-5 w-5 text-emerald-600" />
                    </a>

                    <a
                      href="https://www.tiktok.com/@itxtousifahmad"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-xl bg-foreground/10 border border-foreground/20 flex items-center justify-center hover:bg-foreground/20 hover:border-foreground/40 hover:scale-110 transition-all"
                    >
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                      </svg>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="border-border/50 bg-white/5 dark:bg-black/5 backdrop-blur-xl overflow-hidden">
                <CardContent className="p-6 lg:p-8">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-700 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-600/25">
                      <Send className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">Send a Message</h3>
                      <p className="text-sm text-muted-foreground">I&apos;ll respond within 24 hours</p>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div className="relative group">
                        <Input
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          className="bg-white/5 dark:bg-black/10 border-white/10 h-14 pl-4 text-base rounded-xl focus:border-emerald-600/50 focus:ring-2 focus:ring-emerald-600/20 transition-all"
                        />
                      </div>
                      <div className="relative group">
                        <Input
                          type="email"
                          placeholder="Your Email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          className="bg-white/5 dark:bg-black/10 border-white/10 h-14 pl-4 text-base rounded-xl focus:border-emerald-600/50 focus:ring-2 focus:ring-emerald-600/20 transition-all"
                        />
                      </div>
                      <div className="relative group">
                        <Textarea
                          placeholder="Tell me about your project..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          required
                          rows={5}
                          className="bg-white/5 dark:bg-black/10 border-white/10 p-4 text-base rounded-xl resize-none focus:border-emerald-600/50 focus:ring-2 focus:ring-emerald-600/20 transition-all"
                        />
                      </div>
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full h-14 bg-gradient-to-r from-emerald-700 to-teal-500 hover:from-emerald-800 hover:to-teal-600 text-white font-semibold text-base rounded-xl shadow-lg shadow-emerald-600/25 disabled:opacity-70 transition-all hover:scale-[1.02] active:scale-[0.98]"
                      disabled={formStatus === "submitting" || formStatus === "success"}
                    >
                      {formStatus === "submitting" ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Sending...
                        </span>
                      ) : formStatus === "success" ? (
                        <span className="flex items-center gap-2">
                          <Check className="h-5 w-5" />
                          Message Sent!
                        </span>
                      ) : formStatus === "error" ? (
                        <span className="flex items-center gap-2">
                          <X className="h-5 w-5" />
                          Failed - Try Again
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="h-5 w-5" />
                          Send Message
                        </span>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => { setShowModal(false); setFormStatus("idle"); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <Card className="border-border/50 bg-background/95 backdrop-blur-xl shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-700/10 via-teal-500/5 to-transparent pointer-events-none" />
                <CardContent className="p-8 relative z-10">
                  <button
                    onClick={() => { setShowModal(false); setFormStatus("idle"); }}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted/50 hover:bg-muted flex items-center justify-center transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 15 }}
                      className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-700 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-600/30"
                    >
                      <Check className="h-10 w-10 text-white" />
                    </motion.div>
                    
                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-2xl font-bold text-foreground mb-2"
                    >
                      Message Sent!
                    </motion.h3>
                    
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-muted-foreground mb-6"
                    >
                      Your message has been sent successfully! I&apos;ll get back to you as soon as possible.
                    </motion.p>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Button
                        onClick={() => { setShowModal(false); setFormStatus("idle"); }}
                        className="bg-gradient-to-r from-emerald-700 to-teal-500 hover:from-emerald-800 hover:to-teal-600 text-white font-semibold px-8 h-12 shadow-lg shadow-emerald-600/20"
                      >
                        Close
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <BackToTop />

      <footer className="py-8 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Tousif Qasim. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href="#home" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Back to Top
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
