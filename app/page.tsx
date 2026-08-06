import { SectionTitle } from "@/components/ui/section-title";
import { motion } from "framer-motion";
import styles from "./page.module.scss";

const serviceItems = [
  { label: "Women’s haircut", value: "Women’s haircut" },
  { label: "Men’s haircut", value: "Men’s haircut" },
  { label: "Kids haircut", value: "Kids haircut" },
  { label: "Hair coloring", value: "Hair coloring" },
  { label: "Balayage", value: "Balayage" },
  { label: "Hair treatment", value: "Hair treatment" }
];

export default function HomePage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className={styles.heroCopy}
            >
              <p className={styles.heroLabel}>Balance hair studio</p>
              <h1 className={styles.heroTitle}>Your style. Our care.</h1>
              <p className={styles.heroText}>
                Premium luxury salon experience for modern clients seeking beautiful, personalized hair care.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="container">
        <SectionTitle
          label="Our services"
          title="Beauty services designed for every moment"
          description="Discover a curated selection of premium cuts, coloring, treatments and styling services, crafted with attention to texture, tone and balance."
        />
        <div className={styles.serviceGrid}>
          {serviceItems.map((item) => (
            <motion.article
              key={item.label}
              className={styles.serviceCard}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.serviceIcon}>✂️</div>
              <h3>{item.label}</h3>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
}
