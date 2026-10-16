import type { Metadata } from "next";
import Image from "next/image";
import { badges, brand, home } from "@/content/site";

/**
 * Hoja de sistema de la fase 1 (solo para validar tokens). No se publica:
 * noindex y se elimina antes del despliegue.
 */
export const metadata: Metadata = {
  title: "Sistema de diseño",
  robots: { index: false, follow: false },
};

const scales = [
  {
    name: "Azul Pling · Primary",
    steps: ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"].map((s) => ({
      step: s,
      cls: `bg-primary-${s}`,
    })),
  },
  {
    name: "Rojo Pling · Secondary",
    steps: ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"].map((s) => ({
      step: s,
      cls: `bg-secondary-${s}`,
    })),
  },
  {
    name: "Neutros · sin negro absoluto (900 = #1B1B21)",
    steps: ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"].map((s) => ({
      step: s,
      cls: `bg-neutral-${s}`,
    })),
  },
];

/* Clases literales para que Tailwind las genere (no se construyen dinámicamente). */
const swatchClasses: Record<string, string> = {
  "bg-primary-50": "bg-primary-50",
  "bg-primary-100": "bg-primary-100",
  "bg-primary-200": "bg-primary-200",
  "bg-primary-300": "bg-primary-300",
  "bg-primary-400": "bg-primary-400",
  "bg-primary-500": "bg-primary-500",
  "bg-primary-600": "bg-primary-600",
  "bg-primary-700": "bg-primary-700",
  "bg-primary-800": "bg-primary-800",
  "bg-primary-900": "bg-primary-900",
  "bg-secondary-50": "bg-secondary-50",
  "bg-secondary-100": "bg-secondary-100",
  "bg-secondary-200": "bg-secondary-200",
  "bg-secondary-300": "bg-secondary-300",
  "bg-secondary-400": "bg-secondary-400",
  "bg-secondary-500": "bg-secondary-500",
  "bg-secondary-600": "bg-secondary-600",
  "bg-secondary-700": "bg-secondary-700",
  "bg-secondary-800": "bg-secondary-800",
  "bg-secondary-900": "bg-secondary-900",
  "bg-neutral-50": "bg-neutral-50",
  "bg-neutral-100": "bg-neutral-100",
  "bg-neutral-200": "bg-neutral-200",
  "bg-neutral-300": "bg-neutral-300",
  "bg-neutral-400": "bg-neutral-400",
  "bg-neutral-500": "bg-neutral-500",
  "bg-neutral-600": "bg-neutral-600",
  "bg-neutral-700": "bg-neutral-700",
  "bg-neutral-800": "bg-neutral-800",
  "bg-neutral-900": "bg-neutral-900",
};

/* Hex de la escala neutral para mostrarlos junto al swatch. */
const neutralHex: Record<string, string> = {
  "50": "#F7F7FA",
  "100": "#EFEFF4",
  "200": "#E3E3EA",
  "300": "#C8C7D1",
  "400": "#A9A8B4",
  "500": "#8D8C98",
  "600": "#6E6D79",
  "700": "#57565F",
  "800": "#46464F",
  "900": "#1B1B21",
};

const roles = [
  { name: "Primary", bg: "bg-primary", fg: "text-on-primary", hex: "#454DF4" },
  { name: "Primary Container", bg: "bg-primary-container", fg: "text-primary-900", hex: "#E0E0FF" },
  { name: "Secondary", bg: "bg-secondary", fg: "text-on-secondary", hex: "#B23119" },
  { name: "Secondary Container", bg: "bg-secondary-container", fg: "text-secondary-900", hex: "#FFDAD4" },
  { name: "Coral (acento)", bg: "bg-coral", fg: "text-on-surface", hex: "#FF4A3D" },
  { name: "Tertiary", bg: "bg-tertiary", fg: "text-on-tertiary", hex: "#A0008A" },
  { name: "Tertiary Container", bg: "bg-tertiary-container", fg: "text-tertiary", hex: "#FFD7F3" },
  { name: "Success Container", bg: "bg-success-container", fg: "text-success", hex: "#B4F1BC" },
  { name: "Warning Container", bg: "bg-warning-container", fg: "text-warning", hex: "#FFDDB6" },
  { name: "Error Container", bg: "bg-error-container", fg: "text-error", hex: "#F9DEDC" },
];

