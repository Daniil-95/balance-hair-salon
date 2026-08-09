import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { getContactAndHours } from "@/lib/contact";
import { getSettings } from "@/lib/settings";

export interface SeoInput {
  title: string;
  description: string;
  keywords: string;
  canonicalUrl: string;
  ogTitle?: string | null;
  ogDescription?: string | null;
  ogImage?: string | null;
  robots?: string | null;
  author?: string | null;
}

const DEFAULT_SITE_NAME = "Balance Hair Salon Praha";
const DEFAULT_TITLE = "Balance Hair Salon Praha";
const DEFAULT_DESCRIPTION = "Kadeřnické služby, barvení, styling a péče o vlasy v salonu Balance.";
const DEFAULT_CANONICAL_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://balance-hair-salon.example.com";
const DEFAULT_OG_IMAGE = "/images/image.png";

function normalizeRobots(value?: string | null) {
  return value === "noindex" ? "noindex" : "index";
}

function normalizeImageUrl(image: string | null | undefined, baseUrl: string) {
  if (!image) {
    return new URL(DEFAULT_OG_IMAGE, baseUrl).toString();
  }

  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  return new URL(image.startsWith("/") ? image : `/${image}`, baseUrl).toString();
}

function createFallbackMetadata(): Metadata {
  return {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    metadataBase: new URL(DEFAULT_CANONICAL_URL),
    icons: {
      icon: "/favicon.ico",
    },
    alternates: {
      canonical: DEFAULT_CANONICAL_URL,
    },
    openGraph: {
      title: DEFAULT_TITLE,
      description: DEFAULT_DESCRIPTION,
      type: "website",
      url: DEFAULT_CANONICAL_URL,
      siteName: DEFAULT_SITE_NAME,
      images: [{ url: new URL(DEFAULT_OG_IMAGE, DEFAULT_CANONICAL_URL).toString() }],
    },
    twitter: {
      card: "summary_large_image",
      title: DEFAULT_TITLE,
      description: DEFAULT_DESCRIPTION,
    },
  };
}

export function getSeo() {
  return prisma.seo.findFirst();
}

export async function upsertSeo(data: SeoInput) {
  const existing = await prisma.seo.findFirst();

  if (existing) {
    return prisma.seo.update({
      where: { id: existing.id },
      data: {
        title: data.title,
        description: data.description,
        keywords: data.keywords,
        canonicalUrl: data.canonicalUrl,
        ogTitle: data.ogTitle ?? null,
        ogDescription: data.ogDescription ?? null,
        ogImage: data.ogImage ?? null,
        robots: normalizeRobots(data.robots),
        author: data.author ?? null,
        twitterCard: "summary_large_image",
      },
    });
  }

  return prisma.seo.create({
    data: {
      title: data.title,
      description: data.description,
      keywords: data.keywords,
      canonicalUrl: data.canonicalUrl,
      ogTitle: data.ogTitle ?? null,
      ogDescription: data.ogDescription ?? null,
      ogImage: data.ogImage ?? null,
      robots: normalizeRobots(data.robots),
      author: data.author ?? null,
      twitterCard: "summary_large_image",
    },
  });
}

export async function getSeoMetadata(): Promise<Metadata> {
  const fallback = createFallbackMetadata();

  try {
    const seo = await getSeo();
    const canonical = seo?.canonicalUrl?.trim() || DEFAULT_CANONICAL_URL;
    const title = seo?.title?.trim() || DEFAULT_TITLE;
    const description = seo?.description?.trim() || DEFAULT_DESCRIPTION;
    const keywords = seo?.keywords?.trim();
    const ogTitle = seo?.ogTitle?.trim() || title;
    const ogDescription = seo?.ogDescription?.trim() || description;
    const ogImage = normalizeImageUrl(seo?.ogImage?.trim(), canonical);
    const robots = normalizeRobots(seo?.robots) === "noindex" ? { index: false, follow: true } : { index: true, follow: true };
    const author = seo?.author?.trim();

    return {
      title,
      description,
      keywords: keywords ? [keywords] : undefined,
      metadataBase: new URL(canonical),
      icons: fallback.icons,
      alternates: {
        canonical,
      },
      robots,
      authors: author ? [{ name: author }] : undefined,
      openGraph: {
        title: ogTitle,
        description: ogDescription,
        type: "website",
        url: canonical,
        siteName: DEFAULT_SITE_NAME,
        images: [{ url: ogImage }],
      },
      twitter: {
        card: "summary_large_image",
        title: ogTitle,
        description: ogDescription,
        images: [ogImage],
      },
    };
  } catch {
    return fallback;
  }
}

export async function getSeoJsonLd() {
  try {
    const seo = await getSeo();
    const { contact, openingHours } = await getContactAndHours();
    const settings = await getSettings();

    const salonName = settings?.salonName?.trim() || DEFAULT_SITE_NAME;
    const address = contact?.address?.trim() || "Praha 1, Česká republika";
    const phone = contact?.phone?.trim() || "+420 222 333 444";
    const canonical = seo?.canonicalUrl?.trim() || DEFAULT_CANONICAL_URL;

    const openingHoursSpecification = openingHours
      .map((hour) => ({
        dayOfWeek: hour.day,
        opens: hour.isClosed ? undefined : hour.open,
        closes: hour.isClosed ? undefined : hour.close,
      }))
      .filter((entry) => entry.opens || entry.closes);

    return {
      "@context": "https://schema.org",
      "@type": "HairSalon",
      name: salonName,
      url: canonical,
      telephone: phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: address,
        addressLocality: "Praha",
        addressRegion: "Praha",
        postalCode: "110 00",
        addressCountry: "CZ",
      },
      openingHoursSpecification: openingHoursSpecification.length > 0 ? openingHoursSpecification : undefined,
    };
  } catch {
    return {
      "@context": "https://schema.org",
      "@type": "HairSalon",
      name: DEFAULT_SITE_NAME,
      url: DEFAULT_CANONICAL_URL,
      telephone: "+420 222 333 444",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Praha 1, Česká republika",
        addressLocality: "Praha",
        addressRegion: "Praha",
        postalCode: "110 00",
        addressCountry: "CZ",
      },
    };
  }
}
