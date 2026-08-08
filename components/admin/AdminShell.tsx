import type { ReactNode } from "react";
import Link from "next/link";
import styles from "./admin-shell.module.scss";

interface AdminShellProps {
  children: ReactNode;
}

export function AdminShell({ children }: AdminShellProps) {
  return (
    <div className={styles.adminShell}>
      <aside className={styles.nav}>
        <div className={styles.brand}>Salon admin</div>
        <nav className={styles.navList}>
          <Link href="/admin" className={styles.navLink}>
            Dashboard
          </Link>
          <Link href="/admin/services" className={styles.navLink}>
            Services
          </Link>
          <Link href="/admin/gallery" className={styles.navLink}>
            Gallery
          </Link>
          <Link href="/admin/pricing" className={styles.navLink}>
            Pricing
          </Link>
          <Link href="/admin/contact" className={styles.navLink}>
            Contact
          </Link>
          <Link href="/admin/settings" className={styles.navLink}>
            Settings
          </Link>
        </nav>
        <form action="/api/admin/logout" method="post" className={styles.logoutForm}>
          <button type="submit" className={styles.logoutButton}>
            Sign out
          </button>
        </form>
      </aside>
      <main className={styles.content}>{children}</main>
    </div>
  );
}
