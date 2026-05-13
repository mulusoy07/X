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

  const topSideNews = sideNews[0]
  const bottomSideNews = sideNews.slice(1)

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
        {/* Big featured post - Left - Image as background with overlay */}
        {featuredNews && (
          <article className="rounded-xl overflow-hidden group cursor-pointer border border-line hover:border-gold-500/30 transition-all duration-300 h-full flex flex-col">
            <div className="relative aspect-[16/11] min-h-[320px] lg:aspect-auto lg:min-h-0 lg:h-full flex-1 overflow-hidden">
              {/* Background Image with zoom effect */}
              <div className="absolute inset-0 placeholder-img transition-transform duration-500 group-hover:scale-105" />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/60 to-transparent" />

              {/* Tag Badge */}
              <span className={`absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full border ${featuredNews.tagColor}/20 bg-${featuredNews.tagColor.replace('bg-', '')}/20 text-white tracking-wider backdrop-blur-sm`}>
                {featuredNews.tag}
              </span>

              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h4 className="font-display text-lg font-bold text-cream group-hover:text-gold-300 transition-colors leading-snug">
                  {featuredNews.title}
                </h4>
                <p className="text-sm text-cream-dim/90 mt-2 leading-relaxed line-clamp-2">{featuredNews.description}</p>
                <div className="flex items-center gap-4 mt-3 text-xs text-cream-dim/80">
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
            </div>
          </article>
        )}

        {/* Right column: Editorial composition (1 horizontal + 2 small) - all image-overlay */}
        <div className="flex flex-col gap-3 h-full">
          {/* Top: Horizontal medium card */}
          {topSideNews && (
            <article className="relative rounded-xl overflow-hidden group cursor-pointer border border-line hover:border-gold-500/30 transition-all duration-300 flex-1 min-h-[140px]">
              <div className="absolute inset-0 placeholder-img transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/60 to-transparent" />
              <span className={`absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full border ${topSideNews.tagColor}/20 ${topSideNews.tagColor} text-white tracking-wider backdrop-blur-sm`}>
                {topSideNews.tag}
              </span>
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h4 className="font-semibold text-sm text-cream group-hover:text-gold-300 transition-colors leading-snug line-clamp-2">
                  {topSideNews.title}
                </h4>
                <div className="flex items-center flex-wrap gap-x-3 gap-y-1 mt-2 text-[11px] text-cream-dim/80">
                  <span className="flex items-center gap-1">
                    <IconCalendar className="w-3 h-3" /> {new Date(topSideNews.date).toLocaleDateString("tr-TR")}
                  </span>
                  <span className="flex items-center gap-1">
                    <IconUser className="w-3 h-3" /> <span className="text-gold-400">{topSideNews.author}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <IconEye className="w-3 h-3" /> {topSideNews.views}
                  </span>
                </div>
              </div>
            </article>
          )}

          {/* Bottom: 2 small cards side by side */}
          <div className="grid grid-cols-2 gap-3 flex-1">
            {bottomSideNews.map((news) => (
              <article key={news.id} className="relative rounded-xl overflow-hidden group cursor-pointer border border-line hover:border-gold-500/30 transition-all duration-300 min-h-[140px]">
                <div className="absolute inset-0 placeholder-img transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/60 to-transparent" />
                <span className={`absolute top-2 right-2 text-[9px] font-bold px-1.5 py-0.5 rounded-full border ${news.tagColor}/20 ${news.tagColor} text-white tracking-wider backdrop-blur-sm`}>
                  {news.tag}
                </span>
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h4 className="font-semibold text-xs text-cream group-hover:text-gold-300 transition-colors leading-snug line-clamp-2">
                    {news.title}
                  </h4>
                  <div className="flex items-center flex-wrap gap-x-2 gap-y-1 mt-2 text-[10px] text-cream-dim/80">
                    <span className="flex items-center gap-1">
                      <IconCalendar className="w-2.5 h-2.5" /> {new Date(news.date).toLocaleDateString("tr-TR")}
                    </span>
                    <span className="flex items-center gap-1">
                      <IconEye className="w-2.5 h-2.5" /> {news.views}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
