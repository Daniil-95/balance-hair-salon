import { AdminShell } from "@/components/admin/AdminShell";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { requireAdminSession } from "@/lib/auth";
import { getSettings } from "@/lib/settings";
import * as actions from "./actions";
import styles from "@/components/admin/admin-shell.module.scss";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  await requireAdminSession();

  const settings = await getSettings();

  const navigationLogoNameDefault = "Balance";
  const navigationLogoSubDefault = "Kadeřnické studio";
  const servicesSectionTitleDefault = "Strih, barveni a pece v jednom miste.";
  const servicesSectionSubDefault = "Vyberte si sluzbu podle sveho stylu a potreb vlasu.";
  const pricingSectionTitleDefault = "Ceny sluzeb na jednom miste.";
  const pricingSectionSubDefault = "Presna cena zavisi na delce, hustote vlasu a zvolenem vysledku.";
  const contactSectionTitleDefault = "Ozvěte se nám nebo se stavte v salonu.";
  const contactSectionSubDefault = "Telefon, WhatsApp i mapa na jednom místě.";

  return (
    <AdminShell>
      <section className={styles.panel}>
        <h1 className={styles.panelHeading}>Nastavení webu</h1>
        <p className={styles.panelIntro}>Upravte navigaci, patičku, právní texty a titulky sekcí na homepage.</p>

        <div className={styles.card}>
          <form action={actions.saveSettingsAction} className={`${styles.form} ${styles.settingsCompactForm}`}>
            <div className={`${styles.subBlock} ${styles.settingsGroup}`}>
              <h2 className={styles.cardTitle}>Navigace webu</h2>
              <div className={styles.settingsSectionBlocks}>
                <div className={styles.settingsSectionBlock}>
                  <h3 className={styles.settingsSectionBlockTitle}>Logo webu</h3>
                  <div className={styles.settingsGrid}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Název loga v navigaci</label>
                      <input name="navigationLogoName" className={styles.input} defaultValue={settings?.navigationLogoName ?? navigationLogoNameDefault} />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Podpis loga v navigaci</label>
                      <input name="navigationLogoSub" className={styles.input} defaultValue={settings?.navigationLogoSub ?? navigationLogoSubDefault} />
                    </div>
                  </div>
                </div>

                <div className={styles.settingsSectionBlock}>
                  <h3 className={styles.settingsSectionBlockTitle}>Hlavní tlačítko v navigaci</h3>
                  <div className={styles.settingsGrid}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Text hlavního tlačítka</label>
                      <input name="heroCtaLabel" className={styles.input} defaultValue={settings?.heroCtaLabel ?? ""} />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Odkaz hlavního tlačítka</label>
                      <input name="heroCtaUrl" className={styles.input} defaultValue={settings?.heroCtaUrl ?? ""} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`${styles.subBlock} ${styles.settingsGroup}`}>
              <h2 className={styles.cardTitle}>Sekce hlavní stránky</h2>
              <div className={styles.settingsSectionBlocks}>
                <div className={styles.settingsSectionBlock}>
                  <h3 className={styles.settingsSectionBlockTitle}>Služby</h3>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Titulek sekce</label>
                    <input name="servicesSectionTitle" className={styles.input} defaultValue={settings?.servicesSectionTitle ?? servicesSectionTitleDefault} />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Podtitulek sekce</label>
                    <textarea name="servicesSectionSub" className={styles.textarea} defaultValue={settings?.servicesSectionSub ?? servicesSectionSubDefault} />
                  </div>
                </div>

                <div className={styles.settingsSectionBlock}>
                  <h3 className={styles.settingsSectionBlockTitle}>Ceník</h3>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Titulek sekce</label>
                    <input name="pricingSectionTitle" className={styles.input} defaultValue={settings?.pricingSectionTitle ?? pricingSectionTitleDefault} />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Podtitulek sekce</label>
                    <textarea name="pricingSectionSub" className={styles.textarea} defaultValue={settings?.pricingSectionSub ?? pricingSectionSubDefault} />
                  </div>
                </div>

                <div className={styles.settingsSectionBlock}>
                  <h3 className={styles.settingsSectionBlockTitle}>Kontakt</h3>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Titulek sekce</label>
                    <input name="contactSectionTitle" className={styles.input} defaultValue={settings?.contactSectionTitle ?? contactSectionTitleDefault} />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Podtitulek sekce</label>
                    <textarea name="contactSectionSub" className={styles.textarea} defaultValue={settings?.contactSectionSub ?? contactSectionSubDefault} />
                  </div>
                </div>
              </div>
            </div>

            <div className={`${styles.subBlock} ${styles.settingsGroup}`}>
              <h2 className={styles.cardTitle}>Patička webu</h2>
              <div className={styles.settingsSectionBlocks}>
                <div className={styles.settingsSectionBlock}>
                  <h3 className={styles.settingsSectionBlockTitle}>Texty v patičce</h3>
                  <div className={styles.settingsGrid}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Název v patičce</label>
                      <input name="salonName" className={styles.input} defaultValue={settings?.salonName ?? ""} required />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Slogan v patičce</label>
                      <input name="tagline" className={styles.input} defaultValue={settings?.tagline ?? ""} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`${styles.subBlock} ${styles.settingsGroup}`}>
              <h2 className={styles.cardTitle}>Právní texty</h2>
              <div className={styles.settingsSectionBlocks}>
                <div className={styles.settingsSectionBlock}>
                  <h3 className={styles.settingsSectionBlockTitle}>Ochrana osobních údajů</h3>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Obsah stránky</label>
                    <textarea
                      name="privacyPolicyContent"
                      className={`${styles.textarea} ${styles.settingsPolicyTextarea}`}
                      defaultValue={settings?.privacyPolicyContent ?? ""}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.buttonRow}>
              <SubmitButton type="submit" className={styles.button}>
                Uložit nastavení
              </SubmitButton>
            </div>
          </form>
        </div>
      </section>
    </AdminShell>
  );
}
