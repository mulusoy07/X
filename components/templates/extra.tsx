"use client"

/**
 * Extra — kullanılmayan ama saklanan tasarım varyasyonları.
 * İleride lazım olursa buradan kopyalanır.
 *
 * Eklerken: yeni bir <Section> ile başlık + 1+ varyasyonu wrap'le.
 */

import { IconSparkles, IconPackage, IconUser, IconShield, IconMapPin } from "@tabler/icons-react"

/* ============================================================
   ZONE HEADER VARIANTS (Mining Guide'dan saklanan)
   ============================================================ */

const sampleZone = { name: "Luferson Castle", count: 8 }

function ZoneHeaderV1Gradient() {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <div className="w-1 h-7 bg-gradient-to-b from-gold-400 to-gold-500 rounded-full flex-shrink-0" />
      <h4 className="font-display text-lg font-bold text-cream flex-1 min-w-0 truncate">{sampleZone.name}</h4>
      <span className="text-xs text-cream-dim bg-ink-900 px-3 py-1.5 rounded-full whitespace-nowrap flex-shrink-0 border border-line">
        {sampleZone.count} farklı item
      </span>
    </div>
  )
}

function ZoneHeaderV2Divider() {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold-500/40" />
      <div className="flex items-center gap-2 shrink-0">
        <IconShield className="w-4 h-4 text-gold-400" />
        <h4 className="font-display text-base font-bold text-cream uppercase tracking-wider">{sampleZone.name}</h4>
        <span className="text-[10px] font-mono tabular-nums text-cream-dim/80">[{sampleZone.count}]</span>
      </div>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold-500/40" />
    </div>
  )
}

function ZoneHeaderV3Stamp() {
  return (
    <div className="relative px-4 py-2.5 rounded-lg bg-gold-500/[0.04] border border-gold-500/30 flex items-center gap-3">
      <span className="absolute inset-1 rounded-md border border-gold-500/15 pointer-events-none" />
      <IconMapPin className="w-4 h-4 text-gold-400 shrink-0 relative" />
      <h4 className="font-display text-base font-black text-gold-300 uppercase tracking-[0.15em] flex-1 min-w-0 truncate relative">
        {sampleZone.name}
      </h4>
      <span className="relative text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-ink-900 border border-line text-cream-dim tabular-nums">
        {sampleZone.count} item
      </span>
    </div>
  )
}

/* ============================================================
   CATEGORY HEADER VARIANTS (Item Mix Guide'dan saklanan)
   ============================================================ */

const sampleCategory = {
  name: "Silah Üretimi",
  npcName: "[Disciple of Hepa] Shozin",
  mixCount: 2,
}

