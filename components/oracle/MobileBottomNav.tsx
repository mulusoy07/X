"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  IconHome,
  IconNews,
  IconMessageCircle,
  IconShoppingCart,
  IconUser,
} from "@tabler/icons-react"
import { AuthModal } from "./auth-modal"

interface MobileBottomNavProps {
  isLoggedIn?: boolean
  onAuthStateChange?: (loggedIn: boolean, username: string) => void
}

const navItems = [
  { icon: IconHome, label: "Ana Sayfa", href: "/" },
  { icon: IconNews, label: "Haberler", href: "/haberler" },
  { icon: IconMessageCircle, label: "Forum", href: "/forum" },
  { icon: IconShoppingCart, label: "Magaza", href: "/magaza" },
  { icon: IconUser, label: "Hesap", href: "/hesap", isAccount: true },
]

export function MobileBottomNav({ isLoggedIn = false, onAuthStateChange }: MobileBottomNavProps) {
  const pathname = usePathname()
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [internalLoggedIn, setInternalLoggedIn] = useState(isLoggedIn)

  const handleLogin = (user: string) => {
    setInternalLoggedIn(true)
    setAuthModalOpen(false)
    onAuthStateChange?.(true, user)
  }

  const loggedIn = onAuthStateChange ? isLoggedIn : internalLoggedIn

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
        <div className="bg-ink-900 border-t border-gold-500/10 safe-area-bottom">
          <div className="grid grid-cols-5 h-16">
            {navItems.map((item, idx) => {
              const Icon = item.icon
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
              const showAsAccount = item.isAccount && loggedIn
              
              return (
                <Link
                  key={idx}
                  href={item.isAccount && !loggedIn ? "#" : item.href}
                  onClick={(e) => {
                    if (item.isAccount && !loggedIn) {
                      e.preventDefault()
                      setAuthModalOpen(true)
                    }
                  }}
                  className={`flex flex-col items-center justify-center gap-0.5 transition-all active:scale-95 ${
                    isActive ? "text-gold-400" : "text-cream-dim hover:text-gold-400"
                  }`}
                >
                  {showAsAccount ? (
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center ring-1 ring-gold-500/30">
                      <Icon className="w-3.5 h-3.5 text-ink-900" />
                    </div>
                  ) : (
                    <Icon className={`w-5 h-5 ${isActive ? "text-gold-400" : ""}`} />
                  )}
                  <span className={`text-[9px] font-medium ${isActive ? "text-gold-400" : ""}`}>{item.label}</span>
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
    </>
  )
}
