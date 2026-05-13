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
} from "@tabler/icons-react"

/* ============================================================
   TYPES (originalden korundu)
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
  itemRate: number
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
      itemRate: success,
    })
  }
  return out
}

const scrolls: Scroll[] = [
  {
    scrollId1: 1001,
    scrollId2: null,
    itemName1: "Holy Water",
    itemName2: null,
    scrollName: "Holy Water",
    slug: "holy-water",
    hasDouble: false,
    rateCount: 9,
    ratesByType: [
      { typeName: "Weapon", rates: makeRates(1, 9, 1000, 10) },
      { typeName: "Armor", rates: makeRates(1, 9, 1500, 11) },
    ],
  },
  {
    scrollId1: 1002,
    scrollId2: null,
    itemName1: "Smelting Scroll",
    itemName2: null,
    scrollName: "Smelting Scroll",
    slug: "smelting-scroll",
    hasDouble: false,
    rateCount: 12,
    ratesByType: [
      { typeName: "Weapon", rates: makeRates(1, 12, 2500, 8) },
      { typeName: "Armor", rates: makeRates(1, 12, 3000, 9) },
      { typeName: "Accessory", rates: makeRates(1, 8, 5000, 12) },
    ],
  },
  {
    scrollId1: 1003,
    scrollId2: 1004,
    itemName1: "Holy Water",
    itemName2: "Smelting Anvil",
    scrollName: "Holy Water + Smelting Anvil",
    slug: "holy-water-anvil",
    hasDouble: true,
    rateCount: 10,
    ratesByType: [
      { typeName: "Weapon", rates: makeRates(1, 10, 4000, 7) },
      { typeName: "Armor", rates: makeRates(1, 10, 4500, 8) },
    ],
  },
  {
    scrollId1: 1005,
    scrollId2: null,
    itemName1: "Vorpal Scroll",
    itemName2: null,
    scrollName: "Vorpal Scroll",
    slug: "vorpal-scroll",
    hasDouble: false,
    rateCount: 7,
    ratesByType: [
      { typeName: "Weapon", rates: makeRates(1, 7, 8000, 13) },
    ],
  },
  {
    scrollId1: 1006,
    scrollId2: 1007,
    itemName1: "Vorpal Scroll",
    itemName2: "Premium Anvil",
    scrollName: "Vorpal + Premium Anvil",
    slug: "vorpal-premium-anvil",
    hasDouble: true,
    rateCount: 9,
    ratesByType: [
      { typeName: "Weapon", rates: makeRates(1, 9, 12000, 9) },
      { typeName: "Armor", rates: makeRates(1, 9, 13000, 10) },
      { typeName: "Accessory", rates: makeRates(1, 6, 18000, 14) },
    ],
  },
]

/* ============================================================
   ICON PLACEHOLDER (orijinaldeki ItemIcon yerine)
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
   COMPONENTS
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

function RateCard({ rate }: { rate: UpgradeRate }) {
  const grade = Number(rate.itemGrade)
  return (
    <div className="bg-ink-900 hover:bg-ink-800 border border-line hover:border-gold-500/40 rounded-xl p-4 transition-all duration-200">
      <div className="flex items-center justify-center mb-3 relative">
        <div className="w-14 h-14 bg-ink-800 rounded-lg flex items-center justify-center border border-line">
          <span className="font-display text-lg font-bold text-gold-400">+{grade}</span>
        </div>
        <div
          className="absolute -top-1 -right-1 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded border"
          style={{
            backgroundColor: rate.rarity.color,
            color: rate.rarity.textColor,
            borderColor: rate.rarity.color,
          }}
        >
          {rate.rarity.text}
        </div>
      </div>

      <div className="text-center mb-3">
        <p className="text-xs font-semibold text-cream leading-tight">
          +{grade} → +{grade + 1}
        </p>
      </div>

      <div className="mb-3">
        <div className="flex items-center justify-center mb-2">
          <span className="text-sm font-bold text-gold-400">{rate.successRate}%</span>
        </div>
        <div className="w-full bg-ink-800 rounded-full h-2 overflow-hidden">
          <div
            className="h-2 rounded-full transition-all"
            style={{
              width: `${Math.min(parseFloat(rate.successRate), 100)}%`,
              backgroundColor: rate.rarity.color,
            }}
          />
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

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3">
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
      {/* Top bar */}
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

      {/* Content */}
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
