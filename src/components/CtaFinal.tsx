"use client";

import { useRef, useState } from "react";
import { ctaFinal } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Subline, Title } from "@/components/ui/Title";
import { Phone } from "@/components/ui/Phone";
import { IconChevronLeft, IconChevronRight } from "@/components/icons";
import styles from "./CtaFinal.module.css";

/**
 * Cierre de conversión global. Carrusel de 5 pantallas en orden de flujo:
 * la central crece (1.25x) y las laterales giran en perspectiva (anubi.io).
 */
export function CtaFinal() {
  const items = ctaFinal.screens;
  const [active, setActive] = useState(2);
  const drag = useRef<{ x: number; moved: boolean } | null>(null);

  const go = (i: number) => setActive(Math.max(0, Math.min(items.length - 1, i)));

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(active + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(active - 1);
    }
  }

  return (
    <section className={styles.section} aria-labelledby="cta-final-title">
      <div className={styles.block}>
        <div className={styles.head}>
          <Subline tone="onBlue">{ctaFinal.subline}</Subline>
          <Title id="cta-final-title" parts={ctaFinal.title} tone="onBlue" className={styles.title} />
          <div className={styles.buttons}>
            <Button action={ctaFinal.primary} variant="inverse" size="lg" />
            <Button action={ctaFinal.secondary} variant="ghost" size="lg" />
          </div>
        </div>

        <div
          className={styles.stage}
          role="region"
          aria-roledescription="carrusel"
          aria-label="Flujo de Pling en 5 pantallas"
          tabIndex={0}
          onKeyDown={onKeyDown}
          onPointerDown={(e) => {
            drag.current = { x: e.clientX, moved: false };
          }}
          onPointerUp={(e) => {
            const d = drag.current;
            drag.current = null;
            if (!d) return;
            const dx = e.clientX - d.x;
            if (Math.abs(dx) > 40) go(active + (dx < 0 ? 1 : -1));
          }}
          data-cursor="Arrastra"
        >
          <ol className={styles.track}>
            {items.map((item, i) => {
              const offset = i - active;
              const abs = Math.abs(offset);
              return (
                <li
                  key={item.id}
                  className={styles.slide}
                  style={{ "--o": offset, "--abs": abs } as React.CSSProperties}
                  data-active={offset === 0 ? "" : undefined}
                  aria-current={offset === 0 ? "step" : undefined}
                  aria-label={`${i + 1} de ${items.length}: ${item.label}`}
                  onClick={() => offset !== 0 && go(i)}
                >
                  <Phone screens={[item.img]} tilt={offset === 0} sizes="(min-width: 1024px) 300px, 50vw" className={styles.phone} />
                  <span className={styles.step}>
                    <span className={styles.stepNum}>{i + 1}</span>
                    {item.label}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>

        <div className={styles.caption} aria-live="polite">
          <p className={styles.captionTitle}>{items[active].label}</p>
          <p className={styles.captionText}>{items[active].description}</p>
        </div>

        <div className={styles.controls}>
          <button type="button" className={styles.arrow} onClick={() => go(active - 1)} disabled={active === 0} aria-label="Pantalla anterior">
            <IconChevronLeft className="size-5" />
          </button>
          <ol className={styles.dots}>
            {items.map((item, i) => (
              <li key={item.id}>
                <button
                  type="button"
                  className={styles.dot}
                  aria-label={`Ir a ${item.label}`}
                  aria-current={i === active ? "true" : undefined}
                  onClick={() => go(i)}
                />
              </li>
            ))}
          </ol>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => go(active + 1)}
            disabled={active === items.length - 1}
            aria-label="Pantalla siguiente"
          >
            <IconChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
