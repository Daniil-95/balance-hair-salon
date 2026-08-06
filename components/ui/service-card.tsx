import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import styles from "./service-card.module.scss";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  className?: string;
}

export function ServiceCard({ title, description, icon, className = "" }: ServiceCardProps) {
  return (
    <article className={cn(styles.card, className)}>
      <div className={styles.icon}>{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}
