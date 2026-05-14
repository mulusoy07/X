"use client"

import { useState } from "react"
import Link from "next/link"
import {
  IconArrowLeft,
  IconArrowUpCircle,
  IconChevronRight,
  IconPlus,
  IconAlertCircle,
  IconCircleCheck,
  IconCoin,
  IconBolt,
} from "@tabler/icons-react"

/* ============================================================
   TYPES
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

interface TypeGroup {
  typeName: string
  rates: UpgradeRate[]
}

interface Scroll {
  scrollId1: number
  scrollId2: number | null
  itemName1: string
  itemName2: string | null
  scrollName: string
  slug: string
  hasDouble: boolean
  rateCount: number
  ratesByType: TypeGroup[]
}

/* ============================================================
   MOCK DATA
   ============================================================ */

const RARITY = {
  common: { text: "Common", color: "#6b7280", textColor: "#ffffff" },
  uncommon: { text: "Uncommon", color: "#10b981", textColor: "#ffffff" },
  rare: { text: "Rare", color: "#3b82f6", textColor: "#ffffff" },
  epic: { text: "Epic", color: "#a855f7", textColor: "#ffffff" },
  legendary: { text: "Legendary", color: "#f59e0b", textColor: "#000000" },
  mythic: { text: "Mythic", color: "#ef4444", textColor: "#ffffff" },
}

function makeRates(start: number, end: number, base: number, ratePerStep: number): UpgradeRate[] {
  const rarities = [RARITY.common, RARITY.uncommon, RARITY.rare, RARITY.epic, RARITY.legendary, RARITY.mythic]
  const out: UpgradeRate[] = []
  for (let g = start; g <= end; g++) {
    const idx = Math.min(Math.floor((g - 1) / 2), rarities.length - 1)
    const success = Math.max(5, Math.round(100 - (g - 1) * ratePerStep))
    out.push({
      itemGrade: g,
      successRate: success.toFixed(1),
      rarity: rarities[idx],
      itemReqCoins: `${(base * g).toLocaleString("tr-TR")} coin`,
    })
  }
  return out
}

const scrolls: Scroll[] = [
  {
    scrollId1: 1001, scrollId2: null,
    itemName1: "Holy Water", itemName2: null,
    scrollName: "Holy Water", slug: "holy-water", hasDouble: false, rateCount: 9,
    ratesByType: [
      { typeName: "Weapon", rates: makeRates(1, 9, 1000, 10) },
      { typeName: "Armor", rates: makeRates(1, 9, 1500, 11) },
    ],
  },
  {
    scrollId1: 1002, scrollId2: null,
    itemName1: "Smelting Scroll", itemName2: null,
    scrollName: "Smelting Scroll", slug: "smelting-scroll", hasDouble: false, rateCount: 12,
    ratesByType: [
      { typeName: "Weapon", rates: makeRates(1, 12, 2500, 8) },
      { typeName: "Armor", rates: makeRates(1, 12, 3000, 9) },
      { typeName: "Accessory", rates: makeRates(1, 8, 5000, 12) },
    ],
  },
  {
    scrollId1: 1003, scrollId2: 1004,
    itemName1: "Holy Water", itemName2: "Smelting Anvil",
    scrollName: "Holy Water + Smelting Anvil", slug: "holy-water-anvil", hasDouble: true, rateCount: 10,
    ratesByType: [
      { typeName: "Weapon", rates: makeRates(1, 10, 4000, 7) },
      { typeName: "Armor", rates: makeRates(1, 10, 4500, 8) },
    ],
  },
  {
    scrollId1: 1005, scrollId2: null,
    itemName1: "Vorpal Scroll", itemName2: null,
    scrollName: "Vorpal Scroll", slug: "vorpal-scroll", hasDouble: false, rateCount: 7,
    ratesByType: [
      { typeName: "Weapon", rates: makeRates(1, 7, 8000, 13) },
    ],
  },
  {
    scrollId1: 1006, scrollId2: 1007,
    itemName1: "Vorpal Scroll", itemName2: "Premium Anvil",
    scrollName: "Vorpal + Premium Anvil", slug: "vorpal-premium-anvil", hasDouble: true, rateCount: 9,
    ratesByType: [
      { typeName: "Weapon", rates: makeRates(1, 9, 12000, 9) },
      { typeName: "Armor", rates: makeRates(1, 9, 13000, 10) },
      { typeName: "Accessory", rates: makeRates(1, 6, 18000, 14) },
    ],
  },
]

