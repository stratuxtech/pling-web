"use client";

import { useEffect, useRef, useState } from "react";
import { home } from "@/content/site";
import { Title } from "@/components/ui/Title";
import { Logo } from "@/components/Logo";
import { IconBox, IconTiktok, IconWhatsapp } from "@/components/icons";
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

export function Sistemas() {
  const [connected, setConnected] = useState(false);
  const [manual, setManual] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // Escritorio: la sección se ancla y el scroll conecta los sistemas.
  // Móvil: se conectan solos al entrar en pantalla.
  useEffect(() => {
    if (manual) return;
    const el = sectionRef.current;
    if (!el) return;
    const desktop = matchMedia("(min-width: 64rem)").matches;
    if (desktop) {
      const onScroll = () => {
        const r = el.getBoundingClientRect();
        const total = el.offsetHeight - window.innerHeight;
        const p = -r.top / Math.max(1, total);
        setConnected(p > 0.38);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }
    let t = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        window.clearTimeout(t);
        if (e.isIntersecting) t = window.setTimeout(() => setConnected(true), 1400);
      },
      { threshold: 0.5 },
    );
    io.observe(stageRef.current!);
    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, [manual]);

  // Los nodos levitan y siguen sutilmente al cursor
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onMove = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect();
      stage.style.setProperty("--mx", (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
      stage.style.setProperty("--my", (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
    };
    const onLeave = () => {
      stage.style.setProperty("--mx", "0");
      stage.style.setProperty("--my", "0");
    };
    stage.addEventListener("pointermove", onMove, { passive: true });
    stage.addEventListener("pointerleave", onLeave);
    return () => {
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const pos = connected ? POS.on : POS.off;
  const state = connected ? sistemas.conPling : sistemas.sinPling;

  return (
    <section ref={sectionRef} className={styles.section} aria-labelledby="sistemas-title">
      <div className={styles.sticky}>
        <div className={styles.inner}>
          <div className={styles.head}>
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
                  onClick={() => {
                    setManual(true);
                    setConnected(on);
                  }}
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
