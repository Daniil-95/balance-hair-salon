import { AdminShell } from "@/components/admin/AdminShell";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { requireAdminSession } from "@/lib/auth";
import { getSeo } from "@/lib/seo";
import * as actions from "./actions";
import styles from "@/components/admin/admin-shell.module.scss";

export const revalidate = 0;

export default async function AdminSeoPage() {
  await requireAdminSession();

  const seo = await getSeo();

  return (
    <AdminShell>
      <section className={styles.panel}>
        <h1 className={styles.panelHeading}>SEO nastaveni</h1>
        <p className={styles.panelIntro}>Spravujte title, description, keywords a canonical URL.</p>

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
              <label className={styles.label}>OG Title</label>
              <input name="ogTitle" className={styles.input} defaultValue={seo?.ogTitle ?? ""} />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>OG Description</label>
              <textarea name="ogDescription" className={styles.textarea} defaultValue={seo?.ogDescription ?? ""} />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>OG Image (URL)</label>
              <input name="ogImage" className={styles.input} type="url" defaultValue={seo?.ogImage ?? ""} placeholder="https://example.com/og-image.jpg" />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Indexing</label>
              <select name="robots" className={styles.input} defaultValue={seo?.robots ?? "index"}>
                <option value="index">Index</option>
                <option value="noindex">Noindex</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Author</label>
              <input name="author" className={styles.input} defaultValue={seo?.author ?? ""} />
            </div>

            <div className={styles.buttonRow}>
              <SubmitButton type="submit" className={styles.button}>
                Uložit SEO
              </SubmitButton>
            </div>
          </form>
        </div>
      </section>
    </AdminShell>
  );
}
