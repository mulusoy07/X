"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import {
  IconTrophy,
  IconSearch,
  IconLoader2,
  IconEraser,
  IconChevronsDown,
  IconCrown,
  IconMedal,
  IconAward,
  IconChevronDown,
  IconCheck,
  IconFilter,
  IconX,
  IconHome,
  IconUsers,
  IconSlash,
} from "@tabler/icons-react"

/* ============================================================
   TYPES
   ============================================================ */

interface Player {
  userId: number
  userName: string
  userSlug: string
  clanSlug: string
  level: number
  rebirthLevel: number
  className: string
  classIcon: string
  nationText: string
  expPercentage: number
  formattedLoyalty: string
  loyalty: number
  symbol: string
  clanId: number
  clanName: string | null
  titleName: string | null
  rank: number
}

type SortKey = "level" | "rebirth" | "loyalty" | "name"

interface Filters {
  nation: number  // 0 = all, 1 = Karus, 2 = El Morad
  job: number     // 0 = all, 1..4 = class
  sortBy: SortKey
  userName: string
}

/* ============================================================
   STATIC FILTER DATA
   ============================================================ */

const NATIONS = ["Tümü", "Karus", "El Morad"]
const JOBS = ["Tümü", "Warrior", "Rogue", "Mage", "Priest"]
const SORT_OPTIONS: Record<SortKey, string> = {
  level: "Level ",
  rebirth: "Rebirth level",
  loyalty: "National Point",
  name: "İsim (A-Z)",
}

const CLASS_BY_INDEX = ["", "Warrior", "Rogue", "Mage", "Priest"]
const NATION_BY_INDEX = ["", "Karus", "ElMorad"]

const TITLES = [
  null, null, null,
  "Master Looter",
  "Defender",
  "Pyromancer",
  "Field Medic",
  "Castle Lord",
  null, null,
]

const CLAN_NAMES = [
  null,
  "Phoenix Order",
  "Crimson Pact",
  "Iron Wolves",
  "Silent Shadows",
  null,
  "Stormbreakers",
  "Vortex Legion",
  null,
  "Nightwatch",
]

/* ============================================================
   MOCK PLAYERS (30)
   ============================================================ */

const PLAYER_NAMES = [
  "Aetherion", "Bloodfang", "Crimson", "Drakehart", "Echohunter",
]

const players: Player[] = PLAYER_NAMES.map((name, i) => {
  const nationIdx = (i % 2) + 1
  const jobIdx = (i % 4) + 1
  const level = 180 - Math.floor(i * 1.2)
  const rebirthLevel = i < 12 ? Math.max(0, 180 - i * 8) : 0
  const loyalty = Math.max(50_000, 1_500_000 - i * 35_000 + (i % 3) * 12_000)
  const clanId = (i * 13 + 7) % 10
  return {
    userId: 1000 + i,
    userName: name,
    userSlug: name.toLowerCase(),
    clanSlug: clanId > 0 ? `clan-${clanId}` : "",
    level,
    rebirthLevel,
    className: CLASS_BY_INDEX[jobIdx],
    classIcon: CLASS_BY_INDEX[jobIdx].toLowerCase(),
    nationText: NATION_BY_INDEX[nationIdx],
    expPercentage: (i * 7 + 15) % 100,
    formattedLoyalty: loyalty.toLocaleString("tr-TR"),
    loyalty,
    symbol: i % 5 === 0 ? "knight" : i % 7 === 0 ? "champion" : "none",
    clanId: clanId > 0 ? clanId : 0,
    clanName: CLAN_NAMES[clanId],
    titleName: TITLES[i % TITLES.length],
    rank: i + 1,
  }
})

/* ============================================================
   HELPERS
   ============================================================ */

function compactNumber(n: number): string {
  if (n >= 1_000_000) {
    const v = n / 1_000_000
    return `${v >= 10 ? Math.round(v) : v.toFixed(1).replace(/\.0$/, "")}M`
  }
  if (n >= 1_000) {
    const v = n / 1_000
    return `${v >= 10 ? Math.round(v) : v.toFixed(1).replace(/\.0$/, "")}K`
  }
  return n.toString()
}

/* ============================================================
   PLACEHOLDERS
   ============================================================ */

function PlaceholderIcon({ size = 36, label }: { size?: number; label?: string }) {
  return (
    <div
      className="placeholder-img rounded-md border border-line flex items-center justify-center"
      style={{ width: size, height: size }}
      aria-label={label}
      title={label}
    />
  )
}

