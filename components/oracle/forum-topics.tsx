"use client"

import Link from "next/link"
import { IconMessageCircle } from "@tabler/icons-react"

interface ForumTopic {
  id: number
  title: string
  category: string
  categoryColor: "violet" | "sky" | "emerald" | "rose"
  author: string
  replies: number
}

const topics: ForumTopic[] = [
  { id: 1, title: "Canım Koum", category: "Genel Tartışma", categoryColor: "violet", author: "CreatorTest", replies: 0 },
  { id: 2, title: "Server FAQ — Sıkça Sorulan", category: "Duyuru", categoryColor: "sky", author: "Admin", replies: 23 },
  { id: 3, title: "Clan Recruiting Thread", category: "Klanlar", categoryColor: "emerald", author: "RonarkLord", replies: 147 },
  { id: 4, title: "PvP Build Önerileri", category: "PvP", categoryColor: "rose", author: "MageMaster", replies: 58 },
]

const colorClasses = {
  violet: {
    avatar: "from-violet-500 to-violet-700",
    badge: "bg-violet-500/20 text-violet-300"
  },
  sky: {
    avatar: "from-sky-500 to-sky-700",
    badge: "bg-sky-500/20 text-sky-300"
  },
  emerald: {
    avatar: "from-emerald-500 to-emerald-700",
    badge: "bg-emerald-500/20 text-emerald-300"
  },
  rose: {
    avatar: "from-rose-500 to-rose-700",
    badge: "bg-rose-500/20 text-rose-300"
  }
}

export function ForumTopics() {
  return (
    <div className="card rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-line">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-ink-800 border border-line flex items-center justify-center text-gold-400">
            <IconMessageCircle className="w-4 h-4" />
          </div>
          <h3 className="font-semibold text-cream">Son Forum Konuları</h3>
        </div>
        <Link href="#" className="text-xs text-gold-400 hover:text-gold-300 flex items-center gap-1">
          Tümünü Gör <span>→</span>
        </Link>
      </div>

      {/* Topics List */}
      <ul className="divide-y divide-line">
        {topics.map((topic) => {
          const colors = colorClasses[topic.categoryColor]
          return (
            <li key={topic.id} className="p-4 flex gap-3 hover:bg-ink-800/60 transition cursor-pointer">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${colors.avatar} flex items-center justify-center shrink-0`}>
                <IconMessageCircle className="w-4 h-4 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-semibold text-cream truncate">{topic.title}</h4>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${colors.badge} whitespace-nowrap`}>
                    {topic.category}
                  </span>
                </div>
                <div className="text-xs text-muted mt-1 flex items-center gap-2">
                  <span className="text-cream-dim">{topic.author}</span>
                  <span className="w-1 h-1 rounded-full bg-muted" />
                  <span>{topic.replies} mesaj</span>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
