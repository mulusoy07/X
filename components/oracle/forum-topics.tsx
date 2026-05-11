"use client"

import Link from "next/link"
import { IconMessageCircle, IconChevronRight } from "@tabler/icons-react"

interface ForumTopic {
  id: number
  title: string
  category: string
  categoryColor: "violet" | "sky" | "emerald" | "rose" | "amber"
  author: string
  replies: number
  isHot?: boolean
}

const topics: ForumTopic[] = [
  { id: 1, title: "Server acilis tarihi ne zaman?", category: "Genel Tartisma", categoryColor: "violet", author: "Thoketh914", replies: 12 },
  { id: 2, title: "Upgrade scroll oranlari hakkinda", category: "Oyun Rehberi", categoryColor: "sky", author: "Gorus424", replies: 8 },
  { id: 3, title: "BrutalGuard klan uye ariyor", category: "Klan Duyurulari", categoryColor: "emerald", author: "Kragath680", replies: 5, isHot: true },
  { id: 4, title: "Nation War saatleri degisti mi?", category: "Genel Tartisma", categoryColor: "violet", author: "Cedion252", replies: 3 },
  { id: 5, title: "Yeni baslayan olarak ne yapmaliyim?", category: "Oyun Rehberi", categoryColor: "sky", author: "Arthion93", replies: 21, isHot: true },
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
    <div className="card rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-line">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400">
            <IconMessageCircle className="w-4 h-4" />
          </div>
          <h3 className="font-semibold text-cream">Forum</h3>
        </div>
        <Link href="/forum" className="text-xs text-gold-400 hover:text-gold-300 flex items-center gap-1">
          Tumunu Gor <IconChevronRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Topics List */}
      <ul className="divide-y divide-line/50">
        {topics.map((topic) => {
          const colors = colorClasses[topic.categoryColor]
          return (
            <li key={topic.id} className="hover:bg-ink-800/60 transition cursor-pointer">
              <Link href={`/forum/konu/${topic.id}`} className="flex items-center gap-3 p-4">
                {/* Avatar */}
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colors.avatar} flex items-center justify-center shrink-0 relative`}>
                  <IconMessageCircle className="w-4 h-4 text-white" />
                  {topic.isHot && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full border-2 border-ink-800" />
                  )}
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-semibold text-sm text-cream truncate leading-tight">{topic.title}</h4>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border whitespace-nowrap shrink-0 ${colors.badge}`}>
                      {topic.category}
                    </span>
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

      {/* Footer */}
      <div className="px-4 py-3 border-t border-line bg-ink-900/50">
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
