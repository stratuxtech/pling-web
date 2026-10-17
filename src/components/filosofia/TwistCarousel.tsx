import Image from "next/image";
import { filosofiaPage } from "@/content/site";
import { Subline, Title } from "@/components/ui/Title";
import { IconAlert, IconPhone, IconStore, IconTrendUp } from "@/components/icons";
import { Rich } from "@/components/ui/Rich";
import { ScrollTwist } from "@/components/motion/ScrollTwist";
import styles from "./TwistCarousel.module.css";

const { carrusel } = filosofiaPage;
const stepIcons = {
  emprender: <IconPhone className="size-5" />,
  problemas: <IconAlert className="size-5" />,
  empresa: <IconTrendUp className="size-5" />,
};

/**
 * "De emprendedora a empresaria": TikTok Live democratiza el emprendimiento,
 * crecer trae problemas y Pling ayuda a dar el salto. Debajo, las fotos del
 * camino en el carrusel con torsión ligado al scroll.
 */
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
      <ol className={styles.steps}>
        {carrusel.steps.map((s, i) => (
          <li key={s.id} className={styles.step} data-id={s.id}>
            <span className={styles.stepIcon} aria-hidden>
              {stepIcons[s.id as keyof typeof stepIcons]}
            </span>
            <div>
              <p className={styles.stepTitle}>
                <span className="sr-only">Paso {i + 1}: </span>
                {s.title}
              </p>
              <p className={styles.stepText}>
                <Rich text={s.text} />
              </p>
            </div>
          </li>
        ))}
      </ol>
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
