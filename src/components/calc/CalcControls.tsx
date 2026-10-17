"use client";

import { businessModel, calculator, type TariffId } from "@/content/site";
import { formatBs, type CalcValues } from "@/lib/savings";
import { calcKeys } from "./useCalculator";
import styles from "./Calc.module.css";

/** Selector Tienda Pionera / Estándar (radiogroup con flechas). */
export function TariffToggle({ tariff, onChange, className = "" }: { tariff: TariffId; onChange: (t: TariffId) => void; className?: string }) {
  const opts = businessModel.tariffs.options;
  function onKey(e: React.KeyboardEvent) {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) return;
    e.preventDefault();
    const i = opts.findIndex((o) => o.id === tariff);
    const next = opts[(i + (e.key === "ArrowLeft" || e.key === "ArrowUp" ? opts.length - 1 : 1)) % opts.length];
    onChange(next.id);
    (e.currentTarget.querySelector(`[data-id="${next.id}"]`) as HTMLElement | null)?.focus();
  }
  return (
    <div role="radiogroup" aria-label="Tipo de tarifa" className={`${styles.segmented} ${className}`} onKeyDown={onKey}>
      {opts.map((o) => (
        <button
          key={o.id}
          type="button"
          role="radio"
          data-id={o.id}
          aria-checked={tariff === o.id}
          tabIndex={tariff === o.id ? 0 : -1}
          className={styles.segment}
          onClick={() => onChange(o.id)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/** Escenarios rápidos: Recién empezando / Alto volumen. */
export function PresetChips({ active, onPick }: { active?: string; onPick: (v: CalcValues) => void }) {
  return (
    <div className={styles.presets} role="group" aria-label="Escenarios rápidos">
      {calculator.presets.map((p) => (
        <button key={p.id} type="button" className={styles.chip} aria-pressed={active === p.id} onClick={() => onPick(p.values)}>
          {p.label}
        </button>
      ))}
    </div>
  );
}

/** Los 4 deslizadores de la calculadora. `idPrefix` evita ids duplicados si hay dos calculadoras. */
export function CalcSliders({ values, onChange, idPrefix = "calc" }: { values: CalcValues; onChange: (v: CalcValues) => void; idPrefix?: string }) {
  return (
    <>
      {calcKeys.map((k) => {
        const cfg = calculator.inputs[k];
        const pct = ((values[k] - cfg.min) / (cfg.max - cfg.min)) * 100;
        const id = `${idPrefix}-${k}`;
        const text = k === "precio" ? formatBs(values[k]) : `${values[k]} ${cfg.unit}`;
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
              onChange={(e) => onChange({ ...values, [k]: Number(e.target.value) })}
              className={styles.range}
              style={{ "--p": `${pct}%` } as React.CSSProperties}
              aria-valuetext={text}
            />
          </div>
        );
      })}
    </>
  );
}
