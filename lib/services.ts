import { prisma } from "@/lib/prisma";

export function getServices() {
  return prisma.service.findMany({ orderBy: { order: "asc" } });
}

export function createService(data: { title: string; description: string; icon: string; order: number }) {
  return prisma.service.create({
    data: {
      title: data.title,
      description: data.description,
      icon: data.icon,
      order: data.order,
    },
  });
}

export function updateService(data: { id: string; title: string; description: string; icon: string; order: number }) {
  return prisma.service.update({
    where: { id: data.id },
    data: {
      title: data.title,
      description: data.description,
      icon: data.icon,
      order: data.order,
    },
  });
}

export function deleteService(id: string) {
  return prisma.service.delete({ where: { id } });
}
