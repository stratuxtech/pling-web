"use client";

import { useCallback, useEffect, useRef } from "react";
import { modal } from "@/content/site";
import { Logo } from "@/components/Logo";
import { IconClose } from "@/components/icons";
import { WhatsAppCards } from "@/components/WhatsAppCards";
import { getLenis } from "@/components/motion/lenis";
import styles from "./PlingModal.module.css";

/**
 * Modal Adquirir/Probar Pling. Escucha clics en cualquier `[data-open-modal]`
 * del documento (delegación), así los CTA pueden renderizarse en el servidor.
 */
export function PlingModal() {
  const ref = useRef<HTMLDialogElement>(null);

  const show = useCallback(() => {
    const d = ref.current;
    if (!d || d.open) return;
    d.showModal();
    d.querySelector<HTMLElement>('a[href*="wa.me"]')?.focus();
    getLenis()?.stop();
    document.documentElement.style.overflow = "hidden";
  }, []);

  const close = useCallback(() => ref.current?.close(), []);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const trigger = (e.target as HTMLElement).closest("[data-open-modal]");
      if (!trigger) return;
      e.preventDefault();
      show();
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [show]);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    const onClose = () => {
      getLenis()?.start();
      document.documentElement.style.overflow = "";
    };
    d.addEventListener("close", onClose);
    return () => d.removeEventListener("close", onClose);
  }, []);

  return (
    <dialog
      ref={ref}
      className={styles.dialog}
      aria-labelledby="pling-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className={styles.panel}>
        <div className={styles.head}>
          <Logo height={28} />
          <button type="button" onClick={close} className={styles.close} aria-label="Cerrar">
            <IconClose className="size-5" />
          </button>
        </div>
        <h2 id="pling-modal-title" className={styles.title}>
          {modal.title}
        </h2>
        <p className={styles.intro}>{modal.intro}</p>
        <WhatsAppCards compact />
      </div>
    </dialog>
  );
}
