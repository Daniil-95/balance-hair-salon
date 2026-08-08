import { prisma } from "@/lib/prisma";

export function getSettings() {
  return prisma.siteSettings.findFirst();
}

export async function upsertSettings(data: {
  salonName: string;
  tagline?: string | null;
  heroCtaLabel?: string | null;
  heroCtaUrl?: string | null;
  logo?: string | null;
}) {
  const existing = await prisma.siteSettings.findFirst();

  if (existing) {
    return prisma.siteSettings.update({
      where: { id: existing.id },
      data: {
        salonName: data.salonName,
        tagline: data.tagline,
        heroCtaLabel: data.heroCtaLabel,
        heroCtaUrl: data.heroCtaUrl,
        ...(data.logo ? { logo: data.logo } : {}),
      },
    });
  }

  return prisma.siteSettings.create({
    data: {
      salonName: data.salonName,
      tagline: data.tagline,
      heroCtaLabel: data.heroCtaLabel,
      heroCtaUrl: data.heroCtaUrl,
      logo: data.logo,
    },
  });
}
