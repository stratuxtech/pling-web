import { home } from "@/content/site";
import { Subline } from "@/components/ui/Title";
import { RevealText } from "@/components/motion/RevealText";
import { IconSpark } from "@/components/icons";
import styles from "./Banderin.module.css";

/** Qué es Pling: la propuesta de valor en una frase que se carga al hacer scroll. */
export function Banderin() {
  const { banderin } = home;
  return (
    <section aria-label={banderin.subline} className={styles.section}>
      <Subline icon={<IconSpark />}>{banderin.subline}</Subline>
      <RevealText text={banderin.text} accent={banderin.accent} accent2={banderin.accent2} className={styles.text} />
    </section>
  );
}
