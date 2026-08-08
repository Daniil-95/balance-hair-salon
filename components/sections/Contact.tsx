import styles from "./contact.module.scss";

export function Contact() {
  return (
    <section id="contact" className={styles.contact}>
      <div className="container">
        <div className={styles.inner}>
          <div>
            <span className={styles.overline}>Kontakt</span>
            <h2 className={styles.sectionTitle}>Rezervujte si svůj termín</h2>
            <p>
              Najdete nás na adrese Cenkov 93, 262 23 Cenkov. Pro rychlou
              komunikaci použijte WhatsApp nebo nás kontaktujte na telefonu
              +420 603 561 625.
            </p>
          </div>
          <div className={styles.card}>
            <p className={styles.cardTitle}>Otvírací doba</p>
            <ul className={styles.hours}>
              <li>Pondělí – Pátek: 9:00 – 18:00</li>
              <li>Sobota: dle objednání</li>
              <li>Neděle: zavřeno</li>
            </ul>
            <a href="mailto:balance@kadernictvi.studio" className={styles.button}>
              Napsat nám e-mail
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
