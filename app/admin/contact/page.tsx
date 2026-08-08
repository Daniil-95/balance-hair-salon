import { AdminShell } from "@/components/admin/AdminShell";
import { getContactAndHours } from "@/lib/contact";
import * as actions from "./actions";
import styles from "@/components/admin/admin-shell.module.scss";

export const revalidate = 0;

export default async function AdminContactPage() {
  const { contact, openingHours } = await getContactAndHours();

  return (
    <AdminShell>
      <section className={styles.panel}>
        <h1 className={styles.panelHeading}>Contact & Opening Hours</h1>
        <p>Update the salon contact details and weekly opening hours.</p>

        <div className={styles.card}>
          <form action={actions.saveContactAction} method="post">
            <div className={styles.formGroup}>
              <label className={styles.label}>Address</label>
              <input name="address" className={styles.input} defaultValue={contact?.address ?? ""} required />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Phone</label>
              <input name="phone" className={styles.input} defaultValue={contact?.phone ?? ""} required />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>WhatsApp</label>
              <input name="whatsapp" className={styles.input} defaultValue={contact?.whatsapp ?? ""} required />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Email</label>
              <input name="email" className={styles.input} defaultValue={contact?.email ?? ""} required />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Map URL</label>
              <input name="mapUrl" className={styles.input} defaultValue={contact?.mapUrl ?? ""} />
            </div>

            {openingHours.map((hour, index) => (
              <div key={hour.id} className={styles.card} style={{ marginTop: "1rem" }}>
                <div className={styles.cardTitle}>{hour.day}</div>
                <input type="hidden" name={`hours[${index}][day]`} value={hour.day} />
                <input type="hidden" name={`hours[${index}][id]`} value={hour.id} />
                <div className={styles.formGroup}>
                  <label className={styles.label}>Open</label>
                  <input name={`hours[${index}][open]`} className={styles.input} defaultValue={hour.open} required />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Close</label>
                  <input name={`hours[${index}][close]`} className={styles.input} defaultValue={hour.close} required />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    <input type="checkbox" name={`hours[${index}][isClosed]`} defaultChecked={hour.isClosed} value="true" /> Closed
                  </label>
                </div>
              </div>
            ))}

            <button type="submit" className={styles.button} style={{ marginTop: "1rem" }}>
              Save Contact
            </button>
          </form>
        </div>
      </section>
    </AdminShell>
  );
}
