import { createFileRoute } from "@tanstack/react-router";
import {
  FeaturedOriginal,
  FeaturedV1Cinematic,
  FeaturedV2Split,
  FeaturedV3Glass,
  FeaturedV4Magazine,
  FeaturedV5Rune,
  FeaturedV6HUD,
  FeaturedV7Vertical,
  FeaturedV8Stats,
  FeaturedV9Diagonal,
  FeaturedV10Stage,
} from "@/components/featured/FeaturedVariants";

export const Route = createFileRoute("/featured")({
  head: () => ({
    meta: [
      { title: "Featured News — Varyasyonlar" },
      { name: "description", content: "FeaturedNews hero bölümünün 10 farkli sunum varyasyonu." },
    ],
  }),
  component: FeaturedPage,
});

function Section({ tag, title, sub, children }: { tag: string; title: string; sub: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <div className="flex items-baseline gap-3">
        <span className="text-[10px] font-mono uppercase tracking-widest text-gold-400 border border-gold-500/30 rounded px-1.5 py-0.5">
          {tag}
        </span>
        <h3 className="text-base font-semibold text-cream">{title}</h3>
        <span className="text-xs text-cream-dim/60">— {sub}</span>
      </div>
      {children}
    </section>
  );
}

function FeaturedPage() {
  return (
    <div className="min-h-screen bg-ink-950 text-cream">
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-10">
        <header>
          <h1 className="text-2xl font-bold text-cream">FeaturedNews — Hero Varyasyonlari</h1>
          <p className="text-sm text-cream-dim/70 mt-1">
            En üstte orijinal, altinda 10 farkli kompozisyon ve atmosfer denemesi.
          </p>
        </header>

        <Section tag="ORG" title="Original" sub="Mevcut sol-hizali full overlay tasarim.">
          <FeaturedOriginal />
        </Section>
        <Section tag="V1" title="Cinematic Letterbox" sub="Sinema bantlari + REC HUD, ortada büyük baslik.">
          <FeaturedV1Cinematic />
        </Section>
        <Section tag="V2" title="Split Frame" sub="Sol görsel, sag dikey içerik panel.">
          <FeaturedV2Split />
        </Section>
        <Section tag="V3" title="Floating Glass" sub="Yüzen blurlu cam kart, sol-alt köse.">
          <FeaturedV3Glass />
        </Section>
        <Section tag="V4" title="Magazine Editorial" sub="Issue/sayi etiketleri, italic vurgular.">
          <FeaturedV4Magazine />
        </Section>
        <Section tag="V5" title="Rune Border" sub="Cifte altin çerçeve + ✦ rozet, simetrik.">
          <FeaturedV5Rune />
        </Section>
        <Section tag="V6" title="Terminal HUD" sub="Mono font, scanlines, oyun-ici sistem konsolu.">
          <FeaturedV6HUD />
        </Section>
        <Section tag="V7" title="Vertical Text" sub="Dik yazi sütun + dev typography alttan.">
          <FeaturedV7Vertical />
        </Section>
        <Section tag="V8" title="Stat Sidebar" sub="Sag tarafta dikey KPI kolonu.">
          <FeaturedV8Stats />
        </Section>
        <Section tag="V9" title="Diagonal Slash" sub="Egik kesim, altin çizgi ile içerik bölünmüs.">
          <FeaturedV9Diagonal />
        </Section>
        <Section tag="V10" title="Centered Stage" sub="Tam ortali, dev gradient baslik, hap CTA.">
          <FeaturedV10Stage />
        </Section>
      </div>
    </div>
  );
}
