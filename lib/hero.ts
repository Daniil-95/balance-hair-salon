import { prisma } from "@/lib/prisma";

export function getHero() {
  return prisma.hero.findFirst();
}

export async function upsertHero(data: {
  headline: string;
  subheadline: string;
  ctaLabel: string;
  ctaUrl: string;
  image?: string | null;
  background?: string | null;
}) {
  const existing = await prisma.hero.findFirst();

  if (existing) {
    return prisma.hero.update({
      where: { id: existing.id },
      data: {
        headline: data.headline,
        subheadline: data.subheadline,
        ctaLabel: data.ctaLabel,
        ctaUrl: data.ctaUrl,
        ...(data.image ? { image: data.image } : {}),
        ...(data.background ? { background: data.background } : {}),
      },
    });
  }

  return prisma.hero.create({
    data: {
      headline: data.headline,
      subheadline: data.subheadline,
      ctaLabel: data.ctaLabel,
      ctaUrl: data.ctaUrl,
      image: data.image,
      background: data.background,
    },
  });
}
