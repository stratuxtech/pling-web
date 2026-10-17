import styles from "./Title.module.css";

/**
 * Partes de un titular. Regla de marca (cliente, 2026-10-17): el titular va
 * siempre en tinta oscura; el primer énfasis en Azul Pling y, si hay un
 * segundo, en Rojo Pling. `red` pinta de rojo un énfasis único (p. ej. "caos").
 */
export type TitleParts = { lead: string; accent?: string; tail?: string; accent2?: string; tail2?: string; red?: boolean };
/** El titular grande es diseño; el encabezado SEO es el Subline. Por eso suele ir como "p". */
type Level = "h1" | "h2" | "h3" | "p";

export function Title({ as: Tag = "h2", parts, className = "", id }: { as?: Level; parts: TitleParts; className?: string; id?: string }) {
  return (
    <Tag id={id} className={`${styles.title} ${className}`}>
      {parts.lead}
      {parts.accent ? (
        <>
          {" "}
          <Accent red={parts.red}>{parts.accent}</Accent>
        </>
      ) : null}
      {parts.tail ? <> {parts.tail}</> : null}
      {parts.accent2 ? (
        <>
          {" "}
          <Accent red>{parts.accent2}</Accent>
        </>
      ) : null}
      {parts.tail2 ? <> {parts.tail2}</> : null}
    </Tag>
  );
}

/** Palabra de énfasis en la tipografía caligráfica (Cookie). Azul por defecto; `red` para el segundo énfasis. */
export function Accent({ children, red = false }: { children: React.ReactNode; red?: boolean }) {
  return <em className={`accent ${red ? styles.accentRed : styles.accent}`}>{children}</em>;
}

/**
 * Subline de sección con icono (o punto coral si no lleva). Es el encabezado
 * real para SEO (h1 en el hero de cada página, h2 en cada sección), redactado
 * como una búsqueda: "¿Qué es Pling?". `alert` la pinta en rojo de alarma.
 */
export function Subline({
  children,
  icon,
  className = "",
  tone,
  as: Tag = "p",
  id,
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  tone?: "alert";
  as?: "p" | "h1" | "h2";
  id?: string;
}) {
  return (
    <Tag id={id} className={`${styles.subline} ${tone === "alert" ? styles.sublineAlert : ""} ${className}`}>
      {icon ? (
        <span className={styles.icon} aria-hidden>
          {icon}
        </span>
      ) : (
        <span className={styles.dot} aria-hidden />
      )}
      {children}
    </Tag>
  );
}
