import Image from "next/image";
import { home } from "@/content/site";
import { Subline, Title } from "@/components/ui/Title";
import { Button } from "@/components/ui/Button";
import { Rich } from "@/components/ui/Rich";
import { IconHeart } from "@/components/icons";
import styles from "./PorQue.module.css";

/**
 * Por qué queremos ayudarte: texto arriba y foto abajo en cada columna. La
 * foto entra grande y se achica al hacer scroll (como Misión en Nosotros),
 * creciendo siempre hacia abajo y hacia fuera para no tapar el texto.
 */
export function PorQue() {
  const { porQue } = home;
  return (
    <section className={styles.section} aria-labelledby="porque-title">
      <div className={styles.inner}>
        <div className={styles.head}>
          <div className={styles.headCopy}>
            <Subline icon={<IconHeart />}>{porQue.subline}</Subline>
            <Title id="porque-title" parts={porQue.title} className={styles.title} />
          </div>
          <Button action={porQue.cta} variant="outline" />
        </div>
        <div className={styles.grid}>
          {porQue.columns.map((c, i) => (
            <article key={c.id} className={styles.card} data-side={i}>
              <div className={styles.body}>
                <h3 className={styles.cardTitle}>{c.title}</h3>
                <p className={styles.text}>
                  <Rich text={c.text} />
                </p>
              </div>
              <div className={styles.media} data-cursor="Quiero Pling" data-cursor-modal>
                <Image src={c.img.src} alt={c.img.alt} fill sizes="(min-width: 1024px) 40vw, 92vw" className={styles.img} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
