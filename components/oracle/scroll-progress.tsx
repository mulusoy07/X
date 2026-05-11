"use client"

import { useState, useEffect } from "react"
import { IconArrowUp, IconArrowDown } from "@tabler/icons-react"

export function ScrollProgress() {
  const [scrollPercent, setScrollPercent] = useState(0)
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setScrollPercent(Math.min(100, Math.max(0, percent)))
      setShowButton(scrollTop > 100)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" })
  }

  // SVG circle parameters
  const size = 48
  const strokeWidth = 3
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (scrollPercent / 100) * circumference

  return (
    <div
      className={`fixed right-3 bottom-20 lg:bottom-4 z-30 flex flex-col items-center gap-2 transition-all duration-300 ${
        showButton ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      {/* Scroll to Bottom */}
      <button
        onClick={scrollToBottom}
        className="w-10 h-10 rounded-xl bg-ink-800 border border-line text-cream-dim hover:text-gold-400 hover:border-gold-500/50 flex items-center justify-center transition-all"
        title="Aşağı git"
      >
        <IconArrowDown className="w-4 h-4" />
      </button>

      {/* Main Circular Progress Button */}
      <button
        onClick={scrollToTop}
        className="relative w-12 h-12 rounded-full bg-ink-800 border border-line hover:border-gold-500/50 flex items-center justify-center transition-all group"
        title={`%${Math.round(scrollPercent)} - Yukarı git`}
      >
        {/* SVG Progress Circle */}
        <svg
          className="absolute inset-0 -rotate-90"
          width={size}
          height={size}
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-ink-700"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="url(#progressGradient)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-150"
          />
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffd86b" />
              <stop offset="100%" stopColor="#c97e10" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Icon */}
        <IconArrowUp className="w-4 h-4 text-cream-dim group-hover:text-gold-400 transition-colors relative z-10" />
        
        {/* Percentage tooltip on hover */}
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-ink-800 border border-line text-[10px] text-cream font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          %{Math.round(scrollPercent)}
        </span>
      </button>
    </div>
  )
}
