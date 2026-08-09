"use server";

import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth";
import { upsertSettings } from "@/lib/settings";

export async function saveSettingsAction(formData: FormData) {
  await requireAdminSession();
  const salonName = formData.get("salonName")?.toString() ?? "";
  const tagline = formData.get("tagline")?.toString() || null;
  const heroCtaLabel = formData.get("heroCtaLabel")?.toString() || null;
  const heroCtaUrl = formData.get("heroCtaUrl")?.toString() || null;

  if (!salonName) {
    return;
  }

  await upsertSettings({ salonName, tagline, heroCtaLabel, heroCtaUrl });
  revalidatePath("/admin/settings");
  revalidatePath("/");
  revalidatePath("/gallery");
  revalidatePath("/pricing");
}
