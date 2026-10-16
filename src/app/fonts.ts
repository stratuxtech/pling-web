import localFont from "next/font/local";
import { Cormorant_Garamond, JetBrains_Mono } from "next/font/google";

/* Subconjuntos latinos en WOFF2 generados desde public/fonts (solo los pesos en uso). */

/** Fredoka: Medium (500) en titulares; SemiBold (600) solo en botones y controles. */
export const fredoka = localFont({
  src: [
    { path: "../fonts/fredoka-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/fredoka-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-fredoka",
  display: "swap",
  fallback: ["ui-rounded", "system-ui", "sans-serif"],
});

export const manrope = localFont({
  src: [
    { path: "../fonts/manrope-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/manrope-500.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-manrope",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

/** Énfasis editorial dentro de titulares: Cormorant Garamond Medium Italic. */
export const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500"],
  style: ["italic"],
  variable: "--font-cormorant",
  display: "swap",
});

/** Monospace técnica: solo códigos impresos (#A1B2), numeración y tickets. */
export const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const fontVariables = [fredoka.variable, manrope.variable, cormorant.variable, jetbrains.variable].join(" ");
