import { AdminShell } from "@/components/admin/AdminShell";
import { getSeo } from "@/lib/seo";
import * as actions from "./actions";
import styles from "@/components/admin/admin-shell.module.scss";

export const revalidate = 0;

export default async function AdminSeoPage() {
  const seo = await getSeo();

  return (
    <AdminShell>
      <section className={styles.panel}>
        <h1 className={styles.panelHeading}>SEO nastaveni</h1>
        <p className={styles.panelIntro}>Spravujte title, description, canonical URL, Open Graph a Twitter metadata.</p>

        <div className={styles.card}>
          <form action={actions.saveSeoAction} className={styles.form}>
            <div className={styles.formGroup}>
              <label className={styles.label}>SEO title</label>
              <input name="title" className={styles.input} defaultValue={seo?.title ?? ""} required />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>SEO description</label>
              <textarea name="description" className={styles.textarea} defaultValue={seo?.description ?? ""} required />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Keywords (comma separated)</label>
              <input name="keywords" className={styles.input} defaultValue={seo?.keywords ?? ""} required />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Canonical URL</label>
              <input name="canonicalUrl" className={styles.input} type="url" defaultValue={seo?.canonicalUrl ?? ""} placeholder="https://example.com" required />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Open Graph image URL (optional)</label>
              <input name="ogImage" className={styles.input} type="url" defaultValue={seo?.ogImage ?? ""} placeholder="https://example.com/og-image.jpg" />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Twitter card</label>
              <select name="twitterCard" className={styles.select} defaultValue={seo?.twitterCard ?? "summary_large_image"}>
                <option value="summary_large_image">summary_large_image</option>
                <option value="summary">summary</option>
              </select>
            </div>

            <div className={styles.buttonRow}>
              <button type="submit" className={styles.button}>
                Ulozit SEO
              </button>
            </div>
          </form>
        </div>
      </section>
    </AdminShell>
  );
}
