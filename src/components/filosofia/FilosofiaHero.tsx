"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { filosofiaPage } from "@/content/site";
import { Title, Subline } from "@/components/ui/Title";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Rich } from "@/components/ui/Rich";
import { usePointerVars } from "@/components/motion/usePointerVars";
import { EmojiField, type FloatingEmoji } from "@/components/ornaments/EmojiField";
import { IconTrendUp } from "@/components/icons";
import styles from "./FilosofiaHero.module.css";

const { hero } = filosofiaPage;
const emojis: FloatingEmoji[] = [
  { e: "💖", x: "88%", y: "4%", depth: "mid" },
  { e: "🛍️", x: "-4%", y: "58%", depth: "mid" },
  { e: "✨", x: "58%", y: "92%", depth: "far" },
  { e: "📦", x: "-8%", y: "-8%", depth: "edge" },
];
const fmt = new Intl.NumberFormat("es-BO", { minimumFractionDigits: hero.stat.decimals, maximumFractionDigits: hero.stat.decimals });

/**
 * Hero de Filosofía: dato gigante con conteo veloz al entrar en pantalla y
 * fotos con entrada dinámica. El HTML ya trae la cifra final (sin JS se ve).
 */
export function FilosofiaHero() {
  const numRef = useRef<HTMLSpanElement>(null);
  const photosRef = useRef<HTMLDivElement>(null);
  usePointerVars(photosRef);

  useEffect(() => {
    const el = numRef.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const target = hero.stat.value;
    let raf = 0;
    el.textContent = fmt.format(0);
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const dur = 1400;
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / dur);
          const eased = 1 - Math.pow(1 - p, 4);
          el.textContent = fmt.format(target * eased);
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className={styles.hero} aria-labelledby="filosofia-title">
      <Breadcrumbs items={filosofiaPage.breadcrumbs} />
      <div className={styles.grid}>
        <div className={styles.copy}>
          <Subline as="h1" id="filosofia-title" icon={<IconTrendUp />}>{hero.subline}</Subline>
          <Title as="p" parts={hero.title} className={styles.title} />
          <p className={styles.text}>
            <Rich text={hero.text} />
          </p>

          <figure className={styles.stat}>
            <p className={styles.value}>
              <span className="sr-only">{`${fmt.format(hero.stat.value)} millones`}</span>
              <span ref={numRef} aria-hidden>
                {fmt.format(hero.stat.value)}
              </span>
              <span className={styles.suffix} aria-hidden>
                {hero.stat.suffix}
              </span>
            </p>
            <figcaption className={styles.caption}>
              <span className={styles.label}>{hero.stat.label}</span>
              <span className={styles.source}>
                Fuente:{" "}
                <a href={hero.stat.source.url} target="_blank" rel="noopener">
                  {hero.stat.source.label}
                </a>
              </span>
            </figcaption>
          </figure>
        </div>

        <div ref={photosRef} className={styles.photos}>
          <EmojiField items={emojis} />
          {hero.images.map((img, i) => (
            <figure key={img.src} className={styles.photo} data-i={i}>
              <div className={styles.float}>
                <Image src={img.src} alt={img.alt} fill priority sizes="(min-width: 64rem) 24vw, 46vw" className={styles.img} />
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
