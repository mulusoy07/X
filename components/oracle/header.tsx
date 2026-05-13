"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  IconChevronDown,
  IconChevronRight,
  IconUser,
  IconCreditCard,
  IconMessage,
  IconSettings,
  IconLogout,
  IconSword,
  IconTrendingUp,
  IconStar,
  IconWorld,
  IconShoppingCart,
  IconPlus,
  IconGift,
  IconReceipt,
  IconCircleCheck,
  IconMenu2,
  IconX,
  IconHome,
  IconMessageCircle,
  IconNews,
  IconServer,
  IconBook,
  IconTrophy,
  IconUsers,
  IconShield,
  IconMap,
  IconCoins,
  IconCrown,
  IconFlame,
  IconTarget,
  IconHeart,
  IconAward,
  IconBrandDiscord,
  IconInfoCircle,
  IconDownload,
  IconQuestionMark,
  IconSearch,
  IconBell,
  IconWallet,
  IconLogin,
  IconArrowRight,
} from "@tabler/icons-react"
import { AuthModal } from "./auth-modal"
import { SearchModal } from "./search-modal"
import { NotificationsDropdown } from "./notifications-dropdown"

// Menu data with icons and submenus
const menuItems = [
  {
    id: "home",
    label: "Ana Sayfa",
    href: "/",
    icon: IconHome,
  },
  {
    id: "guide",
    label: "Rehber",
    href: "/rehber",
    icon: IconBook,
    submenu: [
      { label: "Baslangic Rehberi", href: "/rehber/baslangic", icon: IconStar, desc: "Yeni oyuncular icin" },
      { label: "Sinif Rehberleri", href: "/rehber/siniflar", icon: IconShield, desc: "Warrior, Rogue, Mage, Priest" },
      { label: "Harita Rehberi", href: "/rehber/harita", icon: IconMap, desc: "Bolgeler ve rotalar" },
      { label: "PvP Rehberi", href: "/rehber/pvp", icon: IconSword, desc: "Savas taktikleri" },
      { label: "Ekonomi Rehberi", href: "/rehber/ekonomi", icon: IconCoins, desc: "Ticaret ve kazanc" },
    ],
  },
  {
    id: "rankings",
    label: "Siralamalar",
    href: "/siralamalar",
    icon: IconTrophy,
    submenu: [
      { label: "Oyuncu Siralamasi", href: "/siralamalar/oyuncu", icon: IconCrown, desc: "En guclu oyuncular" },
      { label: "Lonca Siralamasi", href: "/siralamalar/lonca", icon: IconUsers, desc: "Klan siralamalari" },
      { label: "PvP Siralamasi", href: "/siralamalar/pvp", icon: IconFlame, desc: "Kill sayilari" },
      { label: "Haftalik Siralama", href: "/siralamalar/haftalik", icon: IconTarget, desc: "Bu hafta liderler" },
    ],
  },
  {
    id: "shop",
    label: "Magaza",
    href: "/magaza",
    icon: IconShoppingCart,
    submenu: [
      { label: "Premium Paketler", href: "/magaza/premium", icon: IconGift, desc: "VIP avantajlar" },
      { label: "Kostumler", href: "/magaza/kostumler", icon: IconHeart, desc: "Gorsel ogeler" },
      { label: "Ozel Esyalar", href: "/magaza/ozel", icon: IconAward, desc: "Nadir itemler" },
      { label: "Bakiye Yukle", href: "/magaza/bakiye", icon: IconPlus, desc: "Coin satin al" },
    ],
  },
  {
    id: "community",
    label: "Topluluk",
    href: "/topluluk",
    icon: IconUsers,
    submenu: [
      { label: "Forum", href: "/forum", icon: IconMessageCircle, desc: "Tartismalar" },
      { label: "Discord", href: "https://discord.gg/oracle", icon: IconBrandDiscord, desc: "Canli sohbet", external: true },
      { label: "Haberler", href: "/haberler", icon: IconNews, desc: "Son gelismeler" },
      { label: "Etkinlikler", href: "/etkinlikler", icon: IconStar, desc: "Ozel eventler" },
    ],
  },
  {
    id: "support",
    label: "Destek",
    href: "/destek",
    icon: IconQuestionMark,
    submenu: [
      { label: "Yardim Merkezi", href: "/destek/yardim", icon: IconInfoCircle, desc: "SSS ve cozumler" },
      { label: "Indirme", href: "/indir", icon: IconDownload, desc: "Oyun istemcisi" },
      { label: "Hesap Kurtarma", href: "/destek/hesap", icon: IconShield, desc: "Sifre sifirlama" },
    ],
  },
]

