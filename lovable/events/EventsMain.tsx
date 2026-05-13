"use client";

import { useState } from "react";
import {
  IconCalendar,
  IconClock,
  IconChevronLeft,
  IconChevronRight,
  IconArrowRight,
  IconBolt,
} from "@tabler/icons-react";
import { events, fmtTime, typeMeta, useCountdowns } from "./data";
import { eventIcon } from "./icons";
import { cn } from "@/lib/utils";

/**
 * EventsMain — refined "ANA" version of the original carousel card.
 * Same design language, modernized: better hierarchy, ambient glow tint
 * by event type, clean countdown row, subtle progress to event start.
 */
export default function EventsMain() {
  const [i, setI] = useState(0);
  const remaining = useCountdowns(events);
  const ev = events[i];
  const meta = typeMeta[ev.type];
  const Icon = eventIcon[ev.type];
  const t = fmtTime(remaining[ev.id] ?? ev.offsetSec * 1000);
  const soon = (remaining[ev.id] ?? Infinity) < 60 * 60 * 1000;

  // Progress: how much of a 24h "approach window" has elapsed
  const window = 24 * 3600 * 1000;
  const ms = remaining[ev.id] ?? ev.offsetSec * 1000;
  const progress = Math.max(0, Math.min(100, ((window - ms) / window) * 100));

  const next = () => setI((p) => (p + 1) % events.length);
  const prev = () => setI((p) => (p === 0 ? events.length - 1 : p - 1));

  return (
    <section className="rounded-2xl border border-line bg-ink-850 overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-5 pt-5 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gold-500/15 border border-gold-500/30 grid place-items-center">
            <IconCalendar className="w-4 h-4 text-gold-400" />
          </div>
          <div>
            <h3 className="font-display font-bold text-cream text-base leading-none">
              Etkinlikler
            </h3>
            <p className="text-[11px] text-cream-dim mt-1">Yaklasan etkinlikler</p>
          </div>
        </div>
        <a
          href="#"
          className="text-[11px] uppercase tracking-wider font-bold text-gold-400 hover:text-gold-300 inline-flex items-center gap-1"
        >
          Tumunu Gor <IconArrowRight className="w-3 h-3" />
        </a>
      </header>

      {/* Card */}
      <div className="relative px-5">
        <div
          className={cn(
            "relative rounded-xl border border-line bg-ink-900 overflow-hidden",
          )}
        >
          {/* Ambient glow */}
          <div
            className={cn(
              "absolute -top-20 -right-20 w-72 h-72 rounded-full blur-3xl opacity-60 bg-gradient-radial",
              "bg-gradient-to-br",
              meta.glow,
            )}
            aria-hidden
          />
          <div className="relative p-5">
            {/* Top row */}
            <div className="flex items-center justify-between gap-3 mb-4">
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-bold tracking-wide",
                  meta.chip,
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                {meta.label.toUpperCase()}
              </span>
              {soon && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-rose-300 bg-rose-500/15 border border-rose-500/30 rounded-full px-2 py-0.5">
                  <IconBolt className="w-3 h-3" /> Yakinda
                </span>
              )}
            </div>

            {/* Title + desc */}
            <h4 className="font-display font-extrabold text-2xl text-cream leading-tight">
              {ev.title}
            </h4>
            <p className="text-sm text-cream-dim mt-1.5 leading-relaxed line-clamp-2">
              {ev.description}
            </p>

            {/* Countdown */}
            <div className="mt-5 grid grid-cols-3 gap-2">
              {[
                { v: t.h, l: "Saat" },
                { v: t.m, l: "Dakika" },
                { v: t.s, l: "Saniye" },
              ].map((u) => (
                <div
                  key={u.l}
                  className="rounded-lg bg-ink-850 border border-line py-2.5 text-center"
                >
                  <div className="font-mono text-2xl font-bold text-gold-400 leading-none tabular-nums">
                    {u.v}
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-muted mt-1.5">
                    {u.l}
                  </div>
                </div>
              ))}
            </div>

            {/* Progress to start */}
            <div className="mt-4 h-1 rounded-full bg-ink-700 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-gold-500 to-gold-300 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Meta */}
            <div className="mt-4 flex items-center gap-3 text-[11px] text-cream-dim">
              <span className="inline-flex items-center gap-1">
                <IconCalendar className="w-3.5 h-3.5" /> {ev.day}
              </span>
              <span className="inline-flex items-center gap-1">
                <IconClock className="w-3.5 h-3.5" /> {ev.duration} dk
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <div className="flex items-center justify-between px-5 py-4">
        <div className="flex gap-2">
          <button
            onClick={prev}
            className="w-8 h-8 grid place-items-center rounded-md border border-line bg-ink-900 text-cream-dim hover:text-cream hover:border-gold-500/40 transition"
            aria-label="Onceki"
          >
            <IconChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={next}
            className="w-8 h-8 grid place-items-center rounded-md border border-line bg-ink-900 text-cream-dim hover:text-cream hover:border-gold-500/40 transition"
            aria-label="Sonraki"
          >
            <IconChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center gap-1.5">
          {events.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Slayt ${idx + 1}`}
              className={cn(
                "transition-all rounded-full",
                idx === i
                  ? "w-5 h-1.5 bg-gold-400"
                  : "w-1.5 h-1.5 bg-cream-dim/30 hover:bg-cream-dim/50",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
