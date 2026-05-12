"use client"

import { useState } from "react"
import {
  IconServer,
  IconChevronDown,
  IconDownload,
  IconBolt,
  IconFlame,
  IconShieldCheck,
  IconDeviceGamepad2,
} from "@tabler/icons-react"

// Variant 5: Gaming HUD Style - Aggressive angles, neon accents, tech/cyber aesthetic
interface ServerData {
  id: string
  name: string
  status: "online" | "maintenance" | "offline"
  online: number
  cap: number
  ping: number
}

const servers: ServerData[] = [
  { id: "s1", name: "ORACLE", status: "online", online: 1842, cap: 3000, ping: 32 },
  { id: "s2", name: "KARUS", status: "online", online: 2310, cap: 3000, ping: 45 },
  { id: "s3", name: "AEGIS", status: "maintenance", online: 0, cap: 3000, ping: 0 },
]

export function ServerStatusV5() {
  const [selectedServer, setSelectedServer] = useState("s1")
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const activeServer = servers.find((s) => s.id === selectedServer) || servers[0]
  const gameServerStatus = activeServer.status === "online"
  const loginServerStatus = activeServer.status !== "offline"
  const capacityPercent = Math.round((activeServer.online / activeServer.cap) * 100)

  return (
    <div className="relative">
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-rose-500/60" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-rose-500/60" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-rose-500/60" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-rose-500/60" />

      <div className="bg-ink-950 border border-rose-500/20 p-1">
        {/* Inner Frame */}
        <div className="bg-gradient-to-b from-ink-900 to-ink-950 p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-1 h-6 bg-rose-500" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-rose-400 font-bold">Server Status</span>
            </div>
            <div className="flex items-center gap-1">
              <span className={`w-2 h-2 ${activeServer.status === "online" ? "bg-emerald-400 animate-pulse" : "bg-amber-400"}`} />
              <span className="text-[10px] uppercase tracking-wider text-cream/60">
                {activeServer.status === "online" ? "LIVE" : "MAINT"}
              </span>
            </div>
          </div>

          {/* Server Select */}
          <div className="relative mb-4">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full flex items-center justify-between p-3 bg-ink-950 border border-rose-500/30 clip-corner hover:border-rose-500/60 transition-all"
              style={{ clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)" }}
            >
              <div className="flex items-center gap-3">
                <IconServer className="w-6 h-6 text-rose-400" />
                <span className="text-lg font-bold text-cream tracking-wider">{activeServer.name}</span>
              </div>
              <IconChevronDown className={`w-5 h-5 text-rose-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {dropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-ink-950 border border-rose-500/30 overflow-hidden z-20">
                {servers.filter(s => s.status !== "offline").map((server) => (
                  <button
                    key={server.id}
                    onClick={() => {
                      setSelectedServer(server.id)
                      setDropdownOpen(false)
                    }}
                    className={`w-full px-4 py-3 text-left hover:bg-rose-500/10 transition-all border-b border-rose-500/10 last:border-b-0 ${
                      selectedServer === server.id ? "bg-rose-500/5 text-rose-400" : "text-cream/70"
                    }`}
                  >
                    {server.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Status Boxes */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            {/* Login */}
            <div className={`p-3 border ${loginServerStatus ? "border-emerald-500/30 bg-emerald-500/5" : "border-rose-500/30 bg-rose-500/5"}`}>
              <div className="flex items-center gap-2 mb-2">
                <IconShieldCheck className={`w-4 h-4 ${loginServerStatus ? "text-emerald-400" : "text-rose-400"}`} />
                <span className="text-[10px] uppercase tracking-wider text-cream/50">Login</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className={`text-xl font-bold ${loginServerStatus ? "text-emerald-400" : "text-rose-400"}`}>
                  {loginServerStatus ? "ON" : "OFF"}
                </span>
                {loginServerStatus && activeServer.ping > 0 && (
                  <span className="text-xs text-emerald-400/60">{activeServer.ping}ms</span>
                )}
              </div>
            </div>

            {/* Game */}
            <div className={`p-3 border ${gameServerStatus ? "border-emerald-500/30 bg-emerald-500/5" : "border-rose-500/30 bg-rose-500/5"}`}>
              <div className="flex items-center gap-2 mb-2">
                <IconDeviceGamepad2 className={`w-4 h-4 ${gameServerStatus ? "text-emerald-400" : "text-rose-400"}`} />
                <span className="text-[10px] uppercase tracking-wider text-cream/50">Game</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className={`text-xl font-bold ${gameServerStatus ? "text-emerald-400" : "text-rose-400"}`}>
                  {gameServerStatus ? "ON" : "OFF"}
                </span>
                {gameServerStatus && activeServer.ping > 0 && (
                  <span className="text-xs text-emerald-400/60">{activeServer.ping}ms</span>
                )}
              </div>
            </div>
          </div>

          {/* Capacity */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <IconFlame className="w-4 h-4 text-rose-400" />
                <span className="text-[10px] uppercase tracking-wider text-cream/50">Population</span>
              </div>
              <span className="text-sm font-mono text-rose-400">{activeServer.online}/{activeServer.cap}</span>
            </div>
            <div className="h-2 bg-ink-950 border border-rose-500/20">
              <div
                className="h-full bg-gradient-to-r from-rose-600 to-rose-400 transition-all relative"
                style={{ width: `${capacityPercent}%` }}
              >
                <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/50 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Download */}
          <button className="w-full py-4 bg-gradient-to-r from-rose-600 to-rose-500 text-white font-bold uppercase tracking-wider flex items-center justify-center gap-3 hover:from-rose-500 hover:to-rose-400 transition-all relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <IconDownload className="w-5 h-5" />
            <span>Download Client</span>
            <IconBolt className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
