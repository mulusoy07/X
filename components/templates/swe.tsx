"use client"

import { useState } from "react"
import Link from "next/link"
import {
  IconTrophy,
  IconUsers,
  IconShield,
  IconChevronRight,
  IconCrown,
} from "@tabler/icons-react"

/* ============================================================
   DATA
   ============================================================ */

const players = [
  { rank: 1, name: "Thoketh914", clan: "BrutalGuard", nation: "karus" as const, playerClass: "priest" as const, monthlyNP: 18200 },
  { rank: 2, name: "Gorus424", clan: "BrutalGuard", nation: "karus" as const, playerClass: "warrior" as const, monthlyNP: 15600 },
  { rank: 3, name: "Cedion252", clan: "SilverEmpire", nation: "human" as const, playerClass: "rogue" as const, monthlyNP: 14300 },
  { rank: 4, name: "Arthion93", clan: "SilverForce", nation: "human" as const, playerClass: "mage" as const, monthlyNP: 12100 },
  { rank: 5, name: "Kragath680", clan: "ShadowForce", nation: "karus" as const, playerClass: "rogue" as const, monthlyNP: 10800 },
]

const clans = [
  { rank: 1, name: "IronLegion", leader: "User1", nation: "karus" as const, members: 48, points: 1560000 },
  { rank: 2, name: "ShadowPact", leader: "User2", nation: "elmorad" as const, members: 45, points: 1420000 },
  { rank: 3, name: "PhoenixGuard", leader: "User3", nation: "karus" as const, members: 42, points: 1280000 },
  { rank: 4, name: "FrostBorn", leader: "User4", nation: "elmorad" as const, members: 40, points: 1150000 },
  { rank: 5, name: "StormRiders", leader: "User5", nation: "karus" as const, members: 38, points: 980000 },
]

const staff = [
  { rank: 1, name: "OracleGM", role: "Oyun Yoneticisi", isOnline: true },
  { rank: 2, name: "OracleMod", role: "Moderator", isOnline: true },
  { rank: 3, name: "OracleGM2", role: "Oyun Yoneticisi", isOnline: false },
  { rank: 4, name: "SupportLead", role: "Destek Lideri", isOnline: true },
  { rank: 5, name: "EventMaster", role: "Etkinlik Sorumlusu", isOnline: false },
]

const kings = [
  { rank: 1, name: "Thoketh914", nation: "karus" as const, title: "Karus Krali", since: "2026-01-15" },
  { rank: 2, name: "Cedion252", nation: "elmorad" as const, title: "El Morad Krali", since: "2026-01-15" },
]

/* ============================================================
   SHARED HELPERS
   ============================================================ */

const rowHover = "transition-all duration-300 ease-out cursor-pointer hover:scale-[1.01] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20"

const RankBadge = ({ rank }: { rank: number }) =>
  rank <= 3 ? (
    <div className="w-8 h-8 flex items-center justify-center shrink-0">
      <div className={`rank-icon rank-${rank}`} />
    </div>
  ) : (
    <div className="w-8 h-8 rounded-lg bg-ink-700 border border-line flex items-center justify-center shrink-0">
      <span className="text-xs font-bold text-cream-dim">{rank}</span>
    </div>
  )

const rankRowBg = (rank: number) => {
  if (rank === 1) return "bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border-amber-500/20 hover:border-amber-500/40 hover:from-amber-500/15"
  if (rank === 2) return "bg-gradient-to-r from-slate-400/10 via-slate-400/5 to-transparent border-slate-400/20 hover:border-slate-400/40 hover:from-slate-400/15"
  if (rank === 3) return "bg-gradient-to-r from-amber-700/10 via-amber-700/5 to-transparent border-amber-700/20 hover:border-amber-700/40 hover:from-amber-700/15"
  return "border-line hover:border-gold-500/30 hover:bg-ink-800/40"
}

