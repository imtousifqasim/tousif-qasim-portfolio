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
  ChevronLeft,
  ExternalLink,
  Send,
  Linkedin,
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
  Coins,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { HeroBackground } from "@/components/HeroBackground"
import { FiverrIcon } from "@/components/FiverrIcon"

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
    description: "Enterprise-level WordPress architecture, plugin development, scalable solutions, technical roadmap leadership.",
    icon: Building2,
    color: "from-blue-600 to-cyan-500",
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
    color: "from-emerald-500 to-cyan-500",
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
    color: "from-violet-500 to-purple-500",
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
    color: "from-amber-500 to-orange-500",
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
  { title: "Web Development Diploma", institution: "Professional Training", year: "2022-2023", icon: Code },
  { title: "Inter (ICS)", institution: "Intermediate Studies", year: "2023-2025", icon: GraduationCap },
  { title: "Matriculation", institution: "Secondary Education", year: "2021-2023", icon: Award },
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

export default function Home() {
  const { theme, setTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currency, setCurrency] = useState<"USD" | "PKR">("USD")
  const [formData, setFormData] = useState({ name: "", email: "", message: "", budget: "", interest: "" })
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [showModal, setShowModal] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isCarouselPaused, setIsCarouselPaused] = useState(false)
  const [portfolioIndex, setPortfolioIndex] = useState(0)
  const [isPortfolioPaused, setIsPortfolioPaused] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const detectCurrency = async () => {
      try {
        const response = await fetch("https://ipwho.is/")
        const data = await response.json()
        if (data.country_code === "PK") {
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

  const nextPortfolio = useCallback(() => {
    setPortfolioIndex((prev) => (prev + 1) % projects.length)
  }, [])

  const prevPortfolio = useCallback(() => {
    setPortfolioIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }, [])

  useEffect(() => {
    if (isPortfolioPaused) return
    const interval = setInterval(nextPortfolio, 4000)
    return () => clearInterval(interval)
  }, [isPortfolioPaused, nextPortfolio])

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100
      setScrollProgress(Math.min(100, Math.max(0, progress)))
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus("submitting")
    
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          budget: formData.budget,
          interest: formData.interest,
        },
        EMAILJS_PUBLIC_KEY
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
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        {/* Scroll Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-muted/30">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
            style={{ width: `${scrollProgress}%` }}
            transition={{ duration: 0.1, ease: "linear" }}
          />
        </div>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="#home" className="text-xl font-bold gradient-text">
              Tousif.
            </a>

            <div className="hidden md:flex items-center gap-8">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center bg-muted/50 rounded-full p-1 border border-border">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrency("USD")}
                  className={`rounded-full px-4 h-8 text-xs font-bold transition-all ${
                    currency === "USD" 
                      ? "bg-background text-foreground shadow-sm hover:bg-background" 
                      : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                  }`}
                >
                  USD
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrency("PKR")}
                  className={`rounded-full px-4 h-8 text-xs font-bold transition-all ${
                    currency === "PKR" 
                      ? "bg-background text-foreground shadow-sm hover:bg-background" 
                      : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                  }`}
                >
                  PKR
                </Button>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full"
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </nav>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-background border-b border-border"
            >
              <div className="px-4 py-4 space-y-2">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                  >
                    {item.name}
                  </a>
                ))}
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
              className="space-y-6 sm:space-y-8 p-5 sm:p-6 lg:p-10 rounded-3xl bg-white/5 dark:bg-black/5 backdrop-blur-xl border border-white/10 dark:border-white/5 shadow-2xl"
            >
              <div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20 mb-4 px-4 py-1 text-sm font-medium">
                    Available for Projects
                  </Badge>
                </motion.div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-foreground leading-[1.1] tracking-tight">
                  Hi! I&apos;m{" "}
                  <span className="gradient-text bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">Tousif Qasim</span>
                </h1>
                <p className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl">
                  Building professional, automated, and secure{" "}
                  <span className="text-blue-500 font-semibold underline underline-offset-4 decoration-blue-500/30">WordPress, Shopify & WHMCS</span>{" "}
                  solutions for businesses worldwide.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                  <Button
                    size="lg"
                    className="bg-[#1DBF73] hover:bg-[#19a463] text-white rounded-full px-6 sm:px-8 h-12 sm:h-14 text-base sm:text-lg font-semibold shadow-lg shadow-[#1DBF73]/20 transition-all hover:scale-105 active:scale-95"
                    asChild
                  >
                    <a href="https://www.fiverr.com/mr_tousifqasim" target="_blank" rel="noopener noreferrer">
                      Hire on Fiverr
                    </a>
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="rounded-full px-6 sm:px-8 h-12 sm:h-14 text-base sm:text-lg font-semibold border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all hover:scale-105 active:scale-95"
                    asChild
                  >
                    <a href="#portfolio">
                      View Portfolio
                      <ExternalLink className="ml-2 h-5 w-5" />
                    </a>
                  </Button>
                </div>

              <div className="flex items-center justify-between sm:justify-start gap-4 sm:gap-8 pt-6 border-t border-white/10">
                  <div className="text-center sm:text-left">
                    <p className="text-2xl sm:text-3xl font-bold text-foreground">7+</p>
                    <p className="text-xs sm:text-sm text-muted-foreground font-medium">Years Experience</p>
                  </div>
                  <div className="h-8 sm:h-10 w-px bg-white/10" />
                  <div className="text-center sm:text-left">
                    <p className="text-2xl sm:text-3xl font-bold text-foreground">50+</p>
                    <p className="text-xs sm:text-sm text-muted-foreground font-medium">Projects Done</p>
                  </div>
                  <div className="h-8 sm:h-10 w-px bg-white/10" />
                  <div className="text-center sm:text-left">
                    <p className="text-2xl sm:text-3xl font-bold text-foreground">100%</p>
                    <p className="text-xs sm:text-sm text-muted-foreground font-medium">Success Rate</p>
                  </div>
                </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex justify-center lg:justify-end"
            >
              <div className="relative group">
                {/* Modern UI Glows */}
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 animate-pulse" />
                
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px]">
                  {/* Bottom Blue Effect */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-b from-transparent via-transparent to-blue-600/40 z-10 pointer-events-none" />
                  
                  <div className="relative w-full h-full rounded-full overflow-hidden border-8 border-white/10 backdrop-blur-sm shadow-2xl ring-1 ring-white/20">
                    <Image
                      src="https://i.postimg.cc/9Qj2mDzg/Tousif-Qasim.png"
                      alt="Tousif Qasim"
                      fill
                      sizes="(max-width: 640px) 256px, (max-width: 768px) 288px, (max-width: 1024px) 384px, 450px"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      priority
                    />
                  </div>
                  
                    {/* Interactive floating card */}
                    <motion.div 
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute -bottom-4 -right-2 sm:-bottom-6 sm:-right-6 lg:-right-10 bg-white/10 dark:bg-black/40 backdrop-blur-2xl rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-2xl border border-white/20 z-20"
                    >
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/40">
                          <Code className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                        </div>
                        <div>
                          <p className="text-[10px] sm:text-xs text-blue-400 font-bold uppercase tracking-wider">Expertise</p>
                          <p className="text-xs sm:text-sm lg:text-base font-bold">Full-Stack Dev</p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Top-left status badge */}
                    <div className="absolute -top-2 -left-2 sm:-top-4 sm:-left-4 bg-white/10 dark:bg-black/40 backdrop-blur-2xl rounded-full px-3 py-1.5 sm:px-4 sm:py-2 shadow-xl border border-white/20 z-20 flex items-center gap-2">
                      <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-green-500"></span>
                      </span>
                      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest">Active Now</span>
                    </div>
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
                  className="w-1.5 h-1.5 bg-blue-500 rounded-full"
                />
              </div>
            </a>
          </motion.div>
        </div>
      </section>

      {/* About Section - Modern UI */}
      <section id="about" className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20 mb-4 px-4 py-1">
              About Me
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              Know Me{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Better
              </span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <Card className="border-border/50 bg-white/5 dark:bg-black/5 backdrop-blur-xl overflow-hidden">
                <CardContent className="p-6 lg:p-8">
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
       <p>
  Hi! I'm Tousif Qasim, a passionate <span className="text-blue-500 font-semibold">WordPress and Shopify developer</span> and an ICS graduate, currently studying Data Science at Ideoversity Training Institute, Arfa Tower. I have 7+ years of experience in WordPress, Shopify, and WHMCS development, delivering professional and highly functional web solutions.
</p>
<p>
  I specialize in WordPress and Shopify development, offering services such as custom themes, plugins, eCommerce websites (WooCommerce & Shopify), WHMCS setup, configuration, and design, domain reseller integration (ResellerClub, OpenSRS, etc.), frontend integration, and full custom domain reseller platforms. I also handle website recovery, malware cleaning, responsive website design and development, and reliable hosting solutions with technical support.
</p>
<p>
  Whether you need a custom WHMCS theme, a Shopify or WordPress eCommerce site, or a fully automated domain reseller system, I can help you build a modern, powerful, and seamless web solution for your business.
</p>


                  </div>

                  <div className="flex flex-wrap gap-4 pt-6 mt-6 border-t border-white/10">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-sm">
                      <Mail className="h-4 w-4 text-blue-500" />
                      <span>contact@tousifqasim.dev</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-sm">
                      <Phone className="h-4 w-4 text-blue-500" />
                      <span>+92 310 6047449</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-sm">
                      <MapPin className="h-4 w-4 text-blue-500" />
                      <span>Hujra Shah Muqeem, Pakistan</span>
                    </div>
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
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Education & Journey</h3>
                  <p className="text-sm text-muted-foreground">My learning path</p>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-cyan-500 to-violet-500" />
                
                <div className="space-y-6">
                  {education.map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="relative pl-16"
                    >
                      <div className={`absolute left-0 w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg z-10 ${
                        index === 0 
                          ? "bg-gradient-to-br from-blue-600 to-cyan-500 shadow-blue-500/30" 
                          : index === 1
                          ? "bg-gradient-to-br from-cyan-500 to-emerald-500 shadow-cyan-500/30"
                          : index === 2
                          ? "bg-gradient-to-br from-violet-500 to-purple-500 shadow-violet-500/30"
                          : "bg-gradient-to-br from-amber-500 to-orange-500 shadow-amber-500/30"
                      }`}>
                        <item.icon className="h-5 w-5 text-white" />
                      </div>
                      
                      <Card className="border-border/50 bg-white/5 dark:bg-black/5 backdrop-blur-xl hover:border-blue-500/30 transition-all duration-300 group hover:shadow-lg hover:shadow-blue-500/5">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <h4 className="font-bold text-foreground group-hover:text-blue-500 transition-colors">{item.title}</h4>
                              <p className="text-sm text-muted-foreground mt-1">{item.institution}</p>
                            </div>
                            <Badge className={`flex-shrink-0 ${
                              index === 0 
                                ? "bg-blue-500/10 text-blue-500 border-blue-500/20" 
                                : "bg-muted text-muted-foreground border-border"
                            }`}>
                              <Calendar className="h-3 w-3 mr-1" />
                              {item.year}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Work Experience Section - Modern Bento Grid UI */}
      <section id="experience" className="relative py-24 overflow-hidden bg-muted/20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20 mb-4 px-4 py-1">
              Career Journey
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              My Work{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Experience
              </span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              A timeline of my professional journey and growth in the tech industry.
            </p>
          </motion.div>

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
                <Card className={`relative overflow-hidden border-border/50 bg-white/5 dark:bg-black/5 backdrop-blur-xl group hover:shadow-2xl transition-all duration-500 ${
                  job.featured 
                    ? "hover:shadow-blue-500/10 hover:border-blue-500/50" 
                    : "hover:shadow-blue-500/5 hover:border-blue-500/30"
                }`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${job.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  <div className={`absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b ${job.color}`} />
                  
                  <CardContent className={`relative z-10 ${job.featured ? "p-6 lg:p-8" : "p-6"}`}>
                    <div className={`flex flex-col ${job.featured ? "lg:flex-row lg:items-center" : ""} gap-4 lg:gap-6`}>
                      <div className={`flex items-start gap-4 ${job.featured ? "lg:flex-1" : ""}`}>
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${job.color} flex items-center justify-center shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                          <job.icon className="h-7 w-7 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            {job.current && (
                              <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-xs">
                                <span className="relative flex h-1.5 w-1.5 mr-1.5">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                                </span>
                                Current Role
                              </Badge>
                            )}
                            <Badge className="bg-white/5 text-muted-foreground border-white/10 text-xs">
                              <Calendar className="h-3 w-3 mr-1" />
                              {job.period}
                            </Badge>
                          </div>
                          <h3 className={`font-bold text-foreground group-hover:text-blue-500 transition-colors ${job.featured ? "text-xl lg:text-2xl" : "text-lg"}`}>
                            {job.title}
                          </h3>
                          <p className={`text-blue-500 font-semibold ${job.featured ? "text-base" : "text-sm"}`}>{job.company}</p>
                        </div>
                      </div>
                      
                      <div className={job.featured ? "lg:max-w-md" : ""}>
                        <p className={`text-muted-foreground leading-relaxed ${job.featured ? "text-base" : "text-sm"}`}>
                          {job.description}
                        </p>
                      </div>
                    </div>
                    
                    {job.skills && job.skills.length > 0 && (
                      <div className={`flex flex-wrap gap-2 mt-6 pt-6 border-t border-white/10 ${!job.featured && "opacity-60 group-hover:opacity-100 transition-opacity"}`}>
                        {job.skills.map((skill) => (
                          <span key={skill} className="px-3 py-1 text-xs font-medium rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20">
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
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
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-4 px-6 py-3 rounded-2xl bg-white/5 dark:bg-black/10 backdrop-blur-xl border border-white/10">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center border-2 border-background">
                  <span className="text-xs font-bold text-white">7+</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center border-2 border-background">
                  <span className="text-xs font-bold text-white">50+</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center border-2 border-background">
                  <Check className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-foreground">Years of Excellence</p>
                <p className="text-xs text-muted-foreground">Building solutions that matter</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section - Modern UI */}
      <section id="services" className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-violet-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20 mb-4 px-4 py-1">
              Services
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              What I{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Offer
              </span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              End-to-end web solutions tailored to your business needs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-border/40 bg-white/5 dark:bg-black/5 backdrop-blur-xl group hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-500 relative overflow-hidden rounded-3xl">
                  {/* Subtle Background Glow */}
                  <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-colors" />
                  
                  <CardContent className="p-8 relative z-10">
                    <div className="flex flex-col items-start text-left">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${
                        index % 3 === 0 ? "from-blue-600 to-cyan-500 shadow-blue-500/20" :
                        index % 3 === 1 ? "from-violet-600 to-purple-500 shadow-violet-500/20" :
                        "from-emerald-500 to-teal-400 shadow-emerald-500/20"
                      } flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                        <service.icon className="h-7 w-7 text-white" />
                      </div>
                      
                      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-blue-500 transition-colors">
                        {service.title}
                      </h3>
                      
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {service.description}
                      </p>

                      <div className="flex items-center gap-2 text-sm font-bold text-blue-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                        Discuss Project <ChevronRight className="h-4 w-4" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative py-24 overflow-hidden bg-muted/20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20 mb-4 px-4 py-1">
              Pricing Plans
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              Transparent{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
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
                    <Badge className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-0 px-4 py-1 shadow-lg">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <Card className={`w-full relative overflow-hidden transition-all duration-500 flex flex-col ${
                  plan.popular 
                    ? "border-blue-500/50 bg-gradient-to-b from-blue-500/5 to-transparent shadow-xl shadow-blue-500/10" 
                    : "border-border/50 bg-white/5 dark:bg-black/5 backdrop-blur-xl"
                } hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 group-hover:scale-[1.02]`}>
                  
                  <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <CardContent className="p-6 relative z-10 flex flex-col flex-1">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${
                      plan.popular 
                        ? "bg-gradient-to-br from-blue-600 to-cyan-500 shadow-lg shadow-blue-500/30" 
                        : "bg-gradient-to-br from-blue-600/80 to-blue-800/80"
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
                            plan.popular ? "bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent" : "text-foreground"
                          }`}>
                            {plan.pricePKR}
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-baseline gap-1">
                          <span className={`text-4xl font-bold ${
                            plan.popular ? "bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent" : "text-foreground"
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
                              ? "bg-blue-500/20 text-blue-500" 
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
                            ? "bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white shadow-lg shadow-blue-500/25 hover:scale-[1.02] active:scale-[0.98]"
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
                        <a href={`https://wa.me/923106047449?text=Hi Tousif! I'm interested in your ${plan.name} Package.`} target="_blank" rel="noopener noreferrer">
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
            <Card className="relative overflow-hidden border-dashed border-2 border-violet-500/30 bg-gradient-to-r from-violet-500/5 via-purple-500/5 to-blue-500/5 backdrop-blur-xl hover:border-violet-500/50 transition-all duration-500 group">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <CardContent className="p-5 sm:p-6 lg:p-8 relative z-10">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-8">
                  <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 flex-1">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-500 flex items-center justify-center shadow-lg shadow-violet-500/30 flex-shrink-0">
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
                          <div className="w-4 h-4 rounded-full bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                            <Check className="h-2.5 w-2.5 text-violet-500" />
                          </div>
                          <span className="text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-violet-500/20 lg:border-0 lg:pt-0">
                      <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-violet-500 to-purple-500 bg-clip-text text-transparent">
                        {customPlan.price}
                      </span>
                      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                        <Button
                          className="bg-gradient-to-r from-violet-600 to-purple-500 hover:from-violet-700 hover:to-purple-600 text-white px-8 h-12 font-bold rounded-xl shadow-lg shadow-violet-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                          asChild
                        >
                          <a href="#contact">{customPlan.cta}</a>
                        </Button>
                        <Button
                          variant="outline"
                          className="px-8 h-12 font-bold rounded-xl border-emerald-500/20 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-sm"
                          asChild
                        >
                          <a href="https://wa.me/923106047449?text=Hi Tousif! I have a custom project I'd like to discuss." target="_blank" rel="noopener noreferrer">
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
              <a href="#contact" className="text-blue-500 hover:text-blue-400 font-medium underline underline-offset-4">
                Let&apos;s discuss your requirements
              </a>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Section - Modern Carousel UI */}
      <section id="portfolio" className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20 mb-4 px-4 py-1">
              Portfolio
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              Featured{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              A showcase of my best work across web development and digital solutions.
            </p>
          </motion.div>

          {/* Modern Single-Line Carousel */}
          <div 
            className="relative"
            onMouseEnter={() => setIsPortfolioPaused(true)}
            onMouseLeave={() => setIsPortfolioPaused(false)}
          >
            {/* Navigation Buttons */}
            <button
              onClick={prevPortfolio}
              className="absolute left-2 sm:left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-white/90 dark:bg-black/80 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:bg-white hover:scale-110 transition-all shadow-2xl group"
            >
              <ChevronLeft className="h-6 w-6 text-foreground group-hover:text-blue-500 transition-colors" />
            </button>
            <button
              onClick={nextPortfolio}
              className="absolute right-2 sm:right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-white/90 dark:bg-black/80 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:bg-white hover:scale-110 transition-all shadow-2xl group"
            >
              <ChevronRight className="h-6 w-6 text-foreground group-hover:text-blue-500 transition-colors" />
            </button>

            {/* Carousel Container */}
            <div className="flex items-center justify-center gap-4 lg:gap-6 px-16 lg:px-20">
              {projects.map((project, index) => {
                const isActive = portfolioIndex === index
                const isPrev = portfolioIndex === index + 1 || (portfolioIndex === 0 && index === projects.length - 1)
                const isNext = portfolioIndex === index - 1 || (portfolioIndex === projects.length - 1 && index === 0)
                const isVisible = isActive || isPrev || isNext
                
                return (
                  <motion.div
                    key={project.title}
                    initial={false}
                    animate={{
                      scale: isActive ? 1 : 0.75,
                      opacity: isActive ? 1 : isVisible ? 0.4 : 0,
                      x: isActive ? 0 : isPrev ? -50 : isNext ? 50 : 0,
                      filter: isActive ? "blur(0px)" : "blur(4px)",
                      zIndex: isActive ? 20 : 10,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className={`${isActive ? "flex-shrink-0" : "absolute"} ${!isVisible && "pointer-events-none"}`}
                    style={{
                      left: isPrev ? "0%" : isNext ? "auto" : undefined,
                      right: isNext ? "0%" : undefined,
                    }}
                    onClick={() => !isActive && setPortfolioIndex(index)}
                  >
                    <Card className={`overflow-hidden transition-all duration-500 cursor-pointer ${
                      isActive 
                        ? "border-blue-500/50 shadow-2xl shadow-blue-500/20 w-[320px] sm:w-[500px] lg:w-[671px]" 
                        : "border-border/30 w-[240px] sm:w-[350px] lg:w-[450px]"
                    } bg-white/5 dark:bg-black/5 backdrop-blur-xl`}>
                      <div className={`relative overflow-hidden ${isActive ? "h-[200px] sm:h-[300px] lg:h-[393px]" : "h-[150px] sm:h-[220px] lg:h-[280px]"}`}>
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="(max-width: 640px) 320px, (max-width: 1024px) 500px, 671px"
                          className={`object-cover transition-transform duration-700 ${isActive ? "hover:scale-105" : ""}`}
                        />
                        <div className={`absolute inset-0 transition-opacity duration-500 ${
                          isActive 
                            ? "bg-gradient-to-t from-black/80 via-black/20 to-transparent" 
                            : "bg-black/40"
                        }`} />
                        
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="absolute bottom-0 left-0 right-0 p-4 sm:p-6"
                          >
                            <h3 className="font-bold text-white text-lg sm:text-xl lg:text-2xl mb-1 sm:mb-2">{project.title}</h3>
                            <p className="text-white/80 text-sm sm:text-base mb-3 sm:mb-4">{project.description}</p>
                            <Button 
                              size="sm" 
                              className="relative bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.5),0_0_40px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.7),0_0_60px_rgba(6,182,212,0.5)] hover:scale-110 transition-all duration-300 gap-2 font-semibold animate-pulse" 
                              asChild
                            >
                              <a href={project.link} target="_blank" rel="noopener noreferrer">
                                View Live
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            </Button>
                          </motion.div>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                )
              })}
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-10">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setPortfolioIndex(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    portfolioIndex === index 
                      ? "w-10 bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg shadow-blue-500/30" 
                      : "w-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                />
              ))}
            </div>

            {/* Project Counter */}
            <div className="flex justify-center mt-6">
              <div className="px-4 py-2 rounded-full bg-white/5 dark:bg-black/20 backdrop-blur-xl border border-white/10">
                <span className="text-sm font-medium">
                  <span className="text-blue-500">{String(portfolioIndex + 1).padStart(2, '0')}</span>
                  <span className="text-muted-foreground mx-2">/</span>
                  <span className="text-muted-foreground">{String(projects.length).padStart(2, '0')}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section - Modern Card UI */}
      <section id="reviews" className="relative py-24 overflow-hidden bg-muted/20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20 mb-4 px-4 py-1">
              Client Reviews
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              What Clients{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
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
                        ? "bg-gradient-to-r from-blue-600 to-cyan-500 w-8" 
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
                  <Card className="h-full border-border/50 bg-white/5 dark:bg-black/5 backdrop-blur-xl group hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-300">
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
                        <Quote className="absolute -top-1 -left-1 h-3 w-3 sm:h-4 sm:w-4 text-blue-500/30" />
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
                  <Card className="h-full border-border/50 bg-white/5 dark:bg-black/5 backdrop-blur-xl group hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-300">
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
                        <Quote className="absolute -top-1 -left-1 h-3 w-3 sm:h-4 sm:w-4 text-blue-500/30" />
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
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20 mb-4 px-4 py-1">
              Contact
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              Get In{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
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
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-white" />
                    </div>
                    Contact Information
                  </h3>
                  <div className="space-y-4">
                    <a href="mailto:contact@tousifqasim.dev" className="flex items-center gap-4 p-3 rounded-xl bg-blue-500/5 hover:bg-blue-500/10 transition-colors group">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/20">
                        <Mail className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-semibold text-foreground">contact@tousifqasim.dev</p>
                      </div>
                    </a>
                    <a href="tel:+923106047449" className="flex items-center gap-4 p-3 rounded-xl bg-blue-500/5 hover:bg-blue-500/10 transition-colors group">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-emerald-500/20">
                        <Phone className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Phone / WhatsApp</p>
                        <p className="font-semibold text-foreground">+92 310 6047449</p>
                      </div>
                    </a>
                    <div className="flex items-center gap-4 p-3 rounded-xl bg-blue-500/5">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center shadow-lg shadow-violet-500/20">
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
  href="https://wa.me/923106047449"
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
                      href="https://www.linkedin.com/in/tousifqasim/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center hover:bg-blue-500/20 hover:border-blue-500/40 hover:scale-110 transition-all"
                    >
                      <Linkedin className="h-5 w-5 text-blue-500" />
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
                      className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center hover:bg-blue-500/20 hover:border-blue-500/40 hover:scale-110 transition-all"
                    >
                      <Facebook className="h-5 w-5 text-blue-500" />
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
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/25">
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
                          className="bg-white/5 dark:bg-black/10 border-white/10 h-14 pl-4 text-base rounded-xl focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                        />
                      </div>
                      <div className="relative group">
                        <Input
                          type="email"
                          placeholder="Your Email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          className="bg-white/5 dark:bg-black/10 border-white/10 h-14 pl-4 text-base rounded-xl focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                        />
                      </div>
                      <div className="relative group">
                        <Textarea
                          placeholder="Tell me about your project..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          required
                          rows={5}
                          className="bg-white/5 dark:bg-black/10 border-white/10 p-4 text-base rounded-xl resize-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                        />
                      </div>
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full h-14 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold text-base rounded-xl shadow-lg shadow-blue-500/25 disabled:opacity-70 transition-all hover:scale-[1.02] active:scale-[0.98]"
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
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-cyan-500/5 to-transparent pointer-events-none" />
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
                      className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30"
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
                        className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold px-8 h-12 shadow-lg shadow-blue-500/20"
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

      <footer className="py-8 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Tousif. All rights reserved.
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
