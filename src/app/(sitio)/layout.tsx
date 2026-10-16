import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CtaFinal } from "@/components/CtaFinal";

/**
 * Páginas con Navbar + CTA Final + Footer. `/contacto` vive fuera de este
 * grupo porque el brief la exige sin navegación, sin footer y sin breadcrumbs.
 */
export default function SitioLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main id="contenido">{children}</main>
      <CtaFinal />
      <Footer />
    </>
  );
}
