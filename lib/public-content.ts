import { getAbout } from "@/lib/about";
import { getContactAndHours } from "@/lib/contact";
import { getGalleryImages } from "@/lib/gallery";
import { getHero, getHeroMeta } from "@/lib/hero";
import { getPriceCategories } from "@/lib/prices";
import { getServices } from "@/lib/services";
import { getSettings } from "@/lib/settings";
import { publicGalleryItems } from "@/lib/public-gallery";
import { publicPriceColumns } from "@/lib/public-pricing";

export const fallbackServices = [
  { id: "women", title: "Dámské střihy", description: "Střihy a styling na míru", icon: "women" },
  { id: "men", title: "Pánské střihy", description: "Čistý a přesný tvar", icon: "men" },
  { id: "kids", title: "Dětské střihy", description: "Citlivý přístup", icon: "kids" },
  { id: "color", title: "Barvení vlasů", description: "Od tónování po změnu odstínu", icon: "color" },
  { id: "balayage", title: "Melír / balayage", description: "Jemné přechody a světlo", icon: "balayage" },
  { id: "care", title: "Regenerační péče", description: "Obnova kvality vlasů", icon: "care" },
  { id: "styling", title: "Styling", description: "Foukání a finální úprava", icon: "styling" }
];

export const fallbackOpeningHours = [
  { day: "Pondělí", open: "9:00", close: "18:00", isClosed: false },
  { day: "Úterý", open: "9:00", close: "18:00", isClosed: false },
  { day: "Středa", open: "9:00", close: "18:00", isClosed: false },
  { day: "Čtvrtek", open: "9:00", close: "18:00", isClosed: false },
  { day: "Pátek", open: "9:00", close: "19:00", isClosed: false },
  { day: "Sobota", open: "dle objednání", close: "", isClosed: false },
  { day: "Neděle", open: "", close: "", isClosed: true }
];

export const fallbackHero = {
  headline: "BALANCE",
  subheadline: "Váš styl. Naše péče.",
  ctaLabel: "Objednat termín online",
  ctaUrl: "https://tiarasro.snippet.myfox.cz/",
  imageSrc: "/images/image.png",
  imageAlt: "Interiér kadeřnického salonu",
  overline: "Kadeřnické studio",
  instagramUrl: "https://www.instagram.com/balance.kadernictvi",
  whatsappLabel: "WhatsApp",
  whatsappUrl: "",
  instagramLabel: "Instagram",
  openingHoursLabel: "Po–Pá 9:00–19:00"
};

export const fallbackAbout = {
  overline: "O nás",
  title: "Vítejte v Balance kadeřnickém studiu.",
  paragraphs: [
    "Spojujeme profesionální péči, moderní techniky a kvalitní produkty, abychom zvýraznili vaši přirozenou krásu. Ke každému klientovi přistupujeme individuálně a s maximální péčí.",
    "Naše práce je založená na detailu, náladě a výsledném pocitu sebevědomí. Rádi vytvoříme střih, barvu i styling, který bude přesně odpovídat vašemu stylu."
  ],
  imageMainSrc: "/images/image.png",
  imageMainAlt: "Interiér kadeřnického studia Balance",
  imageCutawaySrc: "/images/image.png",
  imageCutawayAlt: "Detail salonu Balance"
};

function splitParagraphs(value?: string | null) {
  if (!value) return [];
  return value
    .split(/\n{2,}|\r\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function normalizeUploadedImage(image?: string | null) {
  if (!image) return null;
  return image.startsWith("/") ? image : `/uploads/${image}`;
}

export async function getPublicServices() {
  const services = await getServices();
  return services.length > 0 ? services : fallbackServices;
}

export async function getPublicPricing() {
  const categories = await getPriceCategories();

  if (categories.length === 0) {
    return publicPriceColumns;
  }

  return categories.map((category) => ({
    title: category.name,
    items: category.items.map((item) => ({
      label: item.title,
      value: item.price,
    })),
  }));
}

export async function getPublicGallery() {
  const images = await getGalleryImages();

  if (images.length === 0) {
    return publicGalleryItems;
  }

  return images.map((image, index) => ({
    title: image.title,
    label: image.category.name,
    description: image.category.name,
    position: index % 2 === 0 ? "center center" : "center top",
    src: `/uploads/${image.filename}`,
    alt: image.alt,
  }));
}

export async function getPublicContact() {
  const { contact, openingHours } = await getContactAndHours();

  return {
    contact,
    openingHours: openingHours.length > 0 ? openingHours : fallbackOpeningHours,
  };
}

export async function getPublicSettings() {
  const settings = await getSettings();
  return settings;
}

export async function getPublicHero() {
  const [hero, settings, heroMeta] = await Promise.all([getHero(), getSettings(), getHeroMeta()]);

  return {
    headline: hero?.headline || settings?.salonName || fallbackHero.headline,
    subheadline: hero?.subheadline || settings?.tagline || fallbackHero.subheadline,
    ctaLabel: hero?.ctaLabel || settings?.heroCtaLabel || fallbackHero.ctaLabel,
    ctaUrl: hero?.ctaUrl || settings?.heroCtaUrl || fallbackHero.ctaUrl,
    imageSrc: normalizeUploadedImage(hero?.image) || fallbackHero.imageSrc,
    imageAlt: heroMeta.imageAlt || fallbackHero.imageAlt,
    overline: heroMeta.overline || fallbackHero.overline,
    instagramUrl: heroMeta.instagramUrl || fallbackHero.instagramUrl,
    whatsappLabel: heroMeta.whatsappLabel || fallbackHero.whatsappLabel,
    whatsappUrl: heroMeta.whatsappUrl || fallbackHero.whatsappUrl,
    instagramLabel: heroMeta.instagramLabel || fallbackHero.instagramLabel,
    openingHoursLabel: heroMeta.openingHoursLabel || fallbackHero.openingHoursLabel
  };
}

export async function getPublicAbout() {
  const about = await getAbout();

  const paragraphs = [
    ...splitParagraphs(about?.description),
    ...splitParagraphs(about?.highlights),
  ].slice(0, 2);

  return {
    overline: fallbackAbout.overline,
    title: about?.title || fallbackAbout.title,
    paragraphs: paragraphs.length > 0 ? paragraphs : fallbackAbout.paragraphs,
    imageMainSrc: normalizeUploadedImage(about?.image) || fallbackAbout.imageMainSrc,
    imageMainAlt: fallbackAbout.imageMainAlt,
    imageCutawaySrc: normalizeUploadedImage(about?.image) || fallbackAbout.imageCutawaySrc,
    imageCutawayAlt: fallbackAbout.imageCutawayAlt
  };
}
