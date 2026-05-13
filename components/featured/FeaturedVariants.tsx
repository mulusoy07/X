import { IconDownload, IconUserPlus, IconCalendar, IconSparkles, IconCrown, IconBolt, IconChevronRight, IconPlayerPlay } from "@tabler/icons-react";

const COPY = {
  tag: "Bir Cagin Baslangici",
  headline1: "Geri Donus Degil,",
  headline2: "Yeniden Dogus",
  body: "OracleGamer, v1800 ile yolculuguna basladi ve v2100 ile yillar boyunca binlerce oyuncuya ev sahipligi yapti. Simdi ise edindigi tum tecrubeyi arkasina alarak, kendi 64-bit client altyapisiyla yeniden sahneye cikiyor. Bu bir geri donus degil — kehanetin tamamlanisidir.",
};

const BG = (
  <div className="absolute inset-0 placeholder-img" />
);

/* =========================================================
   ORIGINAL — Full overlay, sol hizali
========================================================= */
export function FeaturedOriginal() {
  return (
    <div className="relative w-full h-[420px] rounded-2xl overflow-hidden border border-line">
      {BG}
      <div className="absolute inset-0 bg-gradient-to-r from-ink-950/95 via-ink-950/70 to-transparent" />
      <div className="relative h-full flex flex-col justify-center px-10 max-w-2xl">
        <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-gold-400 mb-3">
          <IconCalendar size={14} />
          {COPY.tag}
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-cream leading-tight mb-4">
          {COPY.headline1}
          <br />
          <span className="text-gold-400">{COPY.headline2}</span>
        </h2>
        <p className="text-sm text-cream-dim/80 mb-6 leading-relaxed">{COPY.body}</p>
        <div className="flex flex-wrap items-center gap-3 text-xs text-cream-dim">
          <button className="group relative h-11 overflow-hidden rounded-xl bg-gradient-to-b from-gold-400 to-gold-500 px-5 text-sm font-bold text-ink-950 shadow-[0_4px_0_0_#8a5a0a,0_6px_12px_-2px_rgba(0,0,0,0.4)] transition-all duration-100 hover:brightness-110 active:translate-y-1 active:shadow-[0_0_0_0_#8a5a0a,0_2px_4px_-1px_rgba(0,0,0,0.3)]">
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative flex items-center gap-2">
              <IconDownload className="w-4 h-4" />
              Oyunu Indir
            </span>
          </button>
          <span>veya</span>
          <button className="group relative h-11 overflow-hidden rounded-xl border border-line bg-gradient-to-b from-white/[0.06] to-white/[0.02] px-5 text-sm font-semibold text-cream shadow-[0_4px_0_0_rgba(120,129,146,0.22),0_6px_12px_-2px_rgba(0,0,0,0.35)] transition-all duration-100 hover:border-gold-500/40 hover:text-gold-300 active:translate-y-1 active:shadow-[0_0_0_0_rgba(120,129,146,0.22),0_2px_4px_-1px_rgba(0,0,0,0.28)]">
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative flex items-center gap-2">
              <IconUserPlus className="w-4 h-4" />
              Hesap Olustur
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   V1 — Cinematic Letterbox (üst alt siyah bant)
========================================================= */
export function FeaturedV1Cinematic() {
  return (
    <div className="relative w-full h-[420px] rounded-2xl overflow-hidden border border-line">
      {BG}
      <div className="absolute top-0 left-0 right-0 h-12 bg-ink-950" />
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-ink-950" />
      <div className="absolute top-3 left-6 right-6 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.3em] text-gold-400/80">
        <span>● REC · ORACLE/v2100</span>
        <span>{COPY.tag}</span>
      </div>
      <div className="relative h-full flex items-center justify-center px-10 text-center">
        <div className="max-w-2xl">
          <h2 className="text-5xl md:text-6xl font-bold text-cream leading-[1.05] mb-4 drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)]">
            {COPY.headline1}
            <br />
            <span className="text-gold-400">{COPY.headline2}</span>
          </h2>
          <p className="text-sm text-cream-dim/90 max-w-xl mx-auto">{COPY.body}</p>
        </div>
      </div>
      <div className="absolute bottom-3 left-6 right-6 flex items-center justify-between">
        <button className="text-xs text-gold-400 font-mono uppercase tracking-wider flex items-center gap-1 hover:text-gold-300">
          <IconPlayerPlay size={12} /> Fragmani Oynat
        </button>
        <div className="flex flex-wrap items-center gap-3">
          <button className="group relative h-11 overflow-hidden rounded-xl bg-gradient-to-b from-gold-400 to-gold-500 px-5 text-sm font-bold text-ink-950 shadow-[0_4px_0_0_#8a5a0a,0_6px_12px_-2px_rgba(0,0,0,0.4)] transition-all duration-100 hover:brightness-110 active:translate-y-1 active:shadow-[0_0_0_0_#8a5a0a,0_2px_4px_-1px_rgba(0,0,0,0.3)]">
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative flex items-center gap-2">
              <IconDownload className="w-4 h-4" />
              Oyunu Indir
            </span>
          </button>
          <button className="group relative h-11 overflow-hidden rounded-xl border border-line bg-gradient-to-b from-white/[0.06] to-white/[0.02] px-5 text-sm font-semibold text-cream shadow-[0_4px_0_0_rgba(120,129,146,0.22),0_6px_12px_-2px_rgba(0,0,0,0.35)] transition-all duration-100 hover:border-gold-500/40 hover:text-gold-300 active:translate-y-1 active:shadow-[0_0_0_0_rgba(120,129,146,0.22),0_2px_4px_-1px_rgba(0,0,0,0.28)]">
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative flex items-center gap-2">
              <IconUserPlus className="w-4 h-4" />
              Hesap Olustur
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   V2 — Split Frame (sol görsel, sağ içerik)
========================================================= */
export function FeaturedV2Split() {
  return (
    <div className="relative w-full h-[420px] rounded-2xl overflow-hidden border border-line grid grid-cols-2">
      <div className="relative">{BG}</div>
      <div className="bg-ink-900 p-10 flex flex-col justify-center border-l border-line">
        <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-gold-400 mb-3">{COPY.tag}</div>
        <h2 className="text-4xl font-bold text-cream leading-tight mb-4">
          {COPY.headline1} <span className="text-gold-400">{COPY.headline2}</span>
        </h2>
        <div className="w-12 h-px bg-gold-500 mb-4" />
        <p className="text-xs text-cream-dim/80 leading-relaxed mb-6">{COPY.body}</p>
        <div className="flex flex-col gap-2">
          <button className="group relative h-11 overflow-hidden rounded-xl bg-gradient-to-b from-gold-400 to-gold-500 px-5 text-sm font-bold text-ink-950 shadow-[0_4px_0_0_#8a5a0a,0_6px_12px_-2px_rgba(0,0,0,0.4)] transition-all duration-100 hover:brightness-110 active:translate-y-1 active:shadow-[0_0_0_0_#8a5a0a,0_2px_4px_-1px_rgba(0,0,0,0.3)]">
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative flex items-center gap-2">
              <IconDownload className="w-4 h-4" />
              Oyunu Indir
            </span>
          </button>
          <button className="group relative h-11 overflow-hidden rounded-xl border border-line bg-gradient-to-b from-white/[0.06] to-white/[0.02] px-5 text-sm font-semibold text-cream shadow-[0_4px_0_0_rgba(120,129,146,0.22),0_6px_12px_-2px_rgba(0,0,0,0.35)] transition-all duration-100 hover:border-gold-500/40 hover:text-gold-300 active:translate-y-1 active:shadow-[0_0_0_0_rgba(120,129,146,0.22),0_2px_4px_-1px_rgba(0,0,0,0.28)]">
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative flex items-center gap-2">
              <IconUserPlus className="w-4 h-4" />
              Hesap Olustur
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   V3 — Floating Glass Card (içerik yüzen cam kart)
========================================================= */
export function FeaturedV3Glass() {
  return (
    <div className="relative w-full h-[420px] rounded-2xl overflow-hidden border border-line">
      {BG}
      <div className="absolute inset-0 bg-ink-950/40" />
      <div className="absolute left-10 bottom-10 max-w-md p-6 rounded-xl border border-gold-500/30 bg-ink-950/60 backdrop-blur-md shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)]">
        <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.3em] text-gold-400 mb-2">
          <IconSparkles size={12} /> {COPY.tag}
        </div>
        <h2 className="text-3xl font-bold text-cream leading-tight mb-3">
          {COPY.headline1} <span className="text-gold-400">{COPY.headline2}</span>
        </h2>
        <p className="text-xs text-cream-dim/80 mb-4 leading-relaxed">{COPY.body}</p>
        <div className="flex items-center gap-2">
          <button className="group relative h-11 overflow-hidden rounded-xl bg-gradient-to-b from-gold-400 to-gold-500 px-5 text-sm font-bold text-ink-950 shadow-[0_4px_0_0_#8a5a0a,0_6px_12px_-2px_rgba(0,0,0,0.4)] transition-all duration-100 hover:brightness-110 active:translate-y-1 active:shadow-[0_0_0_0_#8a5a0a,0_2px_4px_-1px_rgba(0,0,0,0.3)]">
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative flex items-center gap-2">
              <IconDownload className="w-4 h-4" />
              Oyunu Indir
            </span>
          </button>
          <button className="group relative h-11 overflow-hidden rounded-xl border border-line bg-gradient-to-b from-white/[0.06] to-white/[0.02] px-5 text-sm font-semibold text-cream shadow-[0_4px_0_0_rgba(120,129,146,0.22),0_6px_12px_-2px_rgba(0,0,0,0.35)] transition-all duration-100 hover:border-gold-500/40 hover:text-gold-300 active:translate-y-1 active:shadow-[0_0_0_0_rgba(120,129,146,0.22),0_2px_4px_-1px_rgba(0,0,0,0.28)]">
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative flex items-center gap-2">
              <IconUserPlus className="w-4 h-4" />
              Hesap Olustur
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   V4 — Magazine Editorial (büyük serif tipografi)
========================================================= */
export function FeaturedV4Magazine() {
  return (
    <div className="relative w-full h-[420px] rounded-2xl overflow-hidden border border-line bg-ink-900">
      <div className="absolute right-0 top-0 bottom-0 w-1/2">{BG}</div>
      <div className="relative h-full grid grid-cols-2">
        <div className="p-10 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.3em] text-gold-400">
            <span>Issue 01</span>
            <span>v2100</span>
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-[0.4em] text-cream-dim/60 mb-4 border-b border-line pb-2">
              {COPY.tag}
            </div>
            <h2 className="text-5xl font-bold text-cream leading-[0.95] mb-4 tracking-tight">
              {COPY.headline1}
              <br />
              <em className="text-gold-400 font-bold not-italic">{COPY.headline2}</em>
            </h2>
            <p className="text-xs text-cream-dim/70 leading-relaxed border-l-2 border-gold-500 pl-3">{COPY.body}</p>
          </div>
          <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-wider text-cream-dim">
            <span>→ Devam icin sayfayi cevir</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   V5 — Rune Border (mistik altın çerçeve)
========================================================= */
export function FeaturedV5Rune() {
  return (
    <div className="relative w-full h-[420px] rounded-2xl overflow-hidden border-2 border-gold-500/40 shadow-[inset_0_0_60px_rgba(232,154,31,0.15),0_0_40px_rgba(232,154,31,0.2)]">
      {BG}
      <div className="absolute inset-3 border border-gold-500/30 rounded-xl pointer-events-none" />
      <div className="absolute top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-ink-950 border border-gold-500/40 rounded-full text-[10px] font-mono uppercase tracking-[0.3em] text-gold-300">
        ✦ {COPY.tag} ✦
      </div>
      <div className="relative h-full flex flex-col items-center justify-center px-10 text-center">
        <h2 className="text-5xl font-bold text-cream leading-tight mb-4">
          {COPY.headline1}
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600">
            {COPY.headline2}
          </span>
        </h2>
        <p className="text-sm text-cream-dim/80 max-w-xl mb-6 leading-relaxed">{COPY.body}</p>
        <div className="flex flex-wrap items-center gap-3">
          <button className="group relative h-11 overflow-hidden rounded-xl bg-gradient-to-b from-gold-400 to-gold-500 px-5 text-sm font-bold text-ink-950 shadow-[0_4px_0_0_#8a5a0a,0_6px_12px_-2px_rgba(0,0,0,0.4)] transition-all duration-100 hover:brightness-110 active:translate-y-1 active:shadow-[0_0_0_0_#8a5a0a,0_2px_4px_-1px_rgba(0,0,0,0.3)]">
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative flex items-center gap-2">
              <IconDownload className="w-4 h-4" />
              Oyunu Indir
            </span>
          </button>
          <button className="group relative h-11 overflow-hidden rounded-xl border border-line bg-gradient-to-b from-white/[0.06] to-white/[0.02] px-5 text-sm font-semibold text-cream shadow-[0_4px_0_0_rgba(120,129,146,0.22),0_6px_12px_-2px_rgba(0,0,0,0.35)] transition-all duration-100 hover:border-gold-500/40 hover:text-gold-300 active:translate-y-1 active:shadow-[0_0_0_0_rgba(120,129,146,0.22),0_2px_4px_-1px_rgba(0,0,0,0.28)]">
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative flex items-center gap-2">
              <IconUserPlus className="w-4 h-4" />
              Hesap Olustur
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   V6 — Terminal HUD (oyun-içi ekran)
========================================================= */
export function FeaturedV6HUD() {
  return (
    <div className="relative w-full h-[420px] rounded-2xl overflow-hidden border border-emerald-500/30 bg-ink-950">
      {BG}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ background: "repeating-linear-gradient(0deg, transparent 0, transparent 3px, rgba(52,211,153,0.5) 3px, rgba(52,211,153,0.5) 4px)" }}
      />
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-emerald-400">
        <span>SYS://oracle.client.v2100 [ONLINE]</span>
        <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> 0x4F.AGARTHA</span>
      </div>
      <div className="relative h-full flex flex-col justify-center px-10">
        <div className="text-[10px] font-mono text-emerald-400/80 mb-2">&gt; loading_event_log...</div>
        <div className="text-[11px] font-mono text-gold-400 mb-3">[EVENT_TAG] {COPY.tag}</div>
        <h2 className="text-5xl font-mono font-bold text-cream leading-tight mb-4">
          {COPY.headline1}
          <br />
          <span className="text-gold-400">&gt; {COPY.headline2}_</span>
        </h2>
        <p className="text-xs text-cream-dim/80 max-w-2xl mb-5 font-mono leading-relaxed">{COPY.body}</p>
        <div className="flex items-center gap-3">
          <button className="h-9 px-4 rounded border border-gold-500/50 bg-gold-500/10 text-gold-300 text-xs font-mono uppercase tracking-wider flex items-center gap-2 hover:bg-gold-500/20">
            [ {`>`} ] download.exe
          </button>
          <button className="h-9 px-4 rounded border border-emerald-500/40 bg-emerald-500/5 text-emerald-300 text-xs font-mono uppercase tracking-wider flex items-center gap-2 hover:bg-emerald-500/10">
            [ + ] register.user
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   V7 — Vertical Text Stack (sol kenar dik yazı)
========================================================= */
export function FeaturedV7Vertical() {
  return (
    <div className="relative w-full h-[420px] rounded-2xl overflow-hidden border border-line">
      {BG}
      <div className="absolute inset-0 bg-gradient-to-r from-ink-950/90 via-ink-950/30 to-transparent" />
      <div className="absolute left-4 top-0 bottom-0 flex items-center">
        <div
          className="text-[10px] font-mono uppercase tracking-[0.5em] text-gold-400/70"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          {COPY.tag} · v2100 · 64-BIT
        </div>
      </div>
      <div className="relative h-full flex flex-col justify-end pb-12 pl-20 pr-10 max-w-3xl">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-cream leading-tight mb-4">
          <span className="text-gold-400">Geri Donus Degil,</span>
          <br />
          <span className="text-cream">Yeniden Dogus</span>
        </h2>
        <p className="text-sm md:text-base text-cream-dim/80 lg:max-w-[72%] leading-relaxed mb-6">
          OracleGamer, v1800 ile yolculuguna basladi ve v2100 ile yillar boyunca binlerce oyuncuya ev sahipligi
          yapti. Simdi ise edindigi tum tecrubeyi arkasina alarak, kendi 64-bit client altyapisiyla yeniden sahneye
          cikiyor. Bu bir geri donus degil — kehanetin tamamlanisidir.
        </p>
        <div className="flex items-center gap-2 text-xs">
          <button className="group relative h-11 overflow-hidden rounded-xl bg-gradient-to-b from-gold-400 to-gold-500 px-5 text-sm font-bold text-ink-950 shadow-[0_4px_0_0_#8a5a0a,0_6px_12px_-2px_rgba(0,0,0,0.4)] transition-all duration-100 hover:brightness-110 active:translate-y-1 active:shadow-[0_0_0_0_#8a5a0a,0_2px_4px_-1px_rgba(0,0,0,0.3)]">
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative flex items-center gap-2">
              <IconDownload className="w-4 h-4" />
              Oyunu Indir
            </span>
          </button>
          <span>veya</span>
          <button className="group relative h-11 overflow-hidden rounded-xl border border-line bg-gradient-to-b from-white/[0.06] to-white/[0.02] px-5 text-sm font-semibold text-cream shadow-[0_4px_0_0_rgba(120,129,146,0.22),0_6px_12px_-2px_rgba(0,0,0,0.35)] transition-all duration-100 hover:border-gold-500/40 hover:text-gold-300 active:translate-y-1 active:shadow-[0_0_0_0_rgba(120,129,146,0.22),0_2px_4px_-1px_rgba(0,0,0,0.28)]">
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative flex items-center gap-2">
              <IconUserPlus className="w-4 h-4" />
              Hesap Olustur
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   V8 — Stat Sidebar (sağda KPI kolonu)
========================================================= */
export function FeaturedV8Stats() {
  return (
    <div className="relative w-full h-[420px] rounded-2xl overflow-hidden border border-line grid grid-cols-[1fr_240px]">
      <div className="relative">
        {BG}
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/95 to-ink-950/40" />
        <div className="relative h-full flex flex-col justify-center px-10 max-w-2xl">
          <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-gold-400 mb-3">{COPY.tag}</div>
          <h2 className="text-4xl md:text-5xl font-bold text-cream leading-tight mb-4">
            {COPY.headline1} <span className="text-gold-400">{COPY.headline2}</span>
          </h2>
          <p className="text-sm text-cream-dim/80 mb-6 leading-relaxed">{COPY.body}</p>
          <div className="flex items-center gap-3">
            <button className="group relative h-11 overflow-hidden rounded-xl bg-gradient-to-b from-gold-400 to-gold-500 px-5 text-sm font-bold text-ink-950 shadow-[0_4px_0_0_#8a5a0a,0_6px_12px_-2px_rgba(0,0,0,0.4)] transition-all duration-100 hover:brightness-110 active:translate-y-1 active:shadow-[0_0_0_0_#8a5a0a,0_2px_4px_-1px_rgba(0,0,0,0.3)]">
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative flex items-center gap-2">
                <IconDownload className="w-4 h-4" />
                Oyunu Indir
              </span>
            </button>
            <button className="group relative h-11 overflow-hidden rounded-xl border border-line bg-gradient-to-b from-white/[0.06] to-white/[0.02] px-5 text-sm font-semibold text-cream shadow-[0_4px_0_0_rgba(120,129,146,0.22),0_6px_12px_-2px_rgba(0,0,0,0.35)] transition-all duration-100 hover:border-gold-500/40 hover:text-gold-300 active:translate-y-1 active:shadow-[0_0_0_0_rgba(120,129,146,0.22),0_2px_4px_-1px_rgba(0,0,0,0.28)]">
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative flex items-center gap-2">
                <IconUserPlus className="w-4 h-4" />
                Hesap Olustur
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="bg-ink-900 border-l border-line p-6 flex flex-col justify-center gap-5">
        {[
          { l: "Versiyon", v: "v2100" },
          { l: "Client", v: "64-bit" },
          { l: "Online", v: "1.842" },
          { l: "Sezon", v: "01" },
        ].map((k) => (
          <div key={k.l}>
            <div className="text-[10px] font-mono uppercase tracking-wider text-cream-dim/50">{k.l}</div>
            <div className="text-2xl font-bold text-gold-400 font-mono leading-tight">{k.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   V9 — Diagonal Slash (eğik kesim hero)
========================================================= */
export function FeaturedV9Diagonal() {
  return (
    <div className="relative w-full h-[420px] rounded-2xl overflow-hidden border border-line">
      {BG}
      <div
        className="absolute inset-0 bg-ink-950/95"
        style={{ clipPath: "polygon(0 0, 60% 0, 45% 100%, 0 100%)" }}
      />
      <div
        className="absolute inset-0 border-r-2 border-gold-500/60 pointer-events-none"
        style={{ clipPath: "polygon(60% 0, 60.4% 0, 45.4% 100%, 45% 100%)" }}
      />
      <div className="relative h-full flex flex-col justify-center pl-10 pr-[45%] max-w-3xl">
        <div className="inline-flex items-center gap-1.5 self-start text-[10px] font-mono uppercase tracking-[0.3em] text-gold-400 mb-3 px-2 py-1 border border-gold-500/30 rounded">
          <IconCrown size={12} /> {COPY.tag}
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-cream leading-tight mb-4">
          {COPY.headline1}
          <br />
          <span className="text-gold-400">{COPY.headline2}</span>
        </h2>
        <p className="text-sm text-cream-dim/80 mb-6 leading-relaxed">{COPY.body}</p>
        <div className="flex flex-wrap items-center gap-3">
          <button className="group relative h-11 overflow-hidden rounded-xl bg-gradient-to-b from-gold-400 to-gold-500 px-5 text-sm font-bold text-ink-950 shadow-[0_4px_0_0_#8a5a0a,0_6px_12px_-2px_rgba(0,0,0,0.4)] transition-all duration-100 hover:brightness-110 active:translate-y-1 active:shadow-[0_0_0_0_#8a5a0a,0_2px_4px_-1px_rgba(0,0,0,0.3)]">
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative flex items-center gap-2">
              <IconDownload className="w-4 h-4" />
              Oyunu Indir
            </span>
          </button>
          <button className="group relative h-11 overflow-hidden rounded-xl border border-line bg-gradient-to-b from-white/[0.06] to-white/[0.02] px-5 text-sm font-semibold text-cream shadow-[0_4px_0_0_rgba(120,129,146,0.22),0_6px_12px_-2px_rgba(0,0,0,0.35)] transition-all duration-100 hover:border-gold-500/40 hover:text-gold-300 active:translate-y-1 active:shadow-[0_0_0_0_rgba(120,129,146,0.22),0_2px_4px_-1px_rgba(0,0,0,0.28)]">
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative flex items-center gap-2">
              <IconUserPlus className="w-4 h-4" />
              Hesap Olustur
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   V10 — Centered Stage (tam ortali, tiyatro sahnesi)
========================================================= */
export function FeaturedV10Stage() {
  return (
    <div className="relative w-full h-[420px] rounded-2xl overflow-hidden border border-line">
      {BG}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(15,12,10,0.95)_75%)]" />
      <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1 rounded-full bg-ink-900/80 border border-gold-500/40">
        <IconBolt size={12} className="text-gold-400" />
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gold-300">{COPY.tag}</span>
      </div>
      <div className="relative h-full flex flex-col items-center justify-center px-10 text-center">
        <h2 className="text-5xl md:text-7xl font-bold text-cream leading-[0.95] mb-2 tracking-tight">
          {COPY.headline1.replace(",", "")}
        </h2>
        <h2 className="text-5xl md:text-7xl font-bold leading-[0.95] mb-6 tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-gold-300 to-gold-600 drop-shadow-[0_4px_20px_rgba(232,154,31,0.4)]">
            {COPY.headline2}
          </span>
        </h2>
        <p className="text-sm text-cream-dim/80 max-w-xl mb-7 leading-relaxed">{COPY.body}</p>
        <div className="flex flex-wrap items-center gap-3">
          <button className="group relative h-11 overflow-hidden rounded-xl bg-gradient-to-b from-gold-400 to-gold-500 px-5 text-sm font-bold text-ink-950 shadow-[0_4px_0_0_#8a5a0a,0_6px_12px_-2px_rgba(0,0,0,0.4)] transition-all duration-100 hover:brightness-110 active:translate-y-1 active:shadow-[0_0_0_0_#8a5a0a,0_2px_4px_-1px_rgba(0,0,0,0.3)]">
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative flex items-center gap-2">
              <IconDownload className="w-4 h-4" />
              Oyunu Indir
            </span>
          </button>
          <button className="group relative h-11 overflow-hidden rounded-xl border border-line bg-gradient-to-b from-white/[0.06] to-white/[0.02] px-5 text-sm font-semibold text-cream shadow-[0_4px_0_0_rgba(120,129,146,0.22),0_6px_12px_-2px_rgba(0,0,0,0.35)] transition-all duration-100 hover:border-gold-500/40 hover:text-gold-300 active:translate-y-1 active:shadow-[0_0_0_0_rgba(120,129,146,0.22),0_2px_4px_-1px_rgba(0,0,0,0.28)]">
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative flex items-center gap-2">
              <IconUserPlus className="w-4 h-4" />
              Hesap Olustur
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
