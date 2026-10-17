"use client";

import { ahorroPage, businessModel, calculator } from "@/content/site";
import { formatBs, formatBsCents, formatInt } from "@/lib/savings";
import { IconPlus } from "@/components/icons";
import { useCalculator, useTween } from "@/components/calc/useCalculator";
import { CalcSliders, PresetChips, TariffToggle } from "@/components/calc/CalcControls";
import { CalcNote } from "@/components/calc/CalcNote";
import styles from "./AhorroCalculator.module.css";

const p = ahorroPage;
const tariffLabel = (id: string) => businessModel.tariffs.options.find((o) => o.id === id)?.label ?? id;
const fmtNum = (n: number, d = 1) => n.toLocaleString("es-BO", { maximumFractionDigits: d });

/**
 * /cuanto-te-ahorra: columna izquierda fija con los controles y el acordeón
 * de tareas; a la derecha, resultados, desglose y tabla de tarifas que
 * responden al toggle Tienda Pionera / Estándar.
 */
export function AhorroCalculator() {
  const { tariff, setTariff, values, setValues, result: r, activePreset } = useCalculator();
  const beneficio = useTween(r.beneficio);
  const horas = useTween(r.horas);
  const maxTarea = Math.max(...r.tareas.map((t) => t.horas), 1);
  const desde = Math.min(...businessModel.tariffs.tiers.map((t) => t.price[tariff]));

  return (
    <div className={styles.layout}>
      <aside className={styles.side} aria-labelledby="ahorro-controles" data-lenis-prevent>
        <div className={styles.panel}>
          <h2 id="ahorro-controles" className={styles.panelTitle}>
            {p.controlsTitle}
          </h2>
          <TariffToggle tariff={tariff} onChange={setTariff} className={styles.toggle} />
          <PresetChips active={activePreset} onPick={setValues} />
          <CalcSliders values={values} onChange={setValues} idPrefix="ahorro" />
        </div>

        <details className={styles.acc}>
          <summary className={styles.accSummary}>
            <span>{p.accordion.title}</span>
            <span className={styles.accIcon} aria-hidden>
              <IconPlus className="size-5" />
            </span>
          </summary>
          <ul className={styles.tasks}>
            {calculator.tasks.map((t) => (
              <li key={t.id} className={styles.task}>
                <span className={styles.taskHead}>
                  <span className={styles.taskLabel}>{t.label}</span>
                  <span className={styles.taskTime}>{fmtNum(t.minutesPerGarment)} min / prenda</span>
                </span>
                <span className={styles.taskDetail}>{t.detail}</span>
              </li>
            ))}
            <li className={styles.task}>
              <span className={styles.taskHead}>
                <span className={styles.taskLabel}>{calculator.coordination.label}</span>
                <span className={styles.taskTime}>{fmtNum(calculator.coordination.hoursPerPersonPerLive)} h / persona y live</span>
              </span>
              <span className={styles.taskDetail}>{calculator.coordination.detail}</span>
            </li>
          </ul>
        </details>
      </aside>

      <div className={styles.main}>
        <section className={styles.hero} aria-labelledby="ahorro-resultado">
          <h2 id="ahorro-resultado" className="sr-only">
            Resultado
          </h2>
          <div className={styles.heroGrid} aria-live="polite">
            <div>
              <p className={styles.heroLabel}>{p.heroCard.beneficio}</p>
              <p className={styles.heroBig}>{formatBs(beneficio)}</p>
            </div>
            <div>
              <p className={styles.heroLabel}>{p.heroCard.horas}</p>
              <p className={styles.heroBig}>{formatInt(horas)} h</p>
            </div>
          </div>
          <dl className={styles.heroStats}>
            <div>
              <dt>{calculator.results.ventas}</dt>
              <dd>{formatBs(r.ventas)}</dd>
            </div>
            <div>
              <dt>Prendas vendidas / mes</dt>
              <dd>{formatInt(r.prendasMes)}</dd>
            </div>
            <div>
              <dt>{calculator.results.costo}</dt>
              <dd>{formatBs(r.costo)}</dd>
            </div>
          </dl>
          <CalcNote className={styles.heroNote} />
        </section>

        <section className={styles.card} aria-labelledby="ahorro-desglose">
          <h2 id="ahorro-desglose" className={styles.cardTitle}>
            {p.desglose.title}
          </h2>
          <p className={styles.cardSub}>{p.desglose.tareasTitle}</p>
          <ul className={styles.bars}>
            {r.tareas.map((t) => (
              <li key={t.id} className={styles.bar}>
                <span className={styles.barHead}>
                  <span>{t.label}</span>
                  <span className={styles.barValue}>{fmtNum(t.horas)} h</span>
                </span>
                <span className={styles.barTrack} aria-hidden>
                  <span className={styles.barFill} style={{ transform: `scaleX(${t.horas / maxTarea})` }} />
                </span>
              </li>
            ))}
          </ul>
          <dl className={styles.totals}>
            <div>
              <dt>
                {p.desglose.tiempo}
                <span className={styles.math}>
                  {fmtNum(r.horas)} h × {formatBs(calculator.hourValueBs)}/h
                </span>
              </dt>
              <dd>+ {formatBs(r.ahorroTiempo)}</dd>
            </div>
            <div>
              <dt>
                {p.desglose.perdidas}
                <span className={styles.math}>{fmtNum(calculator.lossRate * 100)}% de tus ventas</span>
              </dt>
              <dd>+ {formatBs(r.perdidasEvitadas)}</dd>
            </div>
            <div>
              <dt>
                {p.desglose.costo}
                <span className={styles.math}>
                  {formatInt(r.prendasMes)} prendas × {formatBsCents(r.precioPrenda)}
                </span>
              </dt>
              <dd className={styles.minus}>− {formatBs(r.costo)}</dd>
            </div>
            <div className={styles.total}>
              <dt>{p.desglose.total}</dt>
              <dd>{formatBs(r.beneficio)}</dd>
            </div>
          </dl>
        </section>

        <section className={styles.card} aria-labelledby="ahorro-tarifas">
          <div className={styles.tarifaHead}>
            <h2 id="ahorro-tarifas" className={styles.cardTitle}>
              {p.tarifas.title}
            </h2>
            <TariffToggle tariff={tariff} onChange={setTariff} />
          </div>
          <p className={styles.cardText}>{p.tarifas.intro}</p>
          <table className={styles.table}>
            <caption className="sr-only">
              {p.tarifas.title}: {tariffLabel(tariff)}
            </caption>
            <thead>
              <tr>
                <th scope="col">{p.tarifas.colTramo}</th>
                <th scope="col">
                  {p.tarifas.colPrecio} · {tariffLabel(tariff)}
                </th>
              </tr>
            </thead>
            <tbody>
              {businessModel.tariffs.tiers.map((t) => {
                const current = t.id === r.tier.id;
                return (
                  <tr key={t.id} data-current={current ? "" : undefined} aria-current={current ? "true" : undefined}>
                    <th scope="row">
                      {t.label}
                      {current ? <span className={styles.badge}>{p.tarifas.current}</span> : null}
                    </th>
                    <td>{formatBsCents(t.price[tariff])}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p className={styles.tarifaNote}>
            <strong>Desde {formatBsCents(desde)} por prenda.</strong> {businessModel.tariffs.notes[tariff]}
          </p>
        </section>

        <p className={styles.disclaimer}>{calculator.disclaimer}</p>
      </div>
    </div>
  );
}
