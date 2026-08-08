import Link from "next/link";
import styles from "./footer.module.scss";

interface FooterProps {
  brandName?: string;
  note?: string;
}

export function Footer({ brandName = "Balance", note = "Kadeřnické studio pro moderní střih, barvu a péči o vlasy." }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.columns}>
          <div>
            <p className={styles.brand}>{brandName}</p>
            <p className={styles.note}>{note}</p>
          </div>

          <div className={styles.links}>
            <span>© 2024 Balance kadeřnické studio. Všechna práva vyhrazena.</span>
            <Link href="/privacy-policy">Ochrana osobních údajů</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
