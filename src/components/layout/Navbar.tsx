"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navbar, routes } from "@/content/site";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/Button";
import { IconArrowUpRight, IconClose, IconMenu } from "@/components/icons";
import styles from "./Navbar.module.css";

/**
 * Navbar siempre visible: una barra transparente con tres contenedores
 * propios (logo · enlaces centrados · Probar Pling).
 */
export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cierra el menú móvil al cambiar de página
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={styles.wrap} data-scrolled={scrolled ? "" : undefined}>
      <nav className={styles.bar} aria-label="Principal">
        <Link href={routes.home} className={styles.logo} aria-label="Pling!, ir al inicio">
          <Logo height={30} priority />
        </Link>

        <ul className={styles.links}>
          {navbar.links.map((l) => (
            <li key={l.label}>
              {"external" in l && l.external ? (
                <a href={l.href} target="_blank" rel="noopener" className={styles.link}>
                  {l.label}
                  <IconArrowUpRight className="size-3.5" />
                  <span className="sr-only">(se abre en una pestaña nueva)</span>
                </a>
              ) : (
                <Link href={l.href} className={styles.link} aria-current={pathname === l.href ? "page" : undefined}>
                  {l.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          <Button action={navbar.cta} size="sm" />
          <button
            type="button"
            className={styles.menuBtn}
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <IconClose className="size-5" /> : <IconMenu className="size-5" />}
          </button>
        </div>
      </nav>

      <div id="menu-movil" className={styles.sheet} data-open={open ? "" : undefined} hidden={!open}>
        <ul>
          {navbar.links.map((l) => (
            <li key={l.label}>
              {"external" in l && l.external ? (
                <a href={l.href} target="_blank" rel="noopener" className={styles.sheetLink}>
                  {l.label}
                  <IconArrowUpRight className="size-5" />
                </a>
              ) : (
                <Link href={l.href} className={styles.sheetLink}>
                  {l.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
