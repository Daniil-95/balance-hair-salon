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
            <a href="/privacy-policy">Ochrana osobních údajů</a>
            <a href="/#contact">Kontakt</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
