import { IconShield, IconCrown } from "@tabler/icons-react";
import { staff, kings, nationTone } from "./data";

export default function V09Ticker() {
  const items = [
    ...staff.map((s) => ({ kind: "staff" as const, ...s })),
    ...kings.map((k) => ({ kind: "king" as const, ...k })),
  ];
  const doubled = [...items, ...items];

  return (
    <div className="card rounded-xl overflow-hidden h-full flex flex-col">
      <div className="section-header">
        <h3 className="font-semibold text-cream text-sm">Yonetim Akisi</h3>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-400">Live</span>
      </div>

      <div className="flex-1 flex flex-col justify-center gap-3 py-4">
        <div className="flex items-center gap-2 px-4">
          <IconShield className="w-3.5 h-3.5 text-gold-400" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-cream-dim">Yoneticiler</span>
          <div className="flex-1 h-px bg-line" />
        </div>
        <div className="overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-ink-900 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-ink-900 to-transparent z-10 pointer-events-none" />
          <div className="ticker-track flex gap-2 w-max">
            {[...staff, ...staff].map((m, i) => (
              <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-line bg-ink-800/60 shrink-0">
                <span className={`w-1.5 h-1.5 rounded-full ${m.isOnline ? "bg-emerald-400" : "bg-muted"}`} />
                <span className="text-[12px] font-semibold text-cream">{m.name}</span>
                <span className="text-[10px] text-muted">· {m.role}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 px-4 mt-2">
          <IconCrown className="w-3.5 h-3.5 text-gold-400" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-cream-dim">Krallar</span>
          <div className="flex-1 h-px bg-line" />
        </div>
        <div className="overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-ink-900 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-ink-900 to-transparent z-10 pointer-events-none" />
          <div className="ticker-track flex gap-2 w-max" style={{ animationDuration: "20s" }}>
            {[...kings, ...kings, ...kings].map((k, i) => {
              const tone = nationTone[k.nation];
              return (
                <div key={i} className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${tone.border} ${tone.bg} shrink-0`}>
                  <IconCrown className="w-3 h-3 text-gold-400" />
                  <span className="text-[12px] font-semibold text-cream">{k.name}</span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${tone.text}`}>{tone.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <span className="hidden">{doubled.length}</span>
    </div>
  );
}