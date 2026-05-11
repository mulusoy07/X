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
  { id: "s2", name: "Server 2 — Karus", desc: "Yüksek populasyon · Düşük drop", status: "online", online: 2310, cap: 3000, ping: 45 },
  { id: "s3", name: "Server 3 — Aegis", desc: "Yeni başlangıç sunucusu · 2x XP", status: "maintenance", online: 0, cap: 3000, ping: 0 },
  { id: "s4", name: "Server 4 — Ronark", desc: "Hardcore PvE · PK kapalı", status: "offline", online: 0, cap: 3000, ping: 0 },
]

function StatusBadge({ status }: { status: "online" | "maintenance" | "offline" }) {
  const configs = {
    online: {
      className: "border-emerald-500/40 bg-emerald-500/10 text-emerald-400",
      icon: <IconCircleCheck className="w-3 h-3" />,
      label: "Çevrimiçi"
    },
    maintenance: {
      className: "border-amber-500/40 bg-amber-500/10 text-amber-400",
      icon: <IconTool className="w-3 h-3" />,
      label: "Bakım"
    },
    offline: {
      className: "border-rose-500/40 bg-rose-500/10 text-rose-400",
      icon: <IconX className="w-3 h-3" />,
      label: "Çevrimdışı"
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

  return (
    <>
      <div className="card rounded-xl p-4 space-y-4">
        {/* Server Selector Button */}
        <button
          onClick={openModal}
          className="w-full h-11 rounded-lg flex items-center gap-3 px-3 text-sm border border-line bg-gradient-to-b from-ink-800 to-ink-900 hover:border-gold-500 transition group"
        >
          <span className="w-8 h-8 rounded-md bg-gold-500/15 text-gold-400 flex items-center justify-center">
            <IconServer className="w-[18px] h-[18px]" />
          </span>
          <span className="flex-1 text-left">
            <span className="block text-[10px] uppercase tracking-[0.2em] text-muted leading-none">Aktif Sunucu</span>
            <span className="block font-semibold text-cream leading-tight mt-0.5">{activeServer.name}</span>
          </span>
          <IconChevronDown className="w-4 h-4 text-cream-dim group-hover:text-gold-300" />
        </button>

        {/* Status Badges */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/5 p-3 flex items-center gap-2">
            <IconCircleCheck className="w-[18px] h-[18px] text-emerald-400" />
            <div className="flex-1">
              <div className="text-[11px] text-cream-dim leading-tight">Oyun Sunucusu</div>
              <div className="text-sm font-bold text-emerald-400 leading-tight">Çevrimiçi</div>
            </div>
          </div>
          <div className="rounded-lg border border-amber-500/40 bg-amber-500/5 p-3 flex items-center gap-2">
            <IconTool className="w-[18px] h-[18px] text-amber-400" />
            <div className="flex-1">
              <div className="text-[11px] text-cream-dim leading-tight">Giriş Sunucusu</div>
              <div className="text-sm font-bold text-amber-400 leading-tight">Bakım</div>
            </div>
          </div>
        </div>

        {/* Capacity Bar */}
        <div>
          <div className="flex justify-between text-xs">
            <span className="text-cream-dim">Kapasite</span>
            <span className="text-cream-dim">%{capacityPercent}</span>
          </div>
          <div className="mt-2 h-1.5 rounded-full bg-ink-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-gold-400 to-gold-600 transition-all duration-500"
              style={{ width: `${capacityPercent}%` }}
            />
          </div>
        </div>

        {/* Download Button */}
        <button className="gold-btn w-full h-12 rounded-md flex items-center justify-center gap-2 font-bold">
          <IconDownload className="w-4 h-4" />
          Oyunu İndir
        </button>
      </div>

      {/* Server Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-ink-950/75 backdrop-blur-sm flex items-center justify-center z-[100]"
          onClick={(e) => e.target === e.currentTarget && setModalOpen(false)}
        >
          <div className="w-[min(720px,92vw)] max-h-[88vh] overflow-auto bg-gradient-to-b from-ink-800 to-ink-900 border border-gold-600 rounded-2xl shadow-[0_40px_80px_-16px_rgba(0,0,0,0.8),0_0_0_1px_rgba(245,184,54,0.1)_inset]">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-line">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gold-500/15 text-gold-400 flex items-center justify-center">
                  <IconServer className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-cream leading-tight">Sunucu Seç</h3>
                  <p className="text-xs text-muted leading-tight">Oynamak istediğin sunucuyu seç</p>
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
                    className={`grid grid-cols-[56px_1fr_auto] gap-3.5 p-3.5 border rounded-xl cursor-pointer transition-all items-center ${
                      isSelected
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
                    <div className="text-right shrink-0">
                      <div className="text-sm font-bold text-cream">
                        {server.online.toLocaleString("tr-TR")}
                        <span className="text-muted font-normal">/{server.cap.toLocaleString("tr-TR")}</span>
                      </div>
                      {server.ping > 0 && <div className="text-xs text-emerald-400 mt-0.5">{server.ping} ms</div>}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-line flex items-center justify-between gap-3 bg-ink-900/40">
              <p className="text-xs text-muted">İpucu: bakım altındaki sunucuya giriş yapamazsın.</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setModalOpen(false)}
                  className="outline-btn h-10 px-4 rounded-md text-sm text-cream"
                >
                  Vazgeç
                </button>
                <button
                  onClick={confirmServer}
                  className="gold-btn h-10 px-5 rounded-md text-sm font-semibold flex items-center gap-2"
                >
                  <IconCheck className="w-4 h-4" /> Seçimi Onayla
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
})
