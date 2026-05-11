"use client"

import { IconStar, IconDownload } from "@tabler/icons-react"

const tickerMessages = [
  "Adil oyun, güçlü altyapı, büyük savaşlar OracleGamer'da seni bekliyor.",
  "OracleGamer topluluğuna katıl, efsanenin bir parçası ol ve kehaneti birlikte tamamlayalım!",
  "OracleGamer 64-bit client ile yeniden doğdu! Daha stabil, daha güçlü bir PvP deneyimi seni bekliyor.",
  "Güncel etkinlikler ve ödüller için duyuruları takip etmeyi unutma! Sürprizler yolda.",
]

export function Hero() {
  return (
    <section className="relative bg-hero overflow-hidden">
      {/* Background Character Grid */}
      <div className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none">
        <div className="grid grid-cols-7 gap-6 px-12 w-full max-w-[1500px]">
          <div className="aspect-[2/3] rounded-2xl placeholder-img" />
          <div className="aspect-[2/3] rounded-2xl placeholder-img translate-y-6" />
          <div className="aspect-[2/3] rounded-2xl placeholder-img -translate-y-2" />
          <div className="aspect-[2/3] rounded-2xl placeholder-img" />
          <div className="aspect-[2/3] rounded-2xl placeholder-img -translate-y-2" />
          <div className="aspect-[2/3] rounded-2xl placeholder-img translate-y-6" />
          <div className="aspect-[2/3] rounded-2xl placeholder-img" />
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative mx-auto max-w-[1500px] px-6 pt-24 pb-28 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full gold-btn text-sm font-semibold">
          <IconStar className="w-4 h-4" />
          Bir Efsanenin Dönüşü
        </div>

        <h1 className="font-display text-7xl md:text-8xl font-extrabold mt-8 text-gold-400 drop-shadow-[0_4px_24px_rgba(245,184,54,0.35)]">
          Yeni Bir Çağ Başlıyor
        </h1>
        <div className="mx-auto mt-4 divider-gold" />

        <p className="mx-auto max-w-2xl mt-8 text-cream-dim text-lg leading-relaxed">
          Geçmişte adını efsaneler arasına yazdıran OracleGamer, ara verdiği yılların ardından daha güçlü bir altyapı ve
          daha büyük savaşlar ile yeniden sahneye çıkıyor.
        </p>

        <button className="gold-btn mt-10 inline-flex items-center gap-2 px-8 py-4 rounded-md text-lg font-bold">
          <IconDownload className="w-5 h-5" />
          Kehanete Katıl!
        </button>
      </div>

      {/* News Ticker */}
      <div className="relative border-y border-line bg-ink-950/60">
        <div className="ticker overflow-hidden">
          <div className="ticker-track flex gap-12 py-3 text-sm whitespace-nowrap text-cream-dim">
            {[...tickerMessages, ...tickerMessages].map((msg, i) => (
              <span key={i} className="flex items-center gap-3">
                <span className="text-gold-400 font-bold">#</span> {msg}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
