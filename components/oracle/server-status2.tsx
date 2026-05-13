"use client"

import { forwardRef, useImperativeHandle, useState } from "react"
import {
  IconServer,
  IconChevronDown,
  IconCircleCheck,
  IconTool,
  IconDownload,
  IconX,
  IconCheck,
  IconWifi,
  IconArrowRight,
} from "@tabler/icons-react"

interface ServerData {
  id: string
  name: string
  short: string
  region: string
  xp: string
  desc: string
  status: "online" | "maintenance" | "offline"
  online: number
  cap: number
  ping: number
}

const servers: ServerData[] = [
  {
    id: "s1",
    name: "Agartha",
    short: "Oracle",
    region: "EU",
    xp: "x3",
    desc: "Klasik PvP · v2100 · 64-bit",
    status: "online",
    online: 1842,
    cap: 3000,
    ping: 32,
  },
  {
    id: "s2",
    name: "Karus",
    short: "Karus",
    region: "EU",
    xp: "x1",
    desc: "Yuksek populasyon · Dusuk drop",
    status: "online",
    online: 2310,
    cap: 3000,
    ping: 45,
  },
  {
    id: "s3",
    name: "Aegis",
    short: "Aegis",
    region: "NA",
    xp: "x2",
    desc: "Yeni baslangic sunucusu",
    status: "maintenance",
    online: 0,
    cap: 3000,
    ping: 0,
  },
  {
    id: "s4",
    name: "Ronark",
    short: "Ronark",
    region: "EU",
    xp: "x1",
    desc: "Hardcore PvE · PK kapali",
    status: "offline",
    online: 0,
    cap: 3000,
    ping: 0,
  },
]

const statusMap = {
  online: {
    dot: "bg-emerald-400",
    ring: "shadow-[0_0_0_3px_rgba(52,211,153,0.18)]",
    text: "text-emerald-400",
    label: "Online",
  },
  maintenance: {
    dot: "bg-amber-400",
    ring: "shadow-[0_0_0_3px_rgba(251,191,36,0.18)]",
    text: "text-amber-400",
    label: "Bakim",
  },
  offline: {
    dot: "bg-rose-400",
    ring: "shadow-[0_0_0_3px_rgba(244,63,94,0.18)]",
    text: "text-rose-400",
    label: "Offline",
  },
} as const

function HeroMetaSelect({
  server,
  open,
  onToggle,
}: {
  server: ServerData
  open: boolean
  onToggle: () => void
}) {
  const st = statusMap[server.status]
  const pingClass =
    server.ping === 0
      ? "text-cream-dim/50"
      : server.ping < 60
        ? "text-emerald-400"
        : server.ping < 120
          ? "text-amber-400"
          : "text-rose-400"

  return (
    <button type="button" onClick={onToggle} className="group relative w-full text-left">
      <div className="flex items-stretch gap-0 overflow-hidden rounded-2xl border border-line bg-gradient-to-b from-white/[0.04] to-white/[0.01] backdrop-blur-md transition-colors hover:border-gold-500/30">
        <div className="flex min-w-0 flex-1 items-center gap-3 py-3 pl-4 pr-5">
          <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-gold-500/30 bg-gradient-to-br from-gold-400/25 to-gold-500/5">
            <IconServer className="h-4 w-4 text-gold-300" stroke={2.2} />
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-lg font-bold leading-none text-cream">{server.name}</h3>
            <p className="mt-1.5 truncate text-[11px] text-cream-dim/80">{server.desc}</p>
          </div>
        </div>

        <div className="w-px bg-gradient-to-b from-transparent via-line to-transparent" />

        <div className="flex items-center gap-2.5 px-4 py-3">
          <span className={`relative inline-flex h-2 w-2 rounded-full ${st.dot} ${st.ring}`}>
            {server.status === "online" && (
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-60" />
            )}
          </span>
          <span className={`text-xs font-semibold ${st.text}`}>{st.label}</span>
        </div>

        <div className="w-px bg-gradient-to-b from-transparent via-line to-transparent" />

        <div className="flex items-center gap-2 px-4 py-3">
          <IconWifi className={`h-3.5 w-3.5 ${pingClass}`} stroke={2.2} />
          <div className="flex items-baseline gap-1 tabular-nums">
            <span className={`text-sm font-bold ${pingClass}`}>{server.ping === 0 ? "—" : server.ping}</span>
            <span className="text-[10px] font-medium text-cream-dim/60">ms</span>
          </div>
        </div>

        <div className="w-px bg-gradient-to-b from-transparent via-line to-transparent" />

        <div className="flex items-center px-3 py-3">
          <IconChevronDown
            className={`h-4 w-4 text-cream-dim transition-transform group-hover:text-gold-300 ${open ? "rotate-180" : ""}`}
          />
        </div>
      </div>
    </button>
  )
}

