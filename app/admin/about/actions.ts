"use server";

import { revalidatePath } from "next/cache";
import fs from "fs";
import path from "path";
import { requireAdminSession } from "@/lib/auth";
import { getAboutMeta, upsertAbout } from "@/lib/about";

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

  const overline = formData.get("overline")?.toString() ?? "";
  const title = formData.get("title")?.toString() ?? "";
  const firstParagraph = formData.get("firstParagraph")?.toString() ?? "";
  const secondParagraph = formData.get("secondParagraph")?.toString() ?? "";
  const imageMainAlt = formData.get("imageMainAlt")?.toString() ?? "";
  const imageCutawayAlt = formData.get("imageCutawayAlt")?.toString() ?? "";
  const imagePrimaryFile = formData.get("imagePrimary") as File | null;
  const imageSecondaryFile = formData.get("imageSecondary") as File | null;

  if (!title || !firstParagraph) {
    return;
  }

  const existingMeta = await getAboutMeta();
  let image = null;
  let secondaryImage = existingMeta.secondaryImage || null;

  if (imagePrimaryFile && imagePrimaryFile.size > 0) {
    image = await saveUpload(imagePrimaryFile);
  }

  if (imageSecondaryFile && imageSecondaryFile.size > 0) {
    secondaryImage = await saveUpload(imageSecondaryFile);
  }

  await upsertAbout({
    image,
    title,
    description: firstParagraph,
    meta: {
      overline,
      secondParagraph,
      imageMainAlt,
      imageCutawayAlt,
      secondaryImage: secondaryImage || undefined,
    },
  });

  revalidateAboutViews();
}
