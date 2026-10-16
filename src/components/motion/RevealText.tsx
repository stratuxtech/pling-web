import styles from "./RevealText.module.css";

/**
 * Texto que se "carga" al hacer scroll (make-b.studio): cada palabra pasa de
 * tenue a su color final según su posición en pantalla. CSS scroll-driven:
 * sin soporte, el texto se ve completo desde el inicio.
 * `glow` ilumina palabras con el halo de color de flexion.ai/news.
 */
export function RevealText({ text, glow = [], className = "" }: { text: string; glow?: readonly string[]; className?: string }) {
  const words = text.split(" ");
  return (
    <p className={`${styles.text} ${className}`}>
      {words.map((w, i) => {
        const lit = glow.includes(w);
        return (
          <span key={i}>
            <span className={`${styles.word} ${lit ? styles.glow : ""}`} style={lit ? ({ "--g": glow.indexOf(w) } as React.CSSProperties) : undefined}>
              {w}
            </span>
            {i < words.length - 1 ? " " : null}
          </span>
        );
      })}
    </p>
  );
}
