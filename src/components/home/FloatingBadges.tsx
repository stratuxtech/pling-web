import { badges } from "@/content/site";
import { IconCheck, IconTiktok } from "@/components/icons";
import { EmojiField, type FloatingEmoji } from "@/components/ornaments/EmojiField";
import styles from "./FloatingBadges.module.css";

/**
 * Micro-componentes de UI que levitan alrededor del celular (bible §5.2).
 * Decorativos: fuera del árbol de accesibilidad y fuera de la zona de lectura.
 * `--d` es la profundidad: cuánto se desplazan con el ratón (via --mx/--my).
 * Más UI que emojis: 6 piezas de interfaz + 4 emojis con profundidad de campo.
 */
const emojis: FloatingEmoji[] = [
  { e: "😍", x: "78%", y: "47%", depth: "mid" },
  { e: "🛍️", x: "6%", y: "44%", depth: "mid" },
  { e: "💸", x: "86%", y: "-4%", depth: "edge" },
  { e: "📦", x: "16%", y: "86%", depth: "far" },
];

export function FloatingBadges() {
  return (
    <div className={styles.layer} aria-hidden>
      <EmojiField items={emojis} />

      <div className={`${styles.badge} ${styles.comment}`} style={{ "--d": 0.9 } as React.CSSProperties}>
        <span className={styles.commentIcon}>
          <IconTiktok className="size-3.5" />
        </span>
        <span>
          <span className={styles.commentName}>{badges.comentario.name}</span>
          <span className={styles.commentText}>{badges.comentario.text}</span>
        </span>
      </div>

      <div className={`${styles.badge} ${styles.live}`} style={{ "--d": 0.6 } as React.CSSProperties}>
        <span className={styles.liveDot} />
        {badges.live.label}
      </div>

      <div className={`${styles.badge} ${styles.code}`} style={{ "--d": 1 } as React.CSSProperties}>
        <span className={styles.codeLabel}>{badges.codigo.label}</span>
        <span className={styles.codeValue}>{badges.codigo.code}</span>
      </div>

      <div className={`${styles.badge} ${styles.sale}`} style={{ "--d": 1.4 } as React.CSSProperties}>
        <span className={styles.saleIcon}>
          <IconCheck className="size-4" />
        </span>
        <span>
          <span className={styles.saleTitle}>{badges.venta.label}</span>{" "}
          <span className={styles.saleAmount}>{badges.venta.amount}</span>
        </span>
      </div>

      <div className={`${styles.badge} ${styles.bubble}`} style={{ "--d": 0.8 } as React.CSSProperties}>
        {badges.compradora.label}
        <span className={styles.ticks}>{badges.compradora.ticks}</span>
      </div>

      <div className={`${styles.badge} ${styles.qr}`} style={{ "--d": 1.2 } as React.CSSProperties}>
        <IconCheck className="size-4" />
        {badges.validacion.label}
      </div>
    </div>
  );
}
