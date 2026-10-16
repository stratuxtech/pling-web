"use client";

import { useRef } from "react";
import { nosotrosPage } from "@/content/site";
import { Title, Subline } from "@/components/ui/Title";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/Logo";
import { IconBag, IconBank, IconSpark, IconStore } from "@/components/icons";
import { usePointerVars } from "@/components/motion/usePointerVars";
import styles from "./Growists.module.css";

const { growists } = nosotrosPage;

/* Posición de cada nodo alrededor de Pling (unidades de contenedor) y profundidad. */
const LAYOUT = {
  growists: [-27, -27, 1.4],
  tiendas: [27, -22, 0.9],
  bancos: [-24, 28, 1.1],
  compradoras: [26, 30, 1.6],
} as const;

const icons = {
  growists: <IconSpark className="size-5" />,
  tiendas: <IconStore className="size-5" />,
  bancos: <IconBank className="size-5" />,
  compradoras: <IconBag className="size-5" />,
};

/**
 * Respaldo de Growists + interacción de sistemas: nodos que levitan alrededor
 * de Pling y despliegan su micro-información al pasar el ratón o enfocar.
 */
export function Growists() {
  const stageRef = useRef<HTMLDivElement>(null);
  usePointerVars(stageRef);

  return (
    <section className={styles.section} aria-labelledby="growists-title">
      <div className={styles.copy}>
        <Subline>{growists.subline}</Subline>
        <Title id="growists-title" parts={growists.title} className={styles.title} />
        <p className={styles.text}>{growists.text}</p>
        <Button action={{ kind: "link", label: growists.link.label, href: growists.link.href, external: true }} variant="outline" />
      </div>

      <div ref={stageRef} className={styles.stage}>
        <svg className={styles.lines} viewBox="-50 -50 100 100" preserveAspectRatio="none" aria-hidden>
          {growists.nodes.map((n) => {
            const [x, y] = LAYOUT[n.id];
            return <line key={n.id} x1={0} y1={0} x2={x} y2={y} className={styles.line} />;
          })}
        </svg>
        <div className={styles.core}>
          <Logo height={30} />
        </div>
        <ul className={styles.nodes} aria-label="Quién forma parte del flujo">
          {growists.nodes.map((n, i) => {
            const [x, y, d] = LAYOUT[n.id];
            return (
              <li
                key={n.id}
                className={styles.node}
                data-node={n.id}
                tabIndex={0}
                style={{ "--x": x, "--y": y, "--d": d, "--delay": `${i * -1.7}s` } as React.CSSProperties}
              >
                <span className={styles.card}>
                  <span className={styles.icon}>{icons[n.id]}</span>
                  <span className={styles.label}>{n.label}</span>
                </span>
                <span className={styles.detail}>{n.detail}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
