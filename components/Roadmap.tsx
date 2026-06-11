"use client";

import { motion } from "motion/react";
import { ROADMAP } from "@/lib/config";

/**
 * ROADMAP — "The Road to the Final".
 * A premium vertical timeline: a central gold spine on desktop (left-aligned
 * spine on mobile) with rarity-gem nodes and alternating phase cards. Completed
 * phases glow gold/green and carry a "LIVE" tag with pitch-green checkmarks;
 * upcoming phases are dimmed with muted markers. Cards reveal with a staggered
 * whileInView. Mirrors the design language of TradingCard.tsx.
 */
export function Roadmap() {
  return (
    <section id="roadmap" className="relative py-20 sm:py-28">
      {/* atmospheric wash behind the timeline */}
      <div className="pointer-events-none absolute inset-0 stadium-glow opacity-60" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
        {/* heading block */}
        <div className="mb-12 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold/80">
            THE ROAD TO THE FINAL
          </p>
          <h2 className="mt-2 font-display text-4xl tracking-mega text-white sm:text-5xl">
            ROADMAP
          </h2>
          <div className="gold-rule mx-auto mt-4 w-24" />
        </div>

        {/* timeline */}
        <div className="relative mx-auto max-w-5xl">
          {/* the spine: left on mobile, centered on desktop */}
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-0 top-0 left-[19px] w-px bg-gradient-to-b from-gold/0 via-gold/45 to-gold/0 sm:left-1/2 sm:-translate-x-1/2"
          />

          <ol className="space-y-10 sm:space-y-14">
            {ROADMAP.map((phase, i) => (
              <PhaseRow key={phase.phase} phase={phase} index={i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

type Phase = (typeof ROADMAP)[number];

function PhaseRow({ phase, index }: { phase: Phase; index: number }) {
  const done = phase.done;
  // Alternate sides on desktop for a classic timeline rhythm.
  const onLeft = index % 2 === 0;

  return (
    <motion.li
      className="relative grid grid-cols-[40px_1fr] gap-4 sm:grid-cols-2 sm:gap-0"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      {/* node marker sitting on the spine */}
      <div
        aria-hidden
        className="relative z-10 row-start-1 flex justify-center sm:absolute sm:left-1/2 sm:top-3 sm:-translate-x-1/2"
      >
        <span
          className={`grid h-10 w-10 place-items-center rounded-full border ${
            done
              ? "border-gold/70 bg-night glow-gold"
              : "border-line bg-surface"
          }`}
        >
          {done ? (
            <span className="text-gold drop-shadow text-base leading-none" aria-hidden>
              🏆
            </span>
          ) : (
            <span className="font-display text-sm leading-none text-white/55">
              {index + 1}
            </span>
          )}
        </span>
        {/* pulse ring on the live phase */}
        {done && (
          <span className="absolute inset-0 animate-pulse-glow rounded-full ring-2 ring-gold/40" />
        )}
      </div>

      {/* card — placed on alternating side for desktop */}
      <div
        className={
          onLeft
            ? "col-start-2 sm:col-start-1 sm:pr-12 sm:text-right"
            : "col-start-2 sm:col-start-2 sm:pl-12"
        }
      >
        <PhaseCard phase={phase} alignRight={onLeft} />
      </div>
    </motion.li>
  );
}

function PhaseCard({
  phase,
  alignRight,
}: {
  phase: Phase;
  alignRight: boolean;
}) {
  const done = phase.done;

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border p-5 transition-colors sm:p-6 ${
        done
          ? "border-gold/45 glow-gold"
          : "border-line/80 hover:border-line"
      } ${done ? "" : "opacity-90"}`}
      style={{
        backgroundImage: done
          ? "linear-gradient(150deg, #2a2208 0%, #161203 45%, #0b1124 100%)"
          : "linear-gradient(150deg, #0f1730 0%, #0b1124 60%, #080c18 100%)",
      }}
    >
      {/* foil sweep + hex texture */}
      {done && (
        <div className="holo-gold pointer-events-none absolute inset-0 opacity-50" />
      )}
      <div className="card-glare pointer-events-none absolute inset-0" />

      <div className="relative">
        {/* top row: phase label + status tag */}
        <div
          className={`flex items-center gap-3 ${
            alignRight ? "sm:flex-row-reverse" : ""
          }`}
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold/80">
            {phase.phase}
          </span>
          <StatusTag done={done} />
        </div>

        {/* title */}
        <h3 className="mt-2 font-display text-2xl tracking-mega text-white sm:text-3xl">
          {phase.title}
        </h3>

        {/* checklist */}
        <ul
          className={`mt-4 space-y-2.5 ${
            alignRight ? "sm:ml-auto" : ""
          }`}
        >
          {phase.items.map((item) => (
            <li
              key={item}
              className={`flex items-start gap-2.5 text-sm leading-snug ${
                alignRight ? "sm:flex-row-reverse sm:text-right" : ""
              }`}
            >
              <CheckMark done={done} />
              <span className={done ? "text-white/85" : "text-white/55"}>
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function StatusTag({ done }: { done: boolean }) {
  if (done) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-pitch/15 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-pitch ring-1 ring-pitch/40">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-pitch" aria-hidden />
        LIVE
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full bg-white/5 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-white/45 ring-1 ring-line">
      Upcoming
    </span>
  );
}

function CheckMark({ done }: { done: boolean }) {
  return (
    <span
      aria-hidden
      className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border text-[10px] font-bold leading-none ${
        done
          ? "border-pitch/60 bg-pitch/20 text-pitch"
          : "border-line bg-surface-2 text-white/25"
      }`}
    >
      {done ? "✓" : ""}
    </span>
  );
}
