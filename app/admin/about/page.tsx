import Image from "next/image";
import { AdminShell } from "@/components/admin/AdminShell";
import { getAbout } from "@/lib/about";
import * as actions from "./actions";
import styles from "@/components/admin/admin-shell.module.scss";

export const revalidate = 0;

export default async function AdminAboutPage() {
  const about = await getAbout();

  return (
    <AdminShell>
      <section className={styles.panel}>
        <h1 className={styles.panelHeading}>Sekce O nás</h1>
        <p className={styles.panelIntro}>Upravte titulek, texty a obrázek sekce O nás na hlavní stránce.</p>

        <div className={styles.card}>
          <form action={actions.saveAboutAction} method="post" encType="multipart/form-data" className={styles.form}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Titulek</label>
              <input name="title" className={styles.input} defaultValue={about?.title ?? ""} required />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Popis (1. odstavec)</label>
              <textarea name="description" className={styles.textarea} defaultValue={about?.description ?? ""} required />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Doplňující text (2. odstavec)</label>
              <textarea name="highlights" className={styles.textarea} defaultValue={about?.highlights ?? ""} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Obrázek sekce</label>
              <input name="image" type="file" className={styles.input} accept="image/*" />
            </div>
            <div className={styles.buttonRow}>
              <button type="submit" className={styles.button}>
                Uložit sekci O nás
              </button>
            </div>
          </form>
        </div>

        {about?.image ? (
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Aktuální obrázek</h2>
            <Image
              src={`/uploads/${about.image}`}
              alt="Obrázek sekce O nás"
              width={320}
              height={180}
              unoptimized
              className={styles.mediaPreview}
            />
          </div>
        ) : null}
      </section>
    </AdminShell>
  );
}
