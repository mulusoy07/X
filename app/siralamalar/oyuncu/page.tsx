"use client"

import { useState, useRef, useCallback } from "react"
import { Header } from "@/components/oracle/header"
import { Footer } from "@/components/oracle/footer"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  IconTrophy,
  IconSearch,
  IconEraser,
  IconLoader2,
  IconChevronDown,
  IconUsers,
  IconChevronRight,
} from "@tabler/icons-react"
import Link from "next/link"
import { mockPlayers, nations, jobs, sortOptions } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

// Rank icon component - uses CSS classes from globals.css
const RankIcon = ({ rank }: { rank: number }) => {
  if (rank <= 3) {
    return (
      <div className="w-8 h-8 rounded-lg flex items-center justify-center">
        <div className={`rank-icon rank-${rank}`} />
      </div>
    )
  }
  return (
    <div className="w-8 h-8 rounded-lg bg-ink-700 border border-line flex items-center justify-center">
      <span className="text-xs font-bold text-cream-dim">{rank}</span>
    </div>
  )
}

// Row background styling based on rank
const getRowBg = (rank: number) => {
  const baseHover = "hover:scale-[1.01] hover:shadow-lg hover:shadow-black/20 hover:-translate-y-0.5 cursor-pointer"
  if (rank === 1) return `bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border-amber-500/20 hover:border-amber-500/40 hover:from-amber-500/15 ${baseHover}`
  if (rank === 2) return `bg-gradient-to-r from-slate-400/10 via-slate-400/5 to-transparent border-slate-400/20 hover:border-slate-400/40 hover:from-slate-400/15 ${baseHover}`
  if (rank === 3) return `bg-gradient-to-r from-amber-700/10 via-amber-700/5 to-transparent border-amber-700/20 hover:border-amber-700/40 hover:from-amber-700/15 ${baseHover}`
  return `border-line hover:border-gold-500/30 hover:bg-ink-800/40 ${baseHover}`
}

interface Player {
  userId: number
  userName: string
  userSlug: string
  level: number
  rebirthLevel: number
  className: string
  classIcon: string
  nationText: string
  expPercentage: number
  formattedLoyalty: string
  symbol: string
  clanId: number
  clanName: string | null
  clanSlug: string
  clanIcon: string | null
  titleName: string | null
  rank: number
}

