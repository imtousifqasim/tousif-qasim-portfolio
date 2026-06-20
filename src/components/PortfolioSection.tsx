"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, X, Lock, ArrowUpRight, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/SectionHeader"

const projects = [
  {
    type: "Hotel Booking",
    title: "Viola Hotel Suites",
    url: "https://viola-hotel.com",
    image: "https://res.cloudinary.com/dy3l9ls1n/image/upload/q_auto/f_auto/v1781940599/Viola_Hotel_ydhxfr.png",
    tags: ["WordPress", "Elementor", "Custom CSS", "Booking Integration"],
    shortDesc: "A luxury hotel website in Amman, Jordan with direct booking system and responsive room showcase.",
    overview: "Viola Hotel Suites needed a professional online presence to drive direct bookings and reduce OTA dependency. Built on WordPress + Elementor with a clean, modern UI, the site features a fully responsive room showcase, direct reservation system, and gallery section.",
    challenge: "The primary challenge was creating a seamless mobile experience with viewport-fit-cover for iOS devices while maintaining a luxury aesthetic. The booking flow needed to be intuitive enough to convert visitors without overwhelming them with options, all while competing with polished OTA interfaces users were accustomed to.",
    result: "Custom viewport-fit cover meta was implemented for flawless mobile experience. The result is a high-converting hotel website with luxury aesthetic and fast load times. Direct bookings increased significantly by reducing friction in the reservation flow.",
  },
  {
    type: "Vacation Rental",
    title: "Mykonos Heritage Apartments",
    url: "https://mykonosheritage.com",
    image: "https://res.cloudinary.com/dy3l9ls1n/image/upload/q_auto/f_auto/v1781940603/Mykonos_Heritage_Apartments_bd3hb6.png",
    tags: ["WordPress", "Elementor", "Social Media Integration", "Responsive Design"],
    shortDesc: "A boutique Greek island rental property website capturing the essence of Mykonos with elegant typography.",
    overview: "A boutique Greek island rental property required a visually stunning website to attract international tourists. The design captures the essence of Mykonos — whitewashed aesthetics, elegant typography, and vibrant property imagery.",
    challenge: "The challenge was translating the physical charm of Mykonos — its whitewashed buildings, blue domes, and Aegean light — into a digital experience that felt equally immersive. Social proof through Instagram and TikTok needed to be woven in naturally without cluttering the design.",
    result: "Social integrations (Instagram + TikTok) were embedded for real-time visual content. Mobile-first approach ensured seamless UX for travelers browsing on phones. The site successfully captures the brand's luxury vacation feel and drives direct inquiries.",
  },
  {
    type: "Cabin Rental + Hostaway",
    title: "Peak Adventure Getaways",
    url: "https://peakadventuregetaways.com",
    image: "https://res.cloudinary.com/dy3l9ls1n/image/upload/q_auto/f_auto/v1781940604/Peak_Adventure_Getaways_w5etqs.png",
    tags: ["WordPress", "Elementor", "Hostaway API", "SEO Optimization", "OG Meta"],
    shortDesc: "A dual-location cabin rental website with Hostaway booking integration for Arkansas and Oklahoma.",
    overview: "This client needed a dual-location cabin rental website with Hostaway booking system integration. The site was built with SEO-optimized property descriptions for Bella Vista, AR and Broken Bow, OK.",
    challenge: "The dual-location setup required distinct SEO strategies for each market while maintaining a unified brand. Hostaway API integration needed to sync real-time availability and pricing across multiple cabin listings without latency or data mismatch.",
    result: "Google Site Verification and OG meta tags were configured for search visibility. The adventure-themed design with mountain imagery and hot tub property highlights drives high booking intent. Both locations rank well for their respective markets.",
  },
  {
    type: "Surf & Stay",
    title: "Taghazout Life Surf House",
    url: "https://taghazoutlife.com",
    image: "https://res.cloudinary.com/dy3l9ls1n/image/upload/q_auto/f_auto/v1781940596/Taghazout_Life_Surf_House_kgmsfm.png",
    tags: ["WordPress", "WPBakery", "OG/Social Meta", "Lifestyle Photography"],
    shortDesc: "A vibrant lifestyle-driven website for a Moroccan surf house to attract global surfers and yoga enthusiasts.",
    overview: "A surf house in Morocco needed a vibrant, lifestyle-driven website to attract global surfers and yoga enthusiasts. Built with WPBakery, the site features stunning ocean photography, surf and yoga package listings, and multilingual-ready architecture.",
    challenge: "The site needed to appeal to an international audience across multiple languages while loading quickly on mobile devices common among travelers. OG image optimization was critical for social sharing on Instagram and Facebook where most traffic originates.",
    result: "OG image optimization and structured meta descriptions were implemented to boost social sharing and organic reach from international markets. The lifestyle photography-first approach creates an emotional connection that drives bookings from surf and yoga communities worldwide.",
  },
  {
    type: "STR Management + API",
    title: "Elite Host Rentals",
    url: "https://elitehostrentals.com",
    image: "https://res.cloudinary.com/dy3l9ls1n/image/upload/q_auto/f_auto/v1781940603/Elite_Host_Rentals_w17xad.png",
    tags: ["WordPress", "Elementor", "API Integration", "Dynamic Pricing", "Multi-channel Listing"],
    shortDesc: "A full-service short-term rental management platform with multi-channel API integration.",
    overview: "Elite Host Rentals is a full-service short-term rental management company. This project involved API integration work — connecting Airbnb, VRBO, Booking.com, and Google listing feeds with dynamic pricing automation.",
    challenge: "The core challenge was synchronizing availability, pricing, and bookings across four major OTA platforms in real-time while preventing double bookings. The dynamic pricing engine needed to factor in local events, seasonal demand, and competitor rates automatically.",
    result: "The website communicates their full service offering: custom listings, 24/7 guest messaging, and revenue management. Clean corporate design with clear CTAs drives landlord leads effectively. API integrations operate reliably with automated conflict resolution.",
  },
  {
    type: "Direct Booking Hotel",
    title: "AnyRoomDirect",
    url: "https://anyroomdirect.de",
    image: "https://res.cloudinary.com/dy3l9ls1n/image/upload/q_auto/f_auto/v1781940606/AnyRoomDirect_yyhrxa.png",
    tags: ["WordPress", "Elementor", "Booking System", "SEO", "OG Meta", "German Market"],
    shortDesc: "A German direct booking hotel website helping accommodations bypass OTA commissions.",
    overview: "A German accommodation provider wanted to bypass OTA commissions with a direct booking website. The site was built with warm, welcoming aesthetics targeting long-stay and comfort-focused guests.",
    challenge: "The German market has unique privacy requirements (DSGVO) and user expectations around data handling. The site needed to build enough trust to convince travelers to book direct instead of using familiar OTAs like Booking.com. Multilingual readiness was also essential.",
    result: "Custom Elementor layouts, 24/7 support messaging, and structured OG metadata were implemented. Google verification and multilingual-ready content structure make it competitive in the European market. Direct booking conversions have steadily increased since launch.",
  },
]

