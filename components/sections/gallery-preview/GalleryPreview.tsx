import Link from "next/link";
import { SectionTitle } from "@/components/ui/section-title";
import styles from "./gallery-preview.module.scss";

const galleryItems = Array.from({ length: 4 }, (_, index) => ({
  title: `Ukázka salonu ${index + 1}`,
  label: `Stylová fotografie ${index + 1}`
}));

export function GalleryPreview() {
  return (
    <section id="gallery" className={styles.gallery}>
      <div className="container">
        <SectionTitle
          label="Galerie"
          title="Nahlédněte do našeho studia"
          description="Prohlédněte si ukázky našich stylingů, interiéru a atmosféry salonu."
        />
        <div className={styles.previewGrid}>
          {galleryItems.map((item) => (
            <article key={item.title} className={styles.previewCard}>
              <div className={styles.previewImage} />
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
