export type EventType = "war" | "tournament" | "event" | "special";

export interface GameEvent {
  id: number;
  title: string;
  description: string;
  type: EventType;
  // seconds-from-now offset (SSR-safe; turned into Date at render time on client)
  offsetSec: number;
  duration: number; // minutes
  day: string;
}

export const events: GameEvent[] = [
  {
    id: 1,
    title: "Nation War",
    description:
      "Karus ve El Morad arasindaki buyuk savas. Ulken icin savas ve oduller kazan.",
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
];

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
};

export function fmtTime(ms: number) {
  if (ms <= 0) return { h: "00", m: "00", s: "00", total: 0 };
  const t = Math.floor(ms / 1000);
  return {
    h: String(Math.floor(t / 3600)).padStart(2, "0"),
    m: String(Math.floor((t % 3600) / 60)).padStart(2, "0"),
    s: String(t % 60).padStart(2, "0"),
    total: t,
  };
}

// Hook helper: returns a stable "epoch" set after mount to avoid SSR mismatch
import { useEffect, useState } from "react";
export function useCountdowns(items: { id: number; offsetSec: number }[]) {
  const [now, setNow] = useState<number | null>(null);
  const [base] = useState(() => Date.now());
  useEffect(() => {
    setNow(Date.now());
    const i = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(i);
  }, []);
  const map: Record<number, number> = {};
  const ref = now ?? base;
  for (const it of items) {
    map[it.id] = base + it.offsetSec * 1000 - ref;
  }
  return map;
}

export function startTimeLabel(offsetSec: number, base: number) {
  const d = new Date(base + offsetSec * 1000);
  const h = String(d.getHours()).padStart(2, "0");
  const m = String(d.getMinutes()).padStart(2, "0");
  return `${h}:${m}`;
}
