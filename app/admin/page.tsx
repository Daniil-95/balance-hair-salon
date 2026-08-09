import { AdminShell } from "@/components/admin/AdminShell";
import Link from "next/link";
import styles from "@/components/admin/admin-shell.module.scss";

const quickSections = [
  {
    href: "/admin/hero",
    title: "Úvodní sekce",
    description: "Hlavní nadpis, podnadpis, tlačítka a úvodní obrázek webu.",
  },
  {
    href: "/admin/about",
    title: "O nás",
    description: "Texty o salonu a fotografie sekce O nás.",
  },
  {
    href: "/admin/services",
    title: "Služby",
    description: "Nabídka služeb, ikony a pořadí zobrazení.",
  },
  {
    href: "/admin/pricing",
    title: "Ceník",
    description: "Kategorie, položky a ceny služeb.",
  },
  {
    href: "/admin/gallery",
    title: "Galerie",
    description: "Nahrávání, úprava a řazení fotografií.",
  },
  {
    href: "/admin/contact",
    title: "Kontakt",
    description: "Adresa, telefon, e-mail, mapa a otevírací doba.",
  },
  {
    href: "/admin/seo",
    title: "SEO",
    description: "Meta data, Open Graph, indexace a technické SEO.",
  },
  {
    href: "/admin/settings",
    title: "Nastavení",
    description: "Název salonu, slogan a hlavní tlačítko webu.",
  },
];

export default function AdminDashboardPage() {
  return (
    <AdminShell>
      <section className={styles.panel}>
        <h1 className={styles.panelHeading}>Rychlý přehled administrace</h1>
        <p className={styles.panelIntro}>
          Vyberte sekci, kterou chcete upravit. Každá karta níže vás přesměruje přímo na konkrétní část administrace.
        </p>

        <div className={styles.dashboardGrid}>
          {quickSections.map((section) => (
            <div key={section.href} className={`${styles.card} ${styles.dashboardCard}`}>
              <h2 className={styles.cardTitle}>{section.title}</h2>
              <p className={styles.cardMeta}>{section.description}</p>
              <div className={styles.buttonRow}>
                <Link href={section.href} className={styles.buttonSecondary}>
                  Otevřít sekci
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </AdminShell>
  );
}
