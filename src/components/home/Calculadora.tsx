"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { businessModel, calculator, home, type TariffId } from "@/content/site";
import { computeSavings, formatBs, formatInt, type CalcValues } from "@/lib/savings";
import { Subline, Title } from "@/components/ui/Title";
import { IconArrowRight } from "@/components/icons";
import styles from "./Calculadora.module.css";

type Key = keyof CalcValues;
const keys: Key[] = ["lives", "prendas", "equipo", "precio"];
const defaults = Object.fromEntries(keys.map((k) => [k, calculator.inputs[k].default])) as CalcValues;

/** Contador que anima hacia su nuevo valor (carga fluida de datos). */
function useTween(value: number, ms = 450) {
  const [shown, setShown] = useState(value);
  const from = useRef(value);
  useEffect(() => {
    const dur = matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : ms;
    const start = performance.now();
    const a = from.current;
    let raf = 0;
    const step = (now: number) => {
      const t = dur ? Math.min(1, (now - start) / dur) : 1;
      const e = 1 - Math.pow(1 - t, 3);
      const v = a + (value - a) * e;
      setShown(v);
      from.current = v;
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value, ms]);
  return shown;
}

export function Calculadora() {
  const [tariff, setTariff] = useState<TariffId>(businessModel.tariffs.default);
  const [values, setValues] = useState<CalcValues>(defaults);
  const r = useMemo(() => computeSavings(values, tariff), [values, tariff]);

  const beneficio = useTween(r.beneficio);
  const horas = useTween(r.horas);
  const costo = useTween(r.costo);

  const activePreset = calculator.presets.find((p) => keys.every((k) => p.values[k] === values[k]))?.id;

  function onTariffKey(e: React.KeyboardEvent) {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) return;
    e.preventDefault();
    const opts = businessModel.tariffs.options;
    const i = opts.findIndex((o) => o.id === tariff);
    const next = opts[(i + 1) % opts.length];
    setTariff(next.id);
    (e.currentTarget.querySelector(`[data-id="${next.id}"]`) as HTMLElement | null)?.focus();
  }

  return (
    <section className={styles.section} aria-labelledby="ahorro-title">
      <div className={styles.head}>
        <Subline>{home.ahorro.subline}</Subline>
        <Title id="ahorro-title" parts={home.ahorro.title} className={styles.title} />
        <p className={styles.rule}>{businessModel.goldenRule}</p>
      </div>

      <div className={styles.grid}>
        <div className={styles.controls}>
          <div className={styles.row}>
            <div role="radiogroup" aria-label="Tipo de tarifa" className={styles.segmented} onKeyDown={onTariffKey}>
              {businessModel.tariffs.options.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  role="radio"
                  data-id={o.id}
                  aria-checked={tariff === o.id}
                  tabIndex={tariff === o.id ? 0 : -1}
                  className={styles.segment}
                  onClick={() => setTariff(o.id)}
                >
                  {o.label}
                </button>
              ))}
            </div>
            <div className={styles.presets} role="group" aria-label="Escenarios rápidos">
              {calculator.presets.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className={styles.chip}
                  aria-pressed={activePreset === p.id}
                  onClick={() => setValues(p.values)}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {keys.map((k) => {
            const cfg = calculator.inputs[k];
            const pct = ((values[k] - cfg.min) / (cfg.max - cfg.min)) * 100;
            const id = `calc-${k}`;
            return (
              <div key={k} className={styles.field}>
                <div className={styles.fieldHead}>
                  <label htmlFor={id} className={styles.label}>
                    {cfg.label}
                  </label>
                  <output htmlFor={id} className={styles.value}>
                    {k === "precio" ? formatBs(values[k]) : values[k]}
                  </output>
                </div>
                <input
                  id={id}
                  type="range"
                  min={cfg.min}
                  max={cfg.max}
                  step={cfg.step}
                  value={values[k]}
                  onChange={(e) => setValues((v) => ({ ...v, [k]: Number(e.target.value) }))}
                  className={styles.range}
                  style={{ "--p": `${pct}%` } as React.CSSProperties}
                  aria-valuetext={k === "precio" ? formatBs(values[k]) : `${values[k]} ${cfg.unit}`}
                />
              </div>
            );
          })}
        </div>

        <div className={styles.result} aria-live="polite">
          <p className={styles.resultLabel}>{calculator.results.beneficio}</p>
          <p className={styles.big}>{formatBs(beneficio)}</p>
          <dl className={styles.stats}>
            <div>
              <dt>{calculator.results.horas}</dt>
              <dd>{formatInt(horas)} h</dd>
            </div>
            <div>
              <dt>{calculator.results.costo}</dt>
              <dd>{formatBs(costo)}</dd>
            </div>
          </dl>
          <p className={styles.note}>{businessModel.note}</p>
          <Link href={home.ahorro.link.href} className={styles.more}>
            {home.ahorro.link.label}
            <IconArrowRight className="size-4" />
          </Link>
        </div>
      </div>
      <p className={styles.disclaimer}>{calculator.disclaimer}</p>
    </section>
  );
}
