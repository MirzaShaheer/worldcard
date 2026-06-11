"use client";

/* =========================================================================
   WORLD CARD — live token data hook
   Pulls the best Dexscreener pair for $WORLDCARD and exposes formatted,
   display-ready stats. Pre-launch (empty contract address) it never fetches
   and reports a graceful "Live at launch" state. Polls every 30s.
   ========================================================================= */

import { useEffect, useState } from "react";
import { TOKEN } from "@/lib/config";

export type TokenStats = {
  priceUsd: string;
  marketCap: string;
  volume24h: string;
  priceChange24h: number;
};

/** Format a USD price with extra precision for sub-dollar meme-coin values. */
function formatUsd(value: number): string {
  if (!Number.isFinite(value) || value <= 0) return "$0.00";
  if (value >= 1) {
    return `$${value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }
  // Small price: show up to 6 significant decimals (e.g. $0.0004231).
  return `$${value.toLocaleString("en-US", {
    minimumFractionDigits: 4,
    maximumFractionDigits: 8,
  })}`;
}

/** Compact USD formatting for big figures: $1.2M, $850K, $3.4B. */
function compact(value: number): string {
  if (!Number.isFinite(value) || value <= 0) return "$0";
  const abs = Math.abs(value);
  if (abs >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(2)}B`;
  if (abs >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`;
  if (abs >= 1_000) return `$${(value / 1_000).toFixed(1)}K`;
  return `$${Math.round(value).toLocaleString("en-US")}`;
}

/** Coerce a Dexscreener string/number field into a finite number (or 0). */
function num(v: unknown): number {
  const n = typeof v === "string" ? parseFloat(v) : typeof v === "number" ? v : NaN;
  return Number.isFinite(n) ? n : 0;
}

type DexPair = {
  priceUsd?: string | number;
  marketCap?: string | number;
  fdv?: string | number;
  liquidity?: { usd?: string | number };
  volume?: { h24?: string | number };
  priceChange?: { h24?: string | number };
};

const POLL_MS = 30_000;

export function useTokenData(): {
  stats: TokenStats | null;
  isLive: boolean;
  loading: boolean;
} {
  // Pre-launch: no contract address means no live market yet.
  const hasContract = TOKEN.contractAddress.length > 0;

  const [stats, setStats] = useState<TokenStats | null>(null);
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(hasContract);

  useEffect(() => {
    // Never fetch before launch.
    if (!hasContract) return;

    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(
          `${TOKEN.dexscreenerApi}${TOKEN.contractAddress}`,
          { headers: { accept: "application/json" } },
        );
        if (!res.ok) throw new Error(`Dexscreener responded ${res.status}`);

        const data: { pairs?: DexPair[] } = await res.json();
        const pairs = Array.isArray(data?.pairs) ? data.pairs : [];

        if (pairs.length === 0) {
          if (!cancelled) {
            setStats(null);
            setIsLive(false);
            setLoading(false);
          }
          return;
        }

        // Pick the deepest-liquidity pair as the canonical market.
        const pair = pairs.reduce((best, p) =>
          num(p.liquidity?.usd) > num(best.liquidity?.usd) ? p : best,
        );

        const mc = num(pair.marketCap);
        const fdv = num(pair.fdv);
        const next: TokenStats = {
          priceUsd: formatUsd(num(pair.priceUsd)),
          marketCap: compact(mc > 0 ? mc : fdv),
          volume24h: compact(num(pair.volume?.h24)),
          priceChange24h: num(pair.priceChange?.h24),
        };

        if (!cancelled) {
          setStats(next);
          setIsLive(true);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setStats(null);
          setIsLive(false);
          setLoading(false);
        }
        // Single, quiet warning — no console spam on every poll failure.
        console.warn("useTokenData: failed to load live token data", err);
      }
    }

    load();
    const id = setInterval(load, POLL_MS);

    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [hasContract]);

  return { stats, isLive, loading };
}
