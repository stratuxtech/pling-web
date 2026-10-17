"use client";

import Link from "next/link";
import { businessModel, calculator, home } from "@/content/site";
import { formatBs, formatInt } from "@/lib/savings";
import { Subline, Title } from "@/components/ui/Title";
import { IconArrowRight } from "@/components/icons";
import { useCalculator, useTween } from "@/components/calc/useCalculator";
import { CalcSliders, PresetChips, TariffToggle } from "@/components/calc/CalcControls";
import styles from "./Calculadora.module.css";

export function Calculadora() {
  const { tariff, setTariff, values, setValues, result: r, activePreset } = useCalculator();

  const beneficio = useTween(r.beneficio);
  const horas = useTween(r.horas);
  const costo = useTween(r.costo);

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
            <TariffToggle tariff={tariff} onChange={setTariff} />
            <PresetChips active={activePreset} onPick={setValues} />
          </div>
          <CalcSliders values={values} onChange={setValues} />
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
