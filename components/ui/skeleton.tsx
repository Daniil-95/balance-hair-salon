import styles from "./skeleton.module.scss";

interface SkeletonProps {
  width?: string;
  height?: string;
  className?: string;
}

export function Skeleton({ width = "100%", height = "1rem", className = "" }: SkeletonProps) {
  return <div className={`${styles.skeleton} ${className}`.trim()} style={{ width, height }} />;
}
