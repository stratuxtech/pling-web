"use client";

import { useEffect, useState } from "react";
import { scrollToY } from "./lenis";

/**
 * Secuestro de scroll por pasos (escritorio ≥64rem): la sección se ancla y el
 * avance vertical elige el paso activo. En móvil, los pasos son pestañas.
 * `select(i)` activa un paso y, si está anclada, desplaza hasta su tramo.
 */
export function useScrollSteps(sectionRef: React.RefObject<HTMLElement | null>, count: number) {
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const mq = matchMedia("(min-width: 64rem)");
    const update = () => setPinned(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!pinned) return;
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const p = Math.min(0.999, Math.max(0, -r.top / total));
      setActive(Math.floor(p * count));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pinned, count, sectionRef]);

  function select(i: number) {
    setActive(i);
    const el = sectionRef.current;
    if (pinned && el) {
      const total = el.offsetHeight - window.innerHeight;
      const top = el.getBoundingClientRect().top + window.scrollY;
      scrollToY(top + ((i + 0.5) / count) * total);
    }
  }

  /** Flechas, Inicio y Fin para un tablist; devuelve el índice enfocado. */
  function onTabKey(e: React.KeyboardEvent, ids: readonly string[]) {
    const map: Record<string, number> = { ArrowRight: active + 1, ArrowDown: active + 1, ArrowLeft: active - 1, ArrowUp: active - 1, Home: 0, End: count - 1 };
    if (!(e.key in map)) return;
    e.preventDefault();
    const i = (map[e.key] + count) % count;
    select(i);
    document.getElementById(ids[i])?.focus();
  }

  return { active, pinned, select, onTabKey };
}
