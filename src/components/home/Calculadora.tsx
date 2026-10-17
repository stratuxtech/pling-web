"use client";

import { calculator, home } from "@/content/site";
import { formatBs, formatInt } from "@/lib/savings";
import { Subline, Title } from "@/components/ui/Title";
import { Button } from "@/components/ui/Button";
import { IconCalculator } from "@/components/icons";
import { CalcNote } from "@/components/calc/CalcNote";
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
        <div className={styles.headCopy}>
          <Subline as="h2" id="ahorro-title" icon={<IconCalculator />}>{home.ahorro.subline}</Subline>
          <Title as="p" parts={home.ahorro.title} className={styles.title} />
        </div>
        <Button action={home.ahorro.link} variant="outline" />
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
          <CalcNote className={styles.note} />
        </div>
      </div>
      <p className={styles.disclaimer}>{calculator.disclaimer}</p>
    </section>
  );
}
