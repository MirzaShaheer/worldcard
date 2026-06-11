/* =========================================================================
   WORLD CARD — rarity tiers
   A team's Pokémon-style rarity is derived from its "% favor to win" the
   World Cup. `tierFor` is the single source of truth; `tierStyle` returns the
   full visual contract (gem, frame, foil, glow) reused by TradingCard.tsx,
   Rarity.tsx and the gallery grouping.
   ========================================================================= */

export type Tier = "Legendary" | "Epic" | "Rare" | "Common";

export const TIER_ORDER: Tier[] = ["Legendary", "Epic", "Rare", "Common"];

/** Map a team's win-odds (%) to a rarity tier. Top favorites = Legendary. */
export function tierFor(oddsPct: number): Tier {
  if (oddsPct >= 9) return "Legendary";
  if (oddsPct >= 4) return "Epic";
  if (oddsPct >= 1.5) return "Rare";
  return "Common";
}

export type TierStyle = {
  tier: Tier;
  label: string;
  /** Number of rarity stars shown on the card (4 = Legendary). */
  stars: number;
  /** Primary accent hex — used for gems, gauges and inline glows. */
  accent: string;
  /** Tailwind text-color utility (maps to @theme tier colors). */
  textClass: string;
  /** Frame border + ring utilities for the card edge. */
  borderClass: string;
  /** Box-shadow glow utility (defined in globals.css). */
  glowClass: string;
  /** Animated foil overlay class, or "" for Common (matte). */
  foilClass: string;
  /** CSS gradient for the card's frame fill. */
  frameGradient: string;
  /** CSS gradient for the rarity badge pill. */
  badgeGradient: string;
};

const STYLES: Record<Tier, TierStyle> = {
  Legendary: {
    tier: "Legendary",
    label: "Legendary",
    stars: 4,
    accent: "#ffcf4d",
    textClass: "text-legendary",
    borderClass: "border-legendary/70 ring-1 ring-legendary/40",
    glowClass: "glow-legendary",
    foilClass: "holo-rainbow",
    frameGradient:
      "linear-gradient(150deg, #2a2208 0%, #4a3a0c 35%, #1a1606 70%, #3a2e0a 100%)",
    badgeGradient: "linear-gradient(90deg, #ff7a18, #ffcf4d, #ff3d77, #38e1ff)",
  },
  Epic: {
    tier: "Epic",
    label: "Epic",
    stars: 3,
    accent: "#b06bff",
    textClass: "text-epic",
    borderClass: "border-epic/60 ring-1 ring-epic/30",
    glowClass: "glow-epic",
    foilClass: "holo-gold",
    frameGradient:
      "linear-gradient(150deg, #1e1330 0%, #2c1a4a 40%, #140d24 75%, #241640 100%)",
    badgeGradient: "linear-gradient(90deg, #7c3aed, #b06bff, #e0a8ff)",
  },
  Rare: {
    tier: "Rare",
    label: "Rare",
    stars: 2,
    accent: "#4ea8ff",
    textClass: "text-rare",
    borderClass: "border-rare/55 ring-1 ring-rare/25",
    glowClass: "glow-rare",
    foilClass: "holo-silver",
    frameGradient:
      "linear-gradient(150deg, #0c1730 0%, #122544 40%, #0a1126 75%, #102036 100%)",
    badgeGradient: "linear-gradient(90deg, #2563eb, #4ea8ff, #a8d6ff)",
  },
  Common: {
    tier: "Common",
    label: "Common",
    stars: 1,
    accent: "#7bd88f",
    textClass: "text-common",
    borderClass: "border-common/40 ring-1 ring-common/15",
    glowClass: "glow-common",
    foilClass: "",
    frameGradient:
      "linear-gradient(150deg, #0a1622 0%, #0f2030 45%, #081019 80%, #0d1c28 100%)",
    badgeGradient: "linear-gradient(90deg, #15803d, #7bd88f, #c7f0d2)",
  },
};

export function tierStyle(tier: Tier): TierStyle {
  return STYLES[tier];
}
