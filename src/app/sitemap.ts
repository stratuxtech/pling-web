import type { MetadataRoute } from "next";
import { routes, siteUrl } from "@/content/site";

/** Páginas públicas indexables (/sistema queda fuera: es la ficha interna del UI kit). */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [routes.home, routes.ahorro, routes.nosotros, routes.filosofia, routes.faq, routes.contacto, routes.privacidad];
  return pages.map((p) => ({
    url: new URL(p, siteUrl).toString(),
    changeFrequency: "monthly",
    priority: p === routes.home ? 1 : p === routes.privacidad ? 0.3 : 0.7,
  }));
}
