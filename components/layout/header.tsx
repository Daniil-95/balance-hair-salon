import { NAV_ITEMS } from "@/lib/constants";
import styles from "./header.module.scss";

const navItems = NAV_ITEMS;

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a href="#home" className={styles.brand}>
          Balance
        </a>

        <nav className={styles.nav} aria-label="Hlavní navigace">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className={styles.link}>
              {item.label}
            </a>
          ))}
        </nav>

        <a href="#contact" className={styles.cta}>
          Objednat se online
        </a>
      </div>
    </header>
  );
}
