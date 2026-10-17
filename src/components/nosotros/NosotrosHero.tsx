"use client";

import Image from "next/image";
import { useRef } from "react";
import { nosotrosPage } from "@/content/site";
import { Title, Subline } from "@/components/ui/Title";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { usePointerVars } from "@/components/motion/usePointerVars";
import { Rich } from "@/components/ui/Rich";
import { EmojiField, type FloatingEmoji } from "@/components/ornaments/EmojiField";
import { IconUsers } from "@/components/icons";
import styles from "./NosotrosHero.module.css";

const { hero } = nosotrosPage;
const emojis: FloatingEmoji[] = [
  { e: "🛍️", x: "19%", y: "18%", depth: "mid" },
  { e: "💬", x: "78%", y: "64%", depth: "mid" },
  { e: "🎉", x: "1%", y: "74%", depth: "edge" },
  { e: "📦", x: "92%", y: "6%", depth: "far" },
];

/**
 * Hero de Nosotros: propuesta de valor al centro (zona segura) y fotos
 * periféricas que levitan y siguen al ratón con distinta profundidad.
 */
export function NosotrosHero() {
  const ref = useRef<HTMLElement>(null);
  usePointerVars(ref);

  return (
    <section ref={ref} className={styles.hero} aria-labelledby="nosotros-title">
      <Breadcrumbs items={nosotrosPage.breadcrumbs} className={styles.crumbs} />

      <div className={styles.copy}>
        <Subline icon={<IconUsers />}>{hero.subline}</Subline>
        <Title as="h1" id="nosotros-title" parts={hero.title} className={styles.title} />
        <p className={styles.text}>
          <Rich text={hero.text} />
        </p>
        <Button action={hero.primary} size="lg" />
      </div>

      <div className={styles.photos}>
        <EmojiField items={emojis} />
        {hero.images.map((img, i) => (
          <figure key={img.src} className={styles.photo} data-i={i}>
            <div className={styles.float}>
              <Image src={img.src} alt={img.alt} fill sizes="(min-width: 64rem) 15vw, 30vw" className={styles.img} />
            </div>
          </figure>
        ))}
      </div>
    </section>
  );
}
