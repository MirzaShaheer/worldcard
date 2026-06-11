import type { Metadata, Viewport } from "next";
import { Anton, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/config";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${SITE.name} — World Cup × Pokémon Cards`,
  description: SITE.tagline,
  metadataBase: new URL(SITE.url),
  openGraph: {
    title: `${SITE.name} — ${SITE.ticker}`,
    description: SITE.tagline,
    url: SITE.url,
    siteName: SITE.name,
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: SITE.name }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.ticker}`,
    description: SITE.tagline,
    images: ["/logo.png"],
  },
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#05070f",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${inter.variable} ${grotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-night text-foreground">{children}</body>
    </html>
  );
}
