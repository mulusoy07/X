"use client"

import Link from "next/link"
import { IconCalendar, IconUser, IconEye, IconNews, IconChevronRight } from "@tabler/icons-react"

interface NewsItem {
  id: number
  tag: string
  tagColor: string
  category: string
  title: string
  description?: string
  date: string
  author: string
  views: number
  featured?: boolean
}

const newsItems: NewsItem[] = [
  {
    id: 1,
    tag: "News",
    tagColor: "bg-rose-500",
    category: "Etkinlik",
    title: "Clan War Season 5 Rankings Announced",
    description:
      "The results are in! Check out which clans dominated Season 5 of the Clan War tournament.",
    date: "2026-02-01 14:00:00",
    author: "OracleGM",
    views: 1250,
    featured: true,
  },
  {
    id: 2,
    tag: "Guides",
    tagColor: "bg-sky-500",
    category: "Rehber",
    title: "Beginner Guide: Starting Your Journey in Knight...",
    date: "2026-01-15 10:00:00",
    author: "OracleGM",
    views: 1873,
  },
  {
    id: 3,
    tag: "Events",
    tagColor: "bg-emerald-500",
    category: "Etkinlik",
    title: "Winter Event 2026 - Frozen Throne Returns!",
    date: "2026-02-10 09:00:00",
    author: "OracleMod",
    views: 1598,
  },
  {
    id: 4,
    tag: "Maintenance",
    tagColor: "bg-amber-500",
    category: "Bakim",
    title: "Server Maintenance Completed - New Features...",
    date: "2026-03-01 08:00:00",
    author: "OracleGM",
    views: 2119,
  },
]

export function NewsGrid() {
  const featuredNews = newsItems.find((item) => item.featured)
  const sideNews = newsItems.filter((item) => !item.featured)

  return (
    <div className="card rounded-xl overflow-hidden">
      {/* Section Header */}
      <div className="section-header">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400">
            <IconNews className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-cream">Son Haberler</h3>
            <p className="text-xs text-cream-dim">En son gelismeler ve duyurular</p>
          </div>
        </div>
        <Link href="/haberler" className="text-xs text-gold-400 hover:text-gold-300 flex items-center gap-1">
          Tumunu Gor <IconChevronRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Grid - 1 big left, 3 small right */}
      <div className="p-4 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-4">
        {/* Big featured post - Left */}
        {featuredNews && (
          <article className="rounded-xl overflow-hidden group flex flex-col bg-ink-800/50 border border-line h-full">
            <div className="relative aspect-[16/10] placeholder-img flex items-center justify-center">
              <span className="font-mono text-xs text-cream-dim/70 px-3 py-1 rounded bg-ink-900/70 border border-line">
                [ clan war artwork ]
              </span>
              <span className={`absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded ${featuredNews.tagColor} text-white tracking-wider`}>
                {featuredNews.tag}
              </span>
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <h4 className="font-display text-lg font-bold text-cream group-hover:text-gold-300 transition leading-snug">
                {featuredNews.title}
              </h4>
              <p className="text-sm text-cream-dim mt-2 leading-relaxed line-clamp-3">{featuredNews.description}</p>
              <div className="flex items-center gap-4 mt-auto pt-3 text-xs text-cream-dim">
                <span className="flex items-center gap-1.5">
                  <IconCalendar className="w-3.5 h-3.5" /> {new Date(featuredNews.date).toLocaleDateString("tr-TR")}
                </span>
                <span className="flex items-center gap-1.5">
                  <IconUser className="w-3.5 h-3.5" /> <span className="text-gold-400">{featuredNews.author}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <IconEye className="w-3.5 h-3.5" /> {featuredNews.views}
                </span>
              </div>
            </div>
          </article>
        )}

        {/* Right column: 3 stacked posts */}
        <div className="flex flex-col gap-3">
          {sideNews.map((news) => (
            <article key={news.id} className="rounded-xl overflow-hidden group bg-ink-800/50 border border-line flex-1">
              <div className="flex h-full">
                {/* Square image container - fixed size */}
                <div className="w-[72px] h-[72px] shrink-0 relative overflow-hidden">
                  <div className="absolute inset-0 placeholder-img flex items-center justify-center">
                    <span className="font-mono text-[9px] text-cream-dim/40">img</span>
                  </div>
                </div>
                {/* Content */}
                <div className="flex-1 p-3 flex flex-col justify-center min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-semibold text-sm text-cream group-hover:text-gold-300 leading-snug line-clamp-2 flex-1">
                      {news.title}
                    </h4>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${news.tagColor} text-white tracking-wider shrink-0`}
                    >
                      {news.tag}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-1.5 text-[11px] text-cream-dim">
                    <span className="flex items-center gap-1">
                      <IconCalendar className="w-3 h-3" /> {new Date(news.date).toLocaleDateString("tr-TR")}
                    </span>
                    <span className="flex items-center gap-1">
                      <IconUser className="w-3 h-3" /> <span className="text-gold-400">{news.author}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <IconEye className="w-3 h-3" /> {news.views}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
