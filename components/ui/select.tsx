import type { SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import styles from "./select.module.scss";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
}

export function Select({ label, error, className, id, children, ...props }: SelectProps) {
  const selectId = id ?? `select-${Math.random().toString(36).slice(2, 8)}`;

  return (
    <label className={styles.field} htmlFor={selectId}>
      {label ? <span className={styles.label}>{label}</span> : null}
      <select id={selectId} className={cn(styles.select, error && styles.invalid, className)} {...props}>
        {children}
      </select>
      {error ? <span className={styles.error}>{error}</span> : null}
    </label>
  );
}
