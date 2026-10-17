"use client";

import { useEffect, useRef, useState } from "react";
import { home } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Accent, Subline } from "@/components/ui/Title";
import { Phone } from "@/components/ui/Phone";
import { IconPause, IconPlay, IconTiktok } from "@/components/icons";
import { FloatingBadges } from "./FloatingBadges";
import { Rotator } from "./Rotator";
import { usePointerVars } from "@/components/motion/usePointerVars";
import styles from "./Hero.module.css";

const { hero } = home;
const viewKeys = ["qr", "codigo", "sync"] as const;
const viewScreens = viewKeys.map((k) => hero.views[k].img);
const INTERVAL = 3200;

export function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % hero.rotator.length), INTERVAL);
    return () => window.clearInterval(id);
  }, [paused]);

  // Parallax de profundidad de lo que flota (ratón) o deriva autónoma (táctil)
  usePointerVars(visualRef);

  const current = hero.rotator[index];
  const activeView = viewKeys.indexOf(current.view);

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.copy}>
        <Subline as="h1" id="hero-title" icon={<IconTiktok />}>
          {hero.subline}
        </Subline>
        <p className={styles.title}>
          {hero.title.lead} <Accent>{hero.title.accent}</Accent> <span className={styles.tail}>{hero.title.tail}</span>
          <span className="sr-only"> {hero.rotator.map((r) => r.text).join(", ")}.</span>
        </p>
        <Rotator phrases={hero.rotator.map((r) => r.text)} index={index} className={styles.rotator} />
        <div className={styles.ctas}>
          <Button action={hero.primary} size="lg" />
          <Button action={hero.secondary} variant="outline" size="lg" />
        </div>
      </div>

      <div ref={visualRef} className={styles.visual} data-cursor="Probar Pling" data-cursor-modal>
        <div className={styles.halo} aria-hidden />
        <div className={styles.badges}>
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
