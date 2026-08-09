"use client";

import { Suspense, useEffect, useState, type ReactNode } from "react";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setIsMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.removeProperty("overflow"); };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isMenuOpen]);

  return (
    <div className={styles.adminShell}>
      {/* Sticky top bar — visible only on mobile */}
      <div className={styles.mobileBar}>
        <Link href="/" className={styles.mobileBrand}>Balance</Link>
        <button
          type="button"
          className={`${styles.menuToggle} ${isMenuOpen ? styles.menuToggleOpen : ""}`.trim()}
          aria-expanded={isMenuOpen}
          aria-controls="admin-nav-drawer"
          aria-label={isMenuOpen ? "Zavřít menu" : "Otevřít menu"}
          onClick={() => setIsMenuOpen((o) => !o)}
        >
          <span className={styles.menuLine} />
          <span className={styles.menuLine} />
          <span className={styles.menuLine} />
        </button>
      </div>

      {/* Backdrop */}
      <button
        type="button"
        className={`${styles.overlay} ${isMenuOpen ? styles.overlayVisible : ""}`.trim()}
        aria-label="Zavřít menu"
        onClick={() => setIsMenuOpen(false)}
      />

      <aside
        id="admin-nav-drawer"
        className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ""}`.trim()}
        aria-label="Administrace"
      >
        <button
          type="button"
          className={styles.menuClose}
          aria-label="Zavřít menu"
          onClick={() => setIsMenuOpen(false)}
        >
          ✕ Zavřít
        </button>

        <div className={styles.navHeader}>
          <div>
            <Link href="/" className={styles.brand}>Balance</Link>
            <div className={styles.brandSub}>Administrace salonu</div>
          </div>
        </div>

        <nav className={styles.navList}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navLink} ${isActive(pathname, item.href) ? styles.navLinkActive : ""}`.trim()}
              onClick={() => setIsMenuOpen(false)}
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
        <Suspense fallback={null}>
          <AdminFlash />
        </Suspense>
        {children}
      </main>
    </div>
  );
}
