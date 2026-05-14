"use client"

import { useState, useEffect } from "react"
import { IconMenu2 } from "@tabler/icons-react"
import { Logo } from "./Logo"
import { DesktopMenu } from "./DesktopMenu"
import { HeaderActions } from "./HeaderActions"
import { MobileMenu } from "./MobileMenu"
import { AuthModal } from "../auth-modal"
import { SearchModal } from "../search-modal"

interface HeaderProps {
  onOpenServerModal?: () => void
}

export function Header({ onOpenServerModal }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("")

  const handleLogin = (user: string) => {
    setUsername(user)
    setIsLoggedIn(true)
    setAuthModalOpen(false)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUsername("")
  }

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

  return (
    <>
      <header className="sticky top-0 z-50 bg-ink-900/95 backdrop-blur-xl border-b border-gold-500/10">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-6">
          <div className="h-14 lg:h-[72px] flex items-center justify-between gap-4">
            {/* Logo */}
            <Logo />

            {/* Desktop Navigation */}
            <DesktopMenu />

            {/* Right Actions */}
            <div className="flex items-center gap-2 lg:gap-3">
              {/* Desktop Actions */}
              <HeaderActions
                isLoggedIn={isLoggedIn}
                username={username}
                onOpenSearch={() => setSearchOpen(true)}
                onOpenAuth={() => setAuthModalOpen(true)}
                onLogout={handleLogout}
              />

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-ink-800/50 hover:bg-ink-700/50 border border-gold-500/20 text-cream transition-colors"
              >
                <IconMenu2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        isLoggedIn={isLoggedIn}
        username={username}
        onOpenAuth={() => setAuthModalOpen(true)}
        onLogout={handleLogout}
      />

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

// Re-export components
export { Logo } from "./Logo"
export { DesktopMenu } from "./DesktopMenu"
export { HeaderActions } from "./HeaderActions"
export { MobileMenu } from "./MobileMenu"
