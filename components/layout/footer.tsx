import styles from "./footer.module.scss";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.columns}>
          <div>
            <p className={styles.brand}>Balance</p>
            <p className={styles.note}>Luxury hair studio for modern clients.</p>
          </div>

          <div className={styles.links}>
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/contact">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
