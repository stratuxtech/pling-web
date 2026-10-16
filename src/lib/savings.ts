import { calculator, type TariffId } from "@/content/site";

export type CalcValues = { lives: number; prendas: number; equipo: number; precio: number };

/** Cálculo de ahorro mensual. Todas las constantes viven en content/site.ts (cifras de ejemplo). */
export function computeSavings(v: CalcValues, tariff: TariffId) {
  const c = calculator;
  const prendasMes = v.lives * v.prendas * c.weeksPerMonth;
  const ventas = prendasMes * v.precio;
  const costo = prendasMes * c.feePerGarment[tariff];
  const horas = (prendasMes * c.minutesSavedPerGarment) / 60 + v.equipo * v.lives * c.weeksPerMonth * c.coordinationHoursPerPersonPerLive;
  const beneficio = horas * c.hourValueBs + ventas * c.lossRate - costo;
  return { prendasMes, ventas, costo, horas, beneficio };
}

export const formatBs = (n: number) => `Bs ${Math.round(n).toLocaleString("es-BO")}`;
export const formatInt = (n: number) => Math.round(n).toLocaleString("es-BO");
