import { Hero } from "@/components/sections/hero/Hero";
import { About } from "@/components/sections/about/About";
import { Services } from "@/components/sections/services/Services";
import { Pricing } from "@/components/sections/pricing/Pricing";
import { GalleryPreview } from "@/components/sections/gallery-preview/GalleryPreview";
import { Contact } from "@/components/sections/contact/Contact";
import { SiteShell } from "@/components/layout/site-shell";
import { getPublicAbout, getPublicContact, getPublicGallery, getPublicHero, getPublicPricing, getPublicServices, getPublicSettings } from "@/lib/public-content";

export const revalidate = 0;

export default async function HomePage() {
  const [heroData, aboutData, servicesData, pricingData, galleryData, contactData, settingsData] = await Promise.all([
    getPublicHero(),
    getPublicAbout(),
    getPublicServices(),
    getPublicPricing(),
    getPublicGallery(),
    getPublicContact(),
    getPublicSettings(),
  ]);

  return (
    <SiteShell
      headerBrandName={settingsData?.salonName}
      headerBrandSub={settingsData?.tagline ?? undefined}
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
