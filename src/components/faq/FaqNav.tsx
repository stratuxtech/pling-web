"use client";

import { useEffect, useState } from "react";
import styles from "./Faq.module.css";

/**
 * Categorías de ayuda: enlaces a cada grupo (funcionan sin JS) que marcan
 * la categoría visible mientras se hace scroll.
 */
export function FaqNav({ categories }: { categories: readonly { id: string; label: string; count: number }[] }) {
  const [current, setCurrent] = useState(categories[0]?.id);

  useEffect(() => {
    const groups = categories.map((c) => document.getElementById(`cat-${c.id}`)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setCurrent(visible[0].target.id.replace("cat-", ""));
      },
      { rootMargin: "-20% 0px -60% 0px" },
    );
    groups.forEach((g) => io.observe(g));
    return () => io.disconnect();
  }, [categories]);

  return (
    <nav aria-label="Categorías de ayuda" className={styles.nav}>
      <ul className={styles.navList}>
        {categories.map((c) => (
          <li key={c.id}>
            <a href={`#cat-${c.id}`} className={styles.navLink} aria-current={current === c.id ? "true" : undefined} onClick={() => setCurrent(c.id)}>
              {c.label}
              <span className={styles.count}>{c.count}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
