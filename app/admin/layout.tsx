import type { Metadata } from "next";
import styles from "@/components/admin/admin-shell.module.scss";

export const metadata: Metadata = {
  title: "Administrace | Balance Hair Salon",
  description: "Chráněná administrace salonu pro úpravu služeb, galerie, ceníku, kontaktů a nastavení."
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className={styles.adminRoot}>{children}</div>;
}
