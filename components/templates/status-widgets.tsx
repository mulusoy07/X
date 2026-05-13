"use client"

import { useState } from "react"
import {
  IconServer,
  IconChevronDown,
  IconCircleCheck,
  IconTool,
  IconDownload,
  IconX,
  IconCheck,
  IconWifi,
  IconBolt,
  IconUsers,
  IconMapPin,
  IconChartBar,
} from "@tabler/icons-react"

/* ───────────────────────── DATA ───────────────────────── */

interface ServerData {
  id: string
  name: string
  short: string
  region: string
  xp: string
  desc: string
  status: "online" | "maintenance" | "offline"
  online: number
  cap: number
  ping: number
}

const servers: ServerData[] = [
  { id: "s1", name: "Agartha", short: "Oracle", region: "EU", xp: "x3", desc: "Klasik PvP · v2100 · 64-bit", status: "online", online: 1842, cap: 3000, ping: 32 },
  { id: "s2", name: "Karus", short: "Karus", region: "EU", xp: "x1", desc: "Yuksek populasyon · Dusuk drop", status: "online", online: 2310, cap: 3000, ping: 45 },
  { id: "s3", name: "Aegis", short: "Aegis", region: "NA", xp: "x2", desc: "Yeni baslangic sunucusu", status: "maintenance", online: 0, cap: 3000, ping: 0 },
  { id: "s4", name: "Ronark", short: "Ronark", region: "EU", xp: "x1", desc: "Hardcore PvE · PK kapali", status: "offline", online: 0, cap: 3000, ping: 0 },
]

const statusMap = {
  online: { dot: "bg-emerald-400", ring: "shadow-[0_0_0_3px_rgba(52,211,153,0.18)]", text: "text-emerald-400", label: "Online" },
  maintenance: { dot: "bg-amber-400", ring: "shadow-[0_0_0_3px_rgba(251,191,36,0.18)]", text: "text-amber-400", label: "Bakim" },
  offline: { dot: "bg-rose-400", ring: "shadow-[0_0_0_3px_rgba(244,63,94,0.18)]", text: "text-rose-400", label: "Offline" },
} as const

const pingTone = (p: number) =>
  p === 0 ? "text-cream-dim/50" : p < 60 ? "text-emerald-400" : p < 120 ? "text-amber-400" : "text-rose-400"

/* ───────────────────────── SHARED COMPONENTS ───────────────────────── */

function CapBar({ pct }: { pct: number }) {
  const tone = pct > 80 ? "text-rose-400" : pct > 50 ? "text-amber-400" : "text-emerald-400"
  const bg = pct > 80 ? "from-rose-500 to-rose-400" : pct > 50 ? "from-amber-500 to-amber-400" : "from-gold-500 to-gold-400"
  const segs = 20
  const filled = Math.round((pct / 100) * segs)
  return (
    <div className="rounded-xl border border-line bg-white/[0.02] p-3">
      <div className="flex items-center gap-2">
        <span className="text-[10px] uppercase tracking-wider text-cream-dim">Doluluk</span>
        <div className="flex gap-[2px] flex-1">
          {Array.from({ length: segs }).map((_, i) => (
            <span key={i} className={`h-2 flex-1 rounded-[1px] ${i < filled ? `bg-gradient-to-r ${bg}` : "bg-cream-dim/15"}`} />
          ))}
        </div>
        <span className={`text-xs font-bold tabular-nums ${tone}`}>%{pct}</span>
      </div>
    </div>
  )
}

function DownloadBtn() {
  return (
    <button className="w-full h-11 rounded-xl bg-gradient-to-b from-gold-400 to-gold-500 text-ink-950 font-bold text-sm flex items-center justify-center gap-2 hover:brightness-110 transition">
      <IconDownload className="h-4 w-4" />
      Oyunu Indir
    </button>
  )
}

