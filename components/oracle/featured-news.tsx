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
      <div className="relative h-full p-6 md:p-8 flex flex-col justify-center max-w-2xl">
        <div className="text-[11px] tracking-[0.25em] text-gold-400 font-bold uppercase flex items-center gap-2">
          <IconCalendar className="w-3.5 h-3.5" />
          Bir Cagin Baslangici
        </div>
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-4 leading-tight">
          <span className="text-gold-400 drop-shadow-[0_2px_12px_rgba(245,184,54,0.3)]">Geri Donus Degil,</span>
          <br />
          <span className="text-cream">Yeniden Dogus</span>
        </h2>
        <p className="text-cream-dim text-sm md:text-base leading-relaxed mt-5 max-w-xl">
          OracleGamer, v1800 ile yolculuguna basladi ve v2100 ile yillar boyunca binlerce oyuncuya ev sahipligi
          yapti. Simdi ise edindigi tum tecrübeyi arkasina alarak, kendi 64-bit client altyapisiyla yeniden sahneye
          cikiyor. Bu bir geri donus degil — kehanetin tamamlanisidir.
        </p>
        <div className="flex flex-wrap items-center gap-3 mt-6">
          <button className="gold-btn rounded-lg px-5 h-11 flex items-center gap-2 text-sm font-bold">
            <IconDownload className="w-4 h-4" />
            Oyunu Indir
          </button>
          <span className="text-cream-dim/50 text-sm">veya</span>
          <button className="outline-btn rounded-lg px-5 h-11 flex items-center gap-2 text-sm font-semibold text-cream hover:text-gold-300">
            <IconUserPlus className="w-4 h-4" />
            Hesap Olustur
          </button>
        </div>
      </div>
    </article>
  )
}
