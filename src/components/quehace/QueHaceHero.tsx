"use client";

import { useEffect, useRef, useState } from "react";
import { queHacePage } from "@/content/site";
import { Title, Subline } from "@/components/ui/Title";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Phone } from "@/components/ui/Phone";
import { Rich } from "@/components/ui/Rich";
import { usePointerVars } from "@/components/motion/usePointerVars";
import { EmojiField, type FloatingEmoji } from "@/components/ornaments/EmojiField";
import { PlingChips, type FloatingChip } from "@/components/ornaments/PlingChips";
import { IconArrowRight, IconLayers } from "@/components/icons";
import styles from "./QueHaceHero.module.css";

const { hero, stages } = queHacePage;

const chips: FloatingChip[] = [
  { kind: "code", x: "-4%", y: "10%", d: 1.2, r: -5 },
  { kind: "sale", x: "64%", y: "4%", d: 1.5, r: 4 },
  { kind: "live", x: "78%", y: "62%", d: 0.9, r: 6 },
  { kind: "qr", x: "-2%", y: "78%", d: 1.1, r: -3 },
];
/* Móvil: dentro del ancho de la pantalla */
const chipsMobile: FloatingChip[] = [
  { kind: "code", x: "0%", y: "4%", d: 1.2, r: -5 },
  { kind: "sale", x: "44%", y: "-8%", d: 1.5, r: 4 },
  { kind: "live", x: "72%", y: "72%", d: 0.9, r: 6 },
  { kind: "qr", x: "0%", y: "82%", d: 1.1, r: -3 },
];
const emojis: FloatingEmoji[] = [
  { e: "🏷️", x: "26%", y: "-6%", depth: "mid" },
  { e: "💸", x: "90%", y: "34%", depth: "mid" },
  { e: "📦", x: "40%", y: "96%", depth: "far" },
  { e: "✨", x: "-10%", y: "44%", depth: "edge" },
];

/**
 * Hero de "Qué hace Pling": la promesa a la izquierda y, a la derecha, tres
 * celulares en abanico (una pantalla por etapa) con UI de Pling y emojis que
 * levitan. Debajo, el índice de las tres etapas.
 */
export function QueHaceHero() {
  const visualRef = useRef<HTMLDivElement>(null);
  const [wide, setWide] = useState(true);
  usePointerVars(visualRef);

  useEffect(() => {
    const mq = matchMedia("(min-width: 40rem)");
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <section className={styles.hero} aria-labelledby="que-hace-title">
      <Breadcrumbs items={queHacePage.breadcrumbs} className={styles.crumbs} />

      <div className={styles.grid}>
        <div className={styles.copy}>
          <Subline as="h1" id="que-hace-title" icon={<IconLayers />}>
            {hero.subline}
          </Subline>
          <Title as="p" parts={hero.title} className={styles.title} />
          <p className={styles.text}>
            <Rich text={hero.text} />
          </p>
          <div className={styles.ctas}>
            <Button action={hero.primary} size="lg" />
            <Button action={hero.secondary} variant="outline" size="lg" />
          </div>
        </div>

        <div ref={visualRef} className={styles.visual}>
          <div className={styles.halo} aria-hidden />
          <div className={styles.fan}>
            {hero.phones.map((img, i) => (
              <div key={img.src} className={styles.slot} data-i={i}>
                <Phone screens={[img]} priority={i === 1} zoneRef={visualRef} className={styles.phone} sizes="(min-width: 1024px) 240px, 34vw" />
              </div>
            ))}
          </div>
          <PlingChips items={wide ? chips : chipsMobile} />
          <EmojiField items={emojis} />
        </div>
      </div>

      <nav aria-label="Etapas del live" className={styles.index}>
        <ol className={styles.indexList}>
          {stages.map((s, i) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className={styles.indexCard}>
                <span className={styles.indexEmoji} aria-hidden>
                  {s.emoji}
                </span>
                <span className={styles.indexBody}>
                  <span className={styles.indexKicker}>Etapa {i + 1}</span>
                  <span className={styles.indexLabel}>{s.label}</span>
                  <span className={styles.indexCount}>{s.features.length} funciones</span>
                </span>
                <IconArrowRight className={styles.indexArrow} />
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </section>
  );
}
