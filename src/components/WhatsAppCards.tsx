"use client";

import { useRef } from "react";
import { whatsappCards, whatsappHref } from "@/content/site";
import { IconArrowUpRight, IconWhatsapp } from "@/components/icons";
import styles from "./WhatsAppCards.module.css";

/** Las 4 vías directas a WhatsApp. Flechas ←↑→↓ mueven el foco entre tarjetas. */
export function WhatsAppCards({ compact = false, autoFocusFirst = false }: { compact?: boolean; autoFocusFirst?: boolean }) {
  const listRef = useRef<HTMLUListElement>(null);

  function onKeyDown(e: React.KeyboardEvent<HTMLUListElement>) {
    const keys = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"];
    if (!keys.includes(e.key)) return;
    const links = Array.from(listRef.current?.querySelectorAll<HTMLAnchorElement>("a") ?? []);
    const i = links.indexOf(document.activeElement as HTMLAnchorElement);
    if (i === -1) return;
    e.preventDefault();
    const n = links.length;
    const next =
      e.key === "Home" ? 0 : e.key === "End" ? n - 1 : e.key === "ArrowRight" || e.key === "ArrowDown" ? (i + 1) % n : (i - 1 + n) % n;
    links[next].focus();
  }

  return (
    <ul ref={listRef} onKeyDown={onKeyDown} className={`${styles.grid} ${compact ? styles.compact : ""}`}>
      {whatsappCards.map((card, i) => (
        <li key={card.id}>
          <a
            href={whatsappHref(card.message)}
            target="_blank"
            rel="noopener"
            className={styles.card}
            autoFocus={autoFocusFirst && i === 0}
          >
            <span className={styles.icon} aria-hidden>
              <IconWhatsapp className="size-5" />
            </span>
            <span className={styles.text}>
              <span className={styles.title}>{card.title}</span>
              <span className={styles.hint}>{card.hint}</span>
            </span>
            <IconArrowUpRight className={styles.arrow} />
            <span className="sr-only">(abre WhatsApp con el mensaje escrito)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
