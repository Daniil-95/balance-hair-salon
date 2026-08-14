"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminSession } from "@/lib/auth";
import { getContactAndHours, upsertContactAndHours } from "@/lib/contact";
import { getSettings, upsertSettings } from "@/lib/settings";

function parseBoolean(value: string | string[] | null) {
  return value === "true";
}

function normalizeMapEmbedUrl(value?: string | null) {
  if (!value) {
    return null;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  const withProtocol = trimmed.startsWith("http://") || trimmed.startsWith("https://") ? trimmed : `https://${trimmed}`;

  try {
    const url = new URL(withProtocol);
    const host = url.hostname.toLowerCase();

    if (!host.includes("google.")) {
      return withProtocol;
    }

    if (url.pathname.includes("/maps/embed") || url.searchParams.get("output") === "embed") {
      return withProtocol;
    }

    const query = url.searchParams.get("q") || url.searchParams.get("query");
    if (query && query.trim()) {
      return `https://www.google.com/maps?q=${encodeURIComponent(query.trim())}&output=embed`;
    }

    return withProtocol;
  } catch {
    return null;
  }
}

export async function saveContactAction(formData: FormData) {
  await requireAdminSession();
  const address = formData.get("address")?.toString() ?? "";
  const phone = formData.get("phone")?.toString() ?? "";
  const whatsapp = formData.get("whatsapp")?.toString() ?? "";
  const mapUrl = normalizeMapEmbedUrl(formData.get("mapUrl")?.toString() || null);
  const contactCardTitle = formData.get("contactCardTitle")?.toString() || null;
  const contactCardDescription = formData.get("contactCardDescription")?.toString() || null;

  if (!address || !phone || !whatsapp) {
    return;
  }

  const settings = await getSettings();

  const { contact: existingContact } = await getContactAndHours();

  const hours: Array<{ day: string; open: string; close: string; isClosed: boolean; order: number }> = [];

  for (const entry of formData.entries()) {
    const [name, value] = entry;

    const match = name.match(/^hours\[(\d+)\]\[(.+)\]$/);
    if (!match) continue;

    const index = Number(match[1]);
    const field = match[2];

    if (!hours[index]) {
      hours[index] = { day: "", open: "", close: "", isClosed: false, order: index };
    }

    if (field === "day") {
      hours[index].day = value.toString();
    }
    if (field === "open") {
      hours[index].open = value.toString();
    }
    if (field === "close") {
      hours[index].close = value.toString();
    }
    if (field === "isClosed") {
      hours[index].isClosed = parseBoolean(value.toString());
    }
  }

  const normalizedHours = hours.filter((hour) => hour && hour.day).map((hour, index) => ({
    day: hour.day,
    open: hour.open,
    close: hour.close,
    isClosed: hour.isClosed,
    order: index,
  }));

  await upsertContactAndHours({
    address,
    phone,
    whatsapp,
    email: existingContact?.email ?? null,
    mapUrl,
    hours: normalizedHours,
  });

  await upsertSettings({
    salonName: settings?.salonName ?? "Balance",
    tagline: settings?.tagline ?? null,
    navigationLogoName: settings?.navigationLogoName ?? null,
    navigationLogoSub: settings?.navigationLogoSub ?? null,
    privacyPolicyContent: settings?.privacyPolicyContent ?? null,
    heroCtaLabel: settings?.heroCtaLabel ?? null,
    heroCtaUrl: settings?.heroCtaUrl ?? null,
    logo: settings?.logo ?? null,
    servicesSectionTitle: settings?.servicesSectionTitle ?? null,
    servicesSectionSub: settings?.servicesSectionSub ?? null,
    pricingSectionTitle: settings?.pricingSectionTitle ?? null,
    pricingSectionSub: settings?.pricingSectionSub ?? null,
    contactSectionTitle: settings?.contactSectionTitle ?? null,
    contactSectionSub: settings?.contactSectionSub ?? null,
    contactCardTitle,
    contactCardDescription,
  });
  revalidatePath("/admin/contact");
  revalidatePath("/admin/settings");
  revalidatePath("/");
  redirect("/admin/contact?saved=1");
}
