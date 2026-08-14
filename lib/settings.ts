import { prisma } from "@/lib/prisma";

type ContactCardFields = {
  contactCardTitle: string | null;
  contactCardDescription: string | null;
};

async function readContactCardFields(): Promise<ContactCardFields> {
  try {
    const rows = await prisma.$queryRaw<Array<ContactCardFields>>`
      SELECT
        "contactCardTitle",
        "contactCardDescription"
      FROM "SiteSettings"
      ORDER BY "updatedAt" DESC
      LIMIT 1
    `;

    if (rows.length > 0) {
      return rows[0];
    }
  } catch {
    // Keep settings usable even when DB schema/client are temporarily out of sync.
  }

  return {
    contactCardTitle: null,
    contactCardDescription: null,
  };
}

export async function getSettings() {
  const [settings, contactCardFields] = await Promise.all([
    prisma.siteSettings.findFirst({ orderBy: { updatedAt: "desc" } }),
    readContactCardFields(),
  ]);

  if (!settings) {
    return null;
  }

  return {
    ...settings,
    ...contactCardFields,
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
  contactCardTitle?: string | null;
  contactCardDescription?: string | null;
}) {
  const existing = await prisma.siteSettings.findFirst({ orderBy: { updatedAt: "desc" } });

  if (existing) {
    const updated = await prisma.siteSettings.update({
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
      },
    });

    if (Object.prototype.hasOwnProperty.call(data, "contactCardTitle") || Object.prototype.hasOwnProperty.call(data, "contactCardDescription")) {
      try {
        await prisma.$executeRaw`
          UPDATE "SiteSettings"
          SET
            "contactCardTitle" = ${data.contactCardTitle ?? null},
            "contactCardDescription" = ${data.contactCardDescription ?? null}
          WHERE "id" = ${existing.id}
        `;
      } catch {
        // Keep base settings save flow functional even if these columns are not present yet.
      }
    }

    return updated;
  }

  const created = await prisma.siteSettings.create({
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
    },
  });

  if (Object.prototype.hasOwnProperty.call(data, "contactCardTitle") || Object.prototype.hasOwnProperty.call(data, "contactCardDescription")) {
    try {
      await prisma.$executeRaw`
        UPDATE "SiteSettings"
        SET
          "contactCardTitle" = ${data.contactCardTitle ?? null},
          "contactCardDescription" = ${data.contactCardDescription ?? null}
        WHERE "id" = ${created.id}
      `;
    } catch {
      // Keep base settings save flow functional even if these columns are not present yet.
    }
  }

  return created;
}
