import styles from "./contact.module.scss";

interface ContactValue {
  address: string;
  phone: string;
  whatsapp: string;
  mapUrl?: string | null;
}

interface OpeningHourValue {
  day: string;
  open: string;
  close: string;
  isClosed: boolean;
}

interface ContactProps {
  contact: ContactValue | null;
  openingHours: OpeningHourValue[];
  instagramUrl?: string | null;
}

function normalizePhone(phone?: string) {
  if (!phone) return "";
  return phone.replace(/\s+/g, "");
}

function normalizeExternalHref(value?: string | null) {
  if (!value) return null;

  const trimmed = value.trim();
  if (!trimmed) return null;

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

export function Contact({ contact, openingHours, instagramUrl }: ContactProps) {
  const address = contact?.address ?? "";
  const phone = contact?.phone ?? "";
  const whatsapp = contact?.whatsapp ?? "";
  const whatsappHref = whatsapp ? (whatsapp.startsWith("http") ? whatsapp : `https://wa.me/${whatsapp.replace(/\D+/g, "")}`) : null;
  const phoneNormalized = normalizePhone(phone);
  const phoneHref = phoneNormalized ? `tel:${phoneNormalized}` : null;
  const mapHref = address ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}` : null;
  const mapSrc = contact?.mapUrl ?? null;
  const instagramHref = normalizeExternalHref(instagramUrl);

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
                <a
                  className={styles.itemContent}
                  href={mapHref || undefined}
                  target={mapHref ? "_blank" : undefined}
                  rel={mapHref ? "noreferrer" : undefined}
                  aria-disabled={mapHref ? undefined : true}
                  tabIndex={mapHref ? undefined : -1}
                >
                  {address}
                </a>
              </li>
              <li>
                <span className={styles.itemIcon} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M7.8 5.8h2.4l1.2 3.1-1.5 1.7a14 14 0 0 0 3.5 3.5l1.7-1.5 3.1 1.2v2.4c0 .7-.6 1.3-1.3 1.3A12.6 12.6 0 0 1 6.5 7.1c0-.7.6-1.3 1.3-1.3Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                  </svg>
                </span>
                <a className={styles.itemContent} href={phoneHref || undefined} aria-disabled={phoneHref ? undefined : true} tabIndex={phoneHref ? undefined : -1}>{phone}</a>
              </li>
              <li>
                <span className={styles.itemIcon} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <rect x="5.5" y="5.5" width="13" height="13" rx="3.5" stroke="currentColor" strokeWidth="1.7" />
                    <circle cx="12" cy="12" r="3.1" stroke="currentColor" strokeWidth="1.7" />
                    <circle cx="16.3" cy="7.8" r="0.6" fill="currentColor" />
                  </svg>
                </span>
                <a
                  className={styles.itemContent}
                  href={instagramHref || undefined}
                  target={instagramHref ? "_blank" : undefined}
                  rel={instagramHref ? "noreferrer" : undefined}
                  aria-disabled={instagramHref ? undefined : true}
                  tabIndex={instagramHref ? undefined : -1}
                >
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
                <a
                  className={styles.itemContent}
                  href={whatsappHref || undefined}
                  target={whatsappHref ? "_blank" : undefined}
                  rel={whatsappHref ? "noreferrer" : undefined}
                  aria-disabled={whatsappHref ? undefined : true}
                  tabIndex={whatsappHref ? undefined : -1}
                >
                  Napsat na WhatsApp
                </a>
              </li>
            </ul>
          </article>

          <article className={styles.mapCard}>
            <div className={styles.mapHeader}>
              <p className={styles.cardTitle}>Kde nás najdete</p>
              <strong className={styles.mapAddress}>{address}</strong>
            </div>
            <div className={styles.mapFrame}>
              {mapSrc ? (
                <iframe
                  src={mapSrc}
                  width="600"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="Mapa salonu Balance"
                />
              ) : null}
            </div>
          </article>

          <article className={styles.hoursCard}>
            <div className={styles.hoursHeader}>
              <p className={styles.cardTitle}>Otvírací doba</p>
            </div>
            <ul className={styles.hours}>
              {openingHours.map((hour) => (
                <li key={hour.day}>
                  <span>{hour.day}</span>
                  <strong>{hour.isClosed ? "zavřeno" : hour.close ? `${hour.open} – ${hour.close}` : hour.open}</strong>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
