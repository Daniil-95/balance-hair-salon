import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { getPublicSettings } from "@/lib/public-content";
import styles from "./privacy-policy.module.scss";

export const revalidate = 0;

const defaultPolicy = `Správce osobních údajů:
Salon Balance

Jaké údaje zpracováváme:
- jméno a kontaktní údaje při objednávce
- informace potřebné pro vyřízení rezervace

Za jakým účelem:
- rezervace termínu a komunikace se zákazníkem
- vedení základní evidence klientů

Jak dlouho údaje uchováváme:
- pouze po dobu nezbytnou pro splnění účelu a zákonných povinností

Vaše práva:
- právo na přístup k údajům
- právo na opravu nebo výmaz
- právo vznést námitku proti zpracování

Kontakt pro uplatnění práv:
- využijte kontakty uvedené v sekci Kontakt na webu.`;

function toParagraphs(value: string) {
  return value
    .split(/\r?\n\r?\n/)
    .map((block) => block.trim())
    .filter(Boolean);
}

export default async function PrivacyPolicyPage() {
  const settings = await getPublicSettings();
  const text = settings?.privacyPolicyContent?.trim() || defaultPolicy;
  const paragraphs = toParagraphs(text);

  return (
    <SiteShell
      headerBrandName={settings?.navigationLogoName ?? settings?.salonName}
      headerBrandSub={settings?.navigationLogoSub ?? settings?.tagline ?? undefined}
      headerCtaLabel={settings?.heroCtaLabel ?? undefined}
      headerCtaUrl={settings?.heroCtaUrl ?? undefined}
      footerBrandName={settings?.salonName}
      footerNote={settings?.tagline ?? undefined}
    >
      <section className={styles.page}>
        <div className="container">
          <div className={styles.backAction}>
            <Link href="/" className={styles.backLink}>
              Zpět na hlavní stránku
            </Link>
          </div>

          <article className={styles.card}>
            <p className={styles.label}>Právní informace</p>
            <h1 className={styles.title}>Ochrana osobních údajů</h1>
            <div className={styles.content}>
              {paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </article>
        </div>
      </section>
    </SiteShell>
  );
}
