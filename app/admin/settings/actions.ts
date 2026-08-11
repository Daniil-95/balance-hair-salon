"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminSession } from "@/lib/auth";
import { upsertSettings } from "@/lib/settings";

export async function saveSettingsAction(formData: FormData) {
  await requireAdminSession();
  const salonName = formData.get("salonName")?.toString() ?? "";
  const tagline = formData.get("tagline")?.toString() || null;
  const navigationLogoName = formData.get("navigationLogoName")?.toString() || null;
  const navigationLogoSub = formData.get("navigationLogoSub")?.toString() || null;
  const privacyPolicyContent = formData.get("privacyPolicyContent")?.toString() || null;
  const heroCtaLabel = formData.get("heroCtaLabel")?.toString() || null;
  const heroCtaUrl = formData.get("heroCtaUrl")?.toString() || null;
  const servicesSectionTitle = formData.get("servicesSectionTitle")?.toString() || null;
  const servicesSectionSub = formData.get("servicesSectionSub")?.toString() || null;
  const pricingSectionTitle = formData.get("pricingSectionTitle")?.toString() || null;
  const pricingSectionSub = formData.get("pricingSectionSub")?.toString() || null;
  const contactSectionTitle = formData.get("contactSectionTitle")?.toString() || null;
  const contactSectionSub = formData.get("contactSectionSub")?.toString() || null;

  if (!salonName) {
    return;
  }

  await upsertSettings({
    salonName,
    tagline,
    navigationLogoName,
    navigationLogoSub,
    privacyPolicyContent,
    heroCtaLabel,
    heroCtaUrl,
    servicesSectionTitle,
    servicesSectionSub,
    pricingSectionTitle,
    pricingSectionSub,
    contactSectionTitle,
    contactSectionSub,
  });
  revalidatePath("/admin/settings");
  revalidatePath("/");
  revalidatePath("/privacy-policy");
  redirect("/admin/settings?saved=1");
}
