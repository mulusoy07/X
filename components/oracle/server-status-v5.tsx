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

// Variant 5: Stacked Rows - Liste gorunumu, her bilgi ayri satir
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

export function ServerStatusV5() {
  const [selectedServer, setSelectedServer] = useState("s1")
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const activeServer = servers.find((s) => s.id === selectedServer) || servers[0]
  const capacityPercent = Math.round((activeServer.online / activeServer.cap) * 100)
  const isOnline = activeServer.status === "online"

  return (
    <div className="card rounded-xl overflow-hidden">
      {/* Server Selector Row */}
      <div className="px-4 py-3 border-b border-line flex items-center justify-between bg-gradient-to-r from-gold-500/[0.06] to-transparent">
        <div className="relative flex-1">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-lg bg-gold-500/15 border border-gold-500/30 flex items-center justify-center">
              <IconServer className="w-5 h-5 text-gold-400" />
            </div>
            <div className="text-left">
              <div className="text-sm font-bold text-cream">{activeServer.name}</div>
              <div className="text-xs text-cream-dim">{activeServer.desc}</div>
            </div>
            <IconChevronDown className={`w-4 h-4 text-cream-dim transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
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
                  <span className="text-sm text-cream">{server.name}</span>
                  {selectedServer === server.id && <IconCircleCheck className="w-4 h-4 text-gold-400" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Status Rows */}
      <div className="divide-y divide-line/50">
        {/* Login Row */}
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isOnline ? "bg-emerald-500/10" : "bg-rose-500/10"}`}>
              {isOnline ? (
                <IconPlugConnected className="w-4 h-4 text-emerald-400" />
              ) : (
                <IconPlugConnectedX className="w-4 h-4 text-rose-400" />
              )}
            </div>
            <span className="text-sm font-medium text-cream">Login Server</span>
          </div>
          <div className="flex items-center gap-3">
            {activeServer.ping > 0 && (
              <span className="text-xs text-cream-dim flex items-center gap-1">
                <IconActivity className="w-3.5 h-3.5 text-emerald-400" />
                {activeServer.ping}ms
              </span>
            )}
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${isOnline ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30" : "bg-rose-500/10 text-rose-400 border border-rose-500/30"}`}>
              {isOnline ? "Online" : "Offline"}
            </span>
          </div>
        </div>

        {/* Game Row */}
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isOnline ? "bg-emerald-500/10" : "bg-rose-500/10"}`}>
              {isOnline ? (
                <IconPlugConnected className="w-4 h-4 text-emerald-400" />
              ) : (
                <IconPlugConnectedX className="w-4 h-4 text-rose-400" />
              )}
            </div>
            <span className="text-sm font-medium text-cream">Game Server</span>
          </div>
          <div className="flex items-center gap-3">
            {activeServer.ping > 0 && (
              <span className="text-xs text-cream-dim flex items-center gap-1">
                <IconActivity className="w-3.5 h-3.5 text-emerald-400" />
                {activeServer.ping}ms
              </span>
            )}
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${isOnline ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30" : "bg-rose-500/10 text-rose-400 border border-rose-500/30"}`}>
              {isOnline ? "Online" : "Offline"}
            </span>
          </div>
        </div>

        {/* Capacity Row */}
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gold-500/10 flex items-center justify-center">
              <IconUsers className="w-4 h-4 text-gold-400" />
            </div>
            <span className="text-sm font-medium text-cream">Doluluk</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-24 h-2 rounded-full bg-ink-900 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-gold-500 to-gold-400"
                style={{ width: `${capacityPercent}%` }}
              />
            </div>
            <span className="text-sm font-bold text-gold-400 w-12 text-right">{capacityPercent}%</span>
          </div>
        </div>
      </div>

      {/* Download Button Row */}
      <div className="p-4 border-t border-line">
        <button className="gold-btn w-full h-11 rounded-xl flex items-center justify-center gap-2 font-bold">
          <IconDownload className="w-5 h-5" />
          Oyunu Indir
        </button>
      </div>
    </div>
  )
}
