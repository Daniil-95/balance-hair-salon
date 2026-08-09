import type { Metadata } from "next";
import "../styles/globals.scss";
import { Inter } from "next/font/google";
import { Cormorant_Garamond } from "next/font/google";
import { getSeoJsonLd, getSeoMetadata } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});

export async function generateMetadata(): Promise<Metadata> {
  return getSeoMetadata();
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = await getSeoJsonLd();

  return (
    <html lang="cs" className={`${inter.variable} ${cormorant.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