/* ───────── HERO META SELECT (V1) ───────── */
function HeroMetaSelect({ s, open, onToggle }: { s: ServerData; open: boolean; onToggle: () => void }) {
  const st = statusMap[s.status]
  const pTone = pingTone(s.ping)

  return (
    <button type="button" onClick={onToggle} className="group relative w-full text-left">
      <div className="flex items-stretch gap-0 rounded-2xl border border-line hover:border-gold-500/30 bg-gradient-to-b from-white/[0.04] to-white/[0.01] backdrop-blur-md overflow-hidden transition-colors">
        <div className="flex items-center gap-3 pl-4 pr-5 py-3 min-w-0 flex-1">
          <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gold-400/25 to-gold-500/5 border border-gold-500/30">
            <IconServer className="h-4 w-4 text-gold-300" stroke={2.2} />
          </div>
          <div className="min-w-0">
            <h3 className="text-cream font-bold text-lg leading-none truncate">{s.name}</h3>
            <p className="mt-1.5 text-[11px] text-cream-dim/80 truncate">{s.desc}</p>
          </div>
        </div>
        <div className="w-px bg-gradient-to-b from-transparent via-line to-transparent" />
        <div className="flex items-center gap-2.5 px-4 py-3">
          <span className={`relative inline-flex h-2 w-2 rounded-full ${st.dot} ${st.ring}`}>
            {s.status === "online" && (
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-60" />
            )}
          </span>
          <span className={`text-xs font-semibold ${st.text}`}>{st.label}</span>
        </div>
        <div className="w-px bg-gradient-to-b from-transparent via-line to-transparent" />
        <div className="flex items-center gap-2 px-4 py-3">
          <IconWifi className={`h-3.5 w-3.5 ${pTone}`} stroke={2.2} />
          <div className="flex items-baseline gap-1 tabular-nums">
            <span className={`text-sm font-bold ${pTone}`}>{s.ping === 0 ? "—" : s.ping}</span>
            <span className="text-[10px] font-medium text-cream-dim/60">ms</span>
          </div>
        </div>
        <div className="w-px bg-gradient-to-b from-transparent via-line to-transparent" />
        <div className="flex items-center px-3 py-3">
          <IconChevronDown className={`h-4 w-4 text-cream-dim group-hover:text-gold-300 transition-transform ${open ? "rotate-180" : ""}`} />
        </div>
      </div>
    </button>
  )
}

/* ───────────────────────── V1 — ORIGINAL ───────────────────────── */

