"use client";

import { useEffect } from "react";

/**
 * Escribe --mx / --my (-1…1) en el elemento (levitación de anubi.io).
 * - Con ratón: siguen al puntero.
 * - En táctil (sin hover): derivan solas con curvas lentas de Lissajous, para
 *   que lo que flota se mueva por sí mismo. Solo mientras está en pantalla.
 * - Con reduced-motion: quietas.
 */
export function usePointerVars(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const set = (x: number, y: number) => {
      el.style.setProperty("--mx", x.toFixed(3));
      el.style.setProperty("--my", y.toFixed(3));
    };

    if (matchMedia("(hover: hover) and (pointer: fine)").matches) {
      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        set(((e.clientX - r.left) / r.width) * 2 - 1, ((e.clientY - r.top) / r.height) * 2 - 1);
      };
      const onLeave = () => set(0, 0);
      el.addEventListener("pointermove", onMove, { passive: true });
      el.addEventListener("pointerleave", onLeave);
      return () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
      };
    }

    return autoDrift(el, (t) => set(Math.sin(t * 0.55) * 0.8, Math.cos(t * 0.41 + 1.3) * 0.7));
  }, [ref]);
}

/**
 * Bucle de deriva autónoma: llama a `apply(segundos)` cada ~120ms mientras el
 * elemento es visible (las transiciones CSS suavizan entre pasos).
 */
export function autoDrift(el: Element, apply: (t: number) => void) {
  let raf = 0;
  let last = 0;
  let visible = false;
  const t0 = performance.now() - Math.random() * 8000;
  const tick = (now: number) => {
    if (now - last > 120) {
      last = now;
      apply((now - t0) / 1000);
    }
    if (visible) raf = requestAnimationFrame(tick);
  };
  const io = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    cancelAnimationFrame(raf);
    if (visible) raf = requestAnimationFrame(tick);
  });
  io.observe(el);
  return () => {
    io.disconnect();
    cancelAnimationFrame(raf);
  };
}
