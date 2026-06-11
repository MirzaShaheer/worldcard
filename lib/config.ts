/* =========================================================================
   WORLD CARD — central configuration
   Edit this file to plug in real launch values (contract address, socials).
   Everything below is consumed across the site, so there is a single source
   of truth for the token, links, and headline copy.
   ========================================================================= */

/**
 * Base path the site is served under. Empty locally; set to "/worldcard" by the
 * GitHub Pages deploy workflow (NEXT_PUBLIC_BASE_PATH). Prefix any same-origin
 * asset referenced via a raw <img>/url with this so it resolves under the subpath.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const SITE = {
  name: "World Card",
  ticker: "$WORLDCARD",
  tagline:
    "Collect all 48 nations. Holographic team cards meet the world's biggest stage — powered by $WORLDCARD.",
  url: "https://worldcard.xyz",
} as const;

export const TOKEN = {
  /** Launchpad / chain the token lives on. */
  chain: "Solana",
  launchpad: "pump.fun",
  /**
   * Token mint / contract address.
   * Leave as "" before launch — the live-data ticker shows a graceful
   * "Live at launch" state until a real address + Dexscreener pair exist.
   */
  contractAddress: "",
  /** Dexscreener tokens endpoint (chain-agnostic; resolves the best pair). */
  dexscreenerApi: "https://api.dexscreener.com/latest/dex/tokens/",
  /** Where the Buy CTA points before / after launch. */
  buyUrl: "https://pump.fun",
} as const;

/** 50 / 50 creator-fee split that funds the flywheel. */
export const TOKENOMICS = {
  growPct: 50,
  burnPct: 50,
  splits: [
    {
      pct: 50,
      title: "Grow $WORLDCARD",
      blurb:
        "Half of all creator fees are reinvested to expand the World Card ecosystem — new card drops, marketing, and rewards for collectors.",
      icon: "grow",
    },
    {
      pct: 50,
      title: "Buy Back & Burn",
      blurb:
        "The other half buys $WORLDCARD on the open market and sends it to the burn address forever — fewer cards in the pack, more rarity for holders.",
      icon: "burn",
    },
  ],
} as const;

export const SOCIALS = {
  twitter: "https://x.com/worldcard",
  telegram: "https://t.me/worldcard",
  dexscreener: "https://dexscreener.com",
  pumpfun: "https://pump.fun",
} as const;

export const NAV_LINKS = [
  { label: "Cards", href: "/#cards" },
  { label: "Tokenomics", href: "/#tokenomics" },
  { label: "How to Buy", href: "/#how-to-buy" },
  { label: "Roadmap", href: "/#roadmap" },
  { label: "All 48 Teams", href: "/cards" },
] as const;

export const ROADMAP = [
  {
    phase: "Phase 1",
    title: "Kickoff",
    done: true,
    items: [
      "Launch $WORLDCARD on pump.fun",
      "Reveal the World Card collection",
      "Seed the community & socials",
    ],
  },
  {
    phase: "Phase 2",
    title: "Group Stage",
    done: false,
    items: [
      "All 48 team cards live on-site",
      "First creator-fee buyback & burn",
      "Holder leaderboard & card rarity index",
    ],
  },
  {
    phase: "Phase 3",
    title: "Knockouts",
    done: false,
    items: [
      "Animated holo card reveals",
      "Community card votes & events",
      "Partnerships across football & meme culture",
    ],
  },
  {
    phase: "Phase 4",
    title: "The Final",
    done: false,
    items: [
      "Live tournament-driven card stats",
      "Limited Legendary foil editions",
      "World Card becomes the home of football trading cards",
    ],
  },
] as const;

export const HOW_TO_BUY = [
  {
    title: "Get a Solana wallet",
    body: "Install Phantom or any Solana wallet and top it up with some SOL.",
  },
  {
    title: "Open pump.fun",
    body: "Connect your wallet and paste the official $WORLDCARD contract address.",
  },
  {
    title: "Swap SOL for $WORLDCARD",
    body: "Choose your amount, confirm the swap, and your cards are in the pack.",
  },
  {
    title: "Collect the world",
    body: "Hold $WORLDCARD, track the buyback & burn, and complete all 48 nations.",
  },
] as const;
