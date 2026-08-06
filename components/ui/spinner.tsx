import styles from "./spinner.module.scss";

export function Spinner() {
  return <div className={styles.spinner} aria-label="Loading" role="status" />;
}
