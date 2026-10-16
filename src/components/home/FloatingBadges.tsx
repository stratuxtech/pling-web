import { badges } from "@/content/site";
import { IconCheck } from "@/components/icons";
import styles from "./FloatingBadges.module.css";

/**
 * Micro-componentes de UI que levitan alrededor del celular (bible §5.2).
 * Decorativos: fuera del árbol de accesibilidad y fuera de la zona de lectura.
 * `--d` es la profundidad: cuánto se desplazan con el ratón (via --mx/--my).
 */
export function FloatingBadges() {
  return (
    <div className={styles.layer} aria-hidden>
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
