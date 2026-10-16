import styles from "./Rotator.module.css";

/**
 * Rotador de labels (make-b.studio "Staggered Cycle"): una copia invisible de
 * la frase más larga reserva la altura, así el bloque no salta; cada letra
 * entra desde +110% y sale a -110% con la curva (.11,.72,0,1), escalonada.
 */
export function Rotator({ phrases, index, className = "" }: { phrases: readonly string[]; index: number; className?: string }) {
  const longest = phrases.reduce((a, b) => (b.length > a.length ? b : a), "");
  return (
    <span className={`${styles.rotator} ${className}`} aria-hidden>
      <span className={styles.sizer}>{longest}</span>
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
