import type { ReactNode } from "react";
import styles from "./empty-state.module.scss";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: ReactNode;
}

export function EmptyState({ title, description, icon }: EmptyStateProps) {
  return (
    <div className={styles.emptyState}>
      {icon ? <div className={styles.icon}>{icon}</div> : null}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
