"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { Fancybox } from "@fancyapps/ui";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { SectionTitle } from "@/components/ui/section-title";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import styles from "./gallery-preview.module.scss";

import "swiper/css";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

interface GalleryPreviewItem {
  title: string;
  description: string;
  position: string;
  src: string;
  alt: string;
}

interface GalleryPreviewProps {
  items: GalleryPreviewItem[];
}

export function GalleryPreview({ items }: GalleryPreviewProps) {
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>();

  useEffect(() => {
    const container = sectionRef.current;

    if (!container) {
      return;
    }

    Fancybox.bind(container, '[data-fancybox="gallery-preview"]', {
      Carousel: {
        infinite: true
      }
    });

    return () => {
      Fancybox.unbind(container);
      Fancybox.close();
    };
  }, [sectionRef]);

  return (
    <section id="gallery" className={`${styles.gallery} scroll-reveal-section ${isVisible ? "is-visible" : ""}`} ref={sectionRef}>
      <div className="container">
        <SectionTitle
          className="lux-reveal"
          label="Galerie"
          title="Galerie, která zachycuje atmosféru salonu Balance."
        />
        <div className={`${styles.carousel} lux-reveal lux-delay-1`}>
          <Swiper
            modules={[Autoplay]}
            loop
            speed={900}
            spaceBetween={16}
            slidesPerView={1.12}
            autoplay={{
              delay: 2600,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            breakpoints={{
              640: {
                slidesPerView: 2.15,
                spaceBetween: 18
              },
              960: {
                slidesPerView: 3.15,
                spaceBetween: 20
              },
              1280: {
                slidesPerView: 4.1,
                spaceBetween: 22
              }
            }}
          >
            {items.map((item) => (
              <SwiperSlide key={item.title} className={styles.slide}>
                <a
                  href={item.src}
                  className={`${styles.previewCard} lux-glow-hover`}
                  data-fancybox="gallery-preview"
                  data-caption={`${item.title} - ${item.description}`}
                  aria-label={item.title}
                >
                  <div className={styles.previewImage}>
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      unoptimized
                      sizes="(max-width: 639px) 88vw, (max-width: 959px) 46vw, (max-width: 1279px) 30vw, 23vw"
                      className={styles.previewFill}
                      style={{ objectFit: "cover", objectPosition: item.position }}
                    />
                  </div>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className={`${styles.actions} lux-reveal lux-delay-2`}>
          <Link href="/gallery" className={styles.button}>
            Zobrazit celou galerii
          </Link>
        </div>
      </div>
    </section>
  );
}
