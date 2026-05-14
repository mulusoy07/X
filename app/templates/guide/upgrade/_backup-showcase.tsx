"use client"

import Link from "next/link"
import {
  IconArrowLeft,
  IconArrowUpCircle,
  IconCoin,
  IconCheck,
  IconBolt,
} from "@tabler/icons-react"

/* ============================================================
   TYPES + MOCK
   ============================================================ */

interface Rarity {
  text: string
  color: string
  textColor: string
}

interface UpgradeRate {
  itemGrade: number
  successRate: string
  rarity: Rarity
  itemReqCoins: string
}

const RARITY = {
  common: { text: "Common", color: "#6b7280", textColor: "#ffffff" },
  uncommon: { text: "Uncommon", color: "#10b981", textColor: "#ffffff" },
  rare: { text: "Rare", color: "#3b82f6", textColor: "#ffffff" },
  epic: { text: "Epic", color: "#a855f7", textColor: "#ffffff" },
  legendary: { text: "Legendary", color: "#f59e0b", textColor: "#000000" },
}

const rates: UpgradeRate[] = [
  { itemGrade: 1, successRate: "95.0", rarity: RARITY.common, itemReqCoins: "1.000 coin" },
  { itemGrade: 2, successRate: "80.0", rarity: RARITY.uncommon, itemReqCoins: "2.500 coin" },
  { itemGrade: 3, successRate: "60.0", rarity: RARITY.rare, itemReqCoins: "5.000 coin" },
  { itemGrade: 4, successRate: "35.0", rarity: RARITY.epic, itemReqCoins: "12.000 coin" },
  { itemGrade: 5, successRate: "15.0", rarity: RARITY.legendary, itemReqCoins: "25.000 coin" },
]

/* ============================================================
   V1 — Orijinal: Square badge + linear progress
   ============================================================ */

function RateCardV1({ rate }: { rate: UpgradeRate }) {
  const grade = Number(rate.itemGrade)
  return (
    <div className="bg-ink-900 hover:bg-ink-800 border border-line hover:border-gold-500/40 rounded-xl p-4 transition-all duration-200">
      <div className="flex items-center justify-center mb-3 relative">
        <div className="w-14 h-14 bg-ink-800 rounded-lg flex items-center justify-center border border-line">
          <span className="font-display text-lg font-bold text-gold-400">+{grade}</span>
        </div>
        <div
          className="absolute -top-1 -right-1 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded border"
          style={{ backgroundColor: rate.rarity.color, color: rate.rarity.textColor, borderColor: rate.rarity.color }}
        >
          {rate.rarity.text}
        </div>
      </div>
      <div className="text-center mb-3">
        <p className="text-xs font-semibold text-cream leading-tight">+{grade} → +{grade + 1}</p>
      </div>
      <div className="mb-3">
        <div className="flex items-center justify-center mb-2">
          <span className="text-sm font-bold text-gold-400">{rate.successRate}%</span>
        </div>
        <div className="w-full bg-ink-800 rounded-full h-2 overflow-hidden">
          <div className="h-2 rounded-full" style={{ width: `${rate.successRate}%`, backgroundColor: rate.rarity.color }} />
        </div>
      </div>
      <div className="text-center">
        <span className="text-[10px] text-cream-dim font-medium bg-ink-800 px-2 py-1 rounded-full border border-line inline-block">
          {rate.itemReqCoins}
        </span>
      </div>
    </div>
  )
}

/* ============================================================
   V2 — Hexagon vibe: Glow ring + circular progress
   ============================================================ */

