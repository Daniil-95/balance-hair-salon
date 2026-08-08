import styles from "./contact.module.scss";

export function Contact() {
  return (
    <section id="contact" className={styles.contact}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.copy}>
            <span className={styles.overline}>Kontakt</span>
            <h2 className={styles.sectionTitle}>Rezervujte si svůj termín</h2>
            <p>
              Najdete nás na adrese Cenkov 93, 262 23 Cenkov. Pro rychlou
              komunikaci použijte WhatsApp nebo nás kontaktujte na telefonu
              +420 603 561 625.
            </p>
            <div className={styles.contactLinks}>
              <a href="tel:+420603561625">+420 603 561 625</a>
              <a href="https://wa.me/420603561625" target="_blank" rel="noreferrer">
                Napsat na WhatsApp
              </a>
            </div>
          </div>
          <div className={styles.stack}>
            <div className={styles.card}>
              <p className={styles.cardTitle}>Kontakty</p>
              <ul className={styles.list}>
                <li>Cenkov 93, 262 23 Cenkov</li>
                <li>+420 603 561 625</li>
                <li>@balance.kadernictvi.studio</li>
                <li>Napsat nám na WhatsApp</li>
                <li>Online rezervace</li>
              </ul>
            </div>

            <div className={styles.mapCard}>
              <span className={styles.mapPin}>Cenkov 93</span>
              <div className={styles.mapGrid}>
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>

            <div className={styles.card}>
              <p className={styles.cardTitle}>Otvírací doba</p>
              <ul className={styles.hours}>
                <li><span>Pondělí</span><strong>9:00 – 18:00</strong></li>
                <li><span>Úterý</span><strong>9:00 – 18:00</strong></li>
                <li><span>Středa</span><strong>9:00 – 18:00</strong></li>
                <li><span>Čtvrtek</span><strong>9:00 – 18:00</strong></li>
                <li><span>Pátek</span><strong>9:00 – 19:00</strong></li>
                <li><span>Sobota</span><strong>Dle objednání</strong></li>
                <li><span>Neděle</span><strong>Zavřeno</strong></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
