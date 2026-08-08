import { AdminShell } from "@/components/admin/AdminShell";
import styles from "@/components/admin/admin-shell.module.scss";

export default function AdminDashboardPage() {
  return (
    <AdminShell>
      <section className={styles.panel}>
        <h1 className={styles.panelHeading}>Přehled administrace</h1>
        <p className={styles.panelIntro}>
          V levém menu vyberte část webu, kterou chcete upravit. Změny ukládejte průběžně po každém formuláři.
        </p>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Rychlá orientace</h2>
          <p className={styles.cardMeta}>
            Služby, galerie, ceník, kontakt a základní nastavení webu spravujete samostatně v jednotlivých sekcích.
          </p>
        </div>
      </section>
    </AdminShell>
  );
}