const languages = [
  { code: "tr", label: "Turkce", flag: "https://flagcdn.com/w40/tr.png" },
  { code: "en", label: "English", flag: "https://flagcdn.com/w40/gb.png" },
  { code: "de", label: "Deutsch", flag: "https://flagcdn.com/w40/de.png" },
  { code: "ru", label: "Русский", flag: "https://flagcdn.com/w40/ru.png" },
]

const servers = [
  { id: "oracle-1", name: "Oracle #1", status: "online", players: 1247 },
  { id: "oracle-2", name: "Oracle #2", status: "online", players: 892 },
  { id: "phoenix", name: "Phoenix", status: "maintenance", players: 0 },
]

interface HeaderProps {
  onOpenServerModal?: () => void
}

export function Header({ onOpenServerModal }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(null)
  const [langDropdownOpen, setLangDropdownOpen] = useState(false)
  const [serverDropdownOpen, setServerDropdownOpen] = useState(false)
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState(languages[0])
  const [currentServer, setCurrentServer] = useState(servers[0])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("")
  const navRef = useRef<HTMLElement>(null)
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 })
  const navItemRefs = useRef<{ [key: string]: HTMLElement | null }>({})

  const handleNavHover = (id: string) => {
    const el = navItemRefs.current[id]
    if (el && navRef.current) {
      const navRect = navRef.current.getBoundingClientRect()
      const itemRect = el.getBoundingClientRect()
      setIndicatorStyle({
        left: itemRect.left - navRect.left,
        width: itemRect.width,
        opacity: 1,
      })
    }
  }

  const handleNavLeave = () => {
    setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }))
    setActiveDropdown(null)
  }

  const handleLogin = (user: string) => {
    setUsername(user)
    setIsLoggedIn(true)
    setAuthModalOpen(false)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUsername("")
    setAccountDropdownOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as Element).closest(".dropdown-container")) {
        setActiveDropdown(null)
        setLangDropdownOpen(false)
        setServerDropdownOpen(false)
        setAccountDropdownOpen(false)
        setNotificationsOpen(false)
      }
    }
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  // Global keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "text-emerald-400"
      case "maintenance": return "text-amber-400"
      default: return "text-rose-400"
    }
  }

  const getStatusBg = (status: string) => {
    switch (status) {
      case "online": return "bg-emerald-500"
      case "maintenance": return "bg-amber-500"
      default: return "bg-rose-500"
    }
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-ink-900/95 backdrop-blur-xl border-b border-gold-500/10">


        {/* Main Navigation */}
        <div className="max-w-[1400px] mx-auto px-4 lg:px-6">
          <div className="h-16 lg:h-[72px] flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 logo-hover">
              <Image
                src="https://media.oraclegamer.net/game/logo/logov4.webp"
                alt="Oracle Gamer"
                width={200}
                height={56}
                className="h-10 lg:h-14 w-auto"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav
              ref={navRef}
              className="hidden lg:flex items-center gap-0.5 relative"
              onMouseLeave={handleNavLeave}
            >
              {/* Hover Indicator */}
              <div
                className="absolute bottom-2 h-0.5 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-400 rounded-full transition-all duration-300 ease-out"
                style={{
                  left: indicatorStyle.left,
                  width: indicatorStyle.width,
                  opacity: indicatorStyle.opacity,
                }}
              />

              {menuItems.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.id} className="dropdown-container relative">
                    <Link
                      href={item.href}
                      ref={(el) => { navItemRefs.current[item.id] = el }}
                      onMouseEnter={() => {
                        handleNavHover(item.id)
                        if (item.submenu) setActiveDropdown(item.id)
                      }}
                      className="group flex items-center gap-2 px-4 py-6 text-sm font-medium text-cream-dim hover:text-cream transition-all relative"
                    >
                      <Icon className="w-[18px] h-[18px] text-gold-500/60 group-hover:text-gold-400 transition-colors" />
                      <span>{item.label}</span>
                      {item.submenu && (
                        <IconChevronDown className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-all group-hover:translate-y-0.5" />
                      )}
                    </Link>

                    {/* Dropdown */}
                    {item.submenu && activeDropdown === item.id && (
                      <div
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-2"
                        onMouseEnter={() => setActiveDropdown(item.id)}
                        onMouseLeave={() => setActiveDropdown(null)}
                      >
                        <div className="w-72 bg-ink-800 backdrop-blur-xl border border-gold-500/20 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden">
                          {/* Arrow */}
                          <div className="absolute -top-[6px] left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-ink-800 border-l border-t border-gold-500/20" />
                          
                          <div className="p-2">
                            {item.submenu.map((sub, idx) => {
                              const SubIcon = sub.icon
                              return (
                                <Link
                                  key={idx}
                                  href={sub.href}
                                  target={sub.external ? "_blank" : undefined}
                                  className="flex items-center gap-3 px-3 py-3 rounded-xl text-cream-dim hover:text-cream hover:bg-gradient-to-r hover:from-gold-500/10 hover:to-transparent transition-all group/item"
                                >
                                  <span className="w-10 h-10 rounded-xl bg-ink-700/50 flex items-center justify-center group-hover/item:bg-gold-500/20 transition-colors shrink-0">
                                    <SubIcon className="w-5 h-5 text-gold-500/70 group-hover/item:text-gold-400" />
                                  </span>
                                  <div className="min-w-0">
                                    <div className="font-medium text-sm">{sub.label}</div>
                                    <div className="text-xs text-cream-dim/60 truncate">{sub.desc}</div>
                                  </div>
                                  <IconChevronRight className="w-4 h-4 text-cream-dim/30 group-hover/item:text-gold-400 ml-auto opacity-0 group-hover/item:opacity-100 transition-all -translate-x-2 group-hover/item:translate-x-0" />
                                </Link>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2 lg:gap-3">
              {/* Account - Desktop */}
              {isLoggedIn ? (
                <div className="hidden lg:flex items-center gap-3">
                  {/* Search + Language Container */}
                  <div className="flex items-center bg-ink-800/60 rounded-xl border border-line/50">
                    {/* Search */}
                    <button 
                      onClick={() => setSearchOpen(true)}
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
                        <Image src={currentLang.flag} alt={currentLang.label} width={18} height={13} className="rounded-sm object-cover" />
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
                                <Image src={lang.flag} alt={lang.label} width={22} height={16} className="rounded-sm object-cover" />
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

                  {/* Notifications - Only for logged in users */}
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
                    <div className="absolute top-full right-0 mt-2 w-64 bg-ink-800 backdrop-blur-xl border border-gold-500/20 rounded-2xl shadow-2xl overflow-hidden">
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
                          onClick={handleLogout}
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
              ) : (
                <div className="hidden lg:flex items-center gap-3">
                  {/* Segment Container: Search + Language + Login */}
                  <div className="flex items-center bg-ink-800/60 rounded-xl border border-line/50 overflow-hidden">
                    {/* Search Segment */}
                    <button 
                      onClick={() => setSearchOpen(true)}
                      className="flex items-center gap-2 h-10 px-3 hover:bg-ink-700/50 transition-all group border-r border-line/30"
                    >
                      <IconSearch className="w-4 h-4 text-cream-dim group-hover:text-gold-400 transition-colors" />
                    </button>

                    {/* Language Segment */}
                    <div className="dropdown-container relative border-r border-line/30">
                      <button
                        onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                        className="flex items-center gap-2 h-10 px-3 hover:bg-ink-700/50 transition-all group"
                      >
                        <Image src={currentLang.flag} alt={currentLang.label} width={18} height={13} className="rounded-sm object-cover" />
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
                                <Image src={lang.flag} alt={lang.label} width={22} height={16} className="rounded-sm object-cover" />
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

                    {/* Login Button V07 - Shimmer + Arrow (inside segment) */}
                    <button
                      onClick={() => setAuthModalOpen(true)}
                      className="group relative flex items-center h-10 px-5 bg-gradient-to-r from-gold-500 to-gold-600 text-ink-900 font-bold text-sm overflow-hidden hover:brightness-110 transition rounded-r-xl"
                    >
                      {/* Shimmer sweep effect */}
                      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                      {/* Content with slide effect */}
                      <span className="relative flex items-center gap-2 transition-transform duration-300 group-hover:-translate-x-1">
                        <IconLogin className="w-4 h-4" />
                        Giris Yap
                      </span>
                      {/* Arrow reveal on hover */}
                      <IconArrowRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                    </button>
                  </div>
                </div>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden w-11 h-11 flex items-center justify-center rounded-xl bg-ink-800/50 hover:bg-ink-700/50 border border-gold-500/20 text-cream transition-colors"
              >
                <IconMenu2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu - Full Screen */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden flex flex-col">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-ink-950/98 backdrop-blur-xl" />

          {/* Content */}
          <div className="relative flex-1 flex flex-col pb-20 overflow-hidden">
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-4 border-b border-gold-500/10">
              <Image
                src="https://media.oraclegamer.net/game/logo/logov4.webp"
                alt="Oracle Gamer"
                width={140}
                height={40}
                className="h-9 w-auto"
              />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-ink-800/50 text-cream border border-gold-500/20"
              >
                <IconX className="w-5 h-5" />
              </button>
            </div>

            {/* Account Section - Mobile */}
            {isLoggedIn ? (
              <div className="p-4 border-b border-ink-700/50">
                <Link
                  href="/hesap"
                  className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-gold-500/10 to-transparent border border-gold-500/20"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center ring-2 ring-gold-500/30">
                      <IconUser className="w-7 h-7 text-ink-900" />
                    </div>
                    <div>
                      <div className="font-bold text-lg text-cream">{username || "OracleKnight"}</div>
                      <div className="text-sm text-gold-400 flex items-center gap-1.5">
                        <IconCrown className="w-4 h-4" /> Premium Uye
                      </div>
                      <div className="text-xs text-cream-dim mt-0.5">2,450 OG Coin</div>
                    </div>
                  </div>
                  <IconChevronRight className="w-5 h-5 text-cream-dim" />
                </Link>
              </div>
            ) : (
              <div className="p-4 border-b border-ink-700/50">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    setAuthModalOpen(true)
                  }}
                  className="w-full flex items-center justify-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-gold-500 to-gold-600 text-ink-900 font-bold text-base"
                >
                  <IconLogin className="w-5 h-5" />
                  Giris Yap
                </button>
              </div>
            )}

            {/* Server Selection - Mobile */}
            <div className="p-4 border-b border-ink-700/50">
              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  onOpenServerModal?.()
                }}
                className="w-full flex items-center justify-between p-4 rounded-2xl bg-ink-800/50 border border-gold-500/20"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-700/20 flex items-center justify-center border border-emerald-500/30">
                    <IconServer className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-cream">{currentServer.name}</div>
                    <div className="text-sm flex items-center gap-2 mt-0.5">
                      <span className={`w-2 h-2 rounded-full ${getStatusBg(currentServer.status)} animate-pulse`} />
                      <span className={getStatusColor(currentServer.status)}>
                        {currentServer.status === "online" ? "Cevrimici" : "Bakimda"}
                      </span>
                    </div>
                  </div>
                </div>
                <IconChevronRight className="w-5 h-5 text-cream-dim" />
              </button>
            </div>

            {/* Menu Items with Submenus */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon
                  const isExpanded = expandedMobileMenu === item.id

                  return (
                    <div key={item.id}>
                      {item.submenu ? (
                        <>
                          <button
                            onClick={() => setExpandedMobileMenu(isExpanded ? null : item.id)}
                            className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${
                              isExpanded ? "bg-ink-800/70" : "hover:bg-ink-800/40"
                            }`}
                          >
                            <div className="flex items-center gap-4">
                              <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                                isExpanded ? "bg-gold-500/20" : "bg-ink-800/50"
                              }`}>
                                <Icon className={`w-5 h-5 ${isExpanded ? "text-gold-400" : "text-gold-500/70"}`} />
                              </div>
                              <span className={`font-semibold ${isExpanded ? "text-cream" : "text-cream-dim"}`}>{item.label}</span>
                            </div>
                            <IconChevronDown
                              className={`w-5 h-5 text-cream-dim transition-transform duration-300 ${isExpanded ? "rotate-180 text-gold-400" : ""}`}
                            />
                          </button>

                          {/* Submenu Accordion */}
                          <div className={`overflow-hidden transition-all duration-300 ease-out ${isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
                            <div className="pl-6 pr-2 py-2 space-y-1">
                              {item.submenu.map((sub, idx) => {
                                const SubIcon = sub.icon
                                return (
                                  <Link
                                    key={idx}
                                    href={sub.href}
                                    target={sub.external ? "_blank" : undefined}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-ink-700/50 transition-colors"
                                  >
                                    <div className="w-9 h-9 rounded-lg bg-ink-700/50 flex items-center justify-center">
                                      <SubIcon className="w-4 h-4 text-gold-500/60" />
                                    </div>
                                    <div>
                                      <div className="text-sm font-medium text-cream-dim">{sub.label}</div>
                                      <div className="text-xs text-cream-dim/50">{sub.desc}</div>
                                    </div>
                                  </Link>
                                )
                              })}
                            </div>
                          </div>
                        </>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-4 p-4 rounded-2xl hover:bg-ink-800/40 transition-colors"
                        >
                          <div className="w-11 h-11 rounded-xl bg-ink-800/50 flex items-center justify-center">
                            <Icon className="w-5 h-5 text-gold-500/70" />
                          </div>
                          <span className="font-semibold text-cream-dim">{item.label}</span>
                        </Link>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Language Selection - Mobile */}
              <div className="mt-6 pt-6 border-t border-ink-700/50">
                <p className="text-xs font-bold text-gold-400 uppercase tracking-wider mb-4 px-2 flex items-center gap-2">
                  <IconWorld className="w-4 h-4" />
                  Dil Secimi
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setCurrentLang(lang)}
                      className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                        currentLang.code === lang.code
                          ? "bg-gold-500/10 border-gold-500/40 ring-1 ring-gold-500/20"
                          : "bg-ink-800/30 border-ink-700/50 hover:border-gold-500/20"
                      }`}
                    >
                      <Image src={lang.flag} alt={lang.label} width={26} height={19} className="rounded-sm object-cover" />
                      <span className="text-sm font-medium text-cream">{lang.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Logout - Mobile (if logged in) */}
              {isLoggedIn && (
                <div className="mt-6">
                  <button
                    onClick={() => {
                      handleLogout()
                      setMobileMenuOpen(false)
                    }}
                    className="flex items-center justify-center gap-3 w-full p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 font-semibold"
                  >
                    <IconLogout className="w-5 h-5" />
                    Cikis Yap
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Footer Actions */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
        <div className="bg-ink-900/98 backdrop-blur-xl border-t border-gold-500/10 safe-area-bottom">
          <div className="grid grid-cols-5 h-16">
            {[
              { icon: IconHome, label: "Ana Sayfa", href: "/" },
              { icon: IconNews, label: "Haberler", href: "/haberler" },
              { icon: IconMessageCircle, label: "Forum", href: "/forum" },
              { icon: IconShoppingCart, label: "Magaza", href: "/magaza" },
              { icon: IconUser, label: "Hesap", href: isLoggedIn ? "/hesap" : "#", isAccount: true },
            ].map((item, idx) => {
              const Icon = item.icon
              return (
                <Link
                  key={idx}
                  href={item.isAccount && !isLoggedIn ? "#" : item.href}
                  onClick={(e) => {
                    if (item.isAccount && !isLoggedIn) {
                      e.preventDefault()
                      setAuthModalOpen(true)
                    }
                  }}
                  className="flex flex-col items-center justify-center gap-1 text-cream-dim hover:text-gold-400 active:scale-95 transition-all"
                >
                  {item.isAccount && isLoggedIn ? (
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center ring-2 ring-gold-500/30">
                      <Icon className="w-4 h-4 text-ink-900" />
                    </div>
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                  <span className="text-[10px] font-medium">{item.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLogin={handleLogin}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  )
}
