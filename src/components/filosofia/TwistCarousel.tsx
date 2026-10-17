import Image from "next/image";
import { filosofiaPage } from "@/content/site";
import { Subline, Title } from "@/components/ui/Title";
import { IconStore } from "@/components/icons";
import { Rich } from "@/components/ui/Rich";
import { ScrollTwist } from "@/components/motion/ScrollTwist";
import styles from "./TwistCarousel.module.css";

const { carrusel } = filosofiaPage;

/** "De emprendedores a empresarios": fotos en el carrusel con torsión ligado al scroll. */
export function TwistCarousel() {
  return (
    <section className={styles.section} aria-labelledby="carrusel-title">
      <div className={styles.head}>
        <div className={styles.headCopy}>
          <Subline as="h2" id="carrusel-title" icon={<IconStore />}>
            {carrusel.subline}
          </Subline>
          <Title as="p" parts={carrusel.title} className={styles.title} />
        </div>
        <p className={styles.text}>
          <Rich text={carrusel.text} />
        </p>
      </div>
      <ScrollTwist
        label="Fotos del crecimiento de una tienda (desliza para ver más)"
        items={carrusel.slides.map((s) => ({
          key: s.img.src,
          caption: s.label,
          node: (
            <div className={styles.media}>
              <Image src={s.img.src} alt={s.img.alt} fill sizes="(min-width: 64rem) 20vw, 60vw" className={styles.img} />
            </div>
          ),
        }))}
      />
    </section>
  );
}
