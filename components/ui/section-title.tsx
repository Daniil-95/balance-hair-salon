import type { ReactNode } from "react";
import styles from "./section-title.module.scss";

interface SectionTitleProps {
  label: string;
  title: string;
  description?: string;
  children?: ReactNode;
}

export function SectionTitle({ label, title, description, children }: SectionTitleProps) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.label}>{label}</p>
      <h2 className={styles.title}>{title}</h2>
      {description ? <p className={styles.description}>{description}</p> : null}
      {children}
    </div>
  );
}
