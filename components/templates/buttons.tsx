"use client"

import {
  IconDownload,
  IconX,
  IconCheck,
  IconArrowRight,
  IconPlayerPlayFilled,
  IconUserPlus,
  IconBrandDiscord,
  IconShoppingCart,
  IconCrown,
  IconSparkles,
  IconSwords,
  IconShield,
  IconKey,
  IconCoin,
  IconStar,
  IconTrophy,
  IconHeart,
  IconShare,
  IconBell,
  IconRocket,
  IconExternalLink,
  IconFlame,
  IconGift,
  IconLock,
  IconRefresh,
  IconEye,
  IconPlus,
  IconCircleArrowRight,
  IconSettings,
  IconTrash,
  IconCopy,
  IconBolt,
  IconDiamond,
  IconChevronRight,
  IconLoader2,
  IconMail,
  IconBrandGoogle,
  IconBrandSteam,
} from "@tabler/icons-react"

/* ───────────────────────── VARIANT LABEL COMPONENTS ───────────────────────── */

function VariantLabel({ n, title }: { n: number; title: string }) {
  return (
    <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-cream-dim/60">
      <span className="font-mono text-gold-400/80">v{n.toString().padStart(2, "0")}</span>
      <span className="h-px flex-1 bg-line" />
      <span>{title}</span>
    </div>
  )
}

function ExtraVariantLabel({ n, title, kind }: { n: number; title: string; kind: "single" | "pair" | "group" }) {
  const kindStyles = {
    single: "bg-cream-dim/10 text-cream-dim",
    pair: "bg-gold-500/15 text-gold-300",
    group: "bg-emerald-500/15 text-emerald-300",
  }
  const kindLabels = { single: "TEKLI", pair: "IKILI", group: "GRUP" }
  
  return (
    <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-cream-dim/60">
      <span className="font-mono text-gold-400/80">v{n.toString().padStart(2, "0")}</span>
      <span className={`px-1.5 py-px rounded text-[9px] font-bold ${kindStyles[kind]}`}>
        {kindLabels[kind]}
      </span>
      <span className="h-px flex-1 bg-line" />
      <span>{title}</span>
    </div>
  )
}

function SectionTitle({ title, count }: { title: string; count: number }) {
  return (
    <div className="flex items-center gap-3 pb-2 border-b border-line">
      <h2 className="text-cream text-sm font-bold">{title}</h2>
      <span className="px-2 py-0.5 rounded-full bg-gold-500/10 text-gold-400 text-[10px] font-bold">
        {count} varyasyon
      </span>
    </div>
  )
}

/* ───────────────────────── DOWNLOAD BUTTON VARIANTS ───────────────────────── */

