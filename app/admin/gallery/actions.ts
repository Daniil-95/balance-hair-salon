"use server";

import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth";
import { createGalleryImageSimple, deleteGalleryImage, getGalleryImageById, getOrCreateDefaultGalleryCategoryId, updateGalleryImageSimple } from "@/lib/gallery";
import { deleteBlobByUrl, uploadToBlob, validateUploadImageFile } from "@/lib/upload";

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

  validateUploadImageFile(file);

  const categoryId = await getOrCreateDefaultGalleryCategoryId();
  const url = await uploadToBlob(file);
  await createGalleryImageSimple({ title, filename: url, categoryId, order });
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

  const image = await getGalleryImageById(id);
  await deleteGalleryImage(id);

  if (image?.filename.startsWith("http")) {
    await deleteBlobByUrl(image.filename).catch(() => {});
  }

  revalidateGalleryViews();
}
