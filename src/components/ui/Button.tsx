import Link from "next/link";
import type { Action } from "@/content/site";
import { routes } from "@/content/site";
import { IconArrowUpRight } from "@/components/icons";
import styles from "./Button.module.css";

type Variant = "primary" | "secondary" | "outline" | "inverse" | "ghost";
type Size = "sm" | "md" | "lg";

type Props = {
  action: Action;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Texto alternativo al label del contenido (p. ej. en móvil). */
  children?: React.ReactNode;
};

/**
 * Botón de marca. Las acciones `modal` se renderizan como enlace a /contacto
 * marcado con `data-open-modal`: con JS abren el Modal Adquirir/Probar Pling,
 * sin JS llevan a la vista de contacto. Así el CTA funciona siempre.
 */
export function Button({ action, variant = "primary", size = "md", className = "", children }: Props) {
  const cls = `${styles.btn} ${styles[variant]} ${styles[size]} ${className}`;
  const label = children ?? action.label;

  if (action.kind === "modal") {
    return (
      <a href={routes.contacto} data-open-modal className={cls}>
        <span className={styles.face}>{label}</span>
      </a>
    );
  }

  if (action.external) {
    return (
      <a href={action.href} target="_blank" rel="noopener" className={cls}>
        <span className={styles.face}>
          {label}
          <IconArrowUpRight className="size-4" />
          <span className="sr-only">(se abre en una pestaña nueva)</span>
        </span>
      </a>
    );
  }

  return (
    <Link href={action.href} className={cls}>
      <span className={styles.face}>{label}</span>
    </Link>
  );
}
