import type { Metadata } from "next";
import { faqPage, routes } from "@/content/site";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Subline, Title } from "@/components/ui/Title";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/JsonLd";
import { IconChat, IconPlus } from "@/components/icons";
import { FaqNav } from "@/components/faq/FaqNav";
import styles from "@/components/faq/Faq.module.css";

export const metadata: Metadata = {
  title: faqPage.meta.title,
  description: faqPage.meta.description,
  alternates: { canonical: routes.faq },
  openGraph: { title: faqPage.meta.title, description: faqPage.meta.description, url: routes.faq },
};

export default function Page() {
  const { categories } = faqPage;
  const ejemplo: boolean = faqPage.ejemplo;
  return (
    <div className={styles.page}>
      <Breadcrumbs items={faqPage.breadcrumbs} />
      <header className={styles.header}>
        <Subline as="h1" icon={<IconChat />}>
          {faqPage.subline}
        </Subline>
        <Title as="p" parts={faqPage.title} className={styles.title} />
        <p className={styles.intro}>{faqPage.intro}</p>
      </header>

      <div className={styles.layout}>
        <FaqNav categories={categories.map((c) => ({ id: c.id, label: c.label, count: c.items.length }))} />

        <div className={styles.groups}>
          {categories.map((c) => (
            <section key={c.id} id={`cat-${c.id}`} className={styles.group} aria-labelledby={`cat-${c.id}-title`}>
              <h2 id={`cat-${c.id}-title`} className={styles.groupTitle}>
                {c.label}
              </h2>
              <div className={styles.list}>
                {c.items.map((it) => (
                  <details key={it.q} className={styles.item} name={`faq-${c.id}`}>
                    <summary className={styles.q}>
                      <span>{it.q}</span>
                      <span className={styles.toggle} aria-hidden>
                        <IconPlus className="size-5" />
                      </span>
                    </summary>
                    <p className={styles.a}>{it.a}</p>
                  </details>
                ))}
              </div>
            </section>
          ))}

          <aside className={styles.contact} aria-labelledby="faq-contacto">
            <h2 id="faq-contacto" className={styles.contactTitle}>
              {faqPage.contacto.title}
            </h2>
            <Button action={faqPage.contacto.cta} size="lg" />
          </aside>
        </div>
      </div>

      {/* Los datos estructurados solo se publican cuando las respuestas sean reales */}
      {ejemplo ? null : (
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: categories.flatMap((c) => c.items.map((it) => ({ "@type": "Question", name: it.q, acceptedAnswer: { "@type": "Answer", text: it.a } }))),
        }}
      />
      )}
    </div>
  );
}
