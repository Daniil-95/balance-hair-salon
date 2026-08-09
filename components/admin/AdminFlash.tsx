"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import styles from "./admin-shell.module.scss";

const FLASH_TTL_MS = 2200;

export function AdminFlash() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [visible, setVisible] = useState(false);

  const message = useMemo(() => {
    if (searchParams.get("saved") === "1") {
      return "Změny byly uloženy.";
    }

    return "";
  }, [searchParams]);

  useEffect(() => {
    if (!message) {
      setVisible(false);
      return;
    }

    setVisible(true);

    const timeout = window.setTimeout(() => {
      setVisible(false);

      const params = new URLSearchParams(searchParams.toString());
      params.delete("saved");
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    }, FLASH_TTL_MS);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [message, pathname, router, searchParams]);

  if (!message || !visible) {
    return null;
  }

  return <p className={`${styles.statusMessage} ${styles.successMessage} ${styles.flashBanner}`}>{message}</p>;
}
