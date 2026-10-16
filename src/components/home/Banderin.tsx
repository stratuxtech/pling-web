import { home } from "@/content/site";
import { Subline } from "@/components/ui/Title";
import { RevealText } from "@/components/motion/RevealText";

export function Banderin() {
  const { banderin } = home;
  return (
    <section aria-label={banderin.subline} className="mx-auto max-w-content px-(--gutter) py-(--section-space)">
      <div className="mx-auto flex max-w-narrow flex-col items-center gap-8 text-center">
        <Subline>{banderin.subline}</Subline>
        <RevealText
          text={banderin.text}
          glow={banderin.glow}
          className="font-display text-headline-md font-semibold sm:text-display-sm lg:text-display-md"
        />
      </div>
    </section>
  );
}
