"use client"

import { useState, useEffect, useCallback } from "react"
import {
  IconSearch,
  IconX,
  IconNews,
  IconMessageCircle,
  IconShoppingCart,
  IconUser,
  IconBook,
  IconTrophy,
  IconCommand,
} from "@tabler/icons-react"

interface SearchResult {
  id: string
  title: string
  description: string
  category: string
  icon: React.ReactNode
  href: string
}

const quickLinks: SearchResult[] = [
  { id: "1", title: "Ana Sayfa", description: "Siteye geri don", category: "Sayfa", icon: <IconSearch className="w-4 h-4" />, href: "/" },
  { id: "2", title: "Son Haberler", description: "Guncel duyurular ve haberler", category: "Haber", icon: <IconNews className="w-4 h-4" />, href: "/haberler" },
  { id: "3", title: "Forum", description: "Topluluk tartismalari", category: "Topluluk", icon: <IconMessageCircle className="w-4 h-4" />, href: "/forum" },
  { id: "4", title: "Magaza", description: "Premium paketler ve kostumleri", category: "Magaza", icon: <IconShoppingCart className="w-4 h-4" />, href: "/magaza" },
  { id: "5", title: "Siralamalar", description: "Oyuncu ve klan siralamalari", category: "Sıralama", icon: <IconTrophy className="w-4 h-4" />, href: "/siralamalar" },
  { id: "6", title: "Baslangic Rehberi", description: "Yeni oyuncular icin", category: "Rehber", icon: <IconBook className="w-4 h-4" />, href: "/rehber/baslangic" },
  { id: "7", title: "Hesabim", description: "Profil ve ayarlar", category: "Hesap", icon: <IconUser className="w-4 h-4" />, href: "/hesap" },
]

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)

  const filteredResults = query
    ? quickLinks.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      )
    : quickLinks

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault()
          setSelectedIndex((prev) => (prev < filteredResults.length - 1 ? prev + 1 : 0))
          break
        case "ArrowUp":
          e.preventDefault()
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredResults.length - 1))
          break
        case "Enter":
          e.preventDefault()
          if (filteredResults[selectedIndex]) {
            window.location.href = filteredResults[selectedIndex].href
            onClose()
          }
          break
        case "Escape":
          e.preventDefault()
          onClose()
          break
      }
    },
    [isOpen, filteredResults, selectedIndex, onClose]
  )

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  useEffect(() => {
    if (isOpen) {
      setQuery("")
      setSelectedIndex(0)
    }
  }, [isOpen])

  // Global keyboard shortcut to open search
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        if (!isOpen) {
          // This would need to be handled by parent
        }
      }
    }
    document.addEventListener("keydown", handleGlobalKeyDown)
    return () => document.removeEventListener("keydown", handleGlobalKeyDown)
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-ink-950/80 backdrop-blur-sm flex items-start justify-center z-[100] pt-[15vh]"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-xl bg-gradient-to-b from-ink-800 to-ink-900 border border-gold-500/20 rounded-2xl shadow-[0_40px_80px_-16px_rgba(0,0,0,0.8),0_0_0_1px_rgba(245,184,54,0.1)_inset] overflow-hidden">
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 border-b border-line">
          <IconSearch className="w-5 h-5 text-cream-dim" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ara..."
            autoFocus
            className="flex-1 h-14 bg-transparent text-cream placeholder:text-cream-dim/60 focus:outline-none"
          />
          <div className="flex items-center gap-1 text-xs text-cream-dim">
            <kbd className="px-1.5 py-0.5 bg-ink-700 rounded border border-line text-[10px]">ESC</kbd>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-ink-700 text-cream-dim hover:text-cream flex items-center justify-center transition-colors"
          >
            <IconX className="w-4 h-4" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[400px] overflow-y-auto p-2">
          {filteredResults.length > 0 ? (
            <>
              <div className="px-3 py-2">
                <span className="text-xs font-bold text-gold-400 uppercase tracking-wider">
                  {query ? "Sonuclar" : "Hizli Erisim"}
                </span>
              </div>
              {filteredResults.map((item, index) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all cursor-pointer ${
                    selectedIndex === index
                      ? "bg-gold-500/10 text-cream"
                      : "text-cream-dim hover:bg-ink-700/50 hover:text-cream"
                  }`}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    selectedIndex === index ? "bg-gold-500/20 text-gold-400" : "bg-ink-700/50 text-cream-dim"
                  }`}>
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{item.title}</div>
                    <div className="text-xs text-cream-dim/60 truncate">{item.description}</div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-ink-700/50 text-cream-dim">
                    {item.category}
                  </span>
                </a>
              ))}
            </>
          ) : (
            <div className="py-12 text-center">
              <IconSearch className="w-12 h-12 text-cream-dim/30 mx-auto mb-3" />
              <p className="text-cream-dim">Sonuc bulunamadi</p>
              <p className="text-xs text-muted mt-1">Farkli anahtar kelimeler deneyin</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-line flex items-center justify-between text-xs text-cream-dim">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-ink-700 rounded border border-line text-[10px]">↑</kbd>
              <kbd className="px-1.5 py-0.5 bg-ink-700 rounded border border-line text-[10px]">↓</kbd>
              <span className="ml-1">Gezin</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-ink-700 rounded border border-line text-[10px]">Enter</kbd>
              <span className="ml-1">Sec</span>
            </span>
          </div>
          <div className="flex items-center gap-1">
            <IconCommand className="w-3 h-3" />
            <span>K ile arama ac</span>
          </div>
        </div>
      </div>
    </div>
  )
}
