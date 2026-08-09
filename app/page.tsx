import { Hero } from "@/components/sections/hero/Hero";
import { About } from "@/components/sections/about/About";
import { Services } from "@/components/sections/services/Services";
import { Pricing } from "@/components/sections/pricing/Pricing";
import { GalleryPreview } from "@/components/sections/gallery-preview/GalleryPreview";
import { Contact } from "@/components/sections/contact/Contact";
import { SiteShell } from "@/components/layout/site-shell";
import { getPublicContact, getPublicGallery, getPublicPricing, getPublicServices, getPublicSettings } from "@/lib/public-content";

export const revalidate = 0;

const fallbackServices = [
  { id: "women", title: "Dámské střihy", description: "Střihy a styling na míru", icon: "women" },
  { id: "men", title: "Pánské střihy", description: "Čistý a přesný tvar", icon: "men" },
  { id: "kids", title: "Dětské střihy", description: "Citlivý přístup", icon: "kids" },
  { id: "color", title: "Barvení vlasů", description: "Od tónování po změnu odstínu", icon: "color" },
  { id: "balayage", title: "Melír / balayage", description: "Jemné přechody a světlo", icon: "balayage" },
  { id: "care", title: "Regenerační péče", description: "Obnova kvality vlasů", icon: "care" },
  { id: "styling", title: "Styling", description: "Foukání a finální úprava", icon: "styling" }
];

const fallbackHours = [
  { day: "Pondělí", open: "9:00", close: "18:00", isClosed: false },
  { day: "Úterý", open: "9:00", close: "18:00", isClosed: false },
  { day: "Středa", open: "9:00", close: "18:00", isClosed: false },
  { day: "Čtvrtek", open: "9:00", close: "18:00", isClosed: false },
  { day: "Pátek", open: "9:00", close: "19:00", isClosed: false },
  { day: "Sobota", open: "dle objednání", close: "", isClosed: false },
  { day: "Neděle", open: "", close: "", isClosed: true }
];

export default async function HomePage() {
  const [servicesData, pricingData, galleryData, contactData, settingsData] = await Promise.all([
    getPublicServices(),
    getPublicPricing(),
    getPublicGallery(),
    getPublicContact(),
    getPublicSettings(),
  ]);

  const services = servicesData.length > 0 ? servicesData : fallbackServices;
  const openingHours = contactData.openingHours.length > 0 ? contactData.openingHours : fallbackHours;

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
        salonName={settingsData?.salonName || "BALANCE"}
        tagline={settingsData?.tagline || "Váš styl. Naše péče."}
        ctaLabel={settingsData?.heroCtaLabel || "Objednat termín online"}
        ctaUrl={settingsData?.heroCtaUrl || "https://tiarasro.snippet.myfox.cz/"}
        contactAddress={contactData.contact?.address || "Čenkov 93"}
        contactPhone={contactData.contact?.phone || "+420 603 561 625"}
      />
      <About />
      <Services services={services} />
      <Pricing categories={pricingData} />
      <GalleryPreview items={galleryData} />
      <Contact contact={contactData.contact} openingHours={openingHours} />
    </SiteShell>
  );
}
