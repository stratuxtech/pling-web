"use client";

import { useEffect, useRef } from "react";
import styles from "./ScrollTwist.module.css";

export type TwistItem = { key: string; node: React.ReactNode; caption: string };

/** Escala, giro y "cercanía al centro" de un slide según su distancia normalizada d (-1…1). */
const shape = (d: number) => {
  const near = 1 - Math.min(1, Math.abs(d) * 1.6);
  return { near, s: 1 + 0.25 * near, ry: -d * 32 };
};

/**
 * Carrusel con torsión ligado al scroll (anubi.io): la fila avanza en
 * horizontal mientras la sección cruza la pantalla; el slide central crece
 * 1.25× y los laterales giran ±32° en perspectiva.
 *
 * Espaciado constante: como un slide escalado o girado no ocupa su ancho de
 * maqueta, cada uno se recoloca integrando su ancho visible
 * (ancho × escala × cos(giro) + hueco), así el aire entre fotos es el mismo
 * en el centro y en los extremos.
 *
 * Sin JS o con reduced-motion: fila deslizable a mano, sin torsión.
 */
export function ScrollTwist({ items, label, className = "" }: { items: readonly TwistItem[]; label: string; className?: string }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!section || !viewport || !track) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    viewport.dataset.driven = "";
    viewport.tabIndex = -1;
    const slides = Array.from(track.children) as HTMLElement[];
    let raf = 0;
    let running = false;

    const frame = () => {
      const vh = window.innerHeight;
      const vw = viewport.clientWidth;
      const half = vw / 2;
      const r = section.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
      const max = Math.max(0, track.scrollWidth - vw);
      const x = -max * p;
      track.style.transform = `translate3d(${x.toFixed(1)}px,0,0)`;

      const w = slides[0]?.offsetWidth ?? 1;
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      const pitch = w + gap;
      // Posición visible = ∫ densidad visible desde el centro (paso fino, simétrico)
      const visual = (o: number) => {
        const sign = Math.sign(o);
        const total = Math.abs(o);
        const steps = Math.max(1, Math.ceil(total / (pitch / 10)));
        const dt = total / steps;
        let acc = 0;
        for (let i = 0; i < steps; i++) {
          const t = (i + 0.5) * dt;
          const { s, ry } = shape(Math.min(1, t / half));
          acc += ((w * s * Math.cos((ry * Math.PI) / 180) + gap) / pitch) * dt;
        }
        return sign * acc;
      };

      for (const it of slides) {
        const o = it.offsetLeft + it.offsetWidth / 2 + x - half;
        const { near, s, ry } = shape(Math.max(-1, Math.min(1, o / half)));
        it.style.setProperty("--tx", `${(visual(o) - o).toFixed(1)}px`);
        it.style.setProperty("--ry", `${ry.toFixed(2)}deg`);
        it.style.setProperty("--s", s.toFixed(3));
        it.style.setProperty("--z", String(Math.round(near * 10)));
      }
      if (running) raf = requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(([e]) => {
      running = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (running) raf = requestAnimationFrame(frame);
    });
    io.observe(section);
    frame();
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      delete viewport.dataset.driven;
      viewport.tabIndex = 0;
      track.style.transform = "";
    };
  }, []);

  return (
    <div ref={sectionRef} className={`${styles.root} ${className}`}>
      <div ref={viewportRef} className={styles.viewport} tabIndex={0} role="region" aria-label={label}>
        <ol ref={trackRef} className={styles.track}>
          {items.map((it, i) => (
            <li key={it.key} className={styles.slide}>
              <figure className={styles.figure}>
                {it.node}
                <figcaption className={styles.caption}>
                  <span className={styles.step}>{String(i + 1).padStart(2, "0")}</span>
                  {it.caption}
                </figcaption>
              </figure>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
