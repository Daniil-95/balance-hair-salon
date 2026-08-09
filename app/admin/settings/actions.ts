"use server";

import { revalidatePath } from "next/cache";
import fs from "fs";
import path from "path";
import { requireAdminSession } from "@/lib/auth";
import { upsertSettings } from "@/lib/settings";

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

export async function saveSettingsAction(formData: FormData) {
  await requireAdminSession();
  const salonName = formData.get("salonName")?.toString() ?? "";
  const tagline = formData.get("tagline")?.toString() || null;
  const heroCtaLabel = formData.get("heroCtaLabel")?.toString() || null;
  const heroCtaUrl = formData.get("heroCtaUrl")?.toString() || null;
  const logoFile = formData.get("logo") as File | null;
  let logo = null;

  if (!salonName) {
    return;
  }

  if (logoFile && logoFile.size > 0) {
    logo = await saveUpload(logoFile);
  }

  await upsertSettings({ salonName, tagline, heroCtaLabel, heroCtaUrl, logo });
  revalidatePath("/admin/settings");
  revalidatePath("/");
  revalidatePath("/gallery");
  revalidatePath("/pricing");
}
