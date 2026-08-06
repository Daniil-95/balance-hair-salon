import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import styles from "./card.module.scss";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return <div className={cn(styles.card, className)}>{children}</div>;
}
