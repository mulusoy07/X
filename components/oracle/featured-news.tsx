"use client"

import { IconDownload, IconUserPlus } from "@tabler/icons-react"

export function FeaturedNews() {
  return (
    <article className="card rounded-xl overflow-hidden">
      <div className="grid grid-cols-2">
        <div className="p-6">
          <div className="text-[11px] tracking-[0.25em] text-gold-400 font-bold uppercase">Bir Çağın Başlangıcı</div>
          <h2 className="font-display text-3xl font-bold text-cream mt-3 leading-snug">
            Geri Dönüş Değil,
            <br />
            Yeniden Doğuş
          </h2>
          <p className="text-cream-dim text-sm leading-relaxed mt-4">
            OracleGamer, v1800 ile yolculuğuna başladı ve v2100 ile yıllar boyunca binlerce oyuncuya ev sahipliği
            yaptı. Şimdi ise edindiği tüm tecrübeyi arkasına alarak, kendi 64-bit client altyapısıyla yeniden sahneye
            çıkıyor. Bu bir geri dönüş değil — kehanetin tamamlanışıdır. Bu yolculukta bizi yeniden tercih eden ve
            desteğini hiçbir zaman esirgemeyen tüm oyuncularımıza teşekkür ederiz. Varlığınız, OracleGamer&apos;ın gücünün en
            önemli kaynağıdır.
          </p>
          <div className="flex items-center gap-3 mt-6">
            <button className="gold-btn rounded-md px-4 h-10 flex items-center gap-2 text-sm font-semibold">
              <IconDownload className="w-4 h-4" />
              Oyunu İndir
            </button>
            <span className="text-muted text-sm">yada</span>
            <button className="outline-btn rounded-md px-4 h-10 flex items-center gap-2 text-sm font-semibold text-cream">
              <IconUserPlus className="w-4 h-4" />
              Hesap Oluştur
            </button>
          </div>
        </div>
        <div className="relative min-h-[280px] placeholder-img flex items-center justify-center">
          <span className="font-mono text-xs text-cream-dim/70 px-3 py-1 rounded bg-ink-900/70 border border-line">
            [ artwork: torch-lit camp at dusk ]
          </span>
        </div>
      </div>
    </article>
  )
}
