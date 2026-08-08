import styles from "./contact.module.scss";

export function Contact() {
  return (
    <section id="contact" className={styles.contact}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.overline}>Kontakt</span>
          <h2 className={styles.sectionTitle}>Vše důležité na jednom místě</h2>
        </div>
        <div className={styles.grid}>
          <article className={styles.card}>
            <p className={styles.cardTitle}>Kontakty</p>
            <ul className={styles.list}>
              <li>
                <span>Adresa</span>
                <strong>Cenkov 93, 262 23 Cenkov</strong>
              </li>
              <li>
                <span>Telefon</span>
                <a href="tel:+420603561625">+420 603 561 625</a>
              </li>
              <li>
                <span>Instagram</span>
                <a href="https://www.instagram.com/balance.kadernictvi/" target="_blank" rel="noreferrer">
                  @balance.kadernictvi
                </a>
              </li>
              <li>
                <span>WhatsApp</span>
                <a href="https://wa.me/420603561625" target="_blank" rel="noreferrer">
                  Napsat na WhatsApp
                </a>
              </li>
            </ul>
          </article>

          <article className={styles.mapCard}>
            <p className={styles.cardTitle}>Kde nás najdete</p>
            <strong className={styles.mapAddress}>Cenkov 93, 262 23 Cenkov</strong>
            <p className={styles.mapText}>Klidné místo s pohodlným příjezdem, kde vás čeká intimní salonní atmosféra.</p>
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

          <article className={styles.card}>
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
          </article>
        </div>
      </div>
    </section>
  );
}