export function ServerStatusV1() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedServer, setSelectedServer] = useState("s1")
  const [tempSelectedServer, setTempSelectedServer] = useState("s1")
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const activeServer = servers.find((s) => s.id === selectedServer) || servers[0]
  const capacityPercent = Math.round((activeServer.online / activeServer.cap) * 100)

  const confirmServer = () => { setSelectedServer(tempSelectedServer); setModalOpen(false) }

  return (
    <>
      <div className="rounded-2xl border border-line bg-gradient-to-b from-ink-800/80 to-ink-900/90 p-4 space-y-4 max-w-md">
        <div className="relative">
          <HeroMetaSelect s={activeServer} open={dropdownOpen} onToggle={() => setDropdownOpen(!dropdownOpen)} />

          {dropdownOpen && (
            <div className="absolute z-20 mt-2 w-full rounded-2xl border border-line bg-ink-900/95 backdrop-blur shadow-2xl overflow-hidden p-1.5 space-y-1.5">
              {servers.filter((s) => s.status !== "offline").map((server) => {
                const st = statusMap[server.status]
                const pTone = pingTone(server.ping)
                const isActive = selectedServer === server.id
                return (
                  <button
                    key={server.id}
                    onClick={() => { setSelectedServer(server.id); setDropdownOpen(false) }}
                    className={`w-full flex items-stretch gap-0 rounded-xl border overflow-hidden text-left transition-colors ${
                      isActive ? "border-gold-400/60 bg-gold-500/[0.06]" : "border-line hover:border-gold-500/30 bg-white/[0.02]"
                    }`}
                  >
                    <div className="flex items-center gap-3 pl-3 pr-4 py-2.5 min-w-0 flex-1">
                      <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-gold-400/25 to-gold-500/5 border border-gold-500/30">
                        <IconServer className="h-3.5 w-3.5 text-gold-300" stroke={2.2} />
                      </div>
                      <div className="min-w-0">
                        <span className="text-cream font-semibold text-sm truncate block">{server.name}</span>
                        <p className="mt-0.5 text-[11px] text-cream-dim/80 truncate">{server.desc}</p>
                      </div>
                    </div>
                    <div className="w-px bg-gradient-to-b from-transparent via-line to-transparent" />
                    <div className="flex items-center gap-2 px-3 py-2.5">
                      <span className={`h-2 w-2 rounded-full ${st.dot}`} />
                      <span className={`text-[11px] font-semibold ${st.text}`}>{st.label}</span>
                    </div>
                    <div className="w-px bg-gradient-to-b from-transparent via-line to-transparent" />
                    <div className="flex items-center gap-1.5 px-3 py-2.5 tabular-nums">
                      <IconWifi className={`h-3.5 w-3.5 ${pTone}`} stroke={2.2} />
                      <span className={`text-xs font-bold ${pTone}`}>{server.ping === 0 ? "—" : server.ping}</span>
                      <span className="text-[10px] text-cream-dim/60">ms</span>
                    </div>
                    <div className="flex items-center pr-3">
                      {isActive && <IconCheck className="h-4 w-4 text-gold-400" />}
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        <CapBar pct={capacityPercent} />
        <DownloadBtn />
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={(e) => e.target === e.currentTarget && setModalOpen(false)}>
          <div className="w-full max-w-lg rounded-2xl border border-line bg-ink-900 p-5 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center">
                  <IconServer className="h-5 w-5 text-gold-400" />
                </div>
                <div>
                  <h3 className="text-cream font-bold">Sunucu Sec</h3>
                  <p className="text-xs text-cream-dim">Oynamak istedigin sunucuyu sec</p>
                </div>
              </div>
              <button onClick={() => setModalOpen(false)} className="w-9 h-9 rounded-md hover:bg-ink-700 text-cream-dim hover:text-gold-300 flex items-center justify-center">
                <IconX className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-2 max-h-[60vh] overflow-auto">
              {servers.map((server) => {
                const isSelected = tempSelectedServer === server.id
                const st = statusMap[server.status]
                return (
                  <button
                    key={server.id}
                    onClick={() => setTempSelectedServer(server.id)}
                    className={`w-full grid grid-cols-[40px_1fr_auto] gap-3 p-3 border rounded-xl transition-all items-center text-left ${
                      isSelected ? "border-gold-400 bg-gold-500/[0.06]" : "border-line bg-white/[0.01] hover:border-gold-500/40"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center">
                      <span className="text-[10px] font-black text-gold-300">{server.xp.toUpperCase()}</span>
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-cream font-semibold text-sm">{server.name}</span>
                        {server.status === "online" && <IconCircleCheck className="h-3.5 w-3.5 text-emerald-400" />}
                        {server.status === "maintenance" && <IconTool className="h-3.5 w-3.5 text-amber-400" />}
                      </div>
                      <p className="text-[11px] text-cream-dim truncate">{server.desc}</p>
                    </div>
                    <div className="text-right">
                      {server.ping > 0 && (
                        <div className="flex items-center gap-1 tabular-nums">
                          <span className={`text-sm font-bold ${st.text}`}>{server.ping}</span>
                          <span className="text-[10px] text-cream-dim">ms</span>
                        </div>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>

            <div className="flex items-center justify-between gap-3 pt-2 border-t border-line">
              <p className="text-[11px] text-cream-dim">Ipucu: bakim altindaki sunucuya giris yapamazsin.</p>
              <div className="flex gap-2">
                <button onClick={() => setModalOpen(false)} className="h-10 px-4 rounded-md text-sm text-cream border border-line hover:bg-ink-700">
                  Vazgec
                </button>
                <button onClick={confirmServer} className="h-10 px-4 rounded-md text-sm font-bold bg-gradient-to-b from-gold-400 to-gold-500 text-ink-950">
                  Secimi Onayla
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

/* ───────────────────────── V4 — CARD STACKED ───────────────────────── */

export function ServerStatusV4Stacked() {
  const [id, setId] = useState("s1")
  const [open, setOpen] = useState(false)
  const active = servers.find(s => s.id === id) || servers[0]
  const cap = Math.round((active.online / active.cap) * 100)
  const st = statusMap[active.status]

  return (
    <div className="rounded-2xl border border-line bg-gradient-to-br from-ink-800/90 via-ink-900/90 to-ink-950 p-4 space-y-3 max-w-md">
      <div className="relative">
        <button onClick={() => setOpen(!open)} className="w-full text-left rounded-xl border border-line hover:border-gold-500/40 bg-white/[0.02] p-3 transition-colors group">
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-gold-400/30 to-gold-600/10 border border-gold-500/30 flex items-center justify-center shrink-0">
              <IconServer className="h-5 w-5 text-gold-300" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-cream font-bold text-base truncate">{active.name}</h3>
                <IconChevronDown className={`h-4 w-4 text-cream-dim transition-transform ${open ? "rotate-180" : ""}`} />
              </div>
              <p className="text-[11px] text-cream-dim/80 truncate mt-0.5">{active.desc}</p>
              <div className="flex items-center gap-3 mt-2 pt-2 border-t border-line/60">
                <div className="flex items-center gap-1.5">
                  <span className={`h-2 w-2 rounded-full ${st.dot} animate-pulse`} />
                  <span className={`text-[11px] font-semibold ${st.text}`}>{st.label}</span>
                </div>
                <div className="ml-auto flex items-center gap-1 tabular-nums">
                  <IconBolt className={`h-3.5 w-3.5 ${pingTone(active.ping)}`} />
                  <span className={`text-sm font-bold ${pingTone(active.ping)}`}>{active.ping || "—"}</span>
                  <span className="text-[10px] text-cream-dim">ms</span>
                </div>
              </div>
            </div>
          </div>
        </button>
        {open && (
          <div className="absolute z-20 mt-2 w-full rounded-xl border border-line bg-ink-900/95 backdrop-blur p-2 space-y-1.5 shadow-2xl">
            {servers.filter(s => s.status !== "offline").map(s => (
              <button
                key={s.id}
                onClick={() => { setId(s.id); setOpen(false) }}
                className={`w-full flex items-center gap-2.5 p-2 rounded-lg text-left ${id === s.id ? "bg-gold-500/10 border border-gold-400/40" : "border border-transparent hover:bg-white/[0.03]"}`}
              >
                <div className="h-8 w-8 rounded-lg bg-gold-500/15 border border-gold-500/30 flex items-center justify-center">
                  <IconServer className="h-4 w-4 text-gold-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-cream text-sm font-semibold truncate">{s.name}</div>
                  <div className="text-[10px] text-cream-dim/70 truncate">{s.desc}</div>
                </div>
                <span className={`h-2 w-2 rounded-full ${statusMap[s.status].dot}`} />
                <span className={`text-xs font-bold tabular-nums ${pingTone(s.ping)}`}>{s.ping || "—"}ms</span>
                {id === s.id && <IconCheck className="h-3.5 w-3.5 text-gold-400" />}
              </button>
            ))}
          </div>
        )}
      </div>
      <CapBar pct={cap} />
      <DownloadBtn />
    </div>
  )
}

/* ───────────────────────── V2 — GRID TILES ───────────────────────── */

export function ServerStatusV2Grid() {
  const [selectedId, setSelectedId] = useState("s1")
  const activeServer = servers.find(s => s.id === selectedId) || servers[0]
  const capacityPercent = Math.round((activeServer.online / activeServer.cap) * 100)

  return (
    <div className="rounded-2xl border border-line bg-gradient-to-b from-ink-800/80 to-ink-900/90 p-4 space-y-4 max-w-md">
      {/* Server Grid */}
      <div className="grid grid-cols-2 gap-2">
        {servers.map((server) => {
          const st = statusMap[server.status]
          const isSelected = selectedId === server.id
          const isDisabled = server.status === "offline"

          return (
            <button
              key={server.id}
              onClick={() => !isDisabled && setSelectedId(server.id)}
              disabled={isDisabled}
              className={`relative p-3 rounded-xl border text-left transition-all ${
                isDisabled
                  ? "border-line/50 bg-ink-900/50 opacity-50 cursor-not-allowed"
                  : isSelected
                  ? "border-gold-400/60 bg-gold-500/[0.08] shadow-[0_0_20px_rgba(234,179,8,0.1)]"
                  : "border-line hover:border-gold-500/30 bg-white/[0.02]"
              }`}
            >
              {/* Status indicator top-right */}
              <div className="absolute top-2 right-2">
                <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${st.dot}`}>
                  {server.status === "online" && (
                    <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-50" />
                  )}
                </span>
              </div>

              {/* XP Badge */}
              <div className="inline-flex items-center justify-center h-7 px-2 rounded-lg bg-gradient-to-br from-gold-400/20 to-gold-600/5 border border-gold-500/30 mb-2">
                <span className="text-[10px] font-black text-gold-300 tracking-wide">{server.xp.toUpperCase()}</span>
              </div>

              {/* Server Name */}
              <h4 className="text-cream font-bold text-sm">{server.name}</h4>

              {/* Region & Ping Row */}
              <div className="flex items-center gap-2 mt-1.5">
                <div className="flex items-center gap-1">
                  <IconMapPin className="h-3 w-3 text-cream-dim/60" />
                  <span className="text-[10px] text-cream-dim">{server.region}</span>
                </div>
                {server.ping > 0 && (
                  <div className="flex items-center gap-1 ml-auto">
                    <span className={`text-[10px] font-bold tabular-nums ${pingTone(server.ping)}`}>{server.ping}ms</span>
                  </div>
                )}
              </div>

              {/* Selected checkmark */}
              {isSelected && (
                <div className="absolute bottom-2 right-2">
                  <IconCheck className="h-4 w-4 text-gold-400" />
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Active Server Stats */}
      <div className="rounded-xl border border-line bg-white/[0.02] p-3 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-wider text-cream-dim">Secili Sunucu</span>
          <span className="text-cream font-semibold text-sm">{activeServer.name}</span>
        </div>
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-cream-dim flex items-center gap-1.5">
            <IconUsers className="h-3.5 w-3.5" />
            Oyuncu
          </span>
          <span className="text-cream font-medium tabular-nums">{activeServer.online.toLocaleString()} / {activeServer.cap.toLocaleString()}</span>
        </div>
      </div>

      <CapBar pct={capacityPercent} />
      <DownloadBtn />
    </div>
  )
}

/* ───────────────────────── V3 — MINIMAL COMPACT ───────────────────────── */

export function ServerStatusV3Minimal() {
  const [selectedId, setSelectedId] = useState("s1")
  const [expanded, setExpanded] = useState(false)
  const activeServer = servers.find(s => s.id === selectedId) || servers[0]
  const capacityPercent = Math.round((activeServer.online / activeServer.cap) * 100)
  const st = statusMap[activeServer.status]

  return (
    <div className="rounded-2xl border border-line bg-gradient-to-b from-ink-800/80 to-ink-900/90 overflow-hidden max-w-sm">
      {/* Compact Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 p-3 hover:bg-white/[0.02] transition-colors"
      >
        <div className="relative">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-gold-400/25 to-gold-500/5 border border-gold-500/30 flex items-center justify-center">
            <IconServer className="h-5 w-5 text-gold-300" />
          </div>
          <span className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-ink-900 ${st.dot}`} />
        </div>

        <div className="flex-1 min-w-0 text-left">
          <div className="flex items-center gap-2">
            <span className="text-cream font-bold text-sm">{activeServer.name}</span>
            <span className="text-[10px] text-cream-dim/60 px-1.5 py-0.5 rounded bg-ink-700/50">{activeServer.region}</span>
          </div>
          <div className="flex items-center gap-3 mt-0.5">
            <span className={`text-[11px] font-medium ${st.text}`}>{st.label}</span>
            <span className="text-[11px] text-cream-dim tabular-nums">{activeServer.ping}ms</span>
          </div>
        </div>

        <IconChevronDown className={`h-4 w-4 text-cream-dim transition-transform ${expanded ? "rotate-180" : ""}`} />
      </button>

      {/* Expandable Server List */}
      {expanded && (
        <div className="border-t border-line">
          {servers.filter(s => s.status !== "offline").map((server) => {
            const serverSt = statusMap[server.status]
            const isSelected = selectedId === server.id

            return (
              <button
                key={server.id}
                onClick={() => { setSelectedId(server.id); setExpanded(false) }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors ${
                  isSelected ? "bg-gold-500/[0.06]" : "hover:bg-white/[0.02]"
                }`}
              >
                <span className={`h-2 w-2 rounded-full ${serverSt.dot}`} />
                <span className={`flex-1 text-sm ${isSelected ? "text-cream font-semibold" : "text-cream-dim"}`}>
                  {server.name}
                </span>
                <span className="text-[10px] text-cream-dim/60">{server.region}</span>
                <span className={`text-[11px] font-medium tabular-nums ${pingTone(server.ping)}`}>
                  {server.ping}ms
                </span>
                {isSelected && <IconCheck className="h-3.5 w-3.5 text-gold-400" />}
              </button>
            )
          })}
        </div>
      )}

      {/* Stats & Download */}
      <div className="p-3 pt-0 space-y-3">
        {!expanded && (
          <div className="flex items-center gap-4 py-2 border-t border-line">
            <div className="flex items-center gap-1.5">
              <IconUsers className="h-3.5 w-3.5 text-cream-dim/60" />
              <span className="text-[11px] text-cream-dim">{activeServer.online.toLocaleString()}</span>
            </div>
            <div className="flex-1 h-1.5 rounded-full bg-ink-700/50 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-gold-500 to-gold-400 transition-all"
                style={{ width: `${capacityPercent}%` }}
              />
            </div>
            <span className="text-[11px] text-cream-dim tabular-nums">%{capacityPercent}</span>
          </div>
        )}
        <DownloadBtn />
      </div>
    </div>
  )
}

/* ───────────────────────── V5 — DASHBOARD STATS ───────────────────────── */

export function ServerStatusV5Dashboard() {
  const [selectedId, setSelectedId] = useState("s1")
  const activeServer = servers.find(s => s.id === selectedId) || servers[0]
  const st = statusMap[activeServer.status]

  const onlineServers = servers.filter(s => s.status === "online").length
  const totalPlayers = servers.reduce((acc, s) => acc + s.online, 0)

  return (
    <div className="rounded-2xl border border-line bg-gradient-to-b from-ink-800/80 to-ink-900/90 p-4 space-y-4 max-w-md">
      {/* Overview Stats Row */}
      <div className="grid grid-cols-3 gap-2">
        <div className="rounded-xl border border-line bg-white/[0.02] p-3 text-center">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <IconServer className="h-3.5 w-3.5 text-emerald-400" />
            <span className="text-[10px] uppercase tracking-wider text-cream-dim">Aktif</span>
          </div>
          <span className="text-lg font-bold text-emerald-400">{onlineServers}</span>
          <span className="text-[10px] text-cream-dim/60">/{servers.length}</span>
        </div>

        <div className="rounded-xl border border-line bg-white/[0.02] p-3 text-center">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <IconUsers className="h-3.5 w-3.5 text-gold-400" />
            <span className="text-[10px] uppercase tracking-wider text-cream-dim">Toplam</span>
          </div>
          <span className="text-lg font-bold text-cream">{totalPlayers.toLocaleString()}</span>
        </div>

        <div className="rounded-xl border border-line bg-white/[0.02] p-3 text-center">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <IconChartBar className="h-3.5 w-3.5 text-sky-400" />
            <span className="text-[10px] uppercase tracking-wider text-cream-dim">Ort. Ping</span>
          </div>
          <span className="text-lg font-bold text-sky-400">
            {Math.round(servers.filter(s => s.ping > 0).reduce((a, s) => a + s.ping, 0) / servers.filter(s => s.ping > 0).length)}
          </span>
          <span className="text-[10px] text-cream-dim/60">ms</span>
        </div>
      </div>

      {/* Server List */}
      <div className="space-y-1.5">
        <span className="text-[10px] uppercase tracking-wider text-cream-dim px-1">Sunucular</span>
        {servers.map((server) => {
          const serverSt = statusMap[server.status]
          const isSelected = selectedId === server.id
          const serverCap = Math.round((server.online / server.cap) * 100)
          const isDisabled = server.status === "offline"

          return (
            <button
              key={server.id}
              onClick={() => !isDisabled && setSelectedId(server.id)}
              disabled={isDisabled}
              className={`w-full flex items-center gap-3 p-2.5 rounded-xl border text-left transition-all ${
                isDisabled
                  ? "border-line/50 bg-ink-900/30 opacity-40 cursor-not-allowed"
                  : isSelected
                  ? "border-gold-400/50 bg-gold-500/[0.06]"
                  : "border-line hover:border-gold-500/30 bg-white/[0.02]"
              }`}
            >
              {/* Status Dot */}
              <span className={`relative h-2.5 w-2.5 rounded-full ${serverSt.dot} shrink-0`}>
                {server.status === "online" && (
                  <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-50" />
                )}
              </span>

              {/* Server Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-cream font-semibold text-sm">{server.name}</span>
                  <span className="text-[9px] text-gold-400/80 font-bold">{server.xp.toUpperCase()}</span>
                </div>
                {/* Mini capacity bar */}
                {server.status === "online" && (
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 h-1 rounded-full bg-ink-700/50 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-gold-500/80 to-gold-400/80"
                        style={{ width: `${serverCap}%` }}
                      />
                    </div>
                    <span className="text-[9px] text-cream-dim tabular-nums">{server.online}</span>
                  </div>
                )}
              </div>

              {/* Ping */}
              <div className="flex items-center gap-1.5 tabular-nums">
                {server.ping > 0 ? (
                  <>
                    <IconWifi className={`h-3 w-3 ${pingTone(server.ping)}`} />
                    <span className={`text-xs font-bold ${pingTone(server.ping)}`}>{server.ping}</span>
                  </>
                ) : (
                  <span className="text-[11px] text-cream-dim/50">—</span>
                )}
              </div>

              {/* Selected Check */}
              {isSelected && <IconCheck className="h-4 w-4 text-gold-400 shrink-0" />}
            </button>
          )
        })}
      </div>

      {/* Selected Server Detail */}
      <div className="rounded-xl border border-gold-500/20 bg-gold-500/[0.04] p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-gold-400/25 to-gold-500/5 border border-gold-500/30 flex items-center justify-center">
              <IconServer className="h-4 w-4 text-gold-300" />
            </div>
            <div>
              <span className="text-cream font-bold text-sm">{activeServer.name}</span>
              <div className="flex items-center gap-1.5">
                <span className={`h-1.5 w-1.5 rounded-full ${st.dot}`} />
                <span className={`text-[10px] font-medium ${st.text}`}>{st.label}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-lg font-bold tabular-nums ${pingTone(activeServer.ping)}`}>{activeServer.ping}ms</div>
            <span className="text-[10px] text-cream-dim">Ping</span>
          </div>
        </div>
        <p className="text-[11px] text-cream-dim/80">{activeServer.desc}</p>
      </div>

      <DownloadBtn />
    </div>
  )
}

/* ───────────────────────── SHOWCASE PAGE ───────────────────────── */

export default function StatusWidgetsShowcase() {
  return (
    <div className="min-h-screen bg-ink-950 p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <header className="space-y-2">
          <h1 className="text-cream text-2xl font-bold">Durum Widget Sablonlari</h1>
          <p className="text-cream-dim text-sm">5 farkli sunucu durumu widget varyasyonu</p>
        </header>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* V1 — Original */}
          <section className="space-y-4">
            <div className="space-y-1">
              <h2 className="text-cream text-lg font-bold">V1 — Original</h2>
              <p className="text-cream-dim text-sm">Hero meta select ile genis dropdown gorunumu</p>
            </div>
            <ServerStatusV1 />
          </section>

          {/* V4 — Card Stacked */}
          <section className="space-y-4">
            <div className="space-y-1">
              <h2 className="text-cream text-lg font-bold">V4 — Card Stacked</h2>
              <p className="text-cream-dim text-sm">Kompakt kart gorunumu ile ic ice bilgiler</p>
            </div>
            <ServerStatusV4Stacked />
          </section>

          {/* V2 — Grid Tiles */}
          <section className="space-y-4">
            <div className="space-y-1">
              <h2 className="text-cream text-lg font-bold">V2 — Grid Tiles</h2>
              <p className="text-cream-dim text-sm">2x2 grid ile sunucu secimi</p>
            </div>
            <ServerStatusV2Grid />
          </section>

          {/* V3 — Minimal Compact */}
          <section className="space-y-4">
            <div className="space-y-1">
              <h2 className="text-cream text-lg font-bold">V3 — Minimal Compact</h2>
              <p className="text-cream-dim text-sm">Acilir kapanir minimal tasarim</p>
            </div>
            <ServerStatusV3Minimal />
          </section>

          {/* V5 — Dashboard Stats */}
          <section className="space-y-4 lg:col-span-2">
            <div className="space-y-1">
              <h2 className="text-cream text-lg font-bold">V5 — Dashboard Stats</h2>
              <p className="text-cream-dim text-sm">Istatistik kartlari ile dashboard gorunumu</p>
            </div>
            <ServerStatusV5Dashboard />
          </section>
        </div>
      </div>
    </div>
  )
}
