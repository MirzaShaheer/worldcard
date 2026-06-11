"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { SITE, TOKEN, NAV_LINKS } from "@/lib/config";

/**
 * Sticky, glass-blurred top navigation for World Card.
 * - Translucent night background that gains opacity once the page is scrolled.
 * - Typographic gold/white wordmark with a ◆ gem and a $WORLDCARD mono tag.
 * - Desktop: inline nav links + a gold "Buy" CTA.
 * - Mobile: hamburger toggling an animated full-width dropdown panel.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Track scroll position to deepen the navbar background as the user scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile dropdown when the user presses Escape.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header
      className={`sticky inset-x-0 top-0 z-50 border-b backdrop-blur-xl transition-colors duration-300 ${
        scrolled
          ? "border-line bg-night/85 shadow-[0_8px_30px_rgba(0,0,0,0.45)]"
          : "border-line/60 bg-night/55"
      }`}
    >
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:h-18 sm:px-6">
        {/* ===== Wordmark ===== */}
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="group flex items-center gap-2.5"
          aria-label={`${SITE.name} home`}
        >
          <span
            className="grid h-9 w-9 place-items-center rounded-full border border-gold/40 bg-surface/70 text-gold transition-transform duration-300 group-hover:rotate-180 glow-gold"
            aria-hidden
          >
            <span className="text-base leading-none text-glow-gold">◆</span>
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-xl tracking-mega sm:text-2xl">
              <span className="text-gold text-glow-gold">WORLD</span>
              <span className="text-white">CARD</span>
            </span>
            <span className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.3em] text-gold/70">
              {SITE.ticker}
            </span>
          </span>
        </Link>

        {/* ===== Desktop nav links ===== */}
        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative rounded-full px-3.5 py-2 font-mono text-xs uppercase tracking-[0.18em] text-white/70 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              <span className="relative z-10">{link.label}</span>
              <span className="absolute inset-x-3 -bottom-px h-px origin-center scale-x-0 bg-gradient-to-r from-transparent via-gold to-transparent transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100" />
            </Link>
          ))}
        </div>

        {/* ===== Right cluster: CTA + mobile toggle ===== */}
        <div className="flex items-center gap-2">
          <a
            href={TOKEN.buyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="glow-gold hidden rounded-full bg-gradient-to-r from-gold-deep via-gold to-gold px-5 py-2.5 font-display text-sm tracking-mega text-night transition-all duration-300 hover:scale-[1.04] hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:inline-block"
          >
            Buy {SITE.ticker}
          </a>

          {/* mobile hamburger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface/60 text-white transition-colors hover:border-gold/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold lg:hidden"
          >
            <span className="relative block h-4 w-5" aria-hidden>
              <span
                className={`absolute left-0 block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* ===== Mobile dropdown panel ===== */}
      <AnimatePresence>
        {open && (
          <>
            {/* click-outside overlay: tapping anywhere outside the panel closes it */}
            <div
              className="fixed inset-0 z-40 lg:hidden"
              aria-hidden
              onClick={() => setOpen(false)}
            />
            <motion.nav
              key="mobile-panel"
              aria-label="Mobile"
              role="dialog"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
              className="relative z-50 overflow-hidden border-t border-line bg-night/95 backdrop-blur-xl lg:hidden"
            >
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: 0.04 * i }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-xl border border-transparent px-4 py-3 font-mono text-sm uppercase tracking-[0.18em] text-white/80 transition-colors hover:border-line hover:bg-surface/60 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                  >
                    <span>{link.label}</span>
                    <span className="text-gold/60" aria-hidden>
                      ◆
                    </span>
                  </Link>
                </motion.div>
              ))}

              <a
                href={TOKEN.buyUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="glow-gold mt-2 rounded-full bg-gradient-to-r from-gold-deep via-gold to-gold px-5 py-3 text-center font-display text-base tracking-mega text-night transition-all duration-300 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                Buy {SITE.ticker}
              </a>
            </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
