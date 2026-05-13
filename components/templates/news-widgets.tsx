"use client"

import Link from "next/link"
import { IconCalendar, IconUser, IconEye, IconNews, IconChevronRight, IconClock } from "@tabler/icons-react"

/* ============================================================
   DATA
   ============================================================ */

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

const SectionHeader = () => (
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
)

/* ============================================================
   ORIGINAL - current production (1 big left + 1 horizontal + 2 small with overlay)
   ============================================================ */

export function NewsOriginal() {
  const featuredNews = newsItems.find((item) => item.featured)
  const sideNews = newsItems.filter((item) => !item.featured)
  const topSideNews = sideNews[0]
  const bottomSideNews = sideNews.slice(1)

  return (
    <div className="card rounded-xl overflow-hidden">
      <SectionHeader />
      <div className="p-4 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-4">
        {featuredNews && (
          <article className="rounded-xl overflow-hidden group cursor-pointer border border-line hover:border-gold-500/30 transition-all duration-300 h-full flex flex-col">
            <div className="relative aspect-[16/11] min-h-[320px] lg:aspect-auto lg:min-h-0 lg:h-full flex-1 overflow-hidden">
              <div className="absolute inset-0 placeholder-img transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/60 to-transparent" />
              <span className={`absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full border ${featuredNews.tagColor}/20 ${featuredNews.tagColor} text-white tracking-wider backdrop-blur-sm`}>
                {featuredNews.tag}
              </span>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h4 className="font-display text-lg font-bold text-cream group-hover:text-gold-300 transition-colors leading-snug">
                  {featuredNews.title}
                </h4>
                <p className="text-sm text-cream-dim/90 mt-2 leading-relaxed line-clamp-2">{featuredNews.description}</p>
                <div className="flex items-center gap-4 mt-3 text-xs text-cream-dim/80">
                  <span className="flex items-center gap-1.5"><IconCalendar className="w-3.5 h-3.5" /> {new Date(featuredNews.date).toLocaleDateString("tr-TR")}</span>
                  <span className="flex items-center gap-1.5"><IconUser className="w-3.5 h-3.5" /> <span className="text-gold-400">{featuredNews.author}</span></span>
                  <span className="flex items-center gap-1.5"><IconEye className="w-3.5 h-3.5" /> {featuredNews.views}</span>
                </div>
              </div>
            </div>
          </article>
        )}

        <div className="flex flex-col gap-3 h-full">
          {topSideNews && (
            <article className="relative rounded-xl overflow-hidden group cursor-pointer border border-line hover:border-gold-500/30 transition-all duration-300 flex-1 min-h-[140px]">
              <div className="absolute inset-0 placeholder-img transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/60 to-transparent" />
              <span className={`absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full border ${topSideNews.tagColor}/20 ${topSideNews.tagColor} text-white tracking-wider backdrop-blur-sm`}>{topSideNews.tag}</span>
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h4 className="font-semibold text-sm text-cream group-hover:text-gold-300 transition-colors leading-snug line-clamp-2">{topSideNews.title}</h4>
                <div className="flex items-center flex-wrap gap-x-3 gap-y-1 mt-2 text-[11px] text-cream-dim/80">
                  <span className="flex items-center gap-1"><IconCalendar className="w-3 h-3" /> {new Date(topSideNews.date).toLocaleDateString("tr-TR")}</span>
                  <span className="flex items-center gap-1"><IconUser className="w-3 h-3" /> <span className="text-gold-400">{topSideNews.author}</span></span>
                  <span className="flex items-center gap-1"><IconEye className="w-3 h-3" /> {topSideNews.views}</span>
                </div>
              </div>
            </article>
          )}
          <div className="grid grid-cols-2 gap-3 flex-1">
            {bottomSideNews.map((news) => (
              <article key={news.id} className="relative rounded-xl overflow-hidden group cursor-pointer border border-line hover:border-gold-500/30 transition-all duration-300 min-h-[140px]">
                <div className="absolute inset-0 placeholder-img transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/60 to-transparent" />
                <span className={`absolute top-2 right-2 text-[9px] font-bold px-1.5 py-0.5 rounded-full border ${news.tagColor}/20 ${news.tagColor} text-white tracking-wider backdrop-blur-sm`}>{news.tag}</span>
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h4 className="font-semibold text-xs text-cream group-hover:text-gold-300 transition-colors leading-snug line-clamp-2">{news.title}</h4>
                  <div className="flex items-center flex-wrap gap-x-2 gap-y-1 mt-2 text-[10px] text-cream-dim/80">
                    <span className="flex items-center gap-1"><IconCalendar className="w-2.5 h-2.5" /> {new Date(news.date).toLocaleDateString("tr-TR")}</span>
                    <span className="flex items-center gap-1"><IconEye className="w-2.5 h-2.5" /> {news.views}</span>
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

/* ============================================================
   V1 - 2x2 MOSAIC: 4 eşit kare kart
   ============================================================ */

export function NewsV1Mosaic() {
  return (
    <div className="card rounded-xl overflow-hidden">
      <SectionHeader />
      <div className="p-4 grid grid-cols-2 gap-3">
        {newsItems.map((news) => (
          <article key={news.id} className="relative rounded-xl overflow-hidden group cursor-pointer border border-line hover:border-gold-500/30 transition-all duration-300 aspect-[4/3]">
            <div className="absolute inset-0 placeholder-img transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/60 to-transparent" />
            <span className={`absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full border ${news.tagColor}/20 ${news.tagColor} text-white tracking-wider backdrop-blur-sm`}>{news.tag}</span>
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <h4 className="font-semibold text-sm text-cream group-hover:text-gold-300 transition-colors leading-snug line-clamp-2">{news.title}</h4>
              <div className="flex items-center flex-wrap gap-x-2 gap-y-1 mt-2 text-[10px] text-cream-dim/80">
                <span className="flex items-center gap-1"><IconCalendar className="w-2.5 h-2.5" /> {new Date(news.date).toLocaleDateString("tr-TR")}</span>
                <span className="flex items-center gap-1"><IconEye className="w-2.5 h-2.5" /> {news.views}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

/* ============================================================
   V2 - HERO STRIP: Üstte geniş 1 hero, altta 3 küçük yan yana
   ============================================================ */

export function NewsV2HeroStrip() {
  const featuredNews = newsItems.find((item) => item.featured)
  const sideNews = newsItems.filter((item) => !item.featured)

  return (
    <div className="card rounded-xl overflow-hidden">
      <SectionHeader />
      <div className="p-4 flex flex-col gap-3">
        {featuredNews && (
          <article className="relative rounded-xl overflow-hidden group cursor-pointer border border-line hover:border-gold-500/30 transition-all duration-300 h-[260px]">
            <div className="absolute inset-0 placeholder-img transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/70 to-transparent" />
            <span className={`absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full border ${featuredNews.tagColor}/20 ${featuredNews.tagColor} text-white tracking-wider backdrop-blur-sm`}>{featuredNews.tag}</span>
            <div className="absolute bottom-0 left-0 right-0 p-5 max-w-[60%]">
              <h4 className="font-display text-2xl font-bold text-cream group-hover:text-gold-300 transition-colors leading-tight">{featuredNews.title}</h4>
              <p className="text-sm text-cream-dim/90 mt-2 leading-relaxed line-clamp-2">{featuredNews.description}</p>
              <div className="flex items-center gap-4 mt-3 text-xs text-cream-dim/80">
                <span className="flex items-center gap-1.5"><IconCalendar className="w-3.5 h-3.5" /> {new Date(featuredNews.date).toLocaleDateString("tr-TR")}</span>
                <span className="flex items-center gap-1.5"><IconUser className="w-3.5 h-3.5" /> <span className="text-gold-400">{featuredNews.author}</span></span>
                <span className="flex items-center gap-1.5"><IconEye className="w-3.5 h-3.5" /> {featuredNews.views}</span>
              </div>
            </div>
          </article>
        )}
        <div className="grid grid-cols-3 gap-3">
          {sideNews.map((news) => (
            <article key={news.id} className="relative rounded-xl overflow-hidden group cursor-pointer border border-line hover:border-gold-500/30 transition-all duration-300 aspect-[4/3]">
              <div className="absolute inset-0 placeholder-img transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/60 to-transparent" />
              <span className={`absolute top-2 right-2 text-[9px] font-bold px-1.5 py-0.5 rounded-full border ${news.tagColor}/20 ${news.tagColor} text-white tracking-wider backdrop-blur-sm`}>{news.tag}</span>
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h4 className="font-semibold text-xs text-cream group-hover:text-gold-300 transition-colors leading-snug line-clamp-2">{news.title}</h4>
                <div className="flex items-center gap-2 mt-2 text-[10px] text-cream-dim/80">
                  <span className="flex items-center gap-1"><IconEye className="w-2.5 h-2.5" /> {news.views}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ============================================================
   V3 - MAGAZINE LIST: Sol büyük, sağ alt alta minimal liste
   ============================================================ */

export function NewsV3MagazineList() {
  const featuredNews = newsItems.find((item) => item.featured)
  const sideNews = newsItems.filter((item) => !item.featured)

  return (
    <div className="card rounded-xl overflow-hidden">
      <SectionHeader />
      <div className="p-4 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-4">
        {featuredNews && (
          <article className="relative rounded-xl overflow-hidden group cursor-pointer border border-line hover:border-gold-500/30 transition-all duration-300 min-h-[420px]">
            <div className="absolute inset-0 placeholder-img transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/60 to-transparent" />
            <span className={`absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full border ${featuredNews.tagColor}/20 ${featuredNews.tagColor} text-white tracking-wider backdrop-blur-sm`}>{featuredNews.tag}</span>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h4 className="font-display text-xl font-bold text-cream group-hover:text-gold-300 transition-colors leading-snug">{featuredNews.title}</h4>
              <p className="text-sm text-cream-dim/90 mt-2 leading-relaxed line-clamp-2">{featuredNews.description}</p>
              <div className="flex items-center gap-4 mt-3 text-xs text-cream-dim/80">
                <span className="flex items-center gap-1.5"><IconCalendar className="w-3.5 h-3.5" /> {new Date(featuredNews.date).toLocaleDateString("tr-TR")}</span>
                <span className="flex items-center gap-1.5"><IconUser className="w-3.5 h-3.5" /> <span className="text-gold-400">{featuredNews.author}</span></span>
                <span className="flex items-center gap-1.5"><IconEye className="w-3.5 h-3.5" /> {featuredNews.views}</span>
              </div>
            </div>
          </article>
        )}
        <div className="flex flex-col gap-2">
          {sideNews.map((news, idx) => (
            <article key={news.id} className="group cursor-pointer p-3 rounded-lg border border-line hover:border-gold-500/30 bg-ink-800/40 transition-all duration-300 flex items-start gap-3 flex-1">
              <span className="text-2xl font-display font-black text-gold-400/40 group-hover:text-gold-400/80 transition-colors leading-none shrink-0 mt-0.5">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full border ${news.tagColor}/20 ${news.tagColor} text-white tracking-wider`}>{news.tag}</span>
                  <span className="text-[10px] text-cream-dim/60 flex items-center gap-1"><IconClock className="w-2.5 h-2.5" />{new Date(news.date).toLocaleDateString("tr-TR")}</span>
                </div>
                <h4 className="font-semibold text-sm text-cream group-hover:text-gold-300 transition-colors leading-snug line-clamp-2">{news.title}</h4>
                <div className="flex items-center gap-3 mt-2 text-[10px] text-cream-dim/80">
                  <span className="flex items-center gap-1"><IconUser className="w-2.5 h-2.5" /> <span className="text-gold-400">{news.author}</span></span>
                  <span className="flex items-center gap-1"><IconEye className="w-2.5 h-2.5" /> {news.views}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ============================================================
   V4 - ASYMMETRIC TALL: Sol büyük dikey, sağda 3 kart üst üste (eşit)
   ============================================================ */

export function NewsV4Asymmetric() {
  const featuredNews = newsItems.find((item) => item.featured)
  const sideNews = newsItems.filter((item) => !item.featured)

  return (
    <div className="card rounded-xl overflow-hidden">
      <SectionHeader />
      <div className="p-4 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-3">
        {featuredNews && (
          <article className="relative rounded-xl overflow-hidden group cursor-pointer border border-line hover:border-gold-500/30 transition-all duration-300 min-h-[460px]">
            <div className="absolute inset-0 placeholder-img transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
            <div className="absolute top-0 left-0 right-0 p-4 flex items-start justify-between">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold-400 bg-ink-950/60 backdrop-blur-sm rounded px-2 py-1 border border-gold-500/30">ONE CIKAN</span>
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${featuredNews.tagColor}/20 ${featuredNews.tagColor} text-white tracking-wider backdrop-blur-sm`}>{featuredNews.tag}</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <h4 className="font-display text-2xl font-bold text-cream group-hover:text-gold-300 transition-colors leading-tight">{featuredNews.title}</h4>
              <p className="text-sm text-cream-dim/90 mt-2 leading-relaxed line-clamp-2">{featuredNews.description}</p>
              <div className="flex items-center gap-4 mt-3 text-xs text-cream-dim/80">
                <span className="flex items-center gap-1.5"><IconCalendar className="w-3.5 h-3.5" /> {new Date(featuredNews.date).toLocaleDateString("tr-TR")}</span>
                <span className="flex items-center gap-1.5"><IconUser className="w-3.5 h-3.5" /> <span className="text-gold-400">{featuredNews.author}</span></span>
                <span className="flex items-center gap-1.5"><IconEye className="w-3.5 h-3.5" /> {featuredNews.views}</span>
              </div>
            </div>
          </article>
        )}
        <div className="flex flex-col gap-3">
          {sideNews.map((news) => (
            <article key={news.id} className="relative rounded-xl overflow-hidden group cursor-pointer border border-line hover:border-gold-500/30 transition-all duration-300 flex-1 min-h-[140px]">
              <div className="absolute inset-0 placeholder-img transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/60 to-transparent" />
              <span className={`absolute top-2 right-2 text-[9px] font-bold px-1.5 py-0.5 rounded-full border ${news.tagColor}/20 ${news.tagColor} text-white tracking-wider backdrop-blur-sm`}>{news.tag}</span>
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h4 className="font-semibold text-sm text-cream group-hover:text-gold-300 transition-colors leading-snug line-clamp-2">{news.title}</h4>
                <div className="flex items-center gap-3 mt-2 text-[10px] text-cream-dim/80">
                  <span className="flex items-center gap-1"><IconCalendar className="w-2.5 h-2.5" /> {new Date(news.date).toLocaleDateString("tr-TR")}</span>
                  <span className="flex items-center gap-1"><IconEye className="w-2.5 h-2.5" /> {news.views}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ============================================================
   V5 - SPLIT 3-COL: Sol büyük, orta 1 büyük, sağ 2 küçük stacked
   ============================================================ */

export function NewsV5SplitColumns() {
  const featuredNews = newsItems.find((item) => item.featured)
  const sideNews = newsItems.filter((item) => !item.featured)
  const midNews = sideNews[0]
  const rightNews = sideNews.slice(1)

  return (
    <div className="card rounded-xl overflow-hidden">
      <SectionHeader />
      <div className="p-4 grid grid-cols-1 lg:grid-cols-3 gap-3 min-h-[420px]">
        {featuredNews && (
          <article className="relative rounded-xl overflow-hidden group cursor-pointer border border-line hover:border-gold-500/30 transition-all duration-300 min-h-[400px]">
            <div className="absolute inset-0 placeholder-img transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/60 to-transparent" />
            <span className={`absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full border ${featuredNews.tagColor}/20 ${featuredNews.tagColor} text-white tracking-wider backdrop-blur-sm`}>{featuredNews.tag}</span>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h4 className="font-display text-lg font-bold text-cream group-hover:text-gold-300 transition-colors leading-snug">{featuredNews.title}</h4>
              <p className="text-xs text-cream-dim/90 mt-2 leading-relaxed line-clamp-2">{featuredNews.description}</p>
              <div className="flex items-center gap-3 mt-3 text-[11px] text-cream-dim/80">
                <span className="flex items-center gap-1"><IconCalendar className="w-3 h-3" /> {new Date(featuredNews.date).toLocaleDateString("tr-TR")}</span>
                <span className="flex items-center gap-1"><IconEye className="w-3 h-3" /> {featuredNews.views}</span>
              </div>
            </div>
          </article>
        )}
        {midNews && (
          <article className="relative rounded-xl overflow-hidden group cursor-pointer border border-line hover:border-gold-500/30 transition-all duration-300 min-h-[400px]">
            <div className="absolute inset-0 placeholder-img transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/60 to-transparent" />
            <span className={`absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full border ${midNews.tagColor}/20 ${midNews.tagColor} text-white tracking-wider backdrop-blur-sm`}>{midNews.tag}</span>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h4 className="font-display text-lg font-bold text-cream group-hover:text-gold-300 transition-colors leading-snug">{midNews.title}</h4>
              <div className="flex items-center gap-3 mt-3 text-[11px] text-cream-dim/80">
                <span className="flex items-center gap-1"><IconCalendar className="w-3 h-3" /> {new Date(midNews.date).toLocaleDateString("tr-TR")}</span>
                <span className="flex items-center gap-1"><IconUser className="w-3 h-3" /> <span className="text-gold-400">{midNews.author}</span></span>
                <span className="flex items-center gap-1"><IconEye className="w-3 h-3" /> {midNews.views}</span>
              </div>
            </div>
          </article>
        )}
        <div className="flex flex-col gap-3">
          {rightNews.map((news) => (
            <article key={news.id} className="relative rounded-xl overflow-hidden group cursor-pointer border border-line hover:border-gold-500/30 transition-all duration-300 flex-1 min-h-[180px]">
              <div className="absolute inset-0 placeholder-img transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/60 to-transparent" />
              <span className={`absolute top-2 right-2 text-[9px] font-bold px-1.5 py-0.5 rounded-full border ${news.tagColor}/20 ${news.tagColor} text-white tracking-wider backdrop-blur-sm`}>{news.tag}</span>
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h4 className="font-semibold text-sm text-cream group-hover:text-gold-300 transition-colors leading-snug line-clamp-2">{news.title}</h4>
                <div className="flex items-center gap-3 mt-2 text-[10px] text-cream-dim/80">
                  <span className="flex items-center gap-1"><IconEye className="w-2.5 h-2.5" /> {news.views}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ============================================================
   SHOWCASE
   ============================================================ */

const Label = ({ tag, title, desc }: { tag: string; title: string; desc: string }) => (
  <div className="mb-3">
    <div className="flex items-center gap-2 mb-1">
      <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-ink-700 border border-line text-cream-dim">{tag}</span>
      <span className="font-bold text-cream text-sm">{title}</span>
    </div>
    <p className="text-[11px] text-cream-dim/70 leading-relaxed">{desc}</p>
  </div>
)

export function NewsWidgetsShowcase() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-12">
      <section>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded-lg bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400"><IconNews className="w-4 h-4" /></div>
          <div>
            <h2 className="text-lg font-black text-cream">News Widgets</h2>
            <p className="text-xs text-cream-dim">5 varyasyon + orijinal</p>
          </div>
        </div>

        <div className="space-y-12">
          <div>
            <Label tag="ORIJINAL" title="Production Copy" desc="Mevcut production versiyonu (oracle/news-grid.tsx)." />
            <NewsOriginal />
          </div>
          <div>
            <Label tag="V1" title="2x2 Mosaic" desc="4 esit kare kart, hepsi gorsel-ustu metin." />
            <NewsV1Mosaic />
          </div>
          <div>
            <Label tag="V2" title="Hero Strip" desc="Ustte genis hero banner, altta 3 kucuk kart yan yana." />
            <NewsV2HeroStrip />
          </div>
          <div>
            <Label tag="V3" title="Magazine List" desc="Solda buyuk gorsel, sagda numarali minimal liste." />
            <NewsV3MagazineList />
          </div>
          <div>
            <Label tag="V4" title="Asymmetric Tall" desc="Solda buyuk dikey, sagda 3 esit yatay kart." />
            <NewsV4Asymmetric />
          </div>
          <div>
            <Label tag="V5" title="Split Columns" desc="3 kolon: 2 buyuk + sagda 2 stacked kucuk." />
            <NewsV5SplitColumns />
          </div>
        </div>
      </section>
    </div>
  )
}
