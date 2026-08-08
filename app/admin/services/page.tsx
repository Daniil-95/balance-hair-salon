import { AdminShell } from "@/components/admin/AdminShell";
import { getServices } from "@/lib/services";
import * as actions from "./actions";
import styles from "@/components/admin/admin-shell.module.scss";

export const revalidate = 0;

export default async function AdminServicesPage() {
  const services = await getServices();

  return (
    <AdminShell>
      <section className={styles.panel}>
        <h1 className={styles.panelHeading}>Manage Services</h1>
        <p>Update salon services, featured visibility, and order.</p>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Create Service</h2>
          <form action={actions.createServiceAction} method="post">
            <div className={styles.formGroup}>
              <label className={styles.label}>Title</label>
              <input name="title" className={styles.input} required />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Description</label>
              <textarea name="description" className={styles.textarea} required />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Icon</label>
              <input name="icon" className={styles.input} required />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Order</label>
              <input name="order" className={styles.input} type="number" defaultValue={0} />
            </div>
            <button type="submit" className={styles.button}>
              Create Service
            </button>
          </form>
        </div>

        <div className={styles.previewGrid}>
          {services.map((service) => (
            <div key={service.id} className={styles.card}>
              <div className={styles.cardTitle}>{service.title}</div>
              <div className={styles.cardMeta}>
                Order: {service.order} · Featured: {service.featured ? "Yes" : "No"}
              </div>
              <form action={actions.updateServiceAction} method="post">
                <input type="hidden" name="id" value={service.id} />
                <div className={styles.formGroup}>
                  <label className={styles.label}>Title</label>
                  <input name="title" className={styles.input} defaultValue={service.title} required />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Description</label>
                  <textarea name="description" className={styles.textarea} defaultValue={service.description} required />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Icon</label>
                  <input name="icon" className={styles.input} defaultValue={service.icon} required />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Order</label>
                  <input name="order" className={styles.input} type="number" defaultValue={service.order} />
                </div>
                <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                  <button type="submit" className={styles.button}>
                    Save
                  </button>
                </div>
              </form>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
                <form action={actions.toggleServiceFeaturedAction} method="post">
                  <input type="hidden" name="id" value={service.id} />
                  <input type="hidden" name="featured" value={service.featured ? "false" : "true"} />
                  <button type="submit" className={styles.buttonSecondary}>
                    {service.featured ? "Unfeature" : "Feature"}
                  </button>
                </form>
                <form action={actions.deleteServiceAction} method="post">
                  <input type="hidden" name="id" value={service.id} />
                  <button type="submit" className={styles.buttonSecondary}>
                    Delete
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </section>
    </AdminShell>
  );
}
