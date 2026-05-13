"use client"

import Link from "next/link"
import { IconArrowLeft, IconLayout, IconMessage, IconActivityHeartbeat, IconNews, IconTrophy, IconBrain, IconCalendar } from "@tabler/icons-react"

const templates = [
  { 
    name: "Butonlar", 
    slug: "buttons", 
    description: "Sitede kullanılan buton şablonları",
    icon: IconLayout,
    color: "hover:border-emerald-500/50 hover:bg-emerald-500/10"
  },
  { 
    name: "Durum Widgetları", 
    slug: "status-widgets", 
    description: "Sunucu durumu ve istatistik widgetları",
    icon: IconActivityHeartbeat,
    color: "hover:border-sky-500/50 hover:bg-sky-500/10"
  },
  { 
    name: "Forum Widgetları", 
    slug: "forum-widgets", 
    description: "Forum konuları ve tartışma widgetları",
    icon: IconMessage,
    color: "hover:border-violet-500/50 hover:bg-violet-500/10"
  },
  { 
    name: "Feed Widgetları", 
    slug: "feed-widgets", 
    description: "Haber akışı ve içerik widgetları",
    icon: IconNews,
    color: "hover:border-amber-500/50 hover:bg-amber-500/10"
  },
  { 
    name: "En İyiler", 
    slug: "topusers", 
    description: "En iyi oyuncu ve yönetim sıralamaları",
    icon: IconTrophy,
    color: "hover:border-gold-500/50 hover:bg-gold-500/10"
  },
  { 
    name: "SWE UX Test", 
    slug: "swe", 
    description: "UX tasarım yetenek testi",
    icon: IconBrain,
    color: "hover:border-violet-500/50 hover:bg-violet-500/10"
  },
  { 
    name: "Event Widgetları", 
    slug: "event-widgets", 
    description: "Etkinlik takvimi ve countdown widgetları",
    icon: IconCalendar,
    color: "hover:border-gold-500/50 hover:bg-gold-500/10"
  },
]

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-ink-950">
      {/* Header */}
      <div className="border-b border-line bg-ink-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link 
            href="/" 
            className="p-2 rounded-lg bg-ink-800 border border-line text-cream-dim hover:text-cream hover:border-gold-500/50 transition-all"
          >
            <IconArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-cream">Şablonlar</h1>
            <p className="text-sm text-cream-dim">Sitede kullanılan bileşen şablonları</p>
          </div>
        </div>
      </div>

      {/* Template List */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {templates.map((template) => (
            <Link
              key={template.slug}
              href={`/templates/${template.slug}`}
              className={`group p-6 rounded-xl bg-ink-900/50 border border-line transition-all duration-200 ${template.color}`}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-ink-800 border border-line group-hover:border-transparent transition-colors">
                  <template.icon className="w-6 h-6 text-cream-dim group-hover:text-cream transition-colors" />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-cream mb-1">{template.name}</h2>
                  <p className="text-sm text-cream-dim">{template.description}</p>
                  <p className="text-xs text-cream-dim/60 mt-2 font-mono">/templates/{template.slug}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
