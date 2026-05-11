"use client"

import { useState } from "react"
import {
  IconServer,
  IconHeadset,
  IconBrandDiscord,
  IconDownload,
  IconBrandFacebook,
  IconBrandInstagram,
  IconMessage,
} from "@tabler/icons-react"

interface QuickActionsProps {
  onServerClick?: () => void
}

const actions = [
  { id: "server", icon: IconServer, label: "Sunucu Seç", color: "hover:border-emerald-500/50 hover:text-emerald-400", hasIndicator: true },
  { id: "discord", icon: IconBrandDiscord, label: "Discord", color: "hover:border-violet-500/50 hover:text-violet-400" },
  { id: "support", icon: IconHeadset, label: "Destek", color: "hover:border-sky-500/50 hover:text-sky-400" },
  { id: "message", icon: IconMessage, label: "Mesajlar", color: "hover:border-amber-500/50 hover:text-amber-400" },
  { id: "download", icon: IconDownload, label: "İndir", color: "hover:border-gold-500/50 hover:text-gold-400" },
]

export function QuickActions({ onServerClick }: QuickActionsProps) {
  const [hoveredAction, setHoveredAction] = useState<string | null>(null)

  const handleClick = (id: string) => {
    if (id === "server" && onServerClick) {
      onServerClick()
    }
  }

  return (
    <aside className="hidden lg:flex fixed right-3 top-1/2 -translate-y-1/2 z-30 flex-col gap-1.5 p-1.5 rounded-2xl bg-ink-900/90 border border-line backdrop-blur-sm">
      {actions.map((action) => (
        <div key={action.id} className="relative group">
          <button
            onClick={() => handleClick(action.id)}
            onMouseEnter={() => setHoveredAction(action.id)}
            onMouseLeave={() => setHoveredAction(null)}
            className={`relative w-10 h-10 rounded-xl bg-ink-800/80 border border-transparent text-cream-dim flex items-center justify-center transition-all duration-200 ${action.color}`}
          >
            <action.icon className="w-5 h-5" />
            {action.hasIndicator && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-400 dot-pulse" />
            )}
          </button>
          
          {/* Tooltip */}
          <div
            className={`absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-ink-800 border border-line text-sm text-cream font-medium whitespace-nowrap transition-all duration-200 shadow-xl ${
              hoveredAction === action.id
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-2 pointer-events-none"
            }`}
          >
            {action.label}
            {/* Arrow */}
            <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rotate-45 bg-ink-800 border-r border-t border-line" />
          </div>
        </div>
      ))}
    </aside>
  )
}
