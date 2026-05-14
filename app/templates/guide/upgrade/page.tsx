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
   RATE CARD — Glassy Premium
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
   SCROLL LIST
   ============================================================ */

function ScrollList({
  scrolls,
  selectedSlug,
  onSelect,
}: {
  scrolls: Scroll[]
  selectedSlug: string
  onSelect: (slug: string) => void
}) {
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

/* ============================================================
   SCROLL HEADER + TYPE SECTION
   ============================================================ */

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
    <div className="rounded-xl border border-line overflow-hidden bg-ink-800/40">
      {/* Header strip */}
      <div className="px-4 py-2.5 flex items-center gap-3 border-b border-line bg-gold-500/[0.04]">
        <span className="w-1 h-5 rounded-full bg-gradient-to-b from-gold-400 to-gold-500 shrink-0" />
        <h4 className="font-display text-lg font-bold text-cream truncate flex-1 min-w-0">{type.typeName}</h4>
        <span className="text-xs text-cream-dim bg-ink-900 px-3 py-1.5 rounded-full whitespace-nowrap flex-shrink-0 border border-line">
          {type.rates.length} level upgrade
        </span>
      </div>

      {/* Grid */}
      <div className="p-4 md:p-5">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {type.rates.map((rate, idx) => (
            <RateCard key={`${rate.itemGrade}-${idx}`} rate={rate} />
          ))}
        </div>
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
          <aside>
            <ScrollList scrolls={scrolls} selectedSlug={selectedSlug} onSelect={setSelectedSlug} />
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
