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
  IconCrown,
  IconUsers,
  IconShield,
} from "@tabler/icons-react"
import Link from "next/link"
import { mockPlayers, nations, jobs, sortOptions } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

// Simplified Imagex replacement - using div placeholders
function GameIcon({ icon, alt, className }: { icon: string; alt: string; className?: string }) {
  const getIconBg = () => {
    if (icon === "Karus") return "bg-gradient-to-br from-red-500/30 to-red-600/20 text-red-400"
    if (icon === "Human") return "bg-gradient-to-br from-blue-500/30 to-blue-600/20 text-blue-400"
    if (icon === "warrior") return "bg-gradient-to-br from-amber-500/30 to-amber-600/20 text-amber-400"
    if (icon === "mage") return "bg-gradient-to-br from-purple-500/30 to-purple-600/20 text-purple-400"
    if (icon === "priest") return "bg-gradient-to-br from-emerald-500/30 to-emerald-600/20 text-emerald-400"
    if (icon === "rogue") return "bg-gradient-to-br from-rose-500/30 to-rose-600/20 text-rose-400"
    if (icon?.startsWith("rank_1")) return "bg-gradient-to-br from-yellow-500/40 to-yellow-600/30"
    if (icon?.startsWith("rank_2")) return "bg-gradient-to-br from-gray-400/40 to-gray-500/30"
    if (icon?.startsWith("rank_3")) return "bg-gradient-to-br from-orange-500/40 to-orange-600/30"
    return "bg-ink-700/50 text-cream-dim"
  }

  const getIconText = () => {
    if (icon?.startsWith("rank_")) {
      const rank = icon.replace("rank_", "")
      return rank === "1" ? <IconCrown className="w-4 h-4 text-yellow-400" /> : 
             rank === "2" ? <IconCrown className="w-4 h-4 text-gray-300" /> :
             <IconCrown className="w-4 h-4 text-orange-400" />
    }
    return icon?.charAt(0)?.toUpperCase() || "?"
  }

  return (
    <div className={cn("flex items-center justify-center rounded text-xs font-bold", getIconBg(), className)}>
      {getIconText()}
    </div>
  )
}