function RateCardV2({ rate }: { rate: UpgradeRate }) {
  const grade = Number(rate.itemGrade)
  const success = parseFloat(rate.successRate)
  const radius = 28
  const circ = 2 * Math.PI * radius
  const offset = circ - (success / 100) * circ
  return (
    <div
      className="relative bg-gradient-to-b from-ink-900 to-ink-950 border rounded-xl p-4 transition-all duration-200 hover:scale-[1.02]"
      style={{ borderColor: `${rate.rarity.color}40` }}
    >
      <div
        className="absolute inset-0 rounded-xl opacity-20 pointer-events-none"
        style={{ boxShadow: `inset 0 0 30px ${rate.rarity.color}` }}
      />
      <div className="relative flex flex-col items-center">
        <div className="relative w-20 h-20 mb-3">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r={radius} stroke="rgba(255,255,255,0.08)" strokeWidth="4" fill="none" />
            <circle
              cx="32" cy="32" r={radius}
              stroke={rate.rarity.color} strokeWidth="4" fill="none"
              strokeLinecap="round"
              strokeDasharray={circ}
              strokeDashoffset={offset}
              style={{ transition: "stroke-dashoffset 0.6s ease" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-xl font-black text-cream">+{grade}</span>
          </div>
        </div>
        <span
          className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-2"
          style={{ backgroundColor: `${rate.rarity.color}25`, color: rate.rarity.color, border: `1px solid ${rate.rarity.color}50` }}
        >
          {rate.rarity.text}
        </span>
        <div className="text-center">
          <div className="text-[11px] text-cream-dim mb-0.5">+{grade} → +{grade + 1}</div>
          <div className="text-base font-bold" style={{ color: rate.rarity.color }}>{rate.successRate}%</div>
        </div>
        <div className="mt-3 pt-3 border-t border-line w-full text-center">
          <span className="text-[10px] text-cream-dim flex items-center justify-center gap-1">
            <IconCoin className="w-3 h-3 text-gold-400" /> {rate.itemReqCoins}
          </span>
        </div>
      </div>
    </div>
  )
}

/* ============================================================
   V3 — Horizontal/List: Yatay kompakt
   ============================================================ */

function RateCardV3({ rate }: { rate: UpgradeRate }) {
  const grade = Number(rate.itemGrade)
  return (
    <div
      className="bg-ink-900 hover:bg-ink-800/80 border-l-4 border-y border-r border-y-line border-r-line rounded-lg p-3 transition-all flex items-center gap-3"
      style={{ borderLeftColor: rate.rarity.color }}
    >
      <div className="w-12 h-12 rounded-lg bg-ink-800 border border-line flex flex-col items-center justify-center shrink-0">
        <span className="text-[8px] uppercase text-cream-dim leading-none">Lv</span>
        <span className="font-display text-base font-black text-gold-400 leading-none mt-0.5">+{grade}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-semibold text-cream">+{grade} → +{grade + 1}</span>
          <span
            className="text-[8px] font-bold uppercase px-1.5 py-0.5 rounded"
            style={{ backgroundColor: rate.rarity.color, color: rate.rarity.textColor }}
          >
            {rate.rarity.text}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-ink-800 rounded-full h-1.5 overflow-hidden">
            <div className="h-full rounded-full" style={{ width: `${rate.successRate}%`, backgroundColor: rate.rarity.color }} />
          </div>
          <span className="text-xs font-bold text-cream tabular-nums">{rate.successRate}%</span>
        </div>
        <div className="text-[10px] text-cream-dim mt-1 flex items-center gap-1">
          <IconCoin className="w-2.5 h-2.5 text-gold-400" /> {rate.itemReqCoins}
        </div>
      </div>
    </div>
  )
}

/* ============================================================
   V4 — Glassy / Premium: Backdrop blur, gradient border
   ============================================================ */

function RateCardV4({ rate }: { rate: UpgradeRate }) {
  const grade = Number(rate.itemGrade)
  return (
    <div className="relative rounded-xl overflow-hidden group">
      <div
        className="absolute inset-0 opacity-60 group-hover:opacity-100 transition"
        style={{ background: `linear-gradient(135deg, ${rate.rarity.color}30 0%, transparent 50%, ${rate.rarity.color}15 100%)` }}
      />
      <div className="absolute inset-0 backdrop-blur-sm bg-ink-900/70" />
      <div
        className="absolute inset-0 rounded-xl border-2"
        style={{ borderColor: `${rate.rarity.color}30` }}
      />
      <div className="relative p-4 text-center">
        <div className="flex items-center justify-between mb-3">
          <span
            className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
            style={{ backgroundColor: `${rate.rarity.color}30`, color: rate.rarity.color }}
          >
            {rate.rarity.text}
          </span>
          <IconBolt className="w-3.5 h-3.5" style={{ color: rate.rarity.color }} />
        </div>
        <div className="my-4">
          <div className="font-display text-4xl font-black leading-none" style={{ color: rate.rarity.color }}>
            +{grade}
          </div>
          <div className="text-[10px] text-cream-dim mt-1 uppercase tracking-wider">→ +{grade + 1}</div>
        </div>
        <div className="font-display text-2xl font-bold text-cream tabular-nums mb-2">{rate.successRate}<span className="text-sm text-cream-dim">%</span></div>
        <div className="h-1 bg-ink-800/60 rounded-full overflow-hidden mb-3">
          <div className="h-full" style={{ width: `${rate.successRate}%`, backgroundColor: rate.rarity.color }} />
        </div>
        <div className="text-[10px] text-cream-dim flex items-center justify-center gap-1 pt-2 border-t border-line/50">
          <IconCoin className="w-3 h-3 text-gold-400" /> {rate.itemReqCoins}
        </div>
      </div>
    </div>
  )
}

/* ============================================================
   V5 — Minimal/Editorial: Text-forward, tipografik
   ============================================================ */

function RateCardV5({ rate }: { rate: UpgradeRate }) {
  const grade = Number(rate.itemGrade)
  return (
    <div className="bg-ink-900 border border-line rounded-xl p-5 hover:border-gold-500/40 transition group relative overflow-hidden">
      <div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{ backgroundColor: rate.rarity.color }}
      />
      <div className="flex items-baseline justify-between mb-4">
        <span className="text-[10px] uppercase tracking-[0.3em] text-cream-dim/70 font-bold">Grade</span>
        <span
          className="text-[9px] font-bold uppercase tracking-wider"
          style={{ color: rate.rarity.color }}
        >
          {rate.rarity.text}
        </span>
      </div>
      <div className="font-display text-5xl font-black text-cream leading-none mb-1 tabular-nums">
        +{grade}
      </div>
      <div className="text-xs text-cream-dim mb-5">to +{grade + 1}</div>

      <div className="flex items-end justify-between border-t border-line pt-4">
        <div>
          <div className="text-[9px] uppercase text-cream-dim/70 tracking-wider mb-0.5">Success</div>
          <div className="font-mono text-xl font-bold tabular-nums" style={{ color: rate.rarity.color }}>
            {rate.successRate}%
          </div>
        </div>
        <div className="text-right">
          <div className="text-[9px] uppercase text-cream-dim/70 tracking-wider mb-0.5">Cost</div>
          <div className="text-xs font-semibold text-gold-400 flex items-center gap-1">
            <IconCoin className="w-3 h-3" />
            {rate.itemReqCoins.replace(" coin", "")}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ============================================================
   V6 — V5 + circle progress (sağ-alt yerine merkezi konumlu)
   ============================================================ */

function RateCardV6({ rate }: { rate: UpgradeRate }) {
  const grade = Number(rate.itemGrade)
  const success = parseFloat(rate.successRate)
  const radius = 22
  const circ = 2 * Math.PI * radius
  const offset = circ - (success / 100) * circ
  return (
    <div className="bg-ink-900 border border-line rounded-xl p-5 hover:border-gold-500/40 transition group relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-0.5" style={{ backgroundColor: rate.rarity.color }} />
      <div className="flex items-baseline justify-between mb-3">
        <span className="text-[10px] uppercase tracking-[0.3em] text-cream-dim/70 font-bold">Grade</span>
        <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: rate.rarity.color }}>
          {rate.rarity.text}
        </span>
      </div>

      <div className="flex items-center justify-between gap-3 mb-4">
        <div>
          <div className="font-display text-5xl font-black text-cream leading-none tabular-nums">+{grade}</div>
          <div className="text-xs text-cream-dim mt-1">to +{grade + 1}</div>
        </div>
        <div className="relative w-14 h-14 shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 56 56">
            <circle cx="28" cy="28" r={radius} stroke="rgba(255,255,255,0.08)" strokeWidth="4" fill="none" />
            <circle
              cx="28" cy="28" r={radius}
              stroke={rate.rarity.color} strokeWidth="4" fill="none"
              strokeLinecap="round"
              strokeDasharray={circ}
              strokeDashoffset={offset}
              style={{ transition: "stroke-dashoffset 0.6s ease" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[11px] font-bold tabular-nums" style={{ color: rate.rarity.color }}>{rate.successRate}%</span>
          </div>
        </div>
      </div>

      <div className="border-t border-line pt-3 flex items-center justify-between">
        <div className="text-[9px] uppercase text-cream-dim/70 tracking-wider">Cost</div>
        <div className="text-xs font-semibold text-gold-400 flex items-center gap-1">
          <IconCoin className="w-3 h-3" /> {rate.itemReqCoins.replace(" coin", "")}
        </div>
      </div>
    </div>
  )
}

/* ============================================================
   V7 — Big +N solda, büyük circle sağda (eşit ağırlık)
   ============================================================ */

function RateCardV7({ rate }: { rate: UpgradeRate }) {
  const grade = Number(rate.itemGrade)
  const success = parseFloat(rate.successRate)
  const radius = 28
  const circ = 2 * Math.PI * radius
  const offset = circ - (success / 100) * circ
  return (
    <div className="bg-ink-900 border border-line rounded-xl p-5 hover:border-gold-500/40 transition relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-0.5" style={{ backgroundColor: rate.rarity.color }} />
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] uppercase tracking-[0.3em] text-cream-dim/70 font-bold">Grade</span>
        <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: rate.rarity.color }}>
          {rate.rarity.text}
        </span>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1">
          <div className="font-display text-5xl font-black text-cream leading-none tabular-nums">+{grade}</div>
          <div className="text-[10px] text-cream-dim mt-1 uppercase tracking-wider">→ +{grade + 1}</div>
        </div>
        <div className="relative w-20 h-20 shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r={radius} stroke="rgba(255,255,255,0.08)" strokeWidth="5" fill="none" />
            <circle
              cx="32" cy="32" r={radius}
              stroke={rate.rarity.color} strokeWidth="5" fill="none"
              strokeLinecap="round"
              strokeDasharray={circ}
              strokeDashoffset={offset}
              style={{ transition: "stroke-dashoffset 0.6s ease" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-mono text-base font-bold tabular-nums" style={{ color: rate.rarity.color }}>{rate.successRate}</span>
            <span className="text-[9px] text-cream-dim leading-none -mt-0.5">%</span>
          </div>
        </div>
      </div>

      <div className="border-t border-line pt-3 flex items-center justify-end gap-1 text-xs font-semibold text-gold-400">
        <IconCoin className="w-3 h-3" /> {rate.itemReqCoins.replace(" coin", "")}
      </div>
    </div>
  )
}

/* ============================================================
   V8 — Hero büyük circle + +N circle içinde, alt satırda meta
   ============================================================ */

function RateCardV8({ rate }: { rate: UpgradeRate }) {
  const grade = Number(rate.itemGrade)
  const success = parseFloat(rate.successRate)
  const radius = 38
  const circ = 2 * Math.PI * radius
  const offset = circ - (success / 100) * circ
  return (
    <div className="bg-ink-900 border border-line rounded-xl p-5 hover:border-gold-500/40 transition relative overflow-hidden text-center">
      <div className="absolute top-0 left-0 right-0 h-0.5" style={{ backgroundColor: rate.rarity.color }} />
      <div className="flex items-baseline justify-between mb-4">
        <span className="text-[10px] uppercase tracking-[0.3em] text-cream-dim/70 font-bold">Grade</span>
        <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: rate.rarity.color }}>
          {rate.rarity.text}
        </span>
      </div>

      <div className="relative w-28 h-28 mx-auto mb-3">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 88 88">
          <circle cx="44" cy="44" r={radius} stroke="rgba(255,255,255,0.08)" strokeWidth="5" fill="none" />
          <circle
            cx="44" cy="44" r={radius}
            stroke={rate.rarity.color} strokeWidth="5" fill="none"
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.6s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-3xl font-black text-cream leading-none tabular-nums">+{grade}</span>
          <span className="text-[10px] font-bold tabular-nums mt-1" style={{ color: rate.rarity.color }}>{rate.successRate}%</span>
        </div>
      </div>

      <div className="text-[10px] text-cream-dim mb-3 uppercase tracking-wider">+{grade} → +{grade + 1}</div>

      <div className="border-t border-line pt-3 flex items-center justify-center gap-1 text-xs font-semibold text-gold-400">
        <IconCoin className="w-3 h-3" /> {rate.itemReqCoins.replace(" coin", "")}
      </div>
    </div>
  )
}

