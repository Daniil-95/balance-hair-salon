"use server";

import { revalidatePath } from "next/cache";
import fs from "fs";
import path from "path";
import { requireAdminSession } from "@/lib/auth";
import { createGalleryImageSimple, deleteGalleryImage, getOrCreateDefaultGalleryCategoryId, updateGalleryImageSimple } from "@/lib/gallery";

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

export async function uploadGalleryImageAction(formData: FormData) {
  await requireAdminSession();
  const title = formData.get("title")?.toString() ?? "";
  const order = Number(formData.get("order") ?? 0);
  const file = formData.get("image") as File | null;

  if (!title || !file) {
    return;
  }

  const categoryId = await getOrCreateDefaultGalleryCategoryId();
  const filename = await saveUpload(file);
  await createGalleryImageSimple({ title, filename, categoryId, order });
  revalidateGalleryViews();
}

export async function updateGalleryImageAction(formData: FormData) {
  await requireAdminSession();
  const id = formData.get("id")?.toString();
  const title = formData.get("title")?.toString() ?? "";
  const order = Number(formData.get("order") ?? 0);

  if (!id || !title) {
    return;
  }

  await updateGalleryImageSimple({ id, title, order });
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
