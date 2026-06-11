"use client";

import { motion } from "motion/react";
import { HOW_TO_BUY, TOKEN, SITE } from "@/lib/config";

/**
 * "How to Buy" — a four-step, numbered onboarding flow themed as
 * World Cup × Pokémon TCG. Steps connect with a subtle gold line on
 * desktop and stagger in on scroll, capped by a glowing Buy CTA.
 */
export function HowToBuy() {
  return (
    <section id="how-to-buy" className="relative py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        {/* heading block */}
        <div className="mb-12 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold/80">
            GET IN THE GAME
          </p>
          <h2 className="mt-2 font-display text-4xl tracking-mega text-white sm:text-5xl">
            HOW TO BUY
          </h2>
          <div className="gold-rule mx-auto mt-4 w-24" />
        </div>

        {/* steps */}
        <div className="relative">
          {/* connecting line + arrow motif (desktop only) */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-[12%] top-7 hidden h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent md:block"
          />

          <div className="relative grid gap-4 md:grid-cols-4">
            {HOW_TO_BUY.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative"
              >
                {/* arrow connector between cards (desktop only) */}
                {i < HOW_TO_BUY.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute -right-3 top-7 z-10 hidden -translate-y-1/2 font-mono text-lg leading-none text-gold/50 md:block"
                  >
                    →
                  </span>
                )}

                <div className="group relative flex h-full flex-col rounded-2xl border border-line bg-surface/60 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/40 hover:glow-gold">
                  {/* step number */}
                  <div className="flex items-baseline justify-between">
                    <span className="font-display text-5xl leading-none tracking-mega text-gold text-glow-gold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/60">
                      Step
                    </span>
                  </div>

                  <div className="gold-rule mt-4 w-10 transition-all duration-300 group-hover:w-16" />

                  <h3 className="mt-4 font-display text-lg leading-tight tracking-mega text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    {step.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 flex justify-center"
        >
          <a
            href={TOKEN.buyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-gold to-gold-deep px-8 py-4 font-display text-lg uppercase tracking-mega text-night glow-gold transition-transform duration-300 hover:scale-[1.03]"
          >
            <span aria-hidden className="text-xl leading-none">⚽</span>
            Buy {SITE.ticker} on {TOKEN.launchpad}
            <span
              aria-hidden
              className="text-xl leading-none transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
