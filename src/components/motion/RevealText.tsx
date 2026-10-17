import styles from "./RevealText.module.css";

/**
 * Texto que se "carga" al hacer scroll (make-b.studio): cada palabra pasa de
 * tenue a su color final según su posición en pantalla. CSS scroll-driven:
 * sin soporte, el texto se ve completo desde el inicio.
 * `accent` / `accent2`: palabras en la tipografía de énfasis (azul / rojo).
 */
export function RevealText({
  text,
  accent = [],
  accent2 = [],
  className = "",
}: {
  text: string;
  accent?: readonly string[];
  accent2?: readonly string[];
  className?: string;
}) {
  const words = text.split(" ");
  return (
    <p className={`${styles.text} ${className}`}>
      {words.map((w, i) => {
        const kind = accent.includes(w) ? styles.accent : accent2.includes(w) ? styles.accent2 : "";
        return (
          <span key={i}>
            <span className={`${styles.word} ${kind}`}>{w}</span>
            {i < words.length - 1 ? " " : null}
          </span>
        );
      })}
    </p>
  );
}
