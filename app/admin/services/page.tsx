import { AdminShell } from "@/components/admin/AdminShell";
import { ConfirmForm } from "@/components/admin/ConfirmForm";
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
        <p className={styles.panelIntro}>Upravte nabídku služeb, pořadí zobrazení a označení hlavních služeb.</p>

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
              <button type="submit" className={styles.button}>
                Vytvořit službu
              </button>
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
              <div className={styles.cardMeta}>
                Pořadí: {service.order} · Hlavní služba: {service.featured ? "Ano" : "Ne"}
              </div>
              <form action={actions.updateServiceAction} className={styles.form}>
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
                <div className={styles.buttonRow}>
                  <button type="submit" className={styles.button}>
                    Uložit
                  </button>
                </div>
              </form>
              <div className={styles.buttonRow}>
                <form action={actions.toggleServiceFeaturedAction} className={styles.inlineForm}>
                  <input type="hidden" name="id" value={service.id} />
                  <input type="hidden" name="featured" value={service.featured ? "false" : "true"} />
                  <button type="submit" className={styles.buttonSecondary}>
                    {service.featured ? "Odebrat z hlavních" : "Označit jako hlavní"}
                  </button>
                </form>
                <ConfirmForm
                  action={actions.deleteServiceAction}
                  method="post"
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
