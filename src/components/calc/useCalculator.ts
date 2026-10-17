"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { businessModel, calculator, type TariffId } from "@/content/site";
import { computeSavings, type CalcValues } from "@/lib/savings";

export type CalcKey = keyof CalcValues;
export const calcKeys: CalcKey[] = ["lives", "prendas", "equipo", "precio"];
const defaults = Object.fromEntries(calcKeys.map((k) => [k, calculator.inputs[k].default])) as CalcValues;

/** Estado de la calculadora (Home y /cuanto-te-ahorra comparten lógica y supuestos). */
export function useCalculator() {
  const [tariff, setTariff] = useState<TariffId>(businessModel.tariffs.default);
  const [values, setValues] = useState<CalcValues>(defaults);
  const result = useMemo(() => computeSavings(values, tariff), [values, tariff]);
  const activePreset = calculator.presets.find((p) => calcKeys.every((k) => p.values[k] === values[k]))?.id;
  return { tariff, setTariff, values, setValues, result, activePreset };
}

/** Contador que anima hacia su nuevo valor (carga fluida de datos). */
export function useTween(value: number, ms = 450) {
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