function PlayerRow({ player }: { player: Player }) {
  const rank = player.rank
  const hasRebirth = player.rebirthLevel > 0
  const nationClass = player.nationText.toLowerCase() === "karus" ? "karus" : "human"
  const classIconName = player.classIcon.toLowerCase()

  return (
    <div
      className={`relative overflow-hidden rounded-xl border transition-all duration-300 ease-out ${getRowBg(rank)}`}
    >
      <div className="relative flex items-stretch">
        {/* Rank Section */}
        <div className="flex items-center justify-center px-3 py-3 bg-ink-800/20 border-r border-line/50">
          <RankIcon rank={rank} />
        </div>

        {/* Content */}
        <div className="flex-1 flex items-center px-3 gap-3">
          {/* Nation & Class Icons */}
          <div className="flex gap-1 shrink-0">
            <div className="w-8 h-8 rounded overflow-hidden bg-ink-700/50 p-0.5">
              <div className={`nation-icon nation-${nationClass}`} style={{ width: 28, height: 28 }} />
            </div>
            <div className="w-8 h-8 rounded overflow-hidden bg-ink-700/50 p-0.5">
              <div className={`class-icon class-${classIconName}`} style={{ width: 28, height: 28 }} />
            </div>
          </div>

          {/* Name & Clan */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <Link 
                href={`/profil/oyuncu/${player.userId}/${player.userSlug}`} 
                className="font-bold text-cream text-sm truncate block max-w-[150px] hover:text-gold-400 transition-colors"
              >
                {player.userName}
              </Link>
              {player.titleName && (
                <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 bg-ink-700/50 border border-gold-500/20 rounded text-[10px] font-semibold text-gold-400 uppercase tracking-wide">
                  {player.titleName}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              {player.clanName ? (
                <Link href={`/profil/klan/${player.clanId}/${player.clanSlug}`} className="flex items-center gap-1 hover:opacity-80 transition-opacity">
                  <IconUsers className="w-3 h-3 text-cream-dim" />
                  <span className="text-[11px] text-cream-dim truncate">{player.clanName}</span>
                </Link>
              ) : (
                <span className="text-[11px] text-cream-dim/50">Klansiz</span>
              )}
            </div>
          </div>

          {/* Level & EXP - Hidden on mobile */}
          <div className="hidden md:block min-w-[10rem]">
            <div className="flex items-center justify-between mb-1">
              <div className={cn("text-sm", hasRebirth ? "text-purple-400" : "text-cream")}>
                <span className="text-[10px] text-cream-dim font-normal uppercase tracking-wider">Sv.</span>
                <span className="font-bold ml-1">
                  {player.level}
                  {hasRebirth && <span className="text-purple-400">/{player.rebirthLevel}</span>}
                </span>
              </div>
              <div className="text-xs text-cream-dim">
                <span className="font-bold text-cream">{player.expPercentage}%</span>
              </div>
            </div>
            <div className="h-1.5 bg-ink-900 rounded-full overflow-hidden">
              <div
                className={cn(
                  "h-full transition-all duration-500",
                  hasRebirth
                    ? "bg-gradient-to-r from-purple-500 to-pink-500"
                    : "bg-gradient-to-r from-gold-500 to-gold-400"
                )}
                style={{ width: `${player.expPercentage}%` }}
              />
            </div>
          </div>

          {/* NP */}
          <div className="text-center min-w-[4rem] shrink-0">
            <div className="text-[11px] text-cream-dim uppercase tracking-wider font-medium">NP</div>
            <div className="text-sm font-black bg-gradient-to-r from-gold-400 to-gold-500 bg-clip-text text-transparent">
              {player.formattedLoyalty}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PlayersRankingPage() {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [filters, setFilters] = useState({
    nation: 0,
    job: 0,
    sortBy: "loyalty",
    userName: "",
  })
  const searchRef = useRef<HTMLInputElement>(null)

  const handleFilterChange = useCallback((key: string, value: string | number) => {
    setIsRefreshing(true)
    setFilters(prev => ({ ...prev, [key]: value }))
    setTimeout(() => setIsRefreshing(false), 500)
  }, [])

  const handleReset = useCallback(() => {
    setIsRefreshing(true)
    setFilters({ nation: 0, job: 0, sortBy: "loyalty", userName: "" })
    if (searchRef.current) searchRef.current.value = ""
    setTimeout(() => setIsRefreshing(false), 500)
  }, [])

  // Filter players based on current filters
  const filteredPlayers = mockPlayers.filter(player => {
    if (filters.nation !== 0 && player.nationText !== nations[filters.nation]) return false
    if (filters.job !== 0 && player.className !== jobs[filters.job]) return false
    if (filters.userName && !player.userName.toLowerCase().includes(filters.userName.toLowerCase())) return false
    return true
  })

  return (
    <div className="min-h-screen pb-16 lg:pb-0">
      <Header />
      
      <main className="mx-auto max-w-[1400px] px-4 lg:px-6 py-8 lg:py-12">
        {/* Page Header */}
        <div className="card rounded-xl overflow-hidden mb-6">
          <div className="section-header">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-md bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400">
                <IconTrophy className="w-4 h-4" />
              </div>
              <div>
                <h1 className="font-semibold text-cream text-lg">Oyuncu Siralamasi</h1>
                <p className="text-xs text-cream-dim">En guclu oyunculari kesfet</p>
              </div>
            </div>
            <Link href="/siralamalar" className="text-xs text-gold-400 hover:text-gold-300 flex items-center gap-1">
              Tum Siralamalar <IconChevronRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Filter Section */}
          <div className="p-4 border-t border-line/50">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {/* Search Input */}
              <div className="w-full sm:flex-1 relative order-1">
                <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-cream-dim" />
                <Input
                  ref={searchRef}
                  placeholder="Oyuncu ara..."
                  defaultValue={filters.userName}
                  className="pl-10 bg-ink-900/50 border-line text-cream placeholder:text-cream-dim focus:border-gold-500 focus:ring-gold-500/20 h-9"
                  disabled={isRefreshing}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleFilterChange("userName", e.currentTarget.value)
                  }}
                />
              </div>

              <div className="hidden sm:block w-px h-8 bg-line order-2" />

              {/* Filters */}
              <div className="flex items-center gap-2 w-full sm:w-auto order-3">
                <Select
                  value={filters.nation.toString()}
                  onValueChange={(value) => handleFilterChange("nation", parseInt(value))}
                  disabled={isRefreshing}
                >
                  <SelectTrigger className="flex-1 sm:flex-none sm:w-32 bg-ink-900/50 border-line text-cream focus:border-gold-500 focus:ring-gold-500/20 hover:border-gold-500/50 transition-colors h-9">
                    <SelectValue placeholder="Ulus Sec" />
                  </SelectTrigger>
                  <SelectContent className="bg-ink-800 border-line shadow-lg">
                    {nations.map((name, index) => (
                      <SelectItem key={index} value={index.toString()} className="text-cream hover:bg-ink-700 hover:text-gold-400 focus:bg-ink-700 focus:text-gold-400 cursor-pointer">
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={filters.job.toString()}
                  onValueChange={(value) => handleFilterChange("job", parseInt(value))}
                  disabled={isRefreshing}
                >
                  <SelectTrigger className="flex-1 sm:flex-none sm:w-32 bg-ink-900/50 border-line text-cream focus:border-gold-500 focus:ring-gold-500/20 hover:border-gold-500/50 transition-colors h-9">
                    <SelectValue placeholder="Sinif Sec" />
                  </SelectTrigger>
                  <SelectContent className="bg-ink-800 border-line shadow-lg">
                    {jobs.map((name, index) => (
                      <SelectItem key={index} value={index.toString()} className="text-cream hover:bg-ink-700 hover:text-gold-400 focus:bg-ink-700 focus:text-gold-400 cursor-pointer">
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={filters.sortBy}
                  onValueChange={(value) => handleFilterChange("sortBy", value)}
                  disabled={isRefreshing}
                >
                  <SelectTrigger className="flex-1 sm:flex-none sm:w-36 bg-ink-900/50 border-line text-cream focus:border-gold-500 focus:ring-gold-500/20 hover:border-gold-500/50 transition-colors h-9">
                    <SelectValue placeholder="Siralama" />
                  </SelectTrigger>
                  <SelectContent className="bg-ink-800 border-line shadow-lg">
                    {Object.entries(sortOptions).map(([value, label]) => (
                      <SelectItem key={value} value={value} className="text-cream hover:bg-ink-700 hover:text-gold-400 focus:bg-ink-700 focus:text-gold-400 cursor-pointer">
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 w-full sm:w-auto order-4">
                <Button
                  type="button"
                  disabled={isRefreshing}
                  className="flex-1 sm:flex-none gold-btn font-semibold text-sm h-9 px-4"
                  onClick={() => {
                    if (searchRef?.current) handleFilterChange("userName", searchRef.current.value)
                  }}
                >
                  {isRefreshing
                    ? <IconLoader2 className="w-4 h-4 mr-1 animate-spin" />
                    : <IconSearch className="w-4 h-4 mr-1" />
                  }
                  <span className="hidden sm:inline">Ara</span>
                </Button>

                <Button
                  type="button"
                  disabled={isRefreshing}
                  variant="outline"
                  className="flex-1 sm:flex-none bg-ink-900/50 border-line text-cream-dim font-semibold text-sm h-9 px-4 hover:bg-ink-800 hover:text-cream hover:border-gold-500/30"
                  onClick={handleReset}
                >
                  <IconEraser className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">Sifirla</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Rankings List */}
        <div className="space-y-3">
          {filteredPlayers.length === 0 ? (
            <div className="card rounded-xl p-12 text-center">
              <IconTrophy className="w-12 h-12 text-cream-dim mx-auto mb-4 opacity-50" />
              <p className="text-cream-dim">Sonuc bulunamadi</p>
            </div>
          ) : (
            filteredPlayers.map((player) => (
              <PlayerRow key={player.userId} player={player} />
            ))
          )}
        </div>

        {/* Load More */}
        {filteredPlayers.length > 0 && (
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              disabled={isRefreshing}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-ink-800/50 border border-line text-cream-dim hover:border-gold-500/30 hover:text-gold-400 transition-all text-sm font-medium disabled:opacity-50"
            >
              <IconChevronDown className="w-4 h-4" />
              Daha Fazla Yukle
            </button>
          </div>
        )}

        {/* Total Count */}
        <div className="mt-4 text-center">
          <p className="text-sm text-cream-dim">
            Toplam <span className="text-gold-400 font-semibold">{filteredPlayers.length}</span> oyuncu listelendi
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
