"use client"

import { useState } from "react"
import {
  IconServer,
  IconChevronDown,
  IconCircleCheck,
  IconDownload,
  IconActivity,
  IconPlugConnected,
  IconPlugConnectedX,
  IconUsers,
} from "@tabler/icons-react"

// Variant 2: 4 Card Grid - Her bilgi ayri kart icinde, grid duzeni
interface ServerData {
  id: string
  name: string
  desc: string
  status: "online" | "maintenance" | "offline"
  online: number
  cap: number
  ping: number
}

const servers: ServerData[] = [
  { id: "s1", name: "Server 1 — Oracle", desc: "Klasik PvP · v2100 · 64-bit", status: "online", online: 1842, cap: 3000, ping: 32 },
  { id: "s2", name: "Server 2 — Karus", desc: "Yuksek populasyon · Dusuk drop", status: "online", online: 2310, cap: 3000, ping: 45 },
  { id: "s3", name: "Server 3 — Aegis", desc: "Yeni baslangic sunucusu · 2x XP", status: "maintenance", online: 0, cap: 3000, ping: 0 },
]

export function ServerStatusV2() {
  const [selectedServer, setSelectedServer] = useState("s1")
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const activeServer = servers.find((s) => s.id === selectedServer) || servers[0]
  const capacityPercent = Math.round((activeServer.online / activeServer.cap) * 100)
  const isOnline = activeServer.status === "online"

  return (
    <div className="card rounded-xl overflow-hidden">
      {/* Header with Server Selector */}
      <div className="p-4 border-b border-line bg-gradient-to-r from-gold-500/[0.06] to-transparent">
        <div className="flex items-center justify-between">
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-line bg-ink-800 hover:border-gold-500/30 transition-all"
            >
              <div className="w-8 h-8 rounded-lg bg-gold-500/15 border border-gold-500/30 flex items-center justify-center">
                <IconServer className="w-4 h-4 text-gold-400" />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-cream">{activeServer.name}</div>
                <div className="text-xs text-cream-dim">{activeServer.desc}</div>
              </div>
              <IconChevronDown className={`w-4 h-4 text-cream-dim ml-2 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {dropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-72 bg-ink-800 border border-gold-500/20 rounded-xl shadow-2xl overflow-hidden z-20">
                {servers.filter(s => s.status !== "offline").map((server) => (
                  <button
                    key={server.id}
                    onClick={() => {
                      setSelectedServer(server.id)
                      setDropdownOpen(false)
                    }}
                    className={`w-full px-4 py-3 flex items-center justify-between hover:bg-ink-700/50 transition-all ${
                      selectedServer === server.id ? "bg-gold-500/10" : ""
                    }`}
                  >
                    <div>
                      <span className="text-sm text-cream block">{server.name}</span>
                      <span className="text-xs text-cream-dim">{server.desc}</span>
                    </div>
                    {selectedServer === server.id && <IconCircleCheck className="w-4 h-4 text-gold-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="gold-btn px-5 py-2.5 rounded-xl flex items-center gap-2 font-bold text-sm">
            <IconDownload className="w-4 h-4" />
            Oyunu Indir
          </button>
        </div>
      </div>

      {/* Stats Grid - 4 Columns */}
      <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* Login Status Card */}
        <div className="p-4 rounded-xl bg-ink-800/50 border border-line text-center">
          <div className="w-10 h-10 rounded-full bg-ink-700 border border-line flex items-center justify-center mx-auto mb-2">
            {isOnline ? (
              <IconPlugConnected className="w-5 h-5 text-emerald-400" />
            ) : (
              <IconPlugConnectedX className="w-5 h-5 text-rose-400" />
            )}
          </div>
          <div className="text-xs text-cream-dim uppercase tracking-wider mb-1">Login</div>
          <div className={`text-sm font-bold ${isOnline ? "text-emerald-400" : "text-rose-400"}`}>
            {isOnline ? "Online" : "Offline"}
          </div>
        </div>

        {/* Game Status Card */}
        <div className="p-4 rounded-xl bg-ink-800/50 border border-line text-center">
          <div className="w-10 h-10 rounded-full bg-ink-700 border border-line flex items-center justify-center mx-auto mb-2">
            {isOnline ? (
              <IconPlugConnected className="w-5 h-5 text-emerald-400" />
            ) : (
              <IconPlugConnectedX className="w-5 h-5 text-rose-400" />
            )}
          </div>
          <div className="text-xs text-cream-dim uppercase tracking-wider mb-1">Game</div>
          <div className={`text-sm font-bold ${isOnline ? "text-emerald-400" : "text-rose-400"}`}>
            {isOnline ? "Online" : "Offline"}
          </div>
        </div>

        {/* Ping Card */}
        <div className="p-4 rounded-xl bg-ink-800/50 border border-line text-center">
          <div className="w-10 h-10 rounded-full bg-ink-700 border border-line flex items-center justify-center mx-auto mb-2">
            <IconActivity className="w-5 h-5 text-gold-400" />
          </div>
          <div className="text-xs text-cream-dim uppercase tracking-wider mb-1">Ping</div>
          <div className="text-sm font-bold text-gold-400">
            {activeServer.ping > 0 ? `${activeServer.ping} ms` : "—"}
          </div>
        </div>

        {/* Capacity Card */}
        <div className="p-4 rounded-xl bg-ink-800/50 border border-line text-center">
          <div className="w-10 h-10 rounded-full bg-ink-700 border border-line flex items-center justify-center mx-auto mb-2">
            <IconUsers className="w-5 h-5 text-gold-400" />
          </div>
          <div className="text-xs text-cream-dim uppercase tracking-wider mb-1">Doluluk</div>
          <div className="text-sm font-bold text-gold-400">{capacityPercent}%</div>
          <div className="mt-2 h-1.5 rounded-full bg-ink-900 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-gold-500 to-gold-400"
              style={{ width: `${capacityPercent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