/* ============================================================
   PLACEHOLDER ICON
   ============================================================ */

function ItemIcon({ size = 40 }: { id?: number; alt?: string; size?: number }) {
  return (
    <div
      className="placeholder-img rounded-md border border-line"
      style={{ width: size, height: size }}
      aria-hidden
    />
  )
}

/* ============================================================
   RATE CARD — V4 (Glassy Premium)
   ============================================================ */

function RateCard({ rate }: { rate: UpgradeRate }) {
  const grade = Number(rate.itemGrade)
  return (
    <div className="relative rounded-xl overflow-hidden group isolate">
      <div
        className="absolute inset-0 rounded-xl opacity-60 group-hover:opacity-100 transition"
        style={{ background: `linear-gradient(135deg, ${rate.rarity.color}30 0%, transparent 50%, ${rate.rarity.color}15 100%)` }}
      />
      <div className="absolute inset-0 rounded-xl backdrop-blur-sm bg-ink-900/70" />
      <div
        className="absolute inset-0 rounded-xl border-2 pointer-events-none"
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
        <div className="font-display text-2xl font-bold text-cream tabular-nums mb-2">
          {rate.successRate}<span className="text-sm text-cream-dim">%</span>
        </div>
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
   COMPONENTS
   ============================================================ */

interface ScrollListProps {
  scrolls: Scroll[]
  selectedSlug: string
  onSelect: (slug: string) => void
}

function ScrollListV1({ scrolls, selectedSlug, onSelect }: ScrollListProps) {
  return (
    <div className="card rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-line">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-gold-400 rounded-full animate-pulse" />
          <h3 className="text-sm font-bold text-cream uppercase tracking-wider">Scroll Türleri</h3>
          <span className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full bg-gold-500/15 text-gold-400 border border-gold-500/30">
            {scrolls.length}
          </span>
        </div>
      </div>

      <div className="max-h-[calc(100vh-16rem)] overflow-y-auto">
        <div className="p-2 space-y-1">
          {scrolls.map((scroll) => {
            const isActive = selectedSlug === scroll.slug
            return (
              <button
                type="button"
                key={scroll.slug}
                onClick={() => onSelect(scroll.slug)}
                className={`w-full text-left group p-3 rounded-lg relative overflow-hidden transition-all duration-200 ${
                  isActive
                    ? "bg-ink-900 border border-gold-500/40"
                    : "bg-ink-800/40 border border-transparent hover:border-gold-500/30"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`flex-shrink-0 ${scroll.hasDouble ? "w-24" : "w-10"} h-10 flex items-center`}>
                    {scroll.hasDouble ? (
                      <div className="flex items-center">
                        <ItemIcon id={scroll.scrollId1} alt={scroll.itemName1} size={40} />
                        <div className="flex items-center justify-center w-4 h-4 -mx-1 z-10 rounded-full bg-ink-900 text-cream-dim border border-line">
                          <IconPlus className="w-2 h-2" />
                        </div>
                        <ItemIcon id={scroll.scrollId2 ?? undefined} alt={scroll.itemName2 ?? undefined} size={40} />
                      </div>
                    ) : (
                      <ItemIcon id={scroll.scrollId1} alt={scroll.itemName1} size={40} />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate leading-tight ${isActive ? "text-gold-300" : "text-cream"}`}>
                      {scroll.scrollName}
                    </p>
                  </div>

                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 ${
                      isActive
                        ? "bg-gold-500/20 text-gold-300"
                        : "bg-ink-800 text-cream-dim group-hover:bg-gold-500/15 group-hover:text-gold-400"
                    }`}
                  >
                    <IconChevronRight className="w-3 h-3" />
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/* V2 — Tab style: sol gold accent bar, ikon yok, sade tipografi */
function ScrollListV2({ scrolls, selectedSlug, onSelect }: ScrollListProps) {
  return (
    <div className="card rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-line flex items-center gap-2">
        <span className="h-px w-6 bg-gold-500" />
        <h3 className="text-[11px] font-bold text-gold-400 uppercase tracking-[0.3em]">Scrolls</h3>
        <span className="ml-auto text-xs text-cream-dim">{scrolls.length}</span>
      </div>
      <ul>
        {scrolls.map((scroll) => {
          const isActive = selectedSlug === scroll.slug
          return (
            <li key={scroll.slug}>
              <button
                type="button"
                onClick={() => onSelect(scroll.slug)}
                className={`w-full text-left px-4 py-3 border-b border-line/70 last:border-b-0 transition-colors flex items-center gap-3 group ${
                  isActive ? "bg-ink-900" : "hover:bg-ink-900/60"
                }`}
              >
                <span className={`w-1 self-stretch rounded-full transition-all ${isActive ? "bg-gold-400" : "bg-transparent group-hover:bg-gold-500/30"}`} />
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold truncate ${isActive ? "text-gold-300" : "text-cream"}`}>
                    {scroll.scrollName}
                  </p>
                  <p className="text-[11px] text-cream-dim mt-0.5">
                    {scroll.rateCount} level · {scroll.hasDouble ? "Double" : "Single"}
                  </p>
                </div>
                {isActive && <IconChevronRight className="w-4 h-4 text-gold-400 shrink-0" />}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

/* V3 — Numbered/Index: 01, 02 prefix; minimal, kitap içeriği gibi */
function ScrollListV3({ scrolls, selectedSlug, onSelect }: ScrollListProps) {
  return (
    <div className="card rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-line">
        <div className="flex items-baseline justify-between">
          <h3 className="font-display text-base font-bold text-cream">Scroll Türleri</h3>
          <span className="font-mono text-[10px] text-cream-dim tabular-nums">
            {String(scrolls.findIndex(s => s.slug === selectedSlug) + 1).padStart(2, "0")} / {String(scrolls.length).padStart(2, "0")}
          </span>
        </div>
      </div>
      <div className="p-2 space-y-0.5">
        {scrolls.map((scroll, idx) => {
          const isActive = selectedSlug === scroll.slug
          return (
            <button
              key={scroll.slug}
              type="button"
              onClick={() => onSelect(scroll.slug)}
              className={`w-full text-left p-3 rounded-lg flex items-center gap-3 transition-all ${
                isActive ? "bg-gold-500/10 border border-gold-500/30" : "border border-transparent hover:bg-ink-900/60"
              }`}
            >
              <span className={`font-mono text-xs font-bold tabular-nums shrink-0 w-7 ${isActive ? "text-gold-400" : "text-cream-dim/60"}`}>
                {String(idx + 1).padStart(2, "0")}
              </span>
              <span className="h-6 w-px bg-line shrink-0" />
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium truncate ${isActive ? "text-gold-300" : "text-cream"}`}>
                  {scroll.scrollName}
                </p>
              </div>
              {scroll.hasDouble && (
                <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-violet-500/15 text-violet-400 border border-violet-500/30 shrink-0">
                  2x
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* V4 — Visual/Card style: büyük ikonlu, sağda level rozeti */
function ScrollListV4({ scrolls, selectedSlug, onSelect }: ScrollListProps) {
  return (
    <div className="card rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-line bg-gradient-to-r from-gold-500/10 to-transparent">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-gold-500/15 border border-gold-500/30 flex items-center justify-center">
            <IconArrowUpCircle className="w-3.5 h-3.5 text-gold-400" />
          </div>
          <h3 className="text-sm font-bold text-cream">Scroll Türleri</h3>
          <span className="ml-auto text-[10px] font-mono text-cream-dim tabular-nums">{scrolls.length} types</span>
        </div>
      </div>
      <div className="p-3 space-y-2">
        {scrolls.map((scroll) => {
          const isActive = selectedSlug === scroll.slug
          return (
            <button
              key={scroll.slug}
              type="button"
              onClick={() => onSelect(scroll.slug)}
              className={`w-full text-left p-2.5 rounded-lg flex items-center gap-3 transition-all relative overflow-hidden ${
                isActive
                  ? "bg-ink-900 ring-1 ring-gold-500/50"
                  : "bg-ink-800/30 hover:bg-ink-900/70"
              }`}
            >
              {isActive && (
                <span className="absolute inset-y-0 left-0 w-0.5 bg-gradient-to-b from-gold-400 to-gold-600" />
              )}
              <div className={`flex-shrink-0 ${scroll.hasDouble ? "w-[72px]" : "w-9"} h-9 flex items-center justify-center`}>
                {scroll.hasDouble ? (
                  <div className="flex items-center">
                    <ItemIcon size={32} />
                    <span className="text-cream-dim/60 text-[10px] mx-0.5">+</span>
                    <ItemIcon size={32} />
                  </div>
                ) : (
                  <ItemIcon size={36} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold truncate ${isActive ? "text-gold-300" : "text-cream"}`}>
                  {scroll.scrollName}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[10px] text-cream-dim font-mono tabular-nums">{scroll.rateCount} lvl</span>
                  {scroll.hasDouble && (
                    <span className="text-[9px] uppercase px-1 py-px rounded bg-violet-500/15 text-violet-400">double</span>
                  )}
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* V5 — V2 + ikon + fade çizgi separator + rate count chip + chevron circle */
function ScrollListV5({ scrolls, selectedSlug, onSelect }: ScrollListProps) {
  return (
    <div className="card rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-line flex items-center gap-2">
        <span className="h-px w-6 bg-gold-500" />
        <h3 className="text-[11px] font-bold text-gold-400 uppercase tracking-[0.3em]">Scrolls</h3>
        <span className="ml-auto text-[10px] font-bold tabular-nums px-2 py-0.5 rounded-full bg-gold-500/15 text-gold-400 border border-gold-500/30">
          {scrolls.length}
        </span>
      </div>
      <ul className="p-1">
        {scrolls.map((scroll, idx) => {
          const isActive = selectedSlug === scroll.slug
          return (
            <li key={scroll.slug}>
              <button
                type="button"
                onClick={() => onSelect(scroll.slug)}
                className={`w-full text-left px-3 py-2.5 rounded-md transition-colors flex items-center gap-3 group ${
                  isActive ? "bg-ink-900" : "hover:bg-ink-900/60"
                }`}
              >
                <span className={`w-1 h-9 rounded-full transition-all shrink-0 ${isActive ? "bg-gold-400" : "bg-transparent group-hover:bg-gold-500/30"}`} />
                <div className={`flex-shrink-0 ${scroll.hasDouble ? "w-[68px]" : "w-9"} h-9 flex items-center`}>
                  {scroll.hasDouble ? (
                    <div className="flex items-center">
                      <ItemIcon size={32} />
                      <span className="text-cream-dim/50 text-[10px] mx-0.5">+</span>
                      <ItemIcon size={32} />
                    </div>
                  ) : (
                    <ItemIcon size={36} />
                  )}
                </div>
                <p className={`flex-1 min-w-0 text-sm font-semibold truncate ${isActive ? "text-gold-300" : "text-cream"}`}>
                  {scroll.scrollName}
                </p>
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-all shrink-0 ${
                    isActive
                      ? "bg-gold-500/20 text-gold-300"
                      : "bg-ink-800 text-cream-dim group-hover:bg-gold-500/15 group-hover:text-gold-400"
                  }`}
                >
                  <IconChevronRight className="w-3 h-3" />
                </div>
              </button>
              {idx < scrolls.length - 1 && (
                <div className="mx-3 h-px bg-gradient-to-r from-transparent via-line to-transparent" />
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

/* V6 — V2 + ikon + merkez nokta separator (her li arasında küçük diamond ◆) */
function ScrollListV6({ scrolls, selectedSlug, onSelect }: ScrollListProps) {
  return (
    <div className="card rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-line flex items-center gap-2">
        <span className="h-px w-6 bg-gold-500" />
        <h3 className="text-[11px] font-bold text-gold-400 uppercase tracking-[0.3em]">Scrolls</h3>
        <span className="ml-auto text-xs text-cream-dim">{scrolls.length}</span>
      </div>
      <ul className="p-2">
        {scrolls.map((scroll, idx) => {
          const isActive = selectedSlug === scroll.slug
          return (
            <li key={scroll.slug}>
              <button
                type="button"
                onClick={() => onSelect(scroll.slug)}
                className={`w-full text-left px-3 py-2.5 rounded-md transition-colors flex items-center gap-3 group ${
                  isActive ? "bg-ink-900" : "hover:bg-ink-900/60"
                }`}
              >
                <span className={`w-1 h-9 rounded-full transition-all shrink-0 ${isActive ? "bg-gold-400" : "bg-transparent group-hover:bg-gold-500/30"}`} />
                <div className={`flex-shrink-0 ${scroll.hasDouble ? "w-[68px]" : "w-9"} h-9 flex items-center`}>
                  {scroll.hasDouble ? (
                    <div className="flex items-center">
                      <ItemIcon size={32} />
                      <span className="text-cream-dim/50 text-[10px] mx-0.5">+</span>
                      <ItemIcon size={32} />
                    </div>
                  ) : (
                    <ItemIcon size={36} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold truncate ${isActive ? "text-gold-300" : "text-cream"}`}>
                    {scroll.scrollName}
                  </p>
                  <p className="text-[11px] text-cream-dim mt-0.5">
                    {scroll.rateCount} level · {scroll.hasDouble ? "Double" : "Single"}
                  </p>
                </div>
              </button>
              {idx < scrolls.length - 1 && (
                <div className="flex items-center justify-center py-1.5">
                  <span className="rotate-45 w-1.5 h-1.5 bg-gold-500/40" />
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

/* V7 — V2 + ikon + boşluklu mini kartlar (her li ayrı kart) */
function ScrollListV7({ scrolls, selectedSlug, onSelect }: ScrollListProps) {
  return (
    <div className="card rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-line flex items-center gap-2">
        <span className="h-px w-6 bg-gold-500" />
        <h3 className="text-[11px] font-bold text-gold-400 uppercase tracking-[0.3em]">Scrolls</h3>
        <span className="ml-auto text-xs text-cream-dim">{scrolls.length}</span>
      </div>
      <ul className="p-3 space-y-2">
        {scrolls.map((scroll) => {
          const isActive = selectedSlug === scroll.slug
          return (
            <li key={scroll.slug}>
              <button
                type="button"
                onClick={() => onSelect(scroll.slug)}
                className={`w-full text-left p-3 rounded-lg border transition-all flex items-center gap-3 group ${
                  isActive
                    ? "border-gold-500/40 bg-ink-900"
                    : "border-line bg-ink-800/30 hover:border-gold-500/30 hover:bg-ink-900/60"
                }`}
              >
                <span className={`w-1 h-10 rounded-full transition-all shrink-0 ${isActive ? "bg-gold-400" : "bg-line group-hover:bg-gold-500/40"}`} />
                <div className={`flex-shrink-0 ${scroll.hasDouble ? "w-[68px]" : "w-9"} h-9 flex items-center`}>
                  {scroll.hasDouble ? (
                    <div className="flex items-center">
                      <ItemIcon size={32} />
                      <span className="text-cream-dim/50 text-[10px] mx-0.5">+</span>
                      <ItemIcon size={32} />
                    </div>
                  ) : (
                    <ItemIcon size={36} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold truncate ${isActive ? "text-gold-300" : "text-cream"}`}>
                    {scroll.scrollName}
                  </p>
                  <p className="text-[11px] text-cream-dim mt-0.5 font-mono tabular-nums">
                    {scroll.rateCount} level{scroll.hasDouble && " · 2x"}
                  </p>
                </div>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function ScrollHeader({ scroll }: { scroll: Scroll }) {
  const totalLevels = scroll.ratesByType?.reduce((total, type) => total + type.rates.length, 0) || 0
  return (
    <div className="relative">
      <div className="p-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="relative flex-shrink-0">
            {scroll.hasDouble ? (
              <div className="flex items-center gap-3">
                <div className="bg-ink-800 rounded-lg flex items-center justify-center border border-line p-1">
                  <ItemIcon id={scroll.scrollId1} alt={scroll.scrollName} size={45} />
                </div>
                <div className="w-6 h-6 rounded-full bg-gold-500 text-ink-950 flex items-center justify-center">
                  <IconPlus className="w-3 h-3" />
                </div>
                <div className="bg-ink-800 rounded-lg flex items-center justify-center border border-line p-1">
                  <ItemIcon id={scroll.scrollId2 ?? undefined} alt={scroll.scrollName} size={45} />
                </div>
              </div>
            ) : (
              <div className="bg-ink-800 rounded-lg flex items-center justify-center border border-line p-1">
                <ItemIcon id={scroll.scrollId1} alt={scroll.scrollName} size={45} />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-display text-xl font-bold text-cream mb-2 truncate">{scroll.scrollName}</h3>
            <div className="flex items-center gap-4 text-sm flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                <span className="text-cream-dim">
                  {scroll.ratesByType?.length || 0} farklı item türü
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-violet-500 rounded-full" />
                <span className="text-violet-400 font-medium">Upgrade Scroll</span>
              </div>
            </div>
          </div>

          <div className="bg-ink-800 border border-line rounded-xl px-4 py-2 flex-shrink-0">
            <div className="text-center">
              <div className="font-display text-lg font-bold uppercase text-gold-400">{totalLevels}</div>
              <div className="text-[10px] uppercase text-cream-dim tracking-wider whitespace-nowrap">Toplam Level</div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-px bg-line" />
    </div>
  )
}

function TypeSection({ type }: { type: TypeGroup }) {
  if (!type.rates?.length) return null
  return (
    <div className="bg-ink-800/40 rounded-xl p-5 border border-line">
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <div className="w-1 h-7 bg-gradient-to-b from-gold-400 to-gold-500 rounded-full flex-shrink-0" />
        <h4 className="font-display text-lg font-bold text-cream flex-1 min-w-0 truncate">{type.typeName}</h4>
        <span className="text-xs text-cream-dim bg-ink-900 px-3 py-1.5 rounded-full whitespace-nowrap flex-shrink-0 border border-line">
          {type.rates.length} level upgrade
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {type.rates.map((rate, idx) => (
          <RateCard key={`${rate.itemGrade}-${idx}`} rate={rate} />
        ))}
      </div>
    </div>
  )
}

/* ============================================================
   PAGE
   ============================================================ */

export default function UpgradeGuidePage() {
  const [selectedSlug, setSelectedSlug] = useState<string>(scrolls[0]?.slug ?? "")
  const selectedScroll = scrolls.find((s) => s.slug === selectedSlug) ?? null

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
              <h1 className="text-xl font-bold text-cream">Upgrade Guide</h1>
              <p className="text-sm text-cream-dim">Item upgrade rates and scroll information</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
          <aside className="space-y-6">
            <div>
              <div className="mb-2 px-1">
                <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-ink-700 border border-line text-cream-dim">V1</span>
                <span className="text-[10px] text-cream-dim/70 ml-2">Mevcut · ikonlu + chevron</span>
              </div>
              <ScrollListV1 scrolls={scrolls} selectedSlug={selectedSlug} onSelect={setSelectedSlug} />
            </div>
            <div>
              <div className="mb-2 px-1">
                <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-ink-700 border border-line text-cream-dim">V2</span>
                <span className="text-[10px] text-cream-dim/70 ml-2">Tab style · sol accent bar</span>
              </div>
              <ScrollListV2 scrolls={scrolls} selectedSlug={selectedSlug} onSelect={setSelectedSlug} />
            </div>
            <div>
              <div className="mb-2 px-1">
                <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-ink-700 border border-line text-cream-dim">V3</span>
                <span className="text-[10px] text-cream-dim/70 ml-2">Numbered · 01/02 indeks</span>
              </div>
              <ScrollListV3 scrolls={scrolls} selectedSlug={selectedSlug} onSelect={setSelectedSlug} />
            </div>
            <div>
              <div className="mb-2 px-1">
                <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-ink-700 border border-line text-cream-dim">V4</span>
                <span className="text-[10px] text-cream-dim/70 ml-2">Visual · büyük ikon + meta</span>
              </div>
              <ScrollListV4 scrolls={scrolls} selectedSlug={selectedSlug} onSelect={setSelectedSlug} />
            </div>
            <div>
              <div className="mb-2 px-1">
                <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-ink-700 border border-line text-cream-dim">V5</span>
                <span className="text-[10px] text-cream-dim/70 ml-2">V2 + ikon + fade çizgi separator</span>
              </div>
              <ScrollListV5 scrolls={scrolls} selectedSlug={selectedSlug} onSelect={setSelectedSlug} />
            </div>
            <div>
              <div className="mb-2 px-1">
                <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-ink-700 border border-line text-cream-dim">V6</span>
                <span className="text-[10px] text-cream-dim/70 ml-2">V2 + ikon + diamond separator</span>
              </div>
              <ScrollListV6 scrolls={scrolls} selectedSlug={selectedSlug} onSelect={setSelectedSlug} />
            </div>
            <div>
              <div className="mb-2 px-1">
                <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-ink-700 border border-line text-cream-dim">V7</span>
                <span className="text-[10px] text-cream-dim/70 ml-2">V2 + ikon + ayrı mini kartlar</span>
              </div>
              <ScrollListV7 scrolls={scrolls} selectedSlug={selectedSlug} onSelect={setSelectedSlug} />
            </div>
          </aside>

          <main className="card rounded-xl overflow-hidden">
            {selectedScroll ? (
              <>
                <ScrollHeader scroll={selectedScroll} />
                {selectedScroll.ratesByType?.length > 0 ? (
                  <div className="p-4 md:p-6 space-y-6">
                    {selectedScroll.ratesByType.map((type) => (
                      <TypeSection key={type.typeName} type={type} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 bg-ink-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-line">
                      <IconAlertCircle className="w-8 h-8 text-cream-dim" />
                    </div>
                    <p className="text-cream-dim text-sm">Bu scroll için veri bulunamadi.</p>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-gold-500/15 border border-gold-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <IconCircleCheck className="w-10 h-10 text-gold-400" />
                </div>
                <h3 className="font-display text-lg font-semibold text-cream mb-2">Scroll Sec</h3>
                <p className="text-cream-dim text-sm">Detayli bilgi icin sol taraftan bir scroll secin.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
