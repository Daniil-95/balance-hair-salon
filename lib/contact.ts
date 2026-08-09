import { prisma } from "@/lib/prisma";

export async function getContactAndHours() {
  const contact = await prisma.contact.findFirst();
  const openingHours = await prisma.openingHour.findMany({ orderBy: { order: "asc" } });

  return { contact, openingHours };
}

export async function upsertContactAndHours(data: {
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  mapUrl?: string | null;
  hours: Array<{ day: string; open: string; close: string; isClosed: boolean; order: number }>;
}) {
  await prisma.$transaction(async (tx) => {
    const existing = await tx.contact.findFirst();

    if (existing) {
      await tx.contact.update({
        where: { id: existing.id },
        data: {
          address: data.address,
          phone: data.phone,
          whatsapp: data.whatsapp,
          email: data.email,
          mapUrl: data.mapUrl,
        },
      });
    } else {
      await tx.contact.create({
        data: {
          address: data.address,
          phone: data.phone,
          whatsapp: data.whatsapp,
          email: data.email,
          mapUrl: data.mapUrl,
        },
      });
    }

    await tx.openingHour.deleteMany({});

    for (const hour of data.hours) {
      await tx.openingHour.create({
        data: {
          day: hour.day,
          open: hour.open,
          close: hour.close,
          isClosed: hour.isClosed,
          order: hour.order,
        },
      });
    }
  });
}
