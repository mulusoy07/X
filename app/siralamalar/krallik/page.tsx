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
  IconChevronRight,
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
    border: isKarus ? "border-red-500/30" : "border-blue-500/30",
    isKarus,
  }
}

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

// Components
function NationSectionHeader({ nation, title, subtitle }: { nation: string; title: string; subtitle?: string }) {
  const { gradient, isKarus } = getNationStyles(nation)

  return (
    <div className="relative px-4 sm:px-6 py-4 border-b border-line bg-ink-700/80">
      <div className={cn("absolute inset-0 bg-gradient-to-r opacity-15", gradient)} />
      <div className="relative flex items-center gap-3">
        <div className="flex-shrink-0">
          <div className={cn(
            "w-10 h-10 rounded-lg overflow-hidden p-0.5 border border-line/30",
            isKarus ? "bg-ink-700/50" : "bg-ink-700/50"
          )}>
            <div className={`nation-icon nation-${isKarus ? "karus" : "human"}`} style={{ width: 36, height: 36 }} />
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
}: {
  player: { userId: number; userName: string; userSlug: string; clanId: number; clanName: string; clanSlug: string; clanIcon: string | null; className: string; classIcon: string }
  showRank?: boolean
  rank?: number
  showVoteDate?: boolean
  voteDate?: string
}) {
  const classIconName = player.classIcon.toLowerCase()

  return (
    <div className="relative flex items-stretch">
      {showRank && rank !== undefined && (
        <div className="flex items-center justify-center px-3 py-3 bg-ink-800/20 border-r border-line/50">
          <RankIcon rank={rank} />
        </div>
      )}

      <div className="flex-1 flex items-center px-3 py-3 gap-3">
        <div className="w-8 h-8 rounded overflow-hidden bg-ink-700/50 p-0.5 shrink-0">
          <div className={`class-icon class-${classIconName}`} style={{ width: 28, height: 28 }} />
        </div>

        <div className="min-w-0 flex-1">
          <Link
            href={`/profil/oyuncu/${player.userId}/${player.userSlug}`}
            className="font-bold text-cream text-sm hover:text-gold-400 transition-colors truncate block max-w-[150px]"
          >
            {player.userName}
          </Link>

          {player.clanId > 0 && (
            <div className="flex items-center gap-1 mt-0.5">
              <Link
                href={`/profil/klan/${player.clanId}/${player.clanSlug}`}
                className="flex items-center gap-1 hover:text-gold-400 transition-colors"
              >
                <IconUsers className="w-3 h-3 text-cream-dim" />
                <span className="text-[11px] text-cream-dim truncate max-w-[80px]">
                  {player.clanName}
                </span>
              </Link>
            </div>
          )}
        </div>

        {showVoteDate && voteDate && (
          <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-lg bg-ink-700/30 border border-line/50 shrink-0">
            <IconCalendar className="w-3 h-3 text-cream-dim" />
            <span className="text-xs text-cream-dim">{voteDate}</span>
          </div>
        )}
      </div>
    </div>
  )
}

