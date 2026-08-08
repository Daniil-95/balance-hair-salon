import { SectionTitle } from "@/components/ui/section-title";
import styles from "./services.module.scss";

const services = [
  { icon: "✂️", title: "Dámské střihy" },
  { icon: "🧔", title: "Pánské střihy" },
  { icon: "👦", title: "Dětské střihy" },
  { icon: "🎨", title: "Barvení vlasů" },
  { icon: "✨", title: "Melír / balayage" },
  { icon: "💆", title: "Regenerační péče" }
];

export function Services() {
  return (
    <section id="services" className={styles.services}>
      <div className="container">
        <SectionTitle
          label="Naše služby"
          title="Luxusní péče pro každého klienta"
          description="Vyberte si z našich specializovaných služeb pro střih, barvení, styling a regeneraci vlasů."
        />
        <div className={styles.grid}>
          {services.map((service) => (
            <article key={service.title} className={styles.card}>
              <span className={styles.icon}>{service.icon}</span>
              <h3>{service.title}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