function Tabs({ tabs, active, onChange }: { tabs: { id: string; label: string; icon: any }[]; active: string; onChange: (v: string) => void }) {
  return (
    <div className="px-4 pt-4">
      <div className="flex bg-ink-900/50 rounded-xl p-1 border border-line">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all ${
              active === id ? "gold-btn" : "text-cream-dim hover:text-cream hover:bg-ink-800/50"
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

const rankTabs = [
  { id: "players", label: "Oyuncular", icon: IconUsers },
  { id: "clans", label: "Klanlar", icon: IconShield },
]

const staffTabs = [
  { id: "staff", label: "Yoneticiler", icon: IconShield },
  { id: "kings", label: "Krallar", icon: IconCrown },
]

/* ============================================================
   RANKINGS — ANA (Production clone)
   ============================================================ */

export function RankingsAna() {
  const [tab, setTab] = useState("players")
  return (
    <div className="card rounded-xl overflow-hidden">
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
      <Tabs tabs={rankTabs} active={tab} onChange={setTab} />
      <div className="p-4">
        {tab === "players" && (
          <div className="space-y-3">
            {players.map((p) => (
              <div key={p.rank} className={`relative overflow-hidden rounded-xl border ${rowHover} ${rankRowBg(p.rank)}`}>
                <div className="flex items-stretch">
                  <div className="flex items-center justify-center px-3 py-3 bg-ink-800/20 border-r border-line/50">
                    <RankBadge rank={p.rank} />
                  </div>
                  <div className="flex-1 flex items-center px-3 gap-3">
                    <div className="flex gap-1 shrink-0">
                      <div className="w-8 h-8 rounded overflow-hidden bg-ink-700/50 p-0.5">
                        <div className={`nation-icon nation-${p.nation}`} style={{ width: 28, height: 28 }} />
                      </div>
                      <div className="w-8 h-8 rounded overflow-hidden bg-ink-700/50 p-0.5">
                        <div className={`class-icon class-${p.playerClass}`} style={{ width: 28, height: 28 }} />
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="font-bold text-cream text-sm truncate block">{p.name}</span>
                      <span className="text-[11px] text-cream-dim">{p.clan}</span>
                    </div>
                    <div className="text-center min-w-[4rem] shrink-0">
                      <div className="text-[11px] text-cream-dim uppercase tracking-wider font-medium">Aylik NP</div>
                      <div className="text-sm font-black bg-gradient-to-r from-gold-400 to-gold-500 bg-clip-text text-transparent">
                        {p.monthlyNP.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {tab === "clans" && (
          <div className="space-y-3">
            {clans.map((c) => (
              <div key={c.rank} className={`relative overflow-hidden rounded-xl border ${rowHover} ${rankRowBg(c.rank)}`}>
                <div className="flex items-stretch">
                  <div className="flex items-center justify-center px-3 py-3 bg-ink-800/20 border-r border-line/50">
                    <RankBadge rank={c.rank} />
                  </div>
                  <div className="flex-1 flex items-center px-3 gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold-500/20 to-amber-500/10 border border-gold-500/30 flex items-center justify-center shrink-0">
                      <IconShield className="w-5 h-5 text-gold-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="font-bold text-cream text-sm truncate block">{c.name}</span>
                      <span className="text-[11px] text-cream-dim">Lider: {c.leader}</span>
                    </div>
                    <div className="text-center min-w-[5rem] shrink-0">
                      <div className="text-[11px] text-cream-dim uppercase tracking-wider font-medium">Puan</div>
                      <div className="text-sm font-black bg-gradient-to-r from-gold-400 to-gold-500 bg-clip-text text-transparent">
                        {c.points.toLocaleString()}
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

/* ============================================================
   RANKINGS — V1: Compact Cards
   Kompakt kartlar, az padding, tek satir bilgi
   ============================================================ */

export function RankingsV1() {
  const [tab, setTab] = useState("players")
  return (
    <div className="card rounded-xl overflow-hidden">
      <div className="section-header">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400"><IconTrophy className="w-4 h-4" /></div>
          <div><h3 className="font-semibold text-cream">En Iyiler</h3><p className="text-xs text-cream-dim">En iyi oyuncular ve klanlar</p></div>
        </div>
        <Link href="/siralamalar" className="text-xs text-gold-400 hover:text-gold-300 flex items-center gap-1">Tumunu Gor <IconChevronRight className="w-3 h-3" /></Link>
      </div>
      <Tabs tabs={rankTabs} active={tab} onChange={setTab} />
      <div className="p-4 space-y-1.5">
        {tab === "players" && players.map((p) => (
          <div key={p.rank} className={`flex items-center gap-2.5 px-3 py-2 rounded-xl border ${rowHover} ${rankRowBg(p.rank)}`}>
            <RankBadge rank={p.rank} />
            <div className="flex gap-1 shrink-0">
              <div className="w-6 h-6 rounded overflow-hidden"><div className={`nation-icon nation-${p.nation}`} style={{ width: 24, height: 24 }} /></div>
              <div className="w-6 h-6 rounded overflow-hidden"><div className={`class-icon class-${p.playerClass}`} style={{ width: 24, height: 24 }} /></div>
            </div>
            <div className="min-w-0 flex-1">
              <span className="font-semibold text-cream text-sm block truncate">{p.name}</span>
              <span className="text-[10px] text-cream-dim">{p.clan}</span>
            </div>
            <span className="text-sm font-black text-gold-400 shrink-0">{p.monthlyNP.toLocaleString()}</span>
          </div>
        ))}
        {tab === "clans" && clans.map((c) => (
          <div key={c.rank} className={`flex items-center gap-2.5 px-3 py-2 rounded-xl border ${rowHover} ${rankRowBg(c.rank)}`}>
            <RankBadge rank={c.rank} />
            <div className="w-7 h-7 rounded bg-gold-500/10 border border-gold-500/20 flex items-center justify-center shrink-0"><IconShield className="w-3.5 h-3.5 text-gold-400" /></div>
            <div className="min-w-0 flex-1">
              <span className="font-semibold text-cream text-sm block truncate">{c.name}</span>
              <span className="text-[10px] text-cream-dim">{c.leader}</span>
            </div>
            <span className="text-sm font-black text-gold-400 shrink-0">{c.points.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ============================================================
   RANKINGS — V2: Leaderboard Ladder
   Top 3 ozel vurgulu, 4-5 kompakt alt liste
   ============================================================ */

export function RankingsV2() {
  const [tab, setTab] = useState("players")
  const topText = ["text-amber-400", "text-slate-300", "text-amber-600"]
  return (
    <div className="card rounded-xl overflow-hidden">
      <div className="section-header">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400"><IconTrophy className="w-4 h-4" /></div>
          <div><h3 className="font-semibold text-cream">En Iyiler</h3><p className="text-xs text-cream-dim">En iyi oyuncular ve klanlar</p></div>
        </div>
        <Link href="/siralamalar" className="text-xs text-gold-400 hover:text-gold-300 flex items-center gap-1">Tumunu Gor <IconChevronRight className="w-3 h-3" /></Link>
      </div>
      <Tabs tabs={rankTabs} active={tab} onChange={setTab} />
      <div className="p-4">
        {tab === "players" && (
          <>
            <div className="space-y-2 mb-3">
              {players.slice(0, 3).map((p, i) => (
                <div key={p.rank} className={`relative overflow-hidden flex items-center gap-3 px-4 py-3 rounded-xl border bg-gradient-to-r to-transparent ${rowHover} ${
                  i === 0 ? "from-amber-500/15 border-amber-500/30" : i === 1 ? "from-slate-400/10 border-slate-400/25" : "from-amber-700/12 border-amber-700/25"
                }`}>
                  <div className="w-9 h-9 flex items-center justify-center shrink-0"><div className={`rank-icon rank-${p.rank}`} /></div>
                  <div className="flex gap-1 shrink-0">
                    <div className="w-7 h-7 rounded overflow-hidden"><div className={`nation-icon nation-${p.nation}`} style={{ width: 28, height: 28 }} /></div>
                    <div className="w-7 h-7 rounded overflow-hidden"><div className={`class-icon class-${p.playerClass}`} style={{ width: 28, height: 28 }} /></div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className={`font-black text-sm truncate block ${topText[i]}`}>{p.name}</span>
                    <span className="text-[10px] text-cream-dim">{p.clan}</span>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-[10px] text-cream-dim uppercase tracking-wider">NP</div>
                    <div className={`text-base font-black ${topText[i]}`}>{p.monthlyNP.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-line/50 pt-2 space-y-1.5">
              {players.slice(3).map((p) => (
                <div key={p.rank} className={`flex items-center gap-2.5 px-3 py-2 rounded-lg bg-ink-800/20 border border-line hover:border-gold-500/20 hover:bg-ink-800/40 ${rowHover}`}>
                  <span className="text-xs font-bold text-cream-dim w-5 shrink-0">{p.rank}</span>
                  <div className="flex gap-1 shrink-0">
                    <div className="w-5 h-5 rounded overflow-hidden"><div className={`nation-icon nation-${p.nation}`} style={{ width: 20, height: 20 }} /></div>
                    <div className="w-5 h-5 rounded overflow-hidden"><div className={`class-icon class-${p.playerClass}`} style={{ width: 20, height: 20 }} /></div>
                  </div>
                  <span className="font-semibold text-cream text-xs flex-1 truncate">{p.name}</span>
                  <span className="text-xs font-bold text-gold-500 shrink-0">{p.monthlyNP.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </>
        )}
        {tab === "clans" && (
          <>
            <div className="space-y-2 mb-3">
              {clans.slice(0, 3).map((c, i) => (
                <div key={c.rank} className={`relative overflow-hidden flex items-center gap-3 px-4 py-3 rounded-xl border bg-gradient-to-r to-transparent ${rowHover} ${
                  i === 0 ? "from-amber-500/15 border-amber-500/30" : i === 1 ? "from-slate-400/10 border-slate-400/25" : "from-amber-700/12 border-amber-700/25"
                }`}>
                  <div className="w-9 h-9 flex items-center justify-center shrink-0"><div className={`rank-icon rank-${c.rank}`} /></div>
                  <div className="w-8 h-8 rounded-lg bg-gold-500/10 border border-gold-500/25 flex items-center justify-center shrink-0"><IconShield className="w-4 h-4 text-gold-400" /></div>
                  <div className="min-w-0 flex-1">
                    <span className={`font-black text-sm truncate block ${topText[i]}`}>{c.name}</span>
                    <span className="text-[10px] text-cream-dim">{c.leader} · {c.members} uye</span>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-[10px] text-cream-dim uppercase tracking-wider">Puan</div>
                    <div className={`text-base font-black ${topText[i]}`}>{c.points.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-line/50 pt-2 space-y-1.5">
              {clans.slice(3).map((c) => (
                <div key={c.rank} className={`flex items-center gap-2.5 px-3 py-2 rounded-lg bg-ink-800/20 border border-line hover:border-gold-500/20 hover:bg-ink-800/40 ${rowHover}`}>
                  <span className="text-xs font-bold text-cream-dim w-5 shrink-0">{c.rank}</span>
                  <div className="w-5 h-5 rounded bg-gold-500/10 border border-gold-500/20 flex items-center justify-center shrink-0"><IconShield className="w-3 h-3 text-gold-400" /></div>
                  <span className="font-semibold text-cream text-xs flex-1 truncate">{c.name}</span>
                  <span className="text-xs font-bold text-gold-500 shrink-0">{c.points.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

/* ============================================================
   RANKINGS — V3: Table Pro
   Kolon basliklari, alternating satirlar, dashboard hissi
   ============================================================ */

export function RankingsV3() {
  const [tab, setTab] = useState("players")
  return (
    <div className="card rounded-xl overflow-hidden">
      <div className="section-header">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400"><IconTrophy className="w-4 h-4" /></div>
          <div><h3 className="font-semibold text-cream">En Iyiler</h3><p className="text-xs text-cream-dim">En iyi oyuncular ve klanlar</p></div>
        </div>
        <Link href="/siralamalar" className="text-xs text-gold-400 hover:text-gold-300 flex items-center gap-1">Tumunu Gor <IconChevronRight className="w-3 h-3" /></Link>
      </div>
      <Tabs tabs={rankTabs} active={tab} onChange={setTab} />
      <div className="px-4 pb-4">
        {tab === "players" && (
          <div className="mt-3 rounded-lg overflow-hidden border border-line">
            <div className="grid grid-cols-[2rem_1fr_auto] gap-x-2 px-3 py-1.5 bg-ink-900/70 border-b border-line">
              <span className="text-[9px] font-bold text-cream-dim/50 uppercase tracking-widest">#</span>
              <span className="text-[9px] font-bold text-cream-dim/50 uppercase tracking-widest">Oyuncu</span>
              <span className="text-[9px] font-bold text-cream-dim/50 uppercase tracking-widest text-right">Aylik NP</span>
            </div>
            {players.map((p, i) => (
              <div key={p.rank} className={`grid grid-cols-[2rem_1fr_auto] gap-x-2 items-center px-3 py-2 border-b border-line/40 last:border-0 ${rowHover} ${i % 2 === 0 ? "bg-ink-800/10" : ""} hover:bg-ink-800/40`}>
                <RankBadge rank={p.rank} />
                <div className="min-w-0 flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded overflow-hidden shrink-0"><div className={`nation-icon nation-${p.nation}`} style={{ width: 20, height: 20 }} /></div>
                  <div className="w-5 h-5 rounded overflow-hidden shrink-0"><div className={`class-icon class-${p.playerClass}`} style={{ width: 20, height: 20 }} /></div>
                  <span className="font-semibold text-cream text-sm truncate">{p.name}</span>
                </div>
                <span className="text-sm font-black text-gold-400 text-right shrink-0">{p.monthlyNP.toLocaleString()}</span>
              </div>
            ))}
          </div>
        )}
        {tab === "clans" && (
          <div className="mt-3 rounded-lg overflow-hidden border border-line">
            <div className="grid grid-cols-[2rem_1fr_auto_auto] gap-x-2 px-3 py-1.5 bg-ink-900/70 border-b border-line">
              <span className="text-[9px] font-bold text-cream-dim/50 uppercase tracking-widest">#</span>
              <span className="text-[9px] font-bold text-cream-dim/50 uppercase tracking-widest">Klan</span>
              <span className="text-[9px] font-bold text-cream-dim/50 uppercase tracking-widest text-right">Uye</span>
              <span className="text-[9px] font-bold text-cream-dim/50 uppercase tracking-widest text-right">Puan</span>
            </div>
            {clans.map((c, i) => (
              <div key={c.rank} className={`grid grid-cols-[2rem_1fr_auto_auto] gap-x-2 items-center px-3 py-2 border-b border-line/40 last:border-0 ${rowHover} ${i % 2 === 0 ? "bg-ink-800/10" : ""} hover:bg-ink-800/40`}>
                <RankBadge rank={c.rank} />
                <span className="font-semibold text-cream text-sm truncate">{c.name}</span>
                <span className="text-sm text-cream-dim text-right shrink-0">{c.members}</span>
                <span className="text-sm font-black text-gold-400 text-right shrink-0">{c.points.toLocaleString()}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/* ============================================================
   RANKINGS — V4: Animated Rank
   Rank badge hover bounce animasyonu
   ============================================================ */

export function RankingsV4() {
  const [tab, setTab] = useState("players")
  return (
    <div className="card rounded-xl overflow-hidden">
      <div className="section-header">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400"><IconTrophy className="w-4 h-4" /></div>
          <div><h3 className="font-semibold text-cream">En Iyiler</h3><p className="text-xs text-cream-dim">En iyi oyuncular ve klanlar</p></div>
        </div>
        <Link href="/siralamalar" className="text-xs text-gold-400 hover:text-gold-300 flex items-center gap-1">Tumunu Gor <IconChevronRight className="w-3 h-3" /></Link>
      </div>
      <Tabs tabs={rankTabs} active={tab} onChange={setTab} />
      <div className="p-4 space-y-2">
        {tab === "players" && players.map((p) => (
          <div key={p.rank} className={`relative overflow-hidden flex items-center gap-3 px-3 py-3 rounded-xl border ${rankRowBg(p.rank)} ${rowHover} group`}>
            <div className="shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
              <RankBadge rank={p.rank} />
            </div>
            <div className="flex gap-1 shrink-0">
              <div className="w-6 h-6 rounded overflow-hidden"><div className={`nation-icon nation-${p.nation}`} style={{ width: 24, height: 24 }} /></div>
              <div className="w-6 h-6 rounded overflow-hidden"><div className={`class-icon class-${p.playerClass}`} style={{ width: 24, height: 24 }} /></div>
            </div>
            <div className="min-w-0 flex-1">
              <span className="font-bold text-cream text-sm block truncate">{p.name}</span>
              <span className="text-[10px] text-cream-dim">{p.clan}</span>
            </div>
            <div className="text-right shrink-0 min-w-[4.5rem]">
              <div className="text-lg font-black text-gold-400 leading-none">{p.monthlyNP.toLocaleString()}</div>
              <div className="text-[9px] text-cream-dim/60 uppercase tracking-wider">NP</div>
            </div>
          </div>
        ))}
        {tab === "clans" && clans.map((c) => (
          <div key={c.rank} className={`relative overflow-hidden flex items-center gap-3 px-3 py-3 rounded-xl border ${rankRowBg(c.rank)} ${rowHover} group`}>
            <div className="shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
              <RankBadge rank={c.rank} />
            </div>
            <div className="w-8 h-8 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center shrink-0"><IconShield className="w-4 h-4 text-gold-400" /></div>
            <div className="min-w-0 flex-1">
              <span className="font-bold text-cream text-sm block truncate">{c.name}</span>
              <span className="text-[10px] text-cream-dim">{c.leader} · {c.members} uye</span>
            </div>
            <div className="text-right shrink-0 min-w-[4.5rem]">
              <div className="text-lg font-black text-gold-400 leading-none">{c.points.toLocaleString()}</div>
              <div className="text-[9px] text-cream-dim/60 uppercase tracking-wider">Puan</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ============================================================
   RANKINGS — V5: Inline Toggle Tabs
   Tablar yukarida degil, icerik icinde inline pill switcher
   ============================================================ */

export function RankingsV5() {
  const [tab, setTab] = useState("players")
  return (
    <div className="card rounded-xl overflow-hidden">
      <div className="section-header">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400"><IconTrophy className="w-4 h-4" /></div>
          <div><h3 className="font-semibold text-cream">En Iyiler</h3><p className="text-xs text-cream-dim">En iyi oyuncular ve klanlar</p></div>
        </div>
        <Link href="/siralamalar" className="text-xs text-gold-400 hover:text-gold-300 flex items-center gap-1">Tumunu Gor <IconChevronRight className="w-3 h-3" /></Link>
      </div>
      <div className="p-4">
        <div className="flex gap-1 mb-3">
          {rankTabs.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                tab === id ? "gold-btn" : "bg-ink-800/50 border border-line text-cream-dim hover:text-cream"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="space-y-1.5">
          {tab === "players" && players.map((p) => (
            <div key={p.rank} className={`flex items-center gap-2.5 px-3 py-2 rounded-xl border ${rowHover} ${rankRowBg(p.rank)}`}>
              <RankBadge rank={p.rank} />
              <div className="flex gap-1 shrink-0">
                <div className="w-6 h-6 rounded overflow-hidden"><div className={`nation-icon nation-${p.nation}`} style={{ width: 24, height: 24 }} /></div>
                <div className="w-6 h-6 rounded overflow-hidden"><div className={`class-icon class-${p.playerClass}`} style={{ width: 24, height: 24 }} /></div>
              </div>
              <div className="min-w-0 flex-1">
                <span className="font-semibold text-cream text-sm block truncate">{p.name}</span>
                <span className="text-[10px] text-cream-dim">{p.clan}</span>
              </div>
              <span className="text-sm font-black text-gold-400 shrink-0">{p.monthlyNP.toLocaleString()}</span>
            </div>
          ))}
          {tab === "clans" && clans.map((c) => (
            <div key={c.rank} className={`flex items-center gap-2.5 px-3 py-2 rounded-xl border ${rowHover} ${rankRowBg(c.rank)}`}>
              <RankBadge rank={c.rank} />
              <div className="w-7 h-7 rounded bg-gold-500/10 border border-gold-500/20 flex items-center justify-center shrink-0"><IconShield className="w-3.5 h-3.5 text-gold-400" /></div>
              <div className="min-w-0 flex-1">
                <span className="font-semibold text-cream text-sm block truncate">{c.name}</span>
                <span className="text-[10px] text-cream-dim">{c.leader}</span>
              </div>
              <span className="text-sm font-black text-gold-400 shrink-0">{c.points.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ============================================================
   RANKINGS — V6: Label Badges
   Rank, nation inline badge olarak isim yani
   ============================================================ */

export function RankingsV6() {
  const [tab, setTab] = useState("players")
  return (
    <div className="card rounded-xl overflow-hidden">
      <div className="section-header">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400"><IconTrophy className="w-4 h-4" /></div>
          <div><h3 className="font-semibold text-cream">En Iyiler</h3><p className="text-xs text-cream-dim">En iyi oyuncular ve klanlar</p></div>
        </div>
        <Link href="/siralamalar" className="text-xs text-gold-400 hover:text-gold-300 flex items-center gap-1">Tumunu Gor <IconChevronRight className="w-3 h-3" /></Link>
      </div>
      <Tabs tabs={rankTabs} active={tab} onChange={setTab} />
      <div className="p-4 space-y-2">
        {tab === "players" && players.map((p) => (
          <div key={p.rank} className={`relative overflow-hidden flex items-center gap-3 px-3 py-3 rounded-xl border ${rankRowBg(p.rank)} ${rowHover}`}>
            <div className="flex flex-col gap-0.5 shrink-0">
              <div className="w-6 h-6 rounded overflow-hidden"><div className={`nation-icon nation-${p.nation}`} style={{ width: 24, height: 24 }} /></div>
              <div className="w-6 h-6 rounded overflow-hidden"><div className={`class-icon class-${p.playerClass}`} style={{ width: 24, height: 24 }} /></div>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-cream text-sm truncate">{p.name}</span>
                {p.rank <= 3 && <span className={`text-[10px] font-black px-1.5 py-0 rounded ${p.rank === 1 ? "bg-amber-500/20 text-amber-400" : p.rank === 2 ? "bg-slate-400/20 text-slate-300" : "bg-amber-700/20 text-amber-500"}`}>#{p.rank}</span>}
              </div>
              <span className="text-[10px] text-cream-dim">{p.clan}</span>
            </div>
            <div className="text-right shrink-0">
              <div className="text-[10px] text-cream-dim uppercase tracking-wider">NP</div>
              <div className="text-base font-black text-gold-400">{p.monthlyNP.toLocaleString()}</div>
            </div>
          </div>
        ))}
        {tab === "clans" && clans.map((c) => (
          <div key={c.rank} className={`relative overflow-hidden flex items-center gap-3 px-3 py-3 rounded-xl border ${rankRowBg(c.rank)} ${rowHover}`}>
            <div className="w-9 h-9 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center shrink-0"><IconShield className="w-5 h-5 text-gold-400" /></div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-cream text-sm truncate">{c.name}</span>
                {c.rank <= 3 && <span className={`text-[10px] font-black px-1.5 py-0 rounded ${c.rank === 1 ? "bg-amber-500/20 text-amber-400" : c.rank === 2 ? "bg-slate-400/20 text-slate-300" : "bg-amber-700/20 text-amber-500"}`}>#{c.rank}</span>}
              </div>
              <span className="text-[10px] text-cream-dim">{c.leader} · {c.members} uye</span>
            </div>
            <div className="text-right shrink-0">
              <div className="text-[10px] text-cream-dim uppercase tracking-wider">Puan</div>
              <div className="text-base font-black text-gold-400">{c.points.toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ============================================================
   RANKINGS — V7: Stats Header
   Header altinda mini istatistik bar
   ============================================================ */

export function RankingsV7() {
  const [tab, setTab] = useState("players")
  const totalNP = players.reduce((sum, p) => sum + p.monthlyNP, 0)
  const totalPoints = clans.reduce((sum, c) => sum + c.points, 0)
  return (
    <div className="card rounded-xl overflow-hidden">
      <div className="section-header">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400"><IconTrophy className="w-4 h-4" /></div>
          <div><h3 className="font-semibold text-cream">En Iyiler</h3><p className="text-xs text-cream-dim">En iyi oyuncular ve klanlar</p></div>
        </div>
        <Link href="/siralamalar" className="text-xs text-gold-400 hover:text-gold-300 flex items-center gap-1">Tumunu Gor <IconChevronRight className="w-3 h-3" /></Link>
      </div>
      <div className="px-4 pt-3 pb-0">
        <div className="flex gap-3 mb-3">
          <div className="flex-1 bg-ink-800/40 border border-line rounded-lg px-3 py-2">
            <div className="text-[10px] text-cream-dim uppercase tracking-wider">Toplam NP</div>
            <div className="text-sm font-black text-gold-400">{totalNP.toLocaleString()}</div>
          </div>
          <div className="flex-1 bg-ink-800/40 border border-line rounded-lg px-3 py-2">
            <div className="text-[10px] text-cream-dim uppercase tracking-wider">Toplam Puan</div>
            <div className="text-sm font-black text-gold-400">{totalPoints.toLocaleString()}</div>
          </div>
        </div>
      </div>
      <Tabs tabs={rankTabs} active={tab} onChange={setTab} />
      <div className="p-4 space-y-1.5">
        {tab === "players" && players.map((p) => (
          <div key={p.rank} className={`flex items-center gap-2.5 px-3 py-2 rounded-xl border ${rowHover} ${rankRowBg(p.rank)}`}>
            <RankBadge rank={p.rank} />
            <div className="flex gap-1 shrink-0">
              <div className="w-6 h-6 rounded overflow-hidden"><div className={`nation-icon nation-${p.nation}`} style={{ width: 24, height: 24 }} /></div>
              <div className="w-6 h-6 rounded overflow-hidden"><div className={`class-icon class-${p.playerClass}`} style={{ width: 24, height: 24 }} /></div>
            </div>
            <div className="min-w-0 flex-1">
              <span className="font-semibold text-cream text-sm block truncate">{p.name}</span>
              <span className="text-[10px] text-cream-dim">{p.clan}</span>
            </div>
            <span className="text-sm font-black text-gold-400 shrink-0">{p.monthlyNP.toLocaleString()}</span>
          </div>
        ))}
        {tab === "clans" && clans.map((c) => (
          <div key={c.rank} className={`flex items-center gap-2.5 px-3 py-2 rounded-xl border ${rowHover} ${rankRowBg(c.rank)}`}>
            <RankBadge rank={c.rank} />
            <div className="w-7 h-7 rounded bg-gold-500/10 border border-gold-500/20 flex items-center justify-center shrink-0"><IconShield className="w-3.5 h-3.5 text-gold-400" /></div>
            <div className="min-w-0 flex-1">
              <span className="font-semibold text-cream text-sm block truncate">{c.name}</span>
              <span className="text-[10px] text-cream-dim">{c.leader}</span>
            </div>
            <span className="text-sm font-black text-gold-400 shrink-0">{c.points.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ============================================================
   RANKINGS — V8: Progress NP Bar
   Her satirda NP'ye gore ilerleme cubugu
   ============================================================ */

export function RankingsV8() {
  const [tab, setTab] = useState("players")
  const maxNP = Math.max(...players.map(p => p.monthlyNP))
  const maxPoints = Math.max(...clans.map(c => c.points))
  return (
    <div className="card rounded-xl overflow-hidden">
      <div className="section-header">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400"><IconTrophy className="w-4 h-4" /></div>
          <div><h3 className="font-semibold text-cream">En Iyiler</h3><p className="text-xs text-cream-dim">En iyi oyuncular ve klanlar</p></div>
        </div>
        <Link href="/siralamalar" className="text-xs text-gold-400 hover:text-gold-300 flex items-center gap-1">Tumunu Gor <IconChevronRight className="w-3 h-3" /></Link>
      </div>
      <Tabs tabs={rankTabs} active={tab} onChange={setTab} />
      <div className="p-4 space-y-2">
        {tab === "players" && players.map((p) => (
          <div key={p.rank} className={`relative overflow-hidden px-3 py-3 rounded-xl border ${rankRowBg(p.rank)} ${rowHover}`}>
            <div className="flex items-center gap-3 mb-1.5">
              <RankBadge rank={p.rank} />
              <div className="flex gap-1 shrink-0">
                <div className="w-5 h-5 rounded overflow-hidden"><div className={`nation-icon nation-${p.nation}`} style={{ width: 20, height: 20 }} /></div>
                <div className="w-5 h-5 rounded overflow-hidden"><div className={`class-icon class-${p.playerClass}`} style={{ width: 20, height: 20 }} /></div>
              </div>
              <div className="min-w-0 flex-1">
                <span className="font-semibold text-cream text-sm block truncate">{p.name}</span>
              </div>
              <span className="text-xs font-black text-gold-400 shrink-0">{p.monthlyNP.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-cream-dim/50 w-8">{p.clan}</span>
              <div className="flex-1 h-1.5 bg-ink-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-gold-400 to-gold-500 rounded-full transition-all duration-500" style={{ width: `${(p.monthlyNP / maxNP) * 100}%` }} />
              </div>
            </div>
          </div>
        ))}
        {tab === "clans" && clans.map((c) => (
          <div key={c.rank} className={`relative overflow-hidden px-3 py-3 rounded-xl border ${rankRowBg(c.rank)} ${rowHover}`}>
            <div className="flex items-center gap-3 mb-1.5">
              <RankBadge rank={c.rank} />
              <div className="w-7 h-7 rounded bg-gold-500/10 border border-gold-500/20 flex items-center justify-center shrink-0"><IconShield className="w-3.5 h-3.5 text-gold-400" /></div>
              <div className="min-w-0 flex-1">
                <span className="font-semibold text-cream text-sm block truncate">{c.name}</span>
              </div>
              <span className="text-xs font-black text-gold-400 shrink-0">{c.points.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-cream-dim/50 w-8">{c.members} uye</span>
              <div className="flex-1 h-1.5 bg-ink-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-gold-400 to-gold-500 rounded-full transition-all duration-500" style={{ width: `${(c.points / maxPoints) * 100}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ============================================================
   RANKINGS — V9: Two Column Grid
   2 sutunlu kart gridi
   ============================================================ */

export function RankingsV9() {
  const [tab, setTab] = useState("players")
  return (
    <div className="card rounded-xl overflow-hidden">
      <div className="section-header">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400"><IconTrophy className="w-4 h-4" /></div>
          <div><h3 className="font-semibold text-cream">En Iyiler</h3><p className="text-xs text-cream-dim">En iyi oyuncular ve klanlar</p></div>
        </div>
        <Link href="/siralamalar" className="text-xs text-gold-400 hover:text-gold-300 flex items-center gap-1">Tumunu Gor <IconChevronRight className="w-3 h-3" /></Link>
      </div>
      <Tabs tabs={rankTabs} active={tab} onChange={setTab} />
      <div className="p-4">
        {tab === "players" && (
          <div className="grid grid-cols-2 gap-2">
            {players.map((p) => (
              <div key={p.rank} className={`flex flex-col gap-2 p-3 rounded-xl border ${rankRowBg(p.rank)} ${rowHover}`}>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    <div className="w-5 h-5 rounded overflow-hidden"><div className={`nation-icon nation-${p.nation}`} style={{ width: 20, height: 20 }} /></div>
                    <div className="w-5 h-5 rounded overflow-hidden"><div className={`class-icon class-${p.playerClass}`} style={{ width: 20, height: 20 }} /></div>
                  </div>
                  <span className={`text-[10px] font-black px-1.5 py-0 rounded ${p.rank === 1 ? "bg-amber-500/20 text-amber-400" : p.rank === 2 ? "bg-slate-400/20 text-slate-300" : p.rank === 3 ? "bg-amber-700/20 text-amber-500" : "bg-ink-700 text-cream-dim"}`}>#{p.rank}</span>
                </div>
                <span className="font-bold text-cream text-sm truncate">{p.name}</span>
                <span className="text-[10px] text-cream-dim">{p.clan}</span>
                <span className="text-sm font-black text-gold-400">{p.monthlyNP.toLocaleString()} NP</span>
              </div>
            ))}
          </div>
        )}
        {tab === "clans" && (
          <div className="grid grid-cols-2 gap-2">
            {clans.map((c) => (
              <div key={c.rank} className={`flex flex-col gap-2 p-3 rounded-xl border ${rankRowBg(c.rank)} ${rowHover}`}>
                <div className="flex items-center justify-between">
                  <div className="w-7 h-7 rounded bg-gold-500/10 border border-gold-500/20 flex items-center justify-center"><IconShield className="w-3.5 h-3.5 text-gold-400" /></div>
                  <span className={`text-[10px] font-black px-1.5 py-0 rounded ${c.rank === 1 ? "bg-amber-500/20 text-amber-400" : c.rank === 2 ? "bg-slate-400/20 text-slate-300" : c.rank === 3 ? "bg-amber-700/20 text-amber-500" : "bg-ink-700 text-cream-dim"}`}>#{c.rank}</span>
                </div>
                <span className="font-bold text-cream text-sm truncate">{c.name}</span>
                <span className="text-[10px] text-cream-dim">{c.leader}</span>
                <span className="text-sm font-black text-gold-400">{c.points.toLocaleString()}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/* ============================================================
   RANKINGS — V10: Medal Cards
   Her satir medal/rozetli kart
   ============================================================ */

export function RankingsV10() {
  const [tab, setTab] = useState("players")
  return (
    <div className="card rounded-xl overflow-hidden">
      <div className="section-header">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400"><IconTrophy className="w-4 h-4" /></div>
          <div><h3 className="font-semibold text-cream">En Iyiler</h3><p className="text-xs text-cream-dim">En iyi oyuncular ve klanlar</p></div>
        </div>
        <Link href="/siralamalar" className="text-xs text-gold-400 hover:text-gold-300 flex items-center gap-1">Tumunu Gor <IconChevronRight className="w-3 h-3" /></Link>
      </div>
      <Tabs tabs={rankTabs} active={tab} onChange={setTab} />
      <div className="p-4 space-y-2">
        {tab === "players" && players.map((p) => (
          <div key={p.rank} className={`relative overflow-hidden flex items-center gap-3 px-3 py-3 rounded-xl border ${rankRowBg(p.rank)} ${rowHover}`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${p.rank === 1 ? "bg-amber-500/15 border border-amber-500/30" : p.rank === 2 ? "bg-slate-400/10 border border-slate-400/25" : p.rank === 3 ? "bg-amber-700/12 border border-amber-700/25" : "bg-ink-800/50 border border-line"}`}>
              <span className={`text-lg font-black ${p.rank === 1 ? "text-amber-400" : p.rank === 2 ? "text-slate-300" : p.rank === 3 ? "text-amber-600" : "text-cream-dim/40"}`}>{p.rank}</span>
            </div>
            <div className="flex flex-col gap-0.5 shrink-0">
              <div className="w-6 h-6 rounded overflow-hidden"><div className={`nation-icon nation-${p.nation}`} style={{ width: 24, height: 24 }} /></div>
              <div className="w-6 h-6 rounded overflow-hidden"><div className={`class-icon class-${p.playerClass}`} style={{ width: 24, height: 24 }} /></div>
            </div>
            <div className="min-w-0 flex-1">
              <span className="font-bold text-cream text-sm block truncate">{p.name}</span>
              <span className="text-[10px] text-cream-dim">{p.clan}</span>
            </div>
            <div className="text-right shrink-0">
              <div className="text-[10px] text-cream-dim uppercase tracking-wider">NP</div>
              <div className="text-base font-black text-gold-400">{p.monthlyNP.toLocaleString()}</div>
            </div>
          </div>
        ))}
        {tab === "clans" && clans.map((c) => (
          <div key={c.rank} className={`relative overflow-hidden flex items-center gap-3 px-3 py-3 rounded-xl border ${rankRowBg(c.rank)} ${rowHover}`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${c.rank === 1 ? "bg-amber-500/15 border border-amber-500/30" : c.rank === 2 ? "bg-slate-400/10 border border-slate-400/25" : c.rank === 3 ? "bg-amber-700/12 border border-amber-700/25" : "bg-ink-800/50 border border-line"}`}>
              <span className={`text-lg font-black ${c.rank === 1 ? "text-amber-400" : c.rank === 2 ? "text-slate-300" : c.rank === 3 ? "text-amber-600" : "text-cream-dim/40"}`}>{c.rank}</span>
            </div>
            <div className="w-9 h-9 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center shrink-0"><IconShield className="w-5 h-5 text-gold-400" /></div>
            <div className="min-w-0 flex-1">
              <span className="font-bold text-cream text-sm block truncate">{c.name}</span>
              <span className="text-[10px] text-cream-dim">{c.leader} · {c.members} uye</span>
            </div>
            <div className="text-right shrink-0">
              <div className="text-[10px] text-cream-dim uppercase tracking-wider">Puan</div>
              <div className="text-base font-black text-gold-400">{c.points.toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ============================================================
   STAFF — ANA (Production clone)
   ============================================================ */

export function StaffAna() {
  const [tab, setTab] = useState("staff")
  return (
    <div className="card rounded-xl overflow-hidden">
      <div className="section-header">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400"><IconCrown className="w-4 h-4" /></div>
          <div><h3 className="font-semibold text-cream">Yonetim</h3><p className="text-xs text-cream-dim">Yoneticiler ve krallar</p></div>
        </div>
        <Link href="/yonetim" className="text-xs text-gold-400 hover:text-gold-300 flex items-center gap-1">Tumunu Gor <IconChevronRight className="w-3 h-3" /></Link>
      </div>
      <Tabs tabs={staffTabs} active={tab} onChange={setTab} />
      <div className="p-4">
        {tab === "staff" && (
          <div className="space-y-3">
            {staff.map((m) => (
              <div key={m.rank} className={`relative overflow-hidden rounded-xl bg-ink-800/30 border border-line hover:border-gold-500/30 hover:bg-ink-800/50 ${rowHover}`}>
                <div className="flex items-stretch">
                  <div className="flex items-center justify-center px-3 py-3 bg-ink-800/20 border-r border-line/50">
                    <div className="w-8 h-8 rounded-lg bg-ink-700 border border-line flex items-center justify-center">
                      <span className="text-xs font-bold text-cream-dim">{m.rank}</span>
                    </div>
                  </div>
                  <div className="flex-1 flex items-center px-3 gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0"><IconShield className="w-4 h-4 text-emerald-400" /></div>
                    <div className="min-w-0 flex-1">
                      <span className="font-bold text-cream text-sm block truncate">{m.name}</span>
                      <span className="text-[11px] text-cream-dim">{m.role}</span>
                    </div>
                    <div className="text-center min-w-[5rem] shrink-0">
                      <div className="text-[10px] text-cream-dim uppercase tracking-wider font-medium">Durum</div>
                      <div className={`text-sm font-bold ${m.isOnline ? "text-emerald-400" : "text-cream-dim"}`}>{m.isOnline ? "Cevrimici" : "Cevrimdisi"}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {tab === "kings" && (
          <div className="space-y-3">
            {kings.map((k) => (
              <div key={k.rank} className={`relative overflow-hidden rounded-xl border ${rowHover} ${k.nation === "karus" ? "bg-gradient-to-r from-rose-500/10 via-rose-500/5 to-transparent border-rose-500/20 hover:border-rose-500/40 hover:from-rose-500/15" : "bg-gradient-to-r from-sky-500/10 via-sky-500/5 to-transparent border-sky-500/20 hover:border-sky-500/40 hover:from-sky-500/15"}`}>
                <div className="flex items-stretch">
                  <div className="flex items-center justify-center px-3 py-3 bg-ink-800/20 border-r border-line/50">
                    <div className="w-8 h-8 rounded-lg bg-ink-700 border border-line flex items-center justify-center"><span className="text-xs font-bold text-cream-dim">{k.rank}</span></div>
                  </div>
                  <div className="flex-1 flex items-center px-3 gap-3">
                    <div className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 ${k.nation === "karus" ? "bg-rose-500/20 border-rose-500/30" : "bg-sky-500/20 border-sky-500/30"}`}>
                      <IconCrown className={`w-4 h-4 ${k.nation === "karus" ? "text-rose-400" : "text-sky-400"}`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className={`font-bold text-sm block truncate ${k.nation === "karus" ? "text-rose-400" : "text-sky-400"}`}>{k.name}</span>
                      <span className="text-[11px] text-cream-dim">{k.title}</span>
                    </div>
                    <div className="text-center min-w-[5rem] shrink-0">
                      <div className="text-[10px] text-cream-dim uppercase tracking-wider font-medium">Tahta</div>
                      <div className="text-sm font-black bg-gradient-to-r from-gold-400 to-gold-500 bg-clip-text text-transparent">{new Date(k.since).toLocaleDateString("tr-TR")}</div>
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

/* ============================================================
   STAFF STATUS — V1: Dot Pulse
   Orijinaldeki gibi dot + pulse animasyonu
   ============================================================ */

export function StaffStatusV1() {
  const [tab, setTab] = useState("staff")
  return (
    <div className="card rounded-xl overflow-hidden">
      <div className="section-header">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400"><IconCrown className="w-4 h-4" /></div>
          <div><h3 className="font-semibold text-cream">Yonetim</h3><p className="text-xs text-cream-dim">Yoneticiler ve krallar</p></div>
        </div>
        <Link href="/yonetim" className="text-xs text-gold-400 hover:text-gold-300 flex items-center gap-1">Tumunu Gor <IconChevronRight className="w-3 h-3" /></Link>
      </div>
      <Tabs tabs={staffTabs} active={tab} onChange={setTab} />
      <div className="p-4">
        {tab === "staff" && (
          <div className="space-y-3">
            {staff.map((m) => (
              <div key={m.rank} className={`relative overflow-hidden rounded-xl bg-ink-800/30 border border-line hover:border-gold-500/30 hover:bg-ink-800/50 ${rowHover}`}>
                <div className="flex items-stretch">
                  <div className="flex items-center justify-center px-3 py-3 bg-ink-800/20 border-r border-line/50">
                    <div className="w-8 h-8 rounded-lg bg-ink-700 border border-line flex items-center justify-center">
                      <span className="text-xs font-bold text-cream-dim">{m.rank}</span>
                    </div>
                  </div>
                  <div className="flex-1 flex items-center px-3 gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0"><IconShield className="w-4 h-4 text-emerald-400" /></div>
                    <div className="min-w-0 flex-1">
                      <span className="font-bold text-cream text-sm block truncate">{m.name}</span>
                      <span className="text-[11px] text-cream-dim">{m.role}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 min-w-[5rem]">
                      <span className={`w-2.5 h-2.5 rounded-full ${m.isOnline ? "bg-emerald-400 dot-pulse" : "bg-ink-600"}`} />
                      <span className={`text-xs font-semibold ${m.isOnline ? "text-emerald-400" : "text-cream-dim/50"}`}>{m.isOnline ? "Cevrimici" : "Cevrimdisi"}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {tab === "kings" && (
          <div className="space-y-3">
            {kings.map((k) => (
              <div key={k.rank} className={`relative overflow-hidden rounded-xl border ${rowHover} ${k.nation === "karus" ? "bg-gradient-to-r from-rose-500/10 via-rose-500/5 to-transparent border-rose-500/20 hover:border-rose-500/40 hover:from-rose-500/15" : "bg-gradient-to-r from-sky-500/10 via-sky-500/5 to-transparent border-sky-500/20 hover:border-sky-500/40 hover:from-sky-500/15"}`}>
                <div className="flex items-stretch">
                  <div className="flex items-center justify-center px-3 py-3 bg-ink-800/20 border-r border-line/50">
                    <div className="w-8 h-8 rounded-lg bg-ink-700 border border-line flex items-center justify-center"><span className="text-xs font-bold text-cream-dim">{k.rank}</span></div>
                  </div>
                  <div className="flex-1 flex items-center px-3 gap-3">
                    <div className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 ${k.nation === "karus" ? "bg-rose-500/20 border-rose-500/30" : "bg-sky-500/20 border-sky-500/30"}`}>
                      <IconCrown className={`w-4 h-4 ${k.nation === "karus" ? "text-rose-400" : "text-sky-400"}`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className={`font-bold text-sm block truncate ${k.nation === "karus" ? "text-rose-400" : "text-sky-400"}`}>{k.name}</span>
                      <span className="text-[11px] text-cream-dim">{k.title}</span>
                    </div>
                    <div className="text-center min-w-[5rem] shrink-0">
                      <div className="text-[10px] text-cream-dim uppercase tracking-wider font-medium">Tahta</div>
                      <div className="text-sm font-black bg-gradient-to-r from-gold-400 to-gold-500 bg-clip-text text-transparent">{new Date(k.since).toLocaleDateString("tr-TR")}</div>
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

/* ============================================================
   STAFF STATUS — V2: Color Pill
   Renkli pill badge, modern status gosterimi
   ============================================================ */

export function StaffStatusV2() {
  const [tab, setTab] = useState("staff")
  return (
    <div className="card rounded-xl overflow-hidden">
      <div className="section-header">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400"><IconCrown className="w-4 h-4" /></div>
          <div><h3 className="font-semibold text-cream">Yonetim</h3><p className="text-xs text-cream-dim">Yoneticiler ve krallar</p></div>
        </div>
        <Link href="/yonetim" className="text-xs text-gold-400 hover:text-gold-300 flex items-center gap-1">Tumunu Gor <IconChevronRight className="w-3 h-3" /></Link>
      </div>
      <Tabs tabs={staffTabs} active={tab} onChange={setTab} />
      <div className="p-4">
        {tab === "staff" && (
          <div className="space-y-3">
            {staff.map((m) => (
              <div key={m.rank} className={`relative overflow-hidden rounded-xl bg-ink-800/30 border border-line hover:border-gold-500/30 hover:bg-ink-800/50 ${rowHover}`}>
                <div className="flex items-stretch">
                  <div className="flex items-center justify-center px-3 py-3 bg-ink-800/20 border-r border-line/50">
                    <div className="w-8 h-8 rounded-lg bg-ink-700 border border-line flex items-center justify-center">
                      <span className="text-xs font-bold text-cream-dim">{m.rank}</span>
                    </div>
                  </div>
                  <div className="flex-1 flex items-center px-3 gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0"><IconShield className="w-4 h-4 text-emerald-400" /></div>
                    <div className="min-w-0 flex-1">
                      <span className="font-bold text-cream text-sm block truncate">{m.name}</span>
                      <span className="text-[11px] text-cream-dim">{m.role}</span>
                    </div>
                    <div className="shrink-0">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${m.isOnline ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/25" : "bg-ink-700/50 text-cream-dim/50 border-line"}`}>
                        {m.isOnline ? "Cevrimici" : "Cevrimdisi"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {tab === "kings" && (
          <div className="space-y-3">
            {kings.map((k) => (
              <div key={k.rank} className={`relative overflow-hidden rounded-xl border ${rowHover} ${k.nation === "karus" ? "bg-gradient-to-r from-rose-500/10 via-rose-500/5 to-transparent border-rose-500/20 hover:border-rose-500/40 hover:from-rose-500/15" : "bg-gradient-to-r from-sky-500/10 via-sky-500/5 to-transparent border-sky-500/20 hover:border-sky-500/40 hover:from-sky-500/15"}`}>
                <div className="flex items-stretch">
                  <div className="flex items-center justify-center px-3 py-3 bg-ink-800/20 border-r border-line/50">
                    <div className="w-8 h-8 rounded-lg bg-ink-700 border border-line flex items-center justify-center"><span className="text-xs font-bold text-cream-dim">{k.rank}</span></div>
                  </div>
                  <div className="flex-1 flex items-center px-3 gap-3">
                    <div className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 ${k.nation === "karus" ? "bg-rose-500/20 border-rose-500/30" : "bg-sky-500/20 border-sky-500/30"}`}>
                      <IconCrown className={`w-4 h-4 ${k.nation === "karus" ? "text-rose-400" : "text-sky-400"}`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className={`font-bold text-sm block truncate ${k.nation === "karus" ? "text-rose-400" : "text-sky-400"}`}>{k.name}</span>
                      <span className="text-[11px] text-cream-dim">{k.title}</span>
                    </div>
                    <div className="text-center min-w-[5rem] shrink-0">
                      <div className="text-[10px] text-cream-dim uppercase tracking-wider font-medium">Tahta</div>
                      <div className="text-sm font-black bg-gradient-to-r from-gold-400 to-gold-500 bg-clip-text text-transparent">{new Date(k.since).toLocaleDateString("tr-TR")}</div>
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

/* ============================================================
   STAFF STATUS — V3: Icon + Text
   Check / X icon + durum metni
   ============================================================ */

export function StaffStatusV3() {
  const [tab, setTab] = useState("staff")
  return (
    <div className="card rounded-xl overflow-hidden">
      <div className="section-header">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400"><IconCrown className="w-4 h-4" /></div>
          <div><h3 className="font-semibold text-cream">Yonetim</h3><p className="text-xs text-cream-dim">Yoneticiler ve krallar</p></div>
        </div>
        <Link href="/yonetim" className="text-xs text-gold-400 hover:text-gold-300 flex items-center gap-1">Tumunu Gor <IconChevronRight className="w-3 h-3" /></Link>
      </div>
      <Tabs tabs={staffTabs} active={tab} onChange={setTab} />
      <div className="p-4">
        {tab === "staff" && (
          <div className="space-y-3">
            {staff.map((m) => (
              <div key={m.rank} className={`relative overflow-hidden rounded-xl bg-ink-800/30 border border-line hover:border-gold-500/30 hover:bg-ink-800/50 ${rowHover}`}>
                <div className="flex items-stretch">
                  <div className="flex items-center justify-center px-3 py-3 bg-ink-800/20 border-r border-line/50">
                    <div className="w-8 h-8 rounded-lg bg-ink-700 border border-line flex items-center justify-center">
                      <span className="text-xs font-bold text-cream-dim">{m.rank}</span>
                    </div>
                  </div>
                  <div className="flex-1 flex items-center px-3 gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0"><IconShield className="w-4 h-4 text-emerald-400" /></div>
                    <div className="min-w-0 flex-1">
                      <span className="font-bold text-cream text-sm block truncate">{m.name}</span>
                      <span className="text-[11px] text-cream-dim">{m.role}</span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0 min-w-[5rem]">
                      {m.isOnline ? (
                        <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      ) : (
                        <svg className="w-4 h-4 text-cream-dim/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                      )}
                      <span className={`text-xs font-semibold ${m.isOnline ? "text-emerald-400" : "text-cream-dim/50"}`}>{m.isOnline ? "Cevrimici" : "Cevrimdisi"}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {tab === "kings" && (
          <div className="space-y-3">
            {kings.map((k) => (
              <div key={k.rank} className={`relative overflow-hidden rounded-xl border ${rowHover} ${k.nation === "karus" ? "bg-gradient-to-r from-rose-500/10 via-rose-500/5 to-transparent border-rose-500/20 hover:border-rose-500/40 hover:from-rose-500/15" : "bg-gradient-to-r from-sky-500/10 via-sky-500/5 to-transparent border-sky-500/20 hover:border-sky-500/40 hover:from-sky-500/15"}`}>
                <div className="flex items-stretch">
                  <div className="flex items-center justify-center px-3 py-3 bg-ink-800/20 border-r border-line/50">
                    <div className="w-8 h-8 rounded-lg bg-ink-700 border border-line flex items-center justify-center"><span className="text-xs font-bold text-cream-dim">{k.rank}</span></div>
                  </div>
                  <div className="flex-1 flex items-center px-3 gap-3">
                    <div className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 ${k.nation === "karus" ? "bg-rose-500/20 border-rose-500/30" : "bg-sky-500/20 border-sky-500/30"}`}>
                      <IconCrown className={`w-4 h-4 ${k.nation === "karus" ? "text-rose-400" : "text-sky-400"}`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className={`font-bold text-sm block truncate ${k.nation === "karus" ? "text-rose-400" : "text-sky-400"}`}>{k.name}</span>
                      <span className="text-[11px] text-cream-dim">{k.title}</span>
                    </div>
                    <div className="text-center min-w-[5rem] shrink-0">
                      <div className="text-[10px] text-cream-dim uppercase tracking-wider font-medium">Tahta</div>
                      <div className="text-sm font-black bg-gradient-to-r from-gold-400 to-gold-500 bg-clip-text text-transparent">{new Date(k.since).toLocaleDateString("tr-TR")}</div>
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

/* ============================================================
   STAFF STATUS — V4: Glowing Ring
   Avatar etrafinda glow ring efekti
   ============================================================ */

export function StaffStatusV4() {
  const [tab, setTab] = useState("staff")
  const initials = (name: string) => name.replace(/[^A-Za-z]/g, "").slice(0, 2).toUpperCase()
  return (
    <div className="card rounded-xl overflow-hidden">
      <div className="section-header">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400"><IconCrown className="w-4 h-4" /></div>
          <div><h3 className="font-semibold text-cream">Yonetim</h3><p className="text-xs text-cream-dim">Yoneticiler ve krallar</p></div>
        </div>
        <Link href="/yonetim" className="text-xs text-gold-400 hover:text-gold-300 flex items-center gap-1">Tumunu Gor <IconChevronRight className="w-3 h-3" /></Link>
      </div>
      <Tabs tabs={staffTabs} active={tab} onChange={setTab} />
      <div className="p-4">
        {tab === "staff" && (
          <div className="space-y-3">
            {staff.map((m) => (
              <div key={m.rank} className={`relative overflow-hidden rounded-xl bg-ink-800/30 border border-line hover:border-gold-500/30 hover:bg-ink-800/50 ${rowHover}`}>
                <div className="flex items-stretch">
                  <div className="flex items-center justify-center px-3 py-3 bg-ink-800/20 border-r border-line/50">
                    <div className="w-8 h-8 rounded-lg bg-ink-700 border border-line flex items-center justify-center">
                      <span className="text-xs font-bold text-cream-dim">{m.rank}</span>
                    </div>
                  </div>
                  <div className="flex-1 flex items-center px-3 gap-3">
                    <div className={`relative w-9 h-9 rounded-full flex items-center justify-center border-2 shrink-0 ${m.isOnline ? "border-emerald-400/60 shadow-[0_0_12px_rgba(74,222,128,0.25)]" : "border-ink-600"}`}>
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-ink-600 to-ink-800 flex items-center justify-center">
                        <span className="text-[10px] font-black text-cream-dim">{initials(m.name)}</span>
                      </div>
                      {m.isOnline && <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-ink-800 dot-pulse" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="font-bold text-cream text-sm block truncate">{m.name}</span>
                      <span className="text-[11px] text-cream-dim">{m.role}</span>
                    </div>
                    <span className={`text-xs font-semibold shrink-0 ${m.isOnline ? "text-emerald-400" : "text-cream-dim/50"}`}>{m.isOnline ? "Cevrimici" : "Cevrimdisi"}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {tab === "kings" && (
          <div className="space-y-3">
            {kings.map((k) => (
              <div key={k.rank} className={`relative overflow-hidden rounded-xl border ${rowHover} ${k.nation === "karus" ? "bg-gradient-to-r from-rose-500/10 via-rose-500/5 to-transparent border-rose-500/20 hover:border-rose-500/40 hover:from-rose-500/15" : "bg-gradient-to-r from-sky-500/10 via-sky-500/5 to-transparent border-sky-500/20 hover:border-sky-500/40 hover:from-sky-500/15"}`}>
                <div className="flex items-stretch">
                  <div className="flex items-center justify-center px-3 py-3 bg-ink-800/20 border-r border-line/50">
                    <div className="w-8 h-8 rounded-lg bg-ink-700 border border-line flex items-center justify-center"><span className="text-xs font-bold text-cream-dim">{k.rank}</span></div>
                  </div>
                  <div className="flex-1 flex items-center px-3 gap-3">
                    <div className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 ${k.nation === "karus" ? "bg-rose-500/20 border-rose-500/30" : "bg-sky-500/20 border-sky-500/30"}`}>
                      <IconCrown className={`w-4 h-4 ${k.nation === "karus" ? "text-rose-400" : "text-sky-400"}`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className={`font-bold text-sm block truncate ${k.nation === "karus" ? "text-rose-400" : "text-sky-400"}`}>{k.name}</span>
                      <span className="text-[11px] text-cream-dim">{k.title}</span>
                    </div>
                    <div className="text-center min-w-[5rem] shrink-0">
                      <div className="text-[10px] text-cream-dim uppercase tracking-wider font-medium">Tahta</div>
                      <div className="text-sm font-black bg-gradient-to-r from-gold-400 to-gold-500 bg-clip-text text-transparent">{new Date(k.since).toLocaleDateString("tr-TR")}</div>
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

/* ============================================================
   STAFF STATUS — V5: Mini Status Bar
   Ustte mini segment bar + alt detay
   ============================================================ */

export function StaffStatusV5() {
  const [tab, setTab] = useState("staff")
  const onlineCount = staff.filter(m => m.isOnline).length
  return (
    <div className="card rounded-xl overflow-hidden">
      <div className="section-header">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400"><IconCrown className="w-4 h-4" /></div>
          <div><h3 className="font-semibold text-cream">Yonetim</h3><p className="text-xs text-cream-dim">Yoneticiler ve krallar</p></div>
        </div>
        <Link href="/yonetim" className="text-xs text-gold-400 hover:text-gold-300 flex items-center gap-1">Tumunu Gor <IconChevronRight className="w-3 h-3" /></Link>
      </div>
      <Tabs tabs={staffTabs} active={tab} onChange={setTab} />
      <div className="p-4">
        {tab === "staff" && (
          <>
            <div className="mb-3 px-1">
              <div className="flex items-center justify-between text-[10px] text-cream-dim mb-1">
                <span>Cevrimici</span>
                <span>{onlineCount} / {staff.length}</span>
              </div>
              <div className="h-1.5 bg-ink-700 rounded-full overflow-hidden flex">
                {staff.map((m, i) => (
                  <div key={i} className={`flex-1 first:rounded-l-full last:rounded-r-full ${m.isOnline ? "bg-emerald-500/70" : "bg-ink-600"} ${i < staff.length - 1 ? "mr-px" : ""}`} />
                ))}
              </div>
            </div>
            <div className="space-y-3">
              {staff.map((m) => (
                <div key={m.rank} className={`relative overflow-hidden rounded-xl bg-ink-800/30 border border-line hover:border-gold-500/30 hover:bg-ink-800/50 ${rowHover}`}>
                  <div className="flex items-stretch">
                    <div className="flex items-center justify-center px-3 py-3 bg-ink-800/20 border-r border-line/50">
                      <div className="w-8 h-8 rounded-lg bg-ink-700 border border-line flex items-center justify-center">
                        <span className="text-xs font-bold text-cream-dim">{m.rank}</span>
                      </div>
                    </div>
                    <div className="flex-1 flex items-center px-3 gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0"><IconShield className="w-4 h-4 text-emerald-400" /></div>
                      <div className="min-w-0 flex-1">
                        <span className="font-bold text-cream text-sm block truncate">{m.name}</span>
                        <span className="text-[11px] text-cream-dim">{m.role}</span>
                      </div>
                      <div className="shrink-0 min-w-[5rem]">
                        <div className={`text-[10px] font-bold px-2 py-0.5 rounded text-center ${m.isOnline ? "bg-emerald-500/10 text-emerald-400" : "bg-ink-700/50 text-cream-dim/50"}`}>
                          {m.isOnline ? "AKTIF" : "PASIF"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        {tab === "kings" && (
          <div className="space-y-3">
            {kings.map((k) => (
              <div key={k.rank} className={`relative overflow-hidden rounded-xl border ${rowHover} ${k.nation === "karus" ? "bg-gradient-to-r from-rose-500/10 via-rose-500/5 to-transparent border-rose-500/20 hover:border-rose-500/40 hover:from-rose-500/15" : "bg-gradient-to-r from-sky-500/10 via-sky-500/5 to-transparent border-sky-500/20 hover:border-sky-500/40 hover:from-sky-500/15"}`}>
                <div className="flex items-stretch">
                  <div className="flex items-center justify-center px-3 py-3 bg-ink-800/20 border-r border-line/50">
                    <div className="w-8 h-8 rounded-lg bg-ink-700 border border-line flex items-center justify-center"><span className="text-xs font-bold text-cream-dim">{k.rank}</span></div>
                  </div>
                  <div className="flex-1 flex items-center px-3 gap-3">
                    <div className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 ${k.nation === "karus" ? "bg-rose-500/20 border-rose-500/30" : "bg-sky-500/20 border-sky-500/30"}`}>
                      <IconCrown className={`w-4 h-4 ${k.nation === "karus" ? "text-rose-400" : "text-sky-400"}`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className={`font-bold text-sm block truncate ${k.nation === "karus" ? "text-rose-400" : "text-sky-400"}`}>{k.name}</span>
                      <span className="text-[11px] text-cream-dim">{k.title}</span>
                    </div>
                    <div className="text-center min-w-[5rem] shrink-0">
                      <div className="text-[10px] text-cream-dim uppercase tracking-wider font-medium">Tahta</div>
                      <div className="text-sm font-black bg-gradient-to-r from-gold-400 to-gold-500 bg-clip-text text-transparent">{new Date(k.since).toLocaleDateString("tr-TR")}</div>
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

/* ============================================================
   SHOWCASE PAGE
   ============================================================ */

const Label = ({ tag, title, desc }: { tag: string; title: string; desc: string }) => (
  <div className="mb-3">
    <div className="flex items-center gap-2 mb-1">
      <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-ink-700 border border-line text-cream-dim">{tag}</span>
      <span className="font-bold text-cream text-sm">{title}</span>
    </div>
    <p className="text-[11px] text-cream-dim/70 leading-relaxed">{desc}</p>
  </div>
)

export function SWEShowcase() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-16">
      {/* Rankings */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded-lg bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400"><IconTrophy className="w-4 h-4" /></div>
          <div>
            <h2 className="text-lg font-black text-cream">RankingsSection — En Iyiler</h2>
            <p className="text-xs text-cream-dim">10 varyasyon + orijinal</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Label tag="ANA" title="Orijinal" desc="Mevcut production versiyonu." />
            <RankingsAna />
          </div>
          <div>
            <Label tag="V1" title="Compact Cards" desc="Kompakt kartlar, az padding, tek satir." />
            <RankingsV1 />
          </div>
          <div>
            <Label tag="V2" title="Leaderboard Ladder" desc="Top 3 ozel vurgulu, 4-5 kompakt." />
            <RankingsV2 />
          </div>
          <div>
            <Label tag="V3" title="Table Pro" desc="Kolon basliklari, alternating satirlar, dashboard." />
            <RankingsV3 />
          </div>
          <div>
            <Label tag="V4" title="Animated Rank" desc="Rank badge hover bounce animasyonu." />
            <RankingsV4 />
          </div>
          <div>
            <Label tag="V5" title="Inline Toggle Tabs" desc="Icerik icinde inline pill switcher." />
            <RankingsV5 />
          </div>
          <div>
            <Label tag="V6" title="Label Badges" desc="Rank, nation inline badge olarak isim yani." />
            <RankingsV6 />
          </div>
          <div>
            <Label tag="V7" title="Stats Header" desc="Header altinda mini istatistik bar." />
            <RankingsV7 />
          </div>
          <div>
            <Label tag="V8" title="Progress NP Bar" desc="Her satirda NP'ye gore ilerleme cubugu." />
            <RankingsV8 />
          </div>
          <div>
            <Label tag="V9" title="Two Column Grid" desc="2 sutunlu kart gridi." />
            <RankingsV9 />
          </div>
          <div>
            <Label tag="V10" title="Medal Cards" desc="Her satir medal/rozetli kart." />
            <RankingsV10 />
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-line to-transparent" />

      {/* Staff */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded-lg bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400"><IconCrown className="w-4 h-4" /></div>
          <div>
            <h2 className="text-lg font-black text-cream">StaffKingsSection — Yonetim</h2>
            <p className="text-xs text-cream-dim">5 status varyasyon + orijinal</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Label tag="ANA" title="Orijinal" desc="Mevcut production versiyonu." />
            <StaffAna />
          </div>
          <div>
            <Label tag="S1" title="Dot Pulse" desc="Klasik dot + pulse animasyonu." />
            <StaffStatusV1 />
          </div>
          <div>
            <Label tag="S2" title="Color Pill" desc="Renkli pill badge status gosterimi." />
            <StaffStatusV2 />
          </div>
          <div>
            <Label tag="S3" title="Icon + Text" desc="Check/X ikonu + durum metni." />
            <StaffStatusV3 />
          </div>
          <div>
            <Label tag="S4" title="Glowing Ring" desc="Avatar etrafinda glow ring efekti." />
            <StaffStatusV4 />
          </div>
          <div>
            <Label tag="S5" title="Mini Status Bar" desc="Ustte segment bar + alt detay." />
            <StaffStatusV5 />
          </div>
        </div>
      </section>
    </div>
  )
}
