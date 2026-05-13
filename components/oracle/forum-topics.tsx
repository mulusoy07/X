"use client"

import Link from "next/link"
import { IconMessageCircle, IconChevronRight, IconClock } from "@tabler/icons-react"

interface ForumTopic {
  id: number
  title: string
  category: string
  categoryColor: "violet" | "sky" | "emerald" | "rose" | "amber"
  author: string
  replies: number
  isHot?: boolean
  timeAgo?: string
}

const topics: ForumTopic[] = [
  { id: 1, title: "Server acilis tarihi ne zaman?", category: "Genel Tartisma", categoryColor: "violet", author: "Thoketh914", replies: 12, timeAgo: "2s once" },
  { id: 2, title: "Upgrade scroll oranlari hakkinda", category: "Oyun Rehberi", categoryColor: "sky", author: "Gorus424", replies: 8, timeAgo: "5s once" },
  { id: 3, title: "BrutalGuard klan uye ariyor", category: "Klan Duyurulari", categoryColor: "emerald", author: "Kragath680", replies: 5, isHot: true, timeAgo: "1d once" },
  { id: 4, title: "Nation War saatleri degisti mi?", category: "Genel Tartisma", categoryColor: "violet", author: "Cedion252", replies: 3, timeAgo: "3s once" },
  { id: 5, title: "Yeni baslayan olarak ne yapmaliyim?", category: "Oyun Rehberi", categoryColor: "sky", author: "Arthion93", replies: 21, isHot: true, timeAgo: "6s once" },
]

const colorClasses = {
  violet: {
    avatar: "from-violet-500 to-violet-700",
    badge: "bg-violet-500/20 text-violet-300 border-violet-500/30"
  },
  sky: {
    avatar: "from-sky-500 to-sky-700",
    badge: "bg-sky-500/20 text-sky-300 border-sky-500/30"
  },
  emerald: {
    avatar: "from-emerald-500 to-emerald-700",
    badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
  },
  rose: {
    avatar: "from-rose-500 to-rose-700",
    badge: "bg-rose-500/20 text-rose-300 border-rose-500/30"
  },
  amber: {
    avatar: "from-amber-500 to-amber-700",
    badge: "bg-amber-500/20 text-amber-300 border-amber-500/30"
  }
}

export function ForumTopics() {
  return (
    <div className="card rounded-xl overflow-hidden h-full flex flex-col">
      {/* V01 Style Header */}
      <div className="section-header">
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
          
          {topics.map((topic, i) => {
            const colors = colorClasses[topic.categoryColor]
            return (
              <div key={topic.id} className="relative group">
                {/* Timeline dot */}
                <div className={`absolute -left-6 top-1 w-4 h-4 rounded-full ${i === 0 ? 'bg-gold-500 ring-4 ring-gold-500/20' : 'bg-ink-700 border-2 border-line'} transition-all group-hover:border-gold-500/50`} />
                
                <Link href={`/forum/konu/${topic.id}`} className="block">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-cream-dim flex items-center gap-1">
                      <IconClock className="w-3 h-3" />
                      {topic.timeAgo}
                    </span>
                    {topic.isHot && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">HOT</span>
                    )}
                  </div>
                  <h4 className="text-sm font-medium text-cream group-hover:text-gold-400 transition-colors mt-0.5">{topic.title}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${colors.badge}`}>{topic.category}</span>
                    <span className="text-[10px] text-gold-400 font-medium">{topic.author}</span>
                    <span className="w-1 h-1 rounded-full bg-cream-dim/30" />
                    <span className="text-[10px] text-cream-dim">{topic.replies} yanit</span>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
      </div>

      {/* V01 Style Footer - Yeni Konu Ac */}
      <div className="px-4 py-3 border-t border-line bg-ink-900/50 mt-auto">
        <Link 
          href="/forum/yeni-konu" 
          className="w-full h-10 rounded-lg border border-dashed border-gold-500/30 flex items-center justify-center text-sm text-gold-400 hover:bg-gold-500/5 hover:border-gold-500/50 transition-all gap-2"
        >
          <IconMessageCircle className="w-4 h-4" />
          Yeni Konu Ac
        </Link>
      </div>
    </div>
  )
}
