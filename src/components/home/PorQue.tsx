import Image from "next/image";
import { home } from "@/content/site";
import { Title } from "@/components/ui/Title";
import styles from "./PorQue.module.css";

export function PorQue() {
  const { porQue } = home;
  return (
    <section className={styles.section} aria-labelledby="porque-title">
      <Title id="porque-title" parts={porQue.title} className={styles.title} />
      <div className={styles.grid}>
        {porQue.columns.map((c, i) => (
          <article key={c.id} className={styles.card} data-side={i}>
            <div className={styles.media} data-cursor="Quiero Pling" data-cursor-modal>
              <Image src={c.img.src} alt={c.img.alt} fill sizes="(min-width: 1024px) 40vw, 92vw" className={styles.img} />
            </div>
            <div className={styles.body}>
              <h3 className={styles.cardTitle}>{c.title}</h3>
              <p className={styles.text}>{c.text}</p>
              <p className={styles.credit}>
                Foto:{" "}
                <a href={c.img.credit.url} target="_blank" rel="noopener">
                  {c.img.credit.by}
                </a>
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
