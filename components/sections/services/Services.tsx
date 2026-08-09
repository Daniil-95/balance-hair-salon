"use client";

import type { CSSProperties } from "react";
import { SectionTitle } from "@/components/ui/section-title";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import styles from "./services.module.scss";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface ServicesProps {
  services: ServiceItem[];
  sectionTitle?: string;
  sectionDescription?: string;
}

function normalizeIconKind(icon: string, title: string) {
  const value = `${icon} ${title}`.toLowerCase();

  if (value.includes("dam") || value.includes("women")) return "women";
  if (value.includes("pan") || value.includes("men")) return "men";
  if (value.includes("det") || value.includes("kid")) return "kids";
  if (value.includes("barv") || value.includes("color")) return "color";
  if (value.includes("mel") || value.includes("balay")) return "balayage";
  if (value.includes("regen") || value.includes("care")) return "care";
  if (value.includes("sty")) return "styling";

  return "care";
}

function ServiceIcon({ kind }: { kind: string }) {
  switch (kind) {
    case "women":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M7.9 10.3c0-2.9 1.8-4.9 4.1-4.9s4.1 2 4.1 4.9c0 2.6-1.4 5-4.1 5s-4.1-2.4-4.1-5Z" stroke="currentColor" strokeWidth="1.7" />
          <path d="M7.3 18.8c.6-2.6 2.5-4.1 4.7-4.1 2.2 0 4.1 1.5 4.7 4.1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          <path d="M8.8 8.5c.8.7 1.9 1.1 3.2 1.1 1.4 0 2.5-.4 3.3-1.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      );
    case "men":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M8 18.8c.6-2.4 2.4-3.9 4.3-3.9 2 0 3.8 1.5 4.4 3.9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          <path d="M8.9 10.2c0-2.4 1.5-4.2 3.5-4.2 1.9 0 3.5 1.8 3.5 4.2s-1.6 4.2-3.5 4.2c-2 0-3.5-1.8-3.5-4.2Z" stroke="currentColor" strokeWidth="1.7" />
          <path d="M9.3 8.4c.8-.9 1.9-1.4 3.2-1.4 1.1 0 2.1.3 2.8 1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      );
    case "kids":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="10.8" r="3.6" stroke="currentColor" strokeWidth="1.7" />
          <path d="M8.8 9.6 7.2 8.3M15.2 9.6l1.6-1.3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          <path d="M10.6 10.7h.01M13.4 10.7h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M10.5 12.9c.5.6 1 .9 1.5.9s1-.3 1.5-.9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          <path d="M8.1 18.8c.5-2.1 1.9-3.4 3.9-3.4s3.4 1.3 3.9 3.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      );
    case "color":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M7 17.5 15 9.5l2.4 2.4-8 8H7v-2.4Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
          <path d="m14 10.5 2.7-2.7 1.3 1.3-2.7 2.7" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
          <path d="M6.6 19.9H11" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      );
    case "balayage":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M7.2 5.8c0 4.4 2.1 5.2 2.1 9.2 0 2-.8 3.6-1.4 4.9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          <path d="M11.3 5.8c0 4.2 2.1 5.3 2.1 9.1 0 1.9-.7 3.5-1.3 4.8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          <path d="M15.4 5.8c0 3.9 1.8 5.1 1.8 8.7 0 1.8-.6 3.2-1.2 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      );
    case "care":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M9.2 6c0-.8.6-1.4 1.4-1.4h2.8c.8 0 1.4.6 1.4 1.4v1.8H9.2V6Z" stroke="currentColor" strokeWidth="1.7" />
          <path d="M8.8 7.8h6.4v11.1c0 .8-.6 1.4-1.4 1.4h-3.6c-.8 0-1.4-.6-1.4-1.4V7.8Z" stroke="currentColor" strokeWidth="1.7" />
          <path d="M10.4 11h3.2M10.4 13.5h3.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      );
    case "styling":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5.8 12h6.8l2.9-2.9a1.4 1.4 0 0 1 2 0l.2.2a1.4 1.4 0 0 1 0 2l-2.4 2.4V17" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5.8 10.3h1.8M5.8 13.7h1.8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          <path d="M15.3 17h2.7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}

export function Services({ services, sectionTitle, sectionDescription }: ServicesProps) {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section id="services" ref={ref} className={`${styles.services} scroll-reveal-section ${isVisible ? "is-visible" : ""}`}>
      <div className="container">
        <SectionTitle
          className="lux-reveal"
          label="Služby"
          title={sectionTitle || "Střih, barvení a péče v jednom místě."}
          description={sectionDescription || "Vyberte si službu podle svého stylu a potřeb vlasů."}
        />
        <div className={styles.grid}>
          {services.map((service, index) => (
            <article key={service.id} className={`${styles.card} lux-glow-hover`} style={{ "--card-delay": `${index * 70}ms` } as CSSProperties}>
              <span className={styles.icon}>
                <ServiceIcon kind={normalizeIconKind(service.icon, service.title)} />
              </span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