const typeScale = [
  { token: "display-lg", cls: "text-display-lg font-display font-title", spec: "57/64 · Fredoka Medium 500" },
  { token: "display-md", cls: "text-display-md font-display font-title", spec: "45/52 · Fredoka Medium 500" },
  { token: "display-sm", cls: "text-display-sm font-display font-title", spec: "36/44 · Fredoka Medium 500" },
  { token: "headline-lg", cls: "text-headline-lg font-display font-title", spec: "32/40 · Fredoka Medium 500" },
  { token: "headline-md", cls: "text-headline-md font-display font-title", spec: "28/36 · Fredoka Medium 500" },
  { token: "headline-sm", cls: "text-headline-sm font-display font-title", spec: "24/32 · Fredoka Medium 500" },
  { token: "title-lg", cls: "text-title-lg font-display font-title", spec: "22/28 · Fredoka Medium 500" },
  { token: "title-md", cls: "text-title-md font-display font-title", spec: "16/24 · Fredoka Medium 500" },
  { token: "body-lg", cls: "text-body-lg font-body", spec: "16/24 · Manrope 400" },
  { token: "body-md", cls: "text-body-md font-body", spec: "14/20 · Manrope 400" },
  { token: "body-sm", cls: "text-body-sm font-body", spec: "12/16 · Manrope 400" },
  { token: "label-lg", cls: "text-label-lg font-body font-medium", spec: "14/20 · Manrope 500" },
];

const radii = [
  { token: "xs", cls: "rounded-xs", px: "4" },
  { token: "sm", cls: "rounded-sm", px: "8" },
  { token: "md", cls: "rounded-md", px: "12" },
  { token: "lg", cls: "rounded-lg", px: "16" },
  { token: "lg-plus", cls: "rounded-lg-plus", px: "20" },
  { token: "xl", cls: "rounded-xl", px: "28" },
  { token: "full", cls: "rounded-full", px: "1000" },
];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-8 text-headline-md font-title text-on-surface">{children}</h2>;
}

