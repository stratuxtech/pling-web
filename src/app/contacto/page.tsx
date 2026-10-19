import type { Metadata } from "next";
import Link from "next/link";
import { contact, contactoPage, parent, routes, socials } from "@/content/site";
import { Logo } from "@/components/Logo";
import { Subline, Title } from "@/components/ui/Title";
import { WhatsAppCards } from "@/components/WhatsAppCards";
import { IconArrowUpRight, IconChevronLeft, IconMail, IconPin, IconWhatsapp, socialIcons } from "@/components/icons";
import styles from "./contacto.module.css";

export const metadata: Metadata = {
  title: contactoPage.meta.title,
  description: contactoPage.meta.description,
  alternates: { canonical: routes.contacto },
  openGraph: { title: contactoPage.meta.title, description: contactoPage.meta.description, url: routes.contacto },
};

/** Vista de conversión encapsulada: sin Navbar, sin Footer y sin breadcrumbs (brief §6). */
export default function ContactoPage() {
  return (
    <main id="contenido" className={styles.page}>
      <div className={styles.top}>
        <Link href={routes.home} aria-label="Pling!, ir al inicio" className="inline-flex rounded-sm">
          <Logo height={34} priority />
        </Link>
        <Link href={contactoPage.back.href} className={styles.back}>
          <IconChevronLeft className="size-4" />
          {contactoPage.back.label}
        </Link>
      </div>

      <section className={styles.hero} aria-labelledby="contacto-title">
        <Subline as="h1" id="contacto-title" icon={<IconWhatsapp />}>
          {contactoPage.subline}
        </Subline>
        <Title as="p" parts={contactoPage.title} className={styles.title} />
        <p className={styles.intro}>{contactoPage.intro}</p>
        <WhatsAppCards />
      </section>

      <section className={styles.data} aria-labelledby="datos-title">
        <div className={styles.map}>
          <iframe
            src={contact.mapsEmbed}
            title="Mapa: ubicación de Growiststech en Santa Cruz de la Sierra"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className={styles.info}>
          <h2 id="datos-title" className={styles.infoTitle}>
            {contactoPage.dataTitle}
          </h2>
          <ul className={styles.list}>
            <li>
              <IconWhatsapp className="size-5" />
              <a href={`https://wa.me/${contact.whatsappNumber}`} target="_blank" rel="noopener">
                {contact.phoneDisplay}
              </a>
            </li>
            <li>
              <IconMail className="size-5" />
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </li>
            <li>
              <IconPin className="size-5" />
              <a href={contact.mapsUrl} target="_blank" rel="noopener">
                {contact.city}
              </a>
            </li>
          </ul>
          <ul className={styles.socials}>
            {socials.map((s) => {
              const Icon = socialIcons[s.id];
              return (
                <li key={s.id}>
                  <a href={s.href} target="_blank" rel="noopener" className={styles.social}>
                    <Icon className="size-4" />
                    {s.handle}
                  </a>
                </li>
              );
            })}
          </ul>
          <p className={styles.growists}>
            {contactoPage.growistsNote} ·{" "}
            <a href={parent.url} target="_blank" rel="noopener">
              growists.com
              <IconArrowUpRight className="ml-0.5 inline size-3.5 align-baseline" />
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
