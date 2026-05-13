"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  IconCalendar,
  IconClock,
  IconChevronLeft,
  IconChevronRight,
  IconArrowRight,
  IconBolt,
  IconShield,
  IconTrophy,
  IconStar,
  IconBell,
  IconSword,
  IconGift,
  IconFlame,
} from "@tabler/icons-react"
import { cn } from "@/lib/utils"

/* ============================================================
   DATA
   ============================================================ */

export type EventType = "war" | "tournament" | "event" | "special"

export interface GameEvent {
  id: number
  title: string
  description: string
  type: EventType
  offsetSec: number
  duration: number
  day: string
}

export const events: GameEvent[] = [
  {
    id: 1,
    title: "Nation War",
    description: "Karus ve El Morad arasindaki buyuk savas. Ulken icin savas ve oduller kazan.",
    type: "war",
    offsetSec: 2 * 3600 + 44 * 60 + 22,
    duration: 60,
    day: "Pazartesi",
  },
  {
    id: 2,
    title: "Border Defense War",
    description: "Sinir savunma savasi. Bolgeyi koru ve odul kazan.",
    type: "war",
    offsetSec: 5 * 3600,
    duration: 45,
    day: "Pazartesi",
  },
  {
    id: 3,
    title: "Juraid Mountain",
    description: "Takim bazli PvP etkinligi. En iyi takim kazanir.",
    type: "tournament",
    offsetSec: 8 * 3600,
    duration: 30,
    day: "Sali",
  },
  {
    id: 4,
    title: "Chaos Event",
    description: "Kaotik savas alani. Herkes herkese karsi.",
    type: "special",
    offsetSec: 24 * 3600,
    duration: 60,
    day: "Carsamba",
  },
  {
    id: 5,
    title: "Daily Reward",
    description: "Gunluk giris odullerini topla, sirini kaybetme.",
    type: "event",
    offsetSec: 12 * 3600,
    duration: 15,
    day: "Hergun",
  },
]

export const typeMeta: Record<
  EventType,
  { label: string; chip: string; ring: string; glow: string; accent: string }
> = {
  war: {
    label: "Savas",
    chip: "bg-rose-500/15 text-rose-300 border-rose-500/30",
    ring: "ring-rose-500/30",
    glow: "from-rose-500/30 via-rose-500/5 to-transparent",
    accent: "text-rose-300",
  },
  tournament: {
    label: "Turnuva",
    chip: "bg-gold-500/15 text-gold-300 border-gold-500/35",
    ring: "ring-gold-500/35",
    glow: "from-gold-500/30 via-gold-500/5 to-transparent",
    accent: "text-gold-300",
  },
  event: {
    label: "Etkinlik",
    chip: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    ring: "ring-emerald-500/30",
    glow: "from-emerald-500/25 via-emerald-500/5 to-transparent",
    accent: "text-emerald-300",
  },
  special: {
    label: "Ozel",
    chip: "bg-violet-500/15 text-violet-300 border-violet-500/30",
    ring: "ring-violet-500/30",
    glow: "from-violet-500/25 via-violet-500/5 to-transparent",
    accent: "text-violet-300",
  },
}

export function fmtTime(ms: number) {
  if (ms <= 0) return { h: "00", m: "00", s: "00", total: 0 }
  const t = Math.floor(ms / 1000)
  return {
    h: String(Math.floor(t / 3600)).padStart(2, "0"),
    m: String(Math.floor((t % 3600) / 60)).padStart(2, "0"),
    s: String(t % 60).padStart(2, "0"),
    total: t,
  }
}

export function useCountdowns(items: { id: number; offsetSec: number }[]) {
  const [now, setNow] = useState<number | null>(null)
  const [base] = useState(() => Date.now())
  useEffect(() => {
    setNow(Date.now())
    const i = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(i)
  }, [])
  const map: Record<number, number> = {}
  const ref = now ?? base
  for (const it of items) {
    map[it.id] = base + it.offsetSec * 1000 - ref
  }
  return map
}

export const eventIcon: Record<EventType, any> = {
  war: IconShield,
  tournament: IconTrophy,
  event: IconCalendar,
  special: IconStar,
}

/* ============================================================
   ORIJINAL — Production Copy
   ============================================================ */

interface OriginalEvent {
  id: number
  title: string
  description: string
  type: "war" | "tournament" | "event" | "special"
  startTime: Date
  duration: number
  day: string
  image?: string
}

