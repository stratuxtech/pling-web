"use client";

import { useRef } from "react";
import { nosotrosPage } from "@/content/site";
import { Title, Subline } from "@/components/ui/Title";
import { Rich } from "@/components/ui/Rich";
import { IconHeart, IconSpark, IconTrendUp } from "@/components/icons";
import { useScrollSteps } from "@/components/motion/useScrollSteps";
import { usePointerVars } from "@/components/motion/usePointerVars";
import {
  EmojiField,
  type FloatingEmoji,
} from "@/components/ornaments/EmojiField";
import {
  PlingChips,
  type FloatingChip,
} from "@/components/ornaments/PlingChips";
import styles from "./PorQueNace.module.css";

const { porQueNace } = nosotrosPage;
/* Alrededor de la tarjeta, nunca sobre su texto: más UI que emojis */
const chips: FloatingChip[] = [
  { kind: "code", x: "84%", y: "-14%", d: 1.2, r: 5 },
  { kind: "sale", x: "-8%", y: "92%", d: 1.5, r: -3 },
  { kind: "qr", x: "-6%", y: "-10%", d: 0.9, r: -4 },
  { kind: "bubble", x: "70%", y: "98%", d: 1.1, r: 3 },
];
/* Móvil: dentro del margen del escenario, sin tocar el título ni el texto */
const chipsMobile: FloatingChip[] = [
  { kind: "qr", x: "2%", y: "0.3%", d: 0.9, r: -4 },
  { kind: "code", x: "64%", y: "0%", d: 1.2, r: 5 },
  { kind: "sale", x: "2%", y: "96.4%", d: 1.5, r: -3 },
  { kind: "bubble", x: "52%", y: "96.8%", d: 1.1, r: 3 },
];
const emojisMobile: FloatingEmoji[] = [
  { e: "🚀", x: "86%", y: "47%", depth: "mid" },
  { e: "🤝", x: "84%", y: "8%", depth: "far" },
];
const emojis: FloatingEmoji[] = [
  { e: "🚀", x: "97%", y: "40%", depth: "mid" },
  { e: "🤝", x: "-9%", y: "42%", depth: "mid" },
  { e: "📈", x: "48%", y: "-30%", depth: "edge" },
  { e: "✨", x: "40%", y: "112%", depth: "far" },
];

const icons = {
  empresarios: <IconTrendUp className="size-7" />,
  confianza: <IconHeart className="size-7" />,
};

/**
 * Por qué nace Pling. Escritorio: la sección se ancla con el título a la
 * izquierda y una sola tarjeta a la derecha; al bajar, la primera sale y
 * entra la segunda (y al subir, al revés). Móvil: las dos tarjetas apiladas.
 */
export function PorQueNace() {
  const ref = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const { active, pinned } = useScrollSteps(ref, porQueNace.items.length);
  usePointerVars(stageRef);

  return (
    <section
      ref={ref}
      className={styles.section}
      data-pinned={pinned ? "" : undefined}
      aria-labelledby="nace-title"
    >
      <div className={styles.sticky}>
        <div className={styles.inner}>
          <div className={styles.head}>
            <Subline as="h2" id="nace-title" icon={<IconSpark />}>
              {porQueNace.subline}
            </Subline>
            <Title as="p" parts={porQueNace.title} className={styles.title} />
            <ol className={styles.progress} aria-hidden>
              {porQueNace.items.map((it, i) => (
                <li key={it.id} data-on={i === active ? "" : undefined} />
              ))}
            </ol>
          </div>
          <div ref={stageRef} className={styles.stage}>
            <PlingChips items={pinned ? chips : chipsMobile} />
            <EmojiField items={pinned ? emojis : emojisMobile} />
            <ol className={styles.stack}>
              {porQueNace.items.map((it, i) => (
                <li
                  key={it.id}
                  className={styles.card}
                  data-state={
                    !pinned
                      ? "static"
                      : i === active
                        ? "in"
                        : i < active
                          ? "past"
                          : "next"
                  }
                >
                  <div className={styles.cardBody}>
                    <p className={styles.kicker}>
                      Razón {i + 1} de {porQueNace.items.length}
                    </p>
                    <h3 className={styles.cardTitle}>{it.title}</h3>
                    <p className={styles.text}>
                      <Rich text={it.text} />
                    </p>
                  </div>
                  <span className={styles.icon} data-id={it.id} aria-hidden>
                    {icons[it.id]}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
