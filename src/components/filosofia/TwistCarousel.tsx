"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { filosofiaPage } from "@/content/site";
import { Title } from "@/components/ui/Title";
import styles from "./TwistCarousel.module.css";

const { carrusel } = filosofiaPage;

/**
 * "De emprendedores a empresarios": fila de fotos que se desplaza en
 * horizontal mientras la sección cruza la pantalla. La foto central crece
 * (1.25×, anubi.io) y las laterales se tuercen con perspectiva.
 * Sin JS o con reduced-motion: fila deslizable a mano, sin torsión.
 */
export function TwistCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
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
    const items = Array.from(track.children) as HTMLElement[];
    let raf = 0;
    let running = false;

    const frame = () => {
      const vh = window.innerHeight;
      const vw = viewport.clientWidth;
      const r = section.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
      const max = Math.max(0, track.scrollWidth - vw);
      const x = -max * p;
      track.style.transform = `translate3d(${x.toFixed(1)}px,0,0)`;
      for (const it of items) {
        const c = it.offsetLeft + it.offsetWidth / 2 + x;
        const d = Math.max(-1, Math.min(1, (c - vw / 2) / (vw / 2)));
        const near = 1 - Math.min(1, Math.abs(d) * 1.6);
        it.style.setProperty("--ry", `${(-d * 32).toFixed(2)}deg`);
        it.style.setProperty("--s", (1 + 0.25 * near).toFixed(3));
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
    <section ref={sectionRef} className={styles.section} aria-labelledby="carrusel-title">
      <div className={styles.head}>
        <Title id="carrusel-title" parts={carrusel.title} className={styles.title} />
        <p className={styles.text}>{carrusel.text}</p>
      </div>
      <div ref={viewportRef} className={styles.viewport} tabIndex={0} role="region" aria-label="Fotos del crecimiento de una tienda (desliza para ver más)">
        <ol ref={trackRef} className={styles.track}>
          {carrusel.slides.map((s, i) => (
            <li key={s.img.src} className={styles.slide}>
              <figure className={styles.figure}>
                <div className={styles.media}>
                  <Image src={s.img.src} alt={s.img.alt} fill sizes="(min-width: 64rem) 20vw, 60vw" className={styles.img} />
                </div>
                <figcaption className={styles.caption}>
                  <span className={styles.step}>{String(i + 1).padStart(2, "0")}</span>
                  {s.label}
                </figcaption>
              </figure>
            </li>
          ))}
        </ol>
      </div>
      <p className={styles.credits}>
        Fotos: {[...new Set(carrusel.slides.map((s) => s.img.credit.by))].join(" · ")}
      </p>
    </section>
  );
}
