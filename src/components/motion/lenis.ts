import type Lenis from "lenis";

let instance: Lenis | null = null;

export function setLenis(l: Lenis | null) {
  instance = l;
}

export function getLenis() {
  return instance;
}

/** Desplaza a una posición usando Lenis si está activo (si no, scroll nativo). */
export function scrollToY(y: number) {
  if (instance) instance.scrollTo(y, { duration: 1.1 });
  else window.scrollTo({ top: y, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
}
