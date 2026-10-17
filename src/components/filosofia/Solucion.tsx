"use client";

import { useRef } from "react";
import { filosofiaPage } from "@/content/site";
import { Title, Subline } from "@/components/ui/Title";
import { Rich } from "@/components/ui/Rich";
import { Phone } from "@/components/ui/Phone";
import { IconCheck } from "@/components/icons";
import { useScrollSteps } from "@/components/motion/useScrollSteps";
import styles from "./Solucion.module.css";

const { solucion } = filosofiaPage;
const count = solucion.items.length;

/**
 * Pling como solución: una tarjeta por etapa del live (antes / en / después).
 * Escritorio: la sección se ancla; primero se ve una tarjeta centrada y, al
 * bajar, aparece la siguiente a su derecha y luego la otra, recentrando el
 * grupo. Móvil: también anclada, una tarjeta a la vez (entra la siguiente y
 * sale la anterior). Las tarjetas crecen en hover e iluminan su base.
 */
export function Solucion() {
  const ref = useRef<HTMLElement>(null);
  const { active, pinned, compact } = useScrollSteps(ref, count, { mobile: true });
  const visible = pinned ? active + 1 : count;
  const shift = (count - visible) / 2;

  return (
    <section ref={ref} className={styles.section} data-pinned={pinned ? "" : undefined} data-compact={compact ? "" : undefined} aria-labelledby="solucion-title">
      <div className={styles.sticky}>
        <div className={styles.inner}>
          <div className={styles.head}>
            <Subline as="h2" id="solucion-title" icon={<IconCheck />}>{solucion.subline}</Subline>
            <Title as="p" parts={solucion.title} className={styles.title} />
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
                data-state={i === active ? "in" : i < active ? "past" : "next"}
                style={{ "--shift": shift } as React.CSSProperties}
              >
                <article className={styles.card} data-id={it.id}>
                  <div className={styles.media} aria-hidden>
                    <Phone screens={[{ ...it.img, alt: "" }]} tilt={false} sizes="(min-width: 64rem) 9vw, 32vw" />
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
