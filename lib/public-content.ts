import { getContactAndHours } from "@/lib/contact";
import { getGalleryImages } from "@/lib/gallery";
import { getPriceCategories } from "@/lib/prices";
import { getServices } from "@/lib/services";
import { getSettings } from "@/lib/settings";
import { publicGalleryItems } from "@/lib/public-gallery";
import { publicPriceColumns } from "@/lib/public-pricing";

export async function getPublicServices() {
  const services = await getServices();
  return services;
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
    openingHours,
  };
}

export async function getPublicSettings() {
  const settings = await getSettings();
  return settings;
}