function DownloadVariants() {
  return (
    <div className="space-y-5">
      {/* v01 - Shimmer Sweep */}
      <div className="space-y-2">
        <VariantLabel n={1} title="Shimmer Sweep" />
        <button className="group relative w-full h-11 rounded-xl bg-gradient-to-b from-gold-400 to-gold-500 text-ink-950 font-bold text-sm overflow-hidden transition hover:brightness-110">
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          <span className="relative flex items-center justify-center gap-2">
            <IconDownload className="h-4 w-4" />
            Oyunu Indir
          </span>
        </button>
      </div>

      {/* v02 - Arrow Reveal */}
      <div className="space-y-2">
        <VariantLabel n={2} title="Arrow Reveal" />
        <button className="group relative w-full h-11 rounded-xl bg-gradient-to-b from-gold-400 to-gold-500 text-ink-950 font-bold text-sm overflow-hidden">
          <span className="flex items-center justify-center gap-2 transition-transform duration-300 group-hover:-translate-x-2">
            <IconDownload className="h-4 w-4" />
            Oyunu Indir
          </span>
          <IconArrowRight className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
        </button>
      </div>

      {/* v03 - Aura Ring */}
      <div className="space-y-2">
        <VariantLabel n={3} title="Aura Ring" />
        <button className="group relative w-full h-11 rounded-xl bg-gradient-to-b from-gold-400 to-gold-500 text-ink-950 font-bold text-sm flex items-center justify-center gap-2 transition hover:brightness-110 ring-0 ring-gold-400/0 hover:ring-4 hover:ring-gold-400/30 duration-300">
          <IconDownload className="h-4 w-4" />
          Oyunu Indir
        </button>
      </div>

      {/* v04 - Icon Morph */}
      <div className="space-y-2">
        <VariantLabel n={4} title="Icon Morph" />
        <button className="group relative w-full h-11 rounded-xl bg-gradient-to-b from-gold-400 to-gold-500 text-ink-950 font-bold text-sm flex items-center justify-center gap-2 hover:brightness-110 transition overflow-hidden">
          <span className="relative h-4 w-4">
            <IconDownload className="absolute inset-0 h-4 w-4 transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-2 group-hover:rotate-45" />
            <IconPlayerPlayFilled className="absolute inset-0 h-4 w-4 opacity-0 translate-y-2 -rotate-45 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-hover:rotate-0" />
          </span>
          <span className="transition-all duration-300 group-hover:tracking-wider">Oyunu Indir</span>
        </button>
      </div>

      {/* v05 - 3D Press */}
      <div className="space-y-2">
        <VariantLabel n={5} title="3D Press" />
        <button className="group relative w-full h-11 rounded-xl bg-gradient-to-b from-gold-400 to-gold-500 text-ink-950 font-bold text-sm flex items-center justify-center gap-2 shadow-[0_4px_0_0_#8a5a0a,0_6px_12px_-2px_rgba(0,0,0,0.4)] transition-all duration-100 hover:brightness-110 active:translate-y-1 active:shadow-[0_0_0_0_#8a5a0a,0_2px_4px_-1px_rgba(0,0,0,0.3)]">
          <IconDownload className="h-4 w-4" />
          Oyunu Indir
        </button>
      </div>

      {/* v06 - 3D Press + Shimmer */}
      <div className="space-y-2">
        <VariantLabel n={6} title="3D Press + Shimmer" />
        <button className="group relative w-full h-11 rounded-xl bg-gradient-to-b from-gold-400 to-gold-500 text-ink-950 font-bold text-sm overflow-hidden shadow-[0_4px_0_0_#8a5a0a,0_6px_12px_-2px_rgba(0,0,0,0.4)] transition-all duration-100 hover:brightness-110 active:translate-y-1 active:shadow-[0_0_0_0_#8a5a0a,0_2px_4px_-1px_rgba(0,0,0,0.3)]">
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          <span className="relative flex items-center justify-center gap-2">
            <IconDownload className="h-4 w-4" />
            Oyunu Indir
          </span>
        </button>
      </div>

      {/* v07 - Shimmer + Arrow */}
      <div className="space-y-2">
        <VariantLabel n={7} title="Shimmer + Arrow" />
        <button className="group relative w-full h-11 rounded-xl bg-gradient-to-b from-gold-400 to-gold-500 text-ink-950 font-bold text-sm overflow-hidden hover:brightness-110 transition">
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          <span className="relative flex items-center justify-center gap-2 transition-transform duration-300 group-hover:-translate-x-2">
            <IconDownload className="h-4 w-4" />
            Oyunu Indir
          </span>
          <IconArrowRight className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
        </button>
      </div>

      {/* v08 - Aura + Icon Morph */}
      <div className="space-y-2">
        <VariantLabel n={8} title="Aura + Icon Morph" />
        <button className="group relative w-full h-11 rounded-xl bg-gradient-to-b from-gold-400 to-gold-500 text-ink-950 font-bold text-sm flex items-center justify-center gap-2 transition duration-300 hover:brightness-110 ring-0 ring-gold-400/0 hover:ring-4 hover:ring-gold-400/30">
          <span className="relative h-4 w-4">
            <IconDownload className="absolute inset-0 h-4 w-4 transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-2 group-hover:rotate-45" />
            <IconPlayerPlayFilled className="absolute inset-0 h-4 w-4 opacity-0 translate-y-2 -rotate-45 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-hover:rotate-0" />
          </span>
          <span className="transition-all duration-300 group-hover:tracking-wider">Oyunu Indir</span>
        </button>
      </div>

      {/* v09 - Shimmer + Icon Morph */}
      <div className="space-y-2">
        <VariantLabel n={9} title="Shimmer + Icon Morph" />
        <button className="group relative w-full h-11 rounded-xl bg-gradient-to-b from-gold-400 to-gold-500 text-ink-950 font-bold text-sm overflow-hidden hover:brightness-110 transition">
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          <span className="relative flex items-center justify-center gap-2">
            <span className="relative h-4 w-4">
              <IconDownload className="absolute inset-0 h-4 w-4 transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-2 group-hover:rotate-45" />
              <IconPlayerPlayFilled className="absolute inset-0 h-4 w-4 opacity-0 translate-y-2 -rotate-45 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-hover:rotate-0" />
            </span>
            <span className="transition-all duration-300 group-hover:tracking-wider">Oyunu Indir</span>
          </span>
        </button>
      </div>

      {/* v10 - 3D Press + Arrow */}
      <div className="space-y-2">
        <VariantLabel n={10} title="3D Press + Arrow" />
        <button className="group relative w-full h-11 rounded-xl bg-gradient-to-b from-gold-400 to-gold-500 text-ink-950 font-bold text-sm overflow-hidden shadow-[0_4px_0_0_#8a5a0a,0_6px_12px_-2px_rgba(0,0,0,0.4)] transition-all duration-100 hover:brightness-110 active:translate-y-1 active:shadow-[0_0_0_0_#8a5a0a,0_2px_4px_-1px_rgba(0,0,0,0.3)]">
          <span className="flex items-center justify-center gap-2 transition-transform duration-300 group-hover:-translate-x-2">
            <IconDownload className="h-4 w-4" />
            Oyunu Indir
          </span>
          <IconArrowRight className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
        </button>
      </div>
    </div>
  )
}

