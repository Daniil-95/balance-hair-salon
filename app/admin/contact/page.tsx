import { AdminShell } from "@/components/admin/AdminShell";
import { getContactAndHours } from "@/lib/contact";
import * as actions from "./actions";
import styles from "@/components/admin/admin-shell.module.scss";

export const revalidate = 0;

const defaultOpeningHours = [
  { day: "Pondělí", open: "9:00", close: "18:00", isClosed: false },
  { day: "Úterý", open: "9:00", close: "18:00", isClosed: false },
  { day: "Středa", open: "9:00", close: "18:00", isClosed: false },
  { day: "Čtvrtek", open: "9:00", close: "18:00", isClosed: false },
  { day: "Pátek", open: "9:00", close: "18:00", isClosed: false },
  { day: "Sobota", open: "dle objednání", close: "", isClosed: false },
  { day: "Neděle", open: "", close: "", isClosed: true }
];

export default async function AdminContactPage() {
  const { contact, openingHours } = await getContactAndHours();
  const hours = openingHours.length > 0 ? openingHours : defaultOpeningHours;

  return (
    <AdminShell>
      <section className={styles.panel}>
        <h1 className={styles.panelHeading}>Kontakt a otevírací doba</h1>
        <p className={styles.panelIntro}>Upravte kontaktní údaje salonu a běžnou otevírací dobu pro zákazníky.</p>

        <div className={styles.card}>
          <form action={actions.saveContactAction} className={styles.form}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Adresa</label>
              <input name="address" className={styles.input} defaultValue={contact?.address ?? ""} required />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Telefon</label>
              <input name="phone" className={styles.input} defaultValue={contact?.phone ?? ""} required />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>WhatsApp</label>
              <input name="whatsapp" className={styles.input} defaultValue={contact?.whatsapp ?? ""} required />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>E-mail</label>
              <input name="email" className={styles.input} defaultValue={contact?.email ?? ""} required />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Odkaz na mapu</label>
              <input name="mapUrl" className={styles.input} defaultValue={contact?.mapUrl ?? ""} />
            </div>

            {hours.map((hour, index) => (
              <div key={`${hour.day}-${index}`} className={styles.subBlock}>
                <h2 className={styles.cardTitle}>{hour.day}</h2>
                <input type="hidden" name={`hours[${index}][day]`} value={hour.day} />
                <div className={styles.formGroup}>
                  <label className={styles.label}>Otevřeno od</label>
                  <input name={`hours[${index}][open]`} className={styles.input} defaultValue={hour.open} />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Otevřeno do</label>
                  <input name={`hours[${index}][close]`} className={styles.input} defaultValue={hour.close} />
                </div>
                <label className={styles.checkLabel}>
                  <input
                    type="checkbox"
                    name={`hours[${index}][isClosed]`}
                    defaultChecked={hour.isClosed}
                    value="true"
                    className={styles.checkbox}
                  />
                  Zavřeno
                </label>
              </div>
            ))}

            <div className={styles.buttonRow}>
              <button type="submit" className={styles.button}>
                Uložit kontakt
              </button>
            </div>
          </form>
        </div>
      </section>
    </AdminShell>
  );
}
