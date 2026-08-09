import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://balance-hair-salon.example.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const seo = await prisma.seo.findFirst();
  const canonical = seo?.canonicalUrl?.trim() || baseUrl;
  const url = canonical.endsWith("/") ? canonical : `${canonical}/`;

  return [
    {
      url: `${url}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${url}gallery`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${url}pricing`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
