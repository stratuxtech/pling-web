"use client";

import { useRef } from "react";
import { home } from "@/content/site";
import { Subline, Title } from "@/components/ui/Title";
import { Phone } from "@/components/ui/Phone";
import { IconCheck, IconLayers } from "@/components/icons";
import { useScrollSteps } from "@/components/motion/useScrollSteps";
import styles from "./Funcionalidades.module.css";

const { funcionalidades } = home;
const tabs = funcionalidades.tabs;
const tabIds = tabs.map((t) => `tab-${t.id}`);

/**
 * Secuestro de scroll (escritorio): la sección se ancla y el scroll vertical
 * recorre Antes / En el live / Después. En móvil son pestañas normales.
 * Las pestañas son un tablist accesible (flechas, Home/End).
 */
export function Funcionalidades() {
  const sectionRef = useRef<HTMLElement>(null);
  const { active, pinned, select, onTabKey } = useScrollSteps(sectionRef, tabs.length);
  const onKeyDown = (e: React.KeyboardEvent) => onTabKey(e, tabIds);

  const tab = tabs[active];

  return (
    <section ref={sectionRef} className={styles.section} data-pinned={pinned ? "" : undefined} aria-labelledby="func-title">
      <div className={styles.sticky}>
        <div className={styles.inner}>
          <div className={styles.copy}>
            <Subline icon={<IconLayers />}>{funcionalidades.subline}</Subline>
            <Title id="func-title" parts={funcionalidades.title} className={styles.title} />
            <div role="tablist" aria-label="Etapas del live" className={styles.tabs} onKeyDown={onKeyDown}>
              {tabs.map((t, i) => (
                <button
                  key={t.id}
                  id={`tab-${t.id}`}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-controls="func-panel"
                  tabIndex={i === active ? 0 : -1}
                  className={styles.tab}
                  onClick={() => select(i)}
                >
                  <span className={styles.tabIndex}>{i + 1}</span>
                  {t.label}
                </button>
              ))}
              <span className={styles.progress} style={{ "--i": active } as React.CSSProperties} aria-hidden />
            </div>

            <div id="func-panel" role="tabpanel" aria-labelledby={`tab-${tab.id}`} className={styles.panel}>
              <div key={tab.id} className={styles.panelInner}>
                <h3 className={styles.panelTitle}>{tab.title}</h3>
                <p className={styles.panelText}>{tab.text}</p>
                <ul className={styles.points}>
                  {tab.points.map((pt) => (
                    <li key={pt}>
                      <span className={styles.check} aria-hidden>
                        <IconCheck className="size-4" />
                      </span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className={styles.visual}>
            <div className={styles.glow} data-stage={active} aria-hidden />
            <Phone screens={tabs.map((t) => t.img)} active={active} className={styles.phone} sizes="(min-width: 1024px) 320px, 60vw" />
          </div>
        </div>
      </div>
    </section>
  );
}
