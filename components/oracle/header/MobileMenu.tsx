"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  IconChevronDown,
  IconChevronRight,
  IconUser,
  IconLogout,
  IconX,
  IconWorld,
  IconCrown,
  IconLogin,
} from "@tabler/icons-react"
import { menuItems, languages } from "./menu-data"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  isLoggedIn: boolean
  username: string
  onOpenAuth: () => void
  onLogout: () => void
}

export function MobileMenu({
  isOpen,
  onClose,
  isLoggedIn,
  username,
  onOpenAuth,
  onLogout,
}: MobileMenuProps) {
  const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(null)
  const [currentLang, setCurrentLang] = useState(languages[0])

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // Reset expanded menu when closed
  useEffect(() => {
    if (!isOpen) {
      setExpandedMobileMenu(null)
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] lg:hidden">
      {/* Backdrop with fade animation */}
      <div 
        className="absolute inset-0 bg-ink-950/98 backdrop-blur-xl animate-in fade-in duration-200" 
        onClick={onClose}
      />

      {/* Content with slide animation */}
      <div className="relative h-full flex flex-col animate-in slide-in-from-right duration-300">
        {/* Fixed Mobile Header - consistent sizing */}
        <div className="flex-shrink-0 flex items-center justify-between h-14 px-4 border-b border-gold-500/10 bg-ink-900/95">
          <Image
            src="https://media.oraclegamer.net/game/logo/logov4.webp"
            alt="Oracle Gamer"
            width={120}
            height={34}
            className="h-8"
            style={{ width: "auto", height: "32px" }}
            priority
          />
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-lg bg-ink-800/50 text-cream border border-gold-500/20 hover:bg-ink-700/50 transition-colors"
          >
            <IconX className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          {/* Account Section - Mobile */}
          <div className="p-3 border-b border-ink-700/50">
            {isLoggedIn ? (
              <Link
                href="/hesap"
                className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-gold-500/10 to-transparent border border-gold-500/20"
                onClick={onClose}
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center ring-2 ring-gold-500/30">
                    <IconUser className="w-5 h-5 text-ink-900" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-cream">{username || "OracleKnight"}</div>
                    <div className="text-xs text-gold-400 flex items-center gap-1">
                      <IconCrown className="w-3 h-3" /> Premium Uye
                    </div>
                    <div className="text-[10px] text-cream-dim mt-0.5">2,450 OG Coin</div>
                  </div>
                </div>
                <IconChevronRight className="w-4 h-4 text-cream-dim" />
              </Link>
            ) : (
              <button
                onClick={() => {
                  onClose()
                  onOpenAuth()
                }}
                className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-ink-900 font-semibold text-sm"
              >
                <IconLogin className="w-4 h-4" />
                Giris Yap
              </button>
            )}
          </div>

          {/* Menu Items with Submenus */}
          <div className="p-3">
            <div className="space-y-0.5">
              {menuItems.map((item) => {
                const Icon = item.icon
                const isExpanded = expandedMobileMenu === item.id

                return (
                  <div key={item.id}>
                    {item.submenu ? (
                      <>
                        <button
                          onClick={() => setExpandedMobileMenu(isExpanded ? null : item.id)}
                          className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                            isExpanded ? "bg-ink-800/70" : "hover:bg-ink-800/40"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                              isExpanded ? "bg-gold-500/20" : "bg-ink-800/50"
                            }`}>
                              <Icon className={`w-4 h-4 ${isExpanded ? "text-gold-400" : "text-gold-500/70"}`} />
                            </div>
                            <span className={`text-sm font-medium ${isExpanded ? "text-cream" : "text-cream-dim"}`}>{item.label}</span>
                          </div>
                          <IconChevronDown
                            className={`w-4 h-4 text-cream-dim transition-transform duration-300 ${isExpanded ? "rotate-180 text-gold-400" : ""}`}
                          />
                        </button>

                        {/* Submenu Accordion */}
                        <div 
                          className={`grid transition-all duration-300 ease-out ${
                            isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                          }`}
                        >
                          <div className="overflow-hidden">
                            <div className="pl-5 pr-2 py-1.5 space-y-0.5">
                              {item.submenu.map((sub, idx) => {
                                const SubIcon = sub.icon
                                return (
                                  <Link
                                    key={idx}
                                    href={sub.href}
                                    target={sub.external ? "_blank" : undefined}
                                    onClick={onClose}
                                    className="flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-ink-700/50 transition-colors"
                                  >
                                    <div className="w-7 h-7 rounded-md bg-ink-700/50 flex items-center justify-center">
                                      <SubIcon className="w-3.5 h-3.5 text-gold-500/60" />
                                    </div>
                                    <div>
                                      <div className="text-xs font-medium text-cream-dim">{sub.label}</div>
                                      <div className="text-[10px] text-cream-dim/50">{sub.desc}</div>
                                    </div>
                                  </Link>
                                )
                              })}
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-ink-800/40 transition-colors"
                      >
                        <div className="w-9 h-9 rounded-lg bg-ink-800/50 flex items-center justify-center">
                          <Icon className="w-4 h-4 text-gold-500/70" />
                        </div>
                        <span className="text-sm font-medium text-cream-dim">{item.label}</span>
                      </Link>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Language Selection - Mobile */}
            <div className="mt-4 pt-4 border-t border-ink-700/50">
              <p className="text-[10px] font-bold text-gold-400 uppercase tracking-wider mb-3 px-2 flex items-center gap-1.5">
                <IconWorld className="w-3 h-3" />
                Dil Secimi
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setCurrentLang(lang)}
                    className={`flex items-center gap-2 p-2.5 rounded-lg border transition-all ${
                      currentLang.code === lang.code
                        ? "bg-gold-500/10 border-gold-500/40 ring-1 ring-gold-500/20"
                        : "bg-ink-800/30 border-ink-700/50 hover:border-gold-500/20"
                    }`}
                  >
                    <Image src={lang.flag} alt={lang.label} width={20} height={14} className="rounded-sm" style={{ width: "20px", height: "14px" }} />
                    <span className="text-xs font-medium text-cream">{lang.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Logout - Mobile (if logged in) */}
            {isLoggedIn && (
              <div className="mt-4">
                <button
                  onClick={() => {
                    onLogout()
                    onClose()
                  }}
                  className="flex items-center justify-center gap-2 w-full p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 font-medium text-sm"
                >
                  <IconLogout className="w-4 h-4" />
                  Cikis Yap
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
