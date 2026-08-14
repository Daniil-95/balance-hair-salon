import { Gallery } from "@/components/sections/gallery/Gallery";
import { SiteShell } from "@/components/layout/site-shell";
import { getPublicGallery, getPublicSettings } from "@/lib/public-content";

export const revalidate = 300;

export default async function GalleryPage() {
  const [galleryItems, settings] = await Promise.all([getPublicGallery(), getPublicSettings()]);

  return (
    <SiteShell
      headerBrandName={settings?.navigationLogoName ?? undefined}
      headerBrandSub={settings?.navigationLogoSub ?? undefined}
      headerCtaLabel={settings?.heroCtaLabel ?? undefined}
      headerCtaUrl={settings?.heroCtaUrl ?? undefined}
      footerBrandName={settings?.salonName}
      footerNote={settings?.tagline ?? undefined}
    >
      <Gallery items={galleryItems} />
    </SiteShell>
  );
}
