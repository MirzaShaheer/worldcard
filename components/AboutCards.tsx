"use client";

import { motion } from "motion/react";
import { ABOUT_CARDS, SITE } from "@/lib/config";

/**
 * "About the Cards" — a plain-language section that explains what a World Card
 * actually is (content: one holo card per nation, carrying its captain,
 * win-odds, and rarity) and why you'd collect it (use case: hold $WORLDCARD,
 * chase the set, ride the buyback & burn). Shared section shell + a four-tile
 * feature grid in the same style as "How to Buy".
 */
export function AboutCards() {
  return (
    <section id="about" className="relative py-20 sm:py-28">
      {/* atmosphere */}
      <div className="pointer-events-none absolute inset-0 stadium-glow opacity-50" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
        {/* heading block */}
        <div className="mb-12 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold/80">
            What You&apos;re Collecting
          </p>
          <h2 className="mt-2 font-display text-4xl tracking-mega text-white sm:text-5xl">
            ONE NATION.{" "}
            <span className="text-gold text-glow-gold">ONE CARD.</span>
          </h2>
          <div className="gold-rule mx-auto mt-4 w-24" />
          <p className="mx-auto mt-5 max-w-2xl text-sm text-white/65 sm:text-base">
            {ABOUT_CARDS.lead}
          </p>
        </div>

        {/* feature grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ABOUT_CARDS.features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative flex h-full flex-col rounded-2xl border border-line bg-surface/60 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/40 hover:glow-gold"
            >
              <span
                aria-hidden
                className="grid h-12 w-12 place-items-center rounded-xl border border-gold/40 bg-gold/10 text-2xl"
              >
                {feature.icon}
              </span>
              <div className="gold-rule mt-4 w-10 transition-all duration-300 group-hover:w-16" />
              <h3 className="mt-4 font-display text-lg leading-tight tracking-mega text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                {feature.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* meme-collectible clarifier */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-10 max-w-3xl text-center font-mono text-xs leading-relaxed tracking-wider text-white/45"
        >
          {SITE.ticker} cards are digital meme collectibles made for the love of
          the game — no tickets, no real-world value, just the whole world in one
          pack.
        </motion.p>
      </div>
    </section>
  );
}