/* ───────────────────────── EXTRA BUTTON VARIANTS ───────────────────────── */

const goldSolid = "h-11 px-5 rounded-xl bg-gradient-to-b from-gold-400 to-gold-500 text-ink-950 font-bold text-sm flex items-center justify-center gap-2 hover:brightness-110 transition"
const outlineSoft = "h-11 px-5 rounded-xl border border-line hover:border-gold-500/50 bg-white/[0.02] text-cream hover:text-gold-300 font-semibold text-sm flex items-center justify-center gap-2 transition-colors"

function ExtraButtonVariants() {
  return (
    <div className="space-y-6">
      {/* v11 - Indir + Hesap Olustur */}
      <div className="space-y-2">
        <ExtraVariantLabel n={11} title="Indir + Hesap Olustur" kind="pair" />
        <div className="flex flex-wrap items-center gap-3">
          <button className={goldSolid}><IconDownload className="w-4 h-4" />Oyunu Indir</button>
          <span className="text-cream-dim/50 text-sm">veya</span>
          <button className={outlineSoft}><IconUserPlus className="w-4 h-4" />Hesap Olustur</button>
        </div>
      </div>

      {/* v12 - Login + Register (Ikonsuz) */}
      <div className="space-y-2">
        <ExtraVariantLabel n={12} title="Login + Register (Ikonsuz)" kind="pair" />
        <div className="flex flex-wrap items-center gap-3">
          <button className="h-11 px-6 rounded-xl bg-gradient-to-b from-gold-400 to-gold-500 text-ink-950 font-bold text-sm hover:brightness-110 transition">Giris Yap</button>
          <button className="h-11 px-6 rounded-xl border border-line hover:border-gold-500/50 bg-white/[0.02] text-cream hover:text-gold-300 font-semibold text-sm transition-colors">Kayit Ol</button>
        </div>
      </div>

      {/* v13 - Indir + Discord Ghost */}
      <div className="space-y-2">
        <ExtraVariantLabel n={13} title="Indir + Discord Ghost" kind="pair" />
        <div className="flex flex-wrap items-center gap-2">
          <button className={goldSolid}><IconDownload className="w-4 h-4" />Indir</button>
          <button className="h-11 px-4 rounded-xl text-cream-dim hover:text-gold-300 hover:bg-white/[0.04] font-semibold text-sm flex items-center gap-2 transition"><IconBrandDiscord className="w-4 h-4" />Discord</button>
        </div>
      </div>

      {/* v14 - Pill — Indir */}
      <div className="space-y-2">
        <ExtraVariantLabel n={14} title="Pill — Indir" kind="single" />
        <button className="h-11 px-7 rounded-full bg-gradient-to-b from-gold-400 to-gold-500 text-ink-950 font-bold text-sm flex items-center gap-2 hover:brightness-110 transition"><IconDownload className="w-4 h-4" />Hemen Indir</button>
      </div>

      {/* v15 - Sharp Square — Battle CTA */}
      <div className="space-y-2">
        <ExtraVariantLabel n={15} title="Sharp Square — Battle CTA" kind="single" />
        <button className="h-12 px-6 rounded-sm bg-gradient-to-b from-gold-400 to-gold-600 text-ink-950 font-black text-sm uppercase tracking-wider flex items-center gap-2 hover:brightness-110 transition border-b-2 border-gold-600"><IconSwords className="w-4 h-4" />Savasa Katil</button>
      </div>

      {/* v16 - Icon Only — Square */}
      <div className="space-y-2">
        <ExtraVariantLabel n={16} title="Icon Only — Square" kind="group" />
        <div className="flex gap-2">
          <button aria-label="Indir" className="h-11 w-11 rounded-xl bg-gradient-to-b from-gold-400 to-gold-500 text-ink-950 flex items-center justify-center hover:brightness-110 transition"><IconDownload className="w-5 h-5" /></button>
          <button aria-label="Begen" className="h-11 w-11 rounded-xl border border-line hover:border-gold-500/50 bg-white/[0.02] text-cream-dim hover:text-gold-300 flex items-center justify-center transition"><IconHeart className="w-5 h-5" /></button>
          <button aria-label="Paylas" className="h-11 w-11 rounded-xl border border-line hover:border-gold-500/50 bg-white/[0.02] text-cream-dim hover:text-gold-300 flex items-center justify-center transition"><IconShare className="w-5 h-5" /></button>
          <button aria-label="Bildirim" className="h-11 w-11 rounded-xl border border-line hover:border-gold-500/50 bg-white/[0.02] text-cream-dim hover:text-gold-300 flex items-center justify-center transition"><IconBell className="w-5 h-5" /></button>
        </div>
      </div>

      {/* v17 - Small Compact */}
      <div className="space-y-2">
        <ExtraVariantLabel n={17} title="Small Compact" kind="group" />
        <div className="flex flex-wrap gap-2">
          <button className="h-8 px-3 rounded-md bg-gradient-to-b from-gold-400 to-gold-500 text-ink-950 font-bold text-xs flex items-center gap-1.5 hover:brightness-110 transition"><IconPlus className="w-3.5 h-3.5" />Ekle</button>
          <button className="h-8 px-3 rounded-md border border-line hover:border-gold-500/40 text-cream-dim hover:text-gold-300 font-semibold text-xs flex items-center gap-1.5 transition"><IconRefresh className="w-3.5 h-3.5" />Yenile</button>
          <button className="h-8 px-3 rounded-md border border-line hover:border-gold-500/40 text-cream-dim hover:text-gold-300 font-semibold text-xs flex items-center gap-1.5 transition"><IconEye className="w-3.5 h-3.5" />Onizle</button>
        </div>
      </div>

      {/* v18 - Large Hero CTA */}
      <div className="space-y-2">
        <ExtraVariantLabel n={18} title="Large Hero CTA" kind="single" />
        <button className="group h-14 px-8 rounded-2xl bg-gradient-to-b from-gold-300 via-gold-400 to-gold-500 text-ink-950 font-black text-base flex items-center gap-3 hover:brightness-110 transition shadow-[0_8px_24px_-8px_rgba(245,184,54,0.6)]"><IconRocket className="w-5 h-5" />Maceraya Basla<IconArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" /></button>
      </div>

      {/* v19 - Modal Footer — Onayla + Vazgec */}
      <div className="space-y-2">
        <ExtraVariantLabel n={19} title="Modal Footer — Onayla + Vazgec" kind="pair" />
        <div className="flex justify-end gap-2 p-3 rounded-xl border border-line bg-ink-900/40">
          <button className="h-10 px-4 rounded-md text-sm text-cream-dim hover:text-cream border border-line hover:bg-ink-700 transition">Vazgec</button>
          <button className="h-10 px-4 rounded-md text-sm font-bold bg-gradient-to-b from-gold-400 to-gold-500 text-ink-950 flex items-center gap-1.5 hover:brightness-110 transition"><IconCheck className="w-4 h-4" />Onayla</button>
        </div>
      </div>

      {/* v20 - Premium + Free (Grid) */}
      <div className="space-y-2">
        <ExtraVariantLabel n={20} title="Premium + Free (Grid)" kind="pair" />
        <div className="grid grid-cols-2 gap-2">
          <button className="h-12 rounded-xl bg-gradient-to-b from-gold-400 to-gold-500 text-ink-950 font-bold text-sm flex items-center justify-center gap-2 hover:brightness-110 transition"><IconCrown className="w-4 h-4" />Premium Al</button>
          <button className="h-12 rounded-xl border border-line hover:border-gold-500/50 bg-white/[0.02] text-cream hover:text-gold-300 font-semibold text-sm flex items-center justify-center gap-2 transition">Ucretsiz Dene</button>
        </div>
      </div>

      {/* v21 - With Badge — Yeni */}
      <div className="space-y-2">
        <ExtraVariantLabel n={21} title="With Badge — Yeni" kind="single" />
        <button className="relative h-11 px-5 rounded-xl bg-gradient-to-b from-gold-400 to-gold-500 text-ink-950 font-bold text-sm flex items-center gap-2 hover:brightness-110 transition"><IconGift className="w-4 h-4" />Hediye Kodu Kullan<span className="absolute -top-2 -right-2 h-5 px-1.5 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center">YENI</span></button>
      </div>

      {/* v22 - Outline Only — Detaylar */}
      <div className="space-y-2">
        <ExtraVariantLabel n={22} title="Outline Only — Detaylar" kind="single" />
        <button className="h-11 px-5 rounded-xl border-2 border-gold-500/40 hover:border-gold-400 hover:bg-gold-500/5 text-gold-300 font-bold text-sm flex items-center gap-2 transition"><IconExternalLink className="w-4 h-4" />Detaylari Gor</button>
      </div>

      {/* v23 - Sosyal Login Pair */}
      <div className="space-y-2">
        <ExtraVariantLabel n={23} title="Sosyal Login Pair" kind="pair" />
        <div className="grid grid-cols-2 gap-2">
          <button className="h-11 rounded-xl border border-line hover:border-gold-500/40 bg-white/[0.02] text-cream font-semibold text-sm flex items-center justify-center gap-2 transition"><IconBrandDiscord className="w-4 h-4 text-[#5865F2]" />Discord</button>
          <button className="h-11 rounded-xl border border-line hover:border-gold-500/40 bg-white/[0.02] text-cream font-semibold text-sm flex items-center justify-center gap-2 transition"><IconKey className="w-4 h-4" />Hesabim</button>
        </div>
      </div>

      {/* v24 - Disabled / Locked */}
      <div className="space-y-2">
        <ExtraVariantLabel n={24} title="Disabled / Locked" kind="single" />
        <button disabled className="h-11 px-5 rounded-xl bg-ink-700 text-cream-dim/50 font-bold text-sm flex items-center gap-2 cursor-not-allowed border border-line"><IconLock className="w-4 h-4" />Seviye 30 Gerekli</button>
      </div>

      {/* v25 - Loading State */}
      <div className="space-y-2">
        <ExtraVariantLabel n={25} title="Loading State" kind="single" />
        <button className="h-11 px-5 rounded-xl bg-gradient-to-b from-gold-400/70 to-gold-500/70 text-ink-950 font-bold text-sm flex items-center gap-2 cursor-wait"><span className="h-4 w-4 rounded-full border-2 border-ink-950/30 border-t-ink-950 animate-spin" />Indiriliyor...</button>
      </div>

      {/* v26 - Toggle Pair (Segmented) */}
      <div className="space-y-2">
        <ExtraVariantLabel n={26} title="Toggle Pair (Segmented)" kind="pair" />
        <div className="inline-flex p-1 rounded-xl bg-ink-900 border border-line gap-1">
          <button className="h-9 px-4 rounded-lg bg-gradient-to-b from-gold-400 to-gold-500 text-ink-950 font-bold text-sm flex items-center gap-1.5"><IconStar className="w-3.5 h-3.5" />Aylik</button>
          <button className="h-9 px-4 rounded-lg text-cream-dim hover:text-cream font-semibold text-sm transition">Yillik</button>
        </div>
      </div>

      {/* v27 - Destructive — Hesabi Sil */}
      <div className="space-y-2">
        <ExtraVariantLabel n={27} title="Destructive — Hesabi Sil" kind="single" />
        <button className="h-11 px-5 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 hover:border-rose-500/50 font-bold text-sm flex items-center gap-2 transition"><IconX className="w-4 h-4" />Hesabi Sil</button>
      </div>

      {/* v28 - Pricing — Coin + Trial */}
      <div className="space-y-2">
        <ExtraVariantLabel n={28} title="Pricing — Coin + Trial" kind="pair" />
        <div className="flex flex-wrap items-center gap-3">
          <button className="h-11 px-5 rounded-xl bg-gradient-to-b from-gold-400 to-gold-500 text-ink-950 font-bold text-sm flex items-center gap-2 hover:brightness-110 transition"><IconCoin className="w-4 h-4" /><span>500 Altin Satin Al</span><span className="text-[11px] font-semibold opacity-70">$4.99</span></button>
          <button className="text-cream-dim hover:text-gold-300 text-sm font-semibold underline-offset-4 hover:underline transition">Ucretsiz Deneme</button>
        </div>
      </div>

      {/* v29 - Soft Tinted Gold */}
      <div className="space-y-2">
        <ExtraVariantLabel n={29} title="Soft Tinted Gold" kind="single" />
        <button className="h-11 px-5 rounded-xl bg-gold-500/10 hover:bg-gold-500/20 border border-gold-500/30 hover:border-gold-400/60 text-gold-300 font-bold text-sm flex items-center gap-2 transition"><IconSparkles className="w-4 h-4" />Gunluk Odul Topla</button>
      </div>

      {/* v30 - Action Bar — 3'lu */}
      <div className="space-y-2">
        <ExtraVariantLabel n={30} title="Action Bar — 3lu" kind="group" />
        <div className="flex flex-wrap items-center gap-2">
          <button className="h-11 px-5 rounded-xl bg-gradient-to-b from-gold-400 to-gold-500 text-ink-950 font-bold text-sm flex items-center gap-2 hover:brightness-110 transition"><IconPlayerPlayFilled className="w-4 h-4" />Oyna</button>
          <button className="h-11 px-4 rounded-xl border border-line hover:border-gold-500/50 bg-white/[0.02] text-cream hover:text-gold-300 font-semibold text-sm flex items-center gap-2 transition"><IconTrophy className="w-4 h-4" />Sira Tablosu</button>
          <button className="h-11 px-4 rounded-xl border border-line hover:border-gold-500/50 bg-white/[0.02] text-cream hover:text-gold-300 font-semibold text-sm flex items-center gap-2 transition"><IconShield className="w-4 h-4" />Klan</button>
        </div>
      </div>

      {/* v31 - Link Style — Devamini Oku */}
      <div className="space-y-2">
        <ExtraVariantLabel n={31} title="Link Style — Devamini Oku" kind="single" />
        <button className="group h-9 px-1 text-gold-300 hover:text-gold-400 font-bold text-sm flex items-center gap-1.5 transition">Devamini Oku<IconCircleArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /></button>
      </div>

      {/* v32 - Glow Pulse — Sinirli Sure */}
      <div className="space-y-2">
        <ExtraVariantLabel n={32} title="Glow Pulse — Sinirli Sure" kind="single" />
        <button className="relative h-11 px-6 rounded-xl bg-gradient-to-b from-gold-400 to-gold-500 text-ink-950 font-bold text-sm flex items-center gap-2 hover:brightness-110 transition shadow-[0_0_20px_rgba(245,184,54,0.45)]"><IconFlame className="w-4 h-4" />Sinirli Sure Teklifi<span className="absolute inset-0 rounded-xl ring-2 ring-gold-400/50 animate-pulse pointer-events-none" /></button>
      </div>

      {/* v33 - Sepet + Wishlist */}
      <div className="space-y-2">
        <ExtraVariantLabel n={33} title="Sepet + Wishlist" kind="pair" />
        <div className="flex items-center gap-2">
          <button className="flex-1 h-11 rounded-xl bg-gradient-to-b from-gold-400 to-gold-500 text-ink-950 font-bold text-sm flex items-center justify-center gap-2 hover:brightness-110 transition"><IconShoppingCart className="w-4 h-4" />Sepete Ekle</button>
          <button aria-label="Wishlist" className="h-11 w-11 rounded-xl border border-line hover:border-rose-500/50 bg-white/[0.02] text-cream-dim hover:text-rose-400 flex items-center justify-center transition"><IconHeart className="w-5 h-5" /></button>
        </div>
      </div>
    </div>
  )
}

