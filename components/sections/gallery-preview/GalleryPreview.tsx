"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { Fancybox } from "@fancyapps/ui";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { SectionTitle } from "@/components/ui/section-title";
import { publicGalleryItems } from "@/lib/public-gallery";
import styles from "./gallery-preview.module.scss";

import "swiper/css";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

export function GalleryPreview() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

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
  }, []);

  return (
    <section id="gallery" className={styles.gallery} ref={containerRef}>
      <div className="container">
        <SectionTitle
          label="Galerie"
          title="Galerie, která zachycuje atmosféru salonu Balance."
        />
        <div className={styles.carousel}>
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
            {publicGalleryItems.map((item) => (
              <SwiperSlide key={item.title} className={styles.slide}>
                <a
                  href={item.src}
                  className={styles.previewCard}
                  data-fancybox="gallery-preview"
                  data-caption={`${item.title} - ${item.description}`}
                  aria-label={item.title}
                >
                  <div className={styles.previewImage}>
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
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
        <div className={styles.actions}>
          <Link href="/gallery" className={styles.button}>
            Zobrazit celou galerii
          </Link>
        </div>
      </div>
    </section>
  );
}
