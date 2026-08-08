import Link from "next/link";
import { SectionTitle } from "@/components/ui/section-title";
import styles from "./pricing.module.scss";

const priceColumns = [
  {
    title: "Dámské střihy",
    items: [
      { label: "Střih", value: "620 Kč" },
      { label: "Střih + foukaná", value: "760 Kč" },
      { label: "Foukaná", value: "450 Kč" }
    ]
  },
  {
    title: "Barvení",
    items: [
      { label: "Barva odrosty", value: "990 Kč" },
      { label: "Kompletní barvení", value: "1 350 Kč" },
      { label: "Tónování", value: "850 Kč" }
    ]
  },
  {
    title: "Pánské střihy",
    items: [
      { label: "Střih", value: "450 Kč" },
      { label: "Střih + úprava vousů", value: "600 Kč" }
    ]
  }
];

export function Pricing() {
  return (
    <section id="pricing" className={styles.pricing}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.sheet}>
            <div className={styles.sheetHeader}>
              <span>BALANCE</span>
              <strong>Kadeřnické studio</strong>
            </div>
            <div className={styles.sheetGrid}>
              {priceColumns.map((column) => (
                <div key={column.title} className={styles.sheetColumn}>
                  <h3>{column.title}</h3>
                  <ul>
                    {column.items.map((item) => (
                      <li key={item.label}>
                        <span>{item.label}</span>
                        <strong>{item.value}</strong>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.ctaBlock}>
            <SectionTitle
              label="Ceník"
              title="Kompletní ceník si můžete zobrazit ve větším náhledu."
              description="Pro přesnou cenu doporučujeme rezervaci termínu nebo rychlý kontakt přes telefon či WhatsApp."
              className={styles.ctaSectionTitle}
            />
            <Link href="/#contact" className={styles.ctaButton}>
              Zobrazit celý ceník
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
