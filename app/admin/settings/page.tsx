import { AdminShell } from "@/components/admin/AdminShell";
import { getSettings } from "@/lib/settings";
import * as actions from "./actions";
import styles from "@/components/admin/admin-shell.module.scss";

export const revalidate = 0;

export default async function AdminSettingsPage() {
  const settings = await getSettings();

  return (
    <AdminShell>
      <section className={styles.panel}>
        <h1 className={styles.panelHeading}>Nastavení webu</h1>
        <p className={styles.panelIntro}>Upravte název salonu, krátký slogan a hlavní tlačítko.</p>

        <div className={styles.card}>
          <form action={actions.saveSettingsAction} className={styles.form}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Název salonu</label>
              <input name="salonName" className={styles.input} defaultValue={settings?.salonName ?? ""} required />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Slogan</label>
              <input name="tagline" className={styles.input} defaultValue={settings?.tagline ?? ""} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Text hlavního tlačítka</label>
              <input name="heroCtaLabel" className={styles.input} defaultValue={settings?.heroCtaLabel ?? ""} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Odkaz hlavního tlačítka</label>
              <input name="heroCtaUrl" className={styles.input} defaultValue={settings?.heroCtaUrl ?? ""} />
            </div>
            <div className={styles.buttonRow}>
              <button type="submit" className={styles.button}>
                Uložit nastavení
              </button>
            </div>
          </form>
        </div>
      </section>
    </AdminShell>
  );
}
