import { filosofiaPage } from "@/content/site";
import { Title, Subline } from "@/components/ui/Title";
import { IconBox, IconQr, IconTruck } from "@/components/icons";
import styles from "./Solucion.module.css";

const icons = {
  inventario: <IconBox className="size-6" />,
  pago: <IconQr className="size-6" />,
  envio: <IconTruck className="size-6" />,
};

/** Pling como solución: 3 tarjetas que crecen en hover e iluminan su base. */
export function Solucion() {
  const { solucion } = filosofiaPage;
  return (
    <section className={styles.section} aria-labelledby="solucion-title">
      <div className={styles.head}>
        <Subline>{solucion.subline}</Subline>
        <Title id="solucion-title" parts={solucion.title} className={styles.title} />
      </div>
      <ul className={styles.grid}>
        {solucion.items.map((it) => (
          <li key={it.id} className={styles.card} data-id={it.id}>
            <h3 className={styles.cardTitle}>
              <span className={styles.icon}>{icons[it.id]}</span>
              {it.title}
            </h3>
            <p className={styles.text}>{it.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
