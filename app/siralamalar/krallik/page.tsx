"use client"

import { useState, useCallback, useEffect } from "react"
import { Header } from "@/components/oracle/header"
import { Footer } from "@/components/oracle/footer"
import {
  IconCrown,
  IconThumbUp,
  IconChartPie,
  IconUsers,
  IconX,
  IconCalendar,
  IconShield,
} from "@tabler/icons-react"
import Link from "next/link"
import { mockKingElections } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

// Types
interface Voter {
  userId: number
  userName: string
  userSlug: string
  clanId: number
  clanName: string
  clanSlug: string
  clanIcon: string | null
  className: string
  classIcon: string
  date: string
}

interface VoteCandidate {
  userId: number
  userName: string
  userSlug: string
  clanId: number
  clanName: string
  clanSlug: string
  clanIcon: string | null
  className: string
  classIcon: string
  nationText: string
  rank: number
  votes: number
  formattedVotes: string
  percentage: number
  nation: "karus" | "human"
  voters: Voter[]
}

interface King {
  userId: number
  userName: string
  userSlug: string
  clanId: number
  clanName: string
  clanSlug: string
  clanIcon: string | null
  className: string
  classIcon: string
  nationText: string
  nation: "karus" | "human"
  votes: number
  formattedVotes: string
  percentage: number
}

// Hooks
function useVoterModal() {
  const [selectedCandidate, setSelectedCandidate] = useState<VoteCandidate | King | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [voters, setVoters] = useState<Voter[]>([])

  const openVotersModal = useCallback((candidate: VoteCandidate | King) => {
    setSelectedCandidate(candidate)
    setVoters((candidate as VoteCandidate).voters || [])
    setIsModalOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
    setSelectedCandidate(null)
    setVoters([])
  }, [])

  return {
    selectedCandidate,
    isModalOpen,
    voters,
    openVotersModal,
    closeModal
  }
}

// Helper functions
function getNationStyles(nation: string) {
  const isKarus = nation === "karus"
  return {
    gradient: isKarus ? "from-red-500 to-red-600" : "from-blue-500 to-blue-600",
    text: isKarus ? "text-red-400" : "text-blue-400",
    isKarus,
  }
}

// Simplified icon component
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

