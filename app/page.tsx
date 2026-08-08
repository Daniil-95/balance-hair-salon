import { Hero } from "@/components/sections/hero/Hero";
import { About } from "@/components/sections/about/About";
import { Services } from "@/components/sections/services/Services";
import { Pricing } from "@/components/sections/pricing/Pricing";
import { GalleryPreview } from "@/components/sections/gallery-preview/GalleryPreview";
import { Contact } from "@/components/sections/contact/Contact";
import { SiteShell } from "@/components/layout/site-shell";

export default function HomePage() {
  return (
    <SiteShell>
      <Hero />
      <About />
      <Services />
      <Pricing />
      <GalleryPreview />
      <Contact />
    </SiteShell>
  );
}
