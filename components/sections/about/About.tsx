import styles from "./about.module.scss";

export function About() {
  return (
    <section id="about" className={styles.about}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.content}>
            <span className={styles.overline}>O nás</span>
            <h2>Vítejte v Balance kadeřnickém studiu</h2>
            <p>
              Spojujeme profesionální péči, moderní techniky a kvalitní produkty,
              abychom zvýraznili vaši přirozenou krásu. Ke každému klientovi
              přistupujeme individuálně s maximální péčí a přesností.
            </p>
            <p>
              Naše práce je založená na detailu, náladě a výsledném pocitu
              sebevědomí. Rádi vytvoříme střih, barvu a styling, který bude
              přesně odpovídat vašemu stylu.
            </p>
            <a href="/#contact" className={styles.button}>
              Více o nás
            </a>
          </div>
          <div className={styles.imageWrapper}>
            <div className={styles.imageAccent} />
            <div className={styles.image}>
              <span className={styles.imageLabel}>Balance</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
