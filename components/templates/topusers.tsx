"use client"

import { useState } from "react"
import {
  IconTrophy,
  IconUsers,
  IconShield,
  IconCrown,
  IconChevronRight,
  IconStar,
  IconFlame,
  IconBolt,
  IconMedal,
  IconAward,
  IconSword,
  IconHeart,
  IconTarget,
  IconCircleCheck,
  IconDots,
} from "@tabler/icons-react"

// ==================== MOCK DATA ====================

interface Player {
  rank: number
  name: string
  clan: string
  nation: "karus" | "human"
  playerClass: "warrior" | "rogue" | "mage" | "priest"
  level: string
  monthlyNP: number
  avatar?: string
}

interface Staff {
  rank: number
  name: string
  role: string
  roleColor: string
  isOnline: boolean
  avatar?: string
}

interface King {
  rank: number
  name: string
  nation: "karus" | "elmorad"
  title: string
  since: string
}

const players: Player[] = [
  { rank: 1, name: "Thoketh914", clan: "BrutalGuard", nation: "karus", playerClass: "priest", level: "Sv. 83/3", monthlyNP: 18200 },
  { rank: 2, name: "Gorus424", clan: "BrutalGuard", nation: "karus", playerClass: "warrior", level: "Sv. 83/3", monthlyNP: 15600 },
  { rank: 3, name: "Cedion252", clan: "SilverEmpire", nation: "human", playerClass: "rogue", level: "Sv. 83/3", monthlyNP: 14300 },
  { rank: 4, name: "Arthion93", clan: "SilverForce", nation: "human", playerClass: "mage", level: "Sv. 83/3", monthlyNP: 12100 },
  { rank: 5, name: "Kragath680", clan: "ShadowForce", nation: "karus", playerClass: "rogue", level: "Sv. 83/3", monthlyNP: 10800 },
]

const staff: Staff[] = [
  { rank: 1, name: "OracleGM", role: "Oyun Yoneticisi", roleColor: "text-rose-400", isOnline: true },
  { rank: 2, name: "OracleMod", role: "Moderator", roleColor: "text-sky-400", isOnline: true },
  { rank: 3, name: "OracleGM2", role: "Oyun Yoneticisi", roleColor: "text-rose-400", isOnline: false },
  { rank: 4, name: "SupportLead", role: "Destek Lideri", roleColor: "text-emerald-400", isOnline: true },
  { rank: 5, name: "EventMaster", role: "Etkinlik Sorumlusu", roleColor: "text-amber-400", isOnline: false },
]

const kings: King[] = [
  { rank: 1, name: "Thoketh914", nation: "karus", title: "Karus Krali", since: "2026-01-15" },
  { rank: 2, name: "Cedion252", nation: "elmorad", title: "El Morad Krali", since: "2026-01-15" },
]

// ==================== EN IYILER VARYASYONLARI ====================

