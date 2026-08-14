"use client";

import type { CSSProperties } from "react";
import { SectionTitle } from "@/components/ui/section-title";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import styles from "./pricing.module.scss";

interface PricingItem {
  label: string;
  value: string;
}

interface PricingCategory {
  title: string;
  items: PricingItem[];
}

interface PricingProps {
  categories: PricingCategory[];
  sectionTitle?: string;
  sectionDescription?: string;
}

export function Pricing({ categories, sectionTitle, sectionDescription }: PricingProps) {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section id="pricing" ref={ref} className={`${styles.pricing} scroll-reveal-section ${isVisible ? "is-visible" : ""}`}>
      <div className="container">
        <SectionTitle
          className="lux-reveal"
          label="Ceník"
          title={sectionTitle || "Ceny služeb na jednom místě."}
          description={sectionDescription || "Přesná cena závisí na délce, hustotě vlasů a zvoleném výsledku."}
        />
        <div className={styles.inner}>
          <div className={`${styles.preview} lux-reveal-left`}>
            <p className={styles.previewLabel}>Přehled služeb</p>
            <div className={styles.serviceGrid}>
              {categories.map((column, index) => (
                <article key={column.title} className={`${styles.serviceCard} lux-glow-hover`} style={{ "--reveal-delay": `${120 + index * 90}ms` } as CSSProperties}>
                  <h3>{column.title}</h3>
                  <ul>
                    {column.items.map((item) => (
                      <li key={item.label}>
                        <span className={styles.itemLabel}>{item.label}</span>
                        <span className={styles.itemRule} aria-hidden="true" />
                        <strong>{item.value}</strong>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
