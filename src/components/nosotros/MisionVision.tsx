import Image from "next/image";
import { nosotrosPage } from "@/content/site";
import styles from "./MisionVision.module.css";

/**
 * Misión (imagen arriba, texto abajo) y Visión (texto arriba, imagen abajo).
 * Las fotos entran gigantes y se achican al hacer scroll hasta encajar en su
 * caja (noth.in: escala 1.8 → 1).
 */
export function MisionVision() {
  const { mision, vision } = nosotrosPage;
  const blocks = [
    { ...mision, id: "mision", imageFirst: true },
    { ...vision, id: "vision", imageFirst: false },
  ];

  return (
    <section className={styles.section} aria-label="Misión y visión">
      <div className={styles.inner}>
        <div className={styles.grid}>
          {blocks.map((b) => {
            const media = (
              <div className={styles.media}>
                <Image
                  src={b.img.src}
                  alt={b.img.alt}
                  fill
                  sizes="(min-width: 48rem) 42vw, 92vw"
                  className={styles.img}
                />
              </div>
            );
            return (
              <article
                key={b.id}
                className={styles.box}
                data-block={b.id}
                aria-labelledby={`${b.id}-title`}
              >
                {b.imageFirst ? media : null}
                <div className={styles.body}>
                  <h2 id={`${b.id}-title`} className={styles.title}>
                    {b.title}
                  </h2>
                  <p className={styles.text}>{b.text}</p>
                </div>
                {b.imageFirst ? null : media}
              </article>
            );
          })}
        </div>
        <p className={styles.credits}>
          Fotos:{" "}
          {blocks.map((b, i) => (
            <span key={b.id}>
              <a href={b.img.credit.url} target="_blank" rel="noopener">
                {b.img.credit.by}
              </a>
              {i < blocks.length - 1 ? " · " : null}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
