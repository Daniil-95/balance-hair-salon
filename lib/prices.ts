import { prisma } from "@/lib/prisma";

export function getPriceCategories() {
  return prisma.priceCategory.findMany({
    orderBy: { order: "asc" },
    include: { items: { orderBy: { order: "asc" } } },
  });
}

export function createPriceCategory(data: { name: string; description?: string; order: number }) {
  return prisma.priceCategory.create({
    data: {
      name: data.name,
      description: data.description,
      order: data.order,
    },
  });
}

export function updatePriceCategory(data: { id: string; name: string; description?: string; order: number }) {
  return prisma.priceCategory.update({
    where: { id: data.id },
    data: {
      name: data.name,
      description: data.description,
      order: data.order,
    },
  });
}

export async function deletePriceCategory(id: string) {
  await prisma.priceItem.deleteMany({ where: { categoryId: id } });
  return prisma.priceCategory.delete({ where: { id } });
}

export function createPriceItem(data: { categoryId: string; title: string; price: string; description?: string; order: number }) {
  return prisma.priceItem.create({
    data: {
      categoryId: data.categoryId,
      title: data.title,
      price: data.price,
      description: data.description,
      order: data.order,
    },
  });
}

export function updatePriceItem(data: { id: string; title: string; price: string; description?: string; order: number }) {
  return prisma.priceItem.update({
    where: { id: data.id },
    data: {
      title: data.title,
      price: data.price,
      description: data.description,
      order: data.order,
    },
  });
}

export function deletePriceItem(id: string) {
  return prisma.priceItem.delete({ where: { id } });
}
