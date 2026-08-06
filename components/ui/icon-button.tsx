import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import styles from "./icon-button.module.scss";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  ariaLabel: string;
}

export function IconButton({ ariaLabel, className, children, ...props }: IconButtonProps) {
  return (
    <button className={cn(styles.button, className)} aria-label={ariaLabel} {...props}>
      {children}
    </button>
  );
}
