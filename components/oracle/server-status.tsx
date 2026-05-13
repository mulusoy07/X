"use client"

import { useImperativeHandle, useState, forwardRef } from "react"
import {
  IconServer,
  IconChevronDown,
  IconDownload,
  IconBolt,
  IconArrowRight,
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
  {
    id: "s1",
    name: "Server 1",
    desc: "Oracle · Klasik PvP · v2100 · 64-bit",
    status: "online",
    online: 1842,
    cap: 3000,
    ping: 32,
  },
  {
    id: "s2",
    name: "Server 2",
    desc: "Karus · Yuksek populasyon · Dusuk drop",
    status: "online",
    online: 2310,
    cap: 3000,
    ping: 45,
  },
  {
    id: "s3",
    name: "Server 3",
    desc: "Aegis · Yeni baslangic sunucusu · 2x XP",
    status: "maintenance",
    online: 0,
    cap: 3000,
    ping: 0,
  },
  {
    id: "s4",
    name: "Server 4",
    desc: "Ronark · Hardcore PvE · PK kapali",
    status: "offline",
    online: 0,
    cap: 3000,
    ping: 0,
  },
]

const stMap = {
  online: {
    dot: "bg-emerald-400",
    text: "text-emerald-400",
    label: "Online",
    hex: "#34d399",
  },
  maintenance: {
    dot: "bg-amber-400",
    text: "text-amber-400",
    label: "Bakim",
    hex: "#fbbf24",
  },
  offline: {
    dot: "bg-rose-400",
    text: "text-rose-400",
    label: "Offline",
    hex: "#fb7185",
  },
} as const

const pingTone = (ping: number) =>
  ping === 0
    ? "text-cream-dim/50"
    : ping < 60
      ? "text-emerald-400"
      : ping < 120
        ? "text-amber-400"
        : "text-rose-400"

function useServerSel() {
  const [id, setId] = useState("s1")
  const [open, setOpen] = useState(false)
  const active = servers.find((server) => server.id === id) || servers[0]
  const cap = Math.round((active.online / active.cap) * 100)

  return { id, setId, open, setOpen, active, cap }
}

function CapBar({ pct }: { pct: number; variant?: "segmented" }) {
  const tone = pct > 80 ? "text-rose-400" : pct > 50 ? "text-amber-400" : "text-emerald-400"
  const bg =
    pct > 80
      ? "from-rose-500 to-rose-400"
      : pct > 50
        ? "from-amber-500 to-amber-400"
        : "from-gold-500 to-gold-400"
  const segs = 20
  const filled = Math.round((pct / 100) * segs)

  return (
    <div className="rounded-xl border border-line bg-white/[0.02] p-3">
      <div className="flex items-center gap-2">
        <span className="text-[10px] uppercase tracking-wider text-cream-dim">Doluluk</span>
        <div className="flex flex-1 gap-[2px]">
          {Array.from({ length: segs }).map((_, i) => (
            <span
              key={i}
              className={`h-2 flex-1 rounded-[1px] ${i < filled ? `bg-gradient-to-r ${bg}` : "bg-cream-dim/15"}`}
            />
          ))}
        </div>
        <span className={`text-xs font-bold tabular-nums ${tone}`}>%{pct}</span>
      </div>
    </div>
  )
}

function DownloadBtn(_: { shape?: "default" }) {
  return (
    <button className="group relative w-full h-11 rounded-xl bg-gradient-to-b from-gold-400 to-gold-500 text-ink-950 font-bold text-sm overflow-hidden hover:brightness-110 transition">
      {/* Shimmer sweep effect */}
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      {/* Content with slide effect */}
      <span className="relative flex items-center justify-center gap-2 transition-transform duration-300 group-hover:-translate-x-2">
        <IconDownload className="h-4 w-4" />
        Oyunu Indir
      </span>
      {/* Arrow reveal on hover */}
      <IconArrowRight className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
    </button>
  )
}

export interface ServerStatusHandle {
  openModal: () => void
}

export const ServerStatus = forwardRef<ServerStatusHandle>(function ServerStatus(_, ref) {
  const { id, setId, open, setOpen, active, cap } = useServerSel()
  const st = stMap[active.status]

  useImperativeHandle(ref, () => ({
    openModal: () => setOpen(true),
  }))

  return (
    <div className="rounded-2xl border border-line bg-gradient-to-br from-ink-800/90 via-ink-900/90 to-ink-950 p-4 space-y-3 max-w-md">
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="w-full text-left rounded-xl border border-line hover:border-gold-500/40 bg-white/[0.02] p-3 transition-colors group"
        >
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-gold-400/30 to-gold-600/10 border border-gold-500/30 flex items-center justify-center shrink-0">
              <IconServer className="h-5 w-5 text-gold-300" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-cream font-bold text-base truncate">{active.name}</h3>
                <IconChevronDown
                  className={`h-4 w-4 text-cream-dim transition-transform ${open ? "rotate-180" : ""}`}
                />
              </div>
              <p className="text-[11px] text-cream-dim/80 truncate mt-0.5">{active.desc}</p>
              <div className="flex items-center gap-3 mt-2 pt-2 border-t border-line/60">
                <div className="flex items-center gap-1.5">
                  <span className={`h-2 w-2 rounded-full ${st.dot} animate-pulse`} />
                  <span className={`text-[11px] font-semibold ${st.text}`}>{st.label}</span>
                </div>
                <div className="ml-auto flex items-center gap-1 tabular-nums">
                  <IconBolt className={`h-3.5 w-3.5 ${pingTone(active.ping)}`} />
                  <span className={`text-sm font-bold ${pingTone(active.ping)}`}>{active.ping || "—"}</span>
                  <span className="text-[10px] text-cream-dim">ms</span>
                </div>
              </div>
            </div>
          </div>
        </button>
        {open && (
          <div className="absolute z-20 mt-2 w-full rounded-xl border border-line bg-ink-900/95 backdrop-blur p-2 space-y-1.5 shadow-2xl">
            {servers
              .filter((server) => server.status !== "offline")
              .map((server) => (
                <button
                  key={server.id}
                  onClick={() => {
                    setId(server.id)
                    setOpen(false)
                  }}
                  className={`w-full flex items-center gap-2.5 p-2 rounded-lg text-left ${
                    id === server.id
                      ? "bg-gold-500/10 border border-gold-400/40"
                      : "border border-transparent hover:bg-white/[0.03]"
                  }`}
                >
                  <div className="h-8 w-8 rounded-lg bg-gold-500/15 border border-gold-500/30 flex items-center justify-center">
                    <IconServer className="h-4 w-4 text-gold-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-cream text-sm font-semibold truncate">{server.name}</div>
                    <div className="text-[10px] text-cream-dim/70 truncate">{server.desc}</div>
                  </div>
                  <span className={`h-2 w-2 rounded-full ${stMap[server.status].dot}`} />
                  <span className={`text-xs font-bold tabular-nums ${pingTone(server.ping)}`}>
                    {server.ping || "—"}ms
                  </span>
                </button>
              ))}
          </div>
        )}
      </div>
      <CapBar pct={cap} variant="segmented" />
      <DownloadBtn shape="default" />
    </div>
  )
})
