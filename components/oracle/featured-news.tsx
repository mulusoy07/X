"use client"

import { IconDownload, IconUserPlus, IconCalendar } from "@tabler/icons-react"

export function FeaturedNews() {
  return (
    <article className="card rounded-xl overflow-hidden h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 h-full">
        {/* Content */}
        <div className="p-6 flex flex-col justify-center">
          <div className="text-[11px] tracking-[0.25em] text-gold-400 font-bold uppercase flex items-center gap-2">
            <IconCalendar className="w-3.5 h-3.5" />
            Bir Cagin Baslangici
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold mt-3 leading-tight">
            <span className="text-gold-400">Geri Donus Degil,</span>
            <br />
            <span className="text-cream">Yeniden Dogus</span>
          </h2>
          <p className="text-cream-dim text-sm leading-relaxed mt-4">
            OracleGamer, v1800 ile yolculuguna basladi ve v2100 ile yillar boyunca binlerce oyuncuya ev sahipligi
            yapti. Simdi ise edindigi tum tecrübeyi arkasina alarak, kendi 64-bit client altyapisiyla yeniden sahneye
            cikiyor. Bu bir geri donus degil — kehanetin tamamlanisidir. Bu yolculukta bizi yeniden tercih eden ve
            destegini hicbir zaman esirgemeyen tum oyuncularimiza tesekkur ederiz. Varliginiz, OracleGamer&apos;in gucunun en
            onemli kaynağidir.
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

        {/* Image */}
        <div className="relative min-h-[280px] md:min-h-full">
          <div className="absolute inset-0 placeholder-img" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-800 via-transparent to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-mono text-xs text-cream-dim/70 px-3 py-1 rounded bg-ink-900/70 border border-line">
              [ artwork: torch-lit camp at dusk ]
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}