export default function SistemaPage() {
  return (
    <main className="mx-auto max-w-content px-(--gutter) pt-16 pb-(--section-space)">
      <header className="mb-24 flex flex-col gap-10">
        <Image src={brand.logo.color.src} alt={brand.logo.color.alt} width={150} height={49} priority />
        <h1 className="max-w-prose text-display-md text-on-surface sm:text-display-lg">
          Vender por <span className="text-primary">TikTok Live</span>{" "}
          <em className="accent text-primary">ya lo haces bien.</em>
        </h1>
        <p className="max-w-prose text-body-lg text-on-surface-variant">
          Sistema de diseño: tokens Material Design 3 Light, tipografías de marca y el fondo vivo
          de Pling. Titulares en Fredoka Medium, énfasis en Cormorant Garamond Italic sin subrayado.
          Esta hoja solo sirve para validar el sistema; no es una página del sitio.
        </p>
      </header>

      <section className="mb-(--section-space)">
        <SectionTitle>Color</SectionTitle>
        <div className="flex flex-col gap-8">
          {scales.map((scale) => (
            <div key={scale.name}>
              <h3 className="mb-3 text-title-sm font-title text-on-surface-variant">{scale.name}</h3>
              <ol className="grid grid-cols-5 gap-2 sm:grid-cols-10">
                {scale.steps.map(({ step, cls }) => (
                  <li key={step} className="flex flex-col gap-1.5">
                    <span className={`block aspect-square rounded-md shadow-1 ${swatchClasses[cls]}`} />
                    <span className="text-label-md font-medium text-on-surface-variant">
                      {step === "500" && !scale.name.startsWith("Neutros") ? <strong className="text-on-surface">500 base</strong> : step}
                      {scale.name.startsWith("Neutros") ? <span className="block font-mono text-label-sm">{neutralHex[step]}</span> : null}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {roles.map((r) => (
            <li key={r.name} className={`flex min-h-28 flex-col justify-between rounded-lg p-4 ${r.bg} ${r.fg}`}>
              <span className="text-title-sm font-display font-title">{r.name}</span>
              <span className="text-label-md font-medium">{r.hex}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-lg bg-surface p-5 shadow-2">
            <p className="text-title-sm font-display font-title text-on-surface">On Surface #1B1B21</p>
            <p className="text-body-md text-on-surface-variant">On Surface Variant #46464F</p>
          </div>
          <div className="rounded-lg bg-mesh-lavender p-5">
            <p className="text-title-sm font-display font-title">Lavanda #FBF8FF</p>
            <p className="text-body-md text-on-surface-variant">Tono del lienzo orgánico</p>
          </div>
          <div className="rounded-lg bg-mesh-peach p-5">
            <p className="text-title-sm font-display font-title">Durazno #FFF5F3</p>
            <p className="text-body-md text-on-surface-variant">Tono del lienzo orgánico</p>
          </div>
        </div>
      </section>

      <section className="mb-(--section-space)">
        <SectionTitle>Tipografía</SectionTitle>
        <div className="mb-12 rounded-xl bg-surface p-6 shadow-2 sm:p-10">
          <p className="mb-4 text-label-lg font-medium text-on-surface-variant">{home.hero.subline}</p>
          <p className="text-display-sm font-display font-title text-on-surface sm:text-display-lg">
            Pling se encarga de{" "}
            <em className="accent text-primary">todo lo demás:</em>{" "}
            <span className="text-secondary-400">{home.hero.rotator[0].text}</span>
          </p>
        </div>
        <ol className="flex flex-col divide-y divide-primary-100">
          {typeScale.map((t) => (
            <li key={t.token} className="grid grid-cols-1 items-baseline gap-2 py-4 md:grid-cols-[10rem_1fr]">
              <span className="text-label-md font-medium text-on-surface-variant">
                {t.token}
                <br />
                {t.spec}
              </span>
              <span className={`${t.cls} text-on-surface`}>Cada prenda, un código.</span>
            </li>
          ))}
          <li className="grid grid-cols-1 items-baseline gap-2 py-4 md:grid-cols-[10rem_1fr]">
            <span className="text-label-md font-medium text-on-surface-variant">
              accent
              <br />
              Cormorant Garamond Medium Italic 500 · 1.14em
            </span>
            <em className="accent text-headline-lg text-primary">Una compradora, un paquete.</em>
          </li>
          <li className="grid grid-cols-1 items-baseline gap-2 py-4 md:grid-cols-[10rem_1fr]">
            <span className="text-label-md font-medium text-on-surface-variant">
              mono
              <br />
              JetBrains Mono · solo códigos físicos
            </span>
            <span className="font-mono text-title-lg text-on-surface">
              {badges.codigo.label} · {badges.codigo.code}
            </span>
          </li>
        </ol>
      </section>

      <section className="mb-(--section-space)">
        <SectionTitle>Forma y luz</SectionTitle>
        <ul className="mb-12 flex flex-wrap items-end gap-4">
          {radii.map((r) => (
            <li key={r.token} className="flex flex-col items-center gap-2">
              <span className={`block size-20 bg-primary-100 ${r.cls}`} />
              <span className="text-label-md font-medium text-on-surface-variant">
                {r.token} · {r.px}px
              </span>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-10">
          <div className="flex flex-col items-start gap-3">
            <span className="rounded-full bg-primary px-6 py-3 text-label-lg font-display font-semibold text-on-primary shadow-glow-primary">
              Glow azul en reposo
            </span>
            <span className="text-label-md text-on-surface-variant">shadow-glow-primary</span>
          </div>
          <div className="flex flex-col items-start gap-3">
            <span className="rounded-full bg-secondary px-6 py-3 text-label-lg font-display font-semibold text-on-secondary shadow-glow-secondary">
              Glow rojo en reposo
            </span>
            <span className="text-label-md text-on-surface-variant">shadow-glow-secondary</span>
          </div>
          {["shadow-1", "shadow-2", "shadow-3"].map((s) => (
            <div key={s} className="flex flex-col items-start gap-3">
              <span
                className={`block h-12 w-32 rounded-lg bg-surface ${s === "shadow-1" ? "shadow-1" : s === "shadow-2" ? "shadow-2" : "shadow-3"}`}
              />
              <span className="text-label-md text-on-surface-variant">{s}</span>
            </div>
          ))}
        </div>
        <p className="mt-8 max-w-prose text-body-md text-on-surface-variant">
          El giro horario del glow (hover, focus y click) se construye con los botones en la fase 2.
        </p>
      </section>
    </main>
  );
}
