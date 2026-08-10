"use client";

import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import styles from "./about.module.scss";

interface AboutProps {
  overline: string;
  title: string;
  paragraphs: string[];
  imageMainSrc: string | null;
  imageMainAlt: string;
  imageCutawaySrc: string | null;
  imageCutawayAlt: string;
}

export function About({
  overline,
  title,
  paragraphs,
  imageMainSrc,
  imageMainAlt,
  imageCutawaySrc,
  imageCutawayAlt
}: AboutProps) {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();
  const [firstParagraph = "", secondParagraph = ""] = paragraphs;

  return (
    <section id="about" ref={ref} className={`${styles.about} scroll-reveal-section ${isVisible ? "is-visible" : ""}`}>
      <div className="container">
        <div className={styles.grid}>
          <div className={`${styles.content} lux-reveal-left`}>
            <span className={styles.overline}>{overline}</span>
            <h2>{title}</h2>
            <p>{firstParagraph}</p>
            <p>{secondParagraph}</p>
          </div>
          <div className={`${styles.imageWrapper} lux-reveal-right lux-delay-1`}>
            <div className={`${styles.imageMain} lux-glow-hover`}>
              {imageMainSrc ? (
                <Image
                  src={imageMainSrc}
                  alt={imageMainAlt}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={styles.imageFill}
                  style={{ objectFit: "cover", objectPosition: "center left" }}
                />
              ) : null}
            </div>
            <div className={`${styles.imageCutaway} lux-glow-hover`}>
              {imageCutawaySrc ? (
                <Image
                  src={imageCutawaySrc}
                  alt={imageCutawayAlt}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={styles.imageFill}
                  style={{ objectFit: "cover", objectPosition: "right center" }}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
