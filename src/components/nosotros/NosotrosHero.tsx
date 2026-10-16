"use client";

import Image from "next/image";
import { useRef } from "react";
import { nosotrosPage } from "@/content/site";
import { Title, Subline } from "@/components/ui/Title";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { usePointerVars } from "@/components/motion/usePointerVars";
import styles from "./NosotrosHero.module.css";

const { hero } = nosotrosPage;

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
        <Subline>{hero.subline}</Subline>
        <Title as="h1" id="nosotros-title" parts={hero.title} className={styles.title} />
        <p className={styles.text}>{hero.text}</p>
        <Button action={hero.primary} size="lg" />
      </div>

      <div className={styles.photos}>
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
