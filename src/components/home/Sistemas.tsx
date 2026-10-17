"use client";

import { useEffect, useRef, useState } from "react";
import { home } from "@/content/site";
import { Subline, Title } from "@/components/ui/Title";
import { Logo } from "@/components/Logo";
import { IconBox, IconLink, IconTiktok, IconWhatsapp } from "@/components/icons";
import { useScrollSteps } from "@/components/motion/useScrollSteps";
import { usePointerVars } from "@/components/motion/usePointerVars";
import styles from "./Sistemas.module.css";

const { sistemas } = home;

/* Posiciones en % del escenario (unidades de contenedor), desde el centro. */
const POS = {
  off: { tiktok: [-30, -24, -8], whatsapp: [31, -12, 7], inventario: [-8, 30, -5] },
  on: { tiktok: [-28, -26, 0], whatsapp: [28, -26, 0], inventario: [0, 30, 0] },
} as const;

const icons = {
  tiktok: <IconTiktok className="size-6" />,
  whatsapp: <IconWhatsapp className="size-6" />,
  inventario: <IconBox className="size-6" />,
};

/**
 * Escritorio: la sección se ancla y el scroll pasa de "Sin Pling" a "Con
 * Pling"; los toggles desplazan hasta ese tramo, así el scroll siempre manda
 * (no se puede subir desde "Con Pling" sin pasar por "Sin Pling").
 * Móvil: se conectan solos al entrar en pantalla y los toggles cambian el estado.
 */
export function Sistemas() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const { active, pinned, select } = useScrollSteps(sectionRef, 2);
  const [mobileOn, setMobileOn] = useState(false);
  const [manual, setManual] = useState(false);
  const connected = pinned ? active === 1 : mobileOn;

  useEffect(() => {
    if (pinned || manual || !stageRef.current) return;
    let t = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        window.clearTimeout(t);
        if (e.isIntersecting) t = window.setTimeout(() => setMobileOn(true), 1400);
      },
      { threshold: 0.5 },
    );
    io.observe(stageRef.current);
    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, [pinned, manual]);

  // Los nodos levitan y siguen al cursor (o derivan solos en táctil)
  usePointerVars(stageRef);

  function choose(on: boolean) {
    if (pinned) select(on ? 1 : 0);
    else {
      setManual(true);
      setMobileOn(on);
    }
  }

  const pos = connected ? POS.on : POS.off;
  const state = connected ? sistemas.conPling : sistemas.sinPling;

  return (
    <section ref={sectionRef} className={styles.section} aria-labelledby="sistemas-title">
      <div className={styles.sticky}>
        <div className={styles.inner}>
          <div className={styles.head}>
            <Subline icon={<IconLink />}>{sistemas.subline}</Subline>
            <Title id="sistemas-title" parts={sistemas.title} className={styles.title} />
            <div className={styles.switch} role="radiogroup" aria-label="Comparar">
              {[false, true].map((on) => (
                <button
                  key={String(on)}
                  type="button"
                  role="radio"
                  aria-checked={connected === on}
                  className={styles.switchBtn}
                  data-on={on ? "" : undefined}
                  onClick={() => choose(on)}
                >
                  {on ? sistemas.conPling.label : sistemas.sinPling.label}
                </button>
              ))}
            </div>
            <p className={styles.text} aria-live="polite">
              {state.text}
            </p>
          </div>

          <div ref={stageRef} className={styles.stage} data-connected={connected ? "" : undefined}>
            <svg className={styles.lines} viewBox="-50 -50 100 100" preserveAspectRatio="none" aria-hidden>
              {sistemas.nodes.map((n) => {
                const [x, y] = POS.on[n.id as keyof typeof POS.on];
                return (
                  <g key={n.id}>
                    <line x1={0} y1={0} x2={x} y2={y} pathLength={1} className={styles.line} />
                    <line x1={0} y1={0} x2={x} y2={y} pathLength={1} className={styles.flow} />
                  </g>
                );
              })}
            </svg>

            <div className={styles.core} aria-hidden={!connected}>
              <Logo height={34} />
            </div>

            {sistemas.nodes.map((n, i) => {
              const [x, y, r] = pos[n.id as keyof typeof pos];
              return (
                <div
                  key={n.id}
                  className={styles.node}
                  data-node={n.id}
                  tabIndex={0}
                  aria-label={`${n.label}: ${connected ? n.detail : n.chaos}`}
                  style={{ "--x": x, "--y": y, "--r": `${r}deg`, "--d": 0.8 + i * 0.35, "--delay": `${i * -2.1}s` } as React.CSSProperties}
                >
                  <div className={styles.nodeCard}>
                    <span className={styles.nodeIcon}>{icons[n.id as keyof typeof icons]}</span>
                    <span className={styles.nodeLabel}>{n.label}</span>
                  </div>
                  <span className={styles.nodeTag} data-kind={connected ? "ok" : "chaos"}>
                    {connected ? n.detail : n.chaos}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
