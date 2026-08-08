import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Pricing } from "@/components/sections/Pricing";
import { GalleryPreview } from "@/components/sections/GalleryPreview";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Pricing />
      <GalleryPreview />
      <Contact />
    </>
  );
}
