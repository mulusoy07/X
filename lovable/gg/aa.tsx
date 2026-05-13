import { staff, type StaffMember } from "./data";
import {
  IconCrown, IconShield, IconBolt, IconSword, IconStar, IconFlame,
  IconCircleFilled,
} from "@tabler/icons-react";

const roleIcon = (r: StaffMember["role"]) =>
  r === "King" ? IconCrown : r === "Admin" ? IconShield : r === "GM" ? IconSword : IconStar;

const Avatar = ({ s, size = 40 }: { s: StaffMember; size?: number }) => (
  <div
    style={{ width: size, height: size }}
    className="rounded-lg bg-gradient-to-br from-ink-700 to-ink-900 border border-line flex items-center justify-center text-gold-300 font-bold font-mono text-sm shrink-0"
  >
    {s.initials}
  </div>
);

/* =========================================================
   ORIGINAL — basic dot
========================================================= */
export function StaffOriginal() {
  return (
    <div className="space-y-2">
      {staff.map((s) => {
        const Icon = roleIcon(s.role);
        const dot =
          s.status === "online" ? "bg-emerald-400"
          : s.status === "away" ? "bg-amber-400"
          : "bg-rose-500/60";
        return (
          <div key={s.id} className="flex items-center gap-3 p-3 rounded-lg border border-line bg-white/[0.02]">
            <Avatar s={s} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <Icon size={14} className="text-gold-400" />
                <span className="text-sm font-semibold text-cream">{s.name}</span>
              </div>
              <div className="text-[11px] text-cream-dim/60">{s.role}</div>
            </div>
            <span className={`w-2 h-2 rounded-full ${dot}`} />
          </div>
        );
      })}
    </div>
  );
}

