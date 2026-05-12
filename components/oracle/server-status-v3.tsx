"use client"

import { useState } from "react"
import {
  IconServer,
  IconChevronRight,
  IconCircleCheck,
  IconDownload,
  IconWifi,
  IconWifiOff,
  IconPlayerPlay,
  IconLock,
} from "@tabler/icons-react"

// Variant 3: Horizontal Split - Wide horizontal layout with left/right panels
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

export function ServerStatusV3() {
  const [selectedServer, setSelectedServer] = useState("s1")

  const activeServer = servers.find((s) => s.id === selectedServer) || servers[0]
  const gameServerStatus = activeServer.status === "online"
  const loginServerStatus = activeServer.status !== "offline"
  const capacityPercent = Math.round((activeServer.online / activeServer.cap) * 100)

  return (
    <div className="rounded-xl overflow-hidden bg-ink-900 border border-line">
      {/* Server Tabs - Horizontal */}
      <div className="flex border-b border-line">
        {servers.filter(s => s.status !== "offline").map((server) => (
          <button
            key={server.id}
            onClick={() => setSelectedServer(server.id)}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-all relative ${
              selectedServer === server.id
                ? "text-gold-400 bg-gold-500/5"
                : "text-cream-dim hover:text-cream hover:bg-ink-800/50"
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              <span className={`w-2 h-2 rounded-full ${server.status === "online" ? "bg-emerald-400" : "bg-amber-400"}`} />
              {server.name}
            </span>
            {selectedServer === server.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold-400 to-gold-600" />
            )}
          </button>
        ))}
      </div>

      {/* Main Content - Horizontal Split */}
      <div className="grid grid-cols-2 divide-x divide-line">
        {/* Left - Server Info */}
        <div className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-gold-500/20 to-gold-600/10 border border-gold-500/30 flex items-center justify-center">
              <IconServer className="w-7 h-7 text-gold-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-cream">{activeServer.name}</h3>
              <p className="text-sm text-cream-dim">{activeServer.online.toLocaleString()} oyuncu aktif</p>
            </div>
          </div>

          {/* Capacity Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-cream-dim">Doluluk Orani</span>
              <span className="text-gold-400 font-bold">%{capacityPercent}</span>
            </div>
            <div className="h-3 rounded-full bg-ink-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-gold-500 to-gold-400 transition-all"
                style={{ width: `${capacityPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-cream-dim/60">
              <span>0</span>
              <span>{activeServer.cap.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Right - Status */}
        <div className="p-5 space-y-3">
          {/* Login Status */}
          <div className={`flex items-center justify-between p-3 rounded-lg ${loginServerStatus ? "bg-emerald-500/5 border border-emerald-500/20" : "bg-rose-500/5 border border-rose-500/20"}`}>
            <div className="flex items-center gap-3">
              {loginServerStatus ? (
                <IconLock className="w-5 h-5 text-emerald-400" />
              ) : (
                <IconWifiOff className="w-5 h-5 text-rose-400" />
              )}
              <div>
                <div className="text-xs text-cream-dim">Login Server</div>
                <div className={`text-sm font-bold ${loginServerStatus ? "text-emerald-400" : "text-rose-400"}`}>
                  {loginServerStatus ? "Baglanti Aktif" : "Baglanti Yok"}
                </div>
              </div>
            </div>
            {loginServerStatus && activeServer.ping > 0 && (
              <span className="text-emerald-400 text-sm font-mono">{activeServer.ping}ms</span>
            )}
          </div>

          {/* Game Status */}
          <div className={`flex items-center justify-between p-3 rounded-lg ${gameServerStatus ? "bg-emerald-500/5 border border-emerald-500/20" : "bg-rose-500/5 border border-rose-500/20"}`}>
            <div className="flex items-center gap-3">
              {gameServerStatus ? (
                <IconPlayerPlay className="w-5 h-5 text-emerald-400" />
              ) : (
                <IconWifiOff className="w-5 h-5 text-rose-400" />
              )}
              <div>
                <div className="text-xs text-cream-dim">Game Server</div>
                <div className={`text-sm font-bold ${gameServerStatus ? "text-emerald-400" : "text-rose-400"}`}>
                  {gameServerStatus ? "Oynanabilir" : "Bakim Modu"}
                </div>
              </div>
            </div>
            {gameServerStatus && activeServer.ping > 0 && (
              <span className="text-emerald-400 text-sm font-mono">{activeServer.ping}ms</span>
            )}
          </div>
        </div>
      </div>

      {/* Download Button - Full Width */}
      <div className="p-4 border-t border-line bg-ink-800/30">
        <button className="w-full py-3.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-ink-900 font-bold flex items-center justify-center gap-2 hover:from-gold-400 hover:to-gold-500 transition-all">
          <IconDownload className="w-5 h-5" />
          <span>Oyunu Indir</span>
          <IconChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
