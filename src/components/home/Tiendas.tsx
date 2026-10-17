"use client";

import { useEffect, useRef } from "react";
import { home, stores } from "@/content/site";
import { Subline } from "@/components/ui/Title";
import { IconStore } from "@/components/icons";
import styles from "./Tiendas.module.css";

/*
 * Marquee de prueba social. Comportamiento pedido en el brief: avanza más
 * rápido cuando el usuario no hace scroll y se ralentiza al interactuar
 * (scroll o ratón encima). Base de flexion.ai: 50px/s y ×0.5 en hover.
 */
const SPEED = { idle: 90, base: 50, scrolling: 22 };

export function Tiendas() {
  const trackRef = useRef<HTMLDivElement>(null);
  const zoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const zone = zoneRef.current;
    if (!track || !zone) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let x = 0;
    let speed = SPEED.base;
    let last = performance.now();
    let lastScroll = 0;
    let hover = false;
    let visible = false;
    let raf = 0;

    const onScroll = () => {
      lastScroll = performance.now();
    };
    const enter = () => (hover = true);
    const leave = () => (hover = false);

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const sinceScroll = now - lastScroll;
      let target = sinceScroll < 250 ? SPEED.scrolling : sinceScroll > 1200 ? SPEED.idle : SPEED.base;
      if (hover) target *= 0.5;
      speed += (target - speed) * Math.min(1, dt * 2.5);
      const half = track.scrollWidth / 2;
      x = (x + speed * dt) % half;
      track.style.transform = `translate3d(${-x}px,0,0)`;
      if (visible) raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    });
    io.observe(zone);
    window.addEventListener("scroll", onScroll, { passive: true });
    zone.addEventListener("pointerenter", enter);
    zone.addEventListener("pointerleave", leave);
    zone.addEventListener("focusin", enter);
    zone.addEventListener("focusout", leave);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      zone.removeEventListener("pointerenter", enter);
      zone.removeEventListener("pointerleave", leave);
      zone.removeEventListener("focusin", enter);
      zone.removeEventListener("focusout", leave);
    };
  }, []);

  const list = (hidden: boolean) => (
    <ul className={styles.list} aria-hidden={hidden || undefined}>
      {stores.map((s, i) => (
        <li key={s.name} className={styles.store} data-tone={i % 3}>
          <span className={styles.mark} aria-hidden>
            {s.name
              .split(" ")
              .map((w) => w[0])
              .slice(0, 2)
              .join("")}
          </span>
          <span className={styles.name}>{s.name}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <section className={styles.section} aria-labelledby="tiendas-title">
      <div className={styles.head}>
        <Subline icon={<IconStore />}>
          <span id="tiendas-title">{home.tiendas.subline}</span>
        </Subline>
      </div>
      <div ref={zoneRef} className={styles.viewport}>
        <div ref={trackRef} className={styles.track}>
          {list(false)}
          {list(true)}
        </div>
      </div>
    </section>
  );
}
