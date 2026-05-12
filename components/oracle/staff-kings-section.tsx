"use client"

import { useState } from "react"
import Link from "next/link"
import {
  IconShield,
  IconCrown,
  IconChevronRight,
} from "@tabler/icons-react"

type TabType = "staff" | "kings"

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
  { id: "staff" as TabType, label: "Yoneticiler", icon: IconShield },
  { id: "kings" as TabType, label: "Krallar", icon: IconCrown },
]

export function StaffKingsSection() {
  const [activeTab, setActiveTab] = useState<TabType>("staff")

  return (
    <div className="card rounded-xl overflow-hidden">
      {/* Header */}
      <div className="section-header">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400">
            <IconCrown className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-cream">Yonetim</h3>
            <p className="text-xs text-cream-dim">Yoneticiler ve krallar</p>
          </div>
        </div>
        <Link href="/yonetim" className="text-xs text-gold-400 hover:text-gold-300 flex items-center gap-1">
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
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Staff Tab */}
        {activeTab === "staff" && (
          <div className="space-y-3">
            {staff.map((member, index) => (
              <div
                key={member.rank}
                className="relative overflow-hidden rounded-xl bg-ink-800/30 border border-line hover:border-gold-500/30 hover:bg-ink-800/50 hover:scale-[1.01] hover:shadow-lg hover:shadow-black/20 hover:-translate-y-0.5 transition-all duration-300 ease-out cursor-pointer"
              >
                <div className="relative flex items-stretch">
                  <div className="flex items-center justify-center px-3 py-3 bg-ink-800/20 border-r border-line/50">
                    <div className="w-8 h-8 rounded-lg bg-ink-700 border border-line flex items-center justify-center">
                      <span className="text-xs font-bold text-cream-dim">{index + 1}</span>
                    </div>
                  </div>
                  <div className="flex-1 flex items-center px-3 gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                      <IconShield className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="font-bold text-cream text-sm truncate block">{member.name}</span>
                      <span className="text-[11px] text-cream-dim">{member.role}</span>
                    </div>
                    <div className="text-center min-w-[5rem] shrink-0">
                      <div className="text-[10px] text-cream-dim uppercase tracking-wider font-medium">Durum</div>
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
                className={`relative overflow-hidden rounded-xl border transition-all duration-300 ease-out hover:scale-[1.01] hover:shadow-lg hover:shadow-black/20 hover:-translate-y-0.5 cursor-pointer ${
                  king.nation === "karus" 
                    ? "bg-gradient-to-r from-rose-500/10 via-rose-500/5 to-transparent border-rose-500/20 hover:border-rose-500/40 hover:from-rose-500/15" 
                    : "bg-gradient-to-r from-sky-500/10 via-sky-500/5 to-transparent border-sky-500/20 hover:border-sky-500/40 hover:from-sky-500/15"
                }`}
              >
                <div className="relative flex items-stretch">
                  <div className="flex items-center justify-center px-3 py-3 bg-ink-800/20 border-r border-line/50">
                    <div className="w-8 h-8 rounded-lg bg-ink-700 border border-line flex items-center justify-center">
                      <span className="text-xs font-bold text-cream-dim">{index + 1}</span>
                    </div>
                  </div>
                  <div className="flex-1 flex items-center px-3 gap-3">
                    <div className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 ${
                      king.nation === "karus" ? "bg-rose-500/20 border-rose-500/30" : "bg-sky-500/20 border-sky-500/30"
                    }`}>
                      <IconCrown className={`w-4 h-4 ${king.nation === "karus" ? "text-rose-400" : "text-sky-400"}`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className={`font-bold text-sm truncate block ${king.nation === "karus" ? "text-rose-400" : "text-sky-400"}`}>
                        {king.name}
                      </span>
                      <span className="text-[11px] text-cream-dim">{king.title}</span>
                    </div>
                    <div className="text-center min-w-[5rem] shrink-0">
                      <div className="text-[10px] text-cream-dim uppercase tracking-wider font-medium">Tahta</div>
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
