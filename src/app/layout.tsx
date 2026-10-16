import type { Metadata, Viewport } from "next";
import { OrganicMesh } from "@/components/OrganicMesh";
import { PlingModal } from "@/components/modal/PlingModal";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { CursorCta } from "@/components/motion/CursorCta";
import { brand, contact, home, parent, siteUrl, socials } from "@/content/site";
import { JsonLd } from "@/components/JsonLd";
import { fontVariables } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: home.meta.title, template: `%s · ${brand.name}` },
  description: home.meta.description,
  applicationName: brand.name,
  icons: { icon: brand.favicon },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_BO",
    siteName: brand.name,
    title: home.meta.title,
    description: home.meta.description,
    url: "/",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${brand.name} — ${brand.tagline}` }],
  },
  twitter: { card: "summary_large_image", title: home.meta.title, description: home.meta.description, images: ["/og.png"] },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={fontVariables}>
      <body>
        <a
          href="#contenido"
          className="sr-only z-70 rounded-full bg-primary px-5 py-3 font-display font-semibold text-on-primary focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Saltar al contenido
        </a>
        <OrganicMesh />
        {children}
        <PlingModal />
        <CursorCta />
        <SmoothScroll />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: brand.name,
            slogan: brand.tagline,
            url: siteUrl,
            logo: new URL(brand.logo.color.src, siteUrl).toString(),
            email: contact.email,
            telephone: contact.phoneDisplay.replace(/\s/g, ""),
            address: { "@type": "PostalAddress", addressLocality: "Santa Cruz de la Sierra", addressCountry: "BO" },
            sameAs: socials.map((s) => s.href),
            parentOrganization: { "@type": "Organization", name: parent.name, url: parent.url },
          }}
        />
      </body>
    </html>
  );
}
