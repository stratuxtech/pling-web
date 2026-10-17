import type { Metadata } from "next";
import { ahorroPage, businessModel, routes } from "@/content/site";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Subline, Title } from "@/components/ui/Title";
import { IconCalculator } from "@/components/icons";
import { AhorroCalculator } from "@/components/ahorro/AhorroCalculator";
import styles from "./ahorro.module.css";

export const metadata: Metadata = {
  title: ahorroPage.meta.title,
  description: ahorroPage.meta.description,
  alternates: { canonical: routes.ahorro },
  openGraph: { title: ahorroPage.meta.title, description: ahorroPage.meta.description, url: routes.ahorro },
};

export default function Page() {
  return (
    <div className={styles.page}>
      <Breadcrumbs items={ahorroPage.breadcrumbs} />
      <header className={styles.header}>
        <Subline as="h1" icon={<IconCalculator />}>
          {ahorroPage.subline}
        </Subline>
        <Title as="p" parts={ahorroPage.title} className={styles.title} />
        <p className={styles.intro}>{ahorroPage.intro}</p>
        <p className={styles.rule}>{businessModel.goldenRule}</p>
      </header>
      <AhorroCalculator />
    </div>
  );
}
