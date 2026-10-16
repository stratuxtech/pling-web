import type { Metadata } from "next";
import { PhaseStub } from "@/components/PhaseStub";
import { ahorroPage } from "@/content/site";

export const metadata: Metadata = { title: ahorroPage.meta.title };

export default function Page() {
  return <PhaseStub title={ahorroPage.meta.title} phase={4} />;
}
