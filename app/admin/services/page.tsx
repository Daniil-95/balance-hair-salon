import { AdminShell } from "@/components/admin/AdminShell";
import { ConfirmForm } from "@/components/admin/ConfirmForm";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { getServices } from "@/lib/services";
import * as actions from "./actions";
import styles from "@/components/admin/admin-shell.module.scss";

export const revalidate = 0;

export default async function AdminServicesPage() {
  const services = await getServices();

  return (
    <AdminShell>
      <section className={styles.panel}>
        <h1 className={styles.panelHeading}>Služby</h1>
        <p className={styles.panelIntro}>Upravte nabídku služeb a pořadí jejich zobrazení.</p>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Vytvořit službu</h2>
          <form action={actions.createServiceAction} className={styles.form}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Název</label>
              <input name="title" className={styles.input} required />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Popis</label>
              <textarea name="description" className={styles.textarea} required />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Ikona</label>
              <input name="icon" className={styles.input} required />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Pořadí</label>
              <input name="order" className={styles.input} type="number" defaultValue={0} />
            </div>
            <div className={styles.buttonRow}>
              <SubmitButton type="submit" className={styles.button}>
                Vytvořit službu
              </SubmitButton>
            </div>
          </form>
        </div>

        <div className={styles.previewGrid}>
          {services.length === 0 ? (
            <div className={styles.card}>
              <p className={styles.cardMeta}>Zatím nejsou vytvořené žádné služby.</p>
            </div>
          ) : null}

          {services.map((service) => (
            <div key={service.id} className={styles.card}>
              <h2 className={styles.cardTitle}>{service.title}</h2>
              <div className={styles.cardMeta}>Pořadí: {service.order}</div>
              <form id={`update-service-${service.id}`} action={actions.updateServiceAction} className={styles.form}>
                <input type="hidden" name="id" value={service.id} />
                <div className={styles.formGroup}>
                  <label className={styles.label}>Název</label>
                  <input name="title" className={styles.input} defaultValue={service.title} required />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Popis</label>
                  <textarea name="description" className={styles.textarea} defaultValue={service.description} required />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Ikona</label>
                  <input name="icon" className={styles.input} defaultValue={service.icon} required />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Pořadí</label>
                  <input name="order" className={styles.input} type="number" defaultValue={service.order} />
                </div>
              </form>
              <div className={styles.buttonRow}>
                <SubmitButton type="submit" form={`update-service-${service.id}`} className={styles.button}>
                  Uložit
                </SubmitButton>
                <ConfirmForm
                  action={actions.deleteServiceAction}
                  className={styles.inlineForm}
                  message="Opravdu chcete smazat tuto službu?"
                >
                  <input type="hidden" name="id" value={service.id} />
                  <button type="submit" className={styles.buttonDanger}>
                    Smazat
                  </button>
                </ConfirmForm>
              </div>
            </div>
          ))}
        </div>
      </section>
    </AdminShell>
  );
}
