import { Hero } from "@/components/sections/hero/Hero";
import { About } from "@/components/sections/about/About";
import { Services } from "@/components/sections/services/Services";
import { Pricing } from "@/components/sections/pricing/Pricing";
import { GalleryPreview } from "@/components/sections/gallery-preview/GalleryPreview";
import { Contact } from "@/components/sections/contact/Contact";
import { SiteShell } from "@/components/layout/site-shell";
import { getPublicAbout, getPublicContact, getPublicGallery, getPublicHero, getPublicPricing, getPublicServices, getPublicSettings } from "@/lib/public-content";
import { logPrismaError } from "@/lib/prisma-errors";

export const revalidate = 0;

const fallbackHero = {
  headline: "Balance Hair Salon",
  subheadline: "Profesionální péče o vaše vlasy.",
  ctaLabel: "Objednat se",
  ctaUrl: "#contact",
  overline: "Kadeřnické studio",
  imageSrc: "/images/image.png",
  imageAlt: "Salon",
  instagramUrl: null as string | null,
  instagramLabel: "",
  whatsappLabel: "",
  whatsappUrl: null as string | null,
  openingHoursLabel: "",
  metaRowLeftLabel: "",
  metaRowCenterLabel: "",
  metaRowRightLabel: "",
};

const fallbackAbout = {
  overline: "",
  title: "",
  paragraphs: [] as string[],
  imageMainSrc: null as string | null,
  imageMainAlt: "",
  imageCutawaySrc: null as string | null,
  imageCutawayAlt: "",
};

const fallbackContact = {
  contact: null,
  openingHours: [] as Array<{ day: string; open: string; close: string; isClosed: boolean; order: number }>,
};

export default async function HomePage() {
  let heroData = fallbackHero;
  let aboutData = fallbackAbout;
  let servicesData: Awaited<ReturnType<typeof getPublicServices>> = [];
  let pricingData: Awaited<ReturnType<typeof getPublicPricing>> = [];
  let galleryData: Awaited<ReturnType<typeof getPublicGallery>> = [];
  let contactData = fallbackContact;
  let settingsData: Awaited<ReturnType<typeof getPublicSettings>> = null;

  try {
    [heroData, aboutData, servicesData, pricingData, galleryData, contactData, settingsData] = await Promise.all([
      getPublicHero(),
      getPublicAbout(),
      getPublicServices(),
      getPublicPricing(),
      getPublicGallery(),
      getPublicContact(),
      getPublicSettings(),
    ]);
  } catch (error) {
    logPrismaError(error, "GET /");
  }

  return (
    <SiteShell
      headerBrandName={settingsData?.navigationLogoName ?? settingsData?.salonName}
      headerBrandSub={settingsData?.navigationLogoSub ?? settingsData?.tagline ?? undefined}
      headerCtaLabel={settingsData?.heroCtaLabel ?? undefined}
      headerCtaUrl={settingsData?.heroCtaUrl ?? undefined}
      footerBrandName={settingsData?.salonName}
      footerNote={settingsData?.tagline ?? undefined}
    >
      <Hero
        salonName={heroData.headline}
        tagline={heroData.subheadline}
        ctaLabel={heroData.ctaLabel}
        ctaUrl={heroData.ctaUrl}
        overline={heroData.overline}
        heroImageSrc={heroData.imageSrc}
        heroImageAlt={heroData.imageAlt}
        instagramUrl={heroData.instagramUrl}
        instagramLabel={heroData.instagramLabel}
        whatsappLabel={heroData.whatsappLabel}
        whatsappUrl={heroData.whatsappUrl}
        openingHoursLabel={heroData.openingHoursLabel}
        metaRowLeftLabel={heroData.metaRowLeftLabel}
        metaRowCenterLabel={heroData.metaRowCenterLabel}
        metaRowRightLabel={heroData.metaRowRightLabel}
        contactWhatsapp={contactData.contact?.whatsapp ?? null}
        contactAddress={contactData.contact?.address ?? ""}
        contactPhone={contactData.contact?.phone ?? ""}
      />
      <About
        overline={aboutData.overline}
        title={aboutData.title}
        paragraphs={aboutData.paragraphs}
        imageMainSrc={aboutData.imageMainSrc}
        imageMainAlt={aboutData.imageMainAlt}
        imageCutawaySrc={aboutData.imageCutawaySrc}
        imageCutawayAlt={aboutData.imageCutawayAlt}
      />
      <Services
        services={servicesData}
        sectionTitle={settingsData?.servicesSectionTitle ?? undefined}
        sectionDescription={settingsData?.servicesSectionSub ?? undefined}
      />
      <Pricing
        categories={pricingData}
        sectionTitle={settingsData?.pricingSectionTitle ?? undefined}
        sectionDescription={settingsData?.pricingSectionSub ?? undefined}
      />
      <GalleryPreview items={galleryData} />
      <Contact
        contact={contactData.contact}
        openingHours={contactData.openingHours}
        instagramUrl={heroData.instagramUrl}
        sectionTitle={settingsData?.contactSectionTitle ?? undefined}
        sectionDescription={settingsData?.contactSectionSub ?? undefined}
      />
    </SiteShell>
  );
}
