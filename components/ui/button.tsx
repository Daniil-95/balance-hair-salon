import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import styles from "./button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "secondary";
  fullWidth?: boolean;
}

export function Button({ variant = "primary", fullWidth = false, className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(styles.button, styles[`button-${variant}`], fullWidth && styles.fullWidth, className)}
      {...props}
    >
      {children}
    </button>
  );
}
