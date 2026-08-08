import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { publicPriceColumns } from "@/lib/public-pricing";
import styles from "./pricing-page.module.scss";

export default function PricingPage() {
  return (
    <SiteShell>
      <section className={styles.pricingPage}>
        <div className="container">
          <header className={styles.header}>
            <p className={styles.label}>Ceník</p>
            <h1 className={styles.title}>Kompletní přehled služeb a cen</h1>
            <p className={styles.description}>Ceny se mohou lišit podle délky a hustoty vlasů. Rádi vám doporučíme přesnou variantu při rezervaci.</p>
          </header>

          <div className={styles.grid}>
            {publicPriceColumns.map((category) => (
              <article key={category.title} className={styles.card}>
                <h2>{category.title}</h2>
                <ul>
                  {category.items.map((item) => (
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

          <div className={styles.footerAction}>
            <Link href="/#contact" className={styles.bookButton}>
              Rezervovat termín
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
