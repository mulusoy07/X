import { useState } from "react";
import { IconShield, IconCrown, IconChevronRight, IconBolt, IconFlame, IconCircleFilled, IconSword, IconStar } from "@tabler/icons-react";

/* ───────── data ───────── */
type TabType = "staff" | "kings";
interface Staff { rank: number; name: string; role: string; isOnline: boolean }
interface King { rank: number; name: string; nation: "karus" | "elmorad"; title: string; since: string }

// StaffMember interface for aa.tsx variations
interface StaffMember { id: string; name: string; role: string; status: "online" | "away" | "offline"; initials: string; lastSeen?: string; nation: "karus" | "human"; playerClass: string }

const staff: Staff[] = [
  { rank: 1, name: "OracleGM", role: "Oyun Yoneticisi", isOnline: true },
  { rank: 2, name: "OracleMod", role: "Moderator", isOnline: true },
  { rank: 3, name: "OracleGM2", role: "Oyun Yoneticisi", isOnline: false },
  { rank: 4, name: "SupportLead", role: "Destek Lideri", isOnline: true },
  { rank: 5, name: "EventMaster", role: "Etkinlik Sorumlusu", isOnline: false },
];

// Mock data for aa.tsx variations
const staffMembers: StaffMember[] = [
  { id: "1", name: "OracleGM", role: "King", status: "online", initials: "OG", nation: "karus", playerClass: "warrior" },
  { id: "2", name: "OracleMod", role: "Admin", status: "online", initials: "OM", nation: "human", playerClass: "rogue" },
  { id: "3", name: "OracleGM2", role: "GM", status: "away", initials: "O2", nation: "karus", playerClass: "mage" },
  { id: "4", name: "SupportLead", role: "GM", status: "offline", initials: "SL", nation: "human", playerClass: "priest" },
  { id: "5", name: "EventMaster", role: "GM", status: "online", initials: "EM", nation: "karus", playerClass: "warrior" },
];
const kings: King[] = [
  { rank: 1, name: "Thoketh914", nation: "karus", title: "Karus Krali", since: "2026-01-15" },
  { rank: 2, name: "Cedion252", nation: "elmorad", title: "El Morad Krali", since: "2026-01-15" },
];
const tabs = [
  { id: "staff" as TabType, label: "Yoneticiler", icon: IconShield },
  { id: "kings" as TabType, label: "Krallar", icon: IconCrown },
];

