import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { getPublicPricing, getPublicSettings } from "@/lib/public-content";
import styles from "./pricing-page.module.scss";

export const revalidate = 300;

export default async function PricingPage() {
  const [categories, settings] = await Promise.all([getPublicPricing(), getPublicSettings()]);

  return (
    <SiteShell
      headerBrandName={settings?.navigationLogoName ?? undefined}
      headerBrandSub={settings?.navigationLogoSub ?? undefined}
      headerCtaLabel={settings?.heroCtaLabel ?? undefined}
      headerCtaUrl={settings?.heroCtaUrl ?? undefined}
      footerBrandName={settings?.salonName}
      footerNote={settings?.tagline ?? undefined}
    >
      <section className={styles.pricingPage}>
        <div className="container">
          <div className={styles.backAction}>
            <Link href="/" className={styles.backLink}>
              Zpět na hlavní stránku
            </Link>
          </div>

          <header className={styles.header}>
            <p className={styles.label}>Ceník</p>
            <h1 className={styles.title}>Kompletní přehled služeb a cen</h1>
            <p className={styles.description}>Ceny se mohou lišit podle délky a hustoty vlasů. Rádi vám doporučíme přesnou variantu při rezervaci.</p>
          </header>

          <div className={styles.grid}>
            {categories.map((category) => (
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
        </div>
      </section>
    </SiteShell>
  );
}
