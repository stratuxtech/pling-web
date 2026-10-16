# Design — Pling! sitio informativo

Registro del sistema de diseño **tal como está construido** (no de intenciones). Fuente de verdad del código: `src/app/globals.css` (tokens `@theme`) y `src/components/ui/*`. Producto y decisiones del cliente: `PRODUCT.md`. Ficha visual interna: `/sistema` (noindex, fuera del sitemap).

## Principios visuales

- **Material Design 3, solo Light Mode.** Sin tema oscuro ni toggle.
- **Alivio antes que impresión.** Mucho aire, una idea por bloque, zona central de lectura siempre despejada; lo que levita va en la periferia.
- **La operativa como prueba.** Las capturas reales de la app viven en celulares 3D; los datos (código `#A1B2`, QR, envío) son el contenido, no la decoración.
- **Fondo vivo, superficies limpias.** Pling Organic Mesh detrás; tarjetas blancas con radios amplios delante.

## Color

Los valores por defecto de Tailwind están anulados (`--color-*: initial`); solo existen tokens de marca.

| Rol | Token | Valor | Uso |
|---|---|---|---|
| Primary (Azul Pling) | `primary` / `primary-500` | `#454DF4` | CTA, énfasis, enlaces activos |
| Primary profundo | `primary-600` / `700` | `#3B42D9` / `#2E36BB` | texto azul sobre blanco, sublines |
| Secondary (Rojo Pling) | `secondary` / `secondary-500` | `#B23119` | iconos y números de acento |
| Coral (acento lumínico) | `coral` | `#FF4A3D` | glow, LIVE, "!" del logo, puntos de subline. Texto blanco encima solo ≥24px o decorativo |
| Superficie | `surface` | `#FFFFFF` | tarjetas, navbar, footer |
| Texto principal | `on-surface` = `neutral-900` | `#1B1B21` | titulares y lectura |
| Texto secundario | `on-surface-variant` = `neutral-800` | `#46464F` | párrafos y metadatos |
| Estados | `success`, `warning`, `error` (+ `-container`) | M3 | validación QR, avisos de borrador, "caos" |

- Escalas completas `primary-50…900`, `secondary-50…900` y **`neutral-50…900`** (gris frío M3).
- **Sin negro absoluto**: el tono más oscuro es `#1B1B21`. El blanco puro sí se usa.
- Texto gris solo desde `neutral-600` (5.1:1 sobre blanco).

## Tipografía

| Familia | Token | Pesos | Uso |
|---|---|---|---|
| Fredoka | `font-display` | **500** (`--font-weight-title`), 600 | Titulares, cifras, títulos de tarjeta en Medium 500; SemiBold 600 **solo** en botones y controles. Nunca bold. |
| Manrope | `font-body` | 400, 500 | Párrafos, chips, etiquetas |
| Cormorant Garamond Italic | `font-accent` | 500 | Palabra de énfasis dentro del titular (`<Accent>`, clase `.accent`, 1.14em, Azul Pling). **Sin subrayado.** |
| JetBrains Mono | `font-mono` | 400, 500 | Solo códigos físicos (`#A1B2`) |

- **Escala M3 web:** display 57/45/36, headline 32/28/24, title 22/16/14, body 16/14/12, label 14/12/11.
- **Excepciones:**
  - `display-xl` (`clamp(3.5rem, 11.5vw, 10.5rem)`) solo para el enlace gigante del footer;
  - el dato de Filosofía (`clamp(4.5rem, 12vw, 8.5rem)`).
- Titulares con `text-wrap: balance`; texto corrido a 1.65 de interlineado y ≤ 68ch.

## Forma, sombra y espacio

- **Radios:** `xs 4` · `sm 8` · `md 12` · `lg 16` · `lg-plus 20` · `xl 28` · `full`.
  - Tarjetas de sección: `xl`.
  - Fotos dentro de tarjeta: `lg-plus`.
  - Botones, chips y navbar: `full`.
