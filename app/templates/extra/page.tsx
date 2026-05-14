"use client"

import Link from "next/link"
import { IconArrowLeft, IconArchive } from "@tabler/icons-react"
import { ExtraShowcase } from "@/components/templates/extra"

export default function ExtraPage() {
  return (
    <div className="min-h-screen bg-ink-950">
      <div className="border-b border-line bg-ink-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link
            href="/templates"
            className="p-2 rounded-lg bg-ink-800 border border-line text-cream-dim hover:text-cream hover:border-gold-500/50 transition-all"
          >
            <IconArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400">
              <IconArchive className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-cream">Extra</h1>
              <p className="text-sm text-cream-dim">Saklanmış varyasyonlar — ileride kullanılabilecek tasarım parçaları</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <ExtraShowcase />
      </div>
    </div>
  )
}
