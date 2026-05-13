"use client"

import { Header } from "@/components/oracle/header"
import { Footer } from "@/components/oracle/footer"
import { IconTrophy, IconCrown, IconUsers, IconShield, IconChevronRight } from "@tabler/icons-react"
import Link from "next/link"

const rankings = [
  {
    title: "Oyuncu Siralamasi",
    description: "En guclu oyunculari kesfet",
    href: "/siralamalar/oyuncu",
    icon: IconTrophy,
    color: "from-gold-500/20 to-gold-600/10",
    iconBg: "bg-gold-500/15 border-gold-500/30 text-gold-400",
  },
  {
    title: "Klan Siralamasi",
    description: "En guclu klanlari kesfet",
    href: "/siralamalar/lonca",
    icon: IconShield,
    color: "from-emerald-500/20 to-emerald-600/10",
    iconBg: "bg-emerald-500/15 border-emerald-500/30 text-emerald-400",
  },
  {
    title: "Krallik Secimleri",
    description: "Ulusal liderlik secim sonuclari",
    href: "/siralamalar/krallik",
    icon: IconCrown,
    color: "from-amber-500/20 to-amber-600/10",
    iconBg: "bg-amber-500/15 border-amber-500/30 text-amber-400",
  },
]

export default function RankingsIndexPage() {
  return (
    <div className="min-h-screen pb-16 lg:pb-0">
      <Header />
      
      <main className="mx-auto max-w-[1400px] px-4 lg:px-6 py-8 lg:py-12">
        {/* Page Header */}
        <div className="card rounded-xl overflow-hidden mb-6">
          <div className="section-header">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-md bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400">
                <IconTrophy className="w-4 h-4" />
              </div>
              <div>
                <h1 className="font-semibold text-cream text-lg">Siralamalar</h1>
                <p className="text-xs text-cream-dim">Tum siralama kategorileri</p>
              </div>
            </div>
          </div>
        </div>

        {/* Rankings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rankings.map((ranking) => {
            const Icon = ranking.icon
            return (
              <Link
                key={ranking.href}
                href={ranking.href}
                className="group relative bg-ink-800/50 border border-line rounded-xl overflow-hidden transition-all duration-300 hover:border-gold-500/30 hover:shadow-xl hover:shadow-black/30 hover:scale-[1.02]"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${ranking.color} opacity-50 group-hover:opacity-100 transition-opacity`} />
                
                <div className="relative p-6">
                  <div className={`w-14 h-14 rounded-xl border flex items-center justify-center mb-4 ${ranking.iconBg}`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  
                  <h2 className="text-xl font-bold text-cream mb-2 group-hover:text-gold-400 transition-colors">
                    {ranking.title}
                  </h2>
                  
                  <p className="text-sm text-cream-dim mb-4">
                    {ranking.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-gold-400 text-sm font-medium">
                    <span>Goruntule</span>
                    <IconChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </main>

      <Footer />
    </div>
  )
}
