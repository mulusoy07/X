"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { IconStar, IconDownload, IconChevronLeft, IconChevronRight } from "@tabler/icons-react"

interface Slide {
  id: number
  badge: string
  title: string
  subtitle: string
  description: string
  cta: string
  image: string
}

const slides: Slide[] = [
  {
    id: 1,
    badge: "Bir Efsanenin Donusu",
    title: "Yeni Bir Cag",
    subtitle: "Basliyor",
    description: "Gecmiste adini efsaneler arasina yazdiran OracleGamer, ara verdigi yillarin ardindan daha guclu bir altyapi ve daha buyuk savaslar ile yeniden sahneye cikiyor.",
    cta: "Kehanete Katil!",
    image: "/slides/slide1.jpg",
  },
  {
    id: 2,
    badge: "64-bit Altyapi",
    title: "Guclu Performans",
    subtitle: "Akici Deneyim",
    description: "Yeni nesil 64-bit client altyapimiz ile daha stabil, daha hizli ve daha akici bir oyun deneyimi yasayin. Artik takılmalar ve gecikmeler tarih oluyor.",
    cta: "Simdi Indir!",
    image: "/slides/slide2.jpg",
  },
]

const tickerMessages = [
  "Adil oyun, guclu altyapi, buyuk savaslar OracleGamer'da seni bekliyor.",
  "OracleGamer topluluguna katil, efsanenin bir parcasi ol ve kehaneti birlikte tamamlayalim!",
  "OracleGamer 64-bit client ile yeniden dogdu! Daha stabil, daha guclu bir PvP deneyimi seni bekliyor.",
  "Guncel etkinlikler ve oduller icin duyurulari takip etmeyi unutma! Surprizler yolda.",
]

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentSlide(index)
    setTimeout(() => setIsTransitioning(false), 500)
  }, [isTransitioning])

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % slides.length)
  }, [currentSlide, goToSlide])

  const prevSlide = useCallback(() => {
    goToSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1)
  }, [currentSlide, goToSlide])

  // Auto-play
  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      if (!isHovering) {
        nextSlide()
      }
    }, 6000)

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [isHovering, nextSlide])

  // Mouse parallax effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setMousePosition({ x: x * 30, y: y * 30 })
  }

  return (
    <section 
      ref={containerRef}
      className="relative bg-hero overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false)
        setMousePosition({ x: 0, y: 0 })
      }}
    >
      {/* Background with parallax effect */}
      <div 
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px) scale(1.1)`,
        }}
      >
        {/* Animated background shapes */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gold-500/20 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-violet-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-400/10 rounded-full blur-[150px]" />
        </div>

        {/* Character grid */}
        <div className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none">
          <div className="grid grid-cols-7 gap-6 px-12 w-full max-w-[1500px]">
            {[...Array(7)].map((_, i) => (
              <div 
                key={i}
                className="aspect-[2/3] rounded-2xl placeholder-img"
                style={{ 
                  transform: `translateY(${i % 2 === 0 ? '0' : '24'}px)`,
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Slides */}
      <div className="relative mx-auto max-w-[1500px] px-6 pt-24 pb-28">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`text-center transition-all duration-500 ${
              index === currentSlide
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8 absolute inset-0 pointer-events-none"
            }`}
          >
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full gold-btn text-sm font-semibold"
              style={{
                transform: `translateY(${index === currentSlide ? 0 : -20}px)`,
                transition: "transform 0.5s ease-out 0.1s",
              }}
            >
              <IconStar className="w-4 h-4" />
              {slide.badge}
            </div>

            <h1 
              className="font-display text-6xl md:text-7xl lg:text-8xl font-extrabold mt-8 text-gold-400 drop-shadow-[0_4px_24px_rgba(245,184,54,0.35)]"
              style={{
                transform: `translateX(${index === currentSlide ? mousePosition.x * 0.3 : 0}px) translateY(${index === currentSlide ? mousePosition.y * 0.3 : 20}px)`,
                transition: index === currentSlide ? "transform 0.3s ease-out" : "transform 0.5s ease-out, opacity 0.5s ease-out",
              }}
            >
              {slide.title}
              <br />
              <span className="text-cream">{slide.subtitle}</span>
            </h1>
            
            <div className="mx-auto mt-4 divider-gold" />

            <p 
              className="mx-auto max-w-2xl mt-8 text-cream-dim text-lg leading-relaxed"
              style={{
                transform: `translateY(${index === currentSlide ? 0 : 20}px)`,
                transition: "transform 0.5s ease-out 0.2s, opacity 0.5s ease-out 0.2s",
              }}
            >
              {slide.description}
            </p>

            <button 
              className="gold-btn mt-10 inline-flex items-center gap-2 px-8 py-4 rounded-md text-lg font-bold hover:scale-105 transition-transform"
              style={{
                transform: `translateY(${index === currentSlide ? 0 : 20}px)`,
                transition: "transform 0.5s ease-out 0.3s",
              }}
            >
              <IconDownload className="w-5 h-5" />
              {slide.cta}
            </button>
          </div>
        ))}

        {/* Slide Navigation */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
          {/* Prev Button */}
          <button
            onClick={prevSlide}
            className="w-10 h-10 rounded-full bg-ink-800/80 border border-gold-500/30 flex items-center justify-center text-cream-dim hover:text-gold-400 hover:border-gold-500 transition-all hover:scale-110"
          >
            <IconChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 ${
                  index === currentSlide
                    ? "w-8 h-2 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full"
                    : "w-2 h-2 bg-cream-dim/30 hover:bg-cream-dim/50 rounded-full"
                }`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="w-10 h-10 rounded-full bg-ink-800/80 border border-gold-500/30 flex items-center justify-center text-cream-dim hover:text-gold-400 hover:border-gold-500 transition-all hover:scale-110"
          >
            <IconChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Slide Counter */}
        <div className="absolute bottom-8 right-8 hidden md:flex items-center gap-2 text-sm font-mono">
          <span className="text-gold-400 font-bold">{String(currentSlide + 1).padStart(2, '0')}</span>
          <span className="text-cream-dim/40">/</span>
          <span className="text-cream-dim">{String(slides.length).padStart(2, '0')}</span>
        </div>
      </div>

      {/* News Ticker */}
      <div className="relative border-y border-line bg-ink-950/60">
        <div className="ticker overflow-hidden">
          <div className="ticker-track flex gap-12 py-3 text-sm whitespace-nowrap text-cream-dim">
            {[...tickerMessages, ...tickerMessages].map((msg, i) => (
              <span key={i} className="flex items-center gap-3">
                <span className="text-gold-400 font-bold">#</span> {msg}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
