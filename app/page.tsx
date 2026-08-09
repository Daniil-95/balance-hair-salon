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
      headerBrandName={settingsData?.salonName || "Balance"}
      headerBrandSub={settingsData?.tagline || "Kadeřnické studio"}
      headerCtaLabel={settingsData?.heroCtaLabel || "Objednat se online"}
      headerCtaUrl={settingsData?.heroCtaUrl || "https://tiarasro.snippet.myfox.cz/"}
      footerBrandName={settingsData?.salonName || "Balance"}
      footerNote={settingsData?.tagline || "Kadeřnické studio pro moderní střih, barvu a péči o vlasy."}
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
        openingHoursLabel={heroData.openingHoursLabel}
        contactWhatsapp={contactData.contact?.whatsapp ?? null}
        contactAddress={contactData.contact?.address || "Čenkov 93"}
        contactPhone={contactData.contact?.phone || "+420 603 561 625"}
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
      <Services services={servicesData} />
      <Pricing categories={pricingData} />
      <GalleryPreview items={galleryData} />
      <Contact contact={contactData.contact} openingHours={contactData.openingHours} />
    </SiteShell>
  );
}