/* ============================================================
   SHOWCASE
   ============================================================ */

const variants = [
  { tag: "V1", title: "Orijinal", desc: "Mevcut tasarim. Square badge + horizontal progress.", Card: RateCardV1 },
  { tag: "V2", title: "Circular Progress", desc: "Cember progress ring + glow border. Daha modern.", Card: RateCardV2 },
  { tag: "V3", title: "Horizontal List", desc: "Yatay kompakt liste. Cok sayida grade gosterirken iyi.", Card: RateCardV3 },
  { tag: "V4", title: "Glassy Premium", desc: "Backdrop blur + gradient. Premium feel.", Card: RateCardV4 },
  { tag: "V5", title: "Editorial Minimal", desc: "Tipografik. Ust seritte rarity rengi. Sade ve okunakli.", Card: RateCardV5 },
  { tag: "V6", title: "V5 + Mini Circle", desc: "V5 layout + sag tarafta kucuk circle progress (% icinde).", Card: RateCardV6 },
  { tag: "V7", title: "V5 + Balanced Circle", desc: "Buyuk +N solda, buyuk circle sagda (esit agirlik). Cost altta.", Card: RateCardV7 },
  { tag: "V8", title: "V5 + Hero Circle", desc: "Buyuk merkezi circle, +N ve % icinde. En vurguludur.", Card: RateCardV8 },
]

