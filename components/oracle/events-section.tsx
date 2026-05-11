"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  IconCalendar,
  IconClock,
  IconChevronLeft,
  IconChevronRight,
  IconSword,
  IconTrophy,
  IconGift,
  IconFlame,
} from "@tabler/icons-react"

interface Event {
  id: number
  title: string
  description: string
  type: "war" | "tournament" | "event" | "special"
  startTime: Date
  duration: number // in minutes
  day: string
  image?: string
}

const events: Event[] = [
  {
    id: 1,
    title: "Nation War",
    description: "Karus ve El Morad arasindaki buyuk savas! Ulken icin savas ve oduller kazan.",
    type: "war",
    startTime: new Date(Date.now() + 2 * 60 * 60 * 1000 + 44 * 60 * 1000 + 22 * 1000), // 2h 44m 22s from now
    duration: 60,
    day: "Pazartesi",
  },
  {
    id: 2,
    title: "Border Defense War",
    description: "Sinir savunma savasi. Bolgeyi koru ve odul kazan!",
    type: "war",
    startTime: new Date(Date.now() + 5 * 60 * 60 * 1000),
    duration: 45,
    day: "Pazartesi",
  },
  {
    id: 3,
    title: "Juraid Mountain",
    description: "Takim bazli PvP etkinligi. En iyi takim kazanir!",
    type: "tournament",
    startTime: new Date(Date.now() + 8 * 60 * 60 * 1000),
    duration: 30,
    day: "Sali",
  },
  {
    id: 4,
    title: "Chaos Event",
    description: "Kaotik savas alani! Herkes herkese karsi.",
    type: "special",
    startTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
    duration: 60,
    day: "Carsamba",
  },
]

const getEventIcon = (type: string) => {
  switch (type) {
    case "war": return <IconSword className="w-5 h-5" />
    case "tournament": return <IconTrophy className="w-5 h-5" />
    case "event": return <IconGift className="w-5 h-5" />
    case "special": return <IconFlame className="w-5 h-5" />
    default: return <IconCalendar className="w-5 h-5" />
  }
}

const getEventColor = (type: string) => {
  switch (type) {
    case "war": return "bg-rose-500/20 text-rose-400 border-rose-500/30"
    case "tournament": return "bg-amber-500/20 text-amber-400 border-amber-500/30"
    case "event": return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
    case "special": return "bg-violet-500/20 text-violet-400 border-violet-500/30"
    default: return "bg-ink-700 text-cream-dim border-line"
  }
}

function formatTimeRemaining(ms: number) {
  if (ms <= 0) return { hours: "00", minutes: "00", seconds: "00" }
  
  const totalSeconds = Math.floor(ms / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return {
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0'),
  }
}

export function EventsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState<{ [key: number]: number }>({})

  // Update countdown timers
  useEffect(() => {
    const updateTimers = () => {
      const now = Date.now()
      const newTimeRemaining: { [key: number]: number } = {}
      events.forEach((event) => {
        newTimeRemaining[event.id] = event.startTime.getTime() - now
      })
      setTimeRemaining(newTimeRemaining)
    }

    updateTimers()
    const interval = setInterval(updateTimers, 1000)
    return () => clearInterval(interval)
  }, [])

  const currentEvent = events[currentIndex]
  const time = formatTimeRemaining(timeRemaining[currentEvent?.id] || 0)
  const isStartingSoon = (timeRemaining[currentEvent?.id] || 0) < 60 * 60 * 1000 // Less than 1 hour

  const nextEvent = () => {
    setCurrentIndex((prev) => (prev + 1) % events.length)
  }

  const prevEvent = () => {
    setCurrentIndex((prev) => (prev === 0 ? events.length - 1 : prev - 1))
  }

  return (
    <div className="card rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-line">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400">
            <IconCalendar className="w-4 h-4" />
          </div>
          <h3 className="font-semibold text-cream">Etkinlikler</h3>
        </div>
        <Link href="/etkinlikler" className="text-xs text-gold-400 hover:text-gold-300 flex items-center gap-1">
          Tumunu Gor <span>→</span>
        </Link>
      </div>

      {/* Event Card */}
      <div className="p-4">
        <div className="relative rounded-xl overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-ink-800 to-ink-900 placeholder-img opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/80 to-transparent" />

          {/* Content */}
          <div className="relative p-4">
            {/* Status Badge */}
            <div className="flex items-center justify-between mb-4">
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold ${getEventColor(currentEvent.type)}`}>
                {getEventIcon(currentEvent.type)}
                <span>{time.hours}:{time.minutes}:{time.seconds}</span>
              </div>
              {isStartingSoon && (
                <span className="px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/30 animate-pulse">
                  Yakinda Basliyor
                </span>
              )}
            </div>

            {/* Event Info */}
            <h4 className="font-display text-xl font-bold text-cream mb-2">{currentEvent.title}</h4>
            <p className="text-sm text-cream-dim leading-relaxed mb-4">{currentEvent.description}</p>

            {/* Meta */}
            <div className="flex items-center gap-4 text-xs text-cream-dim">
              <span className="flex items-center gap-1.5">
                <IconCalendar className="w-3.5 h-3.5" />
                {currentEvent.day}
              </span>
              <span className="flex items-center gap-1.5">
                <IconClock className="w-3.5 h-3.5" />
                {currentEvent.startTime.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" })}
              </span>
              <span className="text-cream-dim/50">•</span>
              <span>{currentEvent.duration} dk</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <button
              onClick={prevEvent}
              className="w-8 h-8 rounded-lg bg-ink-800 border border-line flex items-center justify-center text-cream-dim hover:text-cream hover:border-gold-500/30 transition-all"
            >
              <IconChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextEvent}
              className="w-8 h-8 rounded-lg bg-ink-800 border border-line flex items-center justify-center text-cream-dim hover:text-cream hover:border-gold-500/30 transition-all"
            >
              <IconChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Dots */}
          <div className="flex items-center gap-1.5">
            {events.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all ${
                  index === currentIndex
                    ? "w-5 h-1.5 bg-gold-400 rounded-full"
                    : "w-1.5 h-1.5 bg-cream-dim/30 hover:bg-cream-dim/50 rounded-full"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
