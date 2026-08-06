import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import styles from "./section-title.module.scss";

interface SectionTitleProps {
  label: string;
  title: string;
  description?: string;
  className?: string;
  children?: ReactNode;
}

export function SectionTitle({ label, title, description, className = "", children }: SectionTitleProps) {
  return (
    <div className={cn(styles.wrapper, className)}>
      <p className={styles.label}>{label}</p>
      <h2 className={styles.title}>{title}</h2>
      {description ? <p className={styles.description}>{description}</p> : null}
      {children}
    </div>
  );
}
