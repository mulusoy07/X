"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  IconChevronDown,
  IconUser,
  IconMessage,
  IconSettings,
  IconLogout,
  IconCircleCheck,
  IconBell,
  IconWallet,
  IconLogin,
  IconArrowRight,
  IconSearch,
  IconCrown,
} from "@tabler/icons-react"
import { languages } from "./menu-data"
import { NotificationsDropdown } from "../notifications-dropdown"

interface HeaderActionsProps {
  isLoggedIn: boolean
  username: string
  onOpenSearch: () => void
  onOpenAuth: () => void
  onLogout: () => void
}

export function HeaderActions({
  isLoggedIn,
  username,
  onOpenSearch,
  onOpenAuth,
  onLogout,
}: HeaderActionsProps) {
  const [langDropdownOpen, setLangDropdownOpen] = useState(false)
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState(languages[0])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as Element).closest(".dropdown-container")) {
        setLangDropdownOpen(false)
        setAccountDropdownOpen(false)
        setNotificationsOpen(false)
      }
    }
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [])

  if (isLoggedIn) {
    return (
      <div className="hidden lg:flex items-center gap-3">
        {/* Search + Language Container */}
        <div className="flex items-center bg-ink-800/60 rounded-xl border border-line/50">
          {/* Search */}
          <button 
            onClick={onOpenSearch}
            className="flex items-center gap-2 h-10 px-3 hover:bg-ink-700/50 rounded-l-xl transition-all group border-r border-line/30"
          >
            <IconSearch className="w-4 h-4 text-cream-dim group-hover:text-gold-400 transition-colors" />
          </button>

          {/* Language */}
          <div className="dropdown-container relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-2 h-10 px-3 hover:bg-ink-700/50 rounded-r-xl transition-all group"
            >
              <Image src={currentLang.flag} alt={currentLang.label} width={18} height={13} className="rounded-sm" style={{ width: "18px", height: "13px" }} />
              <span className="text-sm font-medium text-cream">{currentLang.code.toUpperCase()}</span>
              <IconChevronDown className={`w-3 h-3 text-cream-dim transition-transform ${langDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {langDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-44 bg-ink-800/95 backdrop-blur-xl border border-gold-500/20 rounded-xl shadow-2xl overflow-hidden z-[60]">
                <div className="p-1.5">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setCurrentLang(lang)
                        setLangDropdownOpen(false)
                      }}
                      className={`w-full px-3 py-2 rounded-lg flex items-center gap-3 hover:bg-ink-700/50 transition-all ${
                        currentLang.code === lang.code ? "bg-gold-500/10" : ""
                      }`}
                    >
                      <Image src={lang.flag} alt={lang.label} width={22} height={16} className="rounded-sm" style={{ width: "22px", height: "16px" }} />
                      <span className="text-sm text-cream">{lang.label}</span>
                      {currentLang.code === lang.code && (
                        <IconCircleCheck className="w-4 h-4 text-gold-400 ml-auto" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Notifications */}
        <div className="dropdown-container relative">
          <button 
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-ink-800/60 border border-line/50 hover:bg-ink-700/50 transition-all group"
          >
            <IconBell className="w-5 h-5 text-cream-dim group-hover:text-gold-400 transition-colors" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full" />
          </button>
          <NotificationsDropdown 
            isOpen={notificationsOpen} 
            onClose={() => setNotificationsOpen(false)} 
          />
        </div>

        {/* Account Dropdown */}
        <div className="dropdown-container relative">
          <button
            onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
            className="flex items-center gap-3 px-3 py-2 rounded-xl bg-gradient-to-r from-ink-800/80 to-ink-800/40 hover:from-ink-700/80 hover:to-ink-700/40 border border-gold-500/20 hover:border-gold-500/30 transition-all"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center ring-2 ring-gold-500/30">
              <IconUser className="w-5 h-5 text-ink-900" />
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-cream">{username || "OracleKnight"}</div>
              <div className="text-[10px] text-gold-400 flex items-center gap-1">
                <IconCrown className="w-3 h-3" /> Premium
              </div>
            </div>
            <IconChevronDown className={`w-4 h-4 text-cream-dim transition-transform ${accountDropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {accountDropdownOpen && (
            <div className="absolute top-full right-0 mt-2 w-64 bg-ink-800 backdrop-blur-xl border border-gold-500/20 rounded-2xl shadow-2xl overflow-hidden z-[60]">
              <div className="p-4 border-b border-ink-700 bg-gradient-to-r from-gold-500/10 to-transparent">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center ring-2 ring-gold-500/30">
                    <IconUser className="w-6 h-6 text-ink-900" />
                  </div>
                  <div>
                    <div className="font-semibold text-cream">{username || "OracleKnight"}</div>
                    <div className="text-xs text-gold-400 flex items-center gap-1">
                      <IconCrown className="w-3 h-3" /> Premium Uye
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="text-cream-dim">Bakiye</span>
                  <span className="text-gold-400 font-bold">2,450 OG Coin</span>
                </div>
              </div>
              <div className="p-2">
                <Link href="/hesap" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-cream-dim hover:text-cream hover:bg-ink-700/50 transition-colors">
                  <IconUser className="w-4 h-4" />
                  <span>Hesabim</span>
                </Link>
                <Link href="/hesap/cuzdan" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-cream-dim hover:text-cream hover:bg-ink-700/50 transition-colors">
                  <IconWallet className="w-4 h-4" />
                  <span>Cuzdan</span>
                </Link>
                <Link href="/hesap/mesajlar" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-cream-dim hover:text-cream hover:bg-ink-700/50 transition-colors">
                  <IconMessage className="w-4 h-4" />
                  <span>Mesajlar</span>
                  <span className="ml-auto bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">3</span>
                </Link>
                <Link href="/hesap/ayarlar" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-cream-dim hover:text-cream hover:bg-ink-700/50 transition-colors">
                  <IconSettings className="w-4 h-4" />
                  <span>Ayarlar</span>
                </Link>
              </div>
              <div className="p-2 border-t border-ink-700">
                <button 
                  onClick={onLogout}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-rose-400 hover:bg-rose-500/10 transition-colors"
                >
                  <IconLogout className="w-4 h-4" />
                  <span>Cikis Yap</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="hidden lg:flex items-center gap-3">
      {/* Segment Container: Search + Language + Login */}
      <div className="flex items-center bg-ink-800/60 rounded-xl border border-line/50">
        {/* Search Segment */}
        <button 
          onClick={onOpenSearch}
          className="flex items-center gap-2 h-10 px-3 hover:bg-ink-700/50 transition-all group border-r border-line/30 rounded-l-xl"
        >
          <IconSearch className="w-4 h-4 text-cream-dim group-hover:text-gold-400 transition-colors" />
        </button>

        {/* Language Segment */}
        <div className="dropdown-container relative border-r border-line/30">
          <button
            onClick={() => setLangDropdownOpen(!langDropdownOpen)}
            className="flex items-center gap-2 h-10 px-3 hover:bg-ink-700/50 transition-all group"
          >
            <Image src={currentLang.flag} alt={currentLang.label} width={18} height={13} className="rounded-sm" style={{ width: "18px", height: "13px" }} />
            <span className="text-sm font-medium text-cream">{currentLang.code.toUpperCase()}</span>
            <IconChevronDown className={`w-3 h-3 text-cream-dim transition-transform ${langDropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {langDropdownOpen && (
            <div className="absolute top-full right-0 mt-2 w-44 bg-ink-800/95 backdrop-blur-xl border border-gold-500/20 rounded-xl shadow-2xl z-[60]">
              <div className="p-1.5">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setCurrentLang(lang)
                      setLangDropdownOpen(false)
                    }}
                    className={`w-full px-3 py-2 rounded-lg flex items-center gap-3 hover:bg-ink-700/50 transition-all ${
                      currentLang.code === lang.code ? "bg-gold-500/10" : ""
                    }`}
                  >
                    <Image src={lang.flag} alt={lang.label} width={22} height={16} className="rounded-sm" style={{ width: "22px", height: "16px" }} />
                    <span className="text-sm text-cream">{lang.label}</span>
                    {currentLang.code === lang.code && (
                      <IconCircleCheck className="w-4 h-4 text-gold-400 ml-auto" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Login Button */}
        <button
          onClick={onOpenAuth}
          className="group relative flex items-center justify-center h-10 px-6 pr-10 bg-gradient-to-r from-gold-500 to-gold-600 text-ink-900 font-bold text-sm overflow-hidden hover:brightness-110 transition rounded-r-xl"
        >
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          <span className="relative flex items-center gap-2 transition-transform duration-300 group-hover:-translate-x-1">
            <IconLogin className="w-4 h-4" />
            Giris Yap
          </span>
          <IconArrowRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-0 translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
        </button>
      </div>
    </div>
  )
}
