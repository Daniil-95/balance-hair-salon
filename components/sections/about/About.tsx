import Image from "next/image";
import styles from "./about.module.scss";

export function About() {
  return (
    <section id="about" className={styles.about}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.content}>
            <span className={styles.overline}>O nás</span>
            <h2>Vítejte v Balance kadeřnickém studiu.</h2>
            <p>
              Spojujeme profesionální péči, moderní techniky a kvalitní produkty,
              abychom zvýraznili vaši přirozenou krásu. Ke každému klientovi
              přistupujeme individuálně a s maximální péčí.
            </p>
            <p>
              Naše práce je založená na detailu, náladě a výsledném pocitu
              sebevědomí. Rádi vytvoříme střih, barvu i styling, který bude
              přesně odpovídat vašemu stylu.
            </p>
          </div>
          <div className={styles.imageWrapper}>
            <div className={styles.imageMain}>
              <Image
                src="/images/image.png"
                alt="Interiér kadeřnického studia Balance"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.imageFill}
                style={{ objectFit: "cover", objectPosition: "center left" }}
              />
            </div>
            <div className={styles.imageCutaway}>
              <Image
                src="/images/image.png"
                alt="Detail salonu Balance"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.imageFill}
                style={{ objectFit: "cover", objectPosition: "right center" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
