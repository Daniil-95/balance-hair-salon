import Image from "next/image";
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
  const [firstParagraph = "", secondParagraph = ""] = paragraphs;

  return (
    <section id="about" className={styles.about}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.content}>
            <span className={styles.overline}>{overline}</span>
            <h2>{title}</h2>
            <p>{firstParagraph}</p>
            <p>{secondParagraph}</p>
          </div>
          <div className={styles.imageWrapper}>
            <div className={styles.imageMain}>
              {imageMainSrc ? (
                <Image
                  src={imageMainSrc}
                  alt={imageMainAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={styles.imageFill}
                  style={{ objectFit: "cover", objectPosition: "center left" }}
                />
              ) : null}
            </div>
            <div className={styles.imageCutaway}>
              {imageCutawaySrc ? (
                <Image
                  src={imageCutawaySrc}
                  alt={imageCutawayAlt}
                  fill
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
