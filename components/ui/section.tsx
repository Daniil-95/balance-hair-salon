import type { ReactNode } from "react";
import styles from "./section.module.scss";

interface SectionProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export function Section({ title, subtitle, children, className = "" }: SectionProps) {
  return (
    <section className={`${styles.section} ${className}`.trim()}>
      <div className={styles.header}>
        {title ? <h2>{title}</h2> : null}
        {subtitle ? <p>{subtitle}</p> : null}
      </div>
      <div className={styles.body}>{children}</div>
    </section>
  );
}
