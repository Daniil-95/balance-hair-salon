import Image from "next/image";
import Link from "next/link";
import styles from "./hero.module.scss";

export function Hero() {
  return (
    <section id="home" className={styles.hero}>
      <div className={styles.imageWrapper} aria-hidden="true">
        <Image
          src="/images/image.png"
          alt="Interiér kadeřnického salonu"
          fill
          priority
          sizes="100vw"
          className={styles.backgroundImage}
          style={{ objectFit: "cover", objectPosition: "center center" }}
        />
        <div className={styles.overlay} />
        <div className={styles.texture} />
      </div>

      <div className="container">
        <div className={styles.inner}>
          <div className={styles.leftBrand}>
            <span className={styles.leftBrandName}>Balance</span>
            <span className={styles.leftBrandSub}>Kadeřnické studio</span>
          </div>

          <div className={styles.copy}>
            <span className={styles.overline}>Kadeřnické studio</span>
            <h1 className={styles.title}>BALANCE</h1>
            <p className={styles.subtitle}>Váš styl. Naše péče.</p>
            <p className={styles.lead}>
              Moderní střihy, precizní barvení a klidná atmosféra v salonu, kde
              je každý detail postavený na kvalitě a eleganci.
            </p>
            <div className={styles.actions}>
              <Link href="/#contact" className={styles.primary}>
                Objednat se online
              </Link>
              <a href="https://wa.me/420603561625" target="_blank" rel="noreferrer" className={styles.secondary}>
                WhatsApp
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className={styles.secondary}>
                Instagram
              </a>
            </div>
            <div className={styles.metaRow}>
              <span>Čenkov 93</span>
              <span>Otevřeno denně</span>
              <span>Online rezervace</span>
            </div>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.infoHeader}>
              <span className={styles.infoEyebrow}>Rezervace</span>
              <strong>Objednejte se jednoduše online</strong>
            </div>
            <div className={styles.infoBody}>
              <p>
                Rychlá volba termínu přes kontakt, WhatsApp nebo osobní návštěvu
                salonu.
              </p>
              <div className={styles.infoList}>
                <span>Dámské střihy</span>
                <span>Barvení vlasů</span>
                <span>Melír / balayage</span>
              </div>
            </div>
          </div>

          <a href="#about" className={styles.scrollHint} aria-label="Sjet na další sekci">
            <span />
          </a>
        </div>
      </div>
    </section>
  );
}
