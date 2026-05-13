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
  IconShield,
  IconSearch,
  IconEraser,
  IconLoader2,
  IconChevronDown,
  IconCrown,
  IconUsers,
} from "@tabler/icons-react"
import Link from "next/link"
import { mockClans, nations, clanSortOptions } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

// Simplified Imagex replacement - using div placeholders
function GameIcon({ icon, alt, className }: { icon: string; alt: string; className?: string }) {
  const getIconBg = () => {
    if (icon === "Karus") return "bg-gradient-to-br from-red-500/30 to-red-600/20 text-red-400"
    if (icon === "Human") return "bg-gradient-to-br from-blue-500/30 to-blue-600/20 text-blue-400"
    if (icon === "dragon") return "bg-gradient-to-br from-red-500/30 to-red-600/20 text-red-400"
    if (icon === "phoenix") return "bg-gradient-to-br from-orange-500/30 to-orange-600/20 text-orange-400"
    if (icon === "ice") return "bg-gradient-to-br from-cyan-500/30 to-cyan-600/20 text-cyan-400"
    if (icon === "storm") return "bg-gradient-to-br from-purple-500/30 to-purple-600/20 text-purple-400"
    if (icon === "fire") return "bg-gradient-to-br from-amber-500/30 to-amber-600/20 text-amber-400"
    if (icon === "skull") return "bg-gradient-to-br from-gray-500/30 to-gray-600/20 text-gray-400"
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
    return <IconShield className="w-4 h-4" />
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

interface Clan {
  clanId: number
  clanName: string
  clanSlug: string
  nation: number
  nationText: string
  flag: number
  clanSymbol: string
  clanLevelText: string
  points: number
  formattedPoints: string
  clanPointFund: number
  formattedClanPointFund: string
  members: number
  clanIcon: string | null
  rank: number
  animation: { grade: number }
}

function ClanRow({ clan }: { clan: Clan }) {
  const rank = clan.rank
  const isTopThree = rank <= 3

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

          {/* Right Panel - Clan Info */}
          <div className="flex-1 flex items-center px-2 sm:px-4 py-2 sm:py-3 gap-2 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              <div className="flex gap-0.5 sm:gap-1 flex-shrink-0">
                {/* Clan Icon */}
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded bg-ink-700/50 flex items-center justify-center border border-line/30">
                  <IconShield className="w-4 h-4 sm:w-5 sm:h-5 text-gold-400" />
                </div>
                
                {/* Clan Symbol */}
                <GameIcon 
                  icon={clan.clanSymbol} 
                  alt="Clan Symbol" 
                  className="hidden sm:flex w-10 h-10" 
                />

                {/* Nation */}
                <GameIcon 
                  icon={clan.nationText} 
                  alt={clan.nationText} 
                  className="w-8 h-8 sm:w-10 sm:h-10" 
                />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                  <Link
                    href={`/profil/klan/${clan.clanId}/${clan.clanSlug}`}
                    className="font-bold text-cream text-xs sm:text-base hover:text-gold-400 transition-colors truncate max-w-[130px] sm:max-w-none"
                  >
                    {clan.clanName}
                  </Link>
                </div>

                <div className="hidden sm:flex items-center gap-1 mt-0.5">
                  <IconUsers className="w-3 h-3 text-cream-dim" />
                  <span className="text-xs text-cream-dim">{clan.members} uye</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-6 flex-shrink-0">
              <div className="hidden md:block text-center min-w-[5rem]">
                <div className="text-[11px] text-cream-dim uppercase tracking-wider font-medium">
                  Klan Puani
                </div>
                <div className="text-lg font-black text-emerald-400">
                  {clan.formattedClanPointFund}
                </div>
              </div>

              <div className="text-center min-w-[3.5rem] sm:min-w-[5rem]">
                <div className="text-[8px] sm:text-[11px] text-cream-dim uppercase tracking-wider font-medium">
                  Toplam NP
                </div>
                <div className="text-sm sm:text-lg font-black bg-gradient-to-r from-gold-400 to-gold-500 bg-clip-text text-transparent">
                  {clan.formattedPoints}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ClansRankingPage() {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [filters, setFilters] = useState({
    nation: 0,
    sortBy: "points",
    clanName: "",
  })
  const searchRef = useRef<HTMLInputElement>(null)

  const handleFilterChange = useCallback((key: string, value: string | number) => {
    setIsRefreshing(true)
    setFilters(prev => ({ ...prev, [key]: value }))
    setTimeout(() => setIsRefreshing(false), 500)
  }, [])

  const handleReset = useCallback(() => {
    setIsRefreshing(true)
    setFilters({ nation: 0, sortBy: "points", clanName: "" })
    if (searchRef.current) searchRef.current.value = ""
    setTimeout(() => setIsRefreshing(false), 500)
  }, [])

  // Filter clans based on current filters
  const filteredClans = mockClans.filter(clan => {
    if (filters.nation !== 0 && clan.nationText !== nations[filters.nation]) return false
    if (filters.clanName && !clan.clanName.toLowerCase().includes(filters.clanName.toLowerCase())) return false
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
              <IconShield className="w-6 h-6 text-gold-400" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-cream">Klan Siralamasi</h1>
              <p className="text-sm text-cream-dim">En guclu klanlari kesfet</p>
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
                    placeholder="Klan ara..."
                    defaultValue={filters.clanName}
                    className="pl-10 bg-ink-700 border-line text-cream placeholder:text-cream-dim focus:border-gold-500 focus:ring-gold-500/20 h-9"
                    disabled={isRefreshing}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleFilterChange("clanName", e.currentTarget.value)
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
                    <SelectTrigger className="flex-1 sm:flex-none sm:w-36 bg-ink-700 border-line text-cream focus:border-gold-500 focus:ring-gold-500/20 hover:border-gold-500/50 transition-colors h-9">
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
                    value={filters.sortBy}
                    onValueChange={(value) => handleFilterChange("sortBy", value)}
                    disabled={isRefreshing}
                  >
                    <SelectTrigger className="flex-1 sm:flex-none sm:w-36 bg-ink-700 border-line text-cream focus:border-gold-500 focus:ring-gold-500/20 hover:border-gold-500/50 transition-colors h-9">
                      <SelectValue placeholder="Siralama" />
                    </SelectTrigger>
                    <SelectContent className="bg-ink-800 border-line shadow-lg">
                      {Object.entries(clanSortOptions).map(([value, label]) => (
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
                      if (searchRef?.current) handleFilterChange("clanName", searchRef.current.value)
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
              {filteredClans.length === 0 ? (
                <div className="text-center py-12">
                  <IconShield className="w-12 h-12 text-cream-dim mx-auto mb-4" />
                  <p className="text-cream-dim">Sonuc bulunamadi</p>
                </div>
              ) : (
                filteredClans.map((clan) => (
                  <ClanRow key={clan.clanId} clan={clan} />
                ))
              )}
            </div>

            {/* Load More */}
            {filteredClans.length > 0 && (
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
                Toplam {filteredClans.length} klan listelendi
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
