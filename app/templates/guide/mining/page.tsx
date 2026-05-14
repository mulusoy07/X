"use client"

import { useState } from "react"
import Link from "next/link"
import {
  IconArrowLeft,
  IconPick,
  IconChevronRight,
  IconAlertCircle,
  IconCircleCheck,
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

interface MineItem {
  zoneId: string
  reqItemId: number
  reqItemName: string | null
  itemId: number
  itemName: string
  itemCount: number
  dropRate: string   // "12.5"
  rarity: Rarity
}

interface Pickaxe {
  pickaxeId: number
  pickaxeName: string
  slug: string
  mines: MineItem[]
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
}

function makeMines(seed: string, count: number, ratesByRarity: Record<string, number>): MineItem[] {
  const itemPool = [
    { name: "Iron Ore", rarity: RARITY.common },
    { name: "Copper Ore", rarity: RARITY.common },
    { name: "Coal", rarity: RARITY.common },
    { name: "Silver Ore", rarity: RARITY.uncommon },
    { name: "Gold Ore", rarity: RARITY.uncommon },
    { name: "Mythril Ore", rarity: RARITY.rare },
    { name: "Adamantite", rarity: RARITY.rare },
    { name: "Phoenix Stone", rarity: RARITY.epic },
    { name: "Dragon Heart", rarity: RARITY.epic },
    { name: "Eternium Shard", rarity: RARITY.legendary },
    { name: "Sapphire Crystal", rarity: RARITY.uncommon },
    { name: "Ruby Cluster", rarity: RARITY.rare },
  ]
  return Array.from({ length: count }, (_, i) => {
    const item = itemPool[i % itemPool.length]
    const baseRate = ratesByRarity[item.rarity.text.toLowerCase()] ?? 5
    const jitter = (i * 37) % 30
    return {
      zoneId: seed,
      reqItemId: i % 3 === 0 ? 9000 + i : 0,
      reqItemName: i % 3 === 0 ? "Mining Permit" : null,
      itemId: 1000 + i,
      itemName: item.name,
      itemCount: i % 4 === 0 ? 2 : 1,
      dropRate: Math.max(0.5, baseRate - jitter * 0.1).toFixed(1),
      rarity: item.rarity,
    }
  })
}

const ZONES = ["Luferson Castle", "Elmorad Castle"] as const

function buildPickaxe(id: number, name: string, slug: string, ratesByRarity: Record<string, number>, countPerZone: number): Pickaxe {
  return {
    pickaxeId: id,
    pickaxeName: name,
    slug,
    mines: ZONES.flatMap((zone, zi) =>
      makeMines(zone, countPerZone, ratesByRarity).map((m, i) => ({
        ...m,
        zoneId: zone,
        itemId: m.itemId + zi * 100,
      }))
    ),
  }
}

const pickaxes: Pickaxe[] = [
  buildPickaxe(501, "Wooden Pickaxe", "wooden", { common: 35, uncommon: 12, rare: 3, epic: 0.5, legendary: 0.1 }, 6),
  buildPickaxe(502, "Iron Pickaxe", "iron", { common: 30, uncommon: 18, rare: 7, epic: 1.5, legendary: 0.3 }, 8),
  buildPickaxe(503, "Steel Pickaxe", "steel", { common: 25, uncommon: 22, rare: 12, epic: 3, legendary: 0.8 }, 8),
  buildPickaxe(504, "Mythril Pickaxe", "mythril", { common: 20, uncommon: 25, rare: 18, epic: 6, legendary: 2 }, 9),
  buildPickaxe(505, "Dragonbone Pickaxe", "dragonbone", { common: 15, uncommon: 25, rare: 25, epic: 12, legendary: 5 }, 9),
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

/* ============================================================
   PICKAXE LIST (sidebar — V5)
   ============================================================ */

function PickaxeList({
  pickaxes,
  selectedSlug,
  onSelect,
}: {
  pickaxes: Pickaxe[]
  selectedSlug: string
  onSelect: (slug: string) => void
}) {
  return (
    <div className="card rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-line flex items-center gap-2">
        <span className="h-px w-6 bg-gold-500" />
        <h3 className="text-[11px] font-bold text-gold-400 uppercase tracking-[0.3em]">Kazma Türleri</h3>
        <span className="ml-auto text-[10px] font-bold tabular-nums px-2 py-0.5 rounded-full bg-gold-500/15 text-gold-400 border border-gold-500/30">
          {pickaxes.length}
        </span>
      </div>
      <ul className="p-1">
        {pickaxes.map((p, idx) => {
          const isActive = selectedSlug === p.slug
          return (
            <li key={p.slug}>
              <button
                type="button"
                onClick={() => onSelect(p.slug)}
                className={`w-full text-left px-3 py-2.5 rounded-md transition-colors flex items-center gap-3 group ${
                  isActive ? "bg-ink-900" : "hover:bg-ink-900/60"
                }`}
              >
                <span className={`w-1 h-9 rounded-full transition-all shrink-0 ${isActive ? "bg-gold-400" : "bg-transparent group-hover:bg-gold-500/30"}`} />
                <ItemIcon id={p.pickaxeId} alt={p.pickaxeName} size={36} />
                <p className={`flex-1 min-w-0 text-sm font-semibold truncate ${isActive ? "text-gold-300" : "text-cream"}`}>
                  {p.pickaxeName}
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
              {idx < pickaxes.length - 1 && (
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
   PICKAXE HEADER (Stat dashboard)
   ============================================================ */

function PickaxeHeader({ pickaxe }: { pickaxe: Pickaxe }) {
  const totalMines = pickaxe.mines?.length || 0
  return (
    <div className="relative">
      <div className="p-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="w-12 h-12 rounded-lg bg-ink-800 border border-gold-500/30 flex items-center justify-center flex-shrink-0 overflow-hidden">
            <ItemIcon id={pickaxe.pickaxeId} alt={pickaxe.pickaxeName} size={44} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[9px] uppercase tracking-[0.3em] text-gold-400/70 font-bold mb-1">Pickaxe</div>
            <h3 className="font-display text-2xl font-black text-cream truncate">{pickaxe.pickaxeName}</h3>
          </div>
          <div className="flex items-stretch gap-2 flex-wrap">
            <div className="px-3 py-2 rounded-lg border border-line bg-ink-900/60 text-center min-w-[80px]">
              <div className="font-display text-xl font-black text-gold-400 leading-none tabular-nums">{totalMines}</div>
              <div className="text-[9px] uppercase text-cream-dim/70 tracking-wider mt-1">item</div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-px bg-line" />
    </div>
  )
}

/* ============================================================
   MINE CARD (Glassy V4)
   ============================================================ */

function MineCard({ mine }: { mine: MineItem }) {
  const dropPct = parseFloat(mine.dropRate)
  return (
    <div className="relative rounded-xl overflow-hidden group isolate">
      <div
        className="absolute inset-0 rounded-xl opacity-60 group-hover:opacity-100 transition"
        style={{ background: `linear-gradient(135deg, ${mine.rarity.color}30 0%, transparent 50%, ${mine.rarity.color}15 100%)` }}
      />
      <div className="absolute inset-0 rounded-xl backdrop-blur-sm bg-ink-900/70" />
      <div
        className="absolute inset-0 rounded-xl border-2 pointer-events-none"
        style={{ borderColor: `${mine.rarity.color}30` }}
      />
      <div className="relative p-4 text-center">
        <div className="flex items-center justify-between mb-3">
          <span
            className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
            style={{ backgroundColor: `${mine.rarity.color}30`, color: mine.rarity.color }}
          >
            {mine.rarity.text}
          </span>
          <IconBolt className="w-3.5 h-3.5" style={{ color: mine.rarity.color }} />
        </div>

        <div className="relative mx-auto mb-3 w-14 h-14">
          <div className="w-full h-full bg-ink-800 rounded-lg border border-line flex items-center justify-center overflow-hidden">
            <ItemIcon id={mine.itemId} alt={mine.itemName} size={56} />
          </div>
          {mine.itemCount > 1 && (
            <span className="absolute -bottom-1 -right-1 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-gold-500 text-ink-950">
              x{mine.itemCount}
            </span>
          )}
        </div>

        <p className="text-xs font-semibold text-cream truncate mb-3 leading-tight">{mine.itemName}</p>

        <div className="font-display text-2xl font-bold text-cream tabular-nums mb-2">
          {mine.dropRate}<span className="text-sm text-cream-dim">%</span>
        </div>
        <div className="h-1 bg-ink-800/60 rounded-full overflow-hidden mb-3">
          <div className="h-full" style={{ width: `${Math.min(dropPct, 100)}%`, backgroundColor: mine.rarity.color }} />
        </div>

        {mine.reqItemId > 0 && mine.reqItemName && (
          <div className="text-[10px] text-cream-dim flex items-center justify-center gap-1 pt-2 border-t border-line/50">
            {mine.reqItemName}
          </div>
        )}
      </div>
    </div>
  )
}

/* ============================================================
   MINE GRID SECTION (heraldic panel — header + grid bütünleşik)
   ============================================================ */

function MineTypeSection({ zone, mines }: { zone: string; mines: MineItem[] }) {
  if (!mines?.length) return null
  return (
    <div className="rounded-xl border border-line overflow-hidden bg-ink-800/40">
      {/* Header strip */}
      <div className="px-4 py-2.5 flex items-center gap-3 border-b border-line bg-gold-500/[0.04]">
        <span className="w-1 h-5 rounded-full bg-gradient-to-b from-gold-400 to-gold-500 shrink-0" />
        <h4 className="font-display text-lg font-bold text-cream truncate flex-1 min-w-0">{zone}</h4>
        <span className="text-xs text-cream-dim bg-ink-900 px-3 py-1.5 rounded-full whitespace-nowrap flex-shrink-0 border border-line">
          {mines.length} farklı item
        </span>
      </div>

      {/* Grid */}
      <div className="p-4 md:p-5">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {mines.map((mine, idx) => (
            <MineCard key={`${mine.itemId}-${idx}`} mine={mine} />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ============================================================
   PAGE
   ============================================================ */

export default function MiningGuidePage() {
  const [selectedSlug, setSelectedSlug] = useState<string>(pickaxes[0]?.slug ?? "")
  const selectedPickaxe = pickaxes.find((p) => p.slug === selectedSlug) ?? null

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
              <IconPick className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-cream">Mining Guide</h1>
              <p className="text-sm text-cream-dim">Mining and fishing rewards by pickaxe</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
          <aside>
            <PickaxeList pickaxes={pickaxes} selectedSlug={selectedSlug} onSelect={setSelectedSlug} />
          </aside>

          <main className="card rounded-xl overflow-hidden">
            {selectedPickaxe ? (
              <>
                <PickaxeHeader pickaxe={selectedPickaxe} />
                {selectedPickaxe.mines?.length > 0 ? (
                  <div className="p-4 md:p-6 space-y-6">
                    {Array.from(
                      selectedPickaxe.mines.reduce((map, mine) => {
                        const arr = map.get(mine.zoneId) ?? []
                        arr.push(mine)
                        map.set(mine.zoneId, arr)
                        return map
                      }, new Map<string, MineItem[]>())
                    ).map(([zone, mines]) => (
                      <MineTypeSection key={zone} zone={zone} mines={mines} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 bg-ink-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-line">
                      <IconAlertCircle className="w-8 h-8 text-cream-dim" />
                    </div>
                    <p className="text-cream-dim text-sm">Bu kazma için veri bulunamadı.</p>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-gold-500/15 border border-gold-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <IconCircleCheck className="w-10 h-10 text-gold-400" />
                </div>
                <h3 className="font-display text-lg font-semibold text-cream mb-2">Kazma Seç</h3>
                <p className="text-cream-dim text-sm">Detaylı ödülleri görmek için sol taraftan bir kazma seç.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
