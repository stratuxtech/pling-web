import Link from "next/link";
import { siteUrl } from "@/content/site";
import { JsonLd } from "@/components/JsonLd";
import { IconChevronRight } from "@/components/icons";
import styles from "./Breadcrumbs.module.css";

type Crumb = { label: string; href: string };

/** Migas de pan "Inicio / Página": la última es la página actual. */
export function Breadcrumbs({ items, className = "" }: { items: readonly Crumb[]; className?: string }) {
  return (
    <nav aria-label="Migas de pan" className={`${styles.nav} ${className}`}>
      <ol className={styles.list}>
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={c.href} className={styles.item}>
              {last ? (
                <span aria-current="page" className={styles.current}>
                  {c.label}
                </span>
              ) : (
                <>
                  <Link href={c.href} className={styles.link}>
                    {c.label}
                  </Link>
                  <IconChevronRight className={styles.sep} />
                </>
              )}
            </li>
          );
        })}
      </ol>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: items.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.label, item: new URL(c.href, siteUrl).toString() })),
        }}
      />
    </nav>
  );
}
