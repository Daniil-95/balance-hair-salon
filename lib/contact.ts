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
  const existing = await prisma.contact.findFirst();

  if (existing) {
    await prisma.contact.update({
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
    await prisma.contact.create({
      data: {
        address: data.address,
        phone: data.phone,
        whatsapp: data.whatsapp,
        email: data.email,
        mapUrl: data.mapUrl,
      },
    });
  }

  await prisma.openingHour.deleteMany({});

  if (data.hours.length > 0) {
    await prisma.openingHour.createMany({
      data: data.hours.map((hour) => ({
        day: hour.day,
        open: hour.open,
        close: hour.close,
        isClosed: hour.isClosed,
        order: hour.order,
      })),
    });
  }
}
