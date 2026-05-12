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
} from "@tabler/icons-react"

// Variant 1: Compact Horizontal Bar - Tek satir, yatay bilgi akisi
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

export function ServerStatusV1() {
  const [selectedServer, setSelectedServer] = useState("s1")
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const activeServer = servers.find((s) => s.id === selectedServer) || servers[0]
  const capacityPercent = Math.round((activeServer.online / activeServer.cap) * 100)
  const isOnline = activeServer.status === "online"

  return (
    <div className="card rounded-xl overflow-hidden">
      <div className="p-4 flex flex-wrap items-center gap-4">
        {/* Server Selector - Compact */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-line bg-ink-800 hover:border-gold-500/30 transition-all"
          >
            <IconServer className="w-4 h-4 text-gold-400" />
            <span className="text-sm font-bold text-cream">{activeServer.name.split(" — ")[1]}</span>
            <IconChevronDown className={`w-4 h-4 text-cream-dim transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {dropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-56 bg-ink-800 border border-gold-500/20 rounded-xl shadow-2xl overflow-hidden z-20">
              {servers.filter(s => s.status !== "offline").map((server) => (
                <button
                  key={server.id}
                  onClick={() => {
                    setSelectedServer(server.id)
                    setDropdownOpen(false)
                  }}
                  className={`w-full px-3 py-2.5 flex items-center justify-between hover:bg-ink-700/50 transition-all ${
                    selectedServer === server.id ? "bg-gold-500/10" : ""
                  }`}
                >
                  <span className="text-sm text-cream">{server.name}</span>
                  {selectedServer === server.id && <IconCircleCheck className="w-4 h-4 text-gold-400" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="w-px h-8 bg-line hidden sm:block" />

        {/* Status Indicators - Horizontal */}
        <div className="flex items-center gap-4 sm:gap-6 flex-1">
          {/* Login Status */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-cream-dim uppercase tracking-wider hidden sm:inline">Login</span>
            {isOnline ? (
              <IconPlugConnected className="w-4 h-4 text-emerald-400" />
            ) : (
              <IconPlugConnectedX className="w-4 h-4 text-rose-400" />
            )}
          </div>

          {/* Game Status */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-cream-dim uppercase tracking-wider hidden sm:inline">Game</span>
            {isOnline ? (
              <IconPlugConnected className="w-4 h-4 text-emerald-400" />
            ) : (
              <IconPlugConnectedX className="w-4 h-4 text-rose-400" />
            )}
          </div>

          {/* Ping */}
          {activeServer.ping > 0 && (
            <div className="flex items-center gap-1.5">
              <IconActivity className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-bold text-emerald-400">{activeServer.ping} ms</span>
            </div>
          )}

          {/* Capacity Bar - Inline */}
          <div className="hidden md:flex items-center gap-2 flex-1 max-w-[180px]">
            <div className="flex-1 h-2 rounded-full bg-ink-900 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-gold-500 to-gold-400"
                style={{ width: `${capacityPercent}%` }}
              />
            </div>
            <span className="text-xs font-bold text-gold-400">{capacityPercent}%</span>
          </div>
        </div>

        {/* Download Button */}
        <button className="gold-btn px-4 py-2 rounded-lg flex items-center gap-2 font-bold text-sm">
          <IconDownload className="w-4 h-4" />
          <span className="hidden sm:inline">Indir</span>
        </button>
      </div>
    </div>
  )
}
