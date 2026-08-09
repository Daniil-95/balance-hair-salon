import { prisma } from "@/lib/prisma";

export function getAbout() {
  return prisma.about.findFirst();
}

export async function upsertAbout(data: {
  title: string;
  description: string;
  highlights?: string | null;
  image?: string | null;
}) {
  const existing = await prisma.about.findFirst();

  if (existing) {
    return prisma.about.update({
      where: { id: existing.id },
      data: {
        title: data.title,
        description: data.description,
        highlights: data.highlights,
        ...(data.image ? { image: data.image } : {}),
      },
    });
  }

  return prisma.about.create({
    data: {
      title: data.title,
      description: data.description,
      highlights: data.highlights,
      image: data.image,
    },
  });
}
