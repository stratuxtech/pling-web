"use client";

import { useRef } from "react";
import { nosotrosPage } from "@/content/site";
import { Title, Subline } from "@/components/ui/Title";
import { Rich } from "@/components/ui/Rich";
import { IconHeart, IconSpark, IconTrendUp } from "@/components/icons";
import { useScrollSteps } from "@/components/motion/useScrollSteps";
import styles from "./PorQueNace.module.css";

const { porQueNace } = nosotrosPage;
const icons = { empresarios: <IconTrendUp className="size-7" />, confianza: <IconHeart className="size-7" /> };

/**
 * Por qué nace Pling. Escritorio: la sección se ancla con el título a la
 * izquierda y una sola tarjeta a la derecha; al bajar, la primera sale y
 * entra la segunda (y al subir, al revés). Móvil: las dos tarjetas apiladas.
 */
export function PorQueNace() {
  const ref = useRef<HTMLElement>(null);
  const { active, pinned } = useScrollSteps(ref, porQueNace.items.length);

  return (
    <section ref={ref} className={styles.section} data-pinned={pinned ? "" : undefined} aria-labelledby="nace-title">
      <div className={styles.sticky}>
        <div className={styles.inner}>
          <div className={styles.head}>
            <Subline icon={<IconSpark />}>{porQueNace.subline}</Subline>
            <Title id="nace-title" parts={porQueNace.title} className={styles.title} />
            <ol className={styles.progress} aria-hidden>
              {porQueNace.items.map((it, i) => (
                <li key={it.id} data-on={i === active ? "" : undefined} />
              ))}
            </ol>
          </div>
          <ol className={styles.stack}>
            {porQueNace.items.map((it, i) => (
              <li key={it.id} className={styles.card} data-state={!pinned ? "static" : i === active ? "in" : i < active ? "past" : "next"}>
                <div className={styles.cardBody}>
                  <p className={styles.kicker}>
                    Razón {i + 1} de {porQueNace.items.length}
                  </p>
                  <h3 className={styles.cardTitle}>{it.title}</h3>
                  <p className={styles.text}>
                    <Rich text={it.text} />
                  </p>
                </div>
                <span className={styles.icon} data-id={it.id} aria-hidden>
                  {icons[it.id]}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
