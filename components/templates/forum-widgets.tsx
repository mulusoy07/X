"use client"

import { useState } from "react"
import Link from "next/link"
import {
  IconMessageCircle,
  IconChevronRight,
  IconFlame,
  IconEye,
  IconClock,
  IconUser,
  IconHeart,
  IconBookmark,
  IconPin,
  IconTrendingUp,
  IconStar,
  IconMessage,
  IconArrowUp,
  IconCornerDownRight,
  IconDots,
  IconBell,
  IconFilter,
} from "@tabler/icons-react"

interface ForumTopic {
  id: number
  title: string
  category: string
  categoryColor: "violet" | "sky" | "emerald" | "rose" | "amber" | "gold"
  author: string
  avatar?: string
  replies: number
  views?: number
  likes?: number
  isHot?: boolean
  isPinned?: boolean
  lastReply?: string
  timeAgo?: string
  excerpt?: string
}

const topics: ForumTopic[] = [
  { id: 1, title: "Server acilis tarihi ne zaman?", category: "Genel Tartisma", categoryColor: "violet", author: "Thoketh914", replies: 12, views: 234, likes: 8, timeAgo: "2s once", excerpt: "Merhaba arkadaslar, yeni server ne zaman acilacak bilgisi olan var mi?" },
  { id: 2, title: "Upgrade scroll oranlari hakkinda", category: "Oyun Rehberi", categoryColor: "sky", author: "Gorus424", replies: 8, views: 156, likes: 15, timeAgo: "5s once", excerpt: "Upgrade oranlari cok dusuk gibi geldi bana, sizce normal mi?" },
  { id: 3, title: "BrutalGuard klan uye ariyor", category: "Klan Duyurulari", categoryColor: "emerald", author: "Kragath680", replies: 5, views: 89, likes: 3, isHot: true, timeAgo: "1d once", excerpt: "Aktif PvP oyunculari ariyoruz, 70+ level sart." },
  { id: 4, title: "Nation War saatleri degisti mi?", category: "Genel Tartisma", categoryColor: "violet", author: "Cedion252", replies: 3, views: 67, likes: 2, timeAgo: "3s once", isPinned: true, excerpt: "NW saatleri degismis mi? Eskiden 21:00'di simdi farkli gorunuyor." },
  { id: 5, title: "Yeni baslayan olarak ne yapmaliyim?", category: "Oyun Rehberi", categoryColor: "sky", author: "Arthion93", replies: 21, views: 445, likes: 32, isHot: true, timeAgo: "6s once", excerpt: "Oyuna yeni basladim, ilk ne yapmaliyim?" },
]

