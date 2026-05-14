"use client"

import Link from "next/link"
import {
  IconArrowLeft,
  IconHome,
  IconChevronRight,
  IconTrophy,
  IconUsers,
  IconDownload,
  IconShare,
  IconClock,
  IconEye,
  IconFlame,
  IconChevronLeft,
  IconSlash,
} from "@tabler/icons-react"

/* ============================================================
   SHARED MOCK DATA
   ============================================================ */

const crumbs = [
  { label: "Ana Sayfa", icon: IconHome, href: "/" },
  { label: "Rankings", icon: IconTrophy, href: "/templates/rankings" },
  { label: "Users", icon: IconUsers, href: "#" },
]

/* ============================================================
   SHOWCASE WRAPPER
   ============================================================ */

function VariantCard({ tag, title, children }: { tag: string; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-line bg-ink-900/30 p-6 space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-ink-700 border border-line text-cream-dim">{tag}</span>
        <span className="text-xs text-cream-dim/80">{title}</span>
      </div>
      <div className="rounded-xl bg-ink-950 border border-line/60 p-5">{children}</div>
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-cream-dim/70 mt-6 mb-3 pl-1">
      {children}
    </h2>
  )
}

/* ============================================================
   BREADCRUMBS — 4 VARIANTS
   ============================================================ */

/* B1 — Classic chevron */
function BreadcrumbV1() {
  return (
    <nav aria-label="breadcrumb" className="flex items-center gap-1.5 text-sm">
      {crumbs.map((c, i) => {
        const last = i === crumbs.length - 1
        return (
          <span key={i} className="flex items-center gap-1.5">
            {last ? (
              <span className="font-semibold text-cream">{c.label}</span>
            ) : (
              <Link href={c.href} className="text-cream-dim hover:text-gold-400 transition-colors">
                {c.label}
              </Link>
            )}
            {!last && <IconChevronRight className="w-3.5 h-3.5 text-cream-dim/50" />}
          </span>
        )
      })}
    </nav>
  )
}

/* B2 — Icon prefixed with slash separator */
function BreadcrumbV2() {
  return (
    <nav aria-label="breadcrumb" className="flex items-center gap-2 text-sm">
      {crumbs.map((c, i) => {
        const last = i === crumbs.length - 1
        const Icon = c.icon
        return (
          <span key={i} className="flex items-center gap-2">
            {last ? (
              <span className="inline-flex items-center gap-1.5 font-semibold text-gold-300">
                <Icon className="w-4 h-4" />
                {c.label}
              </span>
            ) : (
              <Link href={c.href} className="inline-flex items-center gap-1.5 text-cream-dim hover:text-cream transition-colors">
                <Icon className="w-4 h-4" />
                {c.label}
              </Link>
            )}
            {!last && <IconSlash className="w-3.5 h-3.5 text-cream-dim/40 -rotate-12" />}
          </span>
        )
      })}
    </nav>
  )
}

/* B3 — Pill segmented */
function BreadcrumbV3() {
  return (
    <nav aria-label="breadcrumb" className="inline-flex items-center gap-1 p-1 rounded-xl bg-ink-800/60 border border-line/60">
      {crumbs.map((c, i) => {
        const last = i === crumbs.length - 1
        const Icon = c.icon
        return (
          <span key={i} className="flex items-center">
            {last ? (
              <span className="inline-flex items-center gap-1.5 px-3 h-8 rounded-lg bg-gold-500/15 border border-gold-500/30 text-gold-300 text-xs font-bold">
                <Icon className="w-3.5 h-3.5" />
                {c.label}
              </span>
            ) : (
              <Link
                href={c.href}
                className="inline-flex items-center gap-1.5 px-3 h-8 rounded-lg text-cream-dim hover:text-cream hover:bg-ink-700/50 text-xs font-semibold transition"
              >
                <Icon className="w-3.5 h-3.5" />
                {c.label}
              </Link>
            )}
            {!last && <IconChevronRight className="w-3 h-3 text-cream-dim/40 mx-0.5" />}
          </span>
        )
      })}
    </nav>
  )
}

/* B4 — Minimal back + label (mobile-first) */
function BreadcrumbV4() {
  const parent = crumbs[crumbs.length - 2]
  const current = crumbs[crumbs.length - 1]
  return (
    <nav aria-label="breadcrumb" className="flex items-center gap-3">
      <Link
        href={parent.href}
        className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-ink-800/60 border border-line/60 text-cream-dim hover:text-cream hover:border-gold-500/30 transition"
      >
        <IconChevronLeft className="w-4 h-4" />
      </Link>
      <div className="flex items-center gap-1.5 text-sm">
        <Link href={parent.href} className="text-cream-dim/80 hover:text-cream-dim transition-colors">
          {parent.label}
        </Link>
        <span className="text-cream-dim/40">/</span>
        <span className="font-semibold text-cream">{current.label}</span>
      </div>
    </nav>
  )
}

/* ============================================================
   PAGE HEADINGS — 4 VARIANTS
   ============================================================ */

