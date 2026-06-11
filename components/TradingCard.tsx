"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Team } from "@/lib/teams";
import { tierFor, tierStyle } from "@/lib/tiers";
import { RarityBadge, RarityStars } from "@/components/Rarity";

/**
 * The World Card centerpiece: a holographic, flippable trading card.
 * Front shows team identity + "% favor to win"; back reveals full stats.
 * Flips on hover (desktop) and on tap (mobile). Rarity tier (derived from
 * the team's win odds) drives the frame, foil overlay and glow.
 */
export function TradingCard({
  team,
  index,
  total,
}: {
  team: Team;
  index?: number;
  total?: number;
}) {
  const [flipped, setFlipped] = useState(false);
  const [flagBroken, setFlagBroken] = useState(false);
  const tier = tierFor(team.oddsPct);
  const s = tierStyle(tier);
  const flagUrl = `https://flagcdn.com/${team.code}.svg`;

  // Gauge fill for "% favor to win" (top favorite ≈ 12.5%, so scale to 14).
  const gaugePct = Math.min(Math.round((team.oddsPct / 14) * 100), 100);

  return (
    <div className="perspective-1200 group h-full w-full select-none">
      <motion.div
        className="preserve-3d relative h-full w-full cursor-pointer focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        style={{ aspectRatio: "5 / 7" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
        onHoverStart={() => setFlipped(true)}
        onHoverEnd={() => setFlipped(false)}
        onTap={() => setFlipped((f) => !f)}
        role="button"
        tabIndex={0}
        aria-pressed={flipped}
        aria-label={`${team.name} card — press to flip for stats`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            if (e.key === " ") e.preventDefault();
            setFlipped((f) => !f);
          }
        }}
      >
        {/* ===== FRONT ===== */}
        <div
          className={`backface-hidden absolute inset-0 overflow-hidden rounded-2xl border ${s.borderClass} ${s.glowClass}`}
          style={{ backgroundImage: s.frameGradient }}
        >
          {/* foil + glare overlays */}
          {s.foilClass && (
            <div className={`pointer-events-none absolute inset-0 ${s.foilClass}`} />
          )}
          <div className="card-glare pointer-events-none absolute inset-0" />

          <div className="relative flex h-full flex-col p-3">
            {/* top bar */}
            <div className="flex items-center justify-between">
              <RarityBadge tier={tier} />
              <span className="font-mono text-[10px] uppercase tracking-wider text-white/55">
                {team.confederation}
              </span>
            </div>

            {/* flag art window */}
            <div
              className="relative mt-2 flex-1 overflow-hidden rounded-lg border border-white/10"
              style={{
                background:
                  "radial-gradient(120% 80% at 50% 0%, rgba(255,255,255,0.10), transparent 60%), #05070f",
              }}
            >
              {flagBroken ? (
                <div className="absolute inset-0 grid place-items-center text-white/70">
                  <span className="font-display text-2xl tracking-mega">
                    {team.code.toUpperCase()}
                  </span>
                </div>
              ) : (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={flagUrl}
                  alt={`${team.name} flag`}
                  loading="lazy"
                  onError={() => setFlagBroken(true)}
                  className="absolute inset-0 h-full w-full object-cover opacity-95"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-1.5 left-2 flex items-center gap-1">
                {Array.from({ length: team.worldCupsWon }).map((_, i) => (
                  <span key={i} className="text-sm text-gold drop-shadow" aria-hidden>
                    🏆
                  </span>
                ))}
              </div>
            </div>

            {/* identity */}
            <div className="mt-2">
              <h3 className="font-display text-xl leading-none tracking-mega text-white">
                {team.name}
              </h3>
              <p className="mt-1 truncate text-[11px] text-white/60">
                <span
                  aria-hidden
                  className="mr-1 inline-grid h-3.5 w-3.5 place-items-center rounded-full border border-gold/50 text-[7px] font-bold text-gold"
                >
                  C
                </span>
                {team.captain}
              </p>
            </div>

            {/* stat footer: gauge + cups */}
            <div className="mt-2 flex items-end justify-between">
              <div className="flex flex-col">
                <span className="font-mono text-[9px] uppercase tracking-wider text-white/45">
                  Cups Won
                </span>
                <span className="font-display text-lg leading-none text-gold">
                  {team.worldCupsWon}
                </span>
              </div>

              {/* radial gauge for % favor */}
              <div
                className="relative grid h-12 w-12 place-items-center rounded-full"
                style={{
                  background: `conic-gradient(${s.accent} ${gaugePct}%, rgba(255,255,255,0.08) 0)`,
                }}
              >
                <div className="grid h-9 w-9 place-items-center rounded-full bg-[#05070f]">
                  <span
                    className="font-mono text-[11px] font-bold leading-none"
                    style={{ color: s.accent }}
                  >
                    {team.oddsPct}%
                  </span>
                </div>
              </div>
            </div>

            <RarityStars tier={tier} className="mt-2 self-center" />
          </div>
        </div>

        {/* ===== BACK ===== */}
        <div
          className={`backface-hidden rotate-y-180 absolute inset-0 overflow-hidden rounded-2xl border ${s.borderClass} ${s.glowClass}`}
          style={{ backgroundImage: s.frameGradient }}
        >
          {s.foilClass && (
            <div className={`pointer-events-none absolute inset-0 opacity-60 ${s.foilClass}`} />
          )}
          <div className="relative flex h-full flex-col p-3">
            <div className="flex items-center justify-between">
              <RarityBadge tier={tier} />
              <RarityStars tier={tier} />
            </div>

            <h3 className="mt-3 font-display text-2xl tracking-mega text-white">
              {team.name}
            </h3>
            {team.nickname && (
              <p className="truncate text-xs italic text-white/55">“{team.nickname}”</p>
            )}

            <div className="mt-4 space-y-1 font-mono text-[11px]">
              <StatRow label="Captain" value={team.captain} />
              <StatRow label="World Cups" value={`${team.worldCupsWon} 🏆`} />
              <StatRow label="Favor to Win" value={`${team.oddsPct}%`} accent={s.accent} />
              <StatRow label="Confederation" value={team.confederation} />
              <StatRow label="Rarity" value={s.label} accent={s.accent} />
            </div>

            <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-2">
              <span className="font-display text-xs tracking-mega text-gold/80">
                WORLD CARD
              </span>
              <span className="font-mono text-[10px] text-white/45">
                {index != null ? `#${String(index + 1).padStart(2, "0")}` : ""}
                {total ? ` / ${total}` : ""}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function StatRow({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: string;
}) {
  return (
    <div className="flex min-w-0 items-center justify-between gap-2 border-b border-white/5 pb-0.5">
      <span className="shrink-0 uppercase tracking-wider text-white/45">{label}</span>
      <span
        className="min-w-0 truncate font-semibold text-white"
        style={accent ? { color: accent } : undefined}
      >
        {value}
      </span>
    </div>
  );
}