function getBackgroundStyle(rank: number) {
  if (rank === 1) return "bg-gradient-to-r from-yellow-500/10 to-yellow-600/5 border-yellow-500/30"
  if (rank === 2) return "bg-gradient-to-r from-gray-400/10 to-gray-500/5 border-gray-400/30"
  if (rank === 3) return "bg-gradient-to-r from-orange-500/10 to-orange-600/5 border-orange-500/30"
  return rank % 2 === 0
    ? "bg-ink-800/30 border-line"
    : "bg-ink-700/30 border-line/50"
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
  const isTopThree = rank <= 3
  const hasRebirth = player.rebirthLevel > 0

  return (
    <div className="group relative">
      <div className={cn("relative overflow-hidden rounded-xl border transition-colors duration-200", getBackgroundStyle(rank))}>
        <div className="relative flex items-stretch">
          {/* Left Panel - Rank */}
          <div className="flex items-center justify-center px-2 sm:px-4 py-2 sm:py-3 bg-ink-800/20 border-r border-line/50">
            <div className="flex items-center justify-center">
              {isTopThree ? (
                <GameIcon 
                  icon={`rank_${rank}`} 
                  alt={`Rank ${rank}`} 
                  className="w-8 h-8 sm:w-10 sm:h-10" 
                />
              ) : (
                <div className="bg-ink-700 rounded-lg w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border border-line">
                  <span className="text-xs sm:text-sm font-bold text-muted">{rank}</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Player Info */}
          <div className="flex-1 flex items-center px-2 sm:px-4 py-2 sm:py-3 gap-2 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              <div className="flex gap-0.5 sm:gap-1 flex-shrink-0">
                <GameIcon 
                  icon={player.nationText} 
                  alt={player.nationText} 
                  className="w-8 h-8 sm:w-10 sm:h-10" 
                />
                <GameIcon 
                  icon={player.classIcon} 
                  alt={player.className} 
                  className="w-8 h-8 sm:w-10 sm:h-10" 
                />
                {player.symbol !== "none" && (
                  <div className="hidden sm:flex w-10 h-10 rounded bg-ink-700/50 items-center justify-center">
                    <IconShield className="w-5 h-5 text-gold-400/60" />
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                  <Link
                    href={`/profil/oyuncu/${player.userId}/${player.userSlug}`}
                    className="font-bold text-cream text-xs sm:text-sm hover:text-gold-400 transition-colors truncate max-w-[130px] sm:max-w-none"
                  >
                    {player.userName}
                  </Link>

                  {player.titleName && (
                    <div className="hidden sm:inline-flex items-center px-2 py-0.5 bg-ink-700 border border-gold-500/20 rounded">
                      <span className="text-[11px] font-semibold text-gold-400 uppercase tracking-wide">
                        {player.titleName}
                      </span>
                    </div>
                  )}
                </div>

                {player.clanId > 0 && player.clanName && (
                  <div className="hidden sm:flex items-center gap-1 mt-0.5">
                    <Link
                      href={`/profil/klan/${player.clanId}/${player.clanSlug}`}
                      className="flex items-center gap-1 hover:text-gold-400 transition-colors"
                    >
                      <IconUsers className="w-3 h-3 text-cream-dim" />
                      <span className="text-[11px] font-semibold text-cream tracking-wide">
                        {player.clanName}
                      </span>
                    </Link>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-8 flex-shrink-0">
              <div className="hidden md:block w-64">
                <div className="flex items-center justify-between mb-1">
                  <div className={cn("text-sm", hasRebirth ? "text-purple-400" : "text-cream")}>
                    <span className="text-xs text-cream-dim font-normal">Seviye</span>
                    <span className="font-bold ml-1">
                      {player.level}
                      {hasRebirth && (
                        <span className="text-purple-400">/{player.rebirthLevel}</span>
                      )}
                    </span>
                  </div>
                  <div className="text-xs text-cream-dim">
                    <span className="font-normal">EXP</span>
                    <span className="font-bold text-cream ml-1">
                      {player.expPercentage}%
                    </span>
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

              <div className="text-center min-w-[3.5rem] sm:min-w-[5rem]">
                <div className="text-[8px] sm:text-[11px] text-cream-dim uppercase tracking-wider font-medium">
                  Ulusal Puan
                </div>
                <div className="text-sm sm:text-lg font-black bg-gradient-to-r from-gold-400 to-gold-500 bg-clip-text text-transparent">
                  {player.formattedLoyalty}
                </div>
              </div>
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
    <div className="min-h-screen bg-ink-900">
      <Header />
      
      <div className="bg-gradient-to-br from-ink-900 via-ink-800 to-ink-900 min-h-screen">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-6 py-6">
          {/* Page Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gold-500/15 border border-gold-500/30 flex items-center justify-center">
              <IconTrophy className="w-6 h-6 text-gold-400" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-cream">Oyuncu Siralamasi</h1>
              <p className="text-sm text-cream-dim">En guclu oyunculari kesfet</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Filter Section */}
            <div className="bg-ink-800 border border-line rounded-xl p-3 sm:p-4">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <div className="w-full sm:flex-1 relative order-1">
                  <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-cream-dim" />
                  <Input
                    ref={searchRef}
                    placeholder="Oyuncu ara..."
                    defaultValue={filters.userName}
                    className="pl-10 bg-ink-700 border-line text-cream placeholder:text-cream-dim focus:border-gold-500 focus:ring-gold-500/20 h-9"
                    disabled={isRefreshing}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleFilterChange("userName", e.currentTarget.value)
                    }}
                  />
                </div>

                <div className="hidden sm:block w-px h-8 bg-line order-2" />

                <div className="flex items-center gap-2 w-full sm:w-auto order-3">
                  <Select
                    value={filters.nation.toString()}
                    onValueChange={(value) => handleFilterChange("nation", parseInt(value))}
                    disabled={isRefreshing}
                  >
                    <SelectTrigger className="flex-1 sm:flex-none sm:w-32 bg-ink-700 border-line text-cream focus:border-gold-500 focus:ring-gold-500/20 hover:border-gold-500/50 transition-colors h-9">
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
                    <SelectTrigger className="flex-1 sm:flex-none sm:w-32 bg-ink-700 border-line text-cream focus:border-gold-500 focus:ring-gold-500/20 hover:border-gold-500/50 transition-colors h-9">
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
                    <SelectTrigger className="flex-1 sm:flex-none sm:w-32 bg-ink-700 border-line text-cream focus:border-gold-500 focus:ring-gold-500/20 hover:border-gold-500/50 transition-colors h-9">
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
                    className="flex-1 sm:flex-none bg-ink-700 border-line text-cream font-semibold text-sm h-9 px-4 hover:bg-ink-750 hover:border-gold-500/30"
                    onClick={handleReset}
                  >
                    <IconEraser className="w-4 h-4 mr-1" />
                    <span className="hidden sm:inline">Sifirla</span>
                  </Button>
                </div>
              </div>
            </div>

            {/* Rankings List */}
            <div className="space-y-3">
              {filteredPlayers.length === 0 ? (
                <div className="text-center py-12">
                  <IconTrophy className="w-12 h-12 text-cream-dim mx-auto mb-4" />
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
              <div className="mt-6 py-4 flex justify-center">
                <button
                  type="button"
                  disabled={isRefreshing}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-ink-700 border border-line text-cream-dim hover:border-gold-500 hover:text-gold-400 transition-all text-sm font-medium disabled:opacity-50"
                >
                  <IconChevronDown className="w-4 h-4" />
                  Daha Fazla Yukle
                </button>
              </div>
            )}

            <div className="mt-6 py-4 text-center">
              <p className="text-sm text-cream-dim">
                Toplam {filteredPlayers.length} oyuncu listelendi
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
