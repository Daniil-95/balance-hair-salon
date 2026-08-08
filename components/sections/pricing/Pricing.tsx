import Link from "next/link";
import { SectionTitle } from "@/components/ui/section-title";
import styles from "./pricing.module.scss";

const pricingItems = [
  { label: "Dámské střihy", value: "620 Kč" },
  { label: "Pánské střihy", value: "450 Kč" },
  { label: "Barvení vlasů", value: "od 1 150 Kč" },
  { label: "Melír / balayage", value: "od 1 650 Kč" },
  { label: "Styling", value: "od 450 Kč" }
];

export function Pricing() {
  return (
    <section id="pricing" className={styles.pricing}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.card}>
            <SectionTitle
              label="Ceník"
              title="Vybrané ceny pro rychlou orientaci"
              description="Nabízíme transparentní ceny pro základní střihy, barvení a styling. Pro kompletní ceník nás kontaktujte."
            />
            <ul className={styles.list}>
              {pricingItems.map((item) => (
                <li key={item.label} className={styles.item}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.ctaBlock}>
            <p className={styles.ctaLabel}>Kompletní ceník najdete v naší nabídce.</p>
            <Link href="/#contact" className={styles.ctaButton}>
              Zobrazit celý ceník
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
