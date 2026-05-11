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
    title: "Server Maintenance Completed - New Featur...",
    date: "2026-03-01 08:00:00",
    author: "OracleGM",
    views: 2119,
  },
  {
    id: 5,
    tag: "Update",
    tagColor: "bg-violet-500",
    category: "Guncelleme",
    title: "64-bit Client Version 2.1 Released with Performance...",
    date: "2026-02-28 16:00:00",
    author: "OracleGM",
    views: 3245,
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

      {/* Grid */}
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Big featured post */}
        {featuredNews && (
          <article className="rounded-xl overflow-hidden group flex flex-col row-span-4 bg-ink-800/50 border border-line">
            <div className="relative aspect-[16/9] placeholder-img flex items-center justify-center">
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
              <p className="text-sm text-cream-dim mt-2 leading-relaxed line-clamp-2">{featuredNews.description}</p>
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

        {/* Right column: 4 stacked posts */}
        {sideNews.map((news) => (
          <article key={news.id} className="rounded-xl overflow-hidden group bg-ink-800/50 border border-line h-[72px]">
            <div className="grid grid-cols-[80px_1fr] h-full">
              <div className="placeholder-img relative flex items-center justify-center">
                <span className="font-mono text-[10px] text-cream-dim/50 text-center px-1">img</span>
              </div>
              <div className="p-2.5 pr-3 relative flex flex-col justify-center">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-semibold text-xs text-cream group-hover:text-gold-300 leading-tight line-clamp-2 pr-1 flex-1">
                    {news.title}
                  </h4>
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${news.tagColor} text-white tracking-wider shrink-0`}
                  >
                    {news.tag}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1 text-[10px] text-cream-dim">
                  <span className="flex items-center gap-1">
                    <IconCalendar className="w-2.5 h-2.5" /> {new Date(news.date).toLocaleDateString("tr-TR")}
                  </span>
                  <span className="flex items-center gap-1">
                    <IconEye className="w-2.5 h-2.5" /> {news.views}
                  </span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
