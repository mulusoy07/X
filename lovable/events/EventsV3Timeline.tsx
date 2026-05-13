"use client";

import { IconCalendar, IconArrowRight } from "@tabler/icons-react";
import { events, fmtTime, typeMeta, useCountdowns } from "./data";
import { eventIcon } from "./icons";
import { cn } from "@/lib/utils";

/**
 * V3 — Vertical timeline grouped by day. Each event is a node on a gold rail.
 */
export default function EventsV3Timeline() {
  const remaining = useCountdowns(events);

  // group by day, preserving order
  const days: { day: string; items: typeof events }[] = [];
  for (const e of events) {
    const last = days[days.length - 1];
    if (last && last.day === e.day) last.items.push(e);
    else days.push({ day: e.day, items: [e] });
  }

  return (
    <section className="rounded-2xl border border-line bg-ink-850 overflow-hidden">
      <header className="flex items-center justify-between px-5 pt-5 pb-3">
        <div className="flex items-center gap-2.5">
          <IconCalendar className="w-4 h-4 text-gold-400" />
          <h3 className="font-display font-bold text-cream text-sm uppercase tracking-wider">
            Etkinlik Takvimi
          </h3>
        </div>
        <a href="#" className="text-[11px] uppercase tracking-wider font-bold text-gold-400 hover:text-gold-300 inline-flex items-center gap-1">
          Tumu <IconArrowRight className="w-3 h-3" />
        </a>
      </header>

      <div className="px-5 pb-5 max-h-[440px] overflow-y-auto">
        <ol className="relative pl-5">
          {/* rail */}
          <span
            className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-gold-500/60 via-line to-transparent"
            aria-hidden
          />
          {days.map((d) => (
            <li key={d.day} className="mb-5 last:mb-0">
              <div className="text-[10px] uppercase tracking-[0.25em] font-bold text-gold-400 mb-2 -ml-5 pl-5">
                {d.day}
              </div>
              <ul className="space-y-2.5">
                {d.items.map((e) => {
                  const m = typeMeta[e.type];
                  const I = eventIcon[e.type];
                  const t = fmtTime(remaining[e.id] ?? e.offsetSec * 1000);
                  return (
                    <li key={e.id} className="relative">
                      <span
                        className={cn(
                          "absolute -left-5 top-3 w-3 h-3 rounded-full border-2 border-ink-850",
                          "bg-gold-400",
                        )}
                        aria-hidden
                      />
                      <div className="rounded-lg border border-line bg-ink-900 p-3 hover:border-gold-500/40 transition group">
                        <div className="flex items-center gap-2.5">
                          <span className={cn("w-7 h-7 grid place-items-center rounded-md border shrink-0", m.chip)}>
                            <I className="w-3.5 h-3.5" />
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="text-sm font-bold text-cream truncate">{e.title}</div>
                            <div className="text-[11px] text-cream-dim truncate">{e.description}</div>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="font-mono text-sm font-bold text-gold-400 tabular-nums leading-none">
                              {t.h}:{t.m}:{t.s}
                            </div>
                            <div className="text-[10px] text-muted mt-1">{e.duration} dk</div>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
