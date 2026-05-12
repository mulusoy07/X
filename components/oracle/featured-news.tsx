"use client"

import { IconDownload, IconUserPlus, IconCalendar } from "@tabler/icons-react"

export function FeaturedNews() {
  return (
    <article className="card rounded-xl overflow-hidden h-full relative min-h-[360px]">
      {/* Full Background Image */}
      <div className="absolute inset-0 placeholder-img" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink-900/95 via-ink-900/80 to-ink-900/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 via-transparent to-transparent" />
      
      {/* Placeholder indicator */}
      <div className="absolute top-4 right-4">
        <span className="font-mono text-[10px] text-cream-dim/50 px-2 py-1 rounded bg-ink-900/50 border border-line/50">
          [ background artwork ]
        </span>
      </div>

      {/* Content - Full Width Overlay */}
      <div className="relative h-full w-full max-w-none p-6 md:p-8 lg:pr-12 flex flex-col justify-center">
        <div className="text-[11px] tracking-[0.25em] text-gold-400 font-bold uppercase flex items-center gap-2">
          <IconCalendar className="w-3.5 h-3.5" />
          Bir Cagin Baslangici
        </div>
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-4 leading-tight">
          <span className="text-gold-400 drop-shadow-[0_2px_12px_rgba(245,184,54,0.3)]">Geri Donus Degil,</span>
          <br />
          <span className="text-cream">Yeniden Dogus</span>
        </h2>
        <p className="mt-5 max-w-none text-sm leading-relaxed text-cream-dim md:text-base lg:max-w-[72%]">
          OracleGamer, v1800 ile yolculuguna basladi ve v2100 ile yillar boyunca binlerce oyuncuya ev sahipligi
          yapti. Simdi ise edindigi tum tecrübeyi arkasina alarak, kendi 64-bit client altyapisiyla yeniden sahneye
          cikiyor. Bu bir geri donus degil — kehanetin tamamlanisidir.
        </p>
        <div className="flex flex-wrap items-center gap-3 mt-6">
          <button className="group relative h-11 overflow-hidden rounded-xl bg-gradient-to-b from-gold-400 to-gold-500 px-5 text-sm font-bold text-ink-950 shadow-[0_4px_0_0_#8a5a0a,0_6px_12px_-2px_rgba(0,0,0,0.4)] transition-all duration-100 hover:brightness-110 active:translate-y-1 active:shadow-[0_0_0_0_#8a5a0a,0_2px_4px_-1px_rgba(0,0,0,0.3)]">
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative flex items-center gap-2">
              <IconDownload className="w-4 h-4" />
              Oyunu Indir
            </span>
          </button>
          <span className="text-cream-dim/50 text-sm">veya</span>
          <button className="group relative h-11 overflow-hidden rounded-xl border border-line bg-gradient-to-b from-white/[0.06] to-white/[0.02] px-5 text-sm font-semibold text-cream shadow-[0_4px_0_0_rgba(120,129,146,0.22),0_6px_12px_-2px_rgba(0,0,0,0.35)] transition-all duration-100 hover:border-gold-500/40 hover:text-gold-300 active:translate-y-1 active:shadow-[0_0_0_0_rgba(120,129,146,0.22),0_2px_4px_-1px_rgba(0,0,0,0.28)]">
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative flex items-center gap-2">
              <IconUserPlus className="w-4 h-4" />
              Hesap Olustur
            </span>
          </button>
        </div>
      </div>
    </article>
  )
}
