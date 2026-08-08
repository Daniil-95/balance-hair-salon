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
                <svg className={styles.buttonIcon} aria-hidden="true" viewBox="0 0 24 24" fill="none">
                  <rect x="4" y="5" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="1.7" />
                  <path d="M7 3.5V7M17 3.5V7M4 9H20" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                  <path d="M8 12.5H11M13 12.5H16M8 16H11" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                </svg>
                Objednat se online
              </Link>
              <a href="https://wa.me/420603561625" target="_blank" rel="noreferrer" className={styles.secondary}>
                <svg className={styles.buttonIcon} aria-hidden="true" viewBox="0 0 24 24" fill="none">
                  <path d="M20 11.6C20 15.7 16.4 19 12 19a8.9 8.9 0 0 1-4.25-1.07L4 19l1.18-3.4A7.82 7.82 0 0 1 3 11.6C3 7.5 6.6 4 12 4s8 3.5 8 7.6Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                  <path d="M9.2 8.9c.2-.4.4-.5.7-.5h.7c.2 0 .4 0 .5.3l.8 1.9c.1.2.1.4 0 .6l-.4.5c-.1.2-.1.4 0 .6.3.6.8 1.2 1.3 1.7.5.5 1.1 1 1.7 1.3.2.1.4.1.6 0l.5-.4c.2-.1.4-.1.6 0l1.9.8c.3.1.3.3.3.5v.7c0 .3-.1.5-.5.7-.7.4-1.7.5-2.5.2-1.6-.5-3.6-1.8-5.1-3.3-1.5-1.5-2.8-3.5-3.3-5.1-.3-.8-.2-1.8.2-2.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                </svg>
                WhatsApp
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className={styles.secondary}>
                <svg className={styles.buttonIcon} aria-hidden="true" viewBox="0 0 24 24" fill="none">
                  <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="1.7" />
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
                  <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
                </svg>
                Instagram
              </a>
            </div>
            <div className={styles.metaRow}>
              <span>Čenkov 93</span>
              <span>Otevřeno denně</span>
              <span>Online rezervace</span>
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
