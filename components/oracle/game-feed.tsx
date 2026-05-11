"use client"

import { useState, useEffect } from "react"
import {
  IconRss,
  IconX,
  IconStack2,
  IconArrowUp,
  IconUsers,
  IconSwords,
  IconSword,
  IconSpeakerphone,
  IconCircleFilled,
  IconChevronRight,
} from "@tabler/icons-react"

type FeedTab = "all" | "upgrade" | "duyuru" | "pve" | "pvp"

interface FeedItem {
  type: "pvp" | "upgrade" | "duyuru" | "pve"
  message: string
  time: string
}

interface GameFeedProps {
  defaultOpen?: boolean
}

const feedItems: FeedItem[] = [
  { type: "pvp", message: "Mage killed Priest from Karus in Eslant", time: "42 dk önce" },
  { type: "pvp", message: "Mage defeated Warrior from El Morad in RonarkLand", time: "48 dk önce" },
  { type: "upgrade", message: "Rogue: +8 Dagger of Poison +1 rebirth upgrade succeeded", time: "50 dk önce" },
  { type: "duyuru", message: "BDW event 15 dakika sonra başlayacak", time: "53 dk önce" },
  { type: "pve", message: "Player obtained Dyna Elixir(+0) from Ultima", time: "55 dk önce" },
  { type: "pvp", message: "Archer killed Rogue from Karus in Border Defense War", time: "58 dk önce" },
  { type: "upgrade", message: "Warrior: +9 Shard of Hell upgrade succeeded", time: "1 saat önce" },
  { type: "duyuru", message: "Clan recruitment thread güncellendi — yeni klan listesi yayında.", time: "1 saat önce" },
]

const tabs: { id: FeedTab; label: string; icon: React.ReactNode }[] = [
  { id: "all", label: "Hepsi", icon: <IconStack2 className="w-3 h-3" /> },
  { id: "upgrade", label: "Upgrade", icon: <IconArrowUp className="w-3 h-3" /> },
  { id: "duyuru", label: "Duyuru", icon: <IconSpeakerphone className="w-3 h-3" /> },
  { id: "pve", label: "PVE", icon: <IconUsers className="w-3 h-3" /> },
  { id: "pvp", label: "PVP", icon: <IconSwords className="w-3 h-3" /> },
]

const typeStyles = {
  pvp: { bg: "bg-rose-500/15", text: "text-rose-400", icon: <IconSword className="w-4 h-4" />, label: "PVP" },
  upgrade: { bg: "bg-emerald-500/15", text: "text-emerald-400", icon: <IconArrowUp className="w-4 h-4" />, label: "UPGRADE" },
  duyuru: { bg: "bg-sky-500/15", text: "text-sky-400", icon: <IconSpeakerphone className="w-4 h-4" />, label: "DUYURU" },
  pve: { bg: "bg-violet-500/15", text: "text-violet-400", icon: <IconCircleFilled className="w-4 h-4" />, label: "PVE" },
}

export function GameFeed({ defaultOpen = false }: GameFeedProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const [activeTab, setActiveTab] = useState<FeedTab>("all")

  const filteredItems = activeTab === "all" ? feedItems : feedItems.filter((item) => item.type === activeTab)

  return (
    <div className="fixed left-3 bottom-20 lg:bottom-4 z-30 flex items-end gap-2">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
          isOpen 
            ? "bg-gold-500 text-ink-900 shadow-lg shadow-gold-500/30" 
            : "bg-ink-800 border border-line text-cream hover:border-gold-500/50 hover:text-gold-400"
        }`}
      >
        <IconRss className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-0" : ""}`} />
        {/* Live indicator */}
        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-500 border-2 border-ink-900 dot-pulse" />
      </button>

      {/* Feed Panel */}
      <div
        className={`dock overflow-hidden flex flex-col transition-all duration-300 ease-out origin-bottom-left ${
          isOpen 
            ? "opacity-100 scale-100 w-[320px] max-h-[480px]" 
            : "opacity-0 scale-95 w-0 max-h-0 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="px-4 py-3 flex items-center justify-between border-b border-line shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md gold-btn flex items-center justify-center">
              <IconRss className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-cream leading-tight text-sm">Oyun Akışı</div>
              <div className="text-[10px] text-muted leading-tight">Canlı event feed</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-[10px] text-green-400">
              <span className="w-2 h-2 rounded-full bg-green-400 dot-pulse" />
              CANLI
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-md hover:bg-ink-700/60 text-cream-dim hover:text-gold-300 flex items-center justify-center"
              title="Kapat"
            >
              <IconX className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-3 py-2.5 flex flex-wrap items-center gap-1 border-b border-line shrink-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`tab-pill rounded-md px-2 h-6 text-[10px] font-semibold flex items-center gap-1 transition ${
                activeTab === tab.id ? "active" : "text-cream-dim"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Feed List */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-slim">
          <ul className="divide-y divide-line">
            {filteredItems.map((item, i) => {
              const style = typeStyles[item.type]
              return (
                <li key={i} className="p-3 flex gap-2.5 hover:bg-ink-800/60 transition">
                  <div className={`w-8 h-8 rounded-md ${style.bg} ${style.text} flex items-center justify-center shrink-0`}>
                    {style.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex justify-between items-center">
                      <span className={`text-[10px] font-bold ${style.text} tracking-wider`}>{style.label}</span>
                      <span className="text-[10px] text-muted">{item.time}</span>
                    </div>
                    <p className="text-[12px] text-cream/90 mt-0.5 leading-snug">{item.message}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}
