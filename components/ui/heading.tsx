import type { ReactNode } from "react";
import styles from "./heading.module.scss";

interface HeadingProps {
  level?: 1 | 2 | 3 | 4;
  children: ReactNode;
  className?: string;
}

export function Heading({ level = 2, children, className = "" }: HeadingProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return <Tag className={`${styles.heading} ${className}`.trim()}>{children}</Tag>;
}
