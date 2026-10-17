import { badges } from "@/content/site";
import { IconCheck } from "@/components/icons";
import styles from "./PlingChips.module.css";

export type ChipKind = "code" | "sale" | "qr" | "bubble" | "live";
export type FloatingChip = { kind: ChipKind; x: string; y: string; d?: number; r?: number };

/**
 * Piezas de UI de Pling que levitan (código, venta, QR verificado, mensaje,
 * LIVE). Heredan --mx/--my del contenedor (usePointerVars): siguen al ratón
 * o derivan solas. Decorativas: fuera del árbol de accesibilidad.
 */
export function PlingChips({ items }: { items: readonly FloatingChip[] }) {
  return (
    <div className={styles.layer} aria-hidden>
      {items.map((c, i) => (
        <div
          key={i}
          className={`${styles.chip} ${styles[c.kind]}`}
          style={{ left: c.x, top: c.y, "--d": c.d ?? 1, "--r": `${c.r ?? 0}deg`, "--delay": `${i * -1.9}s` } as React.CSSProperties}
        >
          {c.kind === "code" ? (
            <>
              <span className={styles.codeLabel}>{badges.codigo.label}</span>
              <span className={styles.codeValue}>{badges.codigo.code}</span>
            </>
          ) : c.kind === "sale" ? (
            <>
              <span className={styles.ok}>
                <IconCheck className="size-4" />
              </span>
              <span className={styles.saleTitle}>{badges.venta.label}</span>
              <span className={styles.saleAmount}>{badges.venta.amount}</span>
            </>
          ) : c.kind === "qr" ? (
            <>
              <IconCheck className="size-4" />
              {badges.validacion.label}
            </>
          ) : c.kind === "bubble" ? (
            <>
              {badges.compradora.label}
              <span className={styles.ticks}>{badges.compradora.ticks}</span>
            </>
          ) : (
            <>
              <span className={styles.liveDot} />
              {badges.live.label}
            </>
          )}
        </div>
      ))}
    </div>
  );
}
