import type { Metadata } from "next";
import { filosofiaPage, routes } from "@/content/site";
import { FilosofiaHero } from "@/components/filosofia/FilosofiaHero";
import { TwistCarousel } from "@/components/filosofia/TwistCarousel";
import { Problemas } from "@/components/filosofia/Problemas";
import { Solucion } from "@/components/filosofia/Solucion";

export const metadata: Metadata = {
  title: filosofiaPage.meta.title,
  description: filosofiaPage.meta.description,
  alternates: { canonical: routes.filosofia },
  openGraph: { title: filosofiaPage.meta.title, description: filosofiaPage.meta.description, url: routes.filosofia },
};

export default function Page() {
  return (
    <>
      <FilosofiaHero />
      <TwistCarousel />
      <Problemas />
      <Solucion />
    </>
  );
}
