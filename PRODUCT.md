# Product

<!-- impeccable:product-schema 1 -->

Fuente primaria: `docs/` (00–04 + `bible_brand_system_pling_v2.md`). Este archivo resume la verdad de producto y las decisiones confirmadas por el cliente el 2026-10-15; si algo aquí y `docs/` difieren, manda la respuesta más reciente del cliente.

## Platform

web

## Stack

Next.js (App Router) + React + Tailwind CSS, repositorio en GitHub, despliegue en Vercel. Fijado por el brief (`01-BRIEF §7`).

## Users

Vendedoras, emprendedores y equipos comerciales que venden por TikTok Live (y cierran por WhatsApp) en Bolivia y Latinoamérica. Hoy anotan pedidos en cuadernos de madrugada, revisan cientos de capturas de WhatsApp, sufren comprobantes QR falsos y confunden paquetes en bodega. Ya venden bien frente a la cámara; lo que les desborda es todo lo demás.

## Product Purpose

Pling! es el sistema de gestión operativa para Live Commerce: conecta TikTok Live, WhatsApp e inventario en un solo flujo. Etiquetado físico con código único por prenda (Ticketera Pling, `#A1B2`), cobro con validación bancaria del QR en tiempo real y orden del despacho. El sitio informativo existe para demostrar rentabilidad (tiempo, dinero, esfuerzo), generar confianza y llevar al visitante a una conversación de WhatsApp.

Éxito = clic en una de las 4 tarjetas de WhatsApp con mensaje precargado (en el Modal Adquirir/Probar Pling o en `/contacto`).

## Positioning

El único sistema que une el mundo físico (código impreso en cada prenda) con el cobro verificado por banco y el despacho, pensado para la operativa real del live boliviano. Modelo alineado: crédito prepago por prenda vendida; si la tienda no vende, no paga, y Pling nunca custodia el dinero.

## Operating Context

El live, las capturas, el QR, las bolsas, la ticketera y los envíos. Flujo de 8 pasos: código `#A1B2` → captura en WhatsApp → reserva de 5 minutos → cobro por QR directo a la cuenta de la vendedora → empaque → rastreo del envío. Demo externa en `blink.demo.growists.com` (no se maqueta en este sitio).

## Capabilities and Constraints

- Páginas: `/`, `/cuanto-te-ahorra`, `/nosotros`, `/filosofia`, `/faq`, `/contacto` (sin navbar, footer ni breadcrumbs), `/politicas-de-privacidad`, más el Modal Adquirir/Probar Pling transversal.
- No hay página "Adquirir Pling", ni formularios de contacto con campos, ni pantalla de demo propia.
- Calculadora de ahorro con tarifas Pionera / Estándar: **las cifras reales de tarifas por tramo aún no están definidas** (en `04`: "Desde Bs X por prenda"). Hasta entonces, `/cuanto-te-ahorra` y la Home usan 4 tramos y tiempos por tarea **de ejemplo** (`ejemplo: true` en `site.ts`), con aviso visible.
- Todo el contenido vive en un único archivo (`src/content/site.ts`).

## Brand Commitments

- Nombre: Pling! · Tagline: "Vende en vivo. Cobra seguro. Entrega en orden."
- Tono: moderno, ágil y acogedor; copy binario con resultados tangibles; interfaz 100% en español.
- Logo oficial siempre como gráfico (campana coral + "Pling" azul + "!" coral, o versión blanca sobre Azul Pling), nunca texto HTML.
- Material Design 3, **solo Light Mode** (sin dark mode ni toggle). Fondo vivo "Pling Organic Mesh".
- Footer con fondo **blanco** (decisión del cliente 2026-10-15; sustituye el "footer oscuro" del brief).
- Tipografías (decisiones del cliente 2026-10-16/17, sustituyen al brief): titulares en Fredoka **Medium 500** (nunca bold; SemiBold 600 solo en botones y controles), Manrope 400/500 (+ Bold 700 solo para frases destacadas en párrafos), énfasis en **Cookie** (caligráfica; sustituye a Exo 2 y a Cormorant) **sin subrayado**, monospace solo para códigos físicos.
- **Regla de titulares (siempre):** el titular en tinta oscura; el primer énfasis en Azul Pling y, si hay un segundo, en Rojo Pling. Ningún titular en blanco ni en color.
- Escala neutral 50–900 con leve tinte azul, sin negro absoluto (900 = #1D2033); el blanco puro sí se usa.
- Ornamentación levitante: más piezas de UI que emojis, pero siempre con algún emoji (regla de profundidad de campo). En táctil, todo lo que flota deriva solo.
- SEO: los sublines son los encabezados reales (h1/h2) y se redactan como búsquedas directas ("¿Qué es Pling?", "Tiendas de TikTok que trabajan con Pling").
- Navbar siempre visible, con tres contenedores propios (logo · enlaces · Probar Pling). Sin créditos de Pexels visibles.
- Sin fondos de partículas; iconos en SVG; emojis permitidos solo con la regla de profundidad de campo y la zona central despejada.
- Respaldo institucional: creado por Growists (https://growists.com).

## Evidence on Hand

- Logo PNG 300×98 + ICO (`public/logo/`).
- 47 capturas reales de la app (`public/screens app/`).
- Datos de contacto, redes y mensajes de WhatsApp en `docs/04-CONTENIDO.md`.
- Pruebas sociales: Lemak Boutique y EcoArmario son tiendas reales; las otras 8 serán logos ficticios temporales (marcar como tales).
- Atención al cliente y WhatsApp: **+591 75741010** (decisión del cliente 2026-10-16).
- Dato de Filosofía: 8,8 M de cuentas de TikTok en Bolivia (Coolosa Comunicaciones, junio 2024, vía La Razón), con fuente visible.
- Fotografías editoriales de Pexels con crédito visible.
- **Provisional:** FAQ con preguntas y respuestas ficticias (`ejemplo: true`, pedido del cliente; sin datos estructurados hasta que sean reales) y política de privacidad en borrador pendiente de revisión legal.
- **No existen todavía:** testimonios, métricas propias publicadas, tabla de tarifas, logos de Growists / Lemak / EcoArmario. No se inventan.

## Product Principles

1. Cada sección acerca a la conversación de WhatsApp o construye la confianza que la precede; si no, sobra.
2. Alivio antes que impresión: orden y claridad (anti-caos) por encima del efecto.
3. Demostrar con la operativa real (QR, código, envío), no con adjetivos.
4. Alineación económica visible: Pling gana solo cuando la tienda vende.

## Accessibility & Inclusion

WCAG AA, 100% operable con teclado (modal, sliders, toggles, tabs, acordeones), `prefers-reduced-motion` obligatorio, HTML semántico que funciona sin JS de adorno.
