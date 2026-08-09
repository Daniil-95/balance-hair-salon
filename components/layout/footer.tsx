import Link from "next/link";
import { NAV_ITEMS } from "@/lib/constants";
import styles from "./footer.module.scss";

interface FooterProps {
  brandName?: string;
  note?: string;
}

export function Footer({ brandName, note }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.surface}>
          <div className={styles.topRow}>
            <div className={styles.identity}>
              <p className={styles.brand}>{brandName || ""}</p>
              {note ? <p className={styles.note}>{note}</p> : null}
            </div>

            <nav className={styles.quickNav} aria-label="Rychlá navigace">
              {NAV_ITEMS.map((item) => (
                <a key={item.href} href={item.href} className={styles.navLink}>
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div className={styles.bottomRow}>
            <span className={styles.copy}>© {currentYear} {brandName || "Balance"}. Všechna práva vyhrazena.</span>
            <div className={styles.metaLinks}>
              <Link href="/privacy-policy" className={styles.metaLink}>Ochrana osobních údajů</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
