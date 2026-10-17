import type { Metadata } from "next";
import { queHacePage, routes } from "@/content/site";
import { QueHaceHero } from "@/components/quehace/QueHaceHero";
import { FeatureStage } from "@/components/quehace/FeatureStage";

export const metadata: Metadata = {
  title: queHacePage.meta.title,
  description: queHacePage.meta.description,
  alternates: { canonical: routes.queHace },
  openGraph: { title: queHacePage.meta.title, description: queHacePage.meta.description, url: routes.queHace },
};

export default function Page() {
  return (
    <>
      <QueHaceHero />
      {queHacePage.stages.map((s, i) => (
        <FeatureStage key={s.id} stage={s} index={i} />
      ))}
    </>
  );
}