const getScreenshotUrl = (url: string) =>
  `https://image.thum.io/get/width/1280/crop/900/viewportWidth/1280/png/${url}`

export function PortfolioSection() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [isModalOpen])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        closeModal()
      }
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [isModalOpen])

  const openModal = (project: typeof projects[0]) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedProject(null), 300)
  }

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      closeModal()
    }
  }

  return (
    <>
      <section id="portfolio" className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/[0.03] rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-[#00674b]/[0.03] rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Client Work"
            title="Featured"
            highlighted="Projects"
            description="WordPress and web solutions for hotels, vacation rentals, and hospitality brands worldwide."
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
                <div className="rounded-[2rem] overflow-hidden border border-white/10 dark:border-white/5 bg-white/[0.02] dark:bg-black/[0.02] backdrop-blur-xl transition-all duration-500 h-full flex flex-col hover:border-[#00674b]/40 hover:shadow-[0_20px_40px_rgba(0,103,75,0.1)] hover:-translate-y-1">
                  <div className="relative">
                    <div className="bg-muted/30 px-4 py-2.5 flex items-center gap-2 border-b border-white/5">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                      </div>
                      <div className="flex-1 mx-3">
                        <div className="bg-background/50 rounded-md px-3 py-1 flex items-center gap-2 text-[11px] text-muted-foreground">
                          <Lock className="w-3 h-3" />
                          <span className="truncate">{project.url.replace("https://", "")}</span>
                        </div>
                      </div>
                    </div>

                    <div className="relative overflow-hidden aspect-[4/3]">
                      <div
                        className="absolute inset-0 bg-cover bg-top bg-no-repeat transition-[background-position] duration-[6s] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:bg-bottom"
                        style={{ backgroundImage: `url(${project.image || getScreenshotUrl(project.url)})` }}
                      />

                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 transition-all duration-300 group-hover:opacity-0 group-hover:translate-y-2 pointer-events-none">
                        <span className="text-[10px] font-medium text-muted-foreground bg-background/50 backdrop-blur-sm px-3 py-1 rounded-full border border-white/5">
                          ↓ Hover to scroll
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <span className="text-[#00674b] font-bold text-[10px] uppercase tracking-[0.2em] mb-2">
                      {project.type}
                    </span>
                    <h3 className="text-xl font-black text-foreground mb-2 leading-tight group-hover:text-[#00674b] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                      {project.shortDesc}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest rounded-full bg-[#00674b]/10 text-[#00674b] border border-[#00674b]/20"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest rounded-full bg-white/5 text-muted-foreground border border-white/10">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>
                    <div className="mt-auto flex gap-2.5">
                      <Button
                        size="sm"
                        className="flex-1 bg-[#00674b] hover:bg-[#00523b] text-white font-bold text-xs h-10 rounded-xl transition-all"
                        onClick={() => openModal(project)}
                      >
                        Case Study
                        <ChevronRight className="ml-1.5 h-3.5 w-3.5" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-white/10 text-muted-foreground hover:text-foreground hover:border-[#00674b]/50 hover:bg-[#00674b]/5 font-bold text-xs h-10 rounded-xl transition-all"
                        asChild
                      >
                        <a href={project.url} target="_blank" rel="noopener noreferrer">
                          Live Preview
                          <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
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
              className="rounded-2xl px-10 h-14 font-bold border-[#00674b]/20 text-[#00674b] hover:border-[#00674b]/50 hover:bg-[#00674b]/5 transition-all"
              asChild
            >
              <a href="https://wa.me/923286477314" target="_blank" rel="noopener noreferrer">
                Start Your Project
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto py-10 px-4 backdrop-blur-xl bg-black/80"
            onClick={handleOverlayClick}
          >
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, y: 60, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 60, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-3xl bg-background border border-white/10 dark:border-white/5 rounded-[2rem] overflow-hidden shadow-2xl relative my-auto"
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-background/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="relative">
                <div className="absolute top-0 left-0 right-0 z-10 px-4 py-2.5 flex items-center gap-2 bg-gradient-to-b from-black/40 to-transparent">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500/70" />
                    <span className="w-2 h-2 rounded-full bg-yellow-500/70" />
                    <span className="w-2 h-2 rounded-full bg-green-500/70" />
                  </div>
                  <div className="flex-1 mx-2">
                    <div className="bg-black/30 backdrop-blur-sm rounded-md px-2.5 py-1 flex items-center gap-1.5 text-[10px] text-white/50">
                      <Lock className="w-2.5 h-2.5" />
                      <span className="truncate">{selectedProject.url.replace("https://", "")}</span>
                    </div>
                  </div>
                </div>
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={selectedProject.image || getScreenshotUrl(selectedProject.url)}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-8">
                <div>
                  <p className="text-[#00674b] font-bold text-[11px] uppercase tracking-[0.2em] mb-2">
                    {selectedProject.type}
                  </p>
                  <h2 className="text-3xl sm:text-4xl font-black text-foreground">
                    {selectedProject.title}
                  </h2>
                  <a
                    href={selectedProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-[#00674b] text-sm mt-2 transition-colors"
                  >
                    {selectedProject.url}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-foreground font-bold text-sm uppercase tracking-widest mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00674b]" />
                      Project Overview
                    </h3>
                    <p className="text-muted-foreground text-base leading-relaxed">
                      {selectedProject.overview}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-foreground font-bold text-sm uppercase tracking-widest mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00674b]" />
                      Challenges & Solutions
                    </h3>
                    <p className="text-muted-foreground text-base leading-relaxed">
                      {selectedProject.challenge}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-foreground font-bold text-sm uppercase tracking-widest mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00674b]" />
                      Results & Outcome
                    </h3>
                    <p className="text-muted-foreground text-base leading-relaxed">
                      {selectedProject.result}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-full bg-[#00674b]/10 text-[#00674b] border border-[#00674b]/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-2">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-[#00674b] hover:bg-[#00523b] text-white font-bold h-12 px-8 rounded-xl transition-all shadow-lg shadow-[#00674b]/20"
                    asChild
                  >
                    <a href={selectedProject.url} target="_blank" rel="noopener noreferrer">
                      Live Preview
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
