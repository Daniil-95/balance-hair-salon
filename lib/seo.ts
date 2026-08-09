import { prisma } from "@/lib/prisma";

export interface SeoInput {
  title: string;
  description: string;
  keywords: string;
  canonicalUrl: string;
  ogImage?: string | null;
  twitterCard?: string | null;
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
        ogImage: data.ogImage,
        twitterCard: data.twitterCard,
      },
    });
  }

  return prisma.seo.create({
    data: {
      title: data.title,
      description: data.description,
      keywords: data.keywords,
      canonicalUrl: data.canonicalUrl,
      ogImage: data.ogImage,
      twitterCard: data.twitterCard,
    },
  });
}
