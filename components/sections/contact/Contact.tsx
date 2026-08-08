import styles from "./contact.module.scss";

export function Contact() {
  return (
    <section id="contact" className={styles.contact}>
      <div className="container">
        <div className={styles.topGrid}>
          <article className={styles.contactCard}>
            <span className={styles.overline}>Kontakt</span>
            <h2 className={styles.sectionTitle}>Zastavte se u nás nebo nám napište.</h2>
            <p className={styles.lead}>Salon Balance najdete v Cenkově. Pro rychlý kontakt využijte telefon nebo WhatsApp, pro novinky sledujte Instagram.</p>

            <ul className={styles.contactList}>
              <li>
                <span className={styles.itemIcon} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M12 20c3.6-4.2 5.4-7.3 5.4-9.5A5.4 5.4 0 0 0 12 5.1a5.4 5.4 0 0 0-5.4 5.4c0 2.2 1.8 5.3 5.4 9.5Z" stroke="currentColor" strokeWidth="1.7" />
                    <circle cx="12" cy="10.5" r="1.8" stroke="currentColor" strokeWidth="1.7" />
                  </svg>
                </span>
                <span className={styles.itemContent}>Cenkov 93, 262 23 Cenkov</span>
              </li>
              <li>
                <span className={styles.itemIcon} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M7.8 5.8h2.4l1.2 3.1-1.5 1.7a14 14 0 0 0 3.5 3.5l1.7-1.5 3.1 1.2v2.4c0 .7-.6 1.3-1.3 1.3A12.6 12.6 0 0 1 6.5 7.1c0-.7.6-1.3 1.3-1.3Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                  </svg>
                </span>
                <a className={styles.itemContent} href="tel:+420603561625">+420 603 561 625</a>
              </li>
              <li>
                <span className={styles.itemIcon} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <rect x="5.5" y="5.5" width="13" height="13" rx="3.5" stroke="currentColor" strokeWidth="1.7" />
                    <circle cx="12" cy="12" r="3.1" stroke="currentColor" strokeWidth="1.7" />
                    <circle cx="16.3" cy="7.8" r="0.6" fill="currentColor" />
                  </svg>
                </span>
                <a className={styles.itemContent} href="https://www.instagram.com/balance.kadernictvi/" target="_blank" rel="noreferrer">
                  @balance.kadernictvi
                </a>
              </li>
              <li>
                <span className={styles.itemIcon} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M12 20c4.1 0 7.5-3.1 7.5-7S16.1 6 12 6 4.5 9 4.5 13c0 1.4.4 2.7 1.1 3.8L4.5 20l3.5-1c1.1.6 2.5 1 4 1Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                    <path d="M9.6 10.2c.1 1.8 1.6 3.2 3.4 3.4M13.7 14c-.5.2-1.1.2-1.7.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                  </svg>
                </span>
                <a className={styles.itemContent} href="https://wa.me/420603561625" target="_blank" rel="noreferrer">
                  Napsat na WhatsApp
                </a>
              </li>
            </ul>
          </article>

          <div className={styles.rightColumn}>
            <article className={styles.mapCard}>
              <div className={styles.mapHeader}>
                <p className={styles.cardTitle}>Kde nás najdete</p>
                <strong className={styles.mapAddress}>Cenkov 93, 262 23 Cenkov</strong>
              </div>
              <div className={styles.mapFrame}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2576.347765002316!2d13.989133612351198!3d49.77952477135285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470b08f1d29a68f1%3A0x221e79fc2817ef0e!2zxIxlbmtvdiA5MywgMjYyIDIzIMSMZW5rb3Y!5e0!3m2!1sru!2scz!4v1786218679639!5m2!1sru!2scz"
                  width="600"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="Mapa salonu Balance"
                />
              </div>
            </article>

            <article className={styles.hoursCard}>
              <div className={styles.hoursHeader}>
                <p className={styles.cardTitle}>Otvírací doba</p>
                <span className={styles.status}>Otevřeno dle termínů</span>
              </div>
              <ul className={styles.hours}>
                <li><span>Pondělí</span><strong>9:00 – 18:00</strong></li>
                <li><span>Úterý</span><strong>9:00 – 18:00</strong></li>
                <li><span>Středa</span><strong>9:00 – 18:00</strong></li>
                <li><span>Čtvrtek</span><strong>9:00 – 18:00</strong></li>
                <li><span>Pátek</span><strong>9:00 – 19:00</strong></li>
                <li><span>Sobota</span><strong>dle objednání</strong></li>
                <li><span>Neděle</span><strong>zavřeno</strong></li>
              </ul>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
