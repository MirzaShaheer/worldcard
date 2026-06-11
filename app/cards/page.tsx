import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { TickerBar } from "@/components/TickerBar";
import { Footer } from "@/components/Footer";
import { CardGallery } from "@/components/CardGallery";
import { SITE } from "@/lib/config";

export const metadata: Metadata = {
  title: `All 48 Nations — ${SITE.name}`,
  description: "Browse and filter every World Card: all 48 World Cup nations across four rarity tiers.",
};

export default function CardsPage() {
  return (
    <>
      <Navbar />
      <TickerBar />
      <main className="pt-10">
        <CardGallery showFilters showHeading />
      </main>
      <Footer />
    </>
  );
}
