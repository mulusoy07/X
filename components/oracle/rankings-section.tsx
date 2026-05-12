"use client"

import { useState } from "react"
import Link from "next/link"
import {
  IconTrophy,
  IconUsers,
  IconShield,
  IconCrown,
  IconChevronRight,
} from "@tabler/icons-react"

type TabType = "players" | "clans" | "staff" | "kings"

interface Player {
  rank: number
  name: string
  clan: string
  nation: "karus" | "human"
  playerClass: "warrior" | "rogue" | "mage" | "priest"
  title: string
  level: string
  exp: number
  monthlyNP: number
}

interface Clan {
  rank: number
  name: string
  leader: string
  nation: "karus" | "elmorad"
  members: number
  points: number
  level: string
  exp: number
}

interface Staff {
  rank: number
  name: string
  role: string
  isOnline: boolean
}

interface King {
  rank: number
  name: string
  nation: "karus" | "elmorad"
  title: string
  since: string
}

const players: Player[] = [
  { rank: 1, name: "Thoketh914", clan: "BrutalGuard", nation: "karus", playerClass: "priest", title: "TITLE #1", level: "Sv. 83/3", exp: 30, monthlyNP: 18200 },
  { rank: 2, name: "Gorus424", clan: "BrutalGuard", nation: "karus", playerClass: "warrior", title: "TITLE #2", level: "Sv. 83/3", exp: 91, monthlyNP: 15600 },
  { rank: 3, name: "Cedion252", clan: "SilverEmpire", nation: "human", playerClass: "rogue", title: "TITLE #3", level: "Sv. 83/3", exp: 62, monthlyNP: 14300 },
  { rank: 4, name: "Arthion93", clan: "SilverForce", nation: "human", playerClass: "mage", title: "TITLE #4", level: "Sv. 83/3", exp: 31, monthlyNP: 12100 },
  { rank: 5, name: "Kragath680", clan: "ShadowForce", nation: "karus", playerClass: "rogue", title: "TITLE #5", level: "Sv. 83/3", exp: 7, monthlyNP: 10800 },
]

const clans: Clan[] = [
  { rank: 1, name: "IronLegion", leader: "User1", nation: "karus", members: 48, points: 1560000, level: "Lv. 5", exp: 85 },
  { rank: 2, name: "ShadowPact", leader: "User2", nation: "elmorad", members: 45, points: 1420000, level: "Lv. 5", exp: 72 },
  { rank: 3, name: "PhoenixGuard", leader: "User3", nation: "karus", members: 42, points: 1280000, level: "Lv. 4", exp: 95 },
  { rank: 4, name: "FrostBorn", leader: "User4", nation: "elmorad", members: 40, points: 1150000, level: "Lv. 4", exp: 60 },
  { rank: 5, name: "StormRiders", leader: "User5", nation: "karus", members: 38, points: 980000, level: "Lv. 4", exp: 45 },
]

const staff: Staff[] = [
  { rank: 1, name: "OracleGM", role: "Oyun Yoneticisi", isOnline: true },
  { rank: 2, name: "OracleMod", role: "Moderator", isOnline: true },
  { rank: 3, name: "OracleGM2", role: "Oyun Yoneticisi", isOnline: false },
  { rank: 4, name: "SupportLead", role: "Destek Lideri", isOnline: true },
  { rank: 5, name: "EventMaster", role: "Etkinlik Sorumlusu", isOnline: false },
]

const kings: King[] = [
  { rank: 1, name: "Thoketh914", nation: "karus", title: "Karus Krali", since: "2026-01-15" },
  { rank: 2, name: "Cedion252", nation: "elmorad", title: "El Morad Krali", since: "2026-01-15" },
]

const tabs = [
  { id: "players" as TabType, label: "Oyuncular", icon: IconUsers },
  { id: "clans" as TabType, label: "Klanlar", icon: IconShield },
  { id: "staff" as TabType, label: "Yoneticiler", icon: IconShield },
  { id: "kings" as TabType, label: "Krallar", icon: IconCrown },
]

// Rank icon - uses external images for top 3, number badge for others
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



