import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.balancekadernictvi.cz";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const url = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;

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
