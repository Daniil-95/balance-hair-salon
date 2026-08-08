import { useEffect, useState } from "react";
import styles from "./toast.module.scss";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  duration?: number;
  onClose: () => void;
}

export function Toast({ message, type = "info", duration = 4000, onClose }: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setVisible(false);
      onClose();
    }, duration);

    return () => window.clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) {
    return null;
  }

  return <div className={`${styles.toast} ${styles[type]}`}>{message}</div>;
}
