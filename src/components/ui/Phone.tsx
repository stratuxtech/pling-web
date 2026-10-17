"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Img } from "@/content/site";
import { autoDrift } from "@/components/motion/usePointerVars";
import styles from "./Phone.module.css";

/**
 * Celular 3D con las capturas reales de Pling. Se inclina siguiendo al ratón
 * (valores medidos en anubi.io: ±7° X, ±9° Y, imagen ±3px; entra en .45s y
 * vuelve en .65s). Sin ratón encima (o en táctil) se balancea y levita solo. `screens` + `active`
 * hacen fundido entre pantallas.
 */
export function Phone({
  screens,
  active = 0,
  className = "",
  priority = false,
  sizes = "(min-width: 1024px) 320px, 60vw",
  tilt = true,
  zoneRef,
}: {
  screens: Img[];
  active?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  tilt?: boolean;
  /** Zona que captura el puntero (por defecto, el propio celular). */
  zoneRef?: React.RefObject<HTMLElement | null>;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const zone = zoneRef?.current ?? el;
    if (!tilt || !el || !zone) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const set = (x: number, y: number, ms: number) => {
      el.style.setProperty("--tilt-dur", `${ms}ms`);
      el.style.setProperty("--tilt-x", `${(-7 * y).toFixed(2)}deg`);
      el.style.setProperty("--tilt-y", `${(9 * x).toFixed(2)}deg`);
      el.style.setProperty("--img-x", `${(-3 * x).toFixed(2)}px`);
      el.style.setProperty("--img-y", `${(-3 * y).toFixed(2)}px`);
      el.style.setProperty("--light-x", `${(50 + 30 * x).toFixed(1)}%`);
    };
    // Sin acción del ratón (o en táctil) se balancea solo, despacio
    const drift = () => autoDrift(el, (t) => set(Math.sin(t * 0.5) * 0.55, Math.cos(t * 0.37) * 0.4, 1200));
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return drift();

    let stopDrift: (() => void) | null = drift();
    const clamp = (v: number) => Math.max(-1, Math.min(1, v));
    const onEnter = () => {
      stopDrift?.();
      stopDrift = null;
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = zone.getBoundingClientRect();
      set(clamp(((e.clientX - r.left) / r.width) * 2 - 1), clamp(((e.clientY - r.top) / r.height) * 2 - 1), 450);
    };
    const onLeave = () => {
      set(0, 0, 650);
      stopDrift ??= drift();
    };
    zone.addEventListener("pointerenter", onEnter);
    zone.addEventListener("pointermove", onMove, { passive: true });
    zone.addEventListener("pointerleave", onLeave);
    return () => {
      stopDrift?.();
      zone.removeEventListener("pointerenter", onEnter);
      zone.removeEventListener("pointermove", onMove);
      zone.removeEventListener("pointerleave", onLeave);
    };
  }, [tilt, zoneRef]);

  return (
    <div ref={ref} className={`${styles.phone} ${className}`} data-float={tilt ? "" : undefined}>
      <div className={styles.body}>
        <div className={styles.screen}>
          <div className={styles.viewport}>
          {screens.map((s, i) => (
            <Image
              key={s.src}
              src={s.src}
              alt={i === active ? s.alt : ""}
              aria-hidden={i === active ? undefined : true}
              fill
              sizes={sizes}
              priority={priority && i === 0}
              className={styles.img}
              data-active={i === active ? "" : undefined}
            />
          ))}
          </div>
          <span className={styles.island} aria-hidden />
          <span className={styles.glare} aria-hidden />
        </div>
      </div>
    </div>
  );
}
