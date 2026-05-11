"use client"

import Link from "next/link"
import {
  IconBell,
  IconGift,
  IconSword,
  IconUsers,
  IconCoins,
  IconTrophy,
  IconSettings,
  IconCheck,
} from "@tabler/icons-react"

interface Notification {
  id: string
  type: "gift" | "pvp" | "clan" | "coin" | "trophy" | "system"
  title: string
  message: string
  time: string
  read: boolean
}

const notifications: Notification[] = [
  {
    id: "1",
    type: "gift",
    title: "Gunluk Odul",
    message: "Gunluk giris odulunn hazir! 500 OG Coin kazandin.",
    time: "5 dk once",
    read: false,
  },
  {
    id: "2",
    type: "pvp",
    title: "PvP Zafer",
    message: "Ronark Land savasinda 15 kill aldın!",
    time: "1 saat once",
    read: false,
  },
  {
    id: "3",
    type: "clan",
    title: "Klan Daveti",
    message: "BrutalGuard klanı seni davet ediyor.",
    time: "2 saat once",
    read: false,
  },
  {
    id: "4",
    type: "coin",
    title: "Bakiye Yuklendi",
    message: "Hesabiniza 1000 OG Coin yuklendi.",
    time: "3 saat once",
    read: true,
  },
  {
    id: "5",
    type: "trophy",
    title: "Yeni Basarim",
    message: "100 Kill basarimini kazandin!",
    time: "1 gun once",
    read: true,
  },
]

const getIcon = (type: string) => {
  switch (type) {
    case "gift":
      return <IconGift className="w-4 h-4" />
    case "pvp":
      return <IconSword className="w-4 h-4" />
    case "clan":
      return <IconUsers className="w-4 h-4" />
    case "coin":
      return <IconCoins className="w-4 h-4" />
    case "trophy":
      return <IconTrophy className="w-4 h-4" />
    default:
      return <IconBell className="w-4 h-4" />
  }
}

const getIconBg = (type: string) => {
  switch (type) {
    case "gift":
      return "bg-emerald-500/20 text-emerald-400"
    case "pvp":
      return "bg-rose-500/20 text-rose-400"
    case "clan":
      return "bg-violet-500/20 text-violet-400"
    case "coin":
      return "bg-gold-500/20 text-gold-400"
    case "trophy":
      return "bg-amber-500/20 text-amber-400"
    default:
      return "bg-ink-700 text-cream-dim"
  }
}

interface NotificationsDropdownProps {
  isOpen: boolean
  onClose: () => void
}

export function NotificationsDropdown({ isOpen, onClose }: NotificationsDropdownProps) {
  const unreadCount = notifications.filter((n) => !n.read).length

  if (!isOpen) return null

  return (
    <div className="absolute top-full right-0 mt-2 w-80 bg-ink-800 border border-gold-500/20 rounded-xl shadow-2xl shadow-black/50 overflow-hidden z-50">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-line bg-gradient-to-r from-gold-500/5 to-transparent">
        <div className="flex items-center gap-2">
          <IconBell className="w-4 h-4 text-gold-400" />
          <span className="text-sm font-bold text-cream">Bildirimler</span>
          {unreadCount > 0 && (
            <span className="bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button className="text-xs text-gold-400 hover:text-gold-300 flex items-center gap-1">
            <IconCheck className="w-3 h-3" />
            Tumunu oku
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-h-[360px] overflow-y-auto scrollbar-slim">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex gap-3 px-4 py-3 hover:bg-ink-700/50 transition-colors cursor-pointer border-b border-line/50 last:border-b-0 ${
              !notification.read ? "bg-gold-500/5" : ""
            }`}
          >
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${getIconBg(notification.type)}`}>
              {getIcon(notification.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className={`text-sm font-semibold ${!notification.read ? "text-cream" : "text-cream-dim"}`}>
                  {notification.title}
                </span>
                {!notification.read && (
                  <span className="w-2 h-2 rounded-full bg-gold-400 shrink-0" />
                )}
              </div>
              <p className="text-xs text-cream-dim/80 mt-0.5 line-clamp-2">{notification.message}</p>
              <span className="text-[10px] text-muted mt-1 block">{notification.time}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-line flex items-center justify-between">
        <Link
          href="/bildirimler"
          onClick={onClose}
          className="text-xs text-gold-400 hover:text-gold-300 font-medium"
        >
          Tum Bildirimleri Gor
        </Link>
        <Link
          href="/ayarlar/bildirimler"
          onClick={onClose}
          className="text-cream-dim hover:text-cream transition-colors"
        >
          <IconSettings className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}
