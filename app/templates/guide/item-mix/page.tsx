"use client"

import { useState } from "react"
import Link from "next/link"
import {
  IconArrowLeft,
  IconPackage,
  IconChevronRight,
  IconChevronDown,
  IconAlertCircle,
  IconCircleCheck,
  IconBolt,
  IconDice,
  IconSparkles,
  IconUser,
} from "@tabler/icons-react"

/* ============================================================
   TYPES
   ============================================================ */

interface Material {
  itemId: number
  itemCount: number
  itemName: string
}

interface ExchangeItem {
  itemId: number
  itemCount: number
  dropRate: number
  dropRatePercent: number
  itemName: string
}

interface Mix {
  index: number
  npcName: string
  exchangeName: string
  successRate: number
  bonusRate: number
  materials: Material[]
  exchangeItems: ExchangeItem[]
}

interface Category {
  bType: number
  name: string
  npcName: string
  slug: string
  mixes: Mix[]
}

/* ============================================================
   MOCK DATA
   ============================================================ */

const categories: Category[] = [
  {
    bType: 1, name: "Silah Üretimi", npcName: "[Disciple of Hepa] Shozin", slug: "weapon-crafting",
    mixes: [
      {
        index: 1, npcName: "[Disciple of Hepa] Shozin", exchangeName: "Shard of Oblivion",
        successRate: 850, bonusRate: 950,
        materials: [
          { itemId: 100, itemCount: 5, itemName: "Iron Ingot" },
          { itemId: 101, itemCount: 3, itemName: "Mystic Crystal" },
          { itemId: 102, itemCount: 1, itemName: "Dragon Scale" },
        ],
        exchangeItems: [
          { itemId: 200, itemCount: 1, dropRate: 10000, dropRatePercent: 100, itemName: "Shard of Oblivion" },
        ],
      },
      {
        index: 2, npcName: "[Disciple of Hepa] Shozin", exchangeName: "Frozen Edge",
        successRate: 600, bonusRate: 750,
        materials: [
          { itemId: 103, itemCount: 8, itemName: "Frost Stone" },
          { itemId: 104, itemCount: 2, itemName: "Glacial Ore" },
        ],
        exchangeItems: [
          { itemId: 201, itemCount: 1, dropRate: 6000, dropRatePercent: 60, itemName: "Frozen Edge (Common)" },
          { itemId: 202, itemCount: 1, dropRate: 3000, dropRatePercent: 30, itemName: "Frozen Edge (Rare)" },
          { itemId: 203, itemCount: 1, dropRate: 1000, dropRatePercent: 10, itemName: "Frozen Edge (Epic)" },
        ],
      },
    ],
  },
  {
    bType: 2, name: "Zırh Üretimi", npcName: "Aria", slug: "armor-crafting",
    mixes: [
      {
        index: 3, npcName: "Aria", exchangeName: "Shadow Plate",
        successRate: 700, bonusRate: 850,
        materials: [
          { itemId: 110, itemCount: 6, itemName: "Shadow Cloth" },
          { itemId: 111, itemCount: 2, itemName: "Dark Essence" },
        ],
        exchangeItems: [
          { itemId: 210, itemCount: 1, dropRate: 10000, dropRatePercent: 100, itemName: "Shadow Plate" },
        ],
      },
      {
        index: 4, npcName: "Aria", exchangeName: "Mythril Helm",
        successRate: 500, bonusRate: 0,
        materials: [
          { itemId: 112, itemCount: 4, itemName: "Mythril Bar" },
          { itemId: 113, itemCount: 1, itemName: "Phoenix Feather" },
        ],
        exchangeItems: [
          { itemId: 211, itemCount: 1, dropRate: 7000, dropRatePercent: 70, itemName: "Mythril Helm" },
          { itemId: 212, itemCount: 1, dropRate: 3000, dropRatePercent: 30, itemName: "Mythril Helm +1" },
        ],
      },
    ],
  },
  {
    bType: 3, name: "Aksesuar Karışımı", npcName: "Mara", slug: "accessory-mixing",
    mixes: [
      {
        index: 5, npcName: "Mara", exchangeName: "Ring of Power",
        successRate: 400, bonusRate: 600,
        materials: [
          { itemId: 120, itemCount: 3, itemName: "Gold Ring Base" },
          { itemId: 121, itemCount: 5, itemName: "Power Gem" },
          { itemId: 122, itemCount: 1, itemName: "Ancient Rune" },
        ],
        exchangeItems: [
          { itemId: 220, itemCount: 1, dropRate: 5000, dropRatePercent: 50, itemName: "Ring of Power (HP)" },
          { itemId: 221, itemCount: 1, dropRate: 3500, dropRatePercent: 35, itemName: "Ring of Power (MP)" },
          { itemId: 222, itemCount: 1, dropRate: 1500, dropRatePercent: 15, itemName: "Ring of Power (ATK)" },
        ],
      },
    ],
  },
  {
    bType: 4, name: "Özel Karışımlar", npcName: "Vortex", slug: "special-mixes",
    mixes: [
      {
        index: 6, npcName: "Vortex", exchangeName: "Eternal Crystal",
        successRate: 300, bonusRate: 500,
        materials: [
          { itemId: 130, itemCount: 10, itemName: "Soul Fragment" },
          { itemId: 131, itemCount: 5, itemName: "Elemental Core" },
          { itemId: 132, itemCount: 3, itemName: "Time Shard" },
        ],
        exchangeItems: [
          { itemId: 230, itemCount: 1, dropRate: 4000, dropRatePercent: 40, itemName: "Eternal Crystal (Lesser)" },
          { itemId: 231, itemCount: 1, dropRate: 4000, dropRatePercent: 40, itemName: "Eternal Crystal (Greater)" },
          { itemId: 232, itemCount: 1, dropRate: 2000, dropRatePercent: 20, itemName: "Eternal Crystal (Perfect)" },
        ],
      },
      {
        index: 7, npcName: "Vortex", exchangeName: "Phoenix Stone",
        successRate: 200, bonusRate: 350,
        materials: [
          { itemId: 133, itemCount: 15, itemName: "Phoenix Feather" },
          { itemId: 134, itemCount: 1, itemName: "Phoenix Heart" },
        ],
        exchangeItems: [
          { itemId: 233, itemCount: 1, dropRate: 10000, dropRatePercent: 100, itemName: "Phoenix Stone" },
        ],
      },
    ],
  },
]

