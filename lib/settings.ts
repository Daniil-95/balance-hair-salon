import { prisma } from "@/lib/prisma";

type SectionTitleFields = {
  navigationLogoName: string | null;
  navigationLogoSub: string | null;
  privacyPolicyContent: string | null;
  servicesSectionTitle: string | null;
  servicesSectionSub: string | null;
  pricingSectionTitle: string | null;
  pricingSectionSub: string | null;
  contactSectionTitle: string | null;
  contactSectionSub: string | null;
};

async function readSectionTitleFields(): Promise<SectionTitleFields> {
  try {
    const rows = await prisma.$queryRaw<Array<SectionTitleFields>>`
      SELECT
        "navigationLogoName",
        "navigationLogoSub",
        "privacyPolicyContent",
        "servicesSectionTitle",
        "servicesSectionSub",
        "pricingSectionTitle",
        "pricingSectionSub",
        "contactSectionTitle",
        "contactSectionSub"
      FROM "SiteSettings"
      ORDER BY "createdAt" ASC
      LIMIT 1
    `;

    if (rows.length > 0) {
      return rows[0];
    }
  } catch {
    // If migration/client state is temporarily out of sync, keep settings page usable.
  }

  return {
    navigationLogoName: null,
    navigationLogoSub: null,
    privacyPolicyContent: null,
    servicesSectionTitle: null,
    servicesSectionSub: null,
    pricingSectionTitle: null,
    pricingSectionSub: null,
    contactSectionTitle: null,
    contactSectionSub: null,
  };
}

async function writeSectionTitleFields(id: string, data: {
  navigationLogoName?: string | null;
  navigationLogoSub?: string | null;
  privacyPolicyContent?: string | null;
  servicesSectionTitle?: string | null;
  servicesSectionSub?: string | null;
  pricingSectionTitle?: string | null;
  pricingSectionSub?: string | null;
  contactSectionTitle?: string | null;
  contactSectionSub?: string | null;
}) {
  try {
    await prisma.$executeRaw`
      UPDATE "SiteSettings"
      SET
        "navigationLogoName" = ${data.navigationLogoName ?? null},
        "navigationLogoSub" = ${data.navigationLogoSub ?? null},
        "privacyPolicyContent" = ${data.privacyPolicyContent ?? null},
        "servicesSectionTitle" = ${data.servicesSectionTitle ?? null},
        "servicesSectionSub" = ${data.servicesSectionSub ?? null},
        "pricingSectionTitle" = ${data.pricingSectionTitle ?? null},
        "pricingSectionSub" = ${data.pricingSectionSub ?? null},
        "contactSectionTitle" = ${data.contactSectionTitle ?? null},
        "contactSectionSub" = ${data.contactSectionSub ?? null}
      WHERE "id" = ${id}
    `;
  } catch {
    // Keep base settings save flow working even if these columns are not available yet.
  }
}

export async function getSettings() {
  const [settings, sectionFields] = await Promise.all([
    prisma.siteSettings.findFirst(),
    readSectionTitleFields(),
  ]);

  if (!settings) {
    return null;
  }

  return {
    ...settings,
    ...sectionFields,
  };
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
}) {
  const existing = await prisma.siteSettings.findFirst();

  if (existing) {
    const updated = await prisma.siteSettings.update({
      where: { id: existing.id },
      data: {
        salonName: data.salonName,
        tagline: data.tagline,
        heroCtaLabel: data.heroCtaLabel,
        heroCtaUrl: data.heroCtaUrl,
        ...(data.logo ? { logo: data.logo } : {}),
      },
    });

    await writeSectionTitleFields(existing.id, data);
    return updated;
  }

  const created = await prisma.siteSettings.create({
    data: {
      salonName: data.salonName,
      tagline: data.tagline,
      heroCtaLabel: data.heroCtaLabel,
      heroCtaUrl: data.heroCtaUrl,
      logo: data.logo,
    },
  });

  await writeSectionTitleFields(created.id, data);
  return created;
}
