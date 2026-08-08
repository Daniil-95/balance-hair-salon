"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Fancybox } from "@fancyapps/ui";
import styles from "./gallery.module.scss";

import "@fancyapps/ui/dist/fancybox/fancybox.css";

interface GalleryItem {
  title: string;
  description: string;
  position: string;
  src: string;
  alt: string;
}

interface GalleryProps {
  items: GalleryItem[];
}

export function Gallery({ items }: GalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    Fancybox.bind(container, '[data-fancybox="gallery-page"]', {
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
    <div className={styles.galleryPage} ref={containerRef}>
      <div className="container">
        <section className={styles.hero}>
          <p className={styles.overline}>Galerie</p>
          <h1 className={styles.heroTitle}>Naše práce v detailu</h1>
          <p className={styles.heroCopy}>Prohlédněte si kompletní ukázku stylingů, interiéru a práce našeho týmu.</p>
        </section>
        <div className={styles.grid}>
          {items.map((image, index) => (
            <a
              key={`${image.title}-${index}`}
              href={image.src}
              className={styles.card}
              aria-label={image.alt}
              data-fancybox="gallery-page"
              data-caption={`${image.title} - ${image.description}`}
            >
              <div className={styles.media}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw"
                  className={styles.mediaImage}
                  style={{ objectFit: "cover", objectPosition: image.position }}
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
