import type { ReactNode } from "react";
import { useState } from "react";
import styles from "./accordion.module.scss";

interface AccordionItem {
  title: string;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
}

export function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className={styles.accordion}>
      {items.map((item, index) => (
        <div key={item.title} className={styles.item}>
          <button
            type="button"
            className={styles.trigger}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            aria-expanded={openIndex === index}
          >
            <span>{item.title}</span>
            <span>{openIndex === index ? "−" : "+"}</span>
          </button>
          {openIndex === index ? <div className={styles.content}>{item.content}</div> : null}
        </div>
      ))}
    </div>
  );
}
