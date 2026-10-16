"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CursorCta.module.css";

/**
 * Cursor CTA magnético (make-b.studio): sobre cualquier zona con
 * `data-cursor="Texto"` el puntero se convierte en una píldora que lo persigue.
 * Si la zona tiene `data-cursor-modal`, el clic abre el Modal.
 * Solo con ratón (pointer: fine); es un refuerzo, nunca la única vía de acción.
 */
export function CursorCta() {
  const ref = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.documentElement.classList.add("cursor-cta");
    let x = 0,
      y = 0,
      cx = 0,
      cy = 0,
      raf = 0,
      active = false;

    const tick = () => {
      cx += (x - cx) * (reduce ? 1 : 0.2);
      cy += (y - cy) * (reduce ? 1 : 0.2);
      if (ref.current) ref.current.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      if (active || Math.abs(x - cx) > 0.5 || Math.abs(y - cy) > 0.5) raf = requestAnimationFrame(tick);
      else raf = 0;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x = e.clientX;
      y = e.clientY;
      const zone = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
      const next = zone?.dataset.cursor ?? null;
      if (next && !active) {
        cx = x;
        cy = y;
      }
      active = !!next;
      setLabel(next);
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onClick = (e: MouseEvent) => {
      const zone = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor-modal]");
      if (!zone || (e.target as HTMLElement).closest("a,button")) return;
      const trigger = document.createElement("a");
      trigger.setAttribute("data-open-modal", "");
      trigger.style.display = "none";
      document.body.appendChild(trigger);
      trigger.click();
      trigger.remove();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("cursor-cta");
    };
  }, []);

  return (
    <div ref={ref} className={styles.cursor} data-visible={label ? "" : undefined} aria-hidden>
      <span className={styles.pill}>{label}</span>
    </div>
  );
}
