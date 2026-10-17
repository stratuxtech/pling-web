import { businessModel } from "@/content/site";
import { IconShield } from "@/components/icons";
import styles from "./Calc.module.css";

/** Mini tarjeta de notificación dentro de la tarjeta azul de resultado. */
export function CalcNote({ className = "" }: { className?: string }) {
  return (
    <div className={`${styles.note} ${className}`}>
      <span className={styles.noteIcon} aria-hidden>
        <IconShield className="size-5" />
      </span>
      <p className={styles.noteBody}>
        <span className={styles.noteTitle}>{businessModel.note.title}</span>
        <span className={styles.noteText}>{businessModel.note.text}</span>
      </p>
    </div>
  );
}
