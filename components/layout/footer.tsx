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
            <Link href="/privacy-policy">Ochrana osobních údajů</Link>
            <Link href="/#contact">Kontakt</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
