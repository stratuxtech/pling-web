import styles from "./EmojiField.module.css";

/** Plano de profundidad (brief §5): media = nítido; borde = grande y muy desenfocado; lejos = pequeño y algo desenfocado. */
export type EmojiDepth = "mid" | "edge" | "far";
export type FloatingEmoji = { e: string; x: string; y: string; depth: EmojiDepth; delay?: number };

/**
 * Emojis que levitan alrededor de un elemento (fuera de la zona de lectura).
 * Heredan --mx/--my del contenedor (usePointerVars): siguen al ratón o
 * derivan solos en táctil. Decorativos: fuera del árbol de accesibilidad.
 */
export function EmojiField({ items, className = "" }: { items: readonly FloatingEmoji[]; className?: string }) {
  return (
    <div className={`${styles.field} ${className}`} aria-hidden>
      {items.map((it, i) => (
        <span
          key={i}
          className={styles.emoji}
          data-depth={it.depth}
          style={{ left: it.x, top: it.y, "--delay": `${it.delay ?? i * -1.7}s` } as React.CSSProperties}
        >
          {it.e}
        </span>
      ))}
    </div>
  );
}