export default function UpgradeShowcasePage() {
  return (
    <div className="min-h-screen bg-ink-950">
      <div className="border-b border-line bg-ink-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link
            href="/templates/guide"
            className="p-2 rounded-lg bg-ink-800 border border-line text-cream-dim hover:text-cream hover:border-gold-500/50 transition-all"
          >
            <IconArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400">
              <IconArrowUpCircle className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-cream">Upgrade Card Variants</h1>
              <p className="text-sm text-cream-dim">5 farkli tarz — begendiginle devam ederiz</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
        {variants.map(({ tag, title, desc, Card }) => (
          <section key={tag}>
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-ink-700 border border-line text-cream-dim">{tag}</span>
                <span className="font-bold text-cream text-base">{title}</span>
              </div>
              <p className="text-xs text-cream-dim/80">{desc}</p>
            </div>

            <div className="bg-ink-800/30 border border-line rounded-xl p-5">
              <div
                className={
                  tag === "V3"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
                    : "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3"
                }
              >
                {rates.map((r) => (
                  <Card key={r.itemGrade} rate={r} />
                ))}
              </div>
            </div>
          </section>
        ))}

        <div className="rounded-xl border border-gold-500/30 bg-gold-500/5 p-4 flex items-start gap-3 text-sm text-cream-dim">
          <IconCheck className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
          <div>
            Begendigin variant&apos;in numarasini soyle, full upgrade sayfasinda onunla devam edelim.
          </div>
        </div>
      </div>
    </div>
  )
}
