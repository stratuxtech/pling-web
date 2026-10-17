"use client";

import Image from "next/image";
import { useRef } from "react";
import { filosofiaPage } from "@/content/site";
import { Title, Subline } from "@/components/ui/Title";
import { Rich } from "@/components/ui/Rich";
import { IconCheck } from "@/components/icons";
import { useScrollSteps } from "@/components/motion/useScrollSteps";
import styles from "./Solucion.module.css";

const { solucion } = filosofiaPage;
const count = solucion.items.length;

/**
 * Pling como solución: una tarjeta por etapa del live (antes / en / después).
 * Escritorio: la sección se ancla; primero se ve una tarjeta centrada y, al
 * bajar, aparece la siguiente a su derecha y luego la otra, recentrando el
 * grupo. Las tarjetas crecen en hover e iluminan su base.
 */
export function Solucion() {
  const ref = useRef<HTMLElement>(null);
  const { active, pinned } = useScrollSteps(ref, count);
  const visible = pinned ? active + 1 : count;
  const shift = (count - visible) / 2;

  return (
    <section ref={ref} className={styles.section} data-pinned={pinned ? "" : undefined} aria-labelledby="solucion-title">
      <div className={styles.sticky}>
        <div className={styles.inner}>
          <div className={styles.head}>
            <Subline icon={<IconCheck />}>{solucion.subline}</Subline>
            <Title id="solucion-title" parts={solucion.title} className={styles.title} />
            <p className={styles.intro}>
              <Rich text={solucion.intro} />
            </p>
          </div>
          <ol className={styles.grid}>
            {solucion.items.map((it, i) => (
              <li
                key={it.id}
                className={styles.slot}
                data-shown={i < visible ? "" : undefined}
                style={{ "--shift": shift } as React.CSSProperties}
              >
                <article className={styles.card} data-id={it.id}>
                  <div className={styles.media} aria-hidden>
                    <div className={styles.screen}>
                      <Image src={it.img.src} alt="" fill sizes="(min-width: 64rem) 16vw, 60vw" className={styles.img} />
                    </div>
                  </div>
                  <div className={styles.body}>
                    <p className={styles.stepNum}>Paso {i + 1}</p>
                    <h3 className={styles.stage}>{it.stage}</h3>
                    <p className={styles.cardTitle}>{it.title}</p>
                    <p className={styles.text}>
                      <Rich text={it.text} />
                    </p>
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
