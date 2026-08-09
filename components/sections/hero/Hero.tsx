import Image from "next/image";
import styles from "./hero.module.scss";

interface HeroProps {
  salonName: string;
  tagline: string;
  ctaLabel: string;
  ctaUrl: string;
  overline: string;
  heroImageSrc: string;
  heroImageAlt: string;
  instagramUrl: string | null;
  instagramLabel: string;
  whatsappLabel: string;
  whatsappUrl?: string | null;
  openingHoursLabel: string;
  contactWhatsapp?: string | null;
  contactAddress: string;
  contactPhone: string;
}

function normalizeWhatsappHref(value?: string | null) {
  if (!value) return null;

  const trimmed = value.trim();
  if (!trimmed) return null;

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  const digits = trimmed.replace(/\D+/g, "");
  return digits ? `https://wa.me/${digits}` : null;
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

export function Hero({
  salonName,
  tagline,
  ctaLabel,
  ctaUrl,
  overline,
  heroImageSrc,
  heroImageAlt,
  instagramUrl,
  instagramLabel,
  whatsappLabel,
  whatsappUrl,
  openingHoursLabel,
  contactWhatsapp,
  contactAddress,
  contactPhone
}: HeroProps) {
  const whatsappHref = normalizeWhatsappHref(whatsappUrl || contactWhatsapp);
  const instagramHref = normalizeExternalHref(instagramUrl);

  return (
    <section id="home" className={styles.hero}>
      <div className={styles.imageWrapper} aria-hidden="true">
        <Image
          src={heroImageSrc}
          alt={heroImageAlt}
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
            <span className={styles.overline}>{overline}</span>
            <h1 className={styles.title}>{salonName}</h1>
            <p className={styles.subtitle}>{tagline}</p>
            <div className={styles.actionsPrimary}>
              <a href={ctaUrl} target="_blank" rel="noreferrer" className={styles.primary}>
                <svg className={styles.buttonIcon} aria-hidden="true" viewBox="0 0 24 24" fill="none">
                  <rect x="4" y="5" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="1.7" />
                  <path d="M7 3.5V7M17 3.5V7M4 9H20" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                  <path d="M8 12.5H11M13 12.5H16M8 16H11" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                </svg>
                {ctaLabel}
              </a>
            </div>

            <div className={styles.actionsSecondary}>
              <a
                href={whatsappHref || undefined}
                target={whatsappHref ? "_blank" : undefined}
                rel={whatsappHref ? "noreferrer" : undefined}
                aria-disabled={whatsappHref ? undefined : true}
                tabIndex={whatsappHref ? undefined : -1}
                className={styles.secondary}
              >
                <svg className={styles.buttonIcon} aria-hidden="true" viewBox="0 0 24 24" fill="none">
                  <path d="M12 4.25a7.75 7.75 0 0 0-6.7 11.63L4.1 20l4.28-1.15A7.75 7.75 0 1 0 12 4.25Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                  <path d="M9.2 9.2c.16-.36.33-.42.58-.42h.48c.17 0 .32.03.45.33l.65 1.62c.1.24.07.38 0 .49l-.29.41c-.09.13-.1.24-.03.37.32.56.77 1.1 1.3 1.55.53.46 1.12.85 1.74 1.1.13.05.25.03.36-.06l.48-.38c.13-.09.29-.11.49-.03l1.53.66c.32.14.34.29.34.46v.44c0 .26-.1.46-.43.62-.73.36-1.6.3-2.54-.05-1.24-.47-2.57-1.42-3.72-2.56-1.16-1.17-2.08-2.48-2.53-3.7-.33-.9-.38-1.8-.06-2.46Z" fill="currentColor" />
                </svg>
                {whatsappLabel}
              </a>
              <a
                href={instagramHref || undefined}
                target={instagramHref ? "_blank" : undefined}
                rel={instagramHref ? "noreferrer" : undefined}
                aria-disabled={instagramHref ? undefined : true}
                tabIndex={instagramHref ? undefined : -1}
                className={styles.secondary}
              >
                <svg className={styles.buttonIcon} aria-hidden="true" viewBox="0 0 24 24" fill="none">
                  <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="1.7" />
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
                  <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
                </svg>
                {instagramLabel}
              </a>
            </div>
            <div className={styles.metaRow}>
              <span>{contactAddress}</span>
              <span>{openingHoursLabel}</span>
              <span>{contactPhone}</span>
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
