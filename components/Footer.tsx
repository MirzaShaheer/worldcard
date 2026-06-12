"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { SITE, TOKEN, SOCIALS } from "@/lib/config";

/**
 * Site footer for World Card.
 * Left rail: wordmark + tagline + Buy CTA. Center/right: copy-able contract
 * address row and a row of labeled social pill buttons. A bottom bar carries
 * the copyright and the meme disclaimer.
 */
export function Footer() {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">(
    "idle",
  );
  const address = TOKEN.contractAddress;
  const hasAddress = address.length > 0;

  /** Last-resort copy when the async Clipboard API is unavailable. */
  function legacyCopy(text: string): boolean {
    try {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      // keep it out of view and out of layout flow
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.top = "0";
      textarea.style.left = "0";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(textarea);
      return ok;
    } catch {
      return false;
    }
  }

  async function handleCopy() {
    if (!hasAddress) return;

    const flash = (state: "copied" | "failed") => {
      setCopyState(state);
      window.setTimeout(() => setCopyState("idle"), 1600);
    };

    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(address);
        flash("copied");
        return;
      }
      // No async Clipboard API (insecure context / older browser) — fall back.
      flash(legacyCopy(address) ? "copied" : "failed");
    } catch {
      // Async copy threw (permissions, insecure context) — try the fallback.
      flash(legacyCopy(address) ? "copied" : "failed");
    }
  }

  const socials: { label: string; href: string; glyph: string }[] = [
    { label: "Twitter/X", href: SOCIALS.twitter, glyph: "𝕏" },
    { label: "Dexscreener", href: SOCIALS.dexscreener, glyph: "📈" },
    { label: "pump.fun", href: SOCIALS.pumpfun, glyph: "🚀" },
  ];

  return (
    <footer className="relative border-t border-line bg-night-2">
      {/* subtle atmosphere wash */}
      <div className="hex-bg pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div className="stadium-glow pointer-events-none absolute inset-0 opacity-60" aria-hidden />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]"
        >
          {/* ===== Left: brand ===== */}
          <div className="flex flex-col items-start">
            <Link href="/" className="font-display text-3xl tracking-mega sm:text-4xl">
              <span className="text-gold text-glow-gold">WORLD</span>
              <span className="text-white">CARD</span>
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60">
              {SITE.tagline}
            </p>

            <a
              href={TOKEN.buyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glow-gold mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-gold to-gold-deep px-6 py-2.5 font-display text-sm tracking-mega text-night transition-transform hover:scale-[1.03] active:scale-95"
            >
              <span aria-hidden>⚡</span>
              BUY {SITE.ticker}
            </a>
          </div>

          {/* ===== Right: contract + socials ===== */}
          <div className="flex flex-col gap-8">
            {/* contract address row */}
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold/80">
                Contract
              </p>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-stretch">
                <div className="flex min-w-0 flex-1 items-center rounded-lg border border-line bg-surface px-3 py-2.5">
                  <code
                    className={`min-w-0 flex-1 truncate font-mono text-xs sm:text-sm ${
                      hasAddress ? "text-electric" : "text-white/45"
                    }`}
                    title={hasAddress ? address : undefined}
                  >
                    {hasAddress
                      ? address
                      : "Live at launch — address dropping soon"}
                  </code>
                </div>
                <button
                  type="button"
                  onClick={handleCopy}
                  disabled={!hasAddress}
                  aria-label="Copy contract address"
                  className={`shrink-0 rounded-lg border px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider transition-colors ${
                    hasAddress
                      ? "border-gold/50 bg-gold/10 text-gold hover:bg-gold/20"
                      : "cursor-not-allowed border-line bg-surface text-white/30"
                  }`}
                >
                  {copyState === "copied"
                    ? "Copied!"
                    : copyState === "failed"
                      ? "Press Ctrl+C"
                      : "Copy"}
                </button>
              </div>
            </div>

            {/* socials row */}
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold/80">
                Join the Squad
              </p>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:border-gold/50 hover:bg-surface-2 hover:text-white"
                  >
                    <span aria-hidden>{s.glyph}</span>
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* divider */}
        <div className="gold-rule mt-14 w-full opacity-70" />

        {/* ===== Bottom bar ===== */}
        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <p className="font-mono text-xs text-white/50">
            © 2026 World Card
          </p>
          <p className="max-w-3xl text-xs leading-relaxed text-white/60 md:text-right">
            {SITE.ticker} is a meme collectible with no intrinsic value or
            expectation of financial return. DYOR. Not affiliated with FIFA, the
            World Cup, or Pokémon.
          </p>
        </div>
      </div>
    </footer>
  );
}