/* ============================================================
   THEMED SELECT (reusable, design system uyumlu)
   ============================================================ */

interface SelectOption<T extends string | number> {
  value: T
  label: string
}

function ThemedSelect<T extends string | number>({
  value,
  onChange,
  options,
  placeholder,
  className = "",
  width = "w-full sm:w-40",
}: {
  value: T
  onChange: (v: T) => void
  options: SelectOption<T>[]
  placeholder?: string
  className?: string
  width?: string
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("mousedown", onDoc)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", onDoc)
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  const current = options.find((o) => o.value === value)

  return (
    <div ref={ref} className={`relative ${width} ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full h-10 px-3 flex items-center gap-2 rounded-xl bg-ink-800/60 border border-line/60 hover:border-gold-500/30 transition-all text-sm group"
      >
        <span className={`flex-1 truncate text-left ${current ? "text-cream" : "text-cream-dim/60"}`}>
          {current?.label ?? placeholder ?? "Sec"}
        </span>
        <IconChevronDown
          className={`w-4 h-4 text-cream-dim group-hover:text-gold-400 transition-all ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-ink-800/95 backdrop-blur-xl border border-gold-500/20 rounded-xl shadow-2xl overflow-hidden z-[60] p-1.5 max-h-72 overflow-y-auto">
          {options.map((opt) => {
            const active = opt.value === value
            return (
              <button
                key={String(opt.value)}
                type="button"
                onClick={() => {
                  onChange(opt.value)
                  setOpen(false)
                }}
                className={`w-full px-3 py-2 rounded-lg flex items-center gap-2 text-left text-sm transition-all ${
                  active
                    ? "bg-gold-500/10 text-gold-300"
                    : "text-cream hover:bg-ink-700/50 hover:text-gold-300"
                }`}
              >
                <span className="flex-1 truncate">{opt.label}</span>
                {active && <IconCheck className="w-3.5 h-3.5 text-gold-400 shrink-0" />}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

/* ============================================================
   FILTER VARIANTS
   ============================================================ */

interface FilterProps {
  filters: Filters
  onFilterChange: <K extends keyof Filters>(key: K, value: Filters[K]) => void
  onSearch: () => void
  onReset: () => void
  isRefreshing: boolean
}

function useFilterOptions() {
  const nationOptions: SelectOption<number>[] = NATIONS.map((label, value) => ({ value, label }))
  const jobOptions: SelectOption<number>[] = JOBS.map((label, value) => ({ value, label }))
  const sortOptions: SelectOption<SortKey>[] = (Object.entries(SORT_OPTIONS) as [SortKey, string][]).map(
    ([value, label]) => ({ value, label })
  )
  return { nationOptions, jobOptions, sortOptions }
}

function LabelledField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-black uppercase tracking-widest text-cream-dim/60 px-1">{label}</label>
      {children}
    </div>
  )
}

/* ============================================================
/* ============================================================
   FILTER SECTION — Smart Compact + Active filter chips
   Search + Ara butonu görünür, filtreler "Filtrele" toggle ile açılır.
   Aktif filtreler chip olarak gösterilir, X ile kaldırılabilir.
   ============================================================ */

function FilterSection({ filters, onFilterChange, onSearch, onReset, isRefreshing }: FilterProps) {
  const [open, setOpen] = useState(false)
  const { nationOptions, jobOptions, sortOptions } = useFilterOptions()

  const activeCount =
    (filters.nation > 0 ? 1 : 0) +
    (filters.job > 0 ? 1 : 0) +
    (filters.sortBy !== "level" ? 1 : 0)

  const activeChips = [
    filters.nation > 0 && { key: "nation", label: NATIONS[filters.nation], clear: () => onFilterChange("nation", 0) },
    filters.job > 0 && { key: "job", label: JOBS[filters.job], clear: () => onFilterChange("job", 0) },
    filters.sortBy !== "level" && { key: "sort", label: SORT_OPTIONS[filters.sortBy], clear: () => onFilterChange("sortBy", "level") },
  ].filter(Boolean) as { key: string; label: string; clear: () => void }[]

  return (
    <div className="rounded-2xl border border-line bg-ink-900/40">
      {/* Top bar */}
      <div className="p-3 sm:p-4 flex flex-wrap items-center gap-2 sm:gap-3">
        <div className="flex-1 relative min-w-[220px]">
          <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-dim/70" />
          <input
            type="text"
            placeholder="Kullanıcı adı ara..."
            value={filters.userName}
            onChange={(e) => onFilterChange("userName", e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSearch()}
            disabled={isRefreshing}
            className="w-full h-10 pl-9 pr-3 rounded-xl bg-ink-800/60 border border-line/60 text-sm text-cream placeholder:text-cream-dim/50 hover:border-gold-500/30 focus:outline-none focus:border-gold-500/50 focus:bg-ink-800 transition disabled:opacity-50"
          />
        </div>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className={`inline-flex items-center gap-2 h-10 px-4 rounded-xl border text-sm font-semibold transition ${
            open || activeCount > 0
              ? "bg-gold-500/10 border-gold-500/40 text-gold-300"
              : "bg-ink-800/60 border-line/60 text-cream-dim hover:text-cream hover:border-gold-500/30"
          }`}
        >
          <IconFilter className="w-4 h-4" />
          <span>Filtrele</span>
          {activeCount > 0 && (
            <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-gold-500 text-ink-950 text-[10px] font-black tabular-nums">
              {activeCount}
            </span>
          )}
          <IconChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>

        <button
          type="button"
          onClick={onSearch}
          disabled={isRefreshing}
          className="inline-flex items-center gap-2 h-10 px-5 rounded-xl bg-gradient-to-b from-gold-400 to-gold-500 text-ink-950 text-sm font-bold hover:brightness-110 transition disabled:opacity-50"
        >
          {isRefreshing ? <IconLoader2 className="w-4 h-4 animate-spin" /> : <IconSearch className="w-4 h-4" />}
          <span>Ara</span>
        </button>
      </div>

      {/* Active filter chips */}
      {activeChips.length > 0 && (
        <div className="px-3 sm:px-4 pb-3 flex items-center gap-2 flex-wrap">
          <span className="text-[10px] font-black uppercase tracking-widest text-cream-dim/60">Aktif:</span>
          {activeChips.map((chip) => (
            <button
              key={chip.key}
              type="button"
              onClick={chip.clear}
              className="group inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-xs font-semibold text-gold-300 hover:bg-gold-500/20 transition"
            >
              <span>{chip.label}</span>
              <IconX className="w-3 h-3 opacity-60 group-hover:opacity-100" />
            </button>
          ))}
          <button
            type="button"
            onClick={onReset}
            className="text-[11px] text-cream-dim/70 hover:text-cream-dim font-semibold underline-offset-2 hover:underline ml-1"
          >
            Tümünü temizle
          </button>
        </div>
      )}

      {/* Expandable filter panel */}
      {open && (
        <div className="border-t border-line bg-ink-900/40 p-3 sm:p-4 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <LabelledField label="Nation">
              <ThemedSelect
                value={filters.nation}
                onChange={(v) => onFilterChange("nation", v)}
                options={nationOptions}
                width="w-full"
              />
            </LabelledField>
            <LabelledField label="Class">
              <ThemedSelect
                value={filters.job}
                onChange={(v) => onFilterChange("job", v)}
                options={jobOptions}
                width="w-full"
              />
            </LabelledField>
            <LabelledField label="Sıralama">
              <ThemedSelect
                value={filters.sortBy}
                onChange={(v) => onFilterChange("sortBy", v)}
                options={sortOptions}
                width="w-full"
              />
            </LabelledField>
          </div>
          <div className="flex justify-end pt-1 border-t border-line/60">
            <button
              type="button"
              onClick={onReset}
              disabled={isRefreshing}
              className="mt-2 inline-flex items-center gap-1.5 h-9 px-3 rounded-lg text-cream-dim text-xs font-semibold hover:text-cream hover:bg-ink-800 transition disabled:opacity-50"
            >
              <IconEraser className="w-3.5 h-3.5" />
              <span>Filtreleri sıfırla</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

/* ============================================================
   PLAYER ROW
   ============================================================ */

function rankAccent(rank: number) {
  if (rank === 1) return { bg: "from-yellow-500/10 to-yellow-600/5", border: "border-yellow-500/30", icon: IconCrown, color: "#eab308" }
  if (rank === 2) return { bg: "from-zinc-400/10 to-zinc-500/5", border: "border-zinc-400/30", icon: IconMedal, color: "#a1a1aa" }
  if (rank === 3) return { bg: "from-orange-500/10 to-orange-600/5", border: "border-orange-500/30", icon: IconAward, color: "#f97316" }
  return null
}

function PlayerRow({ player }: { player: Player }) {
  const rank = player.rank
  const accent = rankAccent(rank)
  const hasRebirth = player.rebirthLevel > 0
  const TopIcon = accent?.icon

  return (
    <div
      className={`relative overflow-hidden rounded-xl border transition-colors ${
        accent
          ? `bg-gradient-to-r ${accent.bg} ${accent.border}`
          : rank % 2 === 0
            ? "bg-ink-900/40 border-line hover:border-gold-500/30"
            : "bg-ink-800/30 border-line/60 hover:border-gold-500/30"
      }`}
    >
      <div className="flex items-stretch">
        {/* Rank */}
        <div className="flex items-center justify-center px-3 sm:px-4 py-3 bg-ink-900/30 border-r border-line">
          {accent && TopIcon ? (
            <div
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${accent.color}15`, border: `1px solid ${accent.color}50` }}
            >
              <TopIcon className="w-5 h-5" style={{ color: accent.color }} />
            </div>
          ) : (
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center bg-ink-800 border border-line">
              <span className="text-xs sm:text-sm font-bold tabular-nums text-cream-dim">{rank}</span>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="flex-1 flex items-center px-3 sm:px-4 py-3 gap-3 sm:gap-4 min-w-0">
          {/* Icons strip */}
          <div className="flex gap-1 shrink-0">
            <PlaceholderIcon size={36} label={player.nationText} />
            <PlaceholderIcon size={36} label={player.className} />
            {player.symbol !== "none" && (
              <div className="hidden sm:block">
                <PlaceholderIcon size={36} label={player.symbol} />
              </div>
            )}
          </div>

          {/* Name + Title + Clan */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-cream text-sm hover:text-gold-400 transition-colors truncate cursor-pointer">
                {player.userName}
              </span>
              {player.titleName && (
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded bg-gold-500/10 border border-gold-500/30 text-[10px] font-bold uppercase tracking-wider text-gold-400">
                  {player.titleName}
                </span>
              )}
            </div>

            {player.clanId > 0 && player.clanName && (
              <div className="hidden sm:flex items-center gap-1.5 mt-0.5 text-cream-dim hover:text-gold-300 transition-colors cursor-pointer">
                <PlaceholderIcon size={16} label={player.clanName} />
                <span className="text-[11px] font-semibold tracking-wide">{player.clanName}</span>
              </div>
            )}
          </div>

          {/* Level + EXP */}
          <div className="hidden md:block w-56 shrink-0">
            <div className="flex items-center justify-between mb-1.5">
              <div className="text-[11px] inline-flex items-baseline gap-1">
                <span className="text-cream-dim/70">Lv</span>
                <span className={`font-bold tabular-nums ${hasRebirth ? "text-violet-300" : "text-cream"}`}>
                  {player.level}
                  {hasRebirth && <span className="text-violet-400/80">/{player.rebirthLevel}</span>}
                </span>
              </div>
              <div className="text-[10px] text-cream-dim">
                <span>EXP </span>
                <span className="font-bold text-cream tabular-nums">{player.expPercentage}%</span>
              </div>
            </div>
            <div className="h-1.5 bg-ink-800 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  hasRebirth
                    ? "bg-gradient-to-r from-violet-500 to-fuchsia-500"
                    : "bg-gradient-to-r from-gold-400 to-gold-500"
                }`}
                style={{ width: `${player.expPercentage}%` }}
              />
            </div>
          </div>

          {/* National Point */}
          <div className="text-center min-w-[4.5rem] sm:min-w-[6rem] shrink-0">
            <div className="text-[8px] sm:text-[10px] text-cream-dim/70 uppercase tracking-wider font-bold">
              National
            </div>
            <div className="relative group/np inline-block">
              <div className="text-sm sm:text-lg font-black tabular-nums bg-gradient-to-r from-gold-400 to-gold-500 bg-clip-text text-transparent cursor-help">
                {compactNumber(player.loyalty)}
              </div>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-lg bg-ink-800 border border-line text-sm text-cream font-medium whitespace-nowrap opacity-0 group-hover/np:opacity-100 group-hover/np:translate-y-0 translate-y-1 transition-all duration-200 pointer-events-none shadow-xl z-20">
                {player.formattedLoyalty}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ============================================================
   PAGE
   ============================================================ */

const PAGE_SIZE = 10

export default function UsersRankingsPage() {
  const [filters, setFilters] = useState<Filters>({
    nation: 0,
    job: 0,
    sortBy: "level",
    userName: "",
  })
  const [page, setPage] = useState(1)
  const [committedSearch, setCommittedSearch] = useState("")

  const filteredAndSorted = useMemo(() => {
    const filtered = players.filter((p) => {
      if (filters.nation > 0 && p.nationText !== NATION_BY_INDEX[filters.nation]) return false
      if (filters.job > 0 && p.className !== CLASS_BY_INDEX[filters.job]) return false
      if (committedSearch && !p.userName.toLowerCase().includes(committedSearch.toLowerCase())) return false
      return true
    })

    const sorted = [...filtered].sort((a, b) => {
      switch (filters.sortBy) {
        case "level": return b.level - a.level || b.rebirthLevel - a.rebirthLevel
        case "rebirth": return b.rebirthLevel - a.rebirthLevel || b.level - a.level
        case "loyalty": return b.loyalty - a.loyalty
        case "name": return a.userName.localeCompare(b.userName)
      }
    })

    return sorted.map((p, i) => ({ ...p, rank: i + 1 }))
  }, [filters.nation, filters.job, filters.sortBy, committedSearch])

  const visible = filteredAndSorted.slice(0, page * PAGE_SIZE)
  const hasMore = visible.length < filteredAndSorted.length

  const handleFilterChange = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    setFilters((f) => ({ ...f, [key]: value }))
    setPage(1)
  }

  const handleSearch = () => {
    setCommittedSearch(filters.userName.trim())
    setPage(1)
  }

  const handleReset = () => {
    setFilters({ nation: 0, job: 0, sortBy: "level", userName: "" })
    setCommittedSearch("")
    setPage(1)
  }

  return (
    <div className="min-h-screen bg-ink-950">
      <div className="max-w-7xl mx-auto px-4 pt-6">
        {/* B2 — Breadcrumb (icon prefixed + slash) */}
        <nav aria-label="breadcrumb" className="flex items-center gap-2 text-sm">
          <Link href="/" className="inline-flex items-center gap-1.5 text-cream-dim hover:text-cream transition-colors">
            <IconHome className="w-4 h-4" />
            Ana Sayfa
          </Link>
          <IconSlash className="w-3.5 h-3.5 text-cream-dim/40 -rotate-12" />
          <Link href="/templates/rankings" className="inline-flex items-center gap-1.5 text-cream-dim hover:text-cream transition-colors">
            <IconTrophy className="w-4 h-4" />
            Rankings
          </Link>
          <IconSlash className="w-3.5 h-3.5 text-cream-dim/40 -rotate-12" />
          <span className="inline-flex items-center gap-1.5 font-semibold text-gold-300">
            <IconUsers className="w-4 h-4" />
            Users
          </span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* H2 — Icon badge + title */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400">
            <IconTrophy className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-cream tracking-tight">Users Rankings</h1>
            <p className="text-sm text-cream-dim">Player rankings · level, NP, rebirth</p>
          </div>
        </div>
        <FilterSection
          filters={filters}
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
          onReset={handleReset}
          isRefreshing={false}
        />

        {visible.length > 0 ? (
          <div className="space-y-2.5">
            {visible.map((player) => (
              <PlayerRow key={player.userId} player={player} />
            ))}

            <div className="pt-4 flex flex-col items-center gap-2">
              {hasMore ? (
                <button
                  type="button"
                  onClick={() => setPage((p) => p + 1)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-ink-900 border border-line text-cream-dim hover:text-gold-400 hover:border-gold-500/40 transition text-sm font-semibold"
                >
                  <IconChevronsDown className="w-4 h-4" />
                  Daha fazla yükle
                </button>
              ) : (
                <p className="text-sm text-cream-dim/80">
                  Toplam <span className="font-bold text-cream tabular-nums">{filteredAndSorted.length}</span> oyuncu listelendi.
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-line bg-ink-900/30 p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-ink-800 border border-line flex items-center justify-center">
              <IconSearch className="w-7 h-7 text-cream-dim" />
            </div>
            <h3 className="font-display text-lg font-bold text-cream mb-1">Sonuç bulunamadı</h3>
            <p className="text-sm text-cream-dim">Filtreyi değiştirip tekrar dene.</p>
          </div>
        )}
      </div>
    </div>
  )
}