/* ───────────────────────── MY CUSTOM VARIANTS (v0 ADDITIONS) ───────────────────────── */

function CustomVariants() {
  return (
    <div className="space-y-6">
      {/* v34 - Gradient Border Glow */}
      <div className="space-y-2">
        <ExtraVariantLabel n={34} title="Gradient Border Glow" kind="single" />
        <button className="group relative h-11 px-6 rounded-xl bg-ink-900 text-cream font-bold text-sm flex items-center gap-2 transition overflow-hidden">
          <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-gold-400 via-gold-500 to-gold-400 opacity-50 group-hover:opacity-100 transition-opacity" />
          <span className="absolute inset-[1px] rounded-[10px] bg-ink-900 z-0" />
          <span className="relative z-10 flex items-center gap-2 group-hover:text-gold-300 transition-colors">
            <IconBolt className="w-4 h-4" />
            Hizli Erisim
          </span>
        </button>
      </div>

      {/* v35 - Icon Circle Group */}
      <div className="space-y-2">
        <ExtraVariantLabel n={35} title="Icon Circle Group" kind="group" />
        <div className="flex gap-3">
          <button aria-label="Ayarlar" className="h-12 w-12 rounded-full bg-gradient-to-b from-gold-400 to-gold-500 text-ink-950 flex items-center justify-center hover:brightness-110 hover:scale-105 transition-all shadow-lg shadow-gold-500/20"><IconSettings className="w-5 h-5" /></button>
          <button aria-label="Kopyala" className="h-12 w-12 rounded-full border border-line hover:border-gold-500/50 bg-ink-800 text-cream-dim hover:text-gold-300 flex items-center justify-center hover:scale-105 transition-all"><IconCopy className="w-5 h-5" /></button>
          <button aria-label="Sil" className="h-12 w-12 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 flex items-center justify-center hover:scale-105 transition-all"><IconTrash className="w-5 h-5" /></button>
        </div>
      </div>

      {/* v36 - Floating Action */}
      <div className="space-y-2">
        <ExtraVariantLabel n={36} title="Floating Action" kind="single" />
        <button className="group h-14 w-14 rounded-full bg-gradient-to-b from-gold-400 to-gold-500 text-ink-950 flex items-center justify-center shadow-[0_8px_32px_-4px_rgba(245,184,54,0.5)] hover:shadow-[0_12px_40px_-4px_rgba(245,184,54,0.6)] hover:scale-110 transition-all">
          <IconPlus className="w-6 h-6 transition-transform group-hover:rotate-90" />
        </button>
      </div>

      {/* v37 - Diamond Premium */}
      <div className="space-y-2">
        <ExtraVariantLabel n={37} title="Diamond Premium" kind="single" />
        <button className="group relative h-12 px-6 rounded-xl bg-gradient-to-r from-violet-500 via-fuchsia-500 to-violet-500 text-white font-bold text-sm flex items-center gap-2 hover:brightness-110 transition overflow-hidden shadow-[0_4px_20px_-4px_rgba(139,92,246,0.5)]">
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          <IconDiamond className="w-4 h-4 relative z-10" />
          <span className="relative z-10">VIP Uyelik</span>
        </button>
      </div>

      {/* v38 - Expanding Text */}
      <div className="space-y-2">
        <ExtraVariantLabel n={38} title="Expanding Text" kind="single" />
        <button className="group h-11 px-5 rounded-xl bg-gradient-to-b from-gold-400 to-gold-500 text-ink-950 font-bold text-sm flex items-center gap-2 hover:brightness-110 transition-all hover:px-8">
          <IconChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          <span>Devam Et</span>
        </button>
      </div>

      {/* v39 - Stacked Social */}
      <div className="space-y-2">
        <ExtraVariantLabel n={39} title="Stacked Social" kind="group" />
        <div className="flex flex-col gap-2 max-w-xs">
          <button className="h-11 rounded-xl border border-line hover:border-gold-500/40 bg-white/[0.02] text-cream font-semibold text-sm flex items-center justify-center gap-2 transition hover:bg-white/[0.04]">
            <IconBrandGoogle className="w-4 h-4" />
            Google ile Giris
          </button>
          <button className="h-11 rounded-xl border border-line hover:border-[#5865F2]/50 bg-white/[0.02] text-cream font-semibold text-sm flex items-center justify-center gap-2 transition hover:bg-[#5865F2]/10">
            <IconBrandDiscord className="w-4 h-4 text-[#5865F2]" />
            Discord ile Giris
          </button>
          <button className="h-11 rounded-xl border border-line hover:border-[#1b2838]/50 bg-white/[0.02] text-cream font-semibold text-sm flex items-center justify-center gap-2 transition hover:bg-white/[0.04]">
            <IconBrandSteam className="w-4 h-4" />
            Steam ile Giris
          </button>
        </div>
      </div>

      {/* v40 - Countdown Badge */}
      <div className="space-y-2">
        <ExtraVariantLabel n={40} title="Countdown Badge" kind="single" />
        <button className="relative h-11 px-5 rounded-xl bg-gradient-to-b from-rose-500 to-rose-600 text-white font-bold text-sm flex items-center gap-2 hover:brightness-110 transition">
          <IconFlame className="w-4 h-4" />
          Flash Indirim
          <span className="ml-2 px-2 py-0.5 rounded bg-white/20 text-[11px] font-mono">02:34:56</span>
        </button>
      </div>

      {/* v41 - Notification Dot */}
      <div className="space-y-2">
        <ExtraVariantLabel n={41} title="Notification Dot" kind="single" />
        <button className="relative h-11 px-5 rounded-xl border border-line hover:border-gold-500/50 bg-white/[0.02] text-cream hover:text-gold-300 font-semibold text-sm flex items-center gap-2 transition">
          <IconMail className="w-4 h-4" />
          Mesajlar
          <span className="absolute -top-1 -right-1 h-5 min-w-5 px-1 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">12</span>
        </button>
      </div>

      {/* v42 - Progress Button */}
      <div className="space-y-2">
        <ExtraVariantLabel n={42} title="Progress Button" kind="single" />
        <button className="relative h-11 px-5 rounded-xl bg-ink-800 border border-line text-cream font-bold text-sm flex items-center gap-2 overflow-hidden">
          <span className="absolute inset-y-0 left-0 w-[65%] bg-gradient-to-r from-emerald-500/30 to-emerald-400/20" />
          <span className="relative z-10 flex items-center gap-2">
            <IconLoader2 className="w-4 h-4 animate-spin" />
            Yukleniyor... 65%
          </span>
        </button>
      </div>

      {/* v43 - Split Button */}
      <div className="space-y-2">
        <ExtraVariantLabel n={43} title="Split Button" kind="pair" />
        <div className="inline-flex">
          <button className="h-11 px-5 rounded-l-xl bg-gradient-to-b from-gold-400 to-gold-500 text-ink-950 font-bold text-sm flex items-center gap-2 hover:brightness-110 transition border-r border-gold-600/30">
            <IconDownload className="w-4 h-4" />
            Indir
          </button>
          <button className="h-11 px-3 rounded-r-xl bg-gradient-to-b from-gold-400 to-gold-500 text-ink-950 flex items-center justify-center hover:brightness-110 transition">
            <IconChevronRight className="w-4 h-4 rotate-90" />
          </button>
        </div>
      </div>

      {/* v44 - Minimal Ghost */}
      <div className="space-y-2">
        <ExtraVariantLabel n={44} title="Minimal Ghost" kind="group" />
        <div className="flex gap-1">
          <button className="h-9 px-3 rounded-lg text-cream-dim hover:text-cream hover:bg-white/[0.06] text-sm font-medium transition">Genel</button>
          <button className="h-9 px-3 rounded-lg bg-gold-500/10 text-gold-300 text-sm font-medium">Aktif</button>
          <button className="h-9 px-3 rounded-lg text-cream-dim hover:text-cream hover:bg-white/[0.06] text-sm font-medium transition">Ayarlar</button>
        </div>
      </div>

      {/* v45 - Emoji Reaction */}
      <div className="space-y-2">
        <ExtraVariantLabel n={45} title="Reaction Buttons" kind="group" />
        <div className="flex gap-2">
          <button className="h-9 px-3 rounded-full border border-line hover:border-gold-500/40 bg-white/[0.02] text-sm flex items-center gap-1.5 transition hover:scale-105">
            <IconHeart className="w-4 h-4 text-rose-400" />
            <span className="text-cream-dim">234</span>
          </button>
          <button className="h-9 px-3 rounded-full border border-line hover:border-gold-500/40 bg-white/[0.02] text-sm flex items-center gap-1.5 transition hover:scale-105">
            <IconStar className="w-4 h-4 text-gold-400" />
            <span className="text-cream-dim">89</span>
          </button>
          <button className="h-9 px-3 rounded-full border border-line hover:border-gold-500/40 bg-white/[0.02] text-sm flex items-center gap-1.5 transition hover:scale-105">
            <IconFlame className="w-4 h-4 text-orange-400" />
            <span className="text-cream-dim">56</span>
          </button>
        </div>
      </div>
    </div>
  )
}

