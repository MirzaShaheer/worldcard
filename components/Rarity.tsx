import { Tier, tierStyle } from "@/lib/tiers";

/** Gradient rarity pill, e.g. ✦ LEGENDARY. Pure presentational (no state). */
export function RarityBadge({
  tier,
  className = "",
}: {
  tier: Tier;
  className?: string;
}) {
  const s = tierStyle(tier);
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-black/85 shadow-sm ${className}`}
      style={{ backgroundImage: s.badgeGradient }}
    >
      <span aria-hidden>✦</span>
      {s.label}
    </span>
  );
}

/** Row of rarity stars (4 = Legendary … 1 = Common). */
export function RarityStars({
  tier,
  className = "",
}: {
  tier: Tier;
  className?: string;
}) {
  const s = tierStyle(tier);
  return (
    <span
      className={`inline-flex gap-0.5 ${className}`}
      style={{ color: s.accent }}
      aria-label={`${s.stars} star rarity`}
    >
      {Array.from({ length: 4 }).map((_, i) => (
        <span
          key={i}
          aria-hidden
          className="text-xs leading-none drop-shadow"
          style={{ opacity: i < s.stars ? 1 : 0.18 }}
        >
          ★
        </span>
      ))}
    </span>
  );
}