// Components
function NationSectionHeader({ nation, title, subtitle }: { nation: string; title: string; subtitle?: string }) {
  const { gradient, isKarus } = getNationStyles(nation)

  return (
    <div className="relative px-4 sm:px-6 py-4 border-b border-line bg-ink-700/80">
      <div className={cn("absolute inset-0 bg-gradient-to-r opacity-15", gradient)} />
      <div className="relative flex items-center gap-3">
        <div className="flex-shrink-0">
          <div className={cn(
            "w-12 h-12 rounded-lg overflow-hidden p-1 border border-line/30 flex items-center justify-center",
            isKarus ? "bg-red-500/20" : "bg-blue-500/20"
          )}>
            <IconShield className={cn("w-6 h-6", isKarus ? "text-red-400" : "text-blue-400")} />
          </div>
        </div>
        <div className="flex-1">
          <h2 className="text-base sm:text-lg font-bold text-cream">{title}</h2>
          {subtitle && (
            <p className="text-xs text-cream-dim">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  )
}

function PlayerCard({
  player,
  showRank = false,
  rank,
  showVoteDate = false,
  voteDate,
  isTopThree = false
}: {
  player: { userId: number; userName: string; userSlug: string; clanId: number; clanName: string; clanSlug: string; clanIcon: string | null; className: string; classIcon: string }
  showRank?: boolean
  rank?: number
  showVoteDate?: boolean
  voteDate?: string
  isTopThree?: boolean
}) {
  return (
    <div className="relative flex items-stretch">
      {showRank && rank !== undefined && (
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
      )}

      <div className="flex-1 flex items-center px-2 sm:px-4 py-2 sm:py-3 gap-2 sm:gap-4">
        <div className="flex gap-0.5 sm:gap-1 flex-shrink-0">
          <GameIcon 
            icon={player.classIcon} 
            alt={player.className} 
            className="w-8 h-8 sm:w-10 sm:h-10" 
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
            <Link
              href={`/profil/oyuncu/${player.userId}/${player.userSlug}`}
              className="font-bold text-cream text-xs sm:text-sm hover:text-gold-400 transition-colors truncate max-w-[130px] sm:max-w-none"
            >
              {player.userName}
            </Link>
          </div>

          {player.clanId > 0 && (
            <div className="hidden sm:flex items-center gap-0.5 mt-0.5">
              <Link
                href={`/profil/klan/${player.clanId}/${player.clanSlug}`}
                className="flex items-center gap-0.5 hover:text-gold-400 transition-colors"
              >
                <IconUsers className="w-3 h-3 text-cream-dim" />
                <span className="text-[11px] font-semibold text-cream tracking-wide truncate max-w-[80px]">
                  {player.clanName}
                </span>
              </Link>
            </div>
          )}
        </div>

        {showVoteDate && voteDate && (
          <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-ink-700/30 border border-line/50">
              <IconCalendar className="w-3.5 h-3.5 text-cream-dim" />
              <span className="text-xs text-cream-dim">{voteDate}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function KingCard({ king, onOpenModal }: { king: King; onOpenModal: (king: King) => void }) {
  const { gradient, text, isKarus } = getNationStyles(king.nation)

  return (
    <div className={cn(
      "relative bg-ink-800 border border-line rounded-2xl overflow-hidden transition-all duration-300",
      isKarus ? "hover:border-red-500/40" : "hover:border-blue-500/40"
    )}>
      <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-full flex items-center justify-center shadow-lg border-2 border-yellow-400/50 z-10">
        <IconCrown className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </div>

      <NationSectionHeader
        nation={king.nation}
        title={`${king.nationText} Krali`}
        subtitle={`Mevcut kral: ${king.userName}`}
      />

      <div className="p-4 sm:p-6">
        <div className="p-4 rounded-xl border bg-ink-700/40 border-line/50 mb-4">
          <div className="flex items-center gap-3 justify-between">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="flex-shrink-0">
                <GameIcon 
                  icon={king.classIcon} 
                  alt={king.className} 
                  className="w-10 h-10 sm:w-12 sm:h-12" 
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-base sm:text-lg font-bold text-cream truncate">
                  {king.userName}
                </div>
                {king.clanId > 0 ? (
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <IconUsers className="w-3 h-3 text-cream-dim" />
                    <span className="text-xs sm:text-sm font-semibold text-cream-dim truncate">
                      {king.clanName}
                    </span>
                  </div>
                ) : (
                  <div className="text-xs sm:text-sm text-cream-dim">
                    Klansiz
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <div className="bg-ink-700/50 px-3 py-2 rounded-lg border border-line/30">
                <div className="flex items-center gap-1.5 mb-1">
                  <IconThumbUp className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400" />
                  <span className="text-[9px] sm:text-[10px] text-cream-dim uppercase tracking-wider font-medium">
                    Oy
                  </span>
                </div>
                <div className="text-base sm:text-lg font-bold text-emerald-400">
                  {king.formattedVotes}
                </div>
              </div>

              <div className="bg-ink-700/50 px-3 py-2 rounded-lg border border-line/30">
                <div className="flex items-center gap-1.5 mb-1">
                  <IconChartPie className={cn("w-3 h-3 sm:w-3.5 sm:h-3.5", text)} />
                  <span className="text-[9px] sm:text-[10px] text-cream-dim uppercase tracking-wider font-medium">
                    Oran
                  </span>
                </div>
                <div className={cn("text-base sm:text-lg font-bold", text)}>
                  %{king.percentage}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3">
            <div className="h-2 bg-ink-900 rounded-full overflow-hidden">
              <div
                className={cn("h-full bg-gradient-to-r transition-all duration-500", gradient)}
                style={{ width: `${king.percentage}%` }}
              />
            </div>
          </div>
        </div>

        <button
          onClick={() => onOpenModal(king)}
          className={cn(
            "w-full flex items-center justify-center gap-2 px-4 py-3",
            "rounded-lg text-sm font-semibold",
            "transition-all duration-200",
            "gold-btn",
            "active:scale-[0.98]"
          )}
        >
          <IconUsers className="w-4 h-4" />
          <span>Oy Verenleri Gor</span>
          <span className="px-2 py-0.5 rounded-full bg-black/20 text-xs">
            {king.formattedVotes}
          </span>
        </button>
      </div>
    </div>
  )
}

function VoteRanking({ 
  title, 
  candidates, 
  nation, 
  onOpenModal 
}: { 
  title: string
  candidates: VoteCandidate[]
  nation: string
  onOpenModal: (candidate: VoteCandidate) => void 
}) {
  const { gradient, text } = getNationStyles(nation)

  return (
    <div className="relative bg-ink-800 border border-line rounded-2xl overflow-hidden transition-all duration-300 hover:border-line/80">
      <NationSectionHeader
        nation={nation}
        title={title}
        subtitle={`${candidates.length} aday`}
      />

      <div className="p-4 sm:p-6 space-y-2">
        {candidates.map((candidate) => {
          const isTopThree = candidate.rank <= 3

          return (
            <div
              key={candidate.userId}
              className={cn(
                "group relative overflow-hidden rounded-xl border transition-all duration-200",
                "hover:shadow-lg hover:shadow-black/20",
                isTopThree && candidate.rank === 1 && "bg-gradient-to-r from-yellow-500/10 to-yellow-600/5 border-yellow-500/30 hover:from-yellow-500/15 hover:to-yellow-600/10",
                isTopThree && candidate.rank === 2 && "bg-gradient-to-r from-gray-400/10 to-gray-500/5 border-gray-400/30 hover:from-gray-400/15 hover:to-gray-500/10",
                isTopThree && candidate.rank === 3 && "bg-gradient-to-r from-orange-500/10 to-orange-600/5 border-orange-500/30 hover:from-orange-500/15 hover:to-orange-600/10",
                !isTopThree && "bg-ink-700/30 border-line/50 hover:bg-ink-700/50"
              )}
            >
              <div className="flex flex-row items-center gap-2 sm:gap-3">
                <div className="flex-1 min-w-0">
                  <PlayerCard
                    player={candidate}
                    showRank={true}
                    rank={candidate.rank}
                    isTopThree={isTopThree}
                  />
                </div>

                <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                  <div className="hidden sm:block w-40 flex-shrink-0">
                    <div className="space-y-2">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-1.5">
                            <IconThumbUp className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-sm font-bold text-cream">
                              {candidate.formattedVotes}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <IconChartPie className={cn("w-3.5 h-3.5", text)} />
                            <span className={cn("text-xs font-bold", text)}>
                              %{candidate.percentage}
                            </span>
                          </div>
                        </div>
                        <div className="h-1.5 bg-ink-900 rounded-full overflow-hidden">
                          <div
                            className={cn("h-full transition-all duration-500 bg-gradient-to-r", gradient)}
                            style={{ width: `${candidate.percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenModal(candidate)}
                    className={cn(
                      "flex items-center justify-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2",
                      "rounded-lg text-xs font-semibold",
                      "transition-all duration-200 flex-shrink-0 ml-1 mr-3",
                      "gold-btn",
                      "active:scale-[0.98]"
                    )}
                  >
                    <IconUsers className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Oylar</span>
                    <span className="px-1.5 py-0.5 rounded-full bg-black/20 text-[10px] sm:text-xs">
                      {candidate.formattedVotes}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function VoterModal({ 
  isOpen, 
  onClose, 
  candidate, 
  nation, 
  voters 
}: { 
  isOpen: boolean
  onClose: () => void
  candidate: VoteCandidate | King | null
  nation?: string
  voters: Voter[]
}) {
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen || !candidate) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className="relative bg-ink-800 border border-line rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-line bg-ink-700/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <IconUsers
                className={cn("w-5 h-5", nation === "karus" ? "text-red-400" : "text-blue-400")}
              />
              <h3 className={cn("text-lg font-bold", nation === "karus" ? "text-red-400" : "text-blue-400")}>
                {candidate.userName}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-ink-700/50 transition-colors"
            >
              <IconX className="w-5 h-5 text-cream-dim" />
            </button>
          </div>
          <p className="text-sm text-cream-dim mt-1">
            Toplam {(candidate as VoteCandidate).votes || 0} oy
          </p>
        </div>

        <div className="overflow-y-auto max-h-[60vh]">
          {voters.length > 0 ? (
            <div className="divide-y divide-line">
              {voters.map((voter, index) => (
                <div
                  key={voter.userId}
                  className="group relative overflow-hidden border-0 transition-colors duration-200"
                >
                  <PlayerCard
                    player={voter}
                    showRank={true}
                    rank={index + 1}
                    showVoteDate={true}
                    voteDate={voter.date}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8">
              <IconUsers className="w-12 h-12 text-cream-dim mb-3" />
              <p className="text-sm text-cream-dim">Henuz oy yok</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function KingElectionsPage() {
  const { selectedCandidate, isModalOpen, voters, openVotersModal, closeModal } = useVoterModal()

  const { karusKing, humanKing, karusVotes, humanVotes } = mockKingElections

  return (
    <div className="min-h-screen bg-ink-900">
      <Header />
      
      <div className="bg-gradient-to-br from-ink-900 via-ink-800 to-ink-900 min-h-screen">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-6 py-6">
          {/* Page Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gold-500/15 border border-gold-500/30 flex items-center justify-center">
              <IconCrown className="w-6 h-6 text-gold-400" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-cream">Krallik Secimleri</h1>
              <p className="text-sm text-cream-dim">Ulusal liderlik secim sonuclari</p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <KingCard king={karusKing} onOpenModal={openVotersModal} />
              <KingCard king={humanKing} onOpenModal={openVotersModal} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <VoteRanking
                title="Karus Adaylari"
                candidates={karusVotes}
                nation="karus"
                onOpenModal={openVotersModal}
              />
              <VoteRanking
                title="Human Adaylari"
                candidates={humanVotes}
                nation="human"
                onOpenModal={openVotersModal}
              />
            </div>
          </div>
        </div>
      </div>

      <VoterModal
        isOpen={isModalOpen}
        onClose={closeModal}
        candidate={selectedCandidate}
        nation={selectedCandidate?.nation}
        voters={voters}
      />

      <Footer />
    </div>
  )
}
