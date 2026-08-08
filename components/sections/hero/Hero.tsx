import Image from "next/image";
import styles from "./hero.module.scss";

export function Hero() {
  return (
    <section id="home" className={styles.hero}>
      <div className={styles.imageWrapper}>
        <Image
          src="/images/image.png"
          alt="Salon interior"
          fill
          priority
          className={styles.backgroundImage}
        />
        <div className={styles.overlay} />
      </div>

      <div className="container">
        <div className={styles.inner}>
          <div className={styles.copy}>
            <span className={styles.overline}>Kadeřnické studio</span>
            <h1 className={styles.title}>BALANCE</h1>
            <p className={styles.subtitle}>Váš styl. Naše péče.</p>
            <div className={styles.actions}>
              <a href="/#contact" className={styles.primary}>
                Objednat se online
              </a>
              <a href="https://wa.me/420603561625" target="_blank" rel="noreferrer" className={styles.secondary}>
                WhatsApp
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className={styles.secondary}>
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
