import { prisma } from "@/lib/prisma";

export interface AboutMeta {
  overline?: string;
  secondParagraph?: string;
  secondaryImage?: string;
  imageMainAlt?: string;
  imageCutawayAlt?: string;
}

interface AboutHighlightsPayload {
  _schema: "about-meta-v1";
  meta: AboutMeta;
}

function parseHighlightsPayload(value?: string | null): AboutHighlightsPayload | null {
  if (!value) return null;

  try {
    const parsed = JSON.parse(value) as Partial<AboutHighlightsPayload>;

    if (parsed?._schema !== "about-meta-v1" || typeof parsed.meta !== "object" || !parsed.meta) {
      return null;
    }

    return {
      _schema: "about-meta-v1",
      meta: parsed.meta,
    };
  } catch {
    return null;
  }
}

function serializeHighlightsPayload(meta?: AboutMeta | null) {
  if (!meta) return null;

  const payload: AboutHighlightsPayload = {
    _schema: "about-meta-v1",
    meta,
  };

  return JSON.stringify(payload);
}

export function getAbout() {
  return prisma.about.findFirst();
}

export async function getAboutMeta() {
  const about = await getAbout();
  const payload = parseHighlightsPayload(about?.highlights);

  if (payload) {
    return payload.meta;
  }

  return {
    secondParagraph: about?.highlights ?? "",
  } satisfies AboutMeta;
}

export async function upsertAbout(data: {
  title: string;
  description: string;
  image?: string | null;
  meta?: AboutMeta;
}) {
  const highlights = serializeHighlightsPayload(data.meta);
  const existing = await prisma.about.findFirst();

  if (existing) {
    return prisma.about.update({
      where: { id: existing.id },
      data: {
        title: data.title,
        description: data.description,
        highlights,
        ...(data.image ? { image: data.image } : {}),
      },
    });
  }

  return prisma.about.create({
    data: {
      title: data.title,
      description: data.description,
      highlights,
      image: data.image,
    },
  });
}
