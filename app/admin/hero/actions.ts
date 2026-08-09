"use server";

import { revalidatePath } from "next/cache";
import fs from "fs";
import path from "path";
import { requireAdminSession } from "@/lib/auth";
import { upsertHero } from "@/lib/hero";

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

function revalidateHeroViews() {
  revalidatePath("/admin/hero");
  revalidatePath("/");
  revalidatePath("/gallery");
  revalidatePath("/pricing");
}

export async function saveHeroAction(formData: FormData) {
  requireAdminSession();

  const headline = formData.get("headline")?.toString() ?? "";
  const subheadline = formData.get("subheadline")?.toString() ?? "";
  const ctaLabel = formData.get("ctaLabel")?.toString() ?? "";
  const ctaUrl = formData.get("ctaUrl")?.toString() ?? "";
  const background = formData.get("background")?.toString() || null;
  const imageFile = formData.get("image") as File | null;

  if (!headline || !subheadline || !ctaLabel || !ctaUrl) {
    return;
  }

  let image = null;

  if (imageFile && imageFile.size > 0) {
    image = await saveUpload(imageFile);
  }

  await upsertHero({
    headline,
    subheadline,
    ctaLabel,
    ctaUrl,
    background,
    image,
  });

  revalidateHeroViews();
}