const originalEvents: OriginalEvent[] = [
  {
    id: 1,
    title: "Nation War",
    description: "Karus ve El Morad arasindaki buyuk savas! Ulken icin savas ve oduller kazan.",
    type: "war",
    startTime: new Date(Date.now() + 2 * 60 * 60 * 1000 + 44 * 60 * 1000 + 22 * 1000),
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

const getOriginalEventIcon = (type: string) => {
  switch (type) {
    case "war": return <IconSword className="w-5 h-5" />
    case "tournament": return <IconTrophy className="w-5 h-5" />
    case "event": return <IconGift className="w-5 h-5" />
    case "special": return <IconFlame className="w-5 h-5" />
    default: return <IconCalendar className="w-5 h-5" />
  }
}

const getOriginalEventColor = (type: string) => {
  switch (type) {
    case "war": return "bg-rose-500/20 text-rose-400 border-rose-500/30"
    case "tournament": return "bg-amber-500/20 text-amber-400 border-amber-500/30"
    case "event": return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
    case "special": return "bg-violet-500/20 text-violet-400 border-violet-500/30"
    default: return "bg-ink-700 text-cream-dim border-line"
  }
}

function formatOriginalTimeRemaining(ms: number) {
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

export function EventsOrijinal() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState<{ [key: number]: number }>({})

  useEffect(() => {
    const updateTimers = () => {
      const now = Date.now()
      const newTimeRemaining: { [key: number]: number } = {}
      originalEvents.forEach((event) => {
        newTimeRemaining[event.id] = event.startTime.getTime() - now
      })
      setTimeRemaining(newTimeRemaining)
    }
    updateTimers()
    const interval = setInterval(updateTimers, 1000)
    return () => clearInterval(interval)
  }, [])

  const currentEvent = originalEvents[currentIndex]
  const time = formatOriginalTimeRemaining(timeRemaining[currentEvent?.id] || 0)
  const isStartingSoon = (timeRemaining[currentEvent?.id] || 0) < 60 * 60 * 1000

  const nextEvent = () => setCurrentIndex((prev) => (prev + 1) % originalEvents.length)
  const prevEvent = () => setCurrentIndex((prev) => (prev === 0 ? originalEvents.length - 1 : prev - 1))

  return (
    <div className="card rounded-xl overflow-hidden h-full flex flex-col">
      <div className="section-header">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400">
            <IconCalendar className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-cream">Etkinlikler</h3>
            <p className="text-xs text-cream-dim">Yaklaşan etkinlikler</p>
          </div>
        </div>
        <Link href="/etkinlikler" className="text-xs text-gold-400 hover:text-gold-300 flex items-center gap-1">
          Tumunu Gor <IconChevronRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <div className="relative rounded-xl overflow-hidden flex-1 min-h-[200px]">
          <div className="absolute inset-0 bg-gradient-to-br from-ink-800 to-ink-900 placeholder-img opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/80 to-transparent" />

          <div className="relative p-4">
            <div className="flex items-center justify-between mb-4">
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold ${getOriginalEventColor(currentEvent.type)}`}>
                {getOriginalEventIcon(currentEvent.type)}
                <span>{time.hours}:{time.minutes}:{time.seconds}</span>
              </div>
              {isStartingSoon && (
                <span className="px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/30 animate-pulse">
                  Yakinda Basliyor
                </span>
              )}
            </div>

            <h4 className="font-display text-xl font-bold text-cream mb-2">{currentEvent.title}</h4>
            <p className="text-sm text-cream-dim leading-relaxed mb-4">{currentEvent.description}</p>

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

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <button onClick={prevEvent} className="w-8 h-8 rounded-lg bg-ink-800 border border-line flex items-center justify-center text-cream-dim hover:text-cream hover:border-gold-500/30 transition-all">
              <IconChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={nextEvent} className="w-8 h-8 rounded-lg bg-ink-800 border border-line flex items-center justify-center text-cream-dim hover:text-cream hover:border-gold-500/30 transition-all">
              <IconChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            {originalEvents.map((_, index) => (
              <button key={index} onClick={() => setCurrentIndex(index)} className={`transition-all ${index === currentIndex ? "w-5 h-1.5 bg-gold-400 rounded-full" : "w-1.5 h-1.5 bg-cream-dim/30 hover:bg-cream-dim/50 rounded-full"}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ============================================================
   EVENTS MAIN (ANA)
   ============================================================ */

export function EventsMain() {
  const [i, setI] = useState(0)
  const remaining = useCountdowns(events)
  const ev = events[i]
  const meta = typeMeta[ev.type]
  const Icon = eventIcon[ev.type]
  const t = fmtTime(remaining[ev.id] ?? ev.offsetSec * 1000)
  const soon = (remaining[ev.id] ?? Infinity) < 60 * 60 * 1000

  const window = 24 * 3600 * 1000
  const ms = remaining[ev.id] ?? ev.offsetSec * 1000
  const progress = Math.max(0, Math.min(100, ((window - ms) / window) * 100))

  const next = () => setI((p) => (p + 1) % events.length)
  const prev = () => setI((p) => (p === 0 ? events.length - 1 : p - 1))

  return (
    <section className="rounded-2xl border border-line bg-ink-850 overflow-hidden">
      <div className="section-header">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400">
            <IconCalendar className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-cream">Etkinlikler</h3>
            <p className="text-xs text-cream-dim">Yaklasan etkinlikler</p>
          </div>
        </div>
        <a href="#" className="text-xs text-gold-400 hover:text-gold-300 flex items-center gap-1">
          Tumunu Gor <IconArrowRight className="w-3 h-3" />
        </a>
      </div>

      <div className="relative px-5">
        <div className="relative rounded-xl border border-line bg-ink-900 overflow-hidden">
          <div className={cn("absolute -top-20 -right-20 w-72 h-72 rounded-full blur-3xl opacity-60 bg-gradient-radial bg-gradient-to-br", meta.glow)} aria-hidden />
          <div className="relative p-5">
            <div className="flex items-center justify-between gap-3 mb-4">
              <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-bold tracking-wide", meta.chip)}>
                <Icon className="w-3.5 h-3.5" />
                {meta.label.toUpperCase()}
              </span>
              {soon && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-rose-300 bg-rose-500/15 border border-rose-500/30 rounded-full px-2 py-0.5">
                  <IconBolt className="w-3 h-3" /> Yakinda
                </span>
              )}
            </div>
            <h4 className="font-display font-extrabold text-2xl text-cream leading-tight">{ev.title}</h4>
            <p className="text-sm text-cream-dim mt-1.5 leading-relaxed line-clamp-2">{ev.description}</p>

            <div className="mt-5 grid grid-cols-3 gap-2">
              {[
                { v: t.h, l: "Saat" },
                { v: t.m, l: "Dakika" },
                { v: t.s, l: "Saniye" },
              ].map((u) => (
                <div key={u.l} className="rounded-lg bg-ink-850 border border-line py-2.5 text-center">
                  <div className="font-mono text-2xl font-bold text-gold-400 leading-none tabular-nums">{u.v}</div>
                  <div className="text-[10px] uppercase tracking-wider text-muted mt-1.5">{u.l}</div>
                </div>
              ))}
            </div>

            <div className="mt-4 h-1 rounded-full bg-ink-700 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-gold-500 to-gold-300 transition-all" style={{ width: `${progress}%` }} />
            </div>

            <div className="mt-4 flex items-center gap-3 text-[11px] text-cream-dim">
              <span className="inline-flex items-center gap-1"><IconCalendar className="w-3.5 h-3.5" /> {ev.day}</span>
              <span className="inline-flex items-center gap-1"><IconClock className="w-3.5 h-3.5" /> {ev.duration} dk</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between px-5 py-4">
        <div className="flex gap-2">
          <button onClick={prev} className="w-8 h-8 grid place-items-center rounded-md border border-line bg-ink-900 text-cream-dim hover:text-cream hover:border-gold-500/40 transition" aria-label="Onceki">
            <IconChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={next} className="w-8 h-8 grid place-items-center rounded-md border border-line bg-ink-900 text-cream-dim hover:text-cream hover:border-gold-500/40 transition" aria-label="Sonraki">
            <IconChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center gap-1.5">
          {events.map((_, idx) => (
            <button key={idx} onClick={() => setI(idx)} aria-label={`Slayt ${idx + 1}`} className={cn("transition-all rounded-full", idx === i ? "w-5 h-1.5 bg-gold-400" : "w-1.5 h-1.5 bg-cream-dim/30 hover:bg-cream-dim/50")} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   EVENTS V1 — Split
   ============================================================ */

export function EventsV1Split() {
  const [i, setI] = useState(0)
  const remaining = useCountdowns(events)
  const ev = events[i]
  const meta = typeMeta[ev.type]
  const Icon = eventIcon[ev.type]
  const t = fmtTime(remaining[ev.id] ?? ev.offsetSec * 1000)

  return (
    <section className="rounded-2xl border border-line bg-ink-850 overflow-hidden">
      <div className="section-header">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400">
            <IconCalendar className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-cream">Etkinlikler</h3>
            <p className="text-xs text-cream-dim">Yaklasan etkinlikler</p>
          </div>
        </div>
        <a href="#" className="text-xs text-gold-400 hover:text-gold-300 flex items-center gap-1">
          Tumunu Gor <IconArrowRight className="w-3 h-3" />
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr]">
        <ul className="border-r border-line max-h-[360px] overflow-y-auto">
          {events.map((e, idx) => {
            const m = typeMeta[e.type]
            const I = eventIcon[e.type]
            const tm = fmtTime(remaining[e.id] ?? e.offsetSec * 1000)
            const active = idx === i
            return (
              <li key={e.id}>
                <button
                  onClick={() => setI(idx)}
                  onMouseEnter={() => setI(idx)}
                  className={cn(
                    "w-full text-left px-4 py-3 border-b border-line/70 transition-colors flex items-start gap-2.5",
                    active
                      ? "bg-ink-900"
                      : "hover:bg-ink-900/60",
                  )}
                >
                  <span className={cn("mt-0.5 w-7 h-7 grid place-items-center rounded-md border shrink-0", m.chip)}>
                    <I className="w-3.5 h-3.5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className={cn("block text-sm font-bold truncate", active ? "text-gold-400" : "text-cream")}>{e.title}</span>
                    <span className="block text-[11px] text-cream-dim mt-0.5 font-mono tabular-nums">{tm.h}:{tm.m}:{tm.s}</span>
                  </span>
                  {active && <span className="w-1 self-stretch -my-3 -mr-4 bg-gold-400 rounded-l" />}
                </button>
              </li>
            )
          })}
        </ul>

        <div className="relative p-5">
          <div className="absolute inset-0 placeholder-img" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-900/95 via-ink-900/80 to-ink-900/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 via-transparent to-transparent" />
          <div className={cn("absolute inset-0 bg-gradient-to-br opacity-30 pointer-events-none", meta.glow)} aria-hidden />
          <div className="relative">
            <span className={cn("inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] font-bold tracking-wide", meta.chip)}>
              <Icon className="w-3 h-3" /> {meta.label.toUpperCase()}
            </span>
            <h4 className="mt-3 font-display font-extrabold text-2xl text-cream leading-tight">{ev.title}</h4>
            <p className="text-sm text-cream-dim mt-1.5 leading-relaxed">{ev.description}</p>

            <div className="mt-5 flex items-baseline gap-3">
              <div className="font-mono text-4xl font-bold text-gold-400 tabular-nums leading-none">{t.h}:{t.m}:{t.s}</div>
              <span className="text-[10px] uppercase tracking-wider text-muted">kaldi</span>
            </div>

            <div className="mt-5 flex items-center gap-4 text-[11px] text-cream-dim border-t border-line pt-3">
              <span className="inline-flex items-center gap-1"><IconCalendar className="w-3.5 h-3.5" /> {ev.day}</span>
              <span className="inline-flex items-center gap-1"><IconClock className="w-3.5 h-3.5" /> {ev.duration} dk</span>
              <span className="ml-auto inline-flex items-center gap-1 text-gold-400 font-bold"><IconBolt className="w-3.5 h-3.5" /> Hatirlat</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   EVENTS V2 — Tabs
   ============================================================ */

export function EventsV2Tabs() {
  const [i, setI] = useState(0)
  const remaining = useCountdowns(events)
  const ev = events[i]
  const m = typeMeta[ev.type]
  const Icon = eventIcon[ev.type]
  const t = fmtTime(remaining[ev.id] ?? ev.offsetSec * 1000)
  const soon = (remaining[ev.id] ?? Infinity) < 60 * 60 * 1000

  return (
    <section className="rounded-2xl border border-line bg-ink-850 overflow-hidden">
      <div className="section-header">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400">
            <IconCalendar className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-cream">Etkinlikler</h3>
            <p className="text-xs text-cream-dim">Yaklasan etkinlikler</p>
          </div>
        </div>
        <a href="#" className="text-xs text-gold-400 hover:text-gold-300 flex items-center gap-1">
          Tumunu Gor <IconArrowRight className="w-3 h-3" />
        </a>
      </div>

      <div className="px-5">
        <div className="flex gap-1 p-1 rounded-lg bg-ink-900 border border-line">
          {events.map((e, idx) => {
            const tm = typeMeta[e.type]
            const I = eventIcon[e.type]
            const active = idx === i
            return (
              <button key={e.id} onClick={() => setI(idx)} aria-label={e.title} className={cn("flex-1 grid place-items-center h-9 rounded-md transition-all relative", active ? "bg-ink-850 border border-gold-500/40 text-gold-400" : "text-cream-dim hover:text-cream")}>
                <I className="w-4 h-4" />
                {!active && <span className={cn("absolute bottom-1 w-1 h-1 rounded-full", tm.chip.split(" ").find((c: string) => c.startsWith("text-")))} />}
              </button>
            )
          })}
        </div>
      </div>

      <div className="p-5">
        <div className="relative rounded-xl border border-line bg-ink-900 overflow-hidden">
          <div className={cn("absolute -top-16 -right-16 w-56 h-56 rounded-full blur-3xl opacity-60 bg-gradient-to-br", m.glow)} aria-hidden />
          <div className="relative p-4">
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className={cn("inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] font-bold", m.chip)}>
                <Icon className="w-3 h-3" /> {m.label.toUpperCase()}
              </span>
              {soon && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-rose-300 bg-rose-500/15 border border-rose-500/30 rounded-full px-2 py-0.5">
                  <IconBolt className="w-3 h-3" /> Yakinda
                </span>
              )}
            </div>
            <h4 className="font-display font-extrabold text-xl text-cream leading-tight">{ev.title}</h4>
            <p className="text-[13px] text-cream-dim mt-1.5 leading-relaxed line-clamp-2">{ev.description}</p>
            <div className="mt-4 flex items-end justify-between gap-3 border-t border-line pt-3">
              <div>
                <div className="font-mono text-2xl font-bold text-gold-400 tabular-nums leading-none">{t.h}:{t.m}:{t.s}</div>
                <div className="text-[10px] uppercase tracking-wider text-muted mt-1.5">baslangica kalan</div>
              </div>
              <div className="text-right text-[11px] text-cream-dim space-y-1">
                <div className="inline-flex items-center gap-1"><IconCalendar className="w-3.5 h-3.5" /> {ev.day}</div>
                <div className="inline-flex items-center gap-1"><IconClock className="w-3.5 h-3.5" /> {ev.duration} dk</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   EVENTS V3 — Timeline
   ============================================================ */

export function EventsV3Timeline() {
  const remaining = useCountdowns(events)

  const days: { day: string; items: typeof events }[] = []
  for (const e of events) {
    const last = days[days.length - 1]
    if (last && last.day === e.day) last.items.push(e)
    else days.push({ day: e.day, items: [e] })
  }

  return (
    <section className="rounded-2xl border border-line bg-ink-850 overflow-hidden">
      <div className="section-header">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400">
            <IconCalendar className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-cream">Etkinlik Takvimi</h3>
            <p className="text-xs text-cream-dim">Yaklasan etkinlikler</p>
          </div>
        </div>
        <a href="#" className="text-xs text-gold-400 hover:text-gold-300 flex items-center gap-1">
          Tumunu Gor <IconArrowRight className="w-3 h-3" />
        </a>
      </div>

      <div className="px-5 pb-5 max-h-[440px] overflow-y-auto">
        <ol className="relative pl-5">
          <span className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-gold-500/60 via-line to-transparent" aria-hidden />
          {days.map((d) => (
            <li key={d.day} className="mb-5 last:mb-0">
              <div className="text-[10px] uppercase tracking-[0.25em] font-bold text-gold-400 mb-2 -ml-5 pl-5">{d.day}</div>
              <ul className="space-y-2.5">
                {d.items.map((e) => {
                  const m = typeMeta[e.type]
                  const I = eventIcon[e.type]
                  const t = fmtTime(remaining[e.id] ?? e.offsetSec * 1000)
                  return (
                    <li key={e.id} className="relative">
                      <span className={cn("absolute -left-5 top-3 w-3 h-3 rounded-full border-2 border-ink-850 bg-gold-400")} aria-hidden />
                      <div className="rounded-lg border border-line bg-ink-900 p-3 hover:border-gold-500/40 transition group">
                        <div className="flex items-center gap-2.5">
                          <span className={cn("w-7 h-7 grid place-items-center rounded-md border shrink-0", m.chip)}>
                            <I className="w-3.5 h-3.5" />
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="text-sm font-bold text-cream truncate">{e.title}</div>
                            <div className="text-[11px] text-cream-dim truncate">{e.description}</div>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="font-mono text-sm font-bold text-gold-400 tabular-nums leading-none">{t.h}:{t.m}:{t.s}</div>
                            <div className="text-[10px] text-muted mt-1">{e.duration} dk</div>
                          </div>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ============================================================
   EVENTS V4 — Stack
   ============================================================ */

export function EventsV4Stack() {
  const remaining = useCountdowns(events)
  return (
    <section className="rounded-2xl border border-line bg-ink-850 overflow-hidden">
      <div className="section-header">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400">
            <IconCalendar className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-cream">Etkinlikler</h3>
            <p className="text-xs text-cream-dim">Yaklasan etkinlikler</p>
          </div>
        </div>
        <a href="#" className="text-xs text-gold-400 hover:text-gold-300 flex items-center gap-1">
          Tumunu Gor <IconArrowRight className="w-3 h-3" />
        </a>
      </div>

      <ul className="divide-y divide-line">
        {events.map((e) => {
          const m = typeMeta[e.type]
          const I = eventIcon[e.type]
          const t = fmtTime(remaining[e.id] ?? e.offsetSec * 1000)
          const soon = (remaining[e.id] ?? Infinity) < 60 * 60 * 1000
          return (
            <li key={e.id} className="group flex items-center gap-3 px-5 py-3 hover:bg-ink-900/70 transition">
              <span className={cn("w-9 h-9 grid place-items-center rounded-lg border shrink-0", m.chip)}>
                <I className="w-4 h-4" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-cream truncate">{e.title}</span>
                  {soon && (
                    <span className="text-[9px] uppercase tracking-wider font-bold text-rose-300 bg-rose-500/15 border border-rose-500/30 rounded px-1 py-px">
                      Yakinda
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-cream-dim truncate">{e.day} · {e.duration} dk</div>
              </div>
              <div className="text-right shrink-0">
                <div className="font-mono text-sm font-bold text-gold-400 tabular-nums leading-none">{t.h}:{t.m}:{t.s}</div>
                <div className="text-[10px] text-muted mt-1">kaldi</div>
              </div>
              <button className="ml-1 w-8 h-8 grid place-items-center rounded-md border border-line bg-ink-900 text-cream-dim opacity-0 group-hover:opacity-100 hover:text-gold-400 hover:border-gold-500/40 transition" aria-label="Hatirlat">
                <IconBell className="w-3.5 h-3.5" />
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

/* ============================================================
   EVENTS V5 — Hero List
   ============================================================ */

export function EventsV5HeroList() {
  const remaining = useCountdowns(events)
  const featured = events[0]
  const rest = events.slice(1)
  const fm = typeMeta[featured.type]
  const FI = eventIcon[featured.type]
  const ft = fmtTime(remaining[featured.id] ?? featured.offsetSec * 1000)

  return (
    <section className="rounded-2xl border border-line bg-ink-850 overflow-hidden">
      <div className="section-header">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400">
            <IconCalendar className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-cream">Etkinlikler</h3>
            <p className="text-xs text-cream-dim">Yaklasan etkinlikler</p>
          </div>
        </div>
        <a href="#" className="text-xs text-gold-400 hover:text-gold-300 flex items-center gap-1">
          Tumunu Gor <IconArrowRight className="w-3 h-3" />
        </a>
      </div>

      <div className="px-5">
        <div className="relative rounded-xl border border-gold-500/30 bg-ink-900 overflow-hidden">
          <div className={cn("absolute inset-0 bg-gradient-to-br opacity-70", fm.glow)} aria-hidden />
          <div className="relative p-4">
            <div className="flex items-center gap-2 flex-wrap mb-3">
              <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-bold", fm.chip)}>
                <FI className="w-3 h-3" /> {fm.label.toUpperCase()}
              </span>
              <span className="text-[10px] uppercase tracking-wider font-bold text-gold-400 bg-gold-500/15 border border-gold-500/30 rounded-full px-2 py-0.5 inline-flex items-center gap-1">
                <IconBolt className="w-3 h-3" /> One Cikan
              </span>
            </div>
            <h4 className="font-display font-extrabold text-xl text-cream leading-tight">{featured.title}</h4>
            <p className="text-[13px] text-cream-dim mt-1.5 line-clamp-2">{featured.description}</p>

            <div className="mt-4 flex items-end justify-between gap-3 border-t border-line pt-3">
              <div>
                <div className="font-mono text-2xl font-bold text-gold-400 tabular-nums leading-none">{ft.h}:{ft.m}:{ft.s}</div>
                <div className="text-[10px] uppercase tracking-wider text-muted mt-1.5">kaldi</div>
              </div>
              <div className="text-right text-[11px] text-cream-dim space-y-1">
                <div className="inline-flex items-center gap-1"><IconCalendar className="w-3.5 h-3.5" /> {featured.day}</div>
                <div className="inline-flex items-center gap-1"><IconClock className="w-3.5 h-3.5" /> {featured.duration} dk</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 pt-4 pb-2">
        <div className="text-[10px] uppercase tracking-[0.25em] font-bold text-muted mb-2">Sonraki</div>
      </div>
      <ul className="divide-y divide-line border-t border-line">
        {rest.map((e) => {
          const m = typeMeta[e.type]
          const I = eventIcon[e.type]
          const t = fmtTime(remaining[e.id] ?? e.offsetSec * 1000)
          return (
            <li key={e.id} className="flex items-center gap-3 px-5 py-2.5 hover:bg-ink-900/60 transition">
              <span className={cn("w-7 h-7 grid place-items-center rounded-md border shrink-0", m.chip)}>
                <I className="w-3.5 h-3.5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-[13px] font-bold text-cream truncate leading-tight">{e.title}</div>
                <div className="text-[10px] text-cream-dim mt-0.5">{e.day} · {e.duration} dk</div>
              </div>
              <div className="font-mono text-xs font-bold text-gold-400 tabular-nums shrink-0">{t.h}:{t.m}:{t.s}</div>
            </li>
          )
        })}
      </ul>
      <div className="h-3" />
    </section>
  )
}

/* ============================================================
   SHOWCASE
   ============================================================ */

const Label = ({ tag, title, desc }: { tag: string; title: string; desc: string }) => (
  <div className="mb-3">
    <div className="flex items-center gap-2 mb-1">
      <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-ink-700 border border-line text-cream-dim">{tag}</span>
      <span className="font-bold text-cream text-sm">{title}</span>
    </div>
    <p className="text-[11px] text-cream-dim/70 leading-relaxed">{desc}</p>
  </div>
)

export function EventWidgetsShowcase() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-16">
      <section>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded-lg bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400"><IconCalendar className="w-4 h-4" /></div>
          <div>
            <h2 className="text-lg font-black text-cream">Event Widgets</h2>
            <p className="text-xs text-cream-dim">7 varyasyon + orijinal</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Label tag="ORIJINAL" title="Production Copy" desc="Mevcut production versiyonu (oracle/events-section.tsx)." />
            <EventsOrijinal />
          </div>
          <div>
            <Label tag="ANA" title="Lovable Main" desc="Lovable'dan gelen refined versiyon." />
            <EventsMain />
          </div>
          <div>
            <Label tag="V1" title="Split" desc="Sol dikey liste, sag detay paneli." />
            <EventsV1Split />
          </div>
          <div>
            <Label tag="V2" title="Tabs" desc="Ustte segment tablar, asagida detay karti." />
            <EventsV2Tabs />
          </div>
          <div>
            <Label tag="V3" title="Timeline" desc="Gun bazli gruplanmis dikey zaman cizgisi." />
            <EventsV3Timeline />
          </div>
          <div>
            <Label tag="V4" title="Stack" desc="Kompakt yiginlanmis liste, yuksek yogunluk." />
            <EventsV4Stack />
          </div>
          <div>
            <Label tag="V5" title="Hero List" desc="Ustte vurgulu featured event, altinda liste." />
            <EventsV5HeroList />
          </div>
        </div>
      </section>
    </div>
  )
}
