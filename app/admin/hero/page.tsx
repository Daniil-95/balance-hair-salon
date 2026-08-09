import Image from "next/image";
import { AdminShell } from "@/components/admin/AdminShell";
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
        <h1 className={styles.panelHeading}>Hero sekce</h1>
        <p className={styles.panelIntro}>Spravujte všechny texty, odkazy a obrázek, které se zobrazují v úvodní Hero sekci webu.</p>

        <div className={styles.card}>
          <form action={actions.saveHeroAction} className={styles.form}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Horní popisek</label>
              <input name="overline" className={styles.input} defaultValue={heroView.overline} required />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Hlavní titulek</label>
              <input name="headline" className={styles.input} defaultValue={heroView.headline} required />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Podtitulek</label>
              <input name="subheadline" className={styles.input} defaultValue={heroView.subheadline} required />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Text tlačítka</label>
              <input name="ctaLabel" className={styles.input} defaultValue={heroView.ctaLabel} required />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Odkaz tlačítka</label>
              <input name="ctaUrl" className={styles.input} defaultValue={heroView.ctaUrl} required />
            </div>
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
            <div className={styles.formGroup}>
              <label className={styles.label}>Text prostředního štítku (otevírací doba)</label>
              <input name="openingHoursLabel" className={styles.input} defaultValue={heroView.openingHoursLabel} required />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Alt text obrázku Hero</label>
              <input name="imageAlt" className={styles.input} defaultValue={heroView.imageAlt} required />
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
