import { prisma } from "@/lib/prisma";

export async function getContactAndHours() {
  const [contact, openingHours] = await Promise.all([
    prisma.contact.findFirst({
      orderBy: { updatedAt: "desc" },
      select: {
        id: true,
        address: true,
        phone: true,
        whatsapp: true,
        email: true,
        mapUrl: true,
        createdAt: true,
        updatedAt: true,
      },
    }),
    prisma.openingHour.findMany({
      orderBy: { order: "asc" },
      select: {
        id: true,
        day: true,
        open: true,
        close: true,
        isClosed: true,
        order: true,
      },
    }),
  ]);

  return { contact, openingHours };
}

export async function upsertContactAndHours(data: {
  address: string;
  phone: string;
  whatsapp: string;
  email?: string | null;
  mapUrl?: string | null;
  hours: Array<{ day: string; open: string; close: string; isClosed: boolean; order: number }>;
}) {
  const email = data.email ?? "";

  await prisma.$transaction(async (tx) => {
    const existing = await tx.contact.findFirst({ orderBy: { updatedAt: "desc" } });

    if (existing) {
      await tx.contact.update({
        where: { id: existing.id },
        data: {
          address: data.address,
          phone: data.phone,
          whatsapp: data.whatsapp,
          email,
          mapUrl: data.mapUrl,
        },
      });
    } else {
      await tx.contact.create({
        data: {
          address: data.address,
          phone: data.phone,
          whatsapp: data.whatsapp,
          email,
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
