"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { TEAMS, Team } from "@/lib/teams";
import { tierFor, tierStyle, TIER_ORDER, Tier } from "@/lib/tiers";
import { TradingCard } from "@/components/TradingCard";
import { RarityBadge } from "@/components/Rarity";

/**
 * CardGallery — the full $WORLDCARD collection grid.
 *
 * Renders every nation as a flippable TradingCard, sorted by win-odds so the
 * Legendaries lead. Optional rarity + text filters narrow the pack, with a
 * live count. Can render standalone (with the shared section shell heading)
 * or be embedded headless on another page.
 */
export function CardGallery({
  teams = TEAMS,
  showFilters = true,
  showHeading = true,
  limit,
}: {
  teams?: Team[];
  showFilters?: boolean;
  showHeading?: boolean;
  limit?: number;
}) {
  const [activeTier, setActiveTier] = useState<Tier | "All">("All");
  const [query, setQuery] = useState("");

  // Full source set, sorted by odds (favorites / Legendaries first).
  const sorted = useMemo(
    () => [...teams].sort((a, b) => b.oddsPct - a.oddsPct),
    [teams],
  );

  const total = sorted.length;

  // Apply rarity + search filters, then the optional limit.
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = sorted.filter((team) => {
      const tierOk = activeTier === "All" || tierFor(team.oddsPct) === activeTier;
      const textOk =
        q === "" ||
        team.name.toLowerCase().includes(q) ||
        team.captain.toLowerCase().includes(q);
      return tierOk && textOk;
    });
    if (typeof limit === "number") list = list.slice(0, limit);
    return list;
  }, [sorted, activeTier, query, limit]);

  const shown = filtered.length;
  const capped = typeof limit === "number" ? Math.min(limit, total) : total;

  const content = (
    <>
      {showFilters && (
        <div className="mb-10 flex flex-col gap-5">
          {/* rarity filter row */}
          <div className="no-scrollbar -mx-4 flex items-center gap-2 overflow-x-auto px-4 pb-1 sm:flex-wrap sm:justify-center sm:overflow-visible">
            <TierButton
              label="All"
              active={activeTier === "All"}
              onClick={() => setActiveTier("All")}
            />
            {TIER_ORDER.map((tier) => {
              const s = tierStyle(tier);
              const active = activeTier === tier;
              return (
                <button
                  key={tier}
                  type="button"
                  onClick={() => setActiveTier(tier)}
                  className={`shrink-0 rounded-full border px-4 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wider transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
                    active
                      ? "text-black/85"
                      : "border-line bg-surface/60 text-white/60 hover:text-white"
                  }`}
                  style={
                    active
                      ? {
                          backgroundImage: s.badgeGradient,
                          borderColor: s.accent,
                          boxShadow: `0 0 16px ${s.accent}55`,
                        }
                      : undefined
                  }
                >
                  {s.label}
                </button>
              );
            })}
          </div>

          {/* search + live count */}
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
            <label className="relative w-full sm:max-w-xs">
              <span className="sr-only">Search by team or captain</span>
              <span
                aria-hidden
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-white/35"
              >
                ⚲
              </span>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search team or captain…"
                className="w-full rounded-full border border-line bg-surface/60 py-2 pl-9 pr-4 text-sm text-white placeholder:text-white/35 outline-none transition-colors focus:border-gold/60 focus:bg-surface focus-visible:ring-2 focus-visible:ring-gold/60"
              />
            </label>
            <p className="font-mono text-xs uppercase tracking-wider text-white/45">
              Showing{" "}
              <span className="text-gold">{shown}</span> of{" "}
              <span className="text-white/70">{capped}</span>
            </p>
          </div>
        </div>
      )}

      {/* grid */}
      {shown > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {filtered.map((team, i) => (
            <motion.div
              key={team.code}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: Math.min(i, 11) * 0.04 }}
              className="h-full"
            >
              <TradingCard team={team} index={i} total={shown} />
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-md rounded-2xl border border-line bg-surface/50 px-6 py-14 text-center"
        >
          <p className="font-display text-2xl tracking-mega text-white">
            NO CARDS IN THE PACK
          </p>
          <p className="mt-2 text-sm text-white/55">
            No nations match{activeTier !== "All" ? " this rarity" : ""}
            {query.trim() ? ` and "${query.trim()}"` : ""}. Try another search.
          </p>
          <div className="mt-5 flex items-center justify-center gap-2">
            {activeTier !== "All" && <RarityBadge tier={activeTier} />}
            <button
              type="button"
              onClick={() => {
                setActiveTier("All");
                setQuery("");
              }}
              className="rounded-full border border-gold/50 px-4 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-gold transition-colors hover:bg-gold/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              Reset filters
            </button>
          </div>
        </motion.div>
      )}
    </>
  );

  if (!showHeading) {
    return (
      <div id="cards" className="relative">
        {content}
      </div>
    );
  }

  return (
    <section id="cards" className="relative py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold/80">
            THE COLLECTION
          </p>
          <h2 className="mt-2 font-display text-4xl tracking-mega text-white sm:text-5xl">
            ALL 48 NATIONS
          </h2>
          <div className="gold-rule mx-auto mt-4 w-24" />
        </motion.div>
        {content}
      </div>
    </section>
  );
}

function TierButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 rounded-full border px-4 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wider transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
        active
          ? "border-gold bg-gold text-black/85 shadow-[0_0_16px_rgba(255,210,74,0.4)]"
          : "border-line bg-surface/60 text-white/60 hover:text-white"
      }`}
    >
      {label}
    </button>
  );
}
