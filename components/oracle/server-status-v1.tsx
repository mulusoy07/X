"use client"

import { useState } from "react"
import {
  IconServer,
  IconChevronDown,
  IconCircleCheck,
  IconDownload,
  IconWifi,
  IconWifiOff,
  IconUsers,
  IconBolt,
} from "@tabler/icons-react"

// Variant 1: Terminal/Console Style - Retro gaming aesthetic with monospace fonts and blinking cursors
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

export function ServerStatusV1() {
  const [selectedServer, setSelectedServer] = useState("s1")
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const activeServer = servers.find((s) => s.id === selectedServer) || servers[0]
  const gameServerStatus = activeServer.status === "online"
  const loginServerStatus = activeServer.status !== "offline"

  return (
    <div className="rounded-xl overflow-hidden bg-ink-950 border border-emerald-500/20 font-mono">
      {/* Terminal Header */}
      <div className="px-4 py-2 bg-emerald-500/10 border-b border-emerald-500/20 flex items-center gap-2">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-rose-500/80" />
          <span className="w-3 h-3 rounded-full bg-amber-500/80" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
        </div>
        <span className="text-xs text-emerald-400/60 ml-2">oracle@server:~</span>
      </div>

      {/* Terminal Content */}
      <div className="p-4 space-y-3">
        {/* Server Select */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full text-left px-3 py-2 bg-ink-900 border border-emerald-500/30 rounded text-emerald-400 text-sm hover:border-emerald-400 transition-colors flex items-center justify-between"
          >
            <span>
              <span className="text-emerald-500/60">$</span> connect --server {activeServer.name.toLowerCase()}
            </span>
            <IconChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {dropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-ink-900 border border-emerald-500/30 rounded overflow-hidden z-20">
              {servers.filter(s => s.status !== "offline").map((server) => (
                <button
                  key={server.id}
                  onClick={() => {
                    setSelectedServer(server.id)
                    setDropdownOpen(false)
                  }}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-emerald-500/10 transition-colors flex items-center justify-between ${
                    selectedServer === server.id ? "text-emerald-400 bg-emerald-500/5" : "text-emerald-400/70"
                  }`}
                >
                  <span>{server.name}</span>
                  {selectedServer === server.id && <IconCircleCheck className="w-4 h-4" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Status Output */}
        <div className="space-y-1 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-emerald-500/60">[STATUS]</span>
            <span className="text-emerald-400">Checking services...</span>
            <span className="animate-pulse">_</span>
          </div>

          {/* Login Status */}
          <div className="flex items-center gap-3 pl-4">
            {loginServerStatus ? (
              <IconWifi className="w-4 h-4 text-emerald-400" />
            ) : (
              <IconWifiOff className="w-4 h-4 text-rose-400" />
            )}
            <span className={loginServerStatus ? "text-emerald-400" : "text-rose-400"}>
              LOGIN_SERVER: {loginServerStatus ? "CONNECTED" : "DISCONNECTED"}
            </span>
          </div>

          {/* Game Status */}
          <div className="flex items-center gap-3 pl-4">
            {gameServerStatus ? (
              <IconWifi className="w-4 h-4 text-emerald-400" />
            ) : (
              <IconWifiOff className="w-4 h-4 text-rose-400" />
            )}
            <span className={gameServerStatus ? "text-emerald-400" : "text-rose-400"}>
              GAME_SERVER: {gameServerStatus ? "CONNECTED" : "DISCONNECTED"}
            </span>
          </div>

          {/* Ping */}
          {activeServer.ping > 0 && (
            <div className="flex items-center gap-3 pl-4">
              <IconBolt className="w-4 h-4 text-amber-400" />
              <span className="text-amber-400">LATENCY: {activeServer.ping}ms</span>
            </div>
          )}

          {/* Players */}
          <div className="flex items-center gap-3 pl-4">
            <IconUsers className="w-4 h-4 text-sky-400" />
            <span className="text-sky-400">PLAYERS: {activeServer.online.toLocaleString()}/{activeServer.cap.toLocaleString()}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="pt-2">
          <div className="text-xs text-emerald-500/60 mb-1">CAPACITY [{Math.round((activeServer.online / activeServer.cap) * 100)}%]</div>
          <div className="h-2 bg-ink-900 rounded overflow-hidden border border-emerald-500/20">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all"
              style={{ width: `${(activeServer.online / activeServer.cap) * 100}%` }}
            />
          </div>
        </div>

        {/* Download Button */}
        <button className="w-full mt-4 py-3 bg-emerald-500/20 border border-emerald-500/40 rounded text-emerald-400 font-bold text-sm hover:bg-emerald-500/30 transition-colors flex items-center justify-center gap-2">
          <IconDownload className="w-5 h-5" />
          <span>./download_client.sh</span>
        </button>
      </div>
    </div>
  )
}
