"use server";

import { revalidatePath } from "next/cache";
import fs from "fs";
import path from "path";
import { requireAdminSession } from "@/lib/auth";
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

function revalidateGalleryViews() {
  revalidatePath("/admin/gallery");
  revalidatePath("/");
  revalidatePath("/gallery");
}

export async function createGalleryCategoryAction(formData: FormData) {
  await requireAdminSession();
  const name = formData.get("name")?.toString() ?? "";
  if (!name) {
    return;
  }

  await createGalleryCategory(name);
  revalidateGalleryViews();
}

export async function updateGalleryCategoryAction(formData: FormData) {
  await requireAdminSession();
  const id = formData.get("id")?.toString();
  const name = formData.get("name")?.toString() ?? "";
  const order = Number(formData.get("order") ?? 0);

  if (!id || !name) {
    return;
  }

  await updateGalleryCategory({ id, name, order });
  revalidateGalleryViews();
}

export async function deleteGalleryCategoryAction(formData: FormData) {
  await requireAdminSession();
  const id = formData.get("id")?.toString();
  if (!id) {
    return;
  }

  await deleteGalleryCategory(id);
  revalidateGalleryViews();
}

export async function uploadGalleryImageAction(formData: FormData) {
  await requireAdminSession();
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
  revalidateGalleryViews();
}

export async function updateGalleryImageAction(formData: FormData) {
  await requireAdminSession();
  const id = formData.get("id")?.toString();
  const title = formData.get("title")?.toString() ?? "";
  const alt = formData.get("alt")?.toString() ?? "";
  const categoryId = formData.get("categoryId")?.toString() ?? "";
  const order = Number(formData.get("order") ?? 0);

  if (!id || !title || !alt || !categoryId) {
    return;
  }

  await updateGalleryImage({ id, title, alt, categoryId, order });
  revalidateGalleryViews();
}

export async function deleteGalleryImageAction(formData: FormData) {
  await requireAdminSession();
  const id = formData.get("id")?.toString();
  if (!id) {
    return;
  }

  await deleteGalleryImage(id);
  revalidateGalleryViews();
}