/* =========================================================
   V1 — Pulse Aura (avatar dış halka pulse)
========================================================= */
export function StaffV1Aura() {
  return (
    <div className="space-y-2">
      {staff.map((s) => {
        const Icon = roleIcon(s.role);
        const aura =
          s.status === "online" ? "ring-2 ring-emerald-400/70 shadow-[0_0_18px_rgba(52,211,153,0.45)]"
          : s.status === "away" ? "ring-2 ring-amber-400/70 shadow-[0_0_14px_rgba(251,191,36,0.35)]"
          : "ring-1 ring-rose-500/30 opacity-60";
        return (
          <div key={s.id} className="flex items-center gap-3 p-3 rounded-lg border border-line bg-white/[0.02]">
            <div className={`relative rounded-lg ${aura} transition-all`}>
              <Avatar s={s} />
              {s.status === "online" && (
                <span className="absolute inset-0 rounded-lg ring-2 ring-emerald-400/40 animate-ping" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <Icon size={14} className="text-gold-400" />
                <span className="text-sm font-semibold text-cream">{s.name}</span>
              </div>
              <div className="text-[11px] text-cream-dim/60">{s.role}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* =========================================================
   V2 — Vertical Side Bar (sol kenar parlayan çubuk)
========================================================= */
export function StaffV2SideBar() {
  return (
    <div className="space-y-2">
      {staff.map((s) => {
        const Icon = roleIcon(s.role);
        const bar =
          s.status === "online" ? "bg-emerald-400 shadow-[0_0_10px_2px_rgba(52,211,153,0.7)]"
          : s.status === "away" ? "bg-amber-400 shadow-[0_0_8px_2px_rgba(251,191,36,0.6)]"
          : "bg-rose-500/40";
        return (
          <div key={s.id} className="relative flex items-center gap-3 p-3 pl-4 rounded-lg border border-line bg-white/[0.02] overflow-hidden">
            <span className={`absolute left-0 top-2 bottom-2 w-1 rounded-r ${bar}`} />
            <Avatar s={s} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <Icon size={14} className="text-gold-400" />
                <span className="text-sm font-semibold text-cream">{s.name}</span>
              </div>
              <div className="text-[11px] text-cream-dim/60">{s.role}</div>
            </div>
            <span className={`text-[10px] uppercase tracking-wider font-mono ${
              s.status === "online" ? "text-emerald-400"
              : s.status === "away" ? "text-amber-400"
              : "text-rose-400/60"
            }`}>{s.status}</span>
          </div>
        );
      })}
    </div>
  );
}

/* =========================================================
   V3 — Floating Pill Badge (avatar köşesinde gradient pill)
========================================================= */
export function StaffV3FloatingPill() {
  return (
    <div className="space-y-2">
      {staff.map((s) => {
        const Icon = roleIcon(s.role);
        const pill =
          s.status === "online" ? "bg-gradient-to-r from-emerald-400 to-teal-400 text-ink-950"
          : s.status === "away" ? "bg-gradient-to-r from-amber-400 to-gold-400 text-ink-950"
          : "bg-ink-700 text-cream-dim/60 border border-line";
        return (
          <div key={s.id} className="flex items-center gap-3 p-3 rounded-lg border border-line bg-white/[0.02]">
            <div className="relative">
              <Avatar s={s} size={44} />
              <span className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider ${pill}`}>
                {s.status === "online" ? "Live" : s.status === "away" ? "AFK" : "Off"}
              </span>
            </div>
            <div className="flex-1 min-w-0 pl-1">
              <div className="flex items-center gap-1.5">
                <Icon size={14} className="text-gold-400" />
                <span className="text-sm font-semibold text-cream">{s.name}</span>
              </div>
              <div className="text-[11px] text-cream-dim/60">{s.role}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* =========================================================
   V4 — HP Bar (RPG mana/health çubuğu)
========================================================= */
export function StaffV4HPBar() {
  return (
    <div className="space-y-2">
      {staff.map((s) => {
        const Icon = roleIcon(s.role);
        const pct = s.status === "online" ? 100 : s.status === "away" ? 40 : 0;
        const color =
          s.status === "online" ? "from-emerald-500 to-emerald-300"
          : s.status === "away" ? "from-amber-500 to-gold-300"
          : "from-rose-700 to-rose-500";
        return (
          <div key={s.id} className="flex items-center gap-3 p-3 rounded-lg border border-line bg-white/[0.02]">
            <Avatar s={s} />
            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Icon size={14} className="text-gold-400" />
                  <span className="text-sm font-semibold text-cream">{s.name}</span>
                </div>
                <span className="text-[10px] font-mono text-cream-dim/60">{pct}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-ink-800 border border-line overflow-hidden">
                <div className={`h-full bg-gradient-to-r ${color} transition-all`} style={{ width: `${pct}%` }} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* =========================================================
   V5 — Neon Frame (kart kenarı renkle parlıyor)
========================================================= */
export function StaffV5NeonFrame() {
  return (
    <div className="space-y-2">
      {staff.map((s) => {
        const Icon = roleIcon(s.role);
        const frame =
          s.status === "online" ? "border-emerald-400/60 shadow-[inset_0_0_20px_rgba(52,211,153,0.15),0_0_12px_rgba(52,211,153,0.3)]"
          : s.status === "away" ? "border-amber-400/50 shadow-[inset_0_0_20px_rgba(251,191,36,0.12),0_0_10px_rgba(251,191,36,0.25)]"
          : "border-line opacity-50";
        return (
          <div key={s.id} className={`flex items-center gap-3 p-3 rounded-lg border bg-white/[0.02] ${frame} transition-all`}>
            <Avatar s={s} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <Icon size={14} className="text-gold-400" />
                <span className="text-sm font-semibold text-cream">{s.name}</span>
              </div>
              <div className="text-[11px] text-cream-dim/60">{s.role}</div>
            </div>
            {s.status === "online" && <IconBolt size={16} className="text-emerald-400 drop-shadow-[0_0_6px_rgba(52,211,153,0.8)]" />}
            {s.status === "away" && <IconFlame size={16} className="text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.8)]" />}
          </div>
        );
      })}
    </div>
  );
}

/* =========================================================
   V6 — Crown Throne (King için altın taht efekti)
========================================================= */
export function StaffV6Throne() {
  return (
    <div className="space-y-2">
      {staff.map((s) => {
        const Icon = roleIcon(s.role);
        const isOnline = s.status === "online";
        return (
          <div key={s.id} className={`relative flex items-center gap-3 p-3 rounded-lg border ${
            isOnline ? "border-gold-500/40 bg-gradient-to-r from-gold-500/[0.08] via-transparent to-transparent" : "border-line bg-white/[0.01] opacity-70"
          }`}>
            {isOnline && (
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 text-ink-950 text-[9px] font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(232,154,31,0.6)]">
                <IconCrown size={10} /> Tahtta
              </div>
            )}
            <Avatar s={s} />
            <div className="flex-1 min-w-0 pt-0.5">
              <div className="flex items-center gap-1.5">
                <Icon size={14} className={isOnline ? "text-gold-300" : "text-cream-dim/40"} />
                <span className={`text-sm font-semibold ${isOnline ? "text-cream" : "text-cream-dim/60"}`}>{s.name}</span>
              </div>
              <div className="text-[11px] text-cream-dim/60">{s.role}</div>
            </div>
            <span className={`text-[10px] font-mono ${isOnline ? "text-gold-300" : "text-cream-dim/40"}`}>
              {isOnline ? "● ACTIVE" : `○ ${s.lastSeen ?? "off"}`}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* =========================================================
   V7 — Hologram Scanlines
========================================================= */
export function StaffV7Hologram() {
  return (
    <div className="space-y-2">
      {staff.map((s) => {
        const Icon = roleIcon(s.role);
        const isOnline = s.status === "online";
        return (
          <div key={s.id} className="relative flex items-center gap-3 p-3 rounded-lg border border-line bg-white/[0.02] overflow-hidden">
            {isOnline && (
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  background: "repeating-linear-gradient(0deg, transparent 0, transparent 2px, rgba(52,211,153,0.4) 2px, rgba(52,211,153,0.4) 3px)",
                }}
              />
            )}
            <Avatar s={s} />
            <div className="flex-1 min-w-0 relative">
              <div className="flex items-center gap-1.5">
                <Icon size={14} className="text-gold-400" />
                <span className={`text-sm font-semibold ${isOnline ? "text-emerald-300 drop-shadow-[0_0_4px_rgba(52,211,153,0.6)]" : "text-cream"}`}>
                  {s.name}
                </span>
              </div>
              <div className="text-[11px] text-cream-dim/60 font-mono">
                {isOnline ? "// SIGNAL_LOCK" : s.status === "away" ? "// IDLE" : "// NO_SIGNAL"}
              </div>
            </div>
            {isOnline && (
              <div className="flex flex-col gap-0.5">
                <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                <span className="w-1 h-1 rounded-full bg-emerald-400/60 animate-pulse [animation-delay:200ms]" />
                <span className="w-1 h-1 rounded-full bg-emerald-400/30 animate-pulse [animation-delay:400ms]" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* =========================================================
   V8 — Banner Flag (köşe bayrağı)
========================================================= */
export function StaffV8Banner() {
  return (
    <div className="space-y-2">
      {staff.map((s) => {
        const Icon = roleIcon(s.role);
        const flag =
          s.status === "online" ? "bg-emerald-500 text-ink-950"
          : s.status === "away" ? "bg-amber-400 text-ink-950"
          : "bg-rose-700/60 text-cream-dim";
        return (
          <div key={s.id} className="relative flex items-center gap-3 p-3 rounded-lg border border-line bg-white/[0.02] overflow-hidden">
            <div className={`absolute -right-8 top-2 rotate-45 px-8 py-0.5 text-[9px] font-bold uppercase tracking-wider ${flag}`}>
              {s.status === "online" ? "Live" : s.status === "away" ? "AFK" : "Off"}
            </div>
            <Avatar s={s} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <Icon size={14} className="text-gold-400" />
                <span className="text-sm font-semibold text-cream">{s.name}</span>
              </div>
              <div className="text-[11px] text-cream-dim/60">{s.role}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* =========================================================
   V9 — Orbiting Dots (avatar etrafında dönen 2 nokta)
========================================================= */
export function StaffV9Orbit() {
  return (
    <>
      <style>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .orbit-spin { animation: spin-slow 4s linear infinite; }
      `}</style>
      <div className="space-y-2">
        {staff.map((s) => {
          const Icon = roleIcon(s.role);
          const tone =
            s.status === "online" ? "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)]"
            : s.status === "away" ? "bg-amber-400 shadow-[0_0_5px_rgba(251,191,36,0.8)]"
            : "bg-rose-500/40";
          return (
            <div key={s.id} className="flex items-center gap-3 p-3 rounded-lg border border-line bg-white/[0.02]">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <Avatar s={s} size={36} />
                {s.status !== "offline" && (
                  <div className="absolute inset-0 orbit-spin">
                    <span className={`absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${tone}`} />
                    <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${tone} opacity-70`} />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <Icon size={14} className="text-gold-400" />
                  <span className="text-sm font-semibold text-cream">{s.name}</span>
                </div>
                <div className="text-[11px] text-cream-dim/60">{s.role}</div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

/* =========================================================
   V10 — Runic Sigil (mistik sembol + glow)
========================================================= */
export function StaffV10Runic() {
  return (
    <div className="space-y-2">
      {staff.map((s) => {
        const Icon = roleIcon(s.role);
        const isOnline = s.status === "online";
        const isAway = s.status === "away";
        return (
          <div key={s.id} className="flex items-center gap-3 p-3 rounded-lg border border-line bg-white/[0.02]">
            <Avatar s={s} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <Icon size={14} className="text-gold-400" />
                <span className="text-sm font-semibold text-cream">{s.name}</span>
              </div>
              <div className="text-[11px] text-cream-dim/60">{s.role}</div>
            </div>
            <div className={`relative w-9 h-9 rounded-full border flex items-center justify-center font-mono text-[10px] font-bold ${
              isOnline ? "border-emerald-400/60 text-emerald-300 bg-emerald-400/5"
              : isAway ? "border-amber-400/50 text-amber-300 bg-amber-400/5"
              : "border-line text-cream-dim/40"
            }`}>
              {isOnline && (
                <span className="absolute inset-0 rounded-full border border-emerald-400/40 animate-ping" />
              )}
              <IconCircleFilled size={6} className="absolute top-0.5 left-1/2 -translate-x-1/2" />
              <IconCircleFilled size={6} className="absolute bottom-0.5 left-1/2 -translate-x-1/2" />
              <IconCircleFilled size={6} className="absolute left-0.5 top-1/2 -translate-y-1/2" />
              <IconCircleFilled size={6} className="absolute right-0.5 top-1/2 -translate-y-1/2" />
              {isOnline ? "✦" : isAway ? "◐" : "✕"}
            </div>
          </div>
        );
      })}
    </div>
  );
}
