"use client";

import { useRef } from "react";
import { queHacePage } from "@/content/site";
import { Title, Subline } from "@/components/ui/Title";
import { Button } from "@/components/ui/Button";
import { Phone } from "@/components/ui/Phone";
import { Rich } from "@/components/ui/Rich";
import { useScrollSteps } from "@/components/motion/useScrollSteps";
import { usePointerVars } from "@/components/motion/usePointerVars";
import { EmojiField, type FloatingEmoji } from "@/components/ornaments/EmojiField";
import { PlingChips, type FloatingChip } from "@/components/ornaments/PlingChips";
import { IconBox, IconQr, IconTruck } from "@/components/icons";
import styles from "./FeatureStage.module.css";

type Stage = (typeof queHacePage.stages)[number];

const icons = { antes: <IconBox />, durante: <IconQr />, despues: <IconTruck /> };

/* Alrededor del celular, nunca sobre el texto: más UI que emojis */
const ornaments: Record<Stage["id"], { chips: FloatingChip[]; emojis: FloatingEmoji[] }> = {
  antes: {
    chips: [
      { kind: "code", x: "68%", y: "10%", d: 1.3, r: 5 },
      { kind: "bubble", x: "0%", y: "72%", d: 1, r: -3 },
    ],
    emojis: [
      { e: "🏷️", x: "8%", y: "16%", depth: "mid" },
      { e: "📸", x: "84%", y: "70%", depth: "far" },
      { e: "✨", x: "92%", y: "40%", depth: "edge" },
    ],
  },
  durante: {
    chips: [
      { kind: "live", x: "4%", y: "12%", d: 1.2, r: -5 },
      { kind: "sale", x: "64%", y: "30%", d: 1.5, r: 4 },
      { kind: "qr", x: "0%", y: "76%", d: 1, r: -2 },
    ],
    emojis: [
      { e: "💸", x: "84%", y: "74%", depth: "mid" },
      { e: "🔥", x: "78%", y: "4%", depth: "far" },
    ],
  },
  despues: {
    chips: [
      { kind: "code", x: "0%", y: "14%", d: 1.2, r: -4 },
      { kind: "bubble", x: "72%", y: "84%", d: 1.4, r: 3 },
    ],
    emojis: [
      { e: "🚚", x: "84%", y: "16%", depth: "mid" },
      { e: "📦", x: "6%", y: "70%", depth: "mid" },
      { e: "✅", x: "-6%", y: "40%", depth: "edge" },
    ],
  },
};

/* Móvil anclado: dos piezas de UI en las esquinas de la tarjeta */
const compactChips: FloatingChip[] = [
  { kind: "code", x: "66%", y: "97%", d: 1.2, r: 5 },
  { kind: "bubble", x: "-1%", y: "92%", d: 1, r: -3 },
];

/**
 * Una etapa del live con todas sus funciones, con secuestro de scroll:
 * - Escritorio: la sección se ancla y el scroll recorre función por función;
 *   la lista se abre en la activa y el celular cambia a su pantalla.
 * - Móvil: también anclada; se ve una función a la vez como tarjeta (captura
 *   a la izquierda, texto a la derecha) y el scroll pasa a la siguiente.
 * - Pantallas muy bajas: todas las tarjetas apiladas.
 */
export function FeatureStage({ stage, index }: { stage: Stage; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const n = stage.features.length;
  const { active, pinned, compact, select } = useScrollSteps(ref, n, { mobile: true });
  const full = pinned && !compact;
  usePointerVars(visualRef);
  const deco = ornaments[stage.id];

  return (
    <section
      ref={ref}
      id={stage.id}
      className={styles.section}
      data-pinned={pinned ? "" : undefined}
      data-compact={compact ? "" : undefined}
      data-full={full ? "" : undefined}
      data-stage={stage.id}
      aria-labelledby={`${stage.id}-title`}
      style={{ "--n": n } as React.CSSProperties}
    >
      <div className={styles.sticky}>
        <div className={styles.inner}>
          <div className={styles.copy}>
            <p className={styles.kicker}>
              <span aria-hidden>{stage.emoji}</span> Etapa {index + 1} de {queHacePage.stages.length} · {stage.label}
            </p>
            <Subline as="h2" id={`${stage.id}-title`} icon={icons[stage.id]}>
              {stage.subline}
            </Subline>
            <Title as="p" parts={stage.title} className={styles.title} />
            <p className={styles.intro}>{stage.intro}</p>

            <div className={styles.listWrap}>
              <ol className={styles.list}>
                {stage.features.map((f, i) => {
                  const on = !pinned || i === active;
                  return (
                    <li
                      key={f.id}
                      className={styles.item}
                      data-on={on ? "" : undefined}
                      data-done={pinned && i < active ? "" : undefined}
                      data-state={compact ? (i === active ? "in" : i < active ? "past" : "next") : undefined}
                      aria-hidden={compact && i !== active ? true : undefined}
                    >
                      {!full ? (
                        <div className={styles.media} aria-hidden>
                          <Phone screens={[{ ...f.img, alt: "" }]} tilt={false} sizes="40vw" />
                        </div>
                      ) : null}
                      <div className={styles.body}>
                        <h3 className={styles.itemTitle}>
                          <span className={styles.num} aria-hidden>
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          {full ? (
                            <button
                              type="button"
                              className={styles.itemBtn}
                              aria-expanded={on}
                              aria-controls={`${stage.id}-${f.id}`}
                              onClick={() => select(i)}
                            >
                              {f.title}
                            </button>
                          ) : (
                            f.title
                          )}
                        </h3>
                        <div id={`${stage.id}-${f.id}`} className={styles.panel}>
                          <p className={styles.text}>
                            <Rich text={f.text} />
                          </p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>
              {compact ? <PlingChips items={compactChips} /> : null}
            </div>

            {!full ? (
              <div className={styles.compactFoot}>
                {compact ? (
                  <ol className={styles.dots} aria-hidden>
                    {stage.features.map((f, i) => (
                      <li key={f.id} data-on={i === active ? "" : undefined} />
                    ))}
                  </ol>
                ) : null}
                <Button action={queHacePage.cta} className={styles.cta} />
              </div>
            ) : null}
          </div>

          {/* Un único contenedor (mismo nodo en todos los modos) para que la deriva siga activa */}
          <div ref={visualRef} className={full ? styles.visual : styles.mobileDeco} aria-hidden={full ? undefined : true}>
            {full ? (
              <>
                <div className={styles.glow} aria-hidden />
                <Phone screens={stage.features.map((f) => f.img)} active={active} className={styles.phone} sizes="(min-width: 1024px) 300px, 60vw" />
                <PlingChips items={deco.chips} />
                <EmojiField items={deco.emojis} />
                <div className={styles.foot}>
                  <p className={styles.counter} aria-hidden>
                    Función {active + 1} de {n}
                  </p>
                  <Button action={queHacePage.cta} />
                </div>
              </>
            ) : !compact ? (
              <>
                <PlingChips items={deco.chips.slice(0, 2)} />
                <EmojiField items={deco.emojis.slice(0, 2)} />
              </>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
