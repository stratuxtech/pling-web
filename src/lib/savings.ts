import { businessModel, calculator, type TariffId } from "@/content/site";

export type CalcValues = { lives: number; prendas: number; equipo: number; precio: number };

/** Tramo de tarifa que corresponde a un volumen mensual de prendas vendidas. */
export function tierFor(prendasMes: number) {
  const tiers = businessModel.tariffs.tiers;
  return tiers.find((t) => prendasMes <= t.max) ?? tiers[tiers.length - 1];
}

/**
 * Cálculo de ahorro mensual. Todas las constantes viven en content/site.ts
 * (cifras de ejemplo). Devuelve también el desglose por tarea.
 */
export function computeSavings(v: CalcValues, tariff: TariffId) {
  const c = calculator;
  const prendasMes = v.lives * v.prendas * c.weeksPerMonth;
  const ventas = prendasMes * v.precio;
  const tier = tierFor(prendasMes);
  const precioPrenda = tier.price[tariff];
  const costo = prendasMes * precioPrenda;

  const tareas = [
    ...c.tasks.map((t) => ({ id: t.id, label: t.label, horas: (prendasMes * t.minutesPerGarment) / 60 })),
    { id: c.coordination.id, label: c.coordination.label, horas: v.equipo * v.lives * c.weeksPerMonth * c.coordination.hoursPerPersonPerLive },
  ];
  const horas = tareas.reduce((sum, t) => sum + t.horas, 0);
  const ahorroTiempo = horas * c.hourValueBs;
  const perdidasEvitadas = ventas * c.lossRate;
  const beneficio = ahorroTiempo + perdidasEvitadas - costo;

  return { prendasMes, ventas, tier, precioPrenda, costo, tareas, horas, ahorroTiempo, perdidasEvitadas, beneficio };
}

export const formatBs = (n: number) => `Bs ${Math.round(n).toLocaleString("es-BO")}`;
export const formatBsCents = (n: number) => `Bs ${n.toLocaleString("es-BO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
export const formatInt = (n: number) => Math.round(n).toLocaleString("es-BO");
