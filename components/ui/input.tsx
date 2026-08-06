import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import styles from "./input.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className, id, ...props }: InputProps) {
  const inputId = id ?? `input-${Math.random().toString(36).slice(2, 8)}`;

  return (
    <label className={styles.field} htmlFor={inputId}>
      {label ? <span className={styles.label}>{label}</span> : null}
      <input id={inputId} className={cn(styles.input, error && styles.invalid, className)} {...props} />
      {error ? <span className={styles.error}>{error}</span> : null}
    </label>
  );
}
