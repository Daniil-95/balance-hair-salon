import type { InputHTMLAttributes } from "react";
import styles from "./switch.module.scss";

interface SwitchProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Switch({ label, id, ...props }: SwitchProps) {
  const switchId = id ?? `switch-${Math.random().toString(36).slice(2, 8)}`;

  return (
    <label className={styles.switch} htmlFor={switchId}>
      <input id={switchId} type="checkbox" {...props} />
      <span className={styles.track} />
      {label ? <span>{label}</span> : null}
    </label>
  );
}
