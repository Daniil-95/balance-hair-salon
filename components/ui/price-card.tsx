import type { ReactNode } from "react";
import styles from "./price-card.module.scss";

interface PriceCardProps {
  title: string;
  price: string;
  description?: string;
  badge?: string;
}

export function PriceCard({ title, price, description, badge }: PriceCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <div>
          <h3>{title}</h3>
          {description ? <p>{description}</p> : null}
        </div>
        <span className={styles.price}>{price}</span>
      </div>
      {badge ? <span className={styles.badge}>{badge}</span> : null}
    </article>
  );
}