export function RankingsSection() {
  const [activeTab, setActiveTab] = useState<TabType>("players")

  const getRowBg = (rank: number) => {
    if (rank === 1) return "bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border-amber-500/20"
    if (rank === 2) return "bg-gradient-to-r from-slate-400/10 via-slate-400/5 to-transparent border-slate-400/20"
    if (rank === 3) return "bg-gradient-to-r from-amber-700/10 via-amber-700/5 to-transparent border-amber-700/20"
    return "border-line hover:bg-ink-800/30"
  }

  return (
    <div className="card rounded-xl overflow-hidden">
      {/* Header */}
      <div className="section-header">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400">
            <IconTrophy className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-cream">En Iyiler</h3>
            <p className="text-xs text-cream-dim">En iyi oyuncular ve klanlar</p>
          </div>
        </div>
        <Link href="/siralamalar" className="text-xs text-gold-400 hover:text-gold-300 flex items-center gap-1">
          Tumunu Gor <IconChevronRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Tabs */}
      <div className="px-4 pt-4">
        <div className="flex bg-ink-900/50 rounded-xl p-1 border border-line">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === tab.id
                    ? "gold-btn"
                    : "text-cream-dim hover:text-cream hover:bg-ink-800/50"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Players Tab */}
        {activeTab === "players" && (
          <div className="space-y-3">
            {players.map((player) => (
              <div
                key={player.rank}
                className={`relative overflow-hidden rounded-xl border transition-colors duration-200 ${getRowBg(player.rank)}`}
              >
                <div className="relative flex items-stretch">
                  {/* Rank Section */}
                  <div className="flex items-center justify-center px-3 py-3 bg-ink-800/20 border-r border-line/50">
                    <RankIcon rank={player.rank} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex items-center px-3 gap-3">
                    {/* Nation & Class Icons */}
                    <div className="flex gap-1 shrink-0">
                      <div className="w-8 h-8 rounded overflow-hidden bg-ink-700/50 p-0.5">
                        <div className={`nation-icon nation-${player.nation}`} style={{ width: 28, height: 28 }} />
                      </div>
                      <div className="w-8 h-8 rounded overflow-hidden bg-ink-700/50 p-0.5">
                        <div className={`class-icon class-${player.playerClass}`} style={{ width: 28, height: 28 }} />
                      </div>
                    </div>

                    {/* Name & Clan */}
                    <div className="min-w-0 flex-1">
                      <Link href={`/profile/user/${player.rank}/${player.name.toLowerCase()}`} className="font-bold text-cream text-sm truncate block max-w-[150px] hover:text-gold-400 transition-colors">
                        {player.name}
                      </Link>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Link href="#" className="flex items-center gap-1 hover:opacity-80 transition-opacity">
                          <span className="text-[11px] text-cream-dim truncate">{player.clan}</span>
                        </Link>
                      </div>
                    </div>

                    {/* Monthly NP */}
                    <div className="text-center min-w-[4rem] shrink-0">
                      <div className="text-[11px] text-cream-dim uppercase tracking-wider font-medium">Aylik NP</div>
                      <div className="text-sm font-black bg-gradient-to-r from-gold-400 to-gold-500 bg-clip-text text-transparent">
                        {player.monthlyNP.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Clans Tab */}
        {activeTab === "clans" && (
          <div className="space-y-3">
            {clans.map((clan) => (
              <div
                key={clan.rank}
                className={`relative overflow-hidden rounded-xl border transition-colors duration-200 ${getRowBg(clan.rank)}`}
              >
                <div className="relative flex items-stretch">
                  {/* Rank Section */}
                  <div className="flex items-center justify-center px-3 py-3 bg-ink-800/20 border-r border-line/50">
                    <RankIcon rank={clan.rank} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex items-center px-3 gap-3">
                    {/* Clan Icon */}
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold-500/20 to-amber-500/10 border border-gold-500/30 flex items-center justify-center shrink-0">
                      <IconShield className="w-5 h-5 text-gold-400" />
                    </div>

                    {/* Name & Leader */}
                    <div className="min-w-0 flex-1">
                      <Link href={`/profile/clan/${clan.rank}/${clan.name.toLowerCase()}`} className="font-bold text-cream text-sm truncate block max-w-[150px] hover:text-gold-400 transition-colors">
                        {clan.name}
                      </Link>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="text-[11px] text-cream-dim">Lider: {clan.leader}</span>
                      </div>
                    </div>

                    {/* Members */}
                    <div className="hidden sm:block text-center min-w-[3rem] shrink-0">
                      <div className="text-[11px] text-cream-dim uppercase tracking-wider font-medium">Uye</div>
                      <div className="text-sm font-bold text-cream">{clan.members}</div>
                    </div>

                    {/* Points */}
                    <div className="text-center min-w-[5rem] shrink-0">
                      <div className="text-[11px] text-cream-dim uppercase tracking-wider font-medium">Puan</div>
                      <div className="text-sm font-black bg-gradient-to-r from-gold-400 to-gold-500 bg-clip-text text-transparent">
                        {clan.points.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Staff Tab */}
        {activeTab === "staff" && (
          <div className="space-y-3">
            {staff.map((member, index) => (
              <div
                key={member.rank}
                className="relative overflow-hidden rounded-xl bg-ink-800/30 border border-line hover:border-gold-500/30 transition-colors duration-200"
              >
                <div className="relative flex items-stretch">
                  {/* Rank Section */}
                  <div className="flex items-center justify-center px-3 py-3 bg-ink-800/20 border-r border-line/50">
                    <div className="w-8 h-8 rounded-lg bg-ink-700 border border-line flex items-center justify-center">
                      <span className="text-xs font-bold text-cream-dim">{index + 1}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex items-center px-3 gap-3">
                    {/* Icon */}
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                      <IconShield className="w-4 h-4 text-emerald-400" />
                    </div>

                    {/* Info */}
                    <div className="min-w-0 flex-1">
                      <span className="font-bold text-cream text-sm truncate block">{member.name}</span>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="text-[11px] text-cream-dim">{member.role}</span>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="text-center min-w-[5rem] shrink-0">
                      <div className="text-[11px] text-cream-dim uppercase tracking-wider font-medium">Durum</div>
                      <div className={`text-sm font-bold ${member.isOnline ? "text-emerald-400" : "text-cream-dim"}`}>
                        {member.isOnline ? "Cevrimici" : "Cevrimdisi"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Kings Tab */}
        {activeTab === "kings" && (
          <div className="space-y-3">
            {kings.map((king, index) => (
              <div
                key={king.rank}
                className={`relative overflow-hidden rounded-xl border transition-colors duration-200 ${
                  king.nation === "karus" 
                    ? "bg-gradient-to-r from-rose-500/10 via-rose-500/5 to-transparent border-rose-500/20" 
                    : "bg-gradient-to-r from-sky-500/10 via-sky-500/5 to-transparent border-sky-500/20"
                }`}
              >
                <div className="relative flex items-stretch">
                  {/* Rank Section */}
                  <div className="flex items-center justify-center px-3 py-3 bg-ink-800/20 border-r border-line/50">
                    <div className="w-8 h-8 rounded-lg bg-ink-700 border border-line flex items-center justify-center">
                      <span className="text-xs font-bold text-cream-dim">{index + 1}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex items-center px-3 gap-3">
                    {/* Nation Icon */}
                    <div className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 ${
                      king.nation === "karus" ? "bg-rose-500/20 border-rose-500/30" : "bg-sky-500/20 border-sky-500/30"
                    }`}>
                      <IconCrown className={`w-4 h-4 ${king.nation === "karus" ? "text-rose-400" : "text-sky-400"}`} />
                    </div>

                    {/* Info */}
                    <div className="min-w-0 flex-1">
                      <span className={`font-bold text-sm truncate block ${king.nation === "karus" ? "text-rose-400" : "text-sky-400"}`}>
                        {king.name}
                      </span>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="text-[11px] text-cream-dim">{king.title}</span>
                      </div>
                    </div>

                    {/* Since */}
                    <div className="text-center min-w-[5rem] shrink-0">
                      <div className="text-[11px] text-cream-dim uppercase tracking-wider font-medium">Tahta</div>
                      <div className="text-sm font-black bg-gradient-to-r from-gold-400 to-gold-500 bg-clip-text text-transparent">
                        {new Date(king.since).toLocaleDateString("tr-TR")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
