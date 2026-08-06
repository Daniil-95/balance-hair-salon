import type { InputHTMLAttributes } from "react";
import styles from "./checkbox.module.scss";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Checkbox({ label, id, ...props }: CheckboxProps) {
  const checkboxId = id ?? `checkbox-${Math.random().toString(36).slice(2, 8)}`;

  return (
    <label className={styles.checkbox} htmlFor={checkboxId}>
      <input id={checkboxId} type="checkbox" {...props} />
      <span>{label}</span>
    </label>
  );
}
