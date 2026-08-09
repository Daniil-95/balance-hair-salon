import Image from "next/image";
import { AdminShell } from "@/components/admin/AdminShell";
import { getAbout, getAboutMeta } from "@/lib/about";
import { getPublicAbout } from "@/lib/public-content";
import * as actions from "./actions";
import styles from "@/components/admin/admin-shell.module.scss";

export const revalidate = 0;

export default async function AdminAboutPage() {
  const [about, aboutMeta, aboutView] = await Promise.all([getAbout(), getAboutMeta(), getPublicAbout()]);

  return (
    <AdminShell>
      <section className={styles.panel}>
        <h1 className={styles.panelHeading}>Sekce O nás</h1>
        <p className={styles.panelIntro}>Upravte kompletní obsah sekce O nás včetně dvou samostatných fotografií.</p>

        <div className={styles.card}>
          <form action={actions.saveAboutAction} className={styles.form}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Horní popisek</label>
              <input name="overline" className={styles.input} defaultValue={aboutMeta.overline ?? ""} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Titulek</label>
              <input name="title" className={styles.input} defaultValue={about?.title ?? ""} required />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Popis (1. odstavec)</label>
              <textarea name="firstParagraph" className={styles.textarea} defaultValue={about?.description ?? ""} required />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Doplňující text (2. odstavec)</label>
              <textarea name="secondParagraph" className={styles.textarea} defaultValue={aboutMeta.secondParagraph ?? ""} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Alt text hlavní fotografie</label>
              <input name="imageMainAlt" className={styles.input} defaultValue={aboutMeta.imageMainAlt ?? ""} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Alt text druhé fotografie</label>
              <input name="imageCutawayAlt" className={styles.input} defaultValue={aboutMeta.imageCutawayAlt ?? ""} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Hlavní fotografie sekce O nás</label>
              <input name="imagePrimary" type="file" className={styles.input} accept="image/*" />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Druhá fotografie sekce O nás</label>
              <input name="imageSecondary" type="file" className={styles.input} accept="image/*" />
            </div>
            <div className={styles.buttonRow}>
              <button type="submit" className={styles.button}>
                Uložit sekci O nás
              </button>
            </div>
          </form>
        </div>

        {aboutView.imageMainSrc || aboutView.imageCutawaySrc ? (
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Aktuální fotografie na webu</h2>
            {aboutView.imageMainSrc ? (
              <Image
                src={aboutView.imageMainSrc}
                alt={aboutView.imageMainAlt || "O nas hlavni foto"}
                width={320}
                height={180}
                unoptimized
                className={styles.mediaPreview}
              />
            ) : null}
            {aboutView.imageCutawaySrc ? (
              <Image
                src={aboutView.imageCutawaySrc}
                alt={aboutView.imageCutawayAlt || "O nas druhe foto"}
                width={320}
                height={180}
                unoptimized
                className={styles.mediaPreview}
              />
            ) : null}
          </div>
        ) : null}
      </section>
    </AdminShell>
  );
}