function KingCard({ king, onOpenModal }: { king: King; onOpenModal: (king: King) => void }) {
  const { gradient, text, isKarus } = getNationStyles(king.nation)
  const classIconName = king.classIcon.toLowerCase()
  const nationClass = isKarus ? "karus" : "human"

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
              {/* Nation & Class Icons */}
              <div className="flex gap-1 shrink-0">
                <div className="w-10 h-10 rounded overflow-hidden bg-ink-700/50 p-0.5">
                  <div className={`nation-icon nation-${nationClass}`} style={{ width: 36, height: 36 }} />
                </div>
                <div className="w-10 h-10 rounded overflow-hidden bg-ink-700/50 p-0.5">
                  <div className={`class-icon class-${classIconName}`} style={{ width: 36, height: 36 }} />
                </div>
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
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 gold-btn active:scale-[0.98]"
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

  // Row background styling based on rank
  const getRowBg = (rank: number) => {
    const baseHover = "hover:shadow-lg hover:shadow-black/20"
    if (rank === 1) return `bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border-amber-500/20 hover:border-amber-500/40 hover:from-amber-500/15 ${baseHover}`
    if (rank === 2) return `bg-gradient-to-r from-slate-400/10 via-slate-400/5 to-transparent border-slate-400/20 hover:border-slate-400/40 hover:from-slate-400/15 ${baseHover}`
    if (rank === 3) return `bg-gradient-to-r from-amber-700/10 via-amber-700/5 to-transparent border-amber-700/20 hover:border-amber-700/40 hover:from-amber-700/15 ${baseHover}`
    return `border-line hover:border-gold-500/30 hover:bg-ink-800/40 ${baseHover}`
  }

  return (
    <div className="relative bg-ink-800 border border-line rounded-2xl overflow-hidden transition-all duration-300 hover:border-line/80">
      <NationSectionHeader
        nation={nation}
        title={title}
        subtitle={`${candidates.length} aday`}
      />

      <div className="p-4 sm:p-6 space-y-2">
        {candidates.map((candidate) => {
          const classIconName = candidate.classIcon.toLowerCase()

          return (
            <div
              key={candidate.userId}
              className={`relative overflow-hidden rounded-xl border transition-all duration-200 ${getRowBg(candidate.rank)}`}
            >
              <div className="flex items-center">
                {/* Rank */}
                <div className="flex items-center justify-center px-3 py-3 bg-ink-800/20 border-r border-line/50">
                  <RankIcon rank={candidate.rank} />
                </div>

                {/* Player Info */}
                <div className="flex-1 flex items-center px-3 py-3 gap-3">
                  <div className="w-8 h-8 rounded overflow-hidden bg-ink-700/50 p-0.5 shrink-0">
                    <div className={`class-icon class-${classIconName}`} style={{ width: 28, height: 28 }} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/profil/oyuncu/${candidate.userId}/${candidate.userSlug}`}
                      className="font-bold text-cream text-sm hover:text-gold-400 transition-colors truncate block max-w-[120px]"
                    >
                      {candidate.userName}
                    </Link>
                    {candidate.clanId > 0 && (
                      <div className="flex items-center gap-1 mt-0.5">
                        <IconUsers className="w-3 h-3 text-cream-dim" />
                        <span className="text-[11px] text-cream-dim truncate max-w-[60px]">{candidate.clanName}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Vote Stats */}
                <div className="hidden sm:block w-32 pr-2">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1">
                      <IconThumbUp className="w-3 h-3 text-emerald-400" />
                      <span className="text-xs font-bold text-cream">{candidate.formattedVotes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <IconChartPie className={cn("w-3 h-3", text)} />
                      <span className={cn("text-xs font-bold", text)}>%{candidate.percentage}</span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-ink-900 rounded-full overflow-hidden">
                    <div
                      className={cn("h-full transition-all duration-500 bg-gradient-to-r", gradient)}
                      style={{ width: `${candidate.percentage}%` }}
                    />
                  </div>
                </div>

                {/* Button */}
                <button
                  onClick={() => onOpenModal(candidate)}
                  className="flex items-center justify-center gap-1 px-3 py-1.5 mr-3 rounded-lg text-xs font-semibold transition-all duration-200 gold-btn active:scale-[0.98] shrink-0"
                >
                  <IconUsers className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Oylar</span>
                </button>
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
            <div className="divide-y divide-line/50">
              {voters.map((voter, index) => (
                <div key={voter.userId} className="hover:bg-ink-700/30 transition-colors">
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
              <IconUsers className="w-12 h-12 text-cream-dim mb-3 opacity-50" />
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
    <div className="min-h-screen pb-16 lg:pb-0">
      <Header />
      
      <main className="mx-auto max-w-[1400px] px-4 lg:px-6 py-8 lg:py-12">
        {/* Page Header */}
        <div className="card rounded-xl overflow-hidden mb-6">
          <div className="section-header">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-md bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400">
                <IconCrown className="w-4 h-4" />
              </div>
              <div>
                <h1 className="font-semibold text-cream text-lg">Krallik Secimleri</h1>
                <p className="text-xs text-cream-dim">Ulusal liderlik secim sonuclari</p>
              </div>
            </div>
            <Link href="/siralamalar" className="text-xs text-gold-400 hover:text-gold-300 flex items-center gap-1">
              Tum Siralamalar <IconChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Kings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <KingCard king={karusKing} onOpenModal={openVotersModal} />
          <KingCard king={humanKing} onOpenModal={openVotersModal} />
        </div>

        {/* Vote Rankings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <VoteRanking
            title="Karus Aday Siralamasi"
            candidates={karusVotes}
            nation="karus"
            onOpenModal={openVotersModal}
          />
          <VoteRanking
            title="El Morad Aday Siralamasi"
            candidates={humanVotes}
            nation="human"
            onOpenModal={openVotersModal}
          />
        </div>
      </main>

      <Footer />

      {/* Voter Modal */}
      <VoterModal
        isOpen={isModalOpen}
        onClose={closeModal}
        candidate={selectedCandidate}
        nation={selectedCandidate?.nation}
        voters={voters}
      />
    </div>
  )
}