function CategoryHeaderV1Classic() {
  return (
    <div className="p-4 rounded-xl border border-line">
      <div className="flex items-center gap-4 flex-wrap">
        <div className="w-16 h-16 rounded-2xl bg-ink-800 border border-line flex items-center justify-center flex-shrink-0">
          <IconPackage className="w-8 h-8 text-gold-400" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-xl font-bold text-cream mb-2 truncate">{sampleCategory.name}</h3>
          <div className="flex items-center gap-4 text-sm flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full" />
              <span className="text-cream-dim">{sampleCategory.mixCount} farklı tarif</span>
            </div>
            <div className="flex items-center gap-2">
              <IconUser className="w-3.5 h-3.5 text-violet-400" />
              <span className="text-violet-400 font-medium">{sampleCategory.npcName}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function CategoryHeaderV3Banner() {
  return (
    <div className="relative px-4 py-5 overflow-hidden rounded-xl border border-line">
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />
      <div className="relative">
        <div className="flex items-center gap-3 mb-1">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold-500/40" />
          <IconPackage className="w-5 h-5 text-gold-400 shrink-0" />
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold-500/40" />
        </div>
        <h3 className="font-display text-2xl font-black text-cream text-center truncate">{sampleCategory.name}</h3>
        <div className="flex items-center justify-center gap-2 mt-3 flex-wrap">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gold-500/10 border border-gold-500/30 text-gold-400">
            {sampleCategory.mixCount} tarif
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-ink-800 border border-line text-cream-dim">
            <IconUser className="w-3 h-3" /> {sampleCategory.npcName}
          </span>
        </div>
      </div>
    </div>
  )
}

function CategoryHeaderV4MasterPlate() {
  return (
    <div className="relative p-5 overflow-hidden rounded-xl border border-line">
      <span className="absolute top-2 left-2 w-3 h-3 border-t border-l border-gold-500/40" />
      <span className="absolute top-2 right-2 w-3 h-3 border-t border-r border-gold-500/40" />
      <span className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-gold-500/40" />
      <span className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-gold-500/40" />

      <div className="flex items-center gap-4">
        <div className="relative shrink-0">
          <div className="w-16 h-16 rounded-full bg-ink-800 border-2 border-gold-500/50 ring-4 ring-gold-500/10 flex items-center justify-center overflow-hidden">
            <IconUser className="w-8 h-8 text-gold-400" />
          </div>
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-gold-500 text-ink-950 text-[9px] font-black uppercase tracking-wider whitespace-nowrap">
            {sampleCategory.npcName}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[9px] uppercase tracking-[0.4em] text-gold-400/70 font-bold mb-0.5">Ustanın atölyesi</div>
          <h3 className="font-display text-2xl font-black text-cream truncate leading-tight">{sampleCategory.name}</h3>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="h-px w-6 bg-gold-500/50" />
            <span className="text-[11px] text-cream-dim font-mono tabular-nums">
              {String(sampleCategory.mixCount).padStart(2, "0")} farklı tarif mevcut
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ============================================================
   BONUS BANNER VARIANTS (Item Mix Guide'dan saklanan)
   ============================================================ */

function BonusV2InlineTip() {
  return (
    <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-line bg-ink-900/40">
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest bg-gold-500/15 border border-gold-500/30 text-gold-400 shrink-0">
        <IconSparkles className="w-3 h-3" /> İpucu
      </span>
      <p className="text-xs text-cream-dim flex-1 min-w-0">
        <span className="text-cream font-semibold">Bonus item</span> kullanırsan başarı oranı belirgin şekilde artar.
      </p>
    </div>
  )
}

function BonusV1SkyCard() {
  return (
    <div className="flex items-center gap-3 bg-gradient-to-r from-sky-500/[0.06] via-sky-500/[0.03] to-transparent border border-sky-400/25 rounded-xl p-3">
      <div className="w-10 h-10 flex-shrink-0 bg-ink-900 rounded-lg border border-sky-400/25 flex items-center justify-center">
        <IconSparkles className="w-5 h-5 text-sky-300" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-bold text-cream mb-0.5">Bonus Şans Item'i</div>
        <div className="text-xs text-cream-dim">
          Tariflerde bonus item kullanırsan başarı oranı belirgin şekilde artar.
        </div>
      </div>
    </div>
  )
}

function BonusV4Editorial() {
  return (
    <div className="relative py-4 px-3">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
      <div className="flex items-center gap-3">
        <IconSparkles className="w-4 h-4 text-gold-400 shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2">
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-gold-400/80">Bonus item</span>
            <span className="h-px flex-1 bg-line/50" />
          </div>
          <p className="text-xs text-cream-dim mt-1">
            Tariflerde bonus item kullanırsan başarı oranı belirgin şekilde artar.
          </p>
        </div>
      </div>
    </div>
  )
}

/* ============================================================
   SECTION WRAPPER
   ============================================================ */

function Section({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="font-display text-xl font-bold text-cream">{title}</h2>
        {description && <p className="text-sm text-cream-dim mt-1">{description}</p>}
      </div>
      <div className="card rounded-xl border border-line p-5 space-y-4">{children}</div>
    </section>
  )
}

function VariantBlock({
  tag,
  title,
  source,
  children,
}: {
  tag: string
  title: string
  source?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2 flex-wrap">
        <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-ink-700 border border-line text-cream-dim">
          {tag}
        </span>
        <span className="text-xs font-semibold text-cream">{title}</span>
        {source && <span className="text-[10px] text-cream-dim/70 font-mono ml-auto">{source}</span>}
      </div>
      {children}
    </div>
  )
}

/* ============================================================
   MAIN SHOWCASE
   ============================================================ */

export function ExtraShowcase() {
  return (
    <div className="space-y-10">
      <Section
        title="Zone Header Variants"
        description="Mining Guide'da kullanılmayan zone başlığı varyasyonları."
      >
        <VariantBlock tag="V1" title="Gradient bar + count chip" source="mining">
          <ZoneHeaderV1Gradient />
        </VariantBlock>
        <VariantBlock tag="V2" title="Centered divider · shield + uppercase" source="mining">
          <ZoneHeaderV2Divider />
        </VariantBlock>
        <VariantBlock tag="V3" title="Stamped seal · double-border + map pin" source="mining">
          <ZoneHeaderV3Stamp />
        </VariantBlock>
      </Section>

      <Section
        title="Category Header Variants"
        description="Item Mix Guide'da kullanılmayan kategori başlığı varyasyonları."
      >
        <VariantBlock tag="V1" title="Classic · Package square + dots" source="item-mix">
          <CategoryHeaderV1Classic />
        </VariantBlock>
        <VariantBlock tag="V3" title="Centered banner with pattern" source="item-mix">
          <CategoryHeaderV3Banner />
        </VariantBlock>
        <VariantBlock tag="V4" title="Master Craftsman Plate (sürpriz)" source="item-mix">
          <CategoryHeaderV4MasterPlate />
        </VariantBlock>
      </Section>

      <Section
        title="Bonus Banner Variants"
        description="Item Mix Guide'da kullanılmayan bonus item bilgi kutusu varyasyonları."
      >
        <VariantBlock tag="V1" title="Sky tinted card" source="item-mix">
          <BonusV1SkyCard />
        </VariantBlock>
        <VariantBlock tag="V2" title="Inline tip + İPUCU rozeti" source="item-mix">
          <BonusV2InlineTip />
        </VariantBlock>
        <VariantBlock tag="V4" title="Editorial fade çizgi" source="item-mix">
          <BonusV4Editorial />
        </VariantBlock>
      </Section>
    </div>
  )
}
