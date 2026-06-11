"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { SITE, TOKEN } from "@/lib/config";
import { TEAMS } from "@/lib/teams";
import { TradingCard } from "@/components/TradingCard";

/**
 * The landing hero — World Cup × Pokémon TCG mashup for $WORLDCARD.
 * Left: brand copy + CTAs. Right: a fanned stack of the 3 highest-odds
 * (= top-rarity) holo trading cards as the visual centerpiece. Layered
 * atmosphere via hex-bg base, stadium glow and floating color blobs.
 */

// Pick the 3 top favorites (highest "% favor to win") for the featured fan.
const FEATURED = [...TEAMS].sort((a, b) => b.oddsPct - a.oddsPct).slice(0, 3);

// Per-card placement for the overlapping fan (desktop).
const FAN = [
  { rotate: -14, x: -132, y: 30, z: 10 },
  { rotate: 0, x: 0, y: -8, z: 30 },
  { rotate: 14, x: 132, y: 30, z: 20 },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Hero() {
  const [logoShown, setLogoShown] = useState(true);

  return (
    <section
      id="home"
      className="hex-bg relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden"
    >
      {/* ===== layered atmosphere ===== */}
      <div className="stadium-glow pointer-events-none absolute inset-0" />
      <div className="pitch-lines pointer-events-none absolute inset-0 opacity-40" />
      {/* softly floating blurred color blobs */}
      <div
        aria-hidden
        className="animate-float pointer-events-none absolute -left-24 top-12 h-72 w-72 rounded-full bg-electric/20 blur-3xl"
      />
      <div
        aria-hidden
        className="animate-float pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-gold/15 blur-3xl"
        style={{ animationDelay: "-2.5s" }}
      />
      <div
        aria-hidden
        className="animate-float pointer-events-none absolute right-1/4 top-1/3 h-64 w-64 rounded-full bg-pitch/15 blur-3xl"
        style={{ animationDelay: "-4s" }}
      />
      {/* base + bottom fade into page */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-night" />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:py-24">
        {/* ============================= LEFT ============================= */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="relative text-center lg:text-left"
        >
          {/* eyebrow + brand badge */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-3 lg:justify-start"
          >
            {logoShown && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="/logo.png"
                alt={`${SITE.name} logo`}
                onError={() => setLogoShown(false)}
                className="glow-gold h-9 w-9 rounded-full border border-gold/40 object-cover"
              />
            )}
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold/80">
              World Cup × Pokémon
            </p>
          </motion.div>

          {/* headline */}
          <motion.h1
            variants={itemVariants}
            className="mt-5 font-display text-5xl leading-[0.95] tracking-mega text-white sm:text-6xl lg:text-7xl"
          >
            {SITE.name}
            <span className="mt-1 block text-3xl text-white/85 sm:text-4xl lg:text-5xl">
              COLLECT THE{" "}
              <span className="text-glow-gold text-gold">WORLD.</span>
            </span>
          </motion.h1>

          {/* subheading */}
          <motion.p
            variants={itemVariants}
            className="mx-auto mt-5 max-w-xl text-base text-white/70 sm:text-lg lg:mx-0"
          >
            {SITE.tagline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
          >
            <a
              href={TOKEN.buyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glow-gold inline-flex items-center justify-center rounded-full bg-gradient-to-r from-gold-deep via-gold to-gold px-7 py-3 font-display text-lg tracking-mega text-night transition-transform duration-200 hover:scale-[1.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              Buy {SITE.ticker}
            </a>
            <Link
              href="/cards"
              className="inline-flex items-center justify-center rounded-full border border-gold/50 bg-white/5 px-7 py-3 font-display text-lg tracking-mega text-white backdrop-blur transition-colors duration-200 hover:border-gold hover:bg-gold/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              View All 48 Cards
            </Link>
          </motion.div>

          {/* trust row */}
          <motion.div
            variants={itemVariants}
            className="mt-7 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-mono text-xs uppercase tracking-wider text-white/55 lg:justify-start"
          >
            <span className="text-white/80">48 Nations</span>
            <span aria-hidden className="text-gold/60">
              •
            </span>
            <span className="text-white/80">4 Rarities</span>
            <span aria-hidden className="text-gold/60">
              •
            </span>
            <span className="text-white/80">50% Buyback &amp; Burn</span>
          </motion.div>
        </motion.div>

        {/* ============================= RIGHT ============================= */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="relative"
        >
          {/* glow halo behind the fan */}
          <div
            aria-hidden
            className="animate-pulse-glow pointer-events-none absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-3xl"
          />

          {/* ---- desktop / tablet: overlapping fan ---- */}
          <div className="relative mx-auto hidden h-[30rem] w-full max-w-md items-center justify-center sm:flex">
            {FEATURED.map((team, i) => {
              const place = FAN[i];
              return (
                // OUTER: static fan placement only (translateX + rotate + stacking)
                <div
                  key={team.code}
                  className="absolute"
                  style={{
                    zIndex: place.z,
                    transform: `translateX(${place.x}px) rotate(${place.rotate}deg)`,
                  }}
                >
                  {/* MIDDLE: entrance animation only (opacity + y) */}
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.55,
                      ease: [0.22, 1, 0.36, 1] as const,
                      delay: 0.05 + i * 0.12,
                    }}
                  >
                    {/* INNER: gentle float (translateY only) */}
                    <div
                      className="animate-float"
                      style={{ animationDelay: `${i * -1.6}s` }}
                    >
                      <div className="w-[200px]">
                        <TradingCard
                          team={team}
                          index={i}
                          total={TEAMS.length}
                        />
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* ---- mobile: simple stacked row ---- */}
          <div className="no-scrollbar -mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-4 sm:hidden">
            {FEATURED.map((team, i) => (
              <motion.div
                key={team.code}
                variants={itemVariants}
                className="w-40 flex-none snap-center"
              >
                <TradingCard team={team} index={i} total={TEAMS.length} />
              </motion.div>
            ))}
          </div>

          {/* hover hint */}
          <motion.p
            variants={itemVariants}
            className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.25em] text-white/60"
          >
            Tap or hover to flip the foil
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