const colorClasses = {
  violet: { avatar: "from-violet-500 to-violet-700", badge: "bg-violet-500/20 text-violet-300 border-violet-500/30", dot: "bg-violet-400" },
  sky: { avatar: "from-sky-500 to-sky-700", badge: "bg-sky-500/20 text-sky-300 border-sky-500/30", dot: "bg-sky-400" },
  emerald: { avatar: "from-emerald-500 to-emerald-700", badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30", dot: "bg-emerald-400" },
  rose: { avatar: "from-rose-500 to-rose-700", badge: "bg-rose-500/20 text-rose-300 border-rose-500/30", dot: "bg-rose-400" },
  amber: { avatar: "from-amber-500 to-amber-700", badge: "bg-amber-500/20 text-amber-300 border-amber-500/30", dot: "bg-amber-400" },
  gold: { avatar: "from-gold-500 to-gold-700", badge: "bg-gold-500/20 text-gold-300 border-gold-500/30", dot: "bg-gold-400" },
}

// V01 - Classic List (Original Style)
function ForumWidgetV01() {
  return (
    <div className="rounded-xl border border-line bg-gradient-to-br from-ink-800/90 via-ink-900/90 to-ink-950 overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-line">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400">
            <IconMessageCircle className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-cream">Forum</h3>
            <p className="text-xs text-cream-dim">Son konular</p>
          </div>
        </div>
        <Link href="/forum" className="text-xs text-gold-400 hover:text-gold-300 flex items-center gap-1">
          Tumunu Gor <IconChevronRight className="w-3 h-3" />
        </Link>
      </div>

      <ul className="divide-y divide-line/50">
        {topics.slice(0, 5).map((topic) => {
          const colors = colorClasses[topic.categoryColor]
          return (
            <li key={topic.id} className="hover:bg-ink-800/60 transition cursor-pointer">
              <Link href={`/forum/konu/${topic.id}`} className="flex items-center gap-3 p-4">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colors.avatar} flex items-center justify-center shrink-0 relative`}>
                  <IconMessageCircle className="w-4 h-4 text-white" />
                  {topic.isHot && <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full border-2 border-ink-800" />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-semibold text-sm text-cream truncate">{topic.title}</h4>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border whitespace-nowrap shrink-0 ${colors.badge}`}>{topic.category}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1.5 text-xs">
                    <span className="text-gold-400 font-medium">{topic.author}</span>
                    <span className="w-1 h-1 rounded-full bg-cream-dim/30" />
                    <span className="text-cream-dim">{topic.replies} yanit</span>
                  </div>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>

      <div className="px-4 py-3 border-t border-line bg-ink-900/50">
        <Link href="/forum/yeni-konu" className="w-full h-10 rounded-lg border border-dashed border-gold-500/30 flex items-center justify-center text-sm text-gold-400 hover:bg-gold-500/5 hover:border-gold-500/50 transition-all gap-2">
          <IconMessageCircle className="w-4 h-4" />
          Yeni Konu Ac
        </Link>
      </div>
    </div>
  )
}

// V02 - Compact Cards
function ForumWidgetV02() {
  return (
    <div className="rounded-xl border border-line bg-gradient-to-br from-ink-800/90 via-ink-900/90 to-ink-950 overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-line">
        <div className="flex items-center gap-2">
          <IconFlame className="w-5 h-5 text-gold-400" />
          <h3 className="font-bold text-cream">Populer Konular</h3>
        </div>
        <Link href="/forum" className="text-xs text-cream-dim hover:text-gold-400 transition">Tumu</Link>
      </div>

      <div className="p-3 grid grid-cols-2 gap-2">
        {topics.slice(0, 4).map((topic) => {
          const colors = colorClasses[topic.categoryColor]
          return (
            <Link key={topic.id} href={`/forum/konu/${topic.id}`} className="group p-3 rounded-lg bg-ink-800/50 border border-line/50 hover:border-gold-500/30 transition-all">
              <div className="flex items-center gap-2 mb-2">
                <span className={`w-2 h-2 rounded-full ${colors.dot}`} />
                <span className="text-[10px] text-cream-dim truncate">{topic.category}</span>
              </div>
              <h4 className="text-sm font-medium text-cream line-clamp-2 group-hover:text-gold-400 transition-colors">{topic.title}</h4>
              <div className="flex items-center gap-3 mt-2 text-[10px] text-cream-dim">
                <span className="flex items-center gap-1"><IconMessage className="w-3 h-3" />{topic.replies}</span>
                <span className="flex items-center gap-1"><IconEye className="w-3 h-3" />{topic.views}</span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

// V03 - Timeline Style
function ForumWidgetV03() {
  return (
    <div className="rounded-xl border border-line bg-gradient-to-br from-ink-800/90 via-ink-900/90 to-ink-950 overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-line">
        <div className="flex items-center gap-2">
          <IconClock className="w-5 h-5 text-gold-400" />
          <h3 className="font-bold text-cream">Son Aktiviteler</h3>
        </div>
      </div>

      <div className="p-4">
        <div className="relative pl-6 space-y-4">
          {/* Timeline line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-gold-500/50 via-line to-transparent" />
          
          {topics.slice(0, 5).map((topic, i) => {
            const colors = colorClasses[topic.categoryColor]
            return (
              <div key={topic.id} className="relative group">
                {/* Timeline dot */}
                <div className={`absolute -left-6 top-1 w-4 h-4 rounded-full ${i === 0 ? 'bg-gold-500 ring-4 ring-gold-500/20' : 'bg-ink-700 border-2 border-line'} transition-all group-hover:border-gold-500/50`} />
                
                <Link href={`/forum/konu/${topic.id}`} className="block">
                  <span className="text-[10px] text-cream-dim">{topic.timeAgo}</span>
                  <h4 className="text-sm font-medium text-cream group-hover:text-gold-400 transition-colors mt-0.5">{topic.title}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${colors.badge}`}>{topic.category}</span>
                    <span className="text-[10px] text-cream-dim">by {topic.author}</span>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// V04 - Stats Focus
function ForumWidgetV04() {
  return (
    <div className="rounded-xl border border-line bg-gradient-to-br from-ink-800/90 via-ink-900/90 to-ink-950 overflow-hidden">
      {/* Stats Header */}
      <div className="grid grid-cols-3 divide-x divide-line border-b border-line">
        <div className="p-3 text-center">
          <div className="text-lg font-bold text-gold-400">156</div>
          <div className="text-[10px] text-cream-dim">Aktif Konu</div>
        </div>
        <div className="p-3 text-center">
          <div className="text-lg font-bold text-emerald-400">1.2K</div>
          <div className="text-[10px] text-cream-dim">Mesaj</div>
        </div>
        <div className="p-3 text-center">
          <div className="text-lg font-bold text-sky-400">89</div>
          <div className="text-[10px] text-cream-dim">Online</div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-sm font-bold text-cream mb-3 flex items-center gap-2">
          <IconTrendingUp className="w-4 h-4 text-gold-400" />
          Trend Konular
        </h3>
        
        <div className="space-y-2">
          {topics.slice(0, 4).map((topic, i) => (
            <Link key={topic.id} href={`/forum/konu/${topic.id}`} className="flex items-center gap-3 p-2 rounded-lg hover:bg-ink-800/50 transition group">
              <span className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold ${i === 0 ? 'bg-gold-500 text-ink-900' : 'bg-ink-700 text-cream-dim'}`}>
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm text-cream truncate group-hover:text-gold-400 transition-colors">{topic.title}</h4>
              </div>
              <div className="flex items-center gap-1 text-cream-dim">
                <IconArrowUp className="w-3 h-3 text-emerald-400" />
                <span className="text-xs">{topic.views}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

// V05 - Preview Cards with Excerpt
function ForumWidgetV05() {
  return (
    <div className="rounded-xl border border-line bg-gradient-to-br from-ink-800/90 via-ink-900/90 to-ink-950 overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-line">
        <h3 className="font-bold text-cream">Son Konular</h3>
        <div className="flex items-center gap-1">
          <button className="p-1.5 rounded-md hover:bg-ink-700 transition"><IconBell className="w-4 h-4 text-cream-dim" /></button>
          <button className="p-1.5 rounded-md hover:bg-ink-700 transition"><IconFilter className="w-4 h-4 text-cream-dim" /></button>
        </div>
      </div>

      <div className="p-3 space-y-2">
        {topics.slice(0, 3).map((topic) => {
          const colors = colorClasses[topic.categoryColor]
          return (
            <Link key={topic.id} href={`/forum/konu/${topic.id}`} className="block p-3 rounded-lg bg-ink-800/30 border border-line/30 hover:border-gold-500/30 hover:bg-ink-800/50 transition-all group">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${colors.badge}`}>{topic.category}</span>
                <span className="text-[10px] text-cream-dim">{topic.timeAgo}</span>
              </div>
              <h4 className="font-semibold text-cream group-hover:text-gold-400 transition-colors">{topic.title}</h4>
              <p className="text-xs text-cream-dim mt-1 line-clamp-2">{topic.excerpt}</p>
              <div className="flex items-center justify-between mt-3 pt-2 border-t border-line/30">
                <div className="flex items-center gap-2">
                  <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${colors.avatar}`} />
                  <span className="text-xs text-gold-400">{topic.author}</span>
                </div>
                <div className="flex items-center gap-3 text-[10px] text-cream-dim">
                  <span className="flex items-center gap-1"><IconHeart className="w-3 h-3" />{topic.likes}</span>
                  <span className="flex items-center gap-1"><IconMessage className="w-3 h-3" />{topic.replies}</span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

// V06 - Minimal List
function ForumWidgetV06() {
  return (
    <div className="rounded-xl border border-line bg-gradient-to-br from-ink-800/90 via-ink-900/90 to-ink-950 overflow-hidden">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-5 rounded-full bg-gold-500" />
          <h3 className="font-bold text-cream">Forum</h3>
        </div>

        <div className="space-y-1">
          {topics.slice(0, 5).map((topic) => (
            <Link key={topic.id} href={`/forum/konu/${topic.id}`} className="flex items-center justify-between p-2 rounded-md hover:bg-ink-800/50 transition group">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                {topic.isPinned && <IconPin className="w-3 h-3 text-gold-400 shrink-0" />}
                {topic.isHot && <IconFlame className="w-3 h-3 text-rose-400 shrink-0" />}
                <span className="text-sm text-cream truncate group-hover:text-gold-400 transition-colors">{topic.title}</span>
              </div>
              <span className="text-xs text-cream-dim ml-2 shrink-0">{topic.replies}</span>
            </Link>
          ))}
        </div>

        <Link href="/forum" className="block mt-3 pt-3 border-t border-line text-center text-xs text-gold-400 hover:text-gold-300 transition">
          Foruma Git
        </Link>
      </div>
    </div>
  )
}

// V07 - Tabbed Categories
function ForumWidgetV07() {
  const [activeTab, setActiveTab] = useState("all")
  const tabs = [
    { id: "all", label: "Tumu" },
    { id: "hot", label: "Populer" },
    { id: "new", label: "Yeni" },
  ]

  const filteredTopics = activeTab === "hot" 
    ? topics.filter(t => t.isHot) 
    : activeTab === "new" 
    ? topics.slice(0, 3) 
    : topics

  return (
    <div className="rounded-xl border border-line bg-gradient-to-br from-ink-800/90 via-ink-900/90 to-ink-950 overflow-hidden">
      {/* Tabs */}
      <div className="flex items-center gap-1 p-2 border-b border-line bg-ink-900/50">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all ${
              activeTab === tab.id
                ? "bg-gold-500/20 text-gold-400 border border-gold-500/30"
                : "text-cream-dim hover:text-cream hover:bg-ink-800/50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="divide-y divide-line/30">
        {filteredTopics.slice(0, 4).map((topic) => {
          const colors = colorClasses[topic.categoryColor]
          return (
            <Link key={topic.id} href={`/forum/konu/${topic.id}`} className="flex items-center gap-3 p-3 hover:bg-ink-800/40 transition">
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${colors.avatar} flex items-center justify-center shrink-0`}>
                <IconMessageCircle className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-sm text-cream truncate">{topic.title}</h4>
                <div className="flex items-center gap-2 mt-0.5 text-[10px] text-cream-dim">
                  <span>{topic.author}</span>
                  <span>•</span>
                  <span>{topic.timeAgo}</span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

// V08 - Social Style with Actions
function ForumWidgetV08() {
  return (
    <div className="rounded-xl border border-line bg-gradient-to-br from-ink-800/90 via-ink-900/90 to-ink-950 overflow-hidden">
      <div className="p-4 border-b border-line">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-cream">Topluluk</h3>
          <button className="p-1.5 rounded-md hover:bg-ink-700 transition"><IconDots className="w-4 h-4 text-cream-dim" /></button>
        </div>
      </div>

      <div className="divide-y divide-line/30">
        {topics.slice(0, 3).map((topic) => {
          const colors = colorClasses[topic.categoryColor]
          return (
            <div key={topic.id} className="p-4">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${colors.avatar} flex items-center justify-center shrink-0`}>
                  <IconUser className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-gold-400">{topic.author}</span>
                    <span className="text-[10px] text-cream-dim">{topic.timeAgo}</span>
                  </div>
                  <Link href={`/forum/konu/${topic.id}`} className="block mt-1">
                    <h4 className="text-sm text-cream hover:text-gold-400 transition-colors">{topic.title}</h4>
                  </Link>
                  <p className="text-xs text-cream-dim mt-1 line-clamp-2">{topic.excerpt}</p>
                  
                  {/* Actions */}
                  <div className="flex items-center gap-4 mt-3">
                    <button className="flex items-center gap-1 text-cream-dim hover:text-rose-400 transition">
                      <IconHeart className="w-4 h-4" />
                      <span className="text-xs">{topic.likes}</span>
                    </button>
                    <button className="flex items-center gap-1 text-cream-dim hover:text-sky-400 transition">
                      <IconMessage className="w-4 h-4" />
                      <span className="text-xs">{topic.replies}</span>
                    </button>
                    <button className="flex items-center gap-1 text-cream-dim hover:text-gold-400 transition">
                      <IconBookmark className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// V09 - Magazine Layout
function ForumWidgetV09() {
  const featured = topics[4]
  const featuredColors = colorClasses[featured.categoryColor]

  return (
    <div className="rounded-xl border border-line bg-gradient-to-br from-ink-800/90 via-ink-900/90 to-ink-950 overflow-hidden">
      {/* Featured Topic */}
      <Link href={`/forum/konu/${featured.id}`} className="block p-4 bg-gradient-to-r from-gold-500/10 to-transparent border-b border-line group">
        <div className="flex items-center gap-2 mb-2">
          <IconStar className="w-4 h-4 text-gold-400" />
          <span className="text-[10px] font-bold text-gold-400 uppercase tracking-wider">One Cikan</span>
        </div>
        <h3 className="text-lg font-bold text-cream group-hover:text-gold-400 transition-colors">{featured.title}</h3>
        <p className="text-sm text-cream-dim mt-1 line-clamp-2">{featured.excerpt}</p>
        <div className="flex items-center gap-3 mt-3 text-xs text-cream-dim">
          <span className="text-gold-400 font-medium">{featured.author}</span>
          <span>•</span>
          <span>{featured.replies} yanit</span>
          <span>•</span>
          <span>{featured.views} goruntulenme</span>
        </div>
      </Link>

      {/* Other Topics */}
      <div className="divide-y divide-line/30">
        {topics.slice(0, 3).map((topic) => {
          const colors = colorClasses[topic.categoryColor]
          return (
            <Link key={topic.id} href={`/forum/konu/${topic.id}`} className="flex items-center gap-3 p-3 hover:bg-ink-800/40 transition group">
              <span className={`w-2 h-2 rounded-full ${colors.dot}`} />
              <h4 className="flex-1 text-sm text-cream truncate group-hover:text-gold-400 transition-colors">{topic.title}</h4>
              <span className="text-xs text-cream-dim">{topic.replies}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

// V11 - Timeline with Actions (V01 Header + V03 Content)
export function ForumWidgetV11() {
  return (
    <div className="rounded-xl border border-line bg-gradient-to-br from-ink-800/90 via-ink-900/90 to-ink-950 overflow-hidden h-full flex flex-col">
      {/* V01 Style Header */}
      <div className="flex items-center justify-between p-4 border-b border-line">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400">
            <IconMessageCircle className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-cream">Forum</h3>
            <p className="text-xs text-cream-dim">Son konular</p>
          </div>
        </div>
        <Link href="/forum" className="text-xs text-gold-400 hover:text-gold-300 flex items-center gap-1">
          Tumunu Gor <IconChevronRight className="w-3 h-3" />
        </Link>
      </div>

      {/* V03 Style Timeline Content */}
      <div className="p-4 flex-1">
        <div className="relative pl-6 space-y-4">
          {/* Timeline line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-gold-500/50 via-line to-transparent" />
          
          {topics.slice(0, 5).map((topic, i) => {
            const colors = colorClasses[topic.categoryColor]
            return (
              <div key={topic.id} className="relative group">
                {/* Timeline dot */}
                <div className={`absolute -left-6 top-1 w-4 h-4 rounded-full ${i === 0 ? 'bg-gold-500 ring-4 ring-gold-500/20' : 'bg-ink-700 border-2 border-line'} transition-all group-hover:border-gold-500/50`} />
                
                <Link href={`/forum/konu/${topic.id}`} className="block">
                  <span className="text-[10px] text-cream-dim">{topic.timeAgo}</span>
                  <h4 className="text-sm font-medium text-cream group-hover:text-gold-400 transition-colors mt-0.5">{topic.title}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${colors.badge}`}>{topic.category}</span>
                    <span className="text-[10px] text-cream-dim">by {topic.author}</span>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
      </div>

      {/* V01 Style Footer */}
      <div className="px-4 py-3 border-t border-line bg-ink-900/50 mt-auto">
        <Link href="/forum/yeni-konu" className="w-full h-10 rounded-lg border border-dashed border-gold-500/30 flex items-center justify-center text-sm text-gold-400 hover:bg-gold-500/5 hover:border-gold-500/50 transition-all gap-2">
          <IconMessageCircle className="w-4 h-4" />
          Yeni Konu Ac
        </Link>
      </div>
    </div>
  )
}

// V10 - Notification Style
function ForumWidgetV10() {
  return (
    <div className="rounded-xl border border-line bg-gradient-to-br from-ink-800/90 via-ink-900/90 to-ink-950 overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-line">
        <div className="flex items-center gap-2">
          <div className="relative">
            <IconBell className="w-5 h-5 text-gold-400" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full" />
          </div>
          <h3 className="font-bold text-cream">Bildirimler</h3>
        </div>
        <span className="text-xs text-gold-400 bg-gold-500/10 px-2 py-0.5 rounded-full">5 yeni</span>
      </div>

      <div className="max-h-[300px] overflow-y-auto">
        {topics.map((topic) => {
          const colors = colorClasses[topic.categoryColor]
          return (
            <Link key={topic.id} href={`/forum/konu/${topic.id}`} className="flex items-start gap-3 p-3 hover:bg-ink-800/40 transition border-b border-line/20 last:border-b-0">
              <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${colors.avatar} flex items-center justify-center shrink-0 mt-0.5`}>
                <IconUser className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-cream">
                  <span className="font-semibold text-gold-400">{topic.author}</span>
                  <span className="text-cream-dim"> yeni bir konu acti:</span>
                </p>
                <p className="text-sm text-cream-dim truncate mt-0.5">{topic.title}</p>
                <span className="text-[10px] text-cream-dim/60 mt-1 block">{topic.timeAgo}</span>
              </div>
              {topic.isHot && <span className="w-2 h-2 rounded-full bg-gold-500 shrink-0 mt-2" />}
            </Link>
          )
        })}
      </div>

      <div className="p-3 border-t border-line bg-ink-900/50">
        <button className="w-full text-center text-xs text-cream-dim hover:text-gold-400 transition">
          Tum bildirimleri gor
        </button>
      </div>
    </div>
  )
}

export default function ForumWidgetsTemplate() {
  return (
    <div className="min-h-screen bg-ink-950 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-cream">Forum Widget Sablonlari</h1>
          <p className="text-cream-dim mt-1">10 farkli forum widget varyasyonu</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <h2 className="text-sm font-bold text-gold-400 mb-3">V01 - Classic List</h2>
            <ForumWidgetV01 />
          </div>

          <div>
            <h2 className="text-sm font-bold text-gold-400 mb-3">V02 - Compact Cards</h2>
            <ForumWidgetV02 />
          </div>

          <div>
            <h2 className="text-sm font-bold text-gold-400 mb-3">V03 - Timeline Style</h2>
            <ForumWidgetV03 />
          </div>

          <div>
            <h2 className="text-sm font-bold text-gold-400 mb-3">V04 - Stats Focus</h2>
            <ForumWidgetV04 />
          </div>

          <div>
            <h2 className="text-sm font-bold text-gold-400 mb-3">V05 - Preview Cards</h2>
            <ForumWidgetV05 />
          </div>

          <div>
            <h2 className="text-sm font-bold text-gold-400 mb-3">V06 - Minimal List</h2>
            <ForumWidgetV06 />
          </div>

          <div>
            <h2 className="text-sm font-bold text-gold-400 mb-3">V07 - Tabbed Categories</h2>
            <ForumWidgetV07 />
          </div>

          <div>
            <h2 className="text-sm font-bold text-gold-400 mb-3">V08 - Social Style</h2>
            <ForumWidgetV08 />
          </div>

          <div>
            <h2 className="text-sm font-bold text-gold-400 mb-3">V09 - Magazine Layout</h2>
            <ForumWidgetV09 />
          </div>

          <div>
            <h2 className="text-sm font-bold text-gold-400 mb-3">V10 - Notification Style</h2>
            <ForumWidgetV10 />
          </div>

          <div>
            <h2 className="text-sm font-bold text-gold-400 mb-3">V11 - Timeline with Actions</h2>
            <ForumWidgetV11 />
          </div>
        </div>
      </div>
    </div>
  )
}
