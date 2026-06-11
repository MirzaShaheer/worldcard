import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { TickerBar } from "@/components/TickerBar";
import { Hero } from "@/components/Hero";
import { Tokenomics } from "@/components/Tokenomics";
import { CardGallery } from "@/components/CardGallery";
import { HowToBuy } from "@/components/HowToBuy";
import { Roadmap } from "@/components/Roadmap";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <TickerBar />
      <main>
        <Hero />
        <Tokenomics />

        {/* Homepage shows a curated preview of the pack; full set lives at /cards */}
        <CardGallery showFilters={false} limit={12} />
        <div className="-mt-10 mb-24 flex justify-center">
          <Link
            href="/cards"
            className="rounded-full border border-gold/50 bg-gold/10 px-7 py-3 font-display tracking-mega text-gold transition hover:bg-gold/20 glow-gold"
          >
            VIEW ALL 48 NATIONS →
          </Link>
        </div>

        <HowToBuy />
        <Roadmap />
      </main>
      <Footer />
    </>
  );
}
