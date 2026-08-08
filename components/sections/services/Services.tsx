import { SectionTitle } from "@/components/ui/section-title";
import styles from "./services.module.scss";

const services = [
  { icon: "01", title: "Dámské střihy", note: "Střihy a styling na míru" },
  { icon: "02", title: "Pánské střihy", note: "Čistý a přesný tvar" },
  { icon: "03", title: "Dětské střihy", note: "Citlivý přístup" },
  { icon: "04", title: "Barvení vlasů", note: "Od tónování po změnu odstínu" },
  { icon: "05", title: "Melír / balayage", note: "Jemné přechody a světlo" },
  { icon: "06", title: "Regenerační péče", note: "Obnova kvality vlasů" },
  { icon: "07", title: "Styling", note: "Foukání a finální úprava" }
];

export function Services() {
  return (
    <section id="services" className={styles.services}>
      <div className="container">
        <SectionTitle
          label="Naše služby"
          title="Kadeřnické služby, které působí přirozeně a precizně."
          description="Vyberte si z našich specializovaných služeb pro střih, barvení, styling a regeneraci vlasů."
        />
        <div className={styles.grid}>
          {services.map((service) => (
            <article key={service.title} className={styles.card}>
              <span className={styles.icon}>{service.icon}</span>
              <h3>{service.title}</h3>
              <p>{service.note}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
