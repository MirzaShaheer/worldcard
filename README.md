# World Card — $WORLDCARD

A meme-coin launch site themed as a **World Cup × Pokémon TCG** mashup. Collect holographic,
flippable trading cards for all **48 nations**, each showing team, captain, World Cups won, and
**% favor to win** — which drives the card's **rarity tier** (Legendary → Common). Tokenomics:
**50% of creator fees grow $WORLDCARD, 50% buy back & burn.**

Built with **Next.js 16 (App Router) · React 19 · Tailwind v4 · Motion (framer-motion successor)**.

## Run it

```bash
npm run dev      # dev server → http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

Routes: `/` (landing) and `/cards` (full, filterable 48-card gallery).

## ⚠️ Add your logo

The custom logo artwork could not be saved automatically. **Save your image as:**

```
public/logo.png
```

It's used as the Hero brand badge and the social/OpenGraph share image. The Hero hides the badge
gracefully if the file is missing, so the site works either way — but add it for full branding.
(A `1200×630` version is ideal for the social card.)

## Edit before / at launch — everything lives in `lib/config.ts`

| What | Field |
|------|-------|
| Token contract / mint address | `TOKEN.contractAddress` — **leave `""` until launch**; the ticker shows a "Live at launch" state and starts pulling **live Dexscreener data** automatically once you paste the real address |
| Chain / launchpad | `TOKEN.chain`, `TOKEN.launchpad`, `TOKEN.buyUrl` |
| Socials | `SOCIALS.twitter / telegram / dexscreener / pumpfun` |
| Headline copy, tagline, site URL | `SITE.*` |
| Roadmap, How-to-buy, tokenomics copy | `ROADMAP`, `HOW_TO_BUY`, `TOKENOMICS` |

Team data (names, captains, World Cups won, odds) lives in `lib/teams.ts`. The `oddsPct` field is
the **single input** that decides each team's rarity tier — edit thresholds in `lib/tiers.ts`.
Flags load from `flagcdn.com` via each team's `code`.

## Structure

```
app/            layout (fonts, metadata), page.tsx (landing), cards/page.tsx, globals.css (design system)
components/     Navbar, TickerBar, Hero, Tokenomics, CardGallery, TradingCard, Rarity, HowToBuy, Roadmap, Footer
lib/            config.ts (all editable values), teams.ts (48 nations), tiers.ts (odds→rarity), useTokenData.ts (Dexscreener hook)
public/         logo.png  ← add your artwork here
```

## Deploy

Push to GitHub and import into **Vercel** (zero config for Next.js). Set the production domain in
`SITE.url`.

---

*$WORLDCARD is a meme collectible. Not affiliated with FIFA, the World Cup, or Pokémon.*