/* ───────────────────────── MAIN EXPORT ───────────────────────── */

export default function ButtonsTemplate() {
  return (
    <div className="px-6 py-8">
      <div className="mx-auto max-w-5xl space-y-12">
        {/* Stats */}
        <div className="flex flex-wrap gap-4 p-4 rounded-xl bg-ink-800/50 border border-line">
          <div className="flex items-center gap-2">
            <span className="text-cream-dim text-sm">Toplam:</span>
            <span className="px-2 py-0.5 rounded bg-gold-500/10 text-gold-400 text-sm font-bold">45 Varyasyon</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-cream-dim text-sm">Download:</span>
            <span className="text-cream text-sm font-medium">10</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-cream-dim text-sm">Ekstra:</span>
            <span className="text-cream text-sm font-medium">23</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-cream-dim text-sm">v0 Ozel:</span>
            <span className="text-cream text-sm font-medium">12</span>
          </div>
        </div>

        {/* Download Buttons Section */}
        <section className="space-y-6">
          <SectionTitle title="Download Button Varyasyonlari" count={10} />
          <div className="max-w-md">
            <DownloadVariants />
          </div>
        </section>

        {/* Extra Buttons Section */}
        <section className="space-y-6">
          <SectionTitle title="Ekstra Button Varyasyonlari" count={23} />
          <div className="max-w-2xl">
            <ExtraButtonVariants />
          </div>
        </section>

        {/* v0 Custom Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 pb-2 border-b border-line">
            <h2 className="text-cream text-sm font-bold">v0 Ozel Eklemeler</h2>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">
              12 varyasyon
            </span>
            <span className="px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-400 text-[10px] font-bold">
              YENI
            </span>
          </div>
          <div className="max-w-2xl">
            <CustomVariants />
          </div>
        </section>
      </div>
    </div>
  )
}
