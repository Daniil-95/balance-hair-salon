import type { ReactNode } from "react";
import { useState } from "react";
import styles from "./tabs.module.scss";

interface TabItem {
  label: string;
  content: ReactNode;
}

interface TabsProps {
  items: TabItem[];
}

export function Tabs({ items }: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={styles.tabs}>
      <div className={styles.list} role="tablist">
        {items.map((item, index) => (
          <button
            key={item.label}
            type="button"
            className={`${styles.tab} ${activeIndex === index ? styles.active : ""}`.trim()}
            role="tab"
            aria-selected={activeIndex === index}
            onClick={() => setActiveIndex(index)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className={styles.panel} role="tabpanel">
        {items[activeIndex]?.content}
      </div>
    </div>
  );
}