/* ============================================================
   HELPERS
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

function getDropRateColor(percent: number) {
  if (percent >= 50) return "#10b981"
  if (percent >= 30) return "#3b82f6"
  if (percent >= 10) return "#a855f7"
  return "#6b7280"
}

function getSuccessColor(rate10: number) {
  if (rate10 >= 100) return "#ef4444"
  if (rate10 >= 70) return "#10b981"
  if (rate10 >= 40) return "#3b82f6"
  return "#f59e0b"
}

/* ============================================================
   CATEGORY LIST (sidebar)
   ============================================================ */

function CategoryList({
  categories,
  selectedSlug,
  onSelect,
}: {
  categories: Category[]
  selectedSlug: string
  onSelect: (slug: string) => void
}) {
  return (
    <div className="card rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-line flex items-center gap-2">
        <span className="h-px w-6 bg-gold-500" />
        <h3 className="text-[11px] font-bold text-gold-400 uppercase tracking-[0.3em]">Kategoriler</h3>
        <span className="ml-auto text-[10px] font-bold tabular-nums px-2 py-0.5 rounded-full bg-gold-500/15 text-gold-400 border border-gold-500/30">
          {categories.length}
        </span>
      </div>
      <ul className="p-1">
        {categories.map((category, idx) => {
          const isActive = selectedSlug === category.slug
          return (
            <li key={category.slug}>
              <button
                type="button"
                onClick={() => onSelect(category.slug)}
                className={`w-full text-left px-3 py-2.5 rounded-md transition-colors flex items-center gap-3 group ${
                  isActive ? "bg-ink-900" : "hover:bg-ink-900/60"
                }`}
              >
                <span className={`w-1 h-9 rounded-full transition-all shrink-0 ${isActive ? "bg-gold-400" : "bg-transparent group-hover:bg-gold-500/30"}`} />
                <div className="flex-shrink-0 w-9 h-9 bg-ink-800 rounded-md border border-line flex items-center justify-center">
                  <IconPackage className={`w-4 h-4 ${isActive ? "text-gold-400" : "text-cream-dim"}`} />
                </div>
                <p className={`flex-1 min-w-0 text-sm font-semibold truncate ${isActive ? "text-gold-300" : "text-cream"}`}>
                  {category.name}
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
              {idx < categories.length - 1 && (
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
   CATEGORY HEADER (Stat dashboard)
   ============================================================ */

function CategoryHeader({ category }: { category: Category }) {
  const mixCount = category.mixes?.length || 0
  return (
    <div className="relative">
      <div className="p-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="w-12 h-12 rounded-lg bg-ink-800 border border-gold-500/30 flex items-center justify-center flex-shrink-0">
            <IconPackage className="w-6 h-6 text-gold-400" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[9px] uppercase tracking-[0.3em] text-gold-400/70 font-bold mb-1">Crafting category</div>
            <h3 className="font-display text-2xl font-black text-cream truncate">{category.name}</h3>
          </div>
          <div className="flex items-stretch gap-2 flex-wrap">
            <div className="px-3 py-2 rounded-lg border border-line bg-ink-900/60 text-center min-w-[80px]">
              <div className="font-display text-xl font-black text-gold-400 leading-none tabular-nums">{mixCount}</div>
              <div className="text-[9px] uppercase text-cream-dim/70 tracking-wider mt-1">tarif</div>
            </div>
            <div className="px-3 py-2 rounded-lg border border-line bg-ink-900/60 flex flex-col justify-center min-w-[100px] max-w-full">
              <div className="text-[9px] uppercase text-cream-dim/70 tracking-wider">NPC</div>
              <div className="text-sm font-bold text-cream leading-tight inline-flex items-center gap-1 mt-0.5 min-w-0">
                <IconUser className="w-3 h-3 text-gold-400 shrink-0" />
                <span className="truncate">{category.npcName}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-px bg-line" />
    </div>
  )
}

/* ============================================================
   BONUS BANNER (V3 gold stripe)
   ============================================================ */

function BonusItemInfo() {
  return (
    <div className="p-4 bg-ink-800/40 border-b border-line">
      <div className="flex items-stretch gap-3 rounded-lg overflow-hidden bg-ink-900/40 border border-line">
        <div className="w-1 bg-gradient-to-b from-gold-400 via-gold-500 to-gold-600" />
        <div className="py-3 pr-4 flex items-center gap-3 flex-1 min-w-0">
          <IconSparkles className="w-4 h-4 text-gold-400 shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="text-sm font-bold text-cream">Bonus Şans Item'i</div>
            <div className="text-[11px] text-cream-dim mt-0.5">
              Tariflerde bonus item kullanırsan başarı oranı belirgin şekilde artar.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ============================================================
   PRODUCTION CARD — Blueprint Flow (Inputs → Process → Output)
   ============================================================ */

function ProductionCard({
  mix,
  isOpen,
  onToggle,
}: {
  mix: Mix
  isOpen: boolean
  onToggle: () => void
}) {
  const successPercent = mix.successRate / 10
  const bonusPercent = mix.bonusRate / 10
  const successColor = getSuccessColor(successPercent)
  const hasMultiple = mix.exchangeItems.length > 1
  const hasBonus = mix.bonusRate > 0
  const radius = 36
  const circ = 2 * Math.PI * radius
  const offset = circ - (Math.min(successPercent, 100) / 100) * circ

  return (
    <div
      className={`rounded-xl border transition-colors relative overflow-hidden ${
        isOpen ? "bg-ink-900/60 border-gold-500/40" : "bg-ink-800/20 border-line hover:border-gold-500/30"
      }`}
    >
      {/* Blueprint grid bg (sadece açıkken görünür) */}
      {isOpen && (
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
      )}

      <button type="button" onClick={onToggle} aria-expanded={isOpen} className="relative w-full text-left p-4 flex items-center gap-4 group">
        <div className="w-12 h-12 rounded-lg bg-ink-800 border border-gold-500/30 flex items-center justify-center overflow-hidden shrink-0">
          <ItemIcon id={mix.exchangeItems[0]?.itemId} alt={mix.exchangeName} size={44} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={`font-display text-lg font-bold truncate ${isOpen ? "text-gold-300" : "text-cream group-hover:text-gold-300"}`}>
            {mix.exchangeName}
          </h3>
          <div className="flex items-center gap-2 text-[11px] text-cream-dim mt-0.5">
            <IconUser className="w-3 h-3" /> {mix.npcName}
            {hasMultiple && (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-400/10 text-amber-200 border border-amber-400/30 font-semibold text-[10px]">
                <IconDice className="w-3 h-3" /> {mix.exchangeItems.length}x
              </span>
            )}
          </div>
        </div>
        <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-all shrink-0 ${isOpen ? "bg-gold-500/20 text-gold-300" : "bg-ink-800 text-cream-dim group-hover:bg-gold-500/15 group-hover:text-gold-400"}`}>
          <IconChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </div>
      </button>

      {isOpen && (
        <div className="relative px-5 pb-5 pt-2">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-4 items-stretch">
            {/* INPUTS */}
            <div className="rounded-lg border border-line bg-ink-900/70 p-4">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-line">
                <span className="text-[9px] uppercase tracking-[0.25em] text-sky-300/80 font-bold">Inputs</span>
                <span className="ml-auto text-[10px] text-cream-dim tabular-nums">{mix.materials.length} item</span>
              </div>
              <div className="space-y-2">
                {mix.materials.map((m, i) => (
                  <div
                    key={`mat-${m.itemId}-${i}`}
                    className="flex items-center gap-2.5 px-2 py-1.5 -mx-2 rounded-md border border-transparent hover:border-gold-500/25 hover:bg-gold-500/[0.04] transition-colors"
                  >
                    <ItemIcon size={32} />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-cream truncate">{m.itemName}</div>
                    </div>
                    <span className="text-xs font-bold tabular-nums text-gold-400">x{m.itemCount}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* PROCESS — center: large gauge + arrows */}
            <div className="flex flex-col items-center justify-center px-2 lg:px-0 lg:w-[180px]">
              <span className="text-[9px] uppercase tracking-[0.3em] text-gold-400 font-bold mb-2 hidden lg:block">Process</span>
              <div className="flex items-center gap-2 lg:flex-col">
                <div className="hidden lg:block h-px w-16 bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
                <div className="lg:hidden w-px h-8 bg-gradient-to-b from-transparent via-gold-500/40 to-transparent" />
              </div>
              <div className="relative w-24 h-24 my-2">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 88 88">
                  <circle cx="44" cy="44" r={radius} stroke="rgba(255,255,255,0.08)" strokeWidth="6" fill="none" />
                  <circle cx="44" cy="44" r={radius} stroke={successColor} strokeWidth="6" fill="none" strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset} style={{ transition: "stroke-dashoffset 0.6s ease" }} />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-mono text-xl font-black tabular-nums leading-none" style={{ color: successColor }}>
                    {successPercent.toFixed(0)}
                  </span>
                  <span className="text-[10px] text-cream-dim mt-0.5">success</span>
                </div>
              </div>
              {hasBonus && (
                <div className="text-[10px] inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-300 border border-sky-400/25">
                  <IconSparkles className="w-3 h-3" /> bonus +{(bonusPercent - successPercent).toFixed(1)}%
                </div>
              )}
              <div className="flex items-center gap-2 lg:flex-col mt-2">
                <div className="hidden lg:block h-px w-16 bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
                <div className="lg:hidden w-px h-8 bg-gradient-to-b from-transparent via-gold-500/40 to-transparent" />
              </div>
            </div>

            {/* OUTPUT */}
            <div className="rounded-lg border border-line bg-ink-900/70 p-4">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-line">
                <span className="text-[9px] uppercase tracking-[0.25em] text-teal-300/80 font-bold">Output</span>
                <span className="ml-auto text-[10px] text-cream-dim tabular-nums">
                  {mix.exchangeItems.length} {hasMultiple ? "olası" : "item"}
                </span>
              </div>
              <div className="space-y-2">
                {mix.exchangeItems.map((it, i) => {
                  const c = getDropRateColor(it.dropRatePercent)
                  return (
                    <div
                      key={`res-${it.itemId}-${i}`}
                      className="flex items-center gap-2.5 px-2 py-1.5 -mx-2 rounded-md border border-transparent hover:border-gold-500/25 hover:bg-gold-500/[0.04] transition-colors"
                    >
                      <ItemIcon size={32} />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-cream truncate">{it.itemName}</div>
                        <div className="w-full bg-ink-800 rounded-full h-1 mt-1 overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${it.dropRatePercent}%`, backgroundColor: c }} />
                        </div>
                      </div>
                      <span className="text-xs font-bold tabular-nums" style={{ color: c }}>{it.dropRatePercent}%</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ============================================================
   PAGE
   ============================================================ */

export default function ItemMixGuidePage() {
  const [selectedSlug, setSelectedSlug] = useState<string>(categories[0]?.slug ?? "")
  const selectedCategory = categories.find((c) => c.slug === selectedSlug) ?? null

  // Accordion: kategori değişince ilk recipe açık, diğerleri kapalı
  const [openIndex, setOpenIndex] = useState<number | null>(
    selectedCategory?.mixes[0]?.index ?? null
  )

  const handleSelectCategory = (slug: string) => {
    setSelectedSlug(slug)
    const cat = categories.find((c) => c.slug === slug)
    setOpenIndex(cat?.mixes[0]?.index ?? null)
  }

  const toggle = (idx: number) => {
    setOpenIndex((curr) => (curr === idx ? null : idx))
  }

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
              <IconPackage className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-cream">Item Mix Guide</h1>
              <p className="text-sm text-cream-dim">Item crafting and mixing recipes</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
          <aside>
            <CategoryList categories={categories} selectedSlug={selectedSlug} onSelect={handleSelectCategory} />
          </aside>

          <main className="card rounded-xl overflow-hidden">
            {selectedCategory ? (
              <>
                <CategoryHeader category={selectedCategory} />
                <BonusItemInfo />
                <div className="p-4 md:p-6 space-y-3">
                  {selectedCategory.mixes.length > 0 ? (
                    selectedCategory.mixes.map((mix) => (
                      <ProductionCard
                        key={mix.index}
                        mix={mix}
                        isOpen={openIndex === mix.index}
                        onToggle={() => toggle(mix.index)}
                      />
                    ))
                  ) : (
                    <div className="text-center py-16">
                      <div className="w-16 h-16 bg-ink-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-line">
                        <IconAlertCircle className="w-8 h-8 text-cream-dim" />
                      </div>
                      <p className="text-cream-dim text-sm">Bu kategori için tarif bulunamadı.</p>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-gold-500/15 border border-gold-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <IconCircleCheck className="w-10 h-10 text-gold-400" />
                </div>
                <h3 className="font-display text-lg font-semibold text-cream mb-2">Kategori Seç</h3>
                <p className="text-cream-dim text-sm">Detaylı tarifleri görmek için sol taraftan bir kategori seç.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
