import Image from "next/image";
import styles from "./gallery-card.module.scss";

interface GalleryCardProps {
  title: string;
  alt: string;
  src: string;
  onClick?: () => void;
}

export function GalleryCard({ title, alt, src, onClick }: GalleryCardProps) {
  return (
    <article className={styles.card} onClick={onClick} role={onClick ? "button" : undefined}>
      <div className={styles.media}>
        <Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 33vw" />
      </div>
      <div className={styles.meta}>
        <h3>{title}</h3>
      </div>
    </article>
  );
}
