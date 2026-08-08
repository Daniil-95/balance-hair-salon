import Link from "next/link";
import Image from "next/image";
import { SectionTitle } from "@/components/ui/section-title";
import styles from "./gallery-preview.module.scss";

const galleryItems = [
  { title: "Recepce", label: "Balance", position: "left center" },
  { title: "Přípravna", label: "Interiér", position: "center center" },
  { title: "Logo stěna", label: "Balance", position: "center left" },
  { title: "Zrcadla", label: "Studio", position: "right center" },
  { title: "Detail", label: "Atmosféra", position: "center right" }
];

export function GalleryPreview() {
  return (
    <section id="gallery" className={styles.gallery}>
      <div className="container">
        <SectionTitle
          label="Galerie"
          title="Galerie, která zachycuje atmosféru salonu Balance."
          description="Prohlédněte si ukázky interiéru, detailů a celkové nálady salonu."
        />
        <div className={styles.previewGrid}>
          {galleryItems.map((item) => (
            <article key={item.title} className={styles.previewCard}>
              <div className={styles.previewImage}>
                <Image
                  src="/images/image.png"
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 20vw"
                  className={styles.previewFill}
                  style={{ objectFit: "cover", objectPosition: item.position }}
                />
              </div>
              <div className={styles.previewMeta}>
                <strong>{item.title}</strong>
                <span>{item.label}</span>
              </div>
            </article>
          ))}
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
