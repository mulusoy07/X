"use client"

import Link from "next/link"
import { IconCalendar, IconUser, IconEye } from "@tabler/icons-react"

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
    tag: "sdaddad",
    tagColor: "bg-rose-500/90",
    category: "Etkinlik",
    title: "Winter Event 2025 — Frozen Throne",
    description:
      "Donmuş tahtın etrafında toplanan klanlar, sezonun en büyük ödüllerini paylaşmak için karşı karşıya geliyor. Etkinlik takvimini ve görev zincirini incele.",
    date: "23.12.2025",
    author: "Owe Owe",
    views: 166,
    featured: true,
  },
  {
    id: 2,
    tag: "sdaddad",
    tagColor: "bg-rose-500/90",
    category: "Rehber",
    title: "Beginner Guide: Starting Your Journey in Knight Online",
    date: "23.12.2025",
    author: "Admin User",
    views: 1873,
  },
  {
    id: 3,
    tag: "adasd",
    tagColor: "bg-rose-500/90",
    category: "Sıralama",
    title: "Clan War Season 5 Rankings Announced",
    date: "23.12.2025",
    author: "Owe Owe",
    views: 412,
  },
  {
    id: 4,
    tag: "patch",
    tagColor: "bg-emerald-500/90",
    category: "Güncelleme",
    title: "64-bit Client Patch Notes — Aralık Güncellemesi",
    date: "22.12.2025",
    author: "Admin User",
    views: 924,
  },
]

export function NewsGrid() {
  const featuredNews = newsItems.find((item) => item.featured)
  const sideNews = newsItems.filter((item) => !item.featured)

  return (
    <div>
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-ink-800 border border-line flex items-center justify-center text-gold-400">
            <IconCalendar className="w-4 h-4" />
          </div>
          <h3 className="text-lg font-semibold text-cream">Son Haberler</h3>
        </div>
        <Link href="#" className="text-sm text-gold-400 hover:text-gold-300 flex items-center gap-1">
          Tümünü Gör <span>→</span>
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Big featured post */}
        {featuredNews && (
          <article className="card rounded-xl overflow-hidden group flex flex-col">
            <div className="relative aspect-[16/10] placeholder-img flex items-center justify-center">
              <span className="font-mono text-xs text-cream-dim/70 px-3 py-1 rounded bg-ink-900/70 border border-line">
                [ winter goddess art ]
              </span>
              <span className={`absolute top-3 right-3 text-[10px] font-bold px-2 py-1 rounded ${featuredNews.tagColor} text-white tracking-wider`}>
                {featuredNews.tag}
              </span>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <div className="text-[10px] tracking-[0.25em] text-gold-400 font-bold uppercase">
                {featuredNews.category}
              </div>
              <h4 className="font-display text-xl font-bold text-cream group-hover:text-gold-300 transition mt-2 leading-snug">
                {featuredNews.title}
              </h4>
              <p className="text-sm text-cream-dim mt-2 leading-relaxed line-clamp-3">{featuredNews.description}</p>
              <div className="flex items-center gap-4 mt-auto pt-4 text-xs text-muted">
                <span className="flex items-center gap-1">
                  <IconCalendar className="w-3.5 h-3.5" /> {featuredNews.date}
                </span>
                <span className="flex items-center gap-1">
                  <IconUser className="w-3.5 h-3.5" /> {featuredNews.author}
                </span>
                <span className="flex items-center gap-1">
                  <IconEye className="w-3.5 h-3.5" /> {featuredNews.views}
                </span>
              </div>
            </div>
          </article>
        )}

        {/* Right column: 3 stacked posts */}
        <div className="flex flex-col gap-4">
          {sideNews.map((news) => (
            <article key={news.id} className="card rounded-xl overflow-hidden group flex-1">
              <div className="grid grid-cols-[140px_1fr] h-full">
                <div className="placeholder-img" />
                <div className="p-3 pr-4 relative flex flex-col">
                  <span
                    className={`absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded ${news.tagColor} text-white tracking-wider`}
                  >
                    {news.tag}
                  </span>
                  <h4 className="font-semibold text-sm text-cream group-hover:text-gold-300 leading-snug pr-16">
                    {news.title}
                  </h4>
                  <div className="flex items-center gap-3 mt-auto pt-3 text-[11px] text-muted">
                    <span className="flex items-center gap-1">
                      <IconCalendar className="w-3 h-3" /> {news.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <IconUser className="w-3 h-3" /> {news.author}
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
