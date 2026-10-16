import type { Metadata } from "next";
import { nosotrosPage, routes } from "@/content/site";
import { NosotrosHero } from "@/components/nosotros/NosotrosHero";
import { MisionVision } from "@/components/nosotros/MisionVision";
import { PorQueNace } from "@/components/nosotros/PorQueNace";
import { Growists } from "@/components/nosotros/Growists";

export const metadata: Metadata = {
  title: nosotrosPage.meta.title,
  description: nosotrosPage.meta.description,
  alternates: { canonical: routes.nosotros },
  openGraph: { title: nosotrosPage.meta.title, description: nosotrosPage.meta.description, url: routes.nosotros },
};

export default function Page() {
  return (
    <>
      <NosotrosHero />
      <MisionVision />
      <PorQueNace />
      <Growists />
    </>
  );
}
