"use server";

import { revalidatePath } from "next/cache";
import fs from "fs";
import path from "path";
import { requireAdminSession } from "@/lib/auth";
import { upsertAbout } from "@/lib/about";

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

function revalidateAboutViews() {
  revalidatePath("/admin/about");
  revalidatePath("/");
}

export async function saveAboutAction(formData: FormData) {
  await requireAdminSession();

  const title = formData.get("title")?.toString() ?? "";
  const description = formData.get("description")?.toString() ?? "";
  const highlights = formData.get("highlights")?.toString() || null;
  const imageFile = formData.get("image") as File | null;

  if (!title || !description) {
    return;
  }

  let image = null;

  if (imageFile && imageFile.size > 0) {
    image = await saveUpload(imageFile);
  }

  await upsertAbout({
    title,
    description,
    highlights,
    image,
  });

  revalidateAboutViews();
}
