import { prisma } from "@/lib/prisma";

function createSlug(value: string) {
  return `${value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")}-${Date.now()}`;
}

export function getGalleryCategories() {
  return prisma.galleryCategory.findMany({ orderBy: { order: "asc" } });
}

export function getGalleryImages() {
  return prisma.galleryImage.findMany({
    orderBy: { order: "asc" },
    include: { category: true },
  });
}

export function createGalleryCategory(name: string) {
  return prisma.galleryCategory.create({
    data: {
      name,
      slug: createSlug(name),
    },
  });
}

export function updateGalleryCategory(data: { id: string; name: string; order: number }) {
  return prisma.galleryCategory.update({
    where: { id: data.id },
    data: {
      name: data.name,
      order: data.order,
    },
  });
}

export async function deleteGalleryCategory(id: string) {
  await prisma.galleryImage.deleteMany({ where: { categoryId: id } });
  return prisma.galleryCategory.delete({ where: { id } });
}

export function createGalleryImage(data: { title: string; alt: string; filename: string; categoryId: string; order: number }) {
  return prisma.galleryImage.create({
    data: {
      title: data.title,
      alt: data.alt,
      filename: data.filename,
      categoryId: data.categoryId,
      order: data.order,
    },
  });
}

export function updateGalleryImage(data: { id: string; title: string; alt: string; categoryId: string; order: number }) {
  return prisma.galleryImage.update({
    where: { id: data.id },
    data: {
      title: data.title,
      alt: data.alt,
      categoryId: data.categoryId,
      order: data.order,
    },
  });
}

export function deleteGalleryImage(id: string) {
  return prisma.galleryImage.delete({ where: { id } });
}
