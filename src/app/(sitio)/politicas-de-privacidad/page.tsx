import type { Metadata } from "next";
import { privacidadPage, routes } from "@/content/site";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Title } from "@/components/ui/Title";
import styles from "./privacidad.module.css";

export const metadata: Metadata = {
  title: privacidadPage.meta.title,
  description: privacidadPage.meta.description,
  alternates: { canonical: routes.privacidad },
  openGraph: { title: privacidadPage.meta.title, description: privacidadPage.meta.description, url: routes.privacidad },
};

export default function Page() {
  const p = privacidadPage;
  return (
    <div className={styles.page}>
      <Breadcrumbs items={p.breadcrumbs} />
      <header className={styles.header}>
        <p className={styles.notice}>{p.notice}</p>
        <Title as="h1" parts={p.title} className={styles.title} />
        <p className={styles.updated}>{p.updated}</p>
        <p className={styles.intro}>{p.intro}</p>
      </header>

      <div className={styles.layout}>
        <nav aria-label="Índice de la política" className={styles.toc}>
          <p className={styles.tocTitle}>En esta página</p>
          <ol className={styles.tocList}>
            {p.sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className={styles.tocLink}>
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <article className={styles.prose}>
          {p.sections.map((s, i) => (
            <section key={s.id} id={s.id} className={styles.section} aria-labelledby={`${s.id}-title`}>
              <h2 id={`${s.id}-title`} className={styles.h2}>
                <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
                {s.title}
              </h2>
              {s.body.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </section>
          ))}
        </article>
      </div>
    </div>
  );
}
