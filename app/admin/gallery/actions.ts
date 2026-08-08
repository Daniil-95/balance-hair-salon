"use server";

import { revalidatePath } from "next/cache";
import fs from "fs";
import path from "path";
import { createGalleryCategory, createGalleryImage, deleteGalleryImage, updateGalleryImage } from "@/lib/gallery";

const uploadsDir = path.join(process.cwd(), "public", "uploads");

function ensureUploadsDir() {
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
}

async function saveUpload(file: File) {
  ensureUploadsDir();
  const filename = `${Date.now()}-${file.name}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  const filePath = path.join(uploadsDir, filename);
  await fs.promises.writeFile(filePath, buffer);
  return filename;
}

export async function createGalleryCategoryAction(formData: FormData) {
  const name = formData.get("name")?.toString() ?? "";
  if (!name) {
    return;
  }

  await createGalleryCategory(name);
  revalidatePath("/admin/gallery");
}

export async function updateGalleryCategoryAction(formData: FormData) {
  const id = formData.get("id")?.toString();
  const name = formData.get("name")?.toString() ?? "";
  const order = Number(formData.get("order") ?? 0);

  if (!id || !name) {
    return;
  }

  await updateGalleryCategory({ id, name, order });
  revalidatePath("/admin/gallery");
}

export async function deleteGalleryCategoryAction(formData: FormData) {
  const id = formData.get("id")?.toString();
  if (!id) {
    return;
  }

  await deleteGalleryCategory(id);
  revalidatePath("/admin/gallery");
}

export async function uploadGalleryImageAction(formData: FormData) {
  const title = formData.get("title")?.toString() ?? "";
  const alt = formData.get("alt")?.toString() ?? "";
  const categoryId = formData.get("categoryId")?.toString() ?? "";
  const order = Number(formData.get("order") ?? 0);
  const file = formData.get("image") as File | null;

  if (!title || !alt || !categoryId || !file) {
    return;
  }

  const filename = await saveUpload(file);
  await createGalleryImage({ title, alt, filename, categoryId, order });
  revalidatePath("/admin/gallery");
}

export async function updateGalleryImageAction(formData: FormData) {
  const id = formData.get("id")?.toString();
  const title = formData.get("title")?.toString() ?? "";
  const alt = formData.get("alt")?.toString() ?? "";
  const categoryId = formData.get("categoryId")?.toString() ?? "";
  const order = Number(formData.get("order") ?? 0);

  if (!id || !title || !alt || !categoryId) {
    return;
  }

  await updateGalleryImage({ id, title, alt, categoryId, order });
  revalidatePath("/admin/gallery");
}

export async function deleteGalleryImageAction(formData: FormData) {
  const id = formData.get("id")?.toString();
  if (!id) {
    return;
  }

  await deleteGalleryImage(id);
  revalidatePath("/admin/gallery");
}
