"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  IconTrophy,
  IconUsers,
  IconShield,
  IconCrown,
  IconChevronRight,
  IconSword,
  IconFlame,
  IconMedal,
} from "@tabler/icons-react"

type TabType = "players" | "clans" | "staff" | "kings"

interface Player {
  rank: number
  name: string
  clan: string
  nation: "karus" | "elmorad"
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
  { rank: 1, name: "User1", clan: "IronLegion", nation: "karus", title: "TITLE #1", level: "Sv. 83/3", exp: 30, monthlyNP: 250000 },
  { rank: 2, name: "User2", clan: "ShadowPact", nation: "elmorad", title: "TITLE #2", level: "Sv. 83/3", exp: 91, monthlyNP: 247550 },
  { rank: 3, name: "User3", clan: "PhoenixGuard", nation: "karus", title: "TITLE #3", level: "Sv. 83/3", exp: 62, monthlyNP: 245100 },
  { rank: 4, name: "User4", clan: "FrostBorn", nation: "elmorad", title: "TITLE #4", level: "Sv. 83/3", exp: 31, monthlyNP: 242650 },
  { rank: 5, name: "User5", clan: "StormRiders", nation: "karus", title: "TITLE #5", level: "Sv. 83/3", exp: 7, monthlyNP: 240200 },
  { rank: 6, name: "User6", clan: "BloodOath", nation: "elmorad", title: "TITLE #6", level: "Sv. 83/2", exp: 32, monthlyNP: 237750 },
  { rank: 7, name: "User7", clan: "DarkOrder", nation: "karus", title: "TITLE #7", level: "Sv. 83/2", exp: 9, monthlyNP: 235300 },
  { rank: 8, name: "User8", clan: "SilverWolves", nation: "elmorad", title: "TITLE #8", level: "Sv. 83/2", exp: 44, monthlyNP: 232850 },
  { rank: 9, name: "User9", clan: "DragonClaw", nation: "karus", title: "TITLE #9", level: "Sv. 83/2", exp: 84, monthlyNP: 230400 },
  { rank: 10, name: "User10", clan: "NightWatch", nation: "elmorad", title: "TITLE #10", level: "Sv. 83/2", exp: 12, monthlyNP: 227950 },
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

// Medal icons for top 3
const MedalIcon = ({ rank }: { rank: number }) => {
  if (rank === 1) {
    return (
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center border-2 border-amber-300/50">
        <span className="text-ink-900 font-bold text-lg">1</span>
      </div>
    )
  }
  if (rank === 2) {
    return (
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-300 via-slate-400 to-slate-500 flex items-center justify-center border-2 border-slate-200/50">
        <span className="text-ink-900 font-bold text-lg">2</span>
      </div>
    )
  }
  if (rank === 3) {
    return (
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800 flex items-center justify-center border-2 border-amber-500/50">
        <span className="text-cream font-bold text-lg">3</span>
      </div>
    )
  }
  return (
    <div className="w-12 h-12 rounded-lg border border-line flex items-center justify-center">
      <span className="text-cream-dim font-medium text-lg">{rank}</span>
    </div>
  )
}

// Progress bar component
const ProgressBar = ({ value, color = "pink" }: { value: number; color?: "pink" | "gold" }) => {
  const bgColor = color === "pink" ? "bg-pink-500" : "bg-gold-500"
  return (
    <div className="w-24 h-1.5 bg-ink-700 rounded-full overflow-hidden">
      <div 
        className={`h-full ${bgColor} rounded-full transition-all`}
        style={{ width: `${Math.min(value, 100)}%` }}
      />
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
          <div className="space-y-2">
            {players.map((player) => (
              <div
                key={player.rank}
                className={`flex items-center gap-4 p-3 rounded-xl border transition-all cursor-pointer ${getRowBg(player.rank)}`}
              >
                {/* Rank Medal/Number */}
                <MedalIcon rank={player.rank} />

                {/* Player Icons */}
                <div className="flex items-center gap-1.5">
                  <div className="w-8 h-8 rounded-lg bg-ink-700/80 border border-line flex items-center justify-center">
                    <IconSword className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-ink-700/80 border border-line flex items-center justify-center">
                    <IconFlame className="w-4 h-4 text-rose-500" />
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-ink-700/80 border border-line flex items-center justify-center">
                    <IconMedal className="w-4 h-4 text-violet-500" />
                  </div>
                </div>

                {/* Name & Clan */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-cream">{player.name}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                      {player.title}
                    </span>
                  </div>
                  <div className="text-xs text-cream-dim">{player.clan}</div>
                </div>

                {/* Level & Progress */}
                <div className="hidden md:block text-right">
                  <div className="text-sm text-gold-400 font-medium">{player.level}</div>
                  <ProgressBar value={player.exp} color="pink" />
                </div>

                {/* DEY % */}
                <div className="hidden lg:block text-right min-w-[80px]">
                  <div className="text-xs text-cream-dim">DEY. {player.exp}%</div>
                  <ProgressBar value={player.exp} color="pink" />
                </div>

                {/* Monthly NP */}
                <div className="text-right min-w-[90px]">
                  <div className="text-[10px] text-cream-dim uppercase tracking-wider">ULUSAL</div>
                  <div className="font-bold text-gold-400">{player.monthlyNP.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Clans Tab */}
        {activeTab === "clans" && (
          <div className="space-y-2">
            {clans.map((clan) => (
              <div
                key={clan.rank}
                className={`flex items-center gap-4 p-3 rounded-xl border transition-all cursor-pointer ${getRowBg(clan.rank)}`}
              >
                {/* Rank Medal/Number */}
                <MedalIcon rank={clan.rank} />

                {/* Clan Icon */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-500/20 to-violet-500/20 border border-gold-500/30 flex items-center justify-center">
                  <IconShield className="w-6 h-6 text-gold-400" />
                </div>

                {/* Name & Leader */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-cream">{clan.name}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-violet-500/20 text-violet-400 border border-violet-500/30">
                      {clan.members} Uye
                    </span>
                  </div>
                  <div className="text-xs text-cream-dim">Lider: {clan.leader}</div>
                </div>

                {/* Level */}
                <div className="hidden md:block text-right">
                  <div className="text-sm text-gold-400 font-medium">{clan.level}</div>
                  <ProgressBar value={clan.exp} color="gold" />
                </div>

                {/* Points */}
                <div className="text-right min-w-[100px]">
                  <div className="text-[10px] text-cream-dim uppercase tracking-wider">PUAN</div>
                  <div className="font-bold text-gold-400">{clan.points.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Staff Tab */}
        {activeTab === "staff" && (
          <div className="space-y-2">
            {staff.map((member) => (
              <div
                key={member.rank}
                className="flex items-center gap-4 p-3 rounded-xl border border-line hover:bg-ink-800/30 transition-all cursor-pointer"
              >
                {/* Rank */}
                <div className="w-12 h-12 rounded-lg border border-line flex items-center justify-center">
                  <span className="text-cream-dim font-medium text-lg">{member.rank}</span>
                </div>

                {/* Avatar */}
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-700/20 border border-emerald-500/30 flex items-center justify-center">
                    <IconShield className="w-6 h-6 text-emerald-400" />
                  </div>
                  {member.isOnline && (
                    <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-ink-800" />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-cream">{member.name}</div>
                  <div className="text-xs text-emerald-400">{member.role}</div>
                </div>

                {/* Status */}
                <div className={`text-xs px-3 py-1.5 rounded-full font-medium ${member.isOnline ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30" : "bg-ink-700 text-cream-dim border border-line"}`}>
                  {member.isOnline ? "Cevrimici" : "Cevrimdisi"}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Kings Tab */}
        {activeTab === "kings" && (
          <div className="space-y-2">
            {kings.map((king) => (
              <div
                key={king.rank}
                className={`flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer ${
                  king.nation === "karus" 
                    ? "bg-gradient-to-r from-rose-500/10 via-rose-500/5 to-transparent border-rose-500/20" 
                    : "bg-gradient-to-r from-sky-500/10 via-sky-500/5 to-transparent border-sky-500/20"
                }`}
              >
                {/* Crown Icon */}
                <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
                  king.nation === "karus" 
                    ? "bg-gradient-to-br from-rose-500/30 to-rose-700/30 border-2 border-rose-400/50" 
                    : "bg-gradient-to-br from-sky-500/30 to-sky-700/30 border-2 border-sky-400/50"
                }`}>
                  <IconCrown className={`w-7 h-7 ${king.nation === "karus" ? "text-rose-400" : "text-sky-400"}`} />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className={`font-bold text-lg ${king.nation === "karus" ? "text-rose-400" : "text-sky-400"}`}>
                    {king.name}
                  </div>
                  <div className="text-sm text-amber-400 font-medium">{king.title}</div>
                </div>

                {/* Since */}
                <div className="text-right">
                  <div className="text-xs text-cream-dim">Tahta Cikis</div>
                  <div className="text-sm text-cream font-medium">{new Date(king.since).toLocaleDateString("tr-TR")}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
