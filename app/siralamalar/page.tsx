"use client"

import { Header } from "@/components/oracle/header"
import { Footer } from "@/components/oracle/footer"
import { IconTrophy, IconCrown, IconUsers, IconChevronRight } from "@tabler/icons-react"
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
    icon: IconUsers,
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
    <div className="min-h-screen bg-ink-900">
      <Header />
      
      <div className="bg-gradient-to-br from-ink-900 via-ink-800 to-ink-900 min-h-screen">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-6 py-6">
          {/* Page Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gold-500/15 border border-gold-500/30 flex items-center justify-center">
              <IconTrophy className="w-6 h-6 text-gold-400" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-cream">Siralamalar</h1>
              <p className="text-sm text-cream-dim">Tum siralama kategorileri</p>
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
                  className="group relative bg-ink-800 border border-line rounded-2xl overflow-hidden transition-all duration-300 hover:border-gold-500/30 hover:shadow-xl hover:shadow-black/30"
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
        </div>
      </div>

      <Footer />
    </div>
  )
}
