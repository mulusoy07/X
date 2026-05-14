"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { IconChevronDown, IconChevronRight } from "@tabler/icons-react"
import { menuItems } from "./menu-data"

export function DesktopMenu() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
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

  return (
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
  )
}
