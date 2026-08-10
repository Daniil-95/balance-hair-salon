"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminSession } from "@/lib/auth";
import { getAboutMeta, upsertAbout } from "@/lib/about";
import { uploadToBlob } from "@/lib/upload";

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
    image = await uploadToBlob(imagePrimaryFile);
  }

  if (imageSecondaryFile && imageSecondaryFile.size > 0) {
    secondaryImage = await uploadToBlob(imageSecondaryFile);
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
  redirect("/admin/about?saved=1");
}
