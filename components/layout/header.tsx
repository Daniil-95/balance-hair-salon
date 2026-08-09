"use client";

import { useEffect, useState } from "react";
import { NAV_ITEMS } from "@/lib/constants";
import styles from "./header.module.scss";

const navItems = NAV_ITEMS;

interface HeaderProps {
  brandName?: string;
  brandSub?: string;
  ctaLabel?: string;
  ctaUrl?: string;
}

const BRAND_NAME = "Balance";
const BRAND_SUB = "Kadeřnické studio";

export function Header({ brandName, brandSub, ctaLabel, ctaUrl }: HeaderProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      setIsVisible(window.scrollY > 60);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });

    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  return (
    <header className={`${styles.header} ${isVisible ? styles.headerVisible : styles.headerHidden}`}>
      <div className={styles.inner}>
        <a href="#home" className={styles.brand}>
          <span className={styles.brandName}>{brandName || BRAND_NAME}</span>
          <span className={styles.brandSub}>{brandSub || BRAND_SUB}</span>
        </a>

        <nav className={styles.nav} aria-label="Hlavní navigace">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className={styles.link}>
              {item.label}
            </a>
          ))}
        </nav>

        <a href="/admin/login" className={styles.adminAccess} aria-label="Přihlásit se do administrace" title="Administrace">
          <svg className={styles.adminAccessIcon} aria-hidden="true" viewBox="0 0 24 24" fill="none">
            <path d="M10 3.8h7a1.8 1.8 0 0 1 1.8 1.8v12.8a1.8 1.8 0 0 1-1.8 1.8h-7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            <path d="M14 12H4.8M8.2 8.6 4.8 12l3.4 3.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>

        <a
          href={ctaUrl || undefined}
          target={ctaUrl ? "_blank" : undefined}
          rel={ctaUrl ? "noreferrer" : undefined}
          aria-disabled={ctaUrl ? undefined : true}
          tabIndex={ctaUrl ? undefined : -1}
          className={styles.cta}
        >
          <svg className={styles.ctaIcon} aria-hidden="true" viewBox="0 0 24 24" fill="none">
            <rect x="4" y="5" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="1.7" />
            <path d="M7 3.5V7M17 3.5V7M4 9H20" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            <path d="M8 12.5H11M13 12.5H16M8 16H11" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
          {ctaLabel || ""}
        </a>
      </div>
    </header>
  );
}
