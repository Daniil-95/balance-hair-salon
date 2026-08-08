import { Gallery } from "@/components/sections/gallery/Gallery";
import { SiteShell } from "@/components/layout/site-shell";
import { getPublicGallery } from "@/lib/public-content";

export default async function GalleryPage() {
  const galleryItems = await getPublicGallery();

  return (
    <SiteShell>
      <Gallery items={galleryItems} />
    </SiteShell>
  );
}
