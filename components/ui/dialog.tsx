import type { ReactNode } from "react";
import styles from "./dialog.module.scss";

interface DialogProps {
  title?: string;
  description?: string;
  children: ReactNode;
}

export function Dialog({ title, description, children }: DialogProps) {
  return (
    <div className={styles.dialog} role="dialog" aria-labelledby="dialog-title" aria-describedby="dialog-description">
      {title ? <h2 id="dialog-title" className={styles.title}>{title}</h2> : null}
      {description ? <p id="dialog-description" className={styles.description}>{description}</p> : null}
      <div className={styles.content}>{children}</div>
    </div>
  );
}
