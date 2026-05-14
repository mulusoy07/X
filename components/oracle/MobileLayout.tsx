"use client"

import { ReactNode } from "react"

interface MobileLayoutProps {
  header: ReactNode
  children: ReactNode
  footer: ReactNode
}

export function MobileLayout({ header, children, footer }: MobileLayoutProps) {
  return (
    <>
      {/* Desktop: Normal scroll behavior */}
      <div className="hidden lg:block">
        {header}
        {children}
      </div>

      {/* Mobile: Fixed header/footer with scrollable content */}
      <div className="lg:hidden flex flex-col h-[100dvh] overflow-hidden">
        {/* Fixed Header */}
        <div className="flex-shrink-0 z-50 bg-ink-900 border-b border-gold-500/10">
          {header}
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden overscroll-contain">
          {children}
        </div>

        {/* Fixed Footer */}
        <div className="flex-shrink-0 z-50">
          {footer}
        </div>
      </div>
    </>
  )
}
