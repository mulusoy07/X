"use client";

import { useState } from "react";
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
 * V2 — Tabbed: segmented icon tabs at top, focused detail card below.
 * Sidebar-friendly alternative to the carousel — all events one click away.
 */
export default function EventsV2Tabs() {
  const [i, setI] = useState(0);
  const remaining = useCountdowns(events);
  const ev = events[i];
  const m = typeMeta[ev.type];
  const Icon = eventIcon[ev.type];
  const t = fmtTime(remaining[ev.id] ?? ev.offsetSec * 1000);
  const soon = (remaining[ev.id] ?? Infinity) < 60 * 60 * 1000;

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

      {/* Segmented tabs */}
      <div className="px-5">
        <div className="flex gap-1 p-1 rounded-lg bg-ink-900 border border-line">
          {events.map((e, idx) => {
            const tm = typeMeta[e.type];
            const I = eventIcon[e.type];
            const active = idx === i;
            return (
              <button
                key={e.id}
                onClick={() => setI(idx)}
                aria-label={e.title}
                className={cn(
                  "flex-1 grid place-items-center h-9 rounded-md transition-all relative",
                  active
                    ? "bg-ink-850 border border-gold-500/40 text-gold-400"
                    : "text-cream-dim hover:text-cream",
                )}
              >
                <I className="w-4 h-4" />
                {!active && (
                  <span className={cn("absolute bottom-1 w-1 h-1 rounded-full", tm.chip.split(" ").find((c) => c.startsWith("text-")))} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Detail card */}
      <div className="p-5">
        <div className="relative rounded-xl border border-line bg-ink-900 overflow-hidden">
          <div className={cn("absolute -top-16 -right-16 w-56 h-56 rounded-full blur-3xl opacity-60 bg-gradient-to-br", m.glow)} aria-hidden />
          <div className="relative p-4">
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className={cn("inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] font-bold", m.chip)}>
                <Icon className="w-3 h-3" /> {m.label.toUpperCase()}
              </span>
              {soon && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-rose-300 bg-rose-500/15 border border-rose-500/30 rounded-full px-2 py-0.5">
                  <IconBolt className="w-3 h-3" /> Yakinda
                </span>
              )}
            </div>
            <h4 className="font-display font-extrabold text-xl text-cream leading-tight">
              {ev.title}
            </h4>
            <p className="text-[13px] text-cream-dim mt-1.5 leading-relaxed line-clamp-2">
              {ev.description}
            </p>
            <div className="mt-4 flex items-end justify-between gap-3 border-t border-line pt-3">
              <div>
                <div className="font-mono text-2xl font-bold text-gold-400 tabular-nums leading-none">
                  {t.h}:{t.m}:{t.s}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-muted mt-1.5">
                  baslangica kalan
                </div>
              </div>
              <div className="text-right text-[11px] text-cream-dim space-y-1">
                <div className="inline-flex items-center gap-1">
                  <IconCalendar className="w-3.5 h-3.5" /> {ev.day}
                </div>
                <div className="inline-flex items-center gap-1">
                  <IconClock className="w-3.5 h-3.5" /> {ev.duration} dk
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
