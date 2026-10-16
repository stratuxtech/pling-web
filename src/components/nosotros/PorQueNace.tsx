import { nosotrosPage } from "@/content/site";
import { Title, Subline } from "@/components/ui/Title";
import styles from "./PorQueNace.module.css";

/**
 * Por qué nace Pling: aparición asimétrica por scroll. Primero emerge la
 * tarjeta derecha y, al seguir bajando, la izquierda.
 */
export function PorQueNace() {
  const { porQueNace } = nosotrosPage;
  return (
    <section className={styles.section} aria-labelledby="nace-title">
      <div className={styles.head}>
        <Subline>{porQueNace.subline}</Subline>
        <Title id="nace-title" parts={porQueNace.title} className={styles.title} />
      </div>
      <ol className={styles.grid}>
        {porQueNace.items.map((it, i) => (
          <li key={it.id} className={styles.card} data-side={i === 0 ? "left" : "right"}>
            <span className={styles.num} aria-hidden>
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className={styles.cardTitle}>{it.title}</h3>
            <p className={styles.text}>{it.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
