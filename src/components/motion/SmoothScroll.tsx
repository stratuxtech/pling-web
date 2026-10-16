"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { setLenis } from "./lenis";

/** Smooth scroll de flexion.ai: Lenis con duración 1.4s (intensity 14). Off con reduced-motion. */
export function SmoothScroll() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.4, smoothWheel: true, autoRaf: true, anchors: { offset: -104 } });
    setLenis(lenis);
    return () => {
      lenis.destroy();
      setLenis(null);
    };
  }, []);
  return null;
}
