"use client";

import {
  IconCalendar,
  IconClock,
  IconArrowRight,
  IconBolt,
} from "@tabler/icons-react";
import { events, fmtTime, typeMeta, useCountdowns } from "./data";
import { eventIcon } from "./icons";
import { cn } from "@/lib/utils";

/**
 * V5 — Hero featured event on top + thin "next up" list below.
 * Sidebar-friendly: one focal event, others stay scannable beneath.
 */
export default function EventsV5HeroList() {
  const remaining = useCountdowns(events);
  const featured = events[0];
  const rest = events.slice(1);
  const fm = typeMeta[featured.type];
  const FI = eventIcon[featured.type];
  const ft = fmtTime(remaining[featured.id] ?? featured.offsetSec * 1000);

  return (
    <section className="rounded-2xl border border-line bg-ink-850 overflow-hidden">
      <header className="flex items-center justify-between px-5 pt-5 pb-3">
        <div className="flex items-center gap-2.5">
          <IconCalendar className="w-4 h-4 text-gold-400" />
          <h3 className="font-display font-bold text-cream text-sm uppercase tracking-wider">
            Etkinlikler
          </h3>
        </div>
        <a href="#" className="text-[11px] uppercase tracking-wider font-bold text-gold-400 hover:text-gold-300 inline-flex items-center gap-1">
          Tumu <IconArrowRight className="w-3 h-3" />
        </a>
      </header>

      {/* Featured */}
      <div className="px-5">
        <div className="relative rounded-xl border border-gold-500/30 bg-ink-900 overflow-hidden">
          <div className={cn("absolute inset-0 bg-gradient-to-br opacity-70", fm.glow)} aria-hidden />
          <div className="relative p-4">
            <div className="flex items-center gap-2 flex-wrap mb-3">
              <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-bold", fm.chip)}>
                <FI className="w-3 h-3" /> {fm.label.toUpperCase()}
              </span>
              <span className="text-[10px] uppercase tracking-wider font-bold text-gold-400 bg-gold-500/15 border border-gold-500/30 rounded-full px-2 py-0.5 inline-flex items-center gap-1">
                <IconBolt className="w-3 h-3" /> One Cikan
              </span>
            </div>
            <h4 className="font-display font-extrabold text-xl text-cream leading-tight">
              {featured.title}
            </h4>
            <p className="text-[13px] text-cream-dim mt-1.5 line-clamp-2">{featured.description}</p>

            <div className="mt-4 flex items-end justify-between gap-3 border-t border-line pt-3">
              <div>
                <div className="font-mono text-2xl font-bold text-gold-400 tabular-nums leading-none">
                  {ft.h}:{ft.m}:{ft.s}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-muted mt-1.5">
                  kaldi
                </div>
              </div>
              <div className="text-right text-[11px] text-cream-dim space-y-1">
                <div className="inline-flex items-center gap-1">
                  <IconCalendar className="w-3.5 h-3.5" /> {featured.day}
                </div>
                <div className="inline-flex items-center gap-1">
                  <IconClock className="w-3.5 h-3.5" /> {featured.duration} dk
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Next up list */}
      <div className="px-5 pt-4 pb-2">
        <div className="text-[10px] uppercase tracking-[0.25em] font-bold text-muted mb-2">
          Sonraki
        </div>
      </div>
      <ul className="divide-y divide-line border-t border-line">
        {rest.map((e) => {
          const m = typeMeta[e.type];
          const I = eventIcon[e.type];
          const t = fmtTime(remaining[e.id] ?? e.offsetSec * 1000);
          return (
            <li key={e.id} className="flex items-center gap-3 px-5 py-2.5 hover:bg-ink-900/60 transition">
              <span className={cn("w-7 h-7 grid place-items-center rounded-md border shrink-0", m.chip)}>
                <I className="w-3.5 h-3.5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-[13px] font-bold text-cream truncate leading-tight">
                  {e.title}
                </div>
                <div className="text-[10px] text-cream-dim mt-0.5">
                  {e.day} · {e.duration} dk
                </div>
              </div>
              <div className="font-mono text-xs font-bold text-gold-400 tabular-nums shrink-0">
                {t.h}:{t.m}:{t.s}
              </div>
            </li>
          );
        })}
      </ul>
      <div className="h-3" />
    </section>
  );
}
