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
  dropRate: number          // 0-10000 (raw)
  dropRatePercent: number   // 0-100
  itemName: string
}

interface Mix {
  index: number
  npcName: string
  exchangeName: string
  successRate: number   // 0-1000 (raw, /10 = %)
  bonusRate: number     // 0-1000 (raw, /10 = %, 0 = yok)
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
    bType: 1, name: "Silah Üretimi", npcName: "Letto", slug: "weapon-crafting",
    mixes: [
      {
        index: 1, npcName: "Letto", exchangeName: "Shard of Oblivion",
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
        index: 2, npcName: "Letto", exchangeName: "Frozen Edge",
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
  if (percent >= 50) return "#10b981"   // emerald
  if (percent >= 30) return "#3b82f6"   // blue
  if (percent >= 10) return "#a855f7"   // purple
  return "#6b7280"                       // gray
}

function getSuccessColor(rate10: number) {
  if (rate10 >= 100) return "#ef4444"    // raw 1000+ = >100% (kalıt mantık)
  if (rate10 >= 70) return "#10b981"
  if (rate10 >= 40) return "#3b82f6"
  return "#f59e0b"
}

/* ============================================================
   CATEGORY LIST (V5 stili — Upgrade ile aynı)
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
   CATEGORY HEADER
   ============================================================ */

function CategoryHeader({ category }: { category: Category }) {
  const mixCount = category.mixes?.length || 0
  return (
    <div className="relative">
      <div className="p-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="w-16 h-16 rounded-2xl bg-ink-800 border border-line flex items-center justify-center flex-shrink-0">
            <IconPackage className="w-8 h-8 text-gold-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-xl font-bold text-cream mb-2 truncate">{category.name}</h3>
            <div className="flex items-center gap-4 text-sm flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                <span className="text-cream-dim">{mixCount} farklı tarif</span>
              </div>
              <div className="flex items-center gap-2">
                <IconUser className="w-3.5 h-3.5 text-violet-400" />
                <span className="text-violet-400 font-medium">{category.npcName}</span>
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
   BONUS ITEM BANNER
   ============================================================ */

function BonusItemInfo() {
  return (
    <div className="p-4 bg-ink-800/40 border-b border-line">
      <div className="flex items-center gap-3 bg-gradient-to-r from-sky-500/[0.06] via-sky-500/[0.03] to-transparent border border-sky-400/25 rounded-xl p-3">
        <div className="w-10 h-10 flex-shrink-0 bg-ink-900 rounded-lg border border-sky-400/25 flex items-center justify-center">
          <IconSparkles className="w-5 h-5 text-sky-300" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-bold text-cream mb-0.5">Bonus Şans Item'i</div>
          <div className="text-xs text-cream-dim">
            Tariflerde bonus item kullanırsan başarı oranı belirgin şekilde artar.
          </div>
        </div>
      </div>
    </div>
  )
}

/* ============================================================
   MATERIAL CARD
   ============================================================ */

function MaterialCard({ material }: { material: Material }) {
  return (
    <div className="bg-ink-900 hover:bg-ink-800/80 border border-line hover:border-gold-500/40 rounded-lg p-3 transition-colors">
      <div className="flex items-center gap-3">
        <ItemIcon id={material.itemId} alt={material.itemName} size={40} />
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-cream text-sm truncate">{material.itemName}</div>
          <div className="text-[11px] text-cream-dim mt-0.5">{material.itemCount} adet</div>
        </div>
        <div className="bg-gold-500 text-ink-950 text-xs font-bold px-2 py-0.5 rounded-full tabular-nums">
          x{material.itemCount}
        </div>
      </div>
    </div>
  )
}

/* ============================================================
   EXCHANGE (RESULT) CARD — Glassy stil
   ============================================================ */

function ExchangeItemCard({ item }: { item: ExchangeItem }) {
  const color = getDropRateColor(item.dropRatePercent)
  return (
    <div className="relative rounded-xl overflow-hidden group isolate">
      <div
        className="absolute inset-0 rounded-xl opacity-50 group-hover:opacity-90 transition"
        style={{ background: `linear-gradient(135deg, ${color}25 0%, transparent 60%, ${color}10 100%)` }}
      />
      <div className="absolute inset-0 rounded-xl backdrop-blur-sm bg-ink-900/70" />
      <div
        className="absolute inset-0 rounded-xl border-2 pointer-events-none"
        style={{ borderColor: `${color}30` }}
      />
      <div className="relative p-3 flex items-start gap-3">
        <div className="w-12 h-12 rounded-lg bg-ink-900 border border-line flex items-center justify-center shrink-0 overflow-hidden">
          <ItemIcon id={item.itemId} alt={item.itemName} size={44} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-cream text-sm mb-2 truncate">{item.itemName}</div>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-cream-dim">Drop chance</span>
            <span className="font-bold tabular-nums" style={{ color }}>{item.dropRatePercent}%</span>
          </div>
          <div className="w-full bg-ink-800/60 rounded-full h-1.5 overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{ width: `${Math.min(item.dropRatePercent, 100)}%`, backgroundColor: color }}
            />
          </div>
          {item.itemCount > 1 && (
            <div className="text-[10px] text-cream-dim mt-1.5">
              Adet: <span className="font-semibold text-cream">{item.itemCount}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ============================================================
   PRODUCTION CARD (recipe)
   ============================================================ */

/* Body içeriği — V1, V2, V3 paylaşır */
function RecipeBody({ mix }: { mix: Mix }) {
  const successPercent = mix.successRate / 10
  const bonusPercent = mix.bonusRate / 10
  const successColor = getSuccessColor(successPercent)
  const hasBonus = mix.bonusRate > 0
  const hasMultiple = mix.exchangeItems.length > 1

  return (
    <div className="px-5 pb-5 space-y-5 border-t border-line/70 pt-5">
      <div className="rounded-lg border border-line bg-ink-900/60 p-4 space-y-3">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-slate-400/15 border border-slate-400/30 grid place-items-center text-[10px] font-bold text-slate-300">1</span>
          <span className="text-sm font-semibold text-cream">Üretim başarı oranı</span>
        </div>
        <div>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-cream-dim">Temel oran</span>
            <span className="font-bold tabular-nums" style={{ color: successColor }}>{successPercent.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-ink-800 rounded-full h-2 overflow-hidden">
            <div className="h-full rounded-full transition-all" style={{ width: `${Math.min(successPercent, 100)}%`, backgroundColor: successColor }} />
          </div>
        </div>
        {hasBonus && (
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="inline-flex items-center gap-1.5 text-sky-300 font-medium">
                <IconSparkles className="w-3 h-3" /> Bonus item ile
              </span>
              <span className="font-bold tabular-nums text-sky-300">{bonusPercent.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-ink-800 rounded-full h-2 overflow-hidden">
              <div className="h-full rounded-full bg-sky-400/80" style={{ width: `${Math.min(bonusPercent, 100)}%` }} />
            </div>
          </div>
        )}
      </div>

      {hasMultiple && (
        <div className="bg-gradient-to-r from-amber-400/[0.06] to-transparent border border-amber-400/25 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-amber-400/15 border border-amber-400/30 grid place-items-center text-[10px] font-bold text-amber-200">2</span>
            <span className="text-xs font-medium text-amber-200/85">
              Üretim başarılı olduğunda, aşağıdaki olası sonuçlardan biri rastgele drop olur.
            </span>
          </div>
        </div>
      )}

      <div>
        <h4 className="font-display text-base font-bold text-cream mb-3 flex items-center gap-2">
          <IconBolt className="w-4 h-4 text-gold-400" /> Gerekli malzemeler
        </h4>
        {mix.materials.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {mix.materials.map((m, i) => (
              <MaterialCard key={`${mix.index}-mat-${m.itemId}-${i}`} material={m} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-cream-dim">Malzeme bilgisi bulunamadı.</p>
        )}
      </div>

      {mix.exchangeItems.length > 0 && (
        <div>
          <h4 className="font-display text-base font-bold text-cream mb-3 flex items-center gap-2">
            <IconCircleCheck className="w-4 h-4 text-teal-400/80" />
            {hasMultiple ? "Olası sonuçlar" : "Sonuç"}
            {hasMultiple && (
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-200 border border-amber-400/30">
                {mix.exchangeItems.length} farklı item
              </span>
            )}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {mix.exchangeItems.map((it, i) => (
              <ExchangeItemCard key={`${mix.index}-res-${it.itemId}-${i}`} item={it} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/* ============================================================
   V1 — Mevcut: Kompakt header
   ============================================================ */

function ProductionCardV1({ mix, isOpen, onToggle }: { mix: Mix; isOpen: boolean; onToggle: () => void }) {
  const successPercent = mix.successRate / 10
  const successColor = getSuccessColor(successPercent)
  const hasMultiple = mix.exchangeItems.length > 1

  return (
    <div className={`rounded-xl border transition-colors ${isOpen ? "bg-ink-800/40 border-gold-500/30" : "bg-ink-800/20 border-line hover:border-gold-500/30"}`}>
      <button type="button" onClick={onToggle} aria-expanded={isOpen} className="w-full text-left p-4 flex items-center gap-4 group">
        <div className="w-12 h-12 rounded-lg bg-ink-800 border border-line flex items-center justify-center overflow-hidden flex-shrink-0">
          <ItemIcon id={mix.exchangeItems[0]?.itemId} alt={mix.exchangeName} size={44} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={`font-display text-lg font-bold truncate ${isOpen ? "text-gold-300" : "text-cream group-hover:text-gold-300"} transition-colors`}>
            {mix.exchangeName}
          </h3>
          <div className="flex items-center gap-2 text-xs text-cream-dim flex-wrap mt-0.5">
            <span className="inline-flex items-center gap-1"><IconUser className="w-3 h-3" /> {mix.npcName}</span>
            <span className="text-cream-dim/40">·</span>
            <span className="font-semibold tabular-nums" style={{ color: successColor }}>{successPercent.toFixed(1)}%</span>
            {hasMultiple && (
              <>
                <span className="text-cream-dim/40">·</span>
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-400/10 text-amber-200 border border-amber-400/30 font-semibold text-[10px]">
                  <IconDice className="w-3 h-3" /> {mix.exchangeItems.length}x
                </span>
              </>
            )}
          </div>
        </div>
        <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-all shrink-0 ${isOpen ? "bg-gold-500/20 text-gold-300" : "bg-ink-800 text-cream-dim group-hover:bg-gold-500/15 group-hover:text-gold-400"}`}>
          <IconChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </div>
      </button>
      {isOpen && <RecipeBody mix={mix} />}
    </div>
  )
}

/* ============================================================
   V2 — Stat card: sağda büyük circular gauge
   ============================================================ */

function ProductionCardV2({ mix, isOpen, onToggle }: { mix: Mix; isOpen: boolean; onToggle: () => void }) {
  const successPercent = mix.successRate / 10
  const successColor = getSuccessColor(successPercent)
  const hasMultiple = mix.exchangeItems.length > 1
  const hasBonus = mix.bonusRate > 0
  const radius = 26
  const circ = 2 * Math.PI * radius
  const offset = circ - (Math.min(successPercent, 100) / 100) * circ

  return (
    <div className={`rounded-xl border transition-colors overflow-hidden ${isOpen ? "bg-ink-800/40 border-gold-500/30" : "bg-ink-800/20 border-line hover:border-gold-500/30"}`}>
      <button type="button" onClick={onToggle} aria-expanded={isOpen} className="w-full text-left p-4 flex items-center gap-4 group">
        <div
          className="w-14 h-14 rounded-xl bg-ink-800 border flex items-center justify-center overflow-hidden flex-shrink-0"
          style={{ borderColor: `${successColor}40` }}
        >
          <ItemIcon id={mix.exchangeItems[0]?.itemId} alt={mix.exchangeName} size={48} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={`font-display text-lg font-bold truncate ${isOpen ? "text-gold-300" : "text-cream group-hover:text-gold-300"}`}>
            {mix.exchangeName}
          </h3>
          <div className="flex items-center gap-2 text-xs text-cream-dim mt-1 flex-wrap">
            <span className="inline-flex items-center gap-1"><IconUser className="w-3 h-3" /> {mix.npcName}</span>
            <span className="inline-flex items-center gap-1"><IconBolt className="w-3 h-3 text-gold-400" /> {mix.materials.length} malzeme</span>
            {hasMultiple && (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-400/10 text-amber-200 border border-amber-400/30 font-semibold text-[10px]">
                <IconDice className="w-3 h-3" /> {mix.exchangeItems.length}x
              </span>
            )}
            {hasBonus && (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-400/25 font-semibold text-[10px]">
                <IconSparkles className="w-3 h-3" /> bonus
              </span>
            )}
          </div>
        </div>
        <div className="relative w-16 h-16 shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r={radius} stroke="rgba(255,255,255,0.08)" strokeWidth="5" fill="none" />
            <circle cx="32" cy="32" r={radius} stroke={successColor} strokeWidth="5" fill="none" strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset} style={{ transition: "stroke-dashoffset 0.6s ease" }} />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-mono text-sm font-bold tabular-nums leading-none" style={{ color: successColor }}>
              {successPercent.toFixed(0)}
            </span>
            <span className="text-[8px] text-cream-dim leading-none mt-0.5">%</span>
          </div>
        </div>
        <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-all shrink-0 ${isOpen ? "bg-gold-500/20 text-gold-300" : "bg-ink-800 text-cream-dim group-hover:bg-gold-500/15 group-hover:text-gold-400"}`}>
          <IconChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </div>
      </button>
      {isOpen && <RecipeBody mix={mix} />}
    </div>
  )
}

/* ============================================================
   V3 — Material peek: kapalı header'da material ikon strip
   ============================================================ */

function ProductionCardV3({ mix, isOpen, onToggle }: { mix: Mix; isOpen: boolean; onToggle: () => void }) {
  const successPercent = mix.successRate / 10
  const successColor = getSuccessColor(successPercent)
  const hasMultiple = mix.exchangeItems.length > 1

  return (
    <div className={`rounded-xl border transition-colors ${isOpen ? "bg-ink-800/40 border-gold-500/30" : "bg-ink-800/20 border-line hover:border-gold-500/30"}`}>
      <button type="button" onClick={onToggle} aria-expanded={isOpen} className="w-full text-left p-4 group">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-lg bg-ink-800 border border-line flex items-center justify-center overflow-hidden flex-shrink-0">
            <ItemIcon id={mix.exchangeItems[0]?.itemId} alt={mix.exchangeName} size={40} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className={`font-display text-base font-bold truncate ${isOpen ? "text-gold-300" : "text-cream group-hover:text-gold-300"}`}>
                {mix.exchangeName}
              </h3>
              <span className="font-mono text-[11px] tabular-nums font-bold px-1.5 py-0.5 rounded border" style={{ color: successColor, borderColor: `${successColor}50`, backgroundColor: `${successColor}15` }}>
                {successPercent.toFixed(1)}%
              </span>
              {hasMultiple && (
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-400/10 text-amber-200 border border-amber-400/30 font-semibold text-[10px]">
                  <IconDice className="w-3 h-3" /> {mix.exchangeItems.length}x
                </span>
              )}
            </div>
            <div className="text-[11px] text-cream-dim mt-0.5 inline-flex items-center gap-1">
              <IconUser className="w-3 h-3" /> {mix.npcName}
            </div>
          </div>
          <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-all shrink-0 ${isOpen ? "bg-gold-500/20 text-gold-300" : "bg-ink-800 text-cream-dim group-hover:bg-gold-500/15 group-hover:text-gold-400"}`}>
            <IconChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
          </div>
        </div>

        {/* Material peek strip — sadece kapalıyken */}
        {!isOpen && (
          <div className="mt-3 ml-[60px] flex items-center gap-2 flex-wrap">
            <span className="text-[10px] uppercase tracking-wider text-cream-dim/70 font-bold">Malzeme:</span>
            <div className="flex items-center -space-x-1.5">
              {mix.materials.slice(0, 5).map((m, i) => (
                <div key={`peek-${m.itemId}-${i}`} className="relative" title={`${m.itemName} x${m.itemCount}`}>
                  <ItemIcon size={26} />
                  <span className="absolute -bottom-1 -right-1 text-[8px] font-bold bg-gold-500 text-ink-950 rounded-full px-1 leading-tight tabular-nums">
                    x{m.itemCount}
                  </span>
                </div>
              ))}
              {mix.materials.length > 5 && (
                <div className="w-[26px] h-[26px] rounded-md bg-ink-800 border border-line flex items-center justify-center text-[9px] font-bold text-cream-dim ml-1.5">
                  +{mix.materials.length - 5}
                </div>
              )}
            </div>
          </div>
        )}
      </button>
      {isOpen && <RecipeBody mix={mix} />}
    </div>
  )
}

/* ============================================================
   V4 — Blueprint flow: 3 kolon (INPUTS → PROCESS → OUTPUT)
   ============================================================ */

function ProductionCardV4({ mix, isOpen, onToggle }: { mix: Mix; isOpen: boolean; onToggle: () => void }) {
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
        <div className="flex items-center gap-1 shrink-0">
          <span className="w-1 h-10 rounded-full bg-gradient-to-b from-gold-400 to-gold-600" />
          <div className="w-12 h-12 rounded-lg bg-ink-800 border border-gold-500/30 flex items-center justify-center overflow-hidden">
            <ItemIcon id={mix.exchangeItems[0]?.itemId} alt={mix.exchangeName} size={44} />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[9px] uppercase tracking-[0.3em] text-gold-400/70 font-bold mb-0.5">Recipe blueprint</div>
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
          {/* 3-kolon flow layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-4 items-stretch">
            {/* INPUTS */}
            <div className="rounded-lg border border-line bg-ink-900/70 p-4">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-line">
                <span className="text-[9px] uppercase tracking-[0.25em] text-sky-300/80 font-bold">Inputs</span>
                <span className="ml-auto text-[10px] text-cream-dim tabular-nums">{mix.materials.length} item</span>
              </div>
              <div className="space-y-2">
                {mix.materials.map((m, i) => (
                  <div key={`v4-mat-${m.itemId}-${i}`} className="flex items-center gap-2.5">
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
              {/* Arrow in (mobile = down, desktop = right) */}
              <div className="flex items-center gap-2 lg:flex-col">
                <div className="hidden lg:block h-px w-12 bg-gradient-to-r from-sky-400/35 to-gold-500/40" />
                <div className="lg:hidden w-px h-6 bg-gradient-to-b from-sky-400/35 to-gold-500/40" />
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
                <div className="hidden lg:block h-px w-12 bg-gradient-to-r from-gold-500/40 to-teal-400/35" />
                <div className="lg:hidden w-px h-6 bg-gradient-to-b from-gold-500/40 to-teal-400/35" />
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
                    <div key={`v4-res-${it.itemId}-${i}`} className="flex items-center gap-2.5">
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
   VARIANT SECTION (showcase wrapper)
   ============================================================ */

function VariantSection({
  tag,
  title,
  mixes,
  openIndex,
  onToggle,
  Card,
}: {
  tag: string
  title: string
  mixes: Mix[]
  openIndex: number | null
  onToggle: (idx: number) => void
  Card: React.ComponentType<{ mix: Mix; isOpen: boolean; onToggle: () => void }>
}) {
  return (
    <section>
      <div className="mb-3 flex items-center gap-2">
        <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-ink-700 border border-line text-cream-dim">{tag}</span>
        <span className="text-xs text-cream-dim/80">{title}</span>
      </div>
      <div className="space-y-3">
        {mixes.map((mix) => (
          <Card
            key={`${tag}-${mix.index}`}
            mix={mix}
            isOpen={openIndex === mix.index}
            onToggle={() => onToggle(mix.index)}
          />
        ))}
      </div>
    </section>
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
                <div className="p-4 md:p-6 space-y-10">
                  {selectedCategory.mixes.length > 0 ? (
                    <>
                      <VariantSection tag="V1" title="Mevcut · Kompakt header" mixes={selectedCategory.mixes} openIndex={openIndex} onToggle={toggle} Card={ProductionCardV1} />
                      <VariantSection tag="V2" title="Stat Card · Sağda büyük circular gauge" mixes={selectedCategory.mixes} openIndex={openIndex} onToggle={toggle} Card={ProductionCardV2} />
                      <VariantSection tag="V3" title="Material Peek · Kapalıyken malzeme ikonları görünür" mixes={selectedCategory.mixes} openIndex={openIndex} onToggle={toggle} Card={ProductionCardV3} />
                      <VariantSection tag="V4" title="Blueprint Flow · Inputs → Process → Output (hayal)" mixes={selectedCategory.mixes} openIndex={openIndex} onToggle={toggle} Card={ProductionCardV4} />
                    </>
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
