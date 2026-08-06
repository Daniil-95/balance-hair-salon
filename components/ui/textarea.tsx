import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import styles from "./textarea.module.scss";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({ label, error, className, id, ...props }: TextareaProps) {
  const textareaId = id ?? `textarea-${Math.random().toString(36).slice(2, 8)}`;

  return (
    <label className={styles.field} htmlFor={textareaId}>
      {label ? <span className={styles.label}>{label}</span> : null}
      <textarea id={textareaId} className={cn(styles.textarea, error && styles.invalid, className)} {...props} />
      {error ? <span className={styles.error}>{error}</span> : null}
    </label>
  );
}
