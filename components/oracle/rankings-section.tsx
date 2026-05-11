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
} from "@tabler/icons-react"

type TabType = "players" | "clans" | "staff" | "kings"

interface Player {
  rank: number
  name: string
  clan: string
  nation: "karus" | "elmorad"
  monthlyNP: number
  level: number
  class: string
  avatar?: string
}

interface Clan {
  rank: number
  name: string
  leader: string
  nation: "karus" | "elmorad"
  members: number
  points: number
}

interface Staff {
  rank: number
  name: string
  role: string
  avatar?: string
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
  { rank: 1, name: "Thoketh914", clan: "BrutalGuard", nation: "karus", monthlyNP: 18200, level: 83, class: "Warrior" },
  { rank: 2, name: "Gorus424", clan: "BrutalGuard", nation: "karus", monthlyNP: 15600, level: 82, class: "Rogue" },
  { rank: 3, name: "Cedion252", clan: "SilverEmpire", nation: "elmorad", monthlyNP: 14300, level: 81, class: "Mage" },
  { rank: 4, name: "Arthion93", clan: "NightHunters", nation: "elmorad", monthlyNP: 13100, level: 80, class: "Priest" },
  { rank: 5, name: "MadWarrior", clan: "BrutalGuard", nation: "karus", monthlyNP: 12800, level: 80, class: "Warrior" },
]

const clans: Clan[] = [
  { rank: 1, name: "BrutalGuard", leader: "Thoketh914", nation: "karus", members: 48, points: 156000 },
  { rank: 2, name: "SilverEmpire", leader: "Cedion252", nation: "elmorad", members: 45, points: 142000 },
  { rank: 3, name: "NightHunters", leader: "Arthion93", nation: "elmorad", members: 42, points: 128000 },
  { rank: 4, name: "DarkLegion", leader: "ShadowKing", nation: "karus", members: 40, points: 115000 },
  { rank: 5, name: "IronFist", leader: "StrongArm", nation: "karus", members: 38, points: 98000 },
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
  { rank: 3, name: "OldKing1", nation: "karus", title: "Eski Kral", since: "2025-12-01" },
  { rank: 4, name: "OldKing2", nation: "elmorad", title: "Eski Kral", since: "2025-11-15" },
]

const tabs = [
  { id: "players" as TabType, label: "Oyuncular", icon: IconUsers },
  { id: "clans" as TabType, label: "Klanlar", icon: IconShield },
  { id: "staff" as TabType, label: "Yoneticiler", icon: IconShield },
  { id: "kings" as TabType, label: "Krallar", icon: IconCrown },
]

export function RankingsSection() {
  const [activeTab, setActiveTab] = useState<TabType>("players")

  const getNationColor = (nation: "karus" | "elmorad") => {
    return nation === "karus" ? "text-rose-400" : "text-sky-400"
  }

  const getNationBg = (nation: "karus" | "elmorad") => {
    return nation === "karus" ? "bg-rose-500/10 border-rose-500/30" : "bg-sky-500/10 border-sky-500/30"
  }

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return "bg-gradient-to-br from-amber-400 to-amber-600 text-ink-900"
      case 2: return "bg-gradient-to-br from-slate-300 to-slate-500 text-ink-900"
      case 3: return "bg-gradient-to-br from-amber-600 to-amber-800 text-cream"
      default: return "bg-ink-700 text-cream-dim"
    }
  }

  return (
    <div className="card rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-line">
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
                className={`flex items-center gap-3 p-3 rounded-xl border transition-all hover:bg-ink-700/30 cursor-pointer ${getNationBg(player.nation)}`}
              >
                {/* Rank */}
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${getRankColor(player.rank)}`}>
                  {player.rank}
                </div>

                {/* Avatar placeholders */}
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-ink-700 border border-line flex items-center justify-center">
                    <IconUsers className="w-4 h-4 text-cream-dim" />
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-ink-700 border border-line flex items-center justify-center">
                    <IconShield className="w-4 h-4 text-cream-dim" />
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`font-semibold text-sm ${getNationColor(player.nation)}`}>{player.name}</span>
                  </div>
                  <div className="text-xs text-cream-dim">{player.clan}</div>
                </div>

                {/* NP */}
                <div className="text-right">
                  <div className="text-xs text-cream-dim">AYLIK NP</div>
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
                className={`flex items-center gap-3 p-3 rounded-xl border transition-all hover:bg-ink-700/30 cursor-pointer ${getNationBg(clan.nation)}`}
              >
                {/* Rank */}
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${getRankColor(clan.rank)}`}>
                  {clan.rank}
                </div>

                {/* Icon */}
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-500/20 to-violet-500/20 border border-gold-500/30 flex items-center justify-center">
                  <IconShield className="w-5 h-5 text-gold-400" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className={`font-semibold text-sm ${getNationColor(clan.nation)}`}>{clan.name}</div>
                  <div className="text-xs text-cream-dim">Lider: {clan.leader}</div>
                </div>

                {/* Points */}
                <div className="text-right">
                  <div className="font-bold text-gold-400">{clan.points.toLocaleString()}</div>
                  <div className="text-xs text-cream-dim">{clan.members} uye</div>
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
                className="flex items-center gap-3 p-3 rounded-xl border border-line bg-ink-800/30 hover:bg-ink-700/30 transition-all cursor-pointer"
              >
                {/* Rank */}
                <div className="w-8 h-8 rounded-lg bg-ink-700 flex items-center justify-center font-bold text-sm text-cream-dim">
                  {member.rank}
                </div>

                {/* Avatar */}
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-700/20 border border-emerald-500/30 flex items-center justify-center">
                    <IconShield className="w-5 h-5 text-emerald-400" />
                  </div>
                  {member.isOnline && (
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-ink-800" />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-cream">{member.name}</div>
                  <div className="text-xs text-emerald-400">{member.role}</div>
                </div>

                {/* Status */}
                <div className={`text-xs px-2 py-1 rounded ${member.isOnline ? "bg-emerald-500/10 text-emerald-400" : "bg-ink-700 text-cream-dim"}`}>
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
                className={`flex items-center gap-3 p-3 rounded-xl border transition-all hover:bg-ink-700/30 cursor-pointer ${getNationBg(king.nation)}`}
              >
                {/* Rank */}
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${getRankColor(king.rank)}`}>
                  {king.rank}
                </div>

                {/* Crown Icon */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-700/20 border border-amber-500/30 flex items-center justify-center">
                  <IconCrown className="w-5 h-5 text-amber-400" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className={`font-semibold text-sm ${getNationColor(king.nation)}`}>{king.name}</div>
                  <div className="text-xs text-amber-400">{king.title}</div>
                </div>

                {/* Since */}
                <div className="text-right">
                  <div className="text-xs text-cream-dim">Tahta cikis</div>
                  <div className="text-xs text-cream">{new Date(king.since).toLocaleDateString("tr-TR")}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
