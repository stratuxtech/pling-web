/**
 * Texto con frases destacadas: `**así**` se convierte en <strong>. El
 * contenido vive en site.ts como texto plano con esa marca mínima.
 */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return <>{parts.map((p, i) => (i % 2 ? <strong key={i}>{p}</strong> : p))}</>;
}

/** Quita la marca `**` (para atributos, metadatos o lectores de texto plano). */
export const plain = (text: string) => text.replace(/\*\*/g, "");
