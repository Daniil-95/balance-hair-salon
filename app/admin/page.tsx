import { AdminShell } from "@/components/admin/AdminShell";
import styles from "@/components/admin/admin-shell.module.scss";

export default function AdminDashboardPage() {
  return (
    <AdminShell>
      <section className={styles.panel}>
        <h1 className={styles.panelHeading}>Salon Admin Dashboard</h1>
        <p>Use the navigation panel to update services, gallery items, and settings.</p>
      </section>
    </AdminShell>
  );
}