/* H1 — Plain title + subtitle */
function HeadingV1() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-cream tracking-tight">Users Rankings</h1>
      <p className="mt-1 text-sm text-cream-dim">Player rankings · level, NP, rebirth</p>
    </div>
  )
}

/* H2 — Icon badge + title (rankings page style) */
function HeadingV2() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 rounded-xl bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400">
        <IconTrophy className="w-6 h-6" />
      </div>
      <div>
        <h1 className="font-display text-2xl font-bold text-cream tracking-tight">Users Rankings</h1>
        <p className="text-sm text-cream-dim">Player rankings · level, NP, rebirth</p>
      </div>
    </div>
  )
}

/* H3 — Hero with gradient + CTA actions */
function HeadingV3() {
  return (
    <div className="flex items-start justify-between gap-4 flex-wrap">
      <div>
        <h1 className="font-display text-3xl sm:text-4xl font-black tracking-tight bg-gradient-to-r from-cream to-gold-300 bg-clip-text text-transparent">
          Users Rankings
        </h1>
        <p className="mt-2 text-base text-cream-dim max-w-xl">
          Server genelinde en yüksek seviye, NP ve rebirth değerlerine sahip oyuncuların güncel sıralaması.
        </p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button className="inline-flex items-center gap-1.5 h-10 px-4 rounded-xl bg-ink-800/60 border border-line/60 text-cream-dim text-sm font-semibold hover:text-cream hover:border-gold-500/30 transition">
          <IconShare className="w-4 h-4" />
          Paylaş
        </button>
        <button className="inline-flex items-center gap-1.5 h-10 px-4 rounded-xl bg-gradient-to-b from-gold-400 to-gold-500 text-ink-950 text-sm font-bold hover:brightness-110 transition">
          <IconDownload className="w-4 h-4" />
          İndir
        </button>
      </div>
    </div>
  )
}

/* H4 — With stat/meta chips */
function HeadingV4() {
  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400">
          <IconTrophy className="w-5 h-5" />
        </div>
        <h1 className="font-display text-2xl font-bold text-cream tracking-tight">Users Rankings</h1>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
          <IconFlame className="w-3 h-3" /> Live
        </span>
      </div>
      <p className="mt-2 text-sm text-cream-dim">Player rankings · level, NP, rebirth</p>
      <div className="mt-3 flex items-center gap-2 flex-wrap">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-ink-800/60 border border-line/60 text-[11px] font-semibold text-cream-dim">
          <IconUsers className="w-3.5 h-3.5 text-gold-400" />
          <span className="tabular-nums">2,143</span> oyuncu
        </span>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-ink-800/60 border border-line/60 text-[11px] font-semibold text-cream-dim">
          <IconClock className="w-3.5 h-3.5 text-gold-400" />
          5 dk önce güncellendi
        </span>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-ink-800/60 border border-line/60 text-[11px] font-semibold text-cream-dim">
          <IconEye className="w-3.5 h-3.5 text-gold-400" />
          <span className="tabular-nums">12.4K</span> görüntüleme
        </span>
      </div>
    </div>
  )
}

/* ============================================================
   PAGE
   ============================================================ */

export default function PageHeadersTemplate() {
  return (
    <div className="min-h-screen bg-ink-950">
      <div className="border-b border-line bg-ink-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link
            href="/templates"
            className="p-2 rounded-lg bg-ink-800 border border-line text-cream-dim hover:text-cream hover:border-gold-500/50 transition-all"
          >
            <IconArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-cream">Page Headers</h1>
            <p className="text-sm text-cream-dim">Breadcrumb ve sayfa başlık varyasyonları</p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 pb-12">
        <SectionLabel>Breadcrumbs</SectionLabel>
        <div className="space-y-3">
          <VariantCard tag="B1" title="Classic chevron — sade text-only navigation"><BreadcrumbV1 /></VariantCard>
          <VariantCard tag="B2" title="Icon prefixed — her seviyede icon + slash separator"><BreadcrumbV2 /></VariantCard>
          <VariantCard tag="B3" title="Pill segmented — chip tarzı kapsayıcı içinde"><BreadcrumbV3 /></VariantCard>
          <VariantCard tag="B4" title="Compact back + label — mobile-first, geri butonlu"><BreadcrumbV4 /></VariantCard>
        </div>

        <SectionLabel>Page Headings</SectionLabel>
        <div className="space-y-3">
          <VariantCard tag="H1" title="Plain title + subtitle — minimum, sayfa içi başlık"><HeadingV1 /></VariantCard>
          <VariantCard tag="H2" title="Icon badge + title — orta vurgulu, identity'li"><HeadingV2 /></VariantCard>
          <VariantCard tag="H3" title="Hero gradient + CTA — landing/feature sayfası tarzı"><HeadingV3 /></VariantCard>
          <VariantCard tag="H4" title="Stat & meta chips — live data odaklı sayfalar için"><HeadingV4 /></VariantCard>
        </div>
      </div>
    </div>
  )
}
