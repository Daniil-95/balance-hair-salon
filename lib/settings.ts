import { prisma } from "@/lib/prisma";

export async function getSettings() {
  return prisma.siteSettings.findFirst({ orderBy: { updatedAt: "desc" } });
}

export async function upsertSettings(data: {
  salonName: string;
  tagline?: string | null;
  navigationLogoName?: string | null;
  navigationLogoSub?: string | null;
  privacyPolicyContent?: string | null;
  heroCtaLabel?: string | null;
  heroCtaUrl?: string | null;
  logo?: string | null;
  servicesSectionTitle?: string | null;
  servicesSectionSub?: string | null;
  pricingSectionTitle?: string | null;
  pricingSectionSub?: string | null;
  contactSectionTitle?: string | null;
  contactSectionSub?: string | null;
  contactCardTitle?: string | null;
  contactCardDescription?: string | null;
}) {
  const existing = await prisma.siteSettings.findFirst({ orderBy: { updatedAt: "desc" } });

  if (existing) {
    return prisma.siteSettings.update({
      where: { id: existing.id },
      data: {
        salonName: data.salonName,
        tagline: data.tagline,
        navigationLogoName: data.navigationLogoName,
        navigationLogoSub: data.navigationLogoSub,
        privacyPolicyContent: data.privacyPolicyContent,
        heroCtaLabel: data.heroCtaLabel,
        heroCtaUrl: data.heroCtaUrl,
        logo: data.logo,
        servicesSectionTitle: data.servicesSectionTitle,
        servicesSectionSub: data.servicesSectionSub,
        pricingSectionTitle: data.pricingSectionTitle,
        pricingSectionSub: data.pricingSectionSub,
        contactSectionTitle: data.contactSectionTitle,
        contactSectionSub: data.contactSectionSub,
        contactCardTitle: data.contactCardTitle,
        contactCardDescription: data.contactCardDescription,
      },
    });
  }

  return prisma.siteSettings.create({
    data: {
      salonName: data.salonName,
      tagline: data.tagline,
      navigationLogoName: data.navigationLogoName,
      navigationLogoSub: data.navigationLogoSub,
      privacyPolicyContent: data.privacyPolicyContent,
      heroCtaLabel: data.heroCtaLabel,
      heroCtaUrl: data.heroCtaUrl,
      logo: data.logo,
      servicesSectionTitle: data.servicesSectionTitle,
      servicesSectionSub: data.servicesSectionSub,
      pricingSectionTitle: data.pricingSectionTitle,
      pricingSectionSub: data.pricingSectionSub,
      contactSectionTitle: data.contactSectionTitle,
      contactSectionSub: data.contactSectionSub,
      contactCardTitle: data.contactCardTitle,
      contactCardDescription: data.contactCardDescription,
    },
  });
}
