import { getAbout, getAboutMeta } from "@/lib/about";
import { getContactAndHours } from "@/lib/contact";
import { getGalleryImages } from "@/lib/gallery";
import { getHero, getHeroMeta } from "@/lib/hero";
import { getPriceCategories } from "@/lib/prices";
import { getServices } from "@/lib/services";
import { getSettings } from "@/lib/settings";

const HERO_DEFAULT_IMAGE_SRC = "/images/image.png";

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
  return getServices();
}

export async function getPublicPricing() {
  const categories = await getPriceCategories();

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
    openingHours,
  };
}

export async function getPublicSettings() {
  const settings = await getSettings();
  return settings;
}

export async function getPublicHero() {
  const [hero, settings, heroMeta] = await Promise.all([getHero(), getSettings(), getHeroMeta()]);

  return {
    headline: hero?.headline || settings?.salonName || "",
    subheadline: hero?.subheadline || settings?.tagline || "",
    ctaLabel: hero?.ctaLabel || settings?.heroCtaLabel || "",
    ctaUrl: hero?.ctaUrl || settings?.heroCtaUrl || "",
    imageSrc: normalizeUploadedImage(hero?.image) || HERO_DEFAULT_IMAGE_SRC,
    imageAlt: heroMeta.imageAlt || "",
    overline: heroMeta.overline || "",
    instagramUrl: heroMeta.instagramUrl || null,
    whatsappLabel: heroMeta.whatsappLabel || "",
    whatsappUrl: heroMeta.whatsappUrl || null,
    instagramLabel: heroMeta.instagramLabel || "",
    openingHoursLabel: heroMeta.openingHoursLabel || "",
    metaRowLeftLabel: heroMeta.metaRowLeftLabel || "",
    metaRowCenterLabel: heroMeta.metaRowCenterLabel || heroMeta.openingHoursLabel || "",
    metaRowRightLabel: heroMeta.metaRowRightLabel || "",
  };
}

export async function getPublicAbout() {
  const [about, aboutMeta] = await Promise.all([getAbout(), getAboutMeta()]);

  return {
    overline: aboutMeta.overline || "",
    title: about?.title || "",
    paragraphs: [
      ...splitParagraphs(about?.description),
      ...splitParagraphs(aboutMeta.secondParagraph),
    ].slice(0, 2),
    imageMainSrc: normalizeUploadedImage(about?.image),
    imageMainAlt: aboutMeta.imageMainAlt || "",
    imageCutawaySrc: normalizeUploadedImage(aboutMeta.secondaryImage),
    imageCutawayAlt: aboutMeta.imageCutawayAlt || ""
  };
}
