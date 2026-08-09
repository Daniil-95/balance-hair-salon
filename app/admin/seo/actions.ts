"use server";

import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth";
import { upsertSeo } from "@/lib/seo";

export async function saveSeoAction(formData: FormData) {
  await requireAdminSession();

  const title = formData.get("title")?.toString().trim() ?? "";
  const description = formData.get("description")?.toString().trim() ?? "";
  const keywords = formData.get("keywords")?.toString().trim() ?? "";
  const canonicalUrl = formData.get("canonicalUrl")?.toString().trim() ?? "";
  const ogImage = formData.get("ogImage")?.toString().trim() || null;
  const twitterCard = formData.get("twitterCard")?.toString().trim() || null;

  if (!title || !description || !keywords || !canonicalUrl) {
    return;
  }

  await upsertSeo({
    title,
    description,
    keywords,
    canonicalUrl,
    ogImage,
    twitterCard,
  });

  revalidatePath("/admin/seo");
  revalidatePath("/");
  revalidatePath("/gallery");
  revalidatePath("/pricing");
}
