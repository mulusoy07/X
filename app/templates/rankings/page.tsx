"use client"

import Link from "next/link"
import { IconArrowLeft, IconChevronRight, IconUsers, IconShieldStar } from "@tabler/icons-react"

const items = [
  {
    name: "Users",
    slug: "users",
    description: "Player rankings · level, NP, rebirth",
    icon: IconUsers,
  },
  {
    name: "Clans",
    slug: "clans",
    description: "Clan rankings · score, points, members",
    icon: IconShieldStar,
  },
]

export default function RankingsHubPage() {
  return (
    <div className="min-h-screen bg-ink-950">
      <div className="border-b border-line bg-ink-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link
            href="/templates"
            className="p-2 rounded-lg bg-ink-800 border border-line text-cream-dim hover:text-cream hover:border-gold-500/50 transition-all"
          >
            <IconArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-cream">Rankings</h1>
            <p className="text-sm text-cream-dim">Player ve clan sıralama sayfaları</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((g) => (
            <Link
              key={g.slug}
              href={`/templates/rankings/${g.slug}`}
              className="group p-6 rounded-xl bg-ink-900/50 border border-line hover:border-gold-500/50 hover:bg-gold-500/5 transition-all flex items-start gap-4"
            >
              <div className="p-3 rounded-lg bg-ink-800 border border-line group-hover:border-gold-500/40 transition-colors">
                <g.icon className="w-6 h-6 text-cream-dim group-hover:text-gold-400 transition-colors" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-cream mb-1 group-hover:text-gold-300 transition-colors">{g.name}</h2>
                <p className="text-sm text-cream-dim">{g.description}</p>
                <p className="text-xs text-cream-dim/60 mt-2 font-mono">/templates/rankings/{g.slug}</p>
              </div>
              <IconChevronRight className="w-5 h-5 text-cream-dim/50 group-hover:text-gold-400 transition-colors mt-1" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
