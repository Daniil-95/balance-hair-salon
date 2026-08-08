import Image from "next/image";
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
        <h1 className={styles.panelHeading}>Site Settings</h1>
        <p>Update the salon name, tagline, hero CTA, and logo.</p>

        <div className={styles.card}>
          <form action={actions.saveSettingsAction} method="post" encType="multipart/form-data">
            <div className={styles.formGroup}>
              <label className={styles.label}>Salon Name</label>
              <input name="salonName" className={styles.input} defaultValue={settings?.salonName ?? ""} required />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Tagline</label>
              <input name="tagline" className={styles.input} defaultValue={settings?.tagline ?? ""} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Hero CTA Label</label>
              <input name="heroCtaLabel" className={styles.input} defaultValue={settings?.heroCtaLabel ?? ""} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Hero CTA URL</label>
              <input name="heroCtaUrl" className={styles.input} defaultValue={settings?.heroCtaUrl ?? ""} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Logo</label>
              <input name="logo" type="file" className={styles.input} accept="image/*" />
            </div>
            <button type="submit" className={styles.button}>
              Save Settings
            </button>
          </form>
        </div>

        {settings?.logo ? (
          <div className={styles.card}>
            <div className={styles.cardTitle}>Current Logo</div>
            <Image src={`/uploads/${settings.logo}`} alt="Logo" width={220} height={120} unoptimized style={{ maxWidth: "220px", width: "100%", height: "auto", marginTop: "1rem" }} />
          </div>
        ) : null}
      </section>
    </AdminShell>
  );
}
