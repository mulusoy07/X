"use client"

import { useState } from "react"
import {
  IconServer,
  IconChevronDown,
  IconCircleCheck,
  IconDownload,
  IconCircleFilled,
  IconArrowRight,
} from "@tabler/icons-react"

// Variant 2: Glassmorphism Card - Modern frosted glass with gradient borders and floating elements
interface ServerData {
  id: string
  name: string
  status: "online" | "maintenance" | "offline"
  online: number
  cap: number
  ping: number
}

const servers: ServerData[] = [
  { id: "s1", name: "Oracle", status: "online", online: 1842, cap: 3000, ping: 32 },
  { id: "s2", name: "Karus", status: "online", online: 2310, cap: 3000, ping: 45 },
  { id: "s3", name: "Aegis", status: "maintenance", online: 0, cap: 3000, ping: 0 },
]

export function ServerStatusV2() {
  const [selectedServer, setSelectedServer] = useState("s1")
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const activeServer = servers.find((s) => s.id === selectedServer) || servers[0]
  const gameServerStatus = activeServer.status === "online"
  const loginServerStatus = activeServer.status !== "offline"
  const capacityPercent = Math.round((activeServer.online / activeServer.cap) * 100)

  return (
    <div className="relative rounded-2xl overflow-hidden">
      {/* Gradient Border Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/30 via-fuchsia-500/30 to-cyan-500/30 rounded-2xl" />
      
      {/* Inner Card */}
      <div className="relative m-[1px] rounded-2xl bg-ink-900/90 backdrop-blur-xl overflow-hidden">
        {/* Floating Orbs Background */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl" />

        {/* Content */}
        <div className="relative p-5">
          {/* Server Selector */}
          <div className="relative mb-5">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/20">
                <IconServer className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 text-left">
                <div className="text-lg font-bold text-white">{activeServer.name}</div>
                <div className="text-sm text-white/50">{activeServer.online.toLocaleString()} aktif oyuncu</div>
              </div>
              <IconChevronDown className={`w-5 h-5 text-white/50 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {dropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-ink-800/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden z-20 shadow-xl">
                {servers.filter(s => s.status !== "offline").map((server) => (
                  <button
                    key={server.id}
                    onClick={() => {
                      setSelectedServer(server.id)
                      setDropdownOpen(false)
                    }}
                    className={`w-full px-4 py-3 flex items-center justify-between hover:bg-white/5 transition-all ${
                      selectedServer === server.id ? "bg-gradient-to-r from-violet-500/10 to-transparent" : ""
                    }`}
                  >
                    <span className="text-white/80">{server.name}</span>
                    {selectedServer === server.id && <IconCircleCheck className="w-5 h-5 text-violet-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Status Pills */}
          <div className="flex gap-3 mb-5">
            <div className={`flex-1 p-4 rounded-xl ${loginServerStatus ? "bg-emerald-500/10 border border-emerald-500/20" : "bg-rose-500/10 border border-rose-500/20"}`}>
              <div className="flex items-center gap-2 mb-1">
                <IconCircleFilled className={`w-2 h-2 ${loginServerStatus ? "text-emerald-400 animate-pulse" : "text-rose-400"}`} />
                <span className="text-xs text-white/50 uppercase tracking-wider">Login</span>
              </div>
              <div className={`text-xl font-bold ${loginServerStatus ? "text-emerald-400" : "text-rose-400"}`}>
                {loginServerStatus ? "Online" : "Offline"}
              </div>
              {loginServerStatus && activeServer.ping > 0 && (
                <div className="text-sm text-emerald-400/60 mt-1">{activeServer.ping}ms</div>
              )}
            </div>

            <div className={`flex-1 p-4 rounded-xl ${gameServerStatus ? "bg-cyan-500/10 border border-cyan-500/20" : "bg-rose-500/10 border border-rose-500/20"}`}>
              <div className="flex items-center gap-2 mb-1">
                <IconCircleFilled className={`w-2 h-2 ${gameServerStatus ? "text-cyan-400 animate-pulse" : "text-rose-400"}`} />
                <span className="text-xs text-white/50 uppercase tracking-wider">Game</span>
              </div>
              <div className={`text-xl font-bold ${gameServerStatus ? "text-cyan-400" : "text-rose-400"}`}>
                {gameServerStatus ? "Online" : "Offline"}
              </div>
              {gameServerStatus && activeServer.ping > 0 && (
                <div className="text-sm text-cyan-400/60 mt-1">{activeServer.ping}ms</div>
              )}
            </div>
          </div>

          {/* Capacity Arc */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 mb-5">
            <div>
              <div className="text-sm text-white/50 mb-1">Sunucu Kapasitesi</div>
              <div className="text-2xl font-bold text-white">%{capacityPercent}</div>
            </div>
            <div className="relative w-16 h-16">
              <svg className="w-full h-full -rotate-90">
                <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="4" className="text-white/10" />
                <circle
                  cx="32" cy="32" r="28"
                  fill="none"
                  stroke="url(#capacityGradient)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={`${capacityPercent * 1.76} 176`}
                />
                <defs>
                  <linearGradient id="capacityGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Download Button */}
          <button className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg shadow-violet-500/25">
            <IconDownload className="w-5 h-5" />
            <span>Oyunu Indir</span>
            <IconArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
