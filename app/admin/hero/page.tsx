import Image from "next/image";
import { AdminShell } from "@/components/admin/AdminShell";
import { getHero } from "@/lib/hero";
import * as actions from "./actions";
import styles from "@/components/admin/admin-shell.module.scss";

export const revalidate = 0;

export default async function AdminHeroPage() {
  const hero = await getHero();

  return (
    <AdminShell>
      <section className={styles.panel}>
        <h1 className={styles.panelHeading}>Hero sekce</h1>
        <p className={styles.panelIntro}>Spravujte hlavní titulek, podtitulek, CTA a obrázek v úvodní sekci webu.</p>

        <div className={styles.card}>
          <form action={actions.saveHeroAction} method="post" encType="multipart/form-data" className={styles.form}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Hlavní titulek</label>
              <input name="headline" className={styles.input} defaultValue={hero?.headline ?? ""} required />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Podtitulek</label>
              <input name="subheadline" className={styles.input} defaultValue={hero?.subheadline ?? ""} required />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Text tlačítka</label>
              <input name="ctaLabel" className={styles.input} defaultValue={hero?.ctaLabel ?? ""} required />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Odkaz tlačítka</label>
              <input name="ctaUrl" className={styles.input} defaultValue={hero?.ctaUrl ?? ""} required />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Background poznámka (volitelné)</label>
              <input name="background" className={styles.input} defaultValue={hero?.background ?? ""} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Obrázek hero sekce</label>
              <input name="image" type="file" className={styles.input} accept="image/*" />
            </div>
            <div className={styles.buttonRow}>
              <button type="submit" className={styles.button}>
                Uložit hero sekci
              </button>
            </div>
          </form>
        </div>

        {hero?.image ? (
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Aktuální obrázek</h2>
            <Image
              src={`/uploads/${hero.image}`}
              alt="Hero obrázek"
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
