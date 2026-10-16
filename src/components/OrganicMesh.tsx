import styles from "./OrganicMesh.module.css";

/** Fondo vivo global de Pling (decorativo, fuera del árbol de accesibilidad). */
export function OrganicMesh() {
  return (
    <div className={styles.mesh} aria-hidden="true">
      <div className={`${styles.blob} ${styles.b1}`} />
      <div className={`${styles.blob} ${styles.b2}`} />
      <div className={`${styles.blob} ${styles.b3}`} />
      <div className={`${styles.blob} ${styles.b4}`} />
    </div>
  );
}