- **Sombras:**
  - `shadow-1/2/3`: elevación neutra con tinte `#1B1B21`.
  - `glow-primary` / `glow-secondary`: halos de marca para CTA y hover.
- **Contenedores:** `content 80rem`, `narrow 58rem`, `prose 68ch`.
- **Espaciado:** `--gutter: clamp(1rem, 4vw, 3rem)` y `--section-space: clamp(5rem, 12vw, 9rem)`.

## Movimiento

- **Curvas:**
  - `ease-standard` (M3);
  - `ease-out-expo` (hover y entradas, medida en anubi.io);
  - `ease-label` `(.11,.72,0,1)` (rotador, make-b.studio).
- **Duraciones:** 150 / 300 / 550 ms.
- **Smooth scroll:** Lenis 1.4s, con anclas desfasadas 104px bajo la navbar.
- **Patrones construidos y su referencia:**

| Patrón | Dónde | Referencia |
|---|---|---|
| Organic Mesh (5 manchas, blur 60px, bucles 20–40s) | fondo global | palo-seco |
| Texto que se carga al hacer scroll (`view()`), estado inicial `primary-400` (AA texto grande) | Banderín | make-b |
| Halo vivo en palabras clave | Banderín | flexion /news |
| Celular 3D con tilt ±7°/±9° | Hero, Funcionalidades, CTA final | anubi |
| Rotador de labels sin salto de altura | Hero | make-b |
| Marquee rápido en reposo, lento al interactuar | Tiendas | flexion |
| Secuestro de scroll por pasos (`useScrollSteps`) | Funcionalidades, Problemas | brief |
| Nodos que levitan y siguen al ratón (`usePointerVars`) | Sistemas, Growists, hero Nosotros | anubi |
| Scale-up al entrar | Por qué queremos ayudarte | make-b |
| Scale-down 1.8 → 1 | Misión y Visión | noth.in |
| Carrusel con torsión (centro 1.25×, laterales ±32°) | CTA final, Filosofía | anubi |
| Conteo veloz de cifra | Hero Filosofía | brief |
| Clockwise Glow en botones | `Button` | brief |
| Cursor CTA magnético | zonas `data-cursor` | make-b |
| Líquido WebGL | footer | make-b |

- **`prefers-reduced-motion`:** desactiva todos los patrones anteriores. El contenido queda completo y estático; los carruseles pasan a ser deslizables a mano.

## Componentes compartidos

- **`Button`:**
  - variantes `primary`, `secondary`, `outline`, `inverse`, `ghost`; tamaños `sm/md/lg`;
  - las acciones `modal` son `<a href="/contacto" data-open-modal>`, que funcionan sin JS.
- **`Title` / `Accent` / `Subline`:** titular con lead + énfasis + cola; subline con punto coral.
- **`Breadcrumbs`:** migas "Inicio / Página" con BreadcrumbList JSON-LD. No se usan en `/contacto`.
- **`Phone`:** carcasa 3D CSS con fundido entre capturas.
- **`WhatsAppCards`:** las 4 tarjetas con mensaje precargado, navegables con flechas.
- **Layout:** `Navbar` (píldora fija que se oculta al bajar), `Footer` blanco con enlace gigante, `CtaFinal`, `PlingModal` (`<dialog>` nativo).
- **FAQ:** `<details name>` nativos (uno abierto por categoría) con apertura animada vía `::details-content`.

## Reglas que no se rompen

1. Logo siempre como imagen oficial, nunca texto HTML.
2. Nada flotante sobre la zona central de lectura ni sobre los CTA.
3. Contraste WCAG AA. La única excepción es el chip LIVE, que es decorativo (`aria-hidden`) y sigue el brief.
4. Todo contenido vive en `src/content/site.ts`, con las marcas `PENDIENTE`, `borrador`, `ejemplo`.
5. Imágenes siempre con `next/image`, `alt` en español y crédito visible si son de Pexels.
