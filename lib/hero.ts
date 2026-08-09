import { prisma } from "@/lib/prisma";

export interface HeroMeta {
  overline?: string;
  imageAlt?: string;
  instagramUrl?: string;
  instagramLabel?: string;
  whatsappLabel?: string;
  whatsappUrl?: string;
  openingHoursLabel?: string;
  metaRowLeftLabel?: string;
  metaRowCenterLabel?: string;
  metaRowRightLabel?: string;
}

interface HeroBackgroundPayload {
  _schema: "hero-meta-v1";
  meta: HeroMeta;
}

function parseHeroBackgroundPayload(value?: string | null): HeroBackgroundPayload | null {
  if (!value) return null;

  try {
    const parsed = JSON.parse(value) as Partial<HeroBackgroundPayload>;

    if (parsed?._schema !== "hero-meta-v1" || typeof parsed.meta !== "object" || !parsed.meta) {
      return null;
    }

    return {
      _schema: "hero-meta-v1",
      meta: parsed.meta,
    };
  } catch {
    return null;
  }
}

function serializeHeroBackgroundPayload(meta?: HeroMeta | null) {
  if (!meta) return null;

  const payload: HeroBackgroundPayload = {
    _schema: "hero-meta-v1",
    meta,
  };

  return JSON.stringify(payload);
}

export function getHero() {
  return prisma.hero.findFirst();
}

export async function getHeroMeta() {
  const hero = await getHero();
  const payload = parseHeroBackgroundPayload(hero?.background);
  return payload?.meta ?? {};
}

export async function upsertHero(data: {
  headline: string;
  subheadline: string;
  ctaLabel: string;
  ctaUrl: string;
  image?: string | null;
  meta?: HeroMeta;
}) {
  const background = serializeHeroBackgroundPayload(data.meta);
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
        background,
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
      background,
    },
  });
}
