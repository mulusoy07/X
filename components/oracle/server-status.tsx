"use client"

import { useState, useImperativeHandle, forwardRef } from "react"
import {
  IconServer,
  IconChevronDown,
  IconCircleCheck,
  IconTool,
  IconDownload,
  IconX,
  IconCheck,
  IconActivity,
  IconLogin,
  IconPlugConnected,
  IconDeviceGamepad2,
} from "@tabler/icons-react"

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
  { id: "s4", name: "Server 4 — Ronark", desc: "Hardcore PvE · PK kapali", status: "offline", online: 0, cap: 3000, ping: 0 },
]

function StatusBadge({ status }: { status: "online" | "maintenance" | "offline" }) {
  const configs = {
    online: {
      className: "border-emerald-500/40 bg-emerald-500/10 text-emerald-400",
      icon: <IconCircleCheck className="w-3 h-3" />,
      label: "Cevrimici"
    },
    maintenance: {
      className: "border-amber-500/40 bg-amber-500/10 text-amber-400",
      icon: <IconTool className="w-3 h-3" />,
      label: "Bakim"
    },
    offline: {
      className: "border-rose-500/40 bg-rose-500/10 text-rose-400",
      icon: <IconX className="w-3 h-3" />,
      label: "Cevrimdisi"
    }
  }
  const config = configs[status]
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${config.className}`}>
      {config.icon}
      {config.label}
    </span>
  )
}

export interface ServerStatusHandle {
  openModal: () => void
}

export const ServerStatus = forwardRef<ServerStatusHandle>(function ServerStatus(_, ref) {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedServer, setSelectedServer] = useState("s1")
  const [tempSelectedServer, setTempSelectedServer] = useState("s1")
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const activeServer = servers.find((s) => s.id === selectedServer) || servers[0]
  const capacityPercent = Math.round((activeServer.online / activeServer.cap) * 100)

  const openModal = () => {
    setTempSelectedServer(selectedServer)
    setModalOpen(true)
  }

  useImperativeHandle(ref, () => ({
    openModal,
  }))

  const confirmServer = () => {
    setSelectedServer(tempSelectedServer)
    setModalOpen(false)
  }

  const gameServerStatus = activeServer.status === "online"
  const loginServerStatus = activeServer.status !== "offline"

  return (
    <>
      <div className="card rounded-xl overflow-hidden h-full flex flex-col">
        {/* Server Selector Header */}
        <div className="p-4 border-b border-line bg-gradient-to-r from-gold-500/[0.06] to-transparent">
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full flex items-center justify-between p-3 rounded-xl border border-line bg-gradient-to-b from-ink-800 to-ink-900 hover:border-gold-500/30 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gold-500/15 border border-gold-500/30 flex items-center justify-center">
                  <IconServer className="w-5 h-5 text-gold-400" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-bold text-cream">{activeServer.name.split(" — ")[0]}</div>
                  <div className="text-xs text-cream-dim">- {activeServer.name.split(" — ")[1] || "Test"}</div>
                </div>
              </div>
              <IconChevronDown className={`w-5 h-5 text-cream-dim group-hover:text-gold-400 transition-all ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown */}
            {dropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-ink-800 border border-gold-500/20 rounded-xl shadow-2xl overflow-hidden z-20">
                {servers.filter(s => s.status !== "offline").map((server) => (
                  <button
                    key={server.id}
                    onClick={() => {
                      setSelectedServer(server.id)
                      setDropdownOpen(false)
                    }}
                    className={`w-full px-4 py-3 flex items-center justify-between hover:bg-ink-700/50 transition-all ${selectedServer === server.id ? "bg-gold-500/10" : ""
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <IconServer className={`w-4 h-4 ${selectedServer === server.id ? "text-gold-400" : "text-cream-dim"}`} />
                      <span className="text-sm text-cream">{server.name}</span>
                    </div>
                    {selectedServer === server.id && (
                      <IconCircleCheck className="w-4 h-4 text-gold-400" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Status Grid - New Compact Design */}
        <div className="p-4 flex-1 flex flex-col">
          <div className="grid grid-cols-2 gap-3">
            {/* Login Server */}
            <div className="p-3 rounded-xl bg-ink-800/50 border border-line">
              <div className="flex items-center gap-2 mb-2">
                <IconLogin className="w-4 h-4 text-cream-dim" />
                <span className="text-xs text-cream-dim font-medium">Login</span>
              </div>
              <div className="flex items-center gap-2">
                {loginServerStatus ? (
                  <IconPlugConnected className="w-5 h-5 text-emerald-400" />
                ) : (
                  <IconPlugConnectedX className="w-5 h-5 text-amber-400" />
                )}
                <span className={`text-sm font-bold ${loginServerStatus ? "text-emerald-400" : "text-amber-400"}`}>
                  {loginServerStatus ? "Online" : "Offline"}
                </span>
              </div>
              {loginServerStatus && activeServer.ping > 0 && (
                <div className="flex items-center gap-1.5 mt-2 text-emerald-400">
                  <IconActivity className="w-3.5 h-3.5" />
                  <span className="text-xs font-bold">{activeServer.ping} ms</span>
                </div>
              )}
            </div>

            {/* Game Server */}
            <div className="p-3 rounded-xl bg-ink-800/50 border border-line">
              <div className="flex items-center gap-2 mb-2">
                <IconDeviceGamepad2 className="w-4 h-4 text-cream-dim" />
                <span className="text-xs text-cream-dim font-medium">Game</span>
              </div>
              <div className="flex items-center gap-2">
                {gameServerStatus ? (
                  <IconPlugConnected className="w-5 h-5 text-emerald-400" />
                ) : (
                  <IconPlugConnectedX className="w-5 h-5 text-rose-400" />
                )}
                <span className={`text-sm font-bold ${gameServerStatus ? "text-emerald-400" : "text-rose-400"}`}>
                  {gameServerStatus ? "Online" : "Offline"}
                </span>
              </div>
              {gameServerStatus && activeServer.ping > 0 && (
                <div className="flex items-center gap-1.5 mt-2 text-emerald-400">
                  <IconActivity className="w-3.5 h-3.5" />
                  <span className="text-xs font-bold">{activeServer.ping} ms</span>
                </div>
              )}
            </div>
          </div>

          {/* Capacity */}
          <div className="mt-4">
            <div className="flex justify-between text-xs mb-2">
              <span className="text-cream-dim">Doluluk</span>
              <span className={`font-bold ${capacityPercent > 80 ? "text-rose-400" : capacityPercent > 50 ? "text-amber-400" : "text-emerald-400"}`}>
                %{capacityPercent}
              </span>
            </div>
            <div className="h-2 rounded-full bg-ink-900 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${capacityPercent > 80 ? "bg-gradient-to-r from-rose-500 to-rose-400" :
                  capacityPercent > 50 ? "bg-gradient-to-r from-amber-500 to-amber-400" :
                    "bg-gradient-to-r from-gold-500 to-gold-400"
                  }`}
                style={{ width: `${capacityPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-cream-dim/60 mt-1">
              <span>{activeServer.online.toLocaleString()} oyuncu</span>
              <span>{activeServer.cap.toLocaleString()} kapasite</span>
            </div>
          </div>

          {/* Download Button */}
          <div className="mt-auto pt-4">
            <button className="gold-btn w-full h-12 rounded-xl flex items-center justify-center gap-2 font-bold">
              <IconDownload className="w-5 h-5" />
              Oyunu Indir
            </button>
          </div>
        </div>
      </div>

      {/* Server Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-ink-950/80 backdrop-blur-sm flex items-center justify-center z-[100]"
          onClick={(e) => e.target === e.currentTarget && setModalOpen(false)}
        >
          <div className="w-[min(720px,92vw)] max-h-[88vh] overflow-auto bg-gradient-to-b from-ink-800 to-ink-900 border border-gold-500/20 rounded-2xl shadow-[0_40px_80px_-16px_rgba(0,0,0,0.8),0_0_0_1px_rgba(245,184,54,0.1)_inset]">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-line">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gold-500/15 text-gold-400 flex items-center justify-center">
                  <IconServer className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-cream leading-tight">Sunucu Sec</h3>
                  <p className="text-xs text-muted leading-tight">Oynamak istedigin sunucuyu sec</p>
                </div>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="w-9 h-9 rounded-md hover:bg-ink-700 text-cream-dim hover:text-gold-300 flex items-center justify-center"
              >
                <IconX className="w-[18px] h-[18px]" />
              </button>
            </div>

            {/* Server List */}
            <div className="p-5 space-y-3">
              {servers.map((server) => {
                const pct = Math.round((server.online / server.cap) * 100)
                const isSelected = tempSelectedServer === server.id

                return (
                  <div
                    key={server.id}
                    onClick={() => setTempSelectedServer(server.id)}
                    className={`grid grid-cols-[56px_1fr_auto] gap-3.5 p-3.5 border rounded-xl cursor-pointer transition-all items-center ${isSelected
                      ? "border-gold-400 bg-gold-500/[0.06] shadow-[0_0_0_1px_rgba(245,184,54,0.2)_inset]"
                      : "border-line bg-white/[0.01] hover:border-gold-500 hover:bg-gold-500/[0.04]"
                      }`}
                  >
                    <div className="w-14 h-14 rounded-[10px] bg-gradient-to-br from-gold-500/20 to-violet-500/20 border border-line flex items-center justify-center text-gold-400">
                      <IconServer className="w-6 h-6" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-cream truncate">{server.name}</h4>
                        <StatusBadge status={server.status} />
                      </div>
                      <p className="text-xs text-cream-dim mt-1">{server.desc}</p>
                      <div className="mt-2 h-1 rounded-full bg-ink-800 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-gold-400 to-gold-600"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                    <div className="shrink-0">
                      {server.ping > 0 && (
                        <div className="flex items-center gap-1.5 text-emerald-400">
                          <IconActivity className="w-4 h-4" />
                          <span className="text-sm font-bold">{server.ping}</span>
                          <span className="text-[10px] text-cream-dim">ms</span>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-line flex items-center justify-between gap-3 bg-ink-900/40">
              <p className="text-xs text-muted">Ipucu: bakim altindaki sunucuya giris yapamazsin.</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setModalOpen(false)}
                  className="outline-btn h-10 px-4 rounded-md text-sm text-cream"
                >
                  Vazgec
                </button>
                <button
                  onClick={confirmServer}
                  className="gold-btn h-10 px-5 rounded-md text-sm font-semibold flex items-center gap-2"
                >
                  <IconCheck className="w-4 h-4" /> Secimi Onayla
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
})
