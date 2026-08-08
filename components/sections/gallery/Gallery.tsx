import styles from "./gallery.module.scss";

const images = Array.from({ length: 12 }, (_, index) => ({
  title: `Galerie ${index + 1}`,
  alt: `Fotografie salonu ${index + 1}`
}));

export function Gallery() {
  return (
    <div className={styles.galleryPage}>
      <div className="container">
        <section className={styles.hero}>
          <p className={styles.overline}>Galerie</p>
          <h1 className={styles.heroTitle}>Naše práce v detailu</h1>
          <p className={styles.heroCopy}>Prohlédněte si kompletní ukázku stylingů, interiéru a práce našeho týmu.</p>
        </section>
        <div className={styles.grid}>
          {images.map((image) => (
            <article key={image.title} className={styles.card} aria-label={image.alt}>
              <div className={styles.media} />
              <p>{image.title}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
