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
 * V1 — Split: left vertical list of events, right detailed panel.
 * Good for desktop sidebars / dashboards.
 */
export default function EventsV1Split() {
  const [i, setI] = useState(0);
  const remaining = useCountdowns(events);
  const ev = events[i];
  const meta = typeMeta[ev.type];
  const Icon = eventIcon[ev.type];
  const t = fmtTime(remaining[ev.id] ?? ev.offsetSec * 1000);

  return (
    <section className="rounded-2xl border border-line bg-ink-850 overflow-hidden">
      <header className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-line">
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

      <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr]">
        {/* List */}
        <ul className="border-r border-line max-h-[360px] overflow-y-auto">
          {events.map((e, idx) => {
            const m = typeMeta[e.type];
            const I = eventIcon[e.type];
            const tm = fmtTime(remaining[e.id] ?? e.offsetSec * 1000);
            const active = idx === i;
            return (
              <li key={e.id}>
                <button
                  onClick={() => setI(idx)}
                  className={cn(
                    "w-full text-left px-4 py-3 border-b border-line/70 transition-colors flex items-start gap-2.5",
                    active
                      ? "bg-ink-900"
                      : "hover:bg-ink-900/60",
                  )}
                >
                  <span
                    className={cn(
                      "mt-0.5 w-7 h-7 grid place-items-center rounded-md border shrink-0",
                      m.chip,
                    )}
                  >
                    <I className="w-3.5 h-3.5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span
                      className={cn(
                        "block text-sm font-bold truncate",
                        active ? "text-gold-400" : "text-cream",
                      )}
                    >
                      {e.title}
                    </span>
                    <span className="block text-[11px] text-cream-dim mt-0.5 font-mono tabular-nums">
                      {tm.h}:{tm.m}:{tm.s}
                    </span>
                  </span>
                  {active && (
                    <span className="w-1 self-stretch -my-3 -mr-4 bg-gold-400 rounded-l" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Detail */}
        <div className="relative p-5">
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-br opacity-40 pointer-events-none",
              meta.glow,
            )}
            aria-hidden
          />
          <div className="relative">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] font-bold tracking-wide",
                meta.chip,
              )}
            >
              <Icon className="w-3 h-3" /> {meta.label.toUpperCase()}
            </span>
            <h4 className="mt-3 font-display font-extrabold text-2xl text-cream leading-tight">
              {ev.title}
            </h4>
            <p className="text-sm text-cream-dim mt-1.5 leading-relaxed">
              {ev.description}
            </p>

            <div className="mt-5 flex items-baseline gap-3">
              <div className="font-mono text-4xl font-bold text-gold-400 tabular-nums leading-none">
                {t.h}:{t.m}:{t.s}
              </div>
              <span className="text-[10px] uppercase tracking-wider text-muted">
                kaldi
              </span>
            </div>

            <div className="mt-5 flex items-center gap-4 text-[11px] text-cream-dim border-t border-line pt-3">
              <span className="inline-flex items-center gap-1">
                <IconCalendar className="w-3.5 h-3.5" /> {ev.day}
              </span>
              <span className="inline-flex items-center gap-1">
                <IconClock className="w-3.5 h-3.5" /> {ev.duration} dk
              </span>
              <span className="ml-auto inline-flex items-center gap-1 text-gold-400 font-bold">
                <IconBolt className="w-3.5 h-3.5" /> Hatirlat
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
