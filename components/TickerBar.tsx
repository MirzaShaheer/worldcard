"use client";

import { useTokenData, type TokenStats } from "@/lib/useTokenData";
import { SITE, TOKEN } from "@/lib/config";

/**
 * TickerBar — a slim, full-width stat strip mounted under the navbar.
 *
 * Live state  : real Dexscreener numbers (price / market cap / 24h volume /
 *               24h change) rendered as mono stat chips with a pulsing LIVE dot.
 * Pre-launch  : a seamless marquee teaser ("LIVE AT LAUNCH • 48 NATIONS • ...").
 *
 * One line tall, elegant, transform/opacity-only animation.
 */
export function TickerBar() {
  const { isLive, stats } = useTokenData();

  return (
    <div className="w-full border-y border-line bg-surface/60 backdrop-blur-sm">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        {isLive && stats ? (
          <LiveStrip stats={stats} />
        ) : (
          <TeaserStrip />
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ live --- */

function LiveStrip({ stats }: { stats: TokenStats }) {
  const change = Number(stats.priceChange24h ?? 0);
  const up = change >= 0;

  return (
    <div
      aria-live="polite"
      className="no-scrollbar flex h-10 items-center gap-5 overflow-x-auto whitespace-nowrap sm:gap-7"
    >
      {/* live indicator */}
      <span className="flex shrink-0 items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-2 w-2 animate-pulse-glow rounded-full bg-pitch" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-pitch" />
        </span>
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-pitch">
          Live
        </span>
      </span>

      <Stat label="Price" value={stats.priceUsd} />
      <Stat label="Mkt Cap" value={stats.marketCap} />
      <Stat label="24h Vol" value={stats.volume24h} />

      {/* 24h change chip */}
      <span className="flex shrink-0 items-center gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
          24h
        </span>
        <span
          className={`font-mono text-xs font-semibold ${
            up ? "text-pitch" : "text-crimson"
          }`}
        >
          {up ? "▲" : "▼"} {Math.abs(change).toFixed(2)}%
        </span>
      </span>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <span className="flex shrink-0 items-center gap-2">
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
        {label}
      </span>
      <span className="font-mono text-xs font-semibold text-white">{value}</span>
    </span>
  );
}

/* --------------------------------------------------------------- pre-launch */

function TeaserStrip() {
  const items = [
    `${SITE.ticker} — LIVE AT LAUNCH`,
    "48 NATIONS",
    `${TOKEN.launchpad.toUpperCase()} LAUNCH`,
    "50% BUYBACK & BURN",
    "HOLOGRAPHIC TEAM CARDS",
  ];

  const segment = (
    <span className="flex shrink-0 items-center" aria-hidden>
      {items.map((label, i) => (
        <span key={i} className="flex items-center">
          <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/70">
            {label}
          </span>
          <span className="mx-5 text-gold/70">•</span>
        </span>
      ))}
    </span>
  );

  return (
    <div className="relative flex h-10 items-center overflow-hidden">
      {/* edge fades for a polished, non-noisy loop */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-surface to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-surface to-transparent" />

      <div className="flex w-max animate-marquee items-center">
        {segment}
        {segment}
      </div>

      {/* screen-reader-only readable copy (the animated copies are aria-hidden) */}
      <span className="sr-only">{items.join(" • ")}</span>
    </div>
  );
}
