"use client";

import { useEffect, useRef, useState } from "react";
import { home } from "@/content/site";
import { Subline, Accent } from "@/components/ui/Title";
import { IconBox, IconSpark, IconTiktok, IconWhatsapp } from "@/components/icons";
import styles from "./Banderin.module.css";

const { banderin } = home;
const sourceIcons = {
  tiktok: <IconTiktok className="size-[0.62em]" />,
  whatsapp: <IconWhatsapp className="size-[0.62em]" />,
  inventario: <IconBox className="size-[0.62em]" />,
};

/** ➕ entre piezas: gira al entrar y luego late suave. */
function Plus({ i }: { i: number }) {
  return (
    <span className={styles.plus} style={{ "--i": i } as React.CSSProperties} aria-hidden>
      ➕
    </span>
  );
}

/**
 * ¿Qué es Pling? como una suma: tus 3 canales ➕ … = un solo sistema, y lo
 * que resulta (➕ entre cada logro), cerrando "Tú vendes. / Pling hace el
 * resto.". Cada pieza entra escalonada al llegar a la sección. Los lectores
 * de pantalla reciben la frase completa en texto plano.
 */
export function Banderin() {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Solo con JS listo se ocultan las piezas para animarlas (sin JS se ven completas)
    el.dataset.ready = "";
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  let i = 0;
  const step = () => ({ "--i": i++ }) as React.CSSProperties;

  return (
    <section ref={ref} aria-labelledby="que-es-title" className={styles.section} data-in={inView ? "" : undefined}>
      <Subline as="h2" id="que-es-title" icon={<IconSpark />}>
        {banderin.subline}
      </Subline>
      <p className="sr-only">{banderin.text}</p>

      <div className={styles.equation} aria-hidden>
        <p className={styles.sources}>
          {banderin.sources.map((s, k) => (
            <span key={s.id} className={styles.group}>
              {k > 0 ? <Plus i={i++} /> : null}
              <span className={styles.piece} data-src={s.id} style={step()}>
                <span className={styles.srcIcon}>{sourceIcons[s.id as keyof typeof sourceIcons]}</span>
                {s.label}
              </span>
            </span>
          ))}
        </p>

        <p className={styles.join}>
          <span className={styles.piece} style={step()}>
            {banderin.join.lead} <Accent>{banderin.join.accent}</Accent>
          </span>
        </p>

        <p className={styles.results}>
          {banderin.results.map((r, k) => (
            <span key={r} className={styles.group}>
              {k > 0 ? <Plus i={i++} /> : null}
              <span className={styles.piece} style={step()}>
                {r}
              </span>
            </span>
          ))}
        </p>

        <div className={styles.close}>
          {banderin.close.map((c) => (
            <p key={c.lead} className={styles.piece} style={step()}>
              {c.lead}
              {"accent2" in c && c.accent2 ? (
                <>
                  {" "}
                  <Accent red>{c.accent2}</Accent>
                </>
              ) : null}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
