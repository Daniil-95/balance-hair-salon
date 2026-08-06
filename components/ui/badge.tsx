import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import styles from "./badge.module.scss";

interface BadgeProps {
  variant?: "default" | "success" | "outline";
  children: ReactNode;
  className?: string;
}

export function Badge({ variant = "default", children, className = "" }: BadgeProps) {
  return <span className={cn(styles.badge, styles[`badge-${variant}`], className)}>{children}</span>;
}
