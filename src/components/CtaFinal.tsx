import { ctaFinal } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Subline, Title } from "@/components/ui/Title";
import { Phone } from "@/components/ui/Phone";
import { IconPhone } from "@/components/icons";
import { ScrollTwist } from "@/components/motion/ScrollTwist";
import styles from "./CtaFinal.module.css";

/**
 * Cierre de conversión global: titular + CTAs y las 5 pantallas del flujo en
 * celulares 3D, en el carrusel con torsión ligado al scroll (mismo patrón que
 * "De emprendedores a empresarios").
 */
export function CtaFinal() {
  return (
    <section className={styles.section} aria-labelledby="cta-final-title">
      <div className={styles.head}>
        <Subline as="h2" id="cta-final-title" icon={<IconPhone />}>{ctaFinal.subline}</Subline>
        <Title as="p" parts={ctaFinal.title} className={styles.title} />
        <p className={styles.text}>{ctaFinal.text}</p>
        <div className={styles.buttons}>
          <Button action={ctaFinal.primary} size="lg" />
          <Button action={ctaFinal.secondary} variant="outline" size="lg" />
        </div>
      </div>

      <ScrollTwist
        className={styles.twist}
        label="Flujo de Pling en 5 pantallas"
        items={ctaFinal.screens.map((s) => ({
          key: s.id,
          caption: s.label,
          node: <Phone screens={[s.img]} tilt={false} sizes="(min-width: 1024px) 260px, 50vw" />,
        }))}
      />
    </section>
  );
}
