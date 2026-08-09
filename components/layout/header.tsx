"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      setIsVisible(window.scrollY > 60);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });

    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      document.body.style.removeProperty("overflow");
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.removeProperty("overflow");
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  return (
    <header className={`${styles.header} ${isVisible ? styles.headerVisible : styles.headerHidden}`}>
      <div className={styles.inner}>
        <Link href="/#home" className={styles.brand}>
          <span className={styles.brandName}>{brandName || BRAND_NAME}</span>
          <span className={styles.brandSub}>{brandSub || BRAND_SUB}</span>
        </Link>

        <button
          type="button"
          className={`${styles.menuToggle} ${isMenuOpen ? styles.menuToggleOpen : ""}`.trim()}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav-drawer"
          aria-label={isMenuOpen ? "Zavřít navigaci" : "Otevřít navigaci"}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span className={styles.menuLine} />
          <span className={styles.menuLine} />
          <span className={styles.menuLine} />
        </button>

        <nav
          id="mobile-nav-drawer"
          className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ""}`.trim()}
          aria-label="Hlavní navigace"
        >
          <button
            type="button"
            className={styles.menuClose}
            aria-label="Zavřít navigaci"
            onClick={() => setIsMenuOpen(false)}
          >
            Zavřít
          </button>
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={styles.link}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}

          <a href="/admin/login" className={`${styles.adminAccess} ${styles.drawerAction}`.trim()}>
            Administrace
          </a>

          {ctaUrl ? (
            <a
              href={ctaUrl}
              target="_blank"
              rel="noreferrer"
              className={`${styles.cta} ${styles.drawerAction}`.trim()}
              onClick={() => setIsMenuOpen(false)}
            >
              <svg className={styles.ctaIcon} aria-hidden="true" viewBox="0 0 24 24" fill="none">
                <rect x="4" y="5" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="1.7" />
                <path d="M7 3.5V7M17 3.5V7M4 9H20" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                <path d="M8 12.5H11M13 12.5H16M8 16H11" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              </svg>
              {ctaLabel || "Objednat"}
            </a>
          ) : null}
        </nav>

        <button
          type="button"
          className={`${styles.overlay} ${isMenuOpen ? styles.overlayVisible : ""}`.trim()}
          aria-label="Zavřít navigaci"
          onClick={() => setIsMenuOpen(false)}
        />

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