/* ───────── shared shell (identical to user's component) ───────── */
function Shell({ renderStatus }: { renderStatus: (online: boolean) => React.ReactNode }) {
  const [activeTab, setActiveTab] = useState<TabType>("staff");
  const nationFor = (i: number) => (i % 2 === 0 ? "karus" : "human");
  return (
    <div className="rounded-2xl border border-line bg-gradient-to-b from-ink-800 to-ink-900 p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gold-500/15 border border-gold-500/30 flex items-center justify-center">
            <IconShield className="w-5 h-5 text-gold-400" />
          </div>
          <div>
            <div className="text-sm font-bold text-cream">Yonetim</div>
            <div className="text-xs text-cream-dim">Yoneticiler ve krallar</div>
          </div>
        </div>
        <button className="flex items-center gap-1 text-xs text-gold-400 hover:text-gold-300">
          Tumunu Gor <IconChevronRight className="w-3 h-3" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl bg-ink-950/60 border border-line mb-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all ${
                active
                  ? "bg-gradient-to-b from-gold-400 to-gold-600 text-ink-950 shadow"
                  : "text-cream-dim hover:text-cream hover:bg-ink-800/50"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="space-y-2">
        {activeTab === "staff" &&
          staff.map((m, i) => (
            <div key={m.name} className="flex items-center gap-3 p-3 rounded-lg bg-ink-850/60 border border-line">
              <div className="w-7 h-7 rounded-md bg-ink-800 border border-line flex items-center justify-center text-[11px] font-bold text-gold-400">
                {i + 1}
              </div>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <div className={`nation-icon nation-${nationFor(i)}`} style={{ width: 22, height: 22 }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-cream truncate">{m.name}</div>
                <div className="text-[11px] text-cream-dim truncate">{m.role}</div>
              </div>
              {renderStatus(m.isOnline)}
            </div>
          ))}
        {activeTab === "kings" &&
          kings.map((k, i) => (
            <div key={k.name} className="flex items-center gap-3 p-3 rounded-lg bg-ink-850/60 border border-line">
              <div className="w-7 h-7 rounded-md bg-ink-800 border border-line flex items-center justify-center text-[11px] font-bold text-gold-400">
                {i + 1}
              </div>
              <div className="w-8 h-8 rounded-lg bg-gold-500/10 border border-gold-500/30 flex items-center justify-center shrink-0">
                <div className={`nation-icon nation-${k.nation === "karus" ? "karus" : "human"}`} style={{ width: 22, height: 22 }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-cream truncate">{k.name}</div>
                <div className="text-[11px] text-cream-dim truncate">{k.title}</div>
              </div>
              {renderStatus(true)}
            </div>
          ))}
      </div>
    </div>
  );
}

/* ───────── ORIGINAL ───────── */
const Original = (online: boolean) => (
  <div className="text-right">
    <div className="text-[10px] uppercase tracking-wider text-cream-dim">Durum</div>
    <div className={`text-xs font-semibold ${online ? "text-emerald-400" : "text-rose-400"}`}>
      {online ? "Cevrimici" : "Cevrimdisi"}
    </div>
  </div>
);

/* ───────── 10 VARIATIONS ───────── */

// V1 — Pulsing Halo Dot
const V1 = (online: boolean) => (
  <div className="relative flex items-center justify-center w-8 h-8">
    <span
      className={`absolute inset-0 rounded-full ${
        online ? "bg-emerald-400/30 animate-ping" : "bg-rose-500/20"
      }`}
    />
    <span
      className={`relative w-2.5 h-2.5 rounded-full ${
        online ? "bg-emerald-400 shadow-[0_0_12px_2px_rgba(52,211,153,0.8)]" : "bg-rose-500"
      }`}
    />
  </div>
);

// V2 — Premium Glass Pill
const V2 = (online: boolean) => (
  <div
    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur-sm border text-[10px] font-bold uppercase tracking-wider ${
      online
        ? "bg-emerald-500/10 border-emerald-400/40 text-emerald-300"
        : "bg-rose-500/10 border-rose-400/30 text-rose-300/70"
    }`}
  >
    <span className={`w-1.5 h-1.5 rounded-full ${online ? "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,1)]" : "bg-rose-400"}`} />
    {online ? "LIVE" : "AWAY"}
  </div>
);

// V3 — Signal Bars
const V3 = (online: boolean) => (
  <div className="flex items-end gap-0.5 h-5">
    {[3, 5, 7, 9].map((h, i) => (
      <span
        key={i}
        className={`w-1 rounded-sm transition-all ${
          online ? "bg-emerald-400" : "bg-ink-700"
        } ${online ? "animate-pulse" : ""}`}
        style={{ height: `${h * 2}px`, animationDelay: `${i * 120}ms` }}
      />
    ))}
  </div>
);

// V4 — Signal Bars + Neon Edge
const V4 = (online: boolean) => (
  <div className="flex items-center gap-2.5">
    <div className="flex items-end gap-0.5 h-5">
      {[3, 5, 7, 9].map((h, i) => (
        <span
          key={i}
          className={`w-1 rounded-sm ${online ? "bg-emerald-400 animate-pulse" : "bg-ink-700"}`}
          style={{ height: `${h * 2}px`, animationDelay: `${i * 120}ms` }}
        />
      ))}
    </div>
    <span
      className={`w-[2px] h-7 rounded-full ${
        online
          ? "bg-gradient-to-b from-emerald-300 via-emerald-400 to-emerald-600 shadow-[0_0_10px_rgba(52,211,153,0.9)]"
          : "bg-ink-700"
      }`}
    />
  </div>
);

// V5 — Bracketed Gem (game inventory pip)
const V5 = (online: boolean) => (
  <div className={`flex items-center gap-1 font-mono text-[13px] leading-none ${online ? "text-emerald-300" : "text-ink-600"}`}>
    <span>[</span>
    <span
      className={`w-2 h-2 rotate-45 ${
        online
          ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]"
          : "bg-ink-700"
      }`}
    />
    <span>]</span>
  </div>
);

// V6 — Orbiting Dash Ring
const V6 = (online: boolean) => (
  <div className="relative w-7 h-7 flex items-center justify-center">
    {online && (
      <svg className="absolute inset-0 animate-[spin_4s_linear_infinite]" viewBox="0 0 28 28">
        <circle cx="14" cy="14" r="12" fill="none" stroke="rgb(52,211,153)" strokeWidth="1" strokeDasharray="3 4" opacity="0.7" />
      </svg>
    )}
    <span
      className={`w-2 h-2 rounded-full ${
        online ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,1)]" : "bg-ink-600"
      }`}
    />
  </div>
);

// V7 — Triple Vertical Pips
const V7 = (online: boolean) => (
  <div className="flex flex-col gap-0.5">
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        className={`w-3.5 h-1 rounded-full ${
          online ? "bg-emerald-400 animate-pulse" : "bg-ink-700"
        }`}
        style={{ animationDelay: `${i * 200}ms`, opacity: online ? 1 - i * 0.15 : 0.6 }}
      />
    ))}
  </div>
);

// V8 — Hex Pip
const V8 = (online: boolean) => (
  <div
    className={`relative w-6 h-7 flex items-center justify-center`}
    style={{ clipPath: "polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%)" }}
  >
    <div className={`absolute inset-0 ${online ? "bg-emerald-500/30" : "bg-ink-800"}`} />
    <div
      className={`absolute inset-[2px] ${online ? "bg-ink-900" : "bg-ink-850"}`}
      style={{ clipPath: "polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%)" }}
    />
    <span
      className={`relative w-1.5 h-1.5 rounded-full ${
        online ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,1)] animate-pulse" : "bg-ink-600"
      }`}
    />
  </div>
);

// V9 — Traveling Light Bar
const V9 = (online: boolean) => (
  <div className="flex flex-col items-end gap-1">
    <span className={`text-[9px] font-bold tracking-[0.15em] ${online ? "text-emerald-300" : "text-cream-dim/50"}`}>
      {online ? "AKTIF" : "PASIF"}
    </span>
    <div className="w-12 h-[2px] rounded-full bg-ink-800 overflow-hidden relative">
      {online && (
        <span className="absolute inset-y-0 w-4 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-[slide_1.8s_linear_infinite] shadow-[0_0_6px_rgba(52,211,153,1)]" />
      )}
    </div>
  </div>
);

// V10 — Gold Crest Dot (premium, on-brand)
const V10 = (online: boolean) => (
  <div className="relative w-7 h-7 flex items-center justify-center">
    <span className={`absolute inset-0 rounded-full border ${online ? "border-gold-400/50" : "border-ink-700"}`} />
    <span className={`absolute inset-1 rounded-full border ${online ? "border-gold-400/30" : "border-ink-700/60"}`} />
    <span
      className={`relative w-2 h-2 rounded-full ${
        online
          ? "bg-gradient-to-br from-gold-300 to-gold-500 shadow-[0_0_10px_rgba(245,184,54,0.9)]"
          : "bg-ink-700"
      }`}
    />
  </div>
);

/* ───────── AA.TSX VARYASYONLARI (Orijinal Kod) ───────── */

const roleIcon = (r: StaffMember["role"]) =>
  r === "King" ? IconCrown : r === "Admin" ? IconShield : r === "GM" ? IconSword : IconStar;

const Avatar = ({ s }: { s: StaffMember }) => (
  <div className="flex gap-1 shrink-0">
    <div className="w-8 h-8 rounded overflow-hidden bg-ink-700/50 p-0.5">
      <div className={`nation-icon nation-${s.nation}`} style={{ width: 28, height: 28 }} />
    </div>
    <div className="w-8 h-8 rounded overflow-hidden bg-ink-700/50 p-0.5">
      <div className={`class-icon class-${s.playerClass}`} style={{ width: 28, height: 28 }} />
    </div>
  </div>
);

/* ORIGINAL — basic dot */
export function StaffOriginal() {
  return (
    <div className="space-y-2">
      {staffMembers.map((s) => {
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

/* V1 — Pulse Aura */
export function StaffV1Aura() {
  return (
    <div className="space-y-2">
      {staffMembers.map((s) => {
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

/* V2 — Vertical Side Bar */
export function StaffV2SideBar() {
  return (
    <div className="space-y-2">
      {staffMembers.map((s) => {
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

/* V3 — Floating Pill Badge */
export function StaffV3FloatingPill() {
  return (
    <div className="space-y-2">
      {staffMembers.map((s) => {
        const Icon = roleIcon(s.role);
        const pill =
          s.status === "online" ? "bg-gradient-to-r from-emerald-400 to-teal-400 text-ink-950"
          : s.status === "away" ? "bg-gradient-to-r from-amber-400 to-gold-400 text-ink-950"
          : "bg-ink-700 text-cream-dim/60 border border-line";
        return (
          <div key={s.id} className="flex items-center gap-3 p-3 rounded-lg border border-line bg-white/[0.02]">
            <div className="relative">
              <Avatar s={s} />
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

/* V4 — HP Bar */
export function StaffV4HPBar() {
  return (
    <div className="space-y-2">
      {staffMembers.map((s) => {
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

/* V5 — Neon Frame */
export function StaffV5NeonFrame() {
  return (
    <div className="space-y-2">
      {staffMembers.map((s) => {
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

/* V6 — Crown Throne */
export function StaffV6Throne() {
  return (
    <div className="space-y-2">
      {staffMembers.map((s) => {
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

/* V7 — Hologram Scanlines */
export function StaffV7Hologram() {
  return (
    <div className="space-y-2">
      {staffMembers.map((s) => {
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

/* V8 — Banner Flag */
export function StaffV8Banner() {
  return (
    <div className="space-y-2">
      {staffMembers.map((s) => {
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

/* V9 — Orbiting Dots */
export function StaffV9Orbit() {
  return (
    <>
      <style>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .orbit-spin { animation: spin-slow 4s linear infinite; }
      `}</style>
      <div className="space-y-2">
        {staffMembers.map((s) => {
          const Icon = roleIcon(s.role);
          const tone =
            s.status === "online" ? "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)]"
            : s.status === "away" ? "bg-amber-400 shadow-[0_0_5px_rgba(251,191,36,0.8)]"
            : "bg-rose-500/40";
          return (
            <div key={s.id} className="flex items-center gap-3 p-3 rounded-lg border border-line bg-white/[0.02]">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <Avatar s={s} />
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

/* V10 — Runic Sigil */
export function StaffV10Runic() {
  return (
    <div className="space-y-2">
      {staffMembers.map((s) => {
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

/* ───────── grid ───────── */
const variants = [
  { key: "V1", title: "V1 — Pulsing Halo Dot", note: "Klasik canli nabiz halkasi.", render: V1 },
  { key: "V2", title: "V2 — Premium Glass Pill", note: "Cam efektli LIVE rozeti.", render: V2 },
  { key: "V3", title: "V3 — Signal Bars", note: "Mobil sinyal cubuklari, animasyonlu.", render: V3 },
  { key: "V4", title: "V4 — Bars + Neon Edge", note: "Sinyal cubuklari + dikey neon cizgi.", render: V4 },
  { key: "V5", title: "V5 — Bracketed Gem", note: "Envanter slotu hissi, donmus gem.", render: V5 },
  { key: "V6", title: "V6 — Orbiting Ring", note: "Donen kesik ring + parlayan cekirdek.", render: V6 },
  { key: "V7", title: "V7 — Triple Pips", note: "Uc dikey cubuk, dalgali yanip soner.", render: V7 },
  { key: "V8", title: "V8 — Hex Pip", note: "Hexagon cerceve icinde glow nokta.", render: V8 },
  { key: "V9", title: "V9 — Traveling Light", note: "Cizgi uzerinde kayan isik huzmesi.", render: V9 },
  { key: "V10", title: "V10 — Gold Crest", note: "Cift altin halka, marka tonu.", render: V10 },
];

export function StaffKingsShowcase() {
  return (
    <div className="min-h-screen bg-ink-900 text-cream py-12 px-4">
      <style>{`
        @keyframes slide { 0% { left: -25%; } 100% { left: 100%; } }
      `}</style>
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Staff / Kings — Status Varyasyonlari</h1>
          <p className="text-sm text-cream-dim mt-1">Orijinal en ustte, altinda 10 alternatif.</p>
        </div>

        <div className="mb-8">
          <div className="text-xs uppercase tracking-wider text-gold-400 font-bold mb-3">Orijinal</div>
          <div className="max-w-md"><Shell renderStatus={Original} /></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {variants.map((v, i) => (
            <div key={v.key}>
              <div className="mb-2">
                <div className="text-xs uppercase tracking-wider text-gold-400 font-bold">{v.title}</div>
                <div className="text-[11px] text-cream-dim">{v.note}</div>
              </div>
              <Shell renderStatus={v.render} />
            </div>
          ))}
        </div>

        {/* AA.TSX VARYASYONLARI */}
        <div className="mt-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold">AA.TSX — Tam Satır Varyasyonları</h2>
            <p className="text-sm text-cream-dim mt-1">Farklı yapıdaki tam satır varyasyonları.</p>
          </div>

          <div className="mb-8">
            <div className="text-xs uppercase tracking-wider text-gold-400 font-bold mb-3">Original</div>
            <div className="max-w-md"><StaffOriginal /></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <div>
              <div className="mb-2">
                <div className="text-xs uppercase tracking-wider text-gold-400 font-bold">V1 — Pulse Aura</div>
                <div className="text-[11px] text-cream-dim">Avatar dış halka pulse efekti.</div>
              </div>
              <StaffV1Aura />
            </div>
            <div>
              <div className="mb-2">
                <div className="text-xs uppercase tracking-wider text-gold-400 font-bold">V2 — Vertical Side Bar</div>
                <div className="text-[11px] text-cream-dim">Sol kenar parlayan çubuk.</div>
              </div>
              <StaffV2SideBar />
            </div>
            <div>
              <div className="mb-2">
                <div className="text-xs uppercase tracking-wider text-gold-400 font-bold">V3 — Floating Pill Badge</div>
                <div className="text-[11px] text-cream-dim">Avatar köşesinde gradient pill.</div>
              </div>
              <StaffV3FloatingPill />
            </div>
            <div>
              <div className="mb-2">
                <div className="text-xs uppercase tracking-wider text-gold-400 font-bold">V4 — HP Bar</div>
                <div className="text-[11px] text-cream-dim">RPG mana/health çubuğu.</div>
              </div>
              <StaffV4HPBar />
            </div>
            <div>
              <div className="mb-2">
                <div className="text-xs uppercase tracking-wider text-gold-400 font-bold">V5 — Neon Frame</div>
                <div className="text-[11px] text-cream-dim">Kart kenarı renkle parlıyor.</div>
              </div>
              <StaffV5NeonFrame />
            </div>
            <div>
              <div className="mb-2">
                <div className="text-xs uppercase tracking-wider text-gold-400 font-bold">V6 — Crown Throne</div>
                <div className="text-[11px] text-cream-dim">King için altın taht efekti.</div>
              </div>
              <StaffV6Throne />
            </div>
            <div>
              <div className="mb-2">
                <div className="text-xs uppercase tracking-wider text-gold-400 font-bold">V7 — Hologram Scanlines</div>
                <div className="text-[11px] text-cream-dim">Hologram tarama çizgileri.</div>
              </div>
              <StaffV7Hologram />
            </div>
            <div>
              <div className="mb-2">
                <div className="text-xs uppercase tracking-wider text-gold-400 font-bold">V8 — Banner Flag</div>
                <div className="text-[11px] text-cream-dim">Köşe bayrak rozeti.</div>
              </div>
              <StaffV8Banner />
            </div>
            <div>
              <div className="mb-2">
                <div className="text-xs uppercase tracking-wider text-gold-400 font-bold">V9 — Orbiting Dots</div>
                <div className="text-[11px] text-cream-dim">Avatar etrafında dönen noktalar.</div>
              </div>
              <StaffV9Orbit />
            </div>
            <div>
              <div className="mb-2">
                <div className="text-xs uppercase tracking-wider text-gold-400 font-bold">V10 — Runic Sigil</div>
                <div className="text-[11px] text-cream-dim">Mistik sembol + glow.</div>
              </div>
              <StaffV10Runic />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
