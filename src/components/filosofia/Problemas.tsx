"use client";

import Image from "next/image";
import { useRef } from "react";
import { filosofiaPage } from "@/content/site";
import { Title, Subline } from "@/components/ui/Title";
import { useScrollSteps } from "@/components/motion/useScrollSteps";
import styles from "./Problemas.module.css";

const { problemas } = filosofiaPage;
const items = problemas.items;
const tabIds = items.map((it) => `problema-${it.id}`);

/**
 * Problemas al vender: la sección se ancla y el scroll recorre los 3 momentos
 * de caos en orden (Inventario > Live > Delivery), cambiando la foto de fondo
 * y las evidencias. En móvil son pestañas normales.
 */
export function Problemas() {
  const sectionRef = useRef<HTMLElement>(null);
  const { active, pinned, select, onTabKey } = useScrollSteps(sectionRef, items.length);
  const item = items[active];

  return (
    <section ref={sectionRef} className={styles.section} data-pinned={pinned ? "" : undefined} aria-labelledby="problemas-title">
      <div className={styles.sticky}>
        <div className={styles.inner}>
          <div className={styles.copy}>
            <Subline>{problemas.subline}</Subline>
            <Title id="problemas-title" parts={problemas.title} className={styles.title} />

            <div role="tablist" aria-label="Momentos de caos" aria-orientation="vertical" className={styles.tabs} onKeyDown={(e) => onTabKey(e, tabIds)}>
              {items.map((it, i) => (
                <button
                  key={it.id}
                  id={tabIds[i]}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-controls="problema-panel"
                  tabIndex={i === active ? 0 : -1}
                  className={styles.tab}
                  onClick={() => select(i)}
                >
                  <span className={styles.step}>{it.step}</span>
                  <span>{it.title}</span>
                </button>
              ))}
            </div>

            <div id="problema-panel" role="tabpanel" aria-labelledby={tabIds[active]} className={styles.panel}>
              <p key={item.id} className={styles.panelText}>
                {item.text}
              </p>
            </div>
          </div>

          <div className={styles.stage}>
            {items.map((it, i) => (
              <div key={it.id} className={styles.media} data-active={i === active ? "" : undefined} aria-hidden={i !== active}>
                <Image src={it.img.src} alt={i === active ? it.img.alt : ""} fill sizes="(min-width: 64rem) 44vw, 92vw" className={styles.img} />
              </div>
            ))}
            <ul key={item.id} className={styles.evidence} aria-label="Evidencias del caos">
              {item.evidence.map((ev, i) => (
                <li key={ev} className={styles.chip} data-i={i}>
                  {ev}
                </li>
              ))}
            </ul>
            <p className={styles.credit}>
              Foto:{" "}
              <a href={item.img.credit.url} target="_blank" rel="noopener">
                {item.img.credit.by}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
