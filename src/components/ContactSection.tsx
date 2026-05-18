"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Mail, Phone, MapPin, Send, Check, X, Instagram, Facebook, MessageCircle,
  DollarSign, Code, Globe, ShoppingCart, Shield, Server, Package, HelpCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import emailjs from "@emailjs/browser"

const EMAILJS_SERVICE_ID = "service_d2gjkb9"
const EMAILJS_TEMPLATE_ID = "template_e08qfnl"
const EMAILJS_PUBLIC_KEY = "n5vtuVWEKDKDgQ8qe"

export function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "", budget: "", interest: "" })
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [showModal, setShowModal] = useState(false)

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
                  <a href="https://wa.me/923286477314" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center hover:bg-green-500/20 hover:border-green-500/40 hover:scale-110 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-green-500">
                      <path d="M12.04 2C6.48 2 2 6.48 2 12.04c0 2.12.56 4.1 1.53 5.8L2 22l4.27-1.43c1.65.91 3.57 1.43 5.77 1.43 5.56 0 10.04-4.48 10.04-10.04C22.08 6.48 17.6 2 12.04 2zm5.7 14.32c-.23.66-1.33 1.27-1.92 1.35-.5.06-1.1.09-3.42-.86-3.1-1.3-5.09-5.25-5.25-5.46-.15-.21-1.3-1.8-1.3-3.44 0-1.64.87-2.44 1.17-2.77.3-.33.66-.41.88-.41.23 0 .45 0 .64.01.21.02.5-.08.78.57.28.64.94 2.22 1.02 2.38.08.16.12.34.03.54-.1.2-.15.32-.3.5-.15.18-.31.39-.44.53-.14.15-.28.32-.13.63.15.31.65 1.08 1.4 1.74.96.86 1.77 1.14 2.08 1.27.31.13.5.11.69-.07.19-.18.81-.94 1.01-1.26.2-.31.41-.26.68-.16.27.1 1.72.81 2.02.95.3.14.5.21.57.33.07.12.07.71-.16 1.37z" />
                    </svg>
                  </a>
                  <a href="https://www.instagram.com/tousifqasim/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center hover:bg-pink-500/20 hover:border-pink-500/40 hover:scale-110 transition-all">
                    <Instagram className="h-5 w-5 text-pink-500" />
                  </a>
                  <a href="https://www.facebook.com/imtousifqasim" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-emerald-600/10 border border-emerald-600/20 flex items-center justify-center hover:bg-emerald-600/20 hover:border-emerald-600/40 hover:scale-110 transition-all">
                    <Facebook className="h-5 w-5 text-emerald-600" />
                  </a>
                  <a href="https://www.tiktok.com/@itxtousifahmad" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-foreground/10 border border-foreground/20 flex items-center justify-center hover:bg-foreground/20 hover:border-foreground/40 hover:scale-110 transition-all">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
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
                    <Input
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="bg-white/5 dark:bg-black/10 border-white/10 h-14 pl-4 text-base rounded-xl focus:border-emerald-600/50 focus:ring-2 focus:ring-emerald-600/20 transition-all"
                    />
                    <Input
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="bg-white/5 dark:bg-black/10 border-white/10 h-14 pl-4 text-base rounded-xl focus:border-emerald-600/50 focus:ring-2 focus:ring-emerald-600/20 transition-all"
                    />

                    {/* Budget Range Select */}
                    <Select
                      value={formData.budget}
                      onValueChange={(val) => setFormData({ ...formData, budget: val })}
                    >
                      <SelectTrigger className="w-full h-14 text-base rounded-xl bg-white/5 dark:bg-black/10 border-white/10 focus:border-emerald-600/50 focus:ring-2 focus:ring-emerald-600/20 transition-all">
                        <SelectValue placeholder="Select Budget Range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="< $100">
                          <DollarSign className="h-4 w-4 text-emerald-600" />
                          &lt; $100
                        </SelectItem>
                        <SelectItem value="$100 - $300">
                          <DollarSign className="h-4 w-4 text-emerald-600" />
                          $100 - $300
                        </SelectItem>
                        <SelectItem value="$300 - $500">
                          <DollarSign className="h-4 w-4 text-emerald-600" />
                          $300 - $500
                        </SelectItem>
                        <SelectItem value="$500 - $1000">
                          <DollarSign className="h-4 w-4 text-emerald-600" />
                          $500 - $1,000
                        </SelectItem>
                        <SelectItem value="$1000+">
                          <DollarSign className="h-4 w-4 text-emerald-600" />
                          $1,000+
                        </SelectItem>
                        <SelectItem value="Not Sure">
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                          Not Sure
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Interest Select */}
                    <Select
                      value={formData.interest}
                      onValueChange={(val) => setFormData({ ...formData, interest: val })}
                    >
                      <SelectTrigger className="w-full h-14 text-base rounded-xl bg-white/5 dark:bg-black/10 border-white/10 focus:border-emerald-600/50 focus:ring-2 focus:ring-emerald-600/20 transition-all">
                        <SelectValue placeholder="What are you looking for?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="WordPress Development">
                          <Code className="h-4 w-4 text-emerald-600" />
                          WordPress Development
                        </SelectItem>
                        <SelectItem value="WHMCS Setup">
                          <Package className="h-4 w-4 text-emerald-600" />
                          WHMCS Setup
                        </SelectItem>
                        <SelectItem value="Shopify Development">
                          <ShoppingCart className="h-4 w-4 text-emerald-600" />
                          Shopify Development
                        </SelectItem>
                        <SelectItem value="Website Security">
                          <Shield className="h-4 w-4 text-emerald-600" />
                          Website Security / Recovery
                        </SelectItem>
                        <SelectItem value="Web Hosting">
                          <Server className="h-4 w-4 text-emerald-600" />
                          Web Hosting
                        </SelectItem>
                        <SelectItem value="Domain Reseller">
                          <Globe className="h-4 w-4 text-emerald-600" />
                          Domain Reseller Platform
                        </SelectItem>
                        <SelectItem value="Other">
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                          Other
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    <Textarea
                      placeholder="Tell me about your project..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={5}
                      className="bg-white/5 dark:bg-black/10 border-white/10 p-4 text-base rounded-xl resize-none focus:border-emerald-600/50 focus:ring-2 focus:ring-emerald-600/20 transition-all"
                    />
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

      {/* Success Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => { setShowModal(false); setFormStatus("idle") }}
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
                    onClick={() => { setShowModal(false); setFormStatus("idle") }}
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
                        onClick={() => { setShowModal(false); setFormStatus("idle") }}
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
    </section>
  )
}
