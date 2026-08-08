import Link from "next/link";
import styles from "./pricing.module.scss";

interface PricingItem {
  label: string;
  value: string;
}

interface PricingCategory {
  title: string;
  items: PricingItem[];
}

interface PricingProps {
  categories: PricingCategory[];
}

export function Pricing({ categories }: PricingProps) {
  return (
    <section id="pricing" className={styles.pricing}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.preview}>
            <p className={styles.previewLabel}>Přehled služeb</p>
            <div className={styles.serviceGrid}>
              {categories.map((column) => (
                <article key={column.title} className={styles.serviceCard}>
                  <h3>{column.title}</h3>
                  <ul>
                    {column.items.map((item) => (
                      <li key={item.label}>
                        <span className={styles.itemLabel}>{item.label}</span>
                        <span className={styles.itemRule} aria-hidden="true" />
                        <strong>{item.value}</strong>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
          <aside className={styles.ctaBlock}>
            <p className={styles.ctaLabel}>Ceník</p>
            <h2 className={styles.ctaTitle}>Kompletní ceník si můžete zobrazit ve větším náhledu.</h2>
            <p className={styles.ctaText}>Pro přesnou cenu doporučujeme rezervaci termínu nebo rychlý kontakt přes telefon či WhatsApp.</p>
            <Link href="/pricing" className={styles.ctaButton}>
              Zobrazit celý ceník
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}
