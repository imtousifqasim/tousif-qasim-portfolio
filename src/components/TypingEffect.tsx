"use client"

import { useState, useEffect } from "react"

const words = ["WordPress", "Shopify", "WHMCS", "Web Solutions"]

export function TypingEffect() {
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = words[wordIndex]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setCharIndex((prev) => prev + 1)
        if (charIndex === currentWord.length) {
          setTimeout(() => setIsDeleting(true), 1500)
        }
      } else {
        setCharIndex((prev) => prev - 1)
        if (charIndex === 0) {
          setIsDeleting(false)
          setWordIndex((prev) => (prev + 1) % words.length)
        }
      }
    }, isDeleting ? 50 : 100)

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, wordIndex])

  return (
    <span className="text-emerald-600">
      {words[wordIndex].substring(0, charIndex)}
      <span className="animate-pulse">|</span>
    </span>
  )
}
