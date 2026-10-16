import Image from "next/image";
import { brand } from "@/content/site";

/**
 * Logotipo oficial (nunca texto HTML). `tone="white"` deriva la versión blanca
 * del PNG con un filtro mientras no exista el archivo oficial en blanco.
 */
export function Logo({ height = 32, tone = "color", priority = false }: { height?: number; tone?: "color" | "white"; priority?: boolean }) {
  const { src, width: w, height: h, alt } = brand.logo.color;
  const width = Math.round((w / h) * height);
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={tone === "white" ? "brightness-0 invert" : undefined}
      style={{ width, height }}
    />
  );
}