export interface ServerStatus2Handle {
  openModal: () => void
}

export const ServerStatus2 = forwardRef<ServerStatus2Handle>(function ServerStatus2(_, ref) {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedServer, setSelectedServer] = useState("s1")
  const [tempSelectedServer, setTempSelectedServer] = useState("s1")
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const activeServer = servers.find((server) => server.id === selectedServer) || servers[0]
  const capacityPercent = Math.round((activeServer.online / activeServer.cap) * 100)

  useImperativeHandle(ref, () => ({
    openModal: () => {
      setTempSelectedServer(selectedServer)
      setModalOpen(true)
    },
  }))

  const confirmServer = () => {
    setSelectedServer(tempSelectedServer)
    setModalOpen(false)
  }

  return (
    <>
      <div className="max-w-md space-y-4 rounded-2xl border border-line bg-gradient-to-b from-ink-800/80 to-ink-900/90 p-4">
        <div className="relative">
          <HeroMetaSelect
            server={activeServer}
            open={dropdownOpen}
            onToggle={() => setDropdownOpen(!dropdownOpen)}
          />

          {dropdownOpen && (
            <div className="absolute z-20 mt-2 w-full space-y-1.5 overflow-hidden rounded-2xl border border-line bg-ink-900/95 p-1.5 shadow-2xl backdrop-blur">
              {servers
                .filter((server) => server.status !== "offline")
                .map((server) => {
                  const st = statusMap[server.status]
                  const pingClass =
                    server.ping === 0
                      ? "text-cream-dim/50"
                      : server.ping < 60
                        ? "text-emerald-400"
                        : server.ping < 120
                          ? "text-amber-400"
                          : "text-rose-400"
                  const isActive = selectedServer === server.id

                  return (
                    <button
                      key={server.id}
                      onClick={() => {
                        setSelectedServer(server.id)
                        setDropdownOpen(false)
                      }}
                      className={`w-full overflow-hidden rounded-xl border text-left transition-colors ${isActive
                          ? "border-gold-400/60 bg-gold-500/[0.06]"
                          : "border-line bg-white/[0.02] hover:border-gold-500/30"
                        }`}
                    >
                      <div className="flex items-stretch gap-0">
                        <div className="flex min-w-0 flex-1 items-center gap-3 py-2.5 pl-3 pr-4">
                          <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-gold-500/30 bg-gradient-to-br from-gold-400/25 to-gold-500/5">
                            <IconServer className="h-3.5 w-3.5 text-gold-300" stroke={2.2} />
                          </div>
                          <div className="min-w-0">
                            <span className="truncate text-sm font-semibold text-cream">{server.name}</span>
                            <p className="mt-0.5 truncate text-[11px] text-cream-dim/80">{server.desc}</p>
                          </div>
                        </div>

                        <div className="w-px bg-gradient-to-b from-transparent via-line to-transparent" />

                        <div className="flex items-center gap-2 px-3 py-2.5">
                          <span className={`h-2 w-2 rounded-full ${st.dot}`} />
                          <span className={`text-[11px] font-semibold ${st.text}`}>{st.label}</span>
                        </div>

                        <div className="w-px bg-gradient-to-b from-transparent via-line to-transparent" />

                        <div className="flex items-center gap-1.5 px-3 py-2.5 tabular-nums">
                          <IconWifi className={`h-3.5 w-3.5 ${pingClass}`} stroke={2.2} />
                          <span className={`text-xs font-bold ${pingClass}`}>{server.ping === 0 ? "—" : server.ping}</span>
                          <span className="text-[10px] text-cream-dim/60">ms</span>
                        </div>

                        <div className="flex items-center pr-3">{isActive && <IconCheck className="h-4 w-4 text-gold-400" />}</div>
                      </div>
                    </button>
                  )
                })}
            </div>
          )}
        </div>

        <div className="rounded-xl border border-line bg-white/[0.02] p-3">
          {(() => {
            const segments = 20
            const filled = Math.round((capacityPercent / 100) * segments)
            const tone =
              capacityPercent > 80
                ? "text-rose-400"
                : capacityPercent > 50
                  ? "text-amber-400"
                  : "text-emerald-400"
            const bg =
              capacityPercent > 80
                ? "from-rose-500 to-rose-400"
                : capacityPercent > 50
                  ? "from-amber-500 to-amber-400"
                  : "from-gold-500 to-gold-400"

            return (
              <>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-wider text-cream-dim">Doluluk</span>
                  <div className="flex flex-1 gap-[2px]">
                    {Array.from({ length: segments }).map((_, index) => (
                      <span
                        key={index}
                        className={`h-2 flex-1 rounded-[1px] ${index < filled ? `bg-gradient-to-r ${bg}` : "bg-cream-dim/15"}`}
                      />
                    ))}
                  </div>
                  <span className={`text-xs font-bold tabular-nums ${tone}`}>%{capacityPercent}</span>
                </div>
              </>
            )
          })()}
        </div>

        <button className="group relative w-full h-11 rounded-xl bg-gradient-to-b from-gold-400 to-gold-500 text-ink-950 font-bold text-sm overflow-hidden hover:brightness-110 transition">
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          <span className="relative flex items-center justify-center gap-2 transition-transform duration-300 group-hover:-translate-x-2">
            <IconDownload className="h-4 w-4" />
            Oyunu Indir
          </span>
          <IconArrowRight className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
        </button>
      </div>

      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={(event) => event.target === event.currentTarget && setModalOpen(false)}
        >
          <div className="w-full max-w-lg space-y-4 rounded-2xl border border-line bg-ink-900 p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-gold-500/20 bg-gold-500/10">
                  <IconServer className="h-5 w-5 text-gold-400" />
                </div>
                <div>
                  <h3 className="font-bold text-cream">Sunucu Sec</h3>
                  <p className="text-xs text-cream-dim">Oynamak istedigin sunucuyu sec</p>
                </div>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-md text-cream-dim hover:bg-ink-700 hover:text-gold-300"
              >
                <IconX className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-[60vh] space-y-2 overflow-auto">
              {servers.map((server) => {
                const isSelected = tempSelectedServer === server.id

                return (
                  <button
                    key={server.id}
                    onClick={() => setTempSelectedServer(server.id)}
                    className={`grid w-full grid-cols-[40px_1fr_auto] items-center gap-3 rounded-xl border p-3 text-left transition-all ${isSelected
                        ? "border-gold-400 bg-gold-500/[0.06]"
                        : "border-line bg-white/[0.01] hover:border-gold-500/40"
                      }`}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-gold-500/20 bg-gold-500/10">
                      <span className="text-[10px] font-black text-gold-300">{server.xp.toUpperCase()}</span>
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-cream">{server.name}</span>
                        {server.status === "online" && <IconCircleCheck className="h-3.5 w-3.5 text-emerald-400" />}
                        {server.status === "maintenance" && <IconTool className="h-3.5 w-3.5 text-amber-400" />}
                      </div>
                      <p className="truncate text-[11px] text-cream-dim">{server.desc}</p>
                    </div>
                    <div className="text-right">
                      {server.ping > 0 && (
                        <div className="flex items-center gap-1 tabular-nums">
                          <span className={`text-sm font-bold ${statusMap[server.status].text}`}>{server.ping}</span>
                          <span className="text-[10px] text-cream-dim">ms</span>
                        </div>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-line pt-2">
              <p className="text-[11px] text-cream-dim">Ipucu: bakim altindaki sunucuya giris yapamazsin.</p>
              <div className="flex gap-2">
                <button
                  onClick={() => setModalOpen(false)}
                  className="h-10 rounded-md border border-line px-4 text-sm text-cream hover:bg-ink-700"
                >
                  Vazgec
                </button>
                <button
                  onClick={confirmServer}
                  className="h-10 rounded-md bg-gradient-to-b from-gold-400 to-gold-500 px-4 text-sm font-bold text-ink-950"
                >
                  Secimi Onayla
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
})
