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

export function Header({ brandName = "Balance", brandSub = "Kadeřnické studio", ctaLabel = "Objednat se online", ctaUrl = "https://tiarasro.snippet.myfox.cz/" }: HeaderProps) {
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
          <span className={styles.brandName}>{brandName}</span>
          <span className={styles.brandSub}>{brandSub}</span>
        </a>

        <nav className={styles.nav} aria-label="Hlavní navigace">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className={styles.link}>
              {item.label}
            </a>
          ))}
        </nav>

        <a href={ctaUrl} target="_blank" rel="noreferrer" className={styles.cta}>
          <svg className={styles.ctaIcon} aria-hidden="true" viewBox="0 0 24 24" fill="none">
            <rect x="4" y="5" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="1.7" />
            <path d="M7 3.5V7M17 3.5V7M4 9H20" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            <path d="M8 12.5H11M13 12.5H16M8 16H11" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
          {ctaLabel}
        </a>
      </div>
    </header>
  );
}
