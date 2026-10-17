import styles from "./Rotator.module.css";

/**
 * Rotador de labels (make-b.studio "Staggered Cycle"): todas las frases
 * comparten la misma celda de una cuadrícula, así el bloque mide lo que la
 * frase más alta (en líneas reales, a cualquier ancho) y nunca invade lo que
 * viene debajo. Cada letra entra desde +115% y sale a -115% con (.11,.72,0,1).
 */
export function Rotator({ phrases, index, className = "" }: { phrases: readonly string[]; index: number; className?: string }) {
  return (
    <span className={`${styles.rotator} ${className}`} aria-hidden>
      {phrases.map((phrase, p) => {
        const state = p === index ? "in" : p === (index - 1 + phrases.length) % phrases.length ? "out" : "idle";
        let c = 0;
        return (
          <span key={phrase} className={styles.phrase} data-state={state}>
            {phrase.split(" ").map((word, w) => (
              <span key={w} className={styles.word}>
                {word.split("").map((ch, k) => {
                  const i = c++;
                  return (
                    <span key={k} className={styles.char} style={{ "--i": i } as React.CSSProperties}>
                      {ch}
                    </span>
                  );
                })}
                {w < phrase.split(" ").length - 1 ? <span className={styles.space}> </span> : null}
              </span>
            ))}
          </span>
        );
      })}
    </span>
  );
}