// V1: Classic Podium - Podyum tarzi gorunum
export function TopUsersV1() {
  const top3 = players.slice(0, 3)
  const rest = players.slice(3)
  
  return (
    <div className="rounded-2xl border border-line bg-gradient-to-br from-ink-800/90 via-ink-900/90 to-ink-950 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-line">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400/20 to-amber-500/10 border border-gold-500/30 flex items-center justify-center">
            <IconTrophy className="w-5 h-5 text-gold-400" />
          </div>
          <div>
            <h3 className="font-bold text-cream">En Iyiler</h3>
            <p className="text-xs text-cream-dim">Aylik NP Siralamasi</p>
          </div>
        </div>
        <button className="text-xs text-gold-400 hover:text-gold-300 flex items-center gap-1">
          Tumunu Gor <IconChevronRight className="w-3 h-3" />
        </button>
      </div>

      {/* Podium */}
      <div className="p-4">
        <div className="flex items-end justify-center gap-2 mb-4">
          {/* 2nd Place */}
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-slate-400/20 to-slate-500/10 border-2 border-slate-400/40 flex items-center justify-center mb-2">
              <span className="text-lg font-black text-slate-300">2</span>
            </div>
            <div className="h-16 w-20 rounded-t-lg bg-gradient-to-t from-slate-500/20 to-slate-400/10 border border-b-0 border-slate-400/30 flex flex-col items-center justify-end pb-2">
              <span className="text-xs font-bold text-cream truncate max-w-[70px]">{top3[1]?.name}</span>
              <span className="text-[10px] text-slate-400">{top3[1]?.monthlyNP.toLocaleString()} NP</span>
            </div>
          </div>

          {/* 1st Place */}
          <div className="flex flex-col items-center -mt-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-gold-400/30 to-amber-500/20 border-2 border-gold-400/50 flex items-center justify-center mb-2 relative">
              <IconCrown className="w-6 h-6 text-gold-400 absolute -top-3" />
              <span className="text-xl font-black text-gold-400">1</span>
            </div>
            <div className="h-24 w-24 rounded-t-lg bg-gradient-to-t from-gold-500/20 to-gold-400/10 border border-b-0 border-gold-500/30 flex flex-col items-center justify-end pb-2">
              <span className="text-sm font-bold text-cream truncate max-w-[90px]">{top3[0]?.name}</span>
              <span className="text-xs text-gold-400 font-bold">{top3[0]?.monthlyNP.toLocaleString()} NP</span>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-700/20 to-amber-800/10 border-2 border-amber-700/40 flex items-center justify-center mb-2">
              <span className="text-lg font-black text-amber-600">3</span>
            </div>
            <div className="h-12 w-20 rounded-t-lg bg-gradient-to-t from-amber-700/20 to-amber-600/10 border border-b-0 border-amber-700/30 flex flex-col items-center justify-end pb-2">
              <span className="text-xs font-bold text-cream truncate max-w-[70px]">{top3[2]?.name}</span>
              <span className="text-[10px] text-amber-600">{top3[2]?.monthlyNP.toLocaleString()} NP</span>
            </div>
          </div>
        </div>

        {/* Rest of list */}
        <div className="space-y-2 mt-4 pt-4 border-t border-line">
          {rest.map((player) => (
            <div key={player.rank} className="flex items-center gap-3 p-2 rounded-lg hover:bg-ink-800/50 transition-colors">
              <span className="w-6 text-center text-sm font-bold text-cream-dim">{player.rank}</span>
              <div className="flex-1 min-w-0">
                <span className="text-sm font-semibold text-cream truncate block">{player.name}</span>
              </div>
              <span className="text-sm font-bold text-gold-400">{player.monthlyNP.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// V2: Card Grid - Kart seklinde grid
export function TopUsersV2() {
  return (
    <div className="rounded-2xl border border-line bg-gradient-to-br from-ink-800/90 via-ink-900/90 to-ink-950 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-line">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400/20 to-amber-500/10 border border-gold-500/30 flex items-center justify-center">
            <IconStar className="w-5 h-5 text-gold-400" />
          </div>
          <div>
            <h3 className="font-bold text-cream">En Iyiler</h3>
            <p className="text-xs text-cream-dim">Top 5 Oyuncu</p>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="p-4 grid grid-cols-2 gap-3">
        {/* Featured #1 */}
        <div className="col-span-2 p-4 rounded-xl bg-gradient-to-r from-gold-500/15 via-amber-500/10 to-transparent border border-gold-500/30">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gold-400/30 to-amber-500/20 border-2 border-gold-400/50 flex items-center justify-center">
              <IconCrown className="w-7 h-7 text-gold-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-cream">{players[0].name}</span>
                <span className="px-2 py-0.5 rounded-full bg-gold-500/20 text-[10px] font-bold text-gold-400">#1</span>
              </div>
              <span className="text-sm text-cream-dim">{players[0].clan}</span>
            </div>
            <div className="text-right">
              <span className="text-xl font-black text-gold-400">{players[0].monthlyNP.toLocaleString()}</span>
              <span className="text-xs text-cream-dim block">Aylik NP</span>
            </div>
          </div>
        </div>

        {/* Rest in cards */}
        {players.slice(1).map((player) => (
          <div 
            key={player.rank}
            className="p-3 rounded-xl bg-ink-800/40 border border-line hover:border-gold-500/30 transition-colors"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded-lg bg-ink-700 flex items-center justify-center text-xs font-bold text-cream-dim">
                {player.rank}
              </span>
              <span className="text-sm font-bold text-cream truncate">{player.name}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-cream-dim">{player.clan}</span>
              <span className="text-sm font-bold text-gold-400">{player.monthlyNP.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// V3: Horizontal Scroll - Yatay kaydirmali
export function TopUsersV3() {
  const getRankStyle = (rank: number) => {
    if (rank === 1) return "from-gold-400/30 to-amber-500/20 border-gold-400/50"
    if (rank === 2) return "from-slate-400/20 to-slate-500/10 border-slate-400/40"
    if (rank === 3) return "from-amber-700/20 to-amber-800/10 border-amber-700/40"
    return "from-ink-700/50 to-ink-800/30 border-line"
  }

  return (
    <div className="rounded-2xl border border-line bg-gradient-to-br from-ink-800/90 via-ink-900/90 to-ink-950 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-line">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400/20 to-amber-500/10 border border-gold-500/30 flex items-center justify-center">
            <IconFlame className="w-5 h-5 text-gold-400" />
          </div>
          <div>
            <h3 className="font-bold text-cream">En Iyiler</h3>
            <p className="text-xs text-cream-dim">Bu Ayin Yildizlari</p>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll */}
      <div className="p-4 overflow-x-auto">
        <div className="flex gap-3 min-w-max">
          {players.map((player) => (
            <div 
              key={player.rank}
              className={`w-36 p-4 rounded-xl bg-gradient-to-b ${getRankStyle(player.rank)} border-2 flex flex-col items-center text-center`}
            >
              <div className="w-12 h-12 rounded-full bg-ink-700 border-2 border-line flex items-center justify-center mb-3">
                <span className="text-lg font-black text-cream">{player.rank}</span>
              </div>
              <span className="text-sm font-bold text-cream truncate w-full">{player.name}</span>
              <span className="text-[11px] text-cream-dim truncate w-full mb-2">{player.clan}</span>
              <div className="mt-auto pt-2 border-t border-line/50 w-full">
                <span className="text-lg font-black text-gold-400">{player.monthlyNP.toLocaleString()}</span>
                <span className="text-[10px] text-cream-dim block">NP</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// V4: Stats Focus - Istatistik odakli
export function TopUsersV4() {
  return (
    <div className="rounded-2xl border border-line bg-gradient-to-br from-ink-800/90 via-ink-900/90 to-ink-950 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-line">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400/20 to-amber-500/10 border border-gold-500/30 flex items-center justify-center">
            <IconBolt className="w-5 h-5 text-gold-400" />
          </div>
          <div>
            <h3 className="font-bold text-cream">En Iyiler</h3>
            <p className="text-xs text-cream-dim">Performans Tablosu</p>
          </div>
        </div>
      </div>

      {/* Stats Table */}
      <div className="p-4">
        {/* Table Header */}
        <div className="flex items-center gap-2 px-3 py-2 text-[10px] uppercase tracking-wider text-cream-dim font-semibold border-b border-line mb-2">
          <span className="w-8">#</span>
          <span className="flex-1">Oyuncu</span>
          <span className="w-20 text-center">Seviye</span>
          <span className="w-20 text-right">NP</span>
        </div>

        {/* Rows */}
        <div className="space-y-1">
          {players.map((player) => (
            <div 
              key={player.rank}
              className="flex items-center gap-2 px-3 py-3 rounded-lg hover:bg-ink-800/50 transition-colors group"
            >
              <div className="w-8">
                {player.rank <= 3 ? (
                  <IconMedal className={`w-5 h-5 ${
                    player.rank === 1 ? "text-gold-400" :
                    player.rank === 2 ? "text-slate-400" : "text-amber-600"
                  }`} />
                ) : (
                  <span className="text-sm font-bold text-cream-dim">{player.rank}</span>
                )}
              </div>
              <div className="flex-1 flex items-center gap-2 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-ink-700 border border-line flex items-center justify-center shrink-0">
                  <IconUsers className="w-4 h-4 text-cream-dim" />
                </div>
                <div className="min-w-0">
                  <span className="text-sm font-bold text-cream truncate block group-hover:text-gold-400 transition-colors">{player.name}</span>
                  <span className="text-[10px] text-cream-dim">{player.clan}</span>
                </div>
              </div>
              <div className="w-20 text-center">
                <span className="text-xs font-semibold text-cream">{player.level}</span>
              </div>
              <div className="w-20 text-right">
                <span className="text-sm font-black text-gold-400">{player.monthlyNP.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// V5: Leaderboard Minimal - Minimalist siralama
export function TopUsersV5() {
  return (
    <div className="rounded-2xl border border-line bg-gradient-to-br from-ink-800/90 via-ink-900/90 to-ink-950 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-line">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400/20 to-amber-500/10 border border-gold-500/30 flex items-center justify-center">
            <IconAward className="w-5 h-5 text-gold-400" />
          </div>
          <div>
            <h3 className="font-bold text-cream">En Iyiler</h3>
            <p className="text-xs text-cream-dim">Leaderboard</p>
          </div>
        </div>
        <button className="text-xs text-gold-400 hover:text-gold-300 flex items-center gap-1">
          Tumunu Gor <IconChevronRight className="w-3 h-3" />
        </button>
      </div>

      {/* Minimal List */}
      <div className="divide-y divide-line/50">
        {players.map((player) => (
          <div 
            key={player.rank}
            className="flex items-center gap-4 px-4 py-3 hover:bg-ink-800/30 transition-colors"
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
              player.rank === 1 ? "bg-gold-500/20 text-gold-400 ring-2 ring-gold-400/30" :
              player.rank === 2 ? "bg-slate-400/20 text-slate-300 ring-2 ring-slate-400/30" :
              player.rank === 3 ? "bg-amber-600/20 text-amber-500 ring-2 ring-amber-600/30" :
              "bg-ink-700 text-cream-dim"
            }`}>
              {player.rank}
            </div>
            <div className="flex-1 min-w-0">
              <span className="font-semibold text-cream text-sm">{player.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <IconTrophy className="w-4 h-4 text-gold-400" />
              <span className="font-bold text-gold-400">{player.monthlyNP.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ==================== YONETIM VARYASYONLARI ====================

// V1: Classic Staff List - Klasik yonetici listesi
export function ManagementV1() {
  return (
    <div className="rounded-2xl border border-line bg-gradient-to-br from-ink-800/90 via-ink-900/90 to-ink-950 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-line">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400/20 to-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
            <IconShield className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="font-bold text-cream">Yonetim</h3>
            <p className="text-xs text-cream-dim">Ekip Uyeleri</p>
          </div>
        </div>
      </div>

      {/* Staff List */}
      <div className="p-4 space-y-2">
        {staff.map((member) => (
          <div 
            key={member.rank}
            className="flex items-center gap-3 p-3 rounded-xl bg-ink-800/30 border border-line hover:border-emerald-500/30 transition-colors"
          >
            <div className="w-10 h-10 rounded-xl bg-ink-700 border border-line flex items-center justify-center">
              <IconShield className="w-5 h-5 text-cream-dim" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="font-bold text-cream text-sm block">{member.name}</span>
              <span className={`text-xs ${member.roleColor}`}>{member.role}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${member.isOnline ? "bg-emerald-400 animate-pulse" : "bg-cream-dim/30"}`} />
              <span className={`text-xs font-medium ${member.isOnline ? "text-emerald-400" : "text-cream-dim"}`}>
                {member.isOnline ? "Online" : "Offline"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// V2: Role Cards - Rol kartlari
export function ManagementV2() {
  const roleGroups = {
    "Oyun Yoneticisi": staff.filter(s => s.role === "Oyun Yoneticisi"),
    "Moderator": staff.filter(s => s.role === "Moderator"),
    "Diger": staff.filter(s => !["Oyun Yoneticisi", "Moderator"].includes(s.role)),
  }

  return (
    <div className="rounded-2xl border border-line bg-gradient-to-br from-ink-800/90 via-ink-900/90 to-ink-950 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-line">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-400/20 to-rose-500/10 border border-rose-500/30 flex items-center justify-center">
            <IconCrown className="w-5 h-5 text-rose-400" />
          </div>
          <div>
            <h3 className="font-bold text-cream">Yonetim</h3>
            <p className="text-xs text-cream-dim">Rol Bazli Gorunum</p>
          </div>
        </div>
      </div>

      {/* Role Groups */}
      <div className="p-4 space-y-4">
        {Object.entries(roleGroups).map(([role, members]) => members.length > 0 && (
          <div key={role}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-cream-dim">{role}</span>
              <div className="flex-1 h-px bg-line" />
              <span className="text-[10px] text-cream-dim">{members.length} kisi</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {members.map((member) => (
                <div 
                  key={member.rank}
                  className="p-3 rounded-xl bg-ink-800/40 border border-line hover:border-gold-500/30 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <div className="w-8 h-8 rounded-lg bg-ink-700 flex items-center justify-center">
                        <IconShield className="w-4 h-4 text-cream-dim" />
                      </div>
                      <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-ink-800 ${member.isOnline ? "bg-emerald-400" : "bg-cream-dim/30"}`} />
                    </div>
                    <span className="text-sm font-semibold text-cream truncate">{member.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// V3: Compact Online Status - Kompakt online durumu
export function ManagementV3() {
  const onlineStaff = staff.filter(s => s.isOnline)
  const offlineStaff = staff.filter(s => !s.isOnline)

  return (
    <div className="rounded-2xl border border-line bg-gradient-to-br from-ink-800/90 via-ink-900/90 to-ink-950 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-line">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400/20 to-sky-500/10 border border-sky-500/30 flex items-center justify-center">
            <IconUsers className="w-5 h-5 text-sky-400" />
          </div>
          <div>
            <h3 className="font-bold text-cream">Yonetim</h3>
            <p className="text-xs text-cream-dim">{onlineStaff.length}/{staff.length} Online</p>
          </div>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold text-emerald-400">{onlineStaff.length} Aktif</span>
        </div>
      </div>

      {/* Online Section */}
      <div className="p-4">
        <div className="flex flex-wrap gap-2 mb-4">
          {onlineStaff.map((member) => (
            <div 
              key={member.rank}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sm font-semibold text-cream">{member.name}</span>
              <span className={`text-[10px] ${member.roleColor}`}>{member.role.split(" ")[0]}</span>
            </div>
          ))}
        </div>

        {/* Offline */}
        <div className="pt-3 border-t border-line">
          <span className="text-[10px] uppercase tracking-wider text-cream-dim font-semibold mb-2 block">Cevrimdisi</span>
          <div className="flex flex-wrap gap-2">
            {offlineStaff.map((member) => (
              <div 
                key={member.rank}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-ink-800/40 border border-line opacity-60"
              >
                <span className="w-2 h-2 rounded-full bg-cream-dim/30" />
                <span className="text-sm text-cream-dim">{member.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// V4: With Kings - Krallar dahil
export function ManagementV4() {
  const [activeTab, setActiveTab] = useState<"staff" | "kings">("staff")

  return (
    <div className="rounded-2xl border border-line bg-gradient-to-br from-ink-800/90 via-ink-900/90 to-ink-950 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-line">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400/20 to-amber-500/10 border border-gold-500/30 flex items-center justify-center">
            <IconCrown className="w-5 h-5 text-gold-400" />
          </div>
          <div>
            <h3 className="font-bold text-cream">Yonetim & Krallar</h3>
            <p className="text-xs text-cream-dim">Liderlik Kadrosu</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 pt-4">
        <div className="flex bg-ink-900/50 rounded-xl p-1 border border-line">
          <button
            onClick={() => setActiveTab("staff")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "staff" ? "bg-gradient-to-r from-gold-500 to-gold-600 text-ink-900" : "text-cream-dim hover:text-cream"
            }`}
          >
            <IconShield className="w-4 h-4" />
            Yoneticiler
          </button>
          <button
            onClick={() => setActiveTab("kings")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "kings" ? "bg-gradient-to-r from-gold-500 to-gold-600 text-ink-900" : "text-cream-dim hover:text-cream"
            }`}
          >
            <IconCrown className="w-4 h-4" />
            Krallar
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {activeTab === "staff" && (
          <div className="space-y-2">
            {staff.map((member) => (
              <div 
                key={member.rank}
                className="flex items-center gap-3 p-3 rounded-xl bg-ink-800/30 border border-line hover:border-gold-500/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-ink-700 border border-line flex items-center justify-center">
                  <IconShield className="w-5 h-5 text-cream-dim" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="font-bold text-cream text-sm block">{member.name}</span>
                  <span className={`text-xs ${member.roleColor}`}>{member.role}</span>
                </div>
                <span className={`w-2.5 h-2.5 rounded-full ${member.isOnline ? "bg-emerald-400 animate-pulse" : "bg-cream-dim/30"}`} />
              </div>
            ))}
          </div>
        )}

        {activeTab === "kings" && (
          <div className="space-y-3">
            {kings.map((king) => (
              <div 
                key={king.rank}
                className={`p-4 rounded-xl border ${
                  king.nation === "karus" 
                    ? "bg-gradient-to-r from-rose-500/10 to-transparent border-rose-500/30" 
                    : "bg-gradient-to-r from-sky-500/10 to-transparent border-sky-500/30"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    king.nation === "karus" ? "bg-rose-500/20 border border-rose-500/30" : "bg-sky-500/20 border border-sky-500/30"
                  }`}>
                    <IconCrown className={`w-6 h-6 ${king.nation === "karus" ? "text-rose-400" : "text-sky-400"}`} />
                  </div>
                  <div className="flex-1">
                    <span className={`font-bold text-base ${king.nation === "karus" ? "text-rose-400" : "text-sky-400"}`}>
                      {king.name}
                    </span>
                    <span className="text-xs text-cream-dim block">{king.title}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-cream-dim block">Tahta Cikis</span>
                    <span className="text-sm font-bold text-gold-400">
                      {new Date(king.since).toLocaleDateString("tr-TR")}
                    </span>
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

// V5: Hierarchy Tree - Hiyerarsi agaci
export function ManagementV5() {
  const hierarchy = [
    { level: 0, title: "Yonetim Kurulu", members: staff.filter(s => s.role === "Oyun Yoneticisi") },
    { level: 1, title: "Moderasyon", members: staff.filter(s => s.role === "Moderator") },
    { level: 2, title: "Destek Ekibi", members: staff.filter(s => ["Destek Lideri", "Etkinlik Sorumlusu"].includes(s.role)) },
  ]

  return (
    <div className="rounded-2xl border border-line bg-gradient-to-br from-ink-800/90 via-ink-900/90 to-ink-950 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-line">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-400/20 to-violet-500/10 border border-violet-500/30 flex items-center justify-center">
            <IconTarget className="w-5 h-5 text-violet-400" />
          </div>
          <div>
            <h3 className="font-bold text-cream">Yonetim</h3>
            <p className="text-xs text-cream-dim">Organizasyon Yapisi</p>
          </div>
        </div>
      </div>

      {/* Hierarchy */}
      <div className="p-4 space-y-4">
        {hierarchy.map((group, groupIndex) => (
          <div key={group.title} className="relative">
            {/* Level indicator */}
            <div className="flex items-center gap-3 mb-2">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                style={{
                  background: `rgba(var(--gold-500), ${0.3 - groupIndex * 0.1})`,
                  borderColor: `rgba(var(--gold-500), ${0.5 - groupIndex * 0.15})`,
                }}
              >
                {groupIndex + 1}
              </div>
              <span className="text-sm font-semibold text-cream">{group.title}</span>
              <div className="flex-1 h-px bg-line" />
            </div>

            {/* Members */}
            <div className={`ml-4 pl-4 border-l-2 ${groupIndex < hierarchy.length - 1 ? "border-line" : "border-transparent"} space-y-2`}>
              {group.members.map((member) => (
                <div 
                  key={member.rank}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-ink-800/50 transition-colors"
                >
                  <div className="relative">
                    <div className="w-8 h-8 rounded-lg bg-ink-700 border border-line flex items-center justify-center">
                      <IconShield className="w-4 h-4 text-cream-dim" />
                    </div>
                    <span className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-ink-800 ${member.isOnline ? "bg-emerald-400" : "bg-cream-dim/30"}`} />
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-semibold text-cream">{member.name}</span>
                    <span className={`text-[10px] block ${member.roleColor}`}>{member.role}</span>
                  </div>
                  {member.isOnline && (
                    <span className="text-[10px] text-emerald-400 font-medium">Online</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ==================== SHOWCASE ====================

export function TopUsersShowcase() {
  return (
    <div className="space-y-12 p-6">
      {/* En Iyiler Section */}
      <div>
        <h2 className="text-2xl font-bold text-cream mb-6 flex items-center gap-3">
          <IconTrophy className="w-7 h-7 text-gold-400" />
          En Iyiler Varyasyonlari
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-semibold text-cream-dim mb-3">V1: Classic Podium</h3>
            <TopUsersV1 />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-cream-dim mb-3">V2: Card Grid</h3>
            <TopUsersV2 />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-cream-dim mb-3">V3: Horizontal Scroll</h3>
            <TopUsersV3 />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-cream-dim mb-3">V4: Stats Focus</h3>
            <TopUsersV4 />
          </div>
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-cream-dim mb-3">V5: Leaderboard Minimal</h3>
            <TopUsersV5 />
          </div>
        </div>
      </div>

      {/* Yonetim Section */}
      <div>
        <h2 className="text-2xl font-bold text-cream mb-6 flex items-center gap-3">
          <IconShield className="w-7 h-7 text-emerald-400" />
          Yonetim Varyasyonlari
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-semibold text-cream-dim mb-3">V1: Classic Staff List</h3>
            <ManagementV1 />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-cream-dim mb-3">V2: Role Cards</h3>
            <ManagementV2 />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-cream-dim mb-3">V3: Compact Online Status</h3>
            <ManagementV3 />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-cream-dim mb-3">V4: With Kings (Tabbed)</h3>
            <ManagementV4 />
          </div>
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-cream-dim mb-3">V5: Hierarchy Tree</h3>
            <ManagementV5 />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopUsersShowcase
