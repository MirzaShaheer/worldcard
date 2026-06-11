"use client";

import { motion } from "motion/react";
import { TOKENOMICS, SITE } from "@/lib/config";

/**
 * TOKENOMICS — the core mechanic of World Card.
 * 100% of creator fees fuel a two-engine flywheel: half grows $WORLDCARD,
 * half buys it back and burns it. Rendered as two large facing holo panels
 * (Grow = pitch/green, Burn = gold/crimson) over an animated 50/50 split bar,
 * with a one-line flywheel explainer underneath.
 */

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5 },
} as const;

export function Tokenomics() {
  const [grow, burn] = TOKENOMICS.splits;

  return (
    <section id="tokenomics" className="relative py-20 sm:py-28">
      {/* atmosphere */}
      <div className="pointer-events-none absolute inset-0 stadium-glow opacity-60" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
        {/* heading block */}
        <div className="mb-12 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold/80">
            The Flywheel
          </p>
          <h2 className="mt-2 font-display text-4xl tracking-mega text-white sm:text-5xl">
            100% OF CREATOR FEES{" "}
            <span className="text-gold text-glow-gold">FUEL THE FLYWHEEL</span>
          </h2>
          <div className="gold-rule mx-auto mt-4 w-24" />
          <p className="mx-auto mt-5 max-w-2xl text-sm text-white/65 sm:text-base">
            Every fee {SITE.name} earns is split clean down the middle and put
            straight back to work. No wallets, no insiders — just two engines
            making {SITE.ticker} rarer over time.
          </p>
        </div>

        {/* ===== animated 50/50 split bar ===== */}
        <motion.div {...reveal} className="mx-auto mb-10 max-w-5xl">
          <div className="mb-3 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.25em]">
            <span className="text-pitch">Grow</span>
            <span className="text-white/40">Creator Fees</span>
            <span className="text-gold">Buy Back &amp; Burn</span>
          </div>

          <div className="relative flex h-8 w-full overflow-hidden rounded-full border border-line bg-night-2">
            {/* grow fill */}
            <motion.div
              initial={{ width: "0%" }}
              whileInView={{ width: `${TOKENOMICS.growPct}%` }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative h-full bg-gradient-to-r from-pitch-deep to-pitch"
            >
              <div className="absolute inset-0 holo-silver opacity-30" />
              <span className="absolute inset-y-0 right-3 flex items-center font-mono text-xs font-bold text-night">
                {TOKENOMICS.growPct}%
              </span>
            </motion.div>

            {/* center seam */}
            <div className="z-10 w-px shrink-0 bg-white/30" />

            {/* burn fill */}
            <motion.div
              initial={{ width: "0%" }}
              whileInView={{ width: `${TOKENOMICS.burnPct}%` }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative h-full bg-gradient-to-r from-gold via-gold-deep to-crimson"
            >
              <div className="absolute inset-0 holo-gold opacity-40" />
              <span className="absolute inset-y-0 left-3 flex items-center font-mono text-xs font-bold text-night">
                {TOKENOMICS.burnPct}%
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* ===== two facing panels ===== */}
        <div className="grid gap-6 md:grid-cols-2">
          <SplitPanel
            pct={grow.pct}
            title={grow.title}
            blurb={grow.blurb}
            variant="grow"
            delay={0.05}
          />
          <SplitPanel
            pct={burn.pct}
            title={burn.title}
            blurb={burn.blurb}
            variant="burn"
            delay={0.15}
          />
        </div>

        {/* ===== flywheel explainer ===== */}
        <motion.div {...reveal} className="mt-12">
          <div className="mx-auto flex max-w-4xl flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
            <FlowChip>Creator fees</FlowChip>
            <FlowArrow />
            <FlowChip accent="pitch">50% grow {SITE.ticker}</FlowChip>
            <span className="hidden text-center font-display text-lg text-white/30 sm:block">
              +
            </span>
            <FlowChip accent="gold">50% buy back &amp; burn</FlowChip>
            <FlowArrow />
            <FlowChip accent="strong">Rarer supply</FlowChip>
          </div>
          <p className="mt-6 text-center font-mono text-xs uppercase tracking-[0.25em] text-white/45">
            More volume → more fees → more burn → fewer cards in the pack
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ panels */

function SplitPanel({
  pct,
  title,
  blurb,
  variant,
  delay,
}: {
  pct: number;
  title: string;
  blurb: string;
  variant: "grow" | "burn";
  delay: number;
}) {
  const isGrow = variant === "grow";

  const frameGradient = isGrow
    ? "linear-gradient(150deg, #07140d 0%, #0a2a1a 45%, #06170f 78%, #0a2417 100%)"
    : "linear-gradient(150deg, #1a1206 0%, #2e2008 42%, #170f04 75%, #2a1408 100%)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay }}
      className={`group relative overflow-hidden rounded-2xl border p-6 sm:p-8 ${
        isGrow
          ? "border-pitch/45 ring-1 ring-pitch/20 glow-common"
          : "border-gold/55 ring-1 ring-gold/25 glow-gold"
      }`}
      style={{ backgroundImage: frameGradient }}
    >
      {/* foil + glare */}
      <div
        className={`pointer-events-none absolute inset-0 opacity-40 ${
          isGrow ? "holo-silver" : "holo-gold"
        }`}
      />
      <div className="card-glare pointer-events-none absolute inset-0" />

      {/* corner icon motif */}
      <div className="relative flex items-start justify-between">
        <div>
          <p
            className={`font-mono text-[11px] uppercase tracking-[0.3em] ${
              isGrow ? "text-pitch" : "text-gold"
            }`}
          >
            {isGrow ? "Engine 01" : "Engine 02"}
          </p>
          <div className="mt-1 flex items-end gap-2">
            <span
              className={`font-display text-7xl leading-none tracking-mega sm:text-8xl ${
                isGrow ? "text-pitch" : "text-gold"
              } ${isGrow ? "" : "text-glow-gold"}`}
            >
              {pct}%
            </span>
          </div>
        </div>

        {/* icon glyph */}
        <span
          aria-hidden
          className={`grid h-14 w-14 shrink-0 place-items-center rounded-xl border text-2xl ${
            isGrow
              ? "border-pitch/40 bg-pitch/10 text-pitch animate-float"
              : "border-gold/40 bg-crimson/10 text-crimson animate-pulse-glow"
          }`}
        >
          {isGrow ? "▲" : "🔥"}
        </span>
      </div>

      <h3 className="relative mt-5 font-display text-2xl tracking-mega text-white sm:text-3xl">
        {title}
      </h3>
      <p className="relative mt-3 text-sm leading-relaxed text-white/65">
        {blurb}
      </p>

      {/* per-panel mini bar */}
      <div className="relative mt-6 h-1.5 w-full overflow-hidden rounded-full bg-white/8">
        <motion.div
          initial={{ width: "0%" }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: "easeOut", delay: delay + 0.1 }}
          className={`h-full rounded-full ${
            isGrow
              ? "bg-gradient-to-r from-pitch-deep to-pitch"
              : "bg-gradient-to-r from-gold via-gold-deep to-crimson"
          }`}
        />
      </div>
    </motion.div>
  );
}

/* ----------------------------------------------------------- flow elements */

function FlowChip({
  children,
  accent = "default",
}: {
  children: React.ReactNode;
  accent?: "default" | "pitch" | "gold" | "strong";
}) {
  const styles: Record<string, string> = {
    default: "border-line bg-surface text-white/80",
    pitch: "border-pitch/40 bg-pitch/10 text-pitch",
    gold: "border-gold/40 bg-gold/10 text-gold",
    strong:
      "border-gold/60 bg-gradient-to-r from-gold/20 to-crimson/15 text-white",
  };
  return (
    <span
      className={`flex items-center justify-center rounded-full border px-4 py-2 text-center font-mono text-xs font-semibold uppercase tracking-wider ${styles[accent]}`}
    >
      {children}
    </span>
  );
}

function FlowArrow() {
  return (
    <span
      aria-hidden
      className="self-center text-center font-display text-lg text-gold/60"
    >
      <span className="hidden sm:inline">→</span>
      <span className="inline sm:hidden">↓</span>
    </span>
  );
}
