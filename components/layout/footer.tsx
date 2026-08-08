import Link from "next/link";
import styles from "./footer.module.scss";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.columns}>
          <div>
            <p className={styles.brand}>Balance</p>
            <p className={styles.note}>Kadeřnické studio pro moderní střih, barvu a péči o vlasy.</p>
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
