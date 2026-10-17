"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { contact, navbar, routes, whatsappCards, whatsappHref } from "@/content/site";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/Button";
import { IconArrowRight, IconArrowUpRight, IconClose, IconHome, IconMenu, IconWhatsapp } from "@/components/icons";
import { getLenis } from "@/components/motion/lenis";
import styles from "./Navbar.module.css";

/**
 * Navbar siempre visible: una barra transparente con tres contenedores
 * propios (logo · enlaces centrados · Probar Pling). En móvil, el menú se
 * abre a pantalla completa por detrás de la barra: el logo y el botón de
 * abrir/cerrar no se mueven de su sitio.
 */
export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

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

  // Menú abierto: la página de fondo no se desplaza; Escape lo cierra
  useEffect(() => {
    if (!open) return;
    const lenis = getLenis();
    lenis?.stop();
    const root = document.documentElement;
    root.style.overflow = "hidden";
    sheetRef.current?.querySelector<HTMLElement>("a")?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      root.style.overflow = "";
      lenis?.start();
    };
  }, [open]);

  return (
    <header className={styles.wrap} data-scrolled={scrolled ? "" : undefined} data-open={open ? "" : undefined}>
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
          <Button action={navbar.cta} size="sm" className={styles.ctaWide} />
          {/* Móvil: el CTA se reduce al logo de WhatsApp para que el logo de Pling no se estreche */}
          <a href={routes.contacto} data-open-modal className={styles.waBtn} aria-label={`${navbar.cta.label} por WhatsApp`}>
            <IconWhatsapp className="size-5" />
          </a>
          <button
            ref={toggleRef}
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

      <div ref={sheetRef} id="menu-movil" className={styles.sheet} data-open={open ? "" : undefined} inert={!open} aria-hidden={!open}>
        {/* Cualquier enlace del menú lo cierra (también el de la página actual) */}
        <div className={styles.sheetInner} onClick={(e) => (e.target as HTMLElement).closest("a") && setOpen(false)}>
          <Link href={navbar.home.href} className={styles.home} aria-current={pathname === routes.home ? "page" : undefined} style={{ "--i": 0 } as React.CSSProperties}>
            <span className={styles.homeIcon} aria-hidden>
              <IconHome className="size-6" />
            </span>
            {navbar.home.label}
            <IconArrowRight className={styles.homeArrow} />
          </Link>

          <ul className={styles.sheetList}>
            {navbar.links.map((l, i) => (
              <li key={l.label} style={{ "--i": i + 1 } as React.CSSProperties}>
                {"external" in l && l.external ? (
                  <a href={l.href} target="_blank" rel="noopener" className={styles.sheetLink}>
                    {l.label}
                    <IconArrowUpRight className="size-6" />
                    <span className="sr-only">(se abre en una pestaña nueva)</span>
                  </a>
                ) : (
                  <Link href={l.href} className={styles.sheetLink} aria-current={pathname === l.href ? "page" : undefined}>
                    {l.label}
                    <IconArrowRight className="size-6" />
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className={styles.sheetFoot} style={{ "--i": navbar.links.length + 1 } as React.CSSProperties}>
            <Button action={navbar.cta} size="lg" className={styles.sheetCta} />
            <a href={whatsappHref(whatsappCards[0].message)} target="_blank" rel="noopener" className={styles.sheetContact}>
              <IconWhatsapp className="size-4" />
              {contact.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
