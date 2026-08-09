"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminSession } from "@/lib/auth";
import { upsertSeo } from "@/lib/seo";

export async function saveSeoAction(formData: FormData) {
  await requireAdminSession();

  const title = formData.get("title")?.toString().trim() ?? "";
  const description = formData.get("description")?.toString().trim() ?? "";
  const keywords = formData.get("keywords")?.toString().trim() ?? "";
  const canonicalUrl = formData.get("canonicalUrl")?.toString().trim() ?? "";
  const ogTitle = formData.get("ogTitle")?.toString().trim() ?? "";
  const ogDescription = formData.get("ogDescription")?.toString().trim() ?? "";
  const ogImage = formData.get("ogImage")?.toString().trim() ?? "";
  const robots = formData.get("robots")?.toString().trim() ?? "index";
  const author = formData.get("author")?.toString().trim() ?? "";

  if (!title || !description || !keywords || !canonicalUrl) {
    return;
  }

  await upsertSeo({
    title,
    description,
    keywords,
    canonicalUrl,
    ogTitle: ogTitle || null,
    ogDescription: ogDescription || null,
    ogImage: ogImage || null,
    robots,
    author: author || null,
  });

  revalidatePath("/admin/seo");
  revalidatePath("/");
  revalidatePath("/robots.txt");
  revalidatePath("/sitemap.xml");
  redirect("/admin/seo?saved=1");
}
