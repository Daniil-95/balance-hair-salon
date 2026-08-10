import Image from "next/image";
import { AdminShell } from "@/components/admin/AdminShell";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { getHero } from "@/lib/hero";
import { getPublicHero } from "@/lib/public-content";
import * as actions from "./actions";
import styles from "@/components/admin/admin-shell.module.scss";

export const revalidate = 0;

export default async function AdminHeroPage() {
  const [hero, heroView] = await Promise.all([getHero(), getPublicHero()]);

  return (
    <AdminShell>
      <section className={styles.panel}>
        <h1 className={styles.panelHeading}>Úvodní sekce</h1>
        <p className={styles.panelIntro}>Spravujte hlavní texty, odkazy a obrázek, které se zobrazují v úvodní části webu.</p>

        <div className={styles.heroWorkspace}>
          <div className={styles.card}>
            <form action={actions.saveHeroAction} className={`${styles.form} ${styles.heroCompactForm}`}>
              <div className={styles.heroTopGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Horní popisek</label>
                  <input name="overline" className={styles.input} defaultValue={heroView.overline} required />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Hlavní titulek</label>
                  <input name="headline" className={styles.input} defaultValue={heroView.headline} required />
                </div>
                <div className={`${styles.formGroup} ${styles.heroWideField}`}>
                  <label className={styles.label}>Podtitulek</label>
                  <input name="subheadline" className={styles.input} defaultValue={heroView.subheadline} required />
                </div>
              </div>

              <div className={`${styles.subBlock} ${styles.heroSubBlock}`}>
                <h2 className={styles.cardTitle}>Hlavní tlačítko</h2>
                <div className={styles.heroTopGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Text tlačítka</label>
                    <input name="ctaLabel" className={styles.input} defaultValue={heroView.ctaLabel} required />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Odkaz tlačítka</label>
                    <input name="ctaUrl" className={styles.input} defaultValue={heroView.ctaUrl} required />
                  </div>
                </div>
              </div>

              <div className={`${styles.subBlock} ${styles.heroSubBlock}`}>
                <h2 className={styles.cardTitle}>Sociální tlačítka</h2>
                <div className={styles.heroSocialGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Text tlačítka WhatsApp</label>
                    <input name="whatsappLabel" className={styles.input} defaultValue={heroView.whatsappLabel} required />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Odkaz WhatsApp (volitelné)</label>
                    <input name="whatsappUrl" className={styles.input} defaultValue={heroView.whatsappUrl ?? ""} />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Text tlačítka Instagram</label>
                    <input name="instagramLabel" className={styles.input} defaultValue={heroView.instagramLabel} required />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Odkaz Instagram</label>
                    <input name="instagramUrl" className={styles.input} defaultValue={heroView.instagramUrl ?? ""} />
                  </div>
                </div>
              </div>

              <div className={`${styles.subBlock} ${styles.heroSubBlock}`}>
                <h2 className={styles.cardTitle}>Řádek pod tlačítky</h2>
                <div className={styles.heroTopGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Levý text</label>
                    <input name="metaRowLeftLabel" className={styles.input} defaultValue={heroView.metaRowLeftLabel ?? ""} />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Střední text</label>
                    <input name="metaRowCenterLabel" className={styles.input} defaultValue={heroView.metaRowCenterLabel ?? heroView.openingHoursLabel ?? ""} />
                  </div>
                  <div className={`${styles.formGroup} ${styles.heroWideField}`}>
                    <label className={styles.label}>Pravý text</label>
                    <input name="metaRowRightLabel" className={styles.input} defaultValue={heroView.metaRowRightLabel ?? ""} />
                  </div>
                </div>
              </div>

              <div className={`${styles.subBlock} ${styles.heroSubBlock}`}>
                <h2 className={styles.cardTitle}>Obrázek</h2>
                <div className={styles.heroTopGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Alt text úvodního obrázku</label>
                    <input name="imageAlt" className={styles.input} defaultValue={heroView.imageAlt} required />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Obrázek úvodní sekce</label>
                    <input name="image" type="file" className={styles.input} accept="image/*" />
                  </div>
                </div>
              </div>

              <div className={styles.heroSaveRow}>
                <SubmitButton type="submit" className={styles.button}>
                  Uložit úvodní sekci
                </SubmitButton>
              </div>
            </form>
          </div>

          {hero?.image ? (
            <div className={`${styles.card} ${styles.heroPreviewCard}`}>
              <h2 className={styles.cardTitle}>Aktuální obrázek</h2>
              <Image
                src={hero.image.startsWith("http") ? hero.image : `/uploads/${hero.image}`}
                alt="Úvodní obrázek"
                width={640}
                height={400}
                unoptimized
                className={styles.mediaPreview}
              />
            </div>
          ) : null}
        </div>
      </section>
    </AdminShell>
  );
}
