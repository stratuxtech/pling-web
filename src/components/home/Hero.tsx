"use client";

import { useEffect, useRef, useState } from "react";
import { home } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Accent, Subline } from "@/components/ui/Title";
import { Phone } from "@/components/ui/Phone";
import { IconPause, IconPlay } from "@/components/icons";
import { FloatingBadges } from "./FloatingBadges";
import { Rotator } from "./Rotator";
import styles from "./Hero.module.css";

const { hero } = home;
const viewKeys = ["qr", "codigo", "sync"] as const;
const viewScreens = viewKeys.map((k) => hero.views[k].img);
const INTERVAL = 3200;

export function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const visualRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % hero.rotator.length), INTERVAL);
    return () => window.clearInterval(id);
  }, [paused]);

  // Parallax de profundidad de los badges con el ratón
  useEffect(() => {
    const zone = visualRef.current;
    const layer = badgesRef.current?.firstElementChild as HTMLElement | null;
    if (!zone || !layer || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onMove = (e: PointerEvent) => {
      const r = zone.getBoundingClientRect();
      layer.style.setProperty("--mx", (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
      layer.style.setProperty("--my", (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
    };
    const onLeave = () => {
      layer.style.setProperty("--mx", "0");
      layer.style.setProperty("--my", "0");
    };
    zone.addEventListener("pointermove", onMove, { passive: true });
    zone.addEventListener("pointerleave", onLeave);
    return () => {
      zone.removeEventListener("pointermove", onMove);
      zone.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const current = hero.rotator[index];
  const activeView = viewKeys.indexOf(current.view);

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.copy}>
        <Subline>{hero.subline}</Subline>
        <h1 id="hero-title" className={styles.title}>
          {hero.title.lead} <Accent>{hero.title.accent}</Accent> <span className={styles.tail}>{hero.title.tail}</span>
          <span className="sr-only"> {hero.rotator.map((r) => r.text).join(", ")}.</span>
        </h1>
        <Rotator phrases={hero.rotator.map((r) => r.text)} index={index} className={styles.rotator} />
        <div className={styles.ctas}>
          <Button action={hero.primary} size="lg" />
          <Button action={hero.secondary} variant="outline" size="lg" />
        </div>
      </div>

      <div ref={visualRef} className={styles.visual} data-cursor="Probar Pling" data-cursor-modal>
        <div className={styles.halo} aria-hidden />
        <div ref={badgesRef} className={styles.badges}>
          <FloatingBadges />
        </div>
        <Phone screens={viewScreens} active={activeView} priority zoneRef={visualRef} className={styles.phone} sizes="(min-width: 1024px) 340px, 62vw" />
        <div className={styles.viewBar}>
          <p className={styles.viewLabel} aria-live="polite">
            {hero.views[current.view].label}
          </p>
          <button
            type="button"
            className={styles.pause}
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? "Reanudar animación" : "Pausar animación"}
          >
            {paused ? <IconPlay className="size-4" /> : <IconPause className="size-4" />}
          </button>
        </div>
      </div>
    </section>
  );
}
