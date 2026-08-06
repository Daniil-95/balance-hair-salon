import type { ReactNode } from "react";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import styles from "./modal.module.scss";

interface ModalProps {
  open: boolean;
  title?: string;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

export function Modal({ open, title, onClose, children, className }: ModalProps) {
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    if (open) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <div className={cn(styles.content, className)}>
        {title ? <div className={styles.header}>{title}</div> : null}
        <button type="button" className={styles.close} onClick={onClose} aria-label="Close modal">
          ×
        </button>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
}
