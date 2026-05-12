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

// Variant 4: Big Stats - Buyuk rakamlar, merkezi odak
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

export function ServerStatusV4() {
  const [selectedServer, setSelectedServer] = useState("s1")
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const activeServer = servers.find((s) => s.id === selectedServer) || servers[0]
  const capacityPercent = Math.round((activeServer.online / activeServer.cap) * 100)
  const isOnline = activeServer.status === "online"

  return (
    <div className="card rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-line flex items-center justify-between">
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 text-left"
          >
            <IconServer className="w-5 h-5 text-gold-400" />
            <div>
              <span className="text-base font-bold text-cream">{activeServer.name.split(" — ")[1]}</span>
              <span className="text-xs text-cream-dim ml-2">{activeServer.desc}</span>
            </div>
            <IconChevronDown className={`w-4 h-4 text-cream-dim transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {dropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-64 bg-ink-800 border border-gold-500/20 rounded-xl shadow-2xl overflow-hidden z-20">
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

        <button className="gold-btn px-4 py-2 rounded-lg flex items-center gap-2 font-bold text-sm">
          <IconDownload className="w-4 h-4" />
          Indir
        </button>
      </div>

      {/* Big Stats */}
      <div className="p-5">
        <div className="grid grid-cols-3 gap-4">
          {/* Status - Combined */}
          <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-ink-800/30 border border-line">
            <div className="flex items-center gap-3 mb-2">
              {isOnline ? (
                <IconPlugConnected className="w-8 h-8 text-emerald-400" />
              ) : (
                <IconPlugConnectedX className="w-8 h-8 text-rose-400" />
              )}
            </div>
            <div className={`text-2xl font-black ${isOnline ? "text-emerald-400" : "text-rose-400"}`}>
              {isOnline ? "ONLINE" : "OFFLINE"}
            </div>
            <div className="text-xs text-cream-dim mt-1">Login & Game</div>
          </div>

          {/* Ping - Big Number */}
          <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-ink-800/30 border border-line">
            <IconActivity className="w-6 h-6 text-gold-400 mb-2" />
            <div className="text-4xl font-black bg-gradient-to-r from-gold-400 to-gold-500 bg-clip-text text-transparent">
              {activeServer.ping > 0 ? activeServer.ping : "—"}
            </div>
            <div className="text-xs text-cream-dim mt-1">MS Ping</div>
          </div>

          {/* Capacity - Big Number */}
          <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-ink-800/30 border border-line">
            <div className="text-4xl font-black bg-gradient-to-r from-gold-400 to-gold-500 bg-clip-text text-transparent">
              {capacityPercent}%
            </div>
            <div className="text-xs text-cream-dim mt-1 mb-2">Doluluk</div>
            <div className="w-full h-2 rounded-full bg-ink-900 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-gold-500 to-gold-400"
                style={{ width: `${capacityPercent}%` }}
              />
            </div>
            <div className="text-[10px] text-cream-dim/60 mt-1">
              {activeServer.online.toLocaleString()} / {activeServer.cap.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
