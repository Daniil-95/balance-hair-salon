"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AdminFlash } from "@/components/admin/AdminFlash";
import styles from "./admin-shell.module.scss";

interface AdminShellProps {
  children: ReactNode;
}

const navItems = [
  { href: "/admin", label: "Přehled", icon: "⌂" },
  { href: "/admin/hero", label: "Úvodní sekce", icon: "★" },
  { href: "/admin/about", label: "O nás", icon: "◐" },
  { href: "/admin/services", label: "Služby", icon: "✂" },
  { href: "/admin/gallery", label: "Galerie", icon: "▦" },
  { href: "/admin/pricing", label: "Ceník", icon: "Kč" },
  { href: "/admin/contact", label: "Kontakt", icon: "@" },
  { href: "/admin/seo", label: "SEO", icon: "↗" },
  { href: "/admin/settings", label: "Nastavení", icon: "⚙" }
];

function isActive(pathname: string, href: string) {
  return href === "/admin" ? pathname === href : pathname.startsWith(href);
}

export function AdminShell({ children }: AdminShellProps) {
  const pathname = usePathname();

  return (
    <div className={styles.adminShell}>
      <aside className={styles.nav} aria-label="Administrace">
        <div className={styles.navHeader}>
          <div>
            <div className={styles.brand}>Balance</div>
            <div className={styles.brandSub}>Administrace salonu</div>
          </div>
        </div>

        <nav className={styles.navList}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navLink} ${isActive(pathname, item.href) ? styles.navLinkActive : ""}`.trim()}
            >
              <span className={styles.navIcon} aria-hidden="true">
                {item.icon}
              </span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <form action="/api/admin/logout" method="post" className={styles.logoutForm}>
          <button type="submit" className={styles.logoutButton}>
            Odhlásit se
          </button>
        </form>
      </aside>
      <main className={styles.content}>
        <AdminFlash />
        {children}
      </main>
    </div>
  );
}
