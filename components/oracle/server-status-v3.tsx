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

// Variant 3: Left-Right Split - Sol tarafta server bilgisi, sag tarafta status
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

export function ServerStatusV3() {
  const [selectedServer, setSelectedServer] = useState("s1")
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const activeServer = servers.find((s) => s.id === selectedServer) || servers[0]
  const capacityPercent = Math.round((activeServer.online / activeServer.cap) * 100)
  const isOnline = activeServer.status === "online"

  return (
    <div className="card rounded-xl overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Left Panel - Server Info */}
        <div className="flex-1 p-5 border-b md:border-b-0 md:border-r border-line">
          {/* Server Selector */}
          <div className="relative mb-4">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full flex items-center gap-3 p-3 rounded-xl border border-line bg-ink-800 hover:border-gold-500/30 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-500/20 to-gold-600/10 border border-gold-500/30 flex items-center justify-center">
                <IconServer className="w-6 h-6 text-gold-400" />
              </div>
              <div className="flex-1 text-left">
                <div className="text-base font-bold text-cream">{activeServer.name}</div>
                <div className="text-xs text-cream-dim">{activeServer.desc}</div>
              </div>
              <IconChevronDown className={`w-5 h-5 text-cream-dim transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {dropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-ink-800 border border-gold-500/20 rounded-xl shadow-2xl overflow-hidden z-20">
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

          {/* Capacity Progress */}
          <div className="mb-4">
            <div className="flex justify-between text-xs mb-2">
              <span className="text-cream-dim">Sunucu Dolulugu</span>
              <span className="font-bold text-cream">{activeServer.online.toLocaleString()} / {activeServer.cap.toLocaleString()}</span>
            </div>
            <div className="h-3 rounded-full bg-ink-900 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  capacityPercent > 80 ? "bg-gradient-to-r from-rose-500 to-rose-400" :
                  capacityPercent > 50 ? "bg-gradient-to-r from-amber-500 to-amber-400" :
                  "bg-gradient-to-r from-gold-500 to-gold-400"
                }`}
                style={{ width: `${capacityPercent}%` }}
              />
            </div>
          </div>

          {/* Download Button */}
          <button className="gold-btn w-full h-11 rounded-xl flex items-center justify-center gap-2 font-bold">
            <IconDownload className="w-5 h-5" />
            Oyunu Indir
          </button>
        </div>

        {/* Right Panel - Status */}
        <div className="w-full md:w-52 p-5 bg-ink-800/30 flex flex-col justify-center gap-4">
          {/* Login Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isOnline ? (
                <IconPlugConnected className="w-5 h-5 text-emerald-400" />
              ) : (
                <IconPlugConnectedX className="w-5 h-5 text-rose-400" />
              )}
              <span className="text-sm text-cream">Login</span>
            </div>
            <span className={`text-xs font-bold px-2 py-1 rounded ${isOnline ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"}`}>
              {isOnline ? "ON" : "OFF"}
            </span>
          </div>

          {/* Game Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isOnline ? (
                <IconPlugConnected className="w-5 h-5 text-emerald-400" />
              ) : (
                <IconPlugConnectedX className="w-5 h-5 text-rose-400" />
              )}
              <span className="text-sm text-cream">Game</span>
            </div>
            <span className={`text-xs font-bold px-2 py-1 rounded ${isOnline ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"}`}>
              {isOnline ? "ON" : "OFF"}
            </span>
          </div>

          {/* Ping */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <IconActivity className="w-5 h-5 text-gold-400" />
              <span className="text-sm text-cream">Ping</span>
            </div>
            <span className="text-sm font-bold text-gold-400">
              {activeServer.ping > 0 ? `${activeServer.ping}ms` : "—"}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
