"use client";

import { IconCalendar, IconArrowRight, IconBell } from "@tabler/icons-react";
import { events, fmtTime, typeMeta, useCountdowns } from "./data";
import { eventIcon } from "./icons";
import { cn } from "@/lib/utils";

/**
 * V4 — Compact stacked list. Each row is a thin event entry with inline countdown
 * and quick "remind" action. Best for high density.
 */
export default function EventsV4Stack() {
  const remaining = useCountdowns(events);
  return (
    <section className="rounded-2xl border border-line bg-ink-850 overflow-hidden">
      <header className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-line">
        <div className="flex items-center gap-2.5">
          <IconCalendar className="w-4 h-4 text-gold-400" />
          <h3 className="font-display font-bold text-cream text-sm uppercase tracking-wider">
            Etkinlikler
          </h3>
          <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-gold-500/15 border border-gold-500/30 text-gold-400">
            {events.length.toString().padStart(2, "0")}
          </span>
        </div>
        <a href="#" className="text-[11px] uppercase tracking-wider font-bold text-gold-400 hover:text-gold-300 inline-flex items-center gap-1">
          Tumu <IconArrowRight className="w-3 h-3" />
        </a>
      </header>

      <ul className="divide-y divide-line">
        {events.map((e) => {
          const m = typeMeta[e.type];
          const I = eventIcon[e.type];
          const t = fmtTime(remaining[e.id] ?? e.offsetSec * 1000);
          const soon = (remaining[e.id] ?? Infinity) < 60 * 60 * 1000;
          return (
            <li
              key={e.id}
              className="group flex items-center gap-3 px-5 py-3 hover:bg-ink-900/70 transition"
            >
              <span className={cn("w-9 h-9 grid place-items-center rounded-lg border shrink-0", m.chip)}>
                <I className="w-4 h-4" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-cream truncate">{e.title}</span>
                  {soon && (
                    <span className="text-[9px] uppercase tracking-wider font-bold text-rose-300 bg-rose-500/15 border border-rose-500/30 rounded px-1 py-px">
                      Yakinda
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-cream-dim truncate">
                  {e.day} · {e.duration} dk
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="font-mono text-sm font-bold text-gold-400 tabular-nums leading-none">
                  {t.h}:{t.m}:{t.s}
                </div>
                <div className="text-[10px] text-muted mt-1">kaldi</div>
              </div>
              <button
                className="ml-1 w-8 h-8 grid place-items-center rounded-md border border-line bg-ink-900 text-cream-dim opacity-0 group-hover:opacity-100 hover:text-gold-400 hover:border-gold-500/40 transition"
                aria-label="Hatirlat"
              >
                <IconBell className="w-3.5 h-3.5" />
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
