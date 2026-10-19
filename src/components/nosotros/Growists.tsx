"use client";

import Image from "next/image";
import { useRef } from "react";
import { nosotrosPage } from "@/content/site";
import { Title, Subline } from "@/components/ui/Title";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/Logo";
import { IconBank, IconBolt, IconCheck, IconShield, IconSpark, IconTrendUp } from "@/components/icons";
import { usePointerVars } from "@/components/motion/usePointerVars";
import styles from "./Growists.module.css";

const { growists } = nosotrosPage;

/* Escenario en unidades de contenedor desde el centro: Growists arriba, Pling abajo, aportes en medio. */
const SOURCE = [0, -31] as const;
const TARGET = [0, 33] as const;
const LAYOUT = {
  estabilidad: [-27, -8, 1.3],
  bancos: [27, -8, 0.9],
  tecnologia: [-24, 12, 1.1],
  financiamiento: [24, 12, 1.5],
} as const;

const icons = {
  estabilidad: <IconShield className="size-5" />,
  bancos: <IconBank className="size-5" />,
  tecnologia: <IconBolt className="size-5" />,
  financiamiento: <IconTrendUp className="size-5" />,
};

/**
 * Respaldo de Growists: a la izquierda, lo que aporta en bullets; a la
 * derecha, el logo de Growists arriba entrega cada aporte a Pling por
 * líneas que fluyen. Los nodos levitan y muestran su detalle al pasar el
 * ratón o enfocar (en táctil, siempre visible y con deriva propia).
 */
export function Growists() {
  const stageRef = useRef<HTMLDivElement>(null);
  usePointerVars(stageRef);

  return (
    <section className={styles.section} aria-labelledby="growists-title">
      <div className={styles.copy}>
        <Subline as="h2" id="growists-title" icon={<IconShield />}>{growists.subline}</Subline>
        <Title as="p" parts={growists.title} className={styles.title} />
        <p className={styles.text}>{growists.intro}</p>
        <ul className={styles.bullets}>
          {growists.bullets.map((b) => (
            <li key={b.label} className={styles.bullet}>
              <span className={styles.check} aria-hidden>
                <IconCheck className="size-4" />
              </span>
              <span>
                <strong>{b.label}</strong>
                <span className={styles.bulletText}>: {b.text}</span>
              </span>
            </li>
          ))}
        </ul>
        <Button action={{ kind: "link", label: growists.link.label, href: growists.link.href, external: true }} variant="outline" />
      </div>

      <div ref={stageRef} className={styles.stage}>
        <svg className={styles.lines} viewBox="-50 -50 100 100" preserveAspectRatio="none" aria-hidden>
          {growists.nodes.map((n) => {
            const [x, y] = LAYOUT[n.id];
            return (
              <g key={n.id}>
                <line x1={SOURCE[0]} y1={SOURCE[1]} x2={x} y2={y} className={styles.line} />
                <line x1={SOURCE[0]} y1={SOURCE[1]} x2={x} y2={y} className={styles.flow} />
                <line x1={x} y1={y} x2={TARGET[0]} y2={TARGET[1]} className={styles.line} />
                <line x1={x} y1={y} x2={TARGET[0]} y2={TARGET[1]} className={styles.flow} />
              </g>
            );
          })}
        </svg>

        <div className={styles.source} style={{ "--x": SOURCE[0], "--y": SOURCE[1] } as React.CSSProperties}>
          <Image src={growists.logo.src} alt={growists.logo.alt} width={growists.logo.width} height={growists.logo.height} className={styles.growistsLogo} sizes="200px" />
        </div>

        <div className={styles.target} style={{ "--x": TARGET[0], "--y": TARGET[1] } as React.CSSProperties}>
          <span className={styles.targetSpark} aria-hidden>
            <IconSpark className="size-4" />
          </span>
          <Logo height={28} />
        </div>

        <ul className={styles.nodes} aria-label="Lo que Growiststech le da a Pling">
          {growists.nodes.map((n, i) => {
            const [x, y, d] = LAYOUT[n.id];
            return (
              <li
                key={n.id}
                className={styles.node}
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
