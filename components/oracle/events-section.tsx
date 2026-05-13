"use client"

import { useEffect, useState } from "react"
import {
  IconCalendar,
  IconClock,
  IconArrowRight,
  IconShield,
  IconTrophy,
  IconStar,
} from "@tabler/icons-react"
import { cn } from "@/lib/utils"

/* ============================================================
   DATA
   ============================================================ */

type EventType = "war" | "tournament" | "event" | "special"

interface GameEvent {
  id: number
  title: string
  description: string
  type: EventType
  offsetSec: number
  duration: number
  day: string
}

const events: GameEvent[] = [
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
]

const typeMeta: Record<EventType, { label: string; chip: string; glow: string }> = {
  war: {
    label: "Savas",
    chip: "bg-rose-500/15 text-rose-300 border-rose-500/30",
    glow: "from-rose-500/30 via-rose-500/5 to-transparent",
  },
  tournament: {
    label: "Turnuva",
    chip: "bg-gold-500/15 text-gold-300 border-gold-500/35",
    glow: "from-gold-500/30 via-gold-500/5 to-transparent",
  },
  event: {
    label: "Etkinlik",
    chip: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    glow: "from-emerald-500/25 via-emerald-500/5 to-transparent",
  },
  special: {
    label: "Ozel",
    chip: "bg-violet-500/15 text-violet-300 border-violet-500/30",
    glow: "from-violet-500/25 via-violet-500/5 to-transparent",
  },
}

const eventIcon: Record<EventType, any> = {
  war: IconShield,
  tournament: IconTrophy,
  event: IconCalendar,
  special: IconStar,
}

function fmtTime(ms: number) {
  if (ms <= 0) return { h: "00", m: "00", s: "00" }
  const t = Math.floor(ms / 1000)
  const h = Math.floor(t / 3600)
  const m = Math.floor((t % 3600) / 60)
  const s = t % 60
  return {
    h: String(h).padStart(2, "0"),
    m: String(m).padStart(2, "0"),
    s: String(s).padStart(2, "0"),
  }
}

function useCountdowns(items: { id: number; offsetSec: number }[]) {
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

/* ============================================================
   EventsSection — Split layout (left list, right detail)
   ============================================================ */

export function EventsSection() {
  const [i, setI] = useState(0)
  const remaining = useCountdowns(events)
  const ev = events[i]
  const meta = typeMeta[ev.type]
  const Icon = eventIcon[ev.type]
  const t = fmtTime(remaining[ev.id] ?? ev.offsetSec * 1000)

  return (
    <section className="card rounded-xl overflow-hidden">
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
        <ul className="border-r border-line flex flex-col h-full">
          {events.map((e, idx) => {
            const m = typeMeta[e.type]
            const I = eventIcon[e.type]
            const tm = fmtTime(remaining[e.id] ?? e.offsetSec * 1000)
            const active = idx === i
            return (
              <li key={e.id} className="flex-1 flex">
                <button
                  onClick={() => setI(idx)}
                  onMouseEnter={() => setI(idx)}
                  className={cn(
                    "w-full text-left px-4 py-3 border-b border-line/70 transition-colors flex items-center gap-2.5",
                    active ? "bg-ink-900" : "hover:bg-ink-900/60",
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

        <div className="relative p-5 min-h-[260px]">
          <div className="absolute inset-0 placeholder-img" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-900/95 via-ink-900/80 to-ink-900/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 via-transparent to-transparent" />
          <div className={cn("absolute inset-0 bg-gradient-to-br opacity-30 pointer-events-none", meta.glow)} aria-hidden />
          <div className="relative">
            <span className={cn("inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] font-bold tracking-wide", meta.chip)}>
              <Icon className="w-3 h-3" /> {meta.label.toUpperCase()}
            </span>
            <h4 className="mt-3 font-display font-extrabold text-2xl text-cream leading-tight line-clamp-1">{ev.title}</h4>
            <p className="text-sm text-cream-dim mt-1.5 leading-relaxed line-clamp-2 min-h-[40px]">{ev.description}</p>

            <div className="mt-5 flex items-baseline gap-3">
              <div className="font-mono text-4xl font-bold text-gold-400 tabular-nums leading-none">{t.h}:{t.m}:{t.s}</div>              
            </div>

            <div className="mt-5 flex items-center gap-4 text-[11px] text-cream-dim border-t border-line pt-3">
              <span className="inline-flex items-center gap-1"><IconCalendar className="w-3.5 h-3.5" /> {ev.day}</span>
              <span className="inline-flex items-center gap-1"><IconClock className="w-3.5 h-3.5" /> {ev.duration} dk</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
