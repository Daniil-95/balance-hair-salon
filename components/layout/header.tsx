import Link from "next/link";
import { NAV_ITEMS } from "@/lib/constants";
import styles from "./header.module.scss";

const navItems = NAV_ITEMS;

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>
          Balance
        </Link>

        <nav className={styles.nav} aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={styles.link}>
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/contact" className={styles.cta}>
          Book online
        </Link>
      </div>
    </header>
  );
}
