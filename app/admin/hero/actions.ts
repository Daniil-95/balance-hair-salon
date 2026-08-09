"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import fs from "fs";
import path from "path";
import { requireAdminSession } from "@/lib/auth";
import { getHeroMeta, upsertHero } from "@/lib/hero";

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
}

export async function saveHeroAction(formData: FormData) {
  await requireAdminSession();
  const currentMeta = await getHeroMeta();

  const headline = formData.get("headline")?.toString() ?? "";
  const subheadline = formData.get("subheadline")?.toString() ?? "";
  const ctaLabel = formData.get("ctaLabel")?.toString() ?? "";
  const ctaUrl = formData.get("ctaUrl")?.toString() ?? "";
  const overline = formData.get("overline")?.toString() ?? "";
  const imageAlt = formData.get("imageAlt")?.toString() ?? "";
  const whatsappLabel = formData.get("whatsappLabel")?.toString() ?? "";
  const whatsappUrl = formData.get("whatsappUrl")?.toString() ?? "";
  const instagramLabel = formData.get("instagramLabel")?.toString() ?? "";
  const instagramUrl = formData.get("instagramUrl")?.toString() ?? "";
  const openingHoursLabel = currentMeta.openingHoursLabel ?? "";
  const metaRowLeftLabel = formData.get("metaRowLeftLabel")?.toString() ?? "";
  const metaRowCenterLabel = formData.get("metaRowCenterLabel")?.toString() ?? "";
  const metaRowRightLabel = formData.get("metaRowRightLabel")?.toString() ?? "";
  const imageFile = formData.get("image") as File | null;

  if (!headline || !subheadline || !ctaLabel || !ctaUrl || !overline || !imageAlt || !whatsappLabel || !instagramLabel) {
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
    image,
    meta: {
      overline,
      imageAlt,
      whatsappLabel,
      whatsappUrl,
      instagramLabel,
      instagramUrl,
      openingHoursLabel,
      metaRowLeftLabel,
      metaRowCenterLabel,
      metaRowRightLabel,
    },
  });

  revalidateHeroViews();
  redirect("/admin/hero?saved=1");
}
