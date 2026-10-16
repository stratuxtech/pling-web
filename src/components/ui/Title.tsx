import styles from "./Title.module.css";

type Parts = { lead: string; accent?: string; tail?: string };
type Level = "h1" | "h2" | "h3";

/**
 * Titular de Pling: Fredoka Medium + palabra de énfasis en
 * Cormorant Garamond Medium Italic (Azul Pling), sin subrayado.
 */
export function Title({
  as: Tag = "h2",
  parts,
  className = "",
  tone = "light",
  id,
}: {
  as?: Level;
  parts: Parts;
  className?: string;
  tone?: "light" | "onBlue";
  id?: string;
}) {
  return (
    <Tag id={id} className={`${styles.title} ${tone === "onBlue" ? styles.onBlue : ""} ${className}`}>
      {parts.lead}
      {parts.accent ? (
        <>
          {" "}
          <Accent>{parts.accent}</Accent>
        </>
      ) : null}
      {parts.tail ? <> {parts.tail}</> : null}
    </Tag>
  );
}

export function Accent({ children }: { children: React.ReactNode }) {
  return <em className={`accent ${styles.accent}`}>{children}</em>;
}

/** Subline de sección (fijada por el brief en cada bloque). */
export function Subline({ children, className = "", tone = "light" }: { children: React.ReactNode; className?: string; tone?: "light" | "onBlue" }) {
  return (
    <p className={`${styles.subline} ${tone === "onBlue" ? styles.sublineOnBlue : ""} ${className}`}>
      <span className={styles.dot} aria-hidden />
      {children}
    </p>
  );
}
