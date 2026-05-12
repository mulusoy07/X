"use client"

import { useState } from "react"
import {
  IconServer,
  IconChevronDown,
  IconDownload,
  IconCircleDotted,
  IconCircleFilled,
  IconRadar,
  IconUsers,
} from "@tabler/icons-react"

// Variant 4: Minimal Dashboard - Clean, whitespace-focused with large numbers and thin lines
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

export function ServerStatusV4() {
  const [selectedServer, setSelectedServer] = useState("s1")
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const activeServer = servers.find((s) => s.id === selectedServer) || servers[0]
  const gameServerStatus = activeServer.status === "online"
  const loginServerStatus = activeServer.status !== "offline"
  const capacityPercent = Math.round((activeServer.online / activeServer.cap) * 100)

  return (
    <div className="rounded-2xl bg-cream/[0.02] border border-cream/10 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-cream/10">
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-3 group"
          >
            <span className="text-2xl font-light text-cream tracking-tight">{activeServer.name}</span>
            <IconChevronDown className={`w-4 h-4 text-cream/30 group-hover:text-cream/60 transition-all ${dropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {dropdownOpen && (
            <div className="absolute top-full left-0 mt-3 bg-ink-800 border border-cream/10 rounded-xl overflow-hidden z-20 min-w-[160px] shadow-xl">
              {servers.filter(s => s.status !== "offline").map((server) => (
                <button
                  key={server.id}
                  onClick={() => {
                    setSelectedServer(server.id)
                    setDropdownOpen(false)
                  }}
                  className={`w-full px-4 py-2.5 text-left hover:bg-cream/5 transition-all ${
                    selectedServer === server.id ? "text-cream" : "text-cream/50"
                  }`}
                >
                  {server.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 divide-x divide-cream/10">
        {/* Players */}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <IconUsers className="w-4 h-4 text-cream/30" />
            <span className="text-xs uppercase tracking-widest text-cream/30">Oyuncu</span>
          </div>
          <div className="text-4xl font-extralight text-cream tabular-nums">
            {activeServer.online.toLocaleString()}
          </div>
          <div className="text-xs text-cream/30 mt-1">/ {activeServer.cap.toLocaleString()}</div>
        </div>

        {/* Ping */}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <IconRadar className="w-4 h-4 text-cream/30" />
            <span className="text-xs uppercase tracking-widest text-cream/30">Gecikme</span>
          </div>
          <div className="text-4xl font-extralight text-cream tabular-nums">
            {activeServer.ping > 0 ? activeServer.ping : "--"}
          </div>
          <div className="text-xs text-cream/30 mt-1">milisaniye</div>
        </div>
      </div>

      {/* Status Line */}
      <div className="px-6 py-4 border-t border-cream/10 flex items-center gap-6">
        <div className="flex items-center gap-2">
          {loginServerStatus ? (
            <IconCircleFilled className="w-2 h-2 text-emerald-400" />
          ) : (
            <IconCircleDotted className="w-3 h-3 text-cream/30" />
          )}
          <span className={`text-xs ${loginServerStatus ? "text-cream/70" : "text-cream/30"}`}>Login</span>
        </div>
        <div className="flex items-center gap-2">
          {gameServerStatus ? (
            <IconCircleFilled className="w-2 h-2 text-emerald-400" />
          ) : (
            <IconCircleDotted className="w-3 h-3 text-cream/30" />
          )}
          <span className={`text-xs ${gameServerStatus ? "text-cream/70" : "text-cream/30"}`}>Game</span>
        </div>
        <div className="flex-1" />
        <span className="text-xs text-cream/30">{capacityPercent}% dolu</span>
      </div>

      {/* Thin Progress */}
      <div className="h-1 bg-cream/5">
        <div
          className="h-full bg-cream/20 transition-all"
          style={{ width: `${capacityPercent}%` }}
        />
      </div>

      {/* Download */}
      <div className="p-6">
        <button className="w-full py-4 rounded-xl border border-cream/20 text-cream/80 font-medium flex items-center justify-center gap-3 hover:bg-cream/5 hover:border-cream/30 transition-all">
          <IconDownload className="w-5 h-5" />
          <span>Oyunu Indir</span>
        </button>
      </div>
    </div>
  )
}
