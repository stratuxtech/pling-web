import Link from "next/link";
import { footer, routes, socials } from "@/content/site";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/Button";
import { IconArrowUpRight, socialIcons } from "@/components/icons";
import { LiquidCanvas } from "./LiquidCanvas";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Link href={routes.home} aria-label="Pling!, ir al inicio" className="inline-flex rounded-sm">
              <Logo height={40} />
            </Link>
          </div>

          <nav aria-label="Pie de página">
            <ul className={styles.links}>
              {footer.links.map((l) => (
                <li key={l.label}>
                  {"kind" in l ? (
                    <a href={routes.contacto} data-open-modal className={styles.link}>
                      {l.label}
                    </a>
                  ) : "external" in l && l.external ? (
                    <a href={l.href} target="_blank" rel="noopener" className={styles.link}>
                      {l.label}
                      <IconArrowUpRight className="size-4" />
                      <span className="sr-only">(se abre en una pestaña nueva)</span>
                    </a>
                  ) : (
                    <Link href={l.href} className={styles.link}>
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.side}>
            <ul className={styles.socials}>
              {socials.map((s) => {
                const Icon = socialIcons[s.id];
                return (
                  <li key={s.id}>
                    <a href={s.href} target="_blank" rel="noopener" className={styles.social} aria-label={`${s.label} ${s.handle}`}>
                      <Icon className="size-5" />
                    </a>
                  </li>
                );
              })}
            </ul>
            <Button action={footer.cta} variant="primary" />
          </div>
        </div>

        <a href={routes.contacto} data-open-modal className={styles.big}>
          <span className={styles.bigLabel} data-alt={footer.bigLink.hoverLabel}>
            <span className={styles.bigMain}>{footer.bigLink.label}</span>
          </span>
          <IconArrowUpRight className={styles.bigArrow} />
        </a>

        <p className={styles.legal}>
          {footer.legalPrefix}{" "}
          <a href={footer.legalLink.href} target="_blank" rel="noopener">
            {footer.legalLink.label}
          </a>{" "}
          · {footer.legalSuffix}
        </p>
      </div>
      <LiquidCanvas className={styles.liquid} />
    </footer>
  );
}
