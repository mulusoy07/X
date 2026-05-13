"use client"

import Link from "next/link"
import { IconArrowLeft } from "@tabler/icons-react"
import { TopUsersShowcase } from "@/components/templates/topusers"

export default function TopUsersPage() {
  return (
    <div className="min-h-screen bg-ink-950">
      {/* Header */}
      <div className="border-b border-line bg-ink-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link 
            href="/templates" 
            className="p-2 rounded-lg bg-ink-800 border border-line text-cream-dim hover:text-cream hover:border-gold-500/50 transition-all"
          >
            <IconArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-cream">En İyiler Şablonları</h1>
            <p className="text-sm text-cream-dim">/components/templates/topusers.tsx</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <TopUsersShowcase />
    </div>
  )
}
