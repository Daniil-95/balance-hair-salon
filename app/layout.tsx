import type { Metadata } from "next";
import "../styles/globals.scss";
import { Inter } from "next/font/google";
import { Cormorant_Garamond } from "next/font/google";
import { getSeo } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display"
});

const DEFAULT_CANONICAL_URL = "https://balance-hair-salon.example.com";

function createFallbackMetadata(): Metadata {
  return {
    title: "Balance Hair Salon | Kadeřnické studio",
    description: "Balance Hair Salon nabízí střihy, barvení, styling a profesionální péči o vlasy v příjemném salonu.",
    metadataBase: new URL(DEFAULT_CANONICAL_URL),
    icons: {
      icon: "/favicon.ico"
    },
    alternates: {
      canonical: DEFAULT_CANONICAL_URL,
    },
    openGraph: {
      title: "Balance Hair Salon",
      description: "Kadeřnické služby, barvení, styling a péče o vlasy v salonu Balance.",
      type: "website",
      url: DEFAULT_CANONICAL_URL,
      siteName: "Balance Hair Salon"
    },
    twitter: {
      card: "summary_large_image",
      title: "Balance Hair Salon",
      description: "Kadeřnické služby a péče o vlasy v salonu Balance.",
      creator: "@balance_salon"
    }
  };
}

function normalizeTwitterCard(value?: string | null): "summary" | "summary_large_image" {
  return value === "summary" ? "summary" : "summary_large_image";
}

function normalizeOgImage(value?: string | null) {
  if (!value) return undefined;
  return value.startsWith("http://") || value.startsWith("https://") ? value : `/uploads/${value}`;
}

export async function generateMetadata(): Promise<Metadata> {
  const fallback = createFallbackMetadata();

  try {
    const seo = await getSeo();
    if (!seo) {
      return fallback;
    }

    const canonical = seo.canonicalUrl || DEFAULT_CANONICAL_URL;
    const metadataBase = new URL(canonical);
    const ogImage = normalizeOgImage(seo.ogImage);

    return {
      title: seo.title || fallback.title,
      description: seo.description || fallback.description,
      keywords: seo.keywords,
      metadataBase,
      icons: fallback.icons,
      alternates: {
        canonical,
      },
      openGraph: {
        title: seo.title || "Balance Hair Salon",
        description: seo.description || "Kadeřnické služby, barvení, styling a péče o vlasy v salonu Balance.",
        type: "website",
        url: canonical,
        siteName: "Balance Hair Salon",
        ...(ogImage ? { images: [{ url: ogImage }] } : {})
      },
      twitter: {
        card: normalizeTwitterCard(seo.twitterCard),
        title: seo.title || "Balance Hair Salon",
        description: seo.description || "Kadeřnické služby a péče o vlasy v salonu Balance.",
        creator: "@balance_salon",
        ...(ogImage ? { images: [ogImage] } : {})
      }
    };
  } catch {
    return fallback;
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs" className={`${inter.variable} ${cormorant.variable}`}>
      <body>{children}</body>
    </html>
  );
}
