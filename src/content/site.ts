/**
 * Pling! — ÚNICA FUENTE DE VERDAD del contenido del sitio.
 *
 * Todo texto, dato, enlace y ruta de imagen se lee de aquí. Origen:
 * docs/04-CONTENIDO.md (+ decisiones del cliente del 2026-10-15).
 *
 * Marcas de estado:
 * - `PENDIENTE`: el dato no existe todavía y no se inventa.
 * - `borrador: true`: texto redactado a partir de frases del brief para poder
 *   maquetar; el cliente debe revisarlo.
 * - `ejemplo: true`: cifra de demostración, NO es una tarifa o dato real.
 */

export const PENDIENTE = "PENDIENTE" as const;
type Pendiente = typeof PENDIENTE;

/** `pos`: encuadre de la captura dentro del celular (object-position); por defecto, arriba. */
export type Img = { src: string; alt: string; width: number; height: number; credit?: { by: string; url: string }; pos?: string };

/* ─────────────────────────── 1. Identidad ─────────────────────────── */

export const brand = {
  name: "Pling!",
  tagline: "Vende en vivo. Cobra seguro. Entrega en orden.",
  logo: {
    /** Versión principal bicolor (campana y "!" coral + "Pling" azul). */
    color: { src: "/logo/LOGO.png", width: 300, height: 98, alt: "Pling!" },
    /** Versión blanca: falta el archivo; mientras tanto se deriva del PNG con un filtro CSS. */
    white: PENDIENTE as Pendiente,
  },
  favicon: "/logo/LOGO.ico",
} as const;

export const contact = {
  phoneDisplay: "+591 75741010",
  /** Atención al cliente (decisión del cliente 2026-10-16). Número en formato wa.me (solo dígitos, con código de país). */
  whatsappNumber: "59175741010",
  email: "hola@pling.com.bo",
  mapsUrl: "https://maps.app.goo.gl/mMwkrydF1nojERnk9",
  /** Coordenadas resueltas desde el enlace corto (ficha "Growists", Santa Cruz). */
  mapsEmbed: "https://maps.google.com/maps?q=-17.7823883,-63.1815912&z=17&output=embed",
  city: "Santa Cruz de la Sierra, Bolivia",
} as const;

export const parent = {
  name: "Growists",
  url: "https://growists.com",
  credit: "Pling ha sido creado por Growists",
  logo: PENDIENTE as Pendiente,
} as const;

export const socials = [
  { id: "tiktok", label: "TikTok", handle: "@pling.bolivia", href: "https://www.tiktok.com/@pling.bolivia" },
  { id: "instagram", label: "Instagram", handle: "@pling.bo", href: "https://www.instagram.com/pling.bo/" },
  { id: "facebook", label: "Facebook", handle: "Pling", href: "https://www.facebook.com/profile.php?id=61582195003831" },
] as const;

export const demoUrl = "https://blink.demo.growists.com";

/** Dominio público del sitio (SEO, sitemap, Open Graph). Cambiar al dominio final cuando exista. */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pling-web.vercel.app";

/* ─────────────────────── 2. Rutas y navegación ────────────────────── */

export const routes = {
  home: "/",
  ahorro: "/cuanto-te-ahorra",
  nosotros: "/nosotros",
  filosofia: "/filosofia",
  queHace: "/que-hace-pling",
  faq: "/faq",
  contacto: "/contacto",
  privacidad: "/politicas-de-privacidad",
} as const;

export type Action =
  | { label: string; kind: "modal" }
  | { label: string; kind: "link"; href: string; external?: boolean };

/** Todas las acciones de compra/prueba abren el Modal (sin JS caen a /contacto). */
export const ctas = {
  probar: { label: "Probar Pling", kind: "modal" },
  verDemo: { label: "Ver demo", kind: "link", href: demoUrl, external: true },
  quiero: { label: "Quiero Pling", kind: "modal" },
  probarDemo: { label: "Probar demo", kind: "link", href: demoUrl, external: true },
  adquirir: { label: "Adquirir Pling", kind: "modal" },
} as const satisfies Record<string, Action>;

export const navbar = {
  links: [
    { label: "Ver demo", href: demoUrl, external: true },
    { label: "Cuánto te ahorra", href: routes.ahorro },
    { label: "Nosotros", href: routes.nosotros },
    { label: "FAQ", href: routes.faq },
    { label: "Filosofía", href: routes.filosofia },
  ],
  cta: ctas.probar,
} as const;

/* ──────────────── 3. Datos que se repiten (una sola fuente) ───────── */

/** 3.1 — Las 4 tarjetas de WhatsApp (Modal y /contacto). */
export const whatsappCards = [
  {
    id: "quiero-usar",
    title: "Quiero usar Pling",
    hint: "Empezar en mi tienda",
    message: "¡Hola equipo de Pling! 👋 Vendo por TikTok Live y quiero empezar a usar Pling en mi tienda.",
  },
  {
    id: "como-pruebo",
    title: "¿Cómo pruebo Pling?",
    hint: "Probarlo en mis lives",
    message: "¡Hola! 👋 Me gustaría saber cómo puedo probar Pling para mis transmisiones de TikTok Live.",
  },
  {
    id: "cuanto-cuesta",
    title: "¿Cuánto cuesta Pling?",
    hint: "Precios y cobro por prenda",
    message: "¡Hola! 👋 Quiero información sobre los precios de Pling y cómo funciona el cobro por prenda vendida.",
  },
  {
    id: "es-dificil",
    title: "¿Pling es difícil de usar?",
    hint: "Cómo es el día a día",
    message: "¡Hola! 👋 Tengo dudas sobre cómo funciona Pling en el día a día y qué tan fácil es usarlo con mi equipo.",
  },
] as const;

export function whatsappHref(message: string) {
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/** 3.2 — Micro-componentes levitantes. */
export const badges = {
  codigo: { label: "CÓDIGO", code: "#A1B2" },
  venta: { label: "¡Pling!", amount: "+Bs 120" },
  live: { label: "LIVE" },
  compradora: { label: "¡Lo quiero!", ticks: "✓✓" },
  validacion: { label: "QR verificado" },
  comentario: { name: "lucia.compras", text: "¡Yo quiero la #A1B2!" },
} as const;

/** 3.3 — Reglas del modelo de negocio (calculadora). */
export const businessModel = {
  goldenRule: "Ganamos cuando la tienda vende. Si la tienda no vende, no paga.",
  /** Notificación dentro de la tarjeta de beneficio. */
  note: { title: "Crédito prepago por prenda vendida", text: "Pling nunca toca el dinero de tus ventas: va directo a tu cuenta." },
  tariffs: {
    default: "pionera" as TariffId,
    options: [
      { id: "pionera", label: "Tienda Pionera" },
      { id: "estandar", label: "Estándar" },
    ] as { id: TariffId; label: string }[],
    /** Ejemplo de 04: "Bs 180 al mes · 72 prendas por semana · Desde Bs X por prenda". */
    example: { monthlyBs: 180, garmentsPerWeek: 72, fromBsPerGarment: PENDIENTE as Pendiente },
    /**
     * Tramos por prendas vendidas al mes (EJEMPLO, `ejemplo: true`): precio por
     * prenda en Bs según tarifa. Se sustituye por la tabla real de Pling.
     */
    ejemplo: true,
    tiers: [
      { id: "t1", label: "Hasta 300 prendas", max: 300, price: { pionera: 0.6, estandar: 0.85 } },
      { id: "t2", label: "301 a 1.000 prendas", max: 1000, price: { pionera: 0.5, estandar: 0.75 } },
      { id: "t3", label: "1.001 a 3.000 prendas", max: 3000, price: { pionera: 0.4, estandar: 0.65 } },
      { id: "t4", label: "Más de 3.000 prendas", max: Infinity, price: { pionera: 0.3, estandar: 0.55 } },
    ] as { id: string; label: string; max: number; price: Record<TariffId, number> }[],
    /** Qué diferencia a cada tarifa (borrador). */
    notes: {
      pionera: "Para las primeras tiendas que confían en Pling: precio preferente mientras sigas activa.",
      estandar: "La tarifa general para cualquier tienda que vende en vivo.",
    } as Record<TariffId, string>,
  },
};

export type TariffId = "pionera" | "estandar";

/**
 * Supuestos de la calculadora. TODOS son cifras de ejemplo (`ejemplo: true`)
 * hasta que Pling confirme tarifas y tiempos reales.
 */
export const calculator = {
  ejemplo: true,
  disclaimer: "Cálculo orientativo con tarifas y tiempos de ejemplo, pendientes de confirmar.",
  inputs: {
    lives: { label: "Lives por semana", min: 1, max: 14, step: 1, default: 4, unit: "lives" },
    prendas: { label: "Prendas por live", min: 5, max: 150, step: 5, default: 30, unit: "prendas" },
    equipo: { label: "Personas en el equipo", min: 1, max: 10, step: 1, default: 2, unit: "personas" },
    precio: { label: "Precio promedio de la prenda", min: 20, max: 500, step: 10, default: 120, unit: "Bs" },
  },
  presets: [
    { id: "empezando", label: "Recién empezando", values: { lives: 2, prendas: 15, equipo: 1, precio: 80 } },
    { id: "alto", label: "Alto volumen", values: { lives: 10, prendas: 100, equipo: 5, precio: 150 } },
  ],
  /**
   * Tareas manuales que Pling elimina (EJEMPLO): minutos por prenda vendida.
   * Alimentan el acordeón y el desglose de /cuanto-te-ahorra; su suma es el
   * tiempo ahorrado por prenda (6 min).
   */
  tasks: [
    { id: "anotar", label: "Anotar pedidos a mano", detail: "Copiar del live al cuaderno quién pidió qué prenda, talla y precio.", minutesPerGarment: 1.5 },
    { id: "comprobantes", label: "Revisar comprobantes de pago", detail: "Abrir cada captura de WhatsApp y comparar el QR con el banco.", minutesPerGarment: 2 },
    { id: "etiquetar", label: "Etiquetar y separar prendas", detail: "Escribir a mano a quién va cada prenda y apartarla.", minutesPerGarment: 1 },
    { id: "buscar", label: "Buscar prendas y cuadrar stock", detail: "Encontrar la prenda vendida y descontar el stock en el cuaderno o el Excel.", minutesPerGarment: 0.5 },
    { id: "envios", label: "Armar paquetes y direcciones", detail: "Juntar las prendas de cada compradora y copiar su dirección de envío.", minutesPerGarment: 1 },
  ],
  /** Coordinación del equipo por persona y por live: capturas, cuadernos, cuadrar caja (EJEMPLO). */
  coordination: { id: "coordinar", label: "Coordinar al equipo y cuadrar caja", detail: "Pasar capturas entre el equipo y cuadrar lo cobrado al cerrar el live.", hoursPerPersonPerLive: 0.5 },
  /** Valor de una hora de trabajo del equipo, en Bs (EJEMPLO). */
  hourValueBs: 15,
  /** Porcentaje de las ventas que hoy se pierde por comprobantes falsos y paquetes confundidos (EJEMPLO). */
  lossRate: 0.02,
  weeksPerMonth: 4.33,
  results: {
    beneficio: "Beneficio neto estimado / mes",
    horas: "Horas recuperadas / mes",
    costo: "Costo de Pling / mes",
    ventas: "Ventas del mes",
  },
};

/* ─────────────────────── 4. Imágenes y capturas ───────────────────── */

export const screens = {
  productoComprado: { src: "/screens/producto-comprado.png", alt: "Pantalla de Pling: producto comprado durante el live, código #A1B2, Bs 150", width: 824, height: 1834 },
  productoGuardado: { src: "/screens/producto-guardado.png", alt: "Pantalla de Pling: producto guardado con su código físico #A1B2 listo para imprimir", width: 824, height: 1886 },
  detalleOrden: { src: "/screens/detalle-orden.png", alt: "Pantalla de Pling: detalle de la orden con prendas, compradora y dirección de envío", width: 824, height: 2670 },
  cargarProducto: { src: "/screens/cargar-producto-foto.png", alt: "Pantalla de Pling: cargar un producto al catálogo con su foto, precio, talla y color", width: 824, height: 1866 },
  emisionCatalogo: { src: "/screens/emision-catalogo.png", alt: "Pantalla de Pling: catálogo en emisión durante el live con el producto al aire", width: 824, height: 1834 },
  enviosHoy: { src: "/screens/envios-hoy.png", alt: "Pantalla de Pling: envíos de hoy ordenados por estado", width: 824, height: 2688 },
  leerCodigos: { src: "/screens/leer-codigos.png", alt: "Pantalla de Pling: escaneo del código #A1B2 impreso en la etiqueta de una prenda", width: 824, height: 1834 },
  liveEjecucion: { src: "/screens/live-ejecucion.png", alt: "Pantalla de Pling: live en ejecución, cambiar el producto a emitir", width: 824, height: 2354 },
  ticketera: { src: "/screens/ticketera.png", alt: "Pantalla de Pling: conectar la Ticketera Pling para imprimir etiquetas", width: 824, height: 1834 },
  catalogos: { src: "/screens/catalogos.png", alt: "Pantalla de Pling: catálogos próximos listos para el live", width: 824, height: 1834 },
  catalogoResumen: { src: "/screens/catalogo-resumen.png", alt: "Pantalla de Pling: resumen del catálogo con fecha, hora, prendas, total y enlace de la tienda", width: 824, height: 2036 },
  liveSeleccion: { src: "/screens/live-seleccion.png", alt: "Pantalla de Pling: elegir la prenda del catálogo que sale al aire", width: 824, height: 2276 },
  catalogoFinalizado: { src: "/screens/catalogo-finalizado.png", alt: "Pantalla de Pling: catálogo finalizado, todos los productos vendidos", width: 824, height: 1834 },
  prendaVendida: { src: "/screens/prenda-vendida.png", alt: "Pantalla de Pling: prenda vendida con su código, su catálogo y la compradora que la compró", width: 824, height: 2404, pos: "bottom" },
  cotizarEnvio: { src: "/screens/cotizar-envio.png", alt: "Pantalla de Pling: cotizar el costo del envío de una orden", width: 824, height: 2934, pos: "bottom" },
  envioAprobado: { src: "/screens/envio-aprobado.png", alt: "Pantalla de Pling: envío aprobado, confirmar el envío con su enlace de seguimiento", width: 824, height: 2934, pos: "bottom" },
  reclamos: { src: "/screens/reclamos.png", alt: "Pantalla de Pling: reclamos con cancelaciones y devoluciones por día", width: 824, height: 1784 },
  notificaciones: { src: "/screens/notificaciones.png", alt: "Pantalla de Pling: notificaciones de envíos, cancelaciones y devoluciones", width: 824, height: 2240 },
} satisfies Record<string, Img>;

export const photos = {
  vendedora: {
    src: "/images/pexels/vendedora-live.jpg",
    alt: "Vendedora sonriente mostrando una blusa frente al celular y el aro de luz",
    width: 2133,
    height: 3200,
    credit: { by: "Liza Summer · Pexels", url: "https://www.pexels.com/photo/smiling-ethnic-woman-filming-video-on-cellphone-on-ring-lamp-6347595/" },
  },
  compradora: {
    src: "/images/pexels/compradora-cajas.jpg",
    alt: "Compradora sonriente recibiendo sus paquetes en casa",
    width: 2133,
    height: 3200,
    credit: { by: "Liza Summer · Pexels", url: "https://www.pexels.com/photo/smiling-ethnic-woman-carrying-cardboard-parcels-6347555/" },
  },
  vendedoraSelfie: {
    src: "/images/pexels/vendedora-selfie.jpg",
    alt: "Vendedora transmitiendo en vivo con su celular mientras muestra una prenda",
    width: 2133,
    height: 3200,
    credit: { by: "Kampus Production · Pexels", url: "https://www.pexels.com/photo/a-woman-engaged-in-online-selling-7514845/" },
  },
  empaqueCaja: pexels("empaque-caja", "Manos cerrando con cinta una caja de envío entre prendas dobladas", 2400, "Liza Summer", "https://www.pexels.com/photo/woman-preparing-carton-box-with-adhesive-tape-6347516/"),
  compradoraPaquete: pexels("compradora-paquete", "Compradora entrando a su casa con las cajas de su pedido", 2400, "Liza Summer", "https://www.pexels.com/photo/ethnic-woman-with-carton-boxes-opening-door-6347553/"),
  compradoraCelular: pexels("compradora-celular", "Compradora sonriente mirando su celular dentro de una tienda", 2844, "Mico Medel", "https://www.pexels.com/photo/smiling-woman-relaxing-indoors-holding-smartphone-36207633/"),
  doblandoPrendas: pexels("doblando-prendas", "Vendedora doblando camisas para sus ventas en línea", 2400, "RDNE Stock project", "https://www.pexels.com/photo/a-woman-neatly-folding-shirts-7310079/"),
  emprendedoraCajas: pexels("emprendedora-cajas", "Emprendedora sonriente con una caja de su tienda en línea", 2400, "Kampus Production", "https://www.pexels.com/photo/woman-smiling-while-holding-the-package-7289733/"),
  equipoBodega: pexels("equipo-bodega", "Dos personas del equipo revisando un pedido sobre una caja en la bodega", 2400, "Tima Miroshnichenko", "https://www.pexels.com/photo/two-employees-looking-at-a-document-on-top-of-a-box-6170098/"),
  duenaTienda: pexels("duena-tienda", "Dueña orgullosa de pie en su pequeña tienda de barrio", 2400, "Heber Vazquez", "https://www.pexels.com/photo/smiling-woman-in-apron-16837409/"),
  fotografiandoPaquetes: pexels("fotografiando-paquetes", "Vendedora revisando pedidos en su celular rodeada de paquetes", 2400, "Kampus Production", "https://www.pexels.com/photo/woman-in-gray-button-up-long-sleeve-shirt-holding-smartphone-7289734/"),
  emprendedoraSonrie: pexels("emprendedora-sonrie", "Emprendedora sonriente apoyada sobre las cajas de su tienda", 2400, "Kampus Production", "https://www.pexels.com/photo/woman-in-gray-jacket-smiling-7289739/"),
  bodegaOrdenada: pexels("bodega-ordenada", "Encargado anotando envíos frente a estantes con cajas ordenadas", 2400, "Tima Miroshnichenko", "https://www.pexels.com/photo/business-man-writing-on-a-paper-6169158/"),
  empacadoraBodega: pexels("empacadora-bodega", "Trabajadora sellando un paquete en una bodega de despacho", 2844, "GB The Green Brand", "https://www.pexels.com/photo/efficient-warehouse-order-preparation-in-spain-38905049/"),
  cuadernoPedidos: pexels("cuaderno-pedidos", "Mano anotando pedidos a bolígrafo en un cuaderno", 2844, "Artem Podrez", "https://www.pexels.com/photo/person-writing-on-a-notebook-with-a-pen-8518990/"),
  deliveryFurgon: pexels("delivery-furgon", "Dos repartidores descargando cajas de una furgoneta", 2844, "Artem Podrez", "https://www.pexels.com/photo/man-and-woman-fixing-brown-boxes-5025496/"),
  empaqueCasa: pexels("empaque-casa", "Vendedora preparando un paquete en el suelo de su casa entre prendas", 2400, "Liza Summer", "https://www.pexels.com/photo/woman-preparing-box-with-parcel-among-clothes-6347518/"),
} satisfies Record<string, Img>;

/** Foto de Pexels descargada a 1600px de ancho en /images/pexels. */
function pexels(file: string, alt: string, height: number, by: string, url: string): Img & { credit: { by: string; url: string } } {
  return { src: `/images/pexels/${file}.jpg`, alt, width: 1600, height, credit: { by: `${by} · Pexels`, url } };
}

/* ─────────────────── 5. Componentes transversales ─────────────────── */

export const modal = {
  title: "Contacto directo por WhatsApp",
  cards: whatsappCards,
} as const;

export const ctaFinal = {
  subline: "Cómo funciona Pling paso a paso",
  /** Título: el tagline de marca; segundo énfasis en rojo (regla de titulares). */
  title: { lead: "Vende en vivo.", accent: "Cobra seguro.", accent2: "Entrega en orden." },
  text: "Así se ve un día con Pling, de la primera prenda cargada al último paquete entregado.",
  primary: ctas.quiero,
  secondary: ctas.probarDemo,
  /** Carrusel de 5 pantallas en orden de flujo; la central es más grande y lleva descripción. */
  screens: [
    { id: "agregar-productos", label: "Agregar productos", description: "Cargas la prenda con su foto, talla y precio, y la Ticketera Pling imprime su código.", borrador: true, img: screens.cargarProducto },
    { id: "empezar-live", label: "Empezar live", description: "Abres el catálogo en vivo y pones al aire la prenda que estás mostrando.", borrador: true, img: screens.emisionCatalogo },
    {
      id: "compra-cliente",
      label: "Compra de un cliente",
      description: "La compradora paga por QR, el banco lo valida y suena el ¡Pling!",
      borrador: true,
      /** La vista web de la compradora no existe aún: se usa la confirmación de venta de la app. */
      img: screens.productoComprado,
      pendiente: "Falta la captura de la vista web de la compradora",
    },
    { id: "escanear-codigo", label: "Escanear código", description: "Escaneas el #A1B2 de la etiqueta y sabes de quién es cada prenda.", borrador: true, img: screens.leerCodigos },
    { id: "delivery", label: "Proceso de delivery", description: "Los envíos del día salen ordenados: una compradora, un paquete.", borrador: true, img: screens.enviosHoy },
  ],
} as const;

export const footer = {
  links: [
    { label: "Quiero Pling", kind: "modal" as const },
    { label: "Ver Demo", href: demoUrl, external: true },
    { label: "Qué hace Pling", href: routes.queHace },
    { label: "Nosotros", href: routes.nosotros },
    { label: "Preguntas frecuentes", href: routes.faq },
    { label: "Filosofía de emprendedor a empresario", href: routes.filosofia },
    { label: "Políticas de privacidad", href: routes.privacidad },
  ],
  description: "Pling ordena todo lo que pasa detrás de tu live: cada prenda con su código, cada cobro QR validado con el banco y cada paquete con su compradora.",
  contactTitle: "Contacto",
  bigLink: { label: "Adquirir Pling", hoverLabel: "Hablemos por WhatsApp" },
  copyright: "© 2026 Pling. Todos los derechos reservados.",
  credit: { prefix: "Pling ha sido creado por", label: "Growists", href: parent.url },
} as const;

/* ──────────────────────── 6. Contenido por página ─────────────────── */

export const stores = [
  { name: "Lemak Boutique", real: true, source: "https://www.tiktok.com/@lemakboutique", logo: PENDIENTE as Pendiente },
  { name: "EcoArmario", real: true, logo: PENDIENTE as Pendiente },
  /* Ficticias temporales (04 §6.3) hasta tener autorización de tiendas reales. */
  { name: "Boutique Aurora", real: false },
  { name: "Percha Viva", real: false },
  { name: "Closet Norte", real: false },
  { name: "Moda Lila", real: false },
  { name: "Ropero 21", real: false },
  { name: "Vitrina Sol", real: false },
  { name: "Armario Lunar", real: false },
  { name: "Tienda Coral", real: false },
] as const;

export const home = {
  meta: {
    title: "Pling! — App de gestión de TikTok Live",
    description:
      "Pling es el sistema de gestión operativa para ventas por TikTok Live: valida pagos QR al instante, identifica cada prenda con un código único y ordena tus envíos.",
  },
  hero: {
    subline: "App para vender por TikTok Live",
    title: { lead: "Vender por TikTok Live", accent: "ya lo haces bien.", tail: "Pling se encarga de todo lo demás:" },
    /** Cada frase se sincroniza con una de las 3 vistas (`view`). */
    rotator: [
      { text: "verificar QR automáticamente", view: "qr" },
      { text: "un pago por cliente", view: "qr" },
      { text: "producto con etiqueta siempre trackeado", view: "codigo" },
      { text: "enviar el producto al cliente", view: "sync" },
    ],
    views: {
      qr: { label: "Validación QR", img: screens.productoComprado },
      codigo: { label: "Un producto: un código", img: screens.productoGuardado },
      sync: { label: "Producto / compra / cliente sincronizados", img: screens.detalleOrden },
    },
    primary: ctas.probar,
    secondary: ctas.verDemo,
  },
  banderin: {
    subline: "¿Qué es Pling?",
    /** Texto plano equivalente (lectores de pantalla y SEO). */
    text: "Pling une tu TikTok Live, tu WhatsApp y tu inventario en un solo sistema: cada prenda con su código, cada pago QR validado al instante y cada envío en orden. Tú vendes. Pling hace el resto.",
    /** Composición dinámica: piezas unidas por ➕ y cierres línea a línea. */
    sources: [
      { id: "tiktok", label: "Tu TikTok Live" },
      { id: "whatsapp", label: "tu WhatsApp" },
      { id: "inventario", label: "tu inventario" },
    ],
    join: { lead: "en un solo", accent: "sistema:" },
    results: ["cada prenda con su código", "cada pago QR validado al instante", "cada envío en orden"],
    /** "Pling" del cierre va con el logotipo oficial, no escrito. */
    close: [{ lead: "Tú vendes." }, { logo: true, lead: "hace", accent2: "el resto." }],
  },
  ahorro: {
    subline: "¿Cuánto ahorra Pling?",
    title: { lead: "Calcula lo que", accent: "recuperas", tail: "cada mes" },
    borrador: true,
    link: { label: "Ver cuánto te ahorra", kind: "link", href: routes.ahorro } as Action,
  },
  tiendas: {
    subline: "Tiendas TikTok Live que usan Pling",
  },
  funcionalidades: {
    subline: "Cómo gestionar ventas por TikTok Live",
    title: { lead: "Pling te acompaña", accent: "antes, durante y después", tail: "del live", red: true },
    link: { label: "Ver todo lo que hace Pling", kind: "link", href: routes.queHace } as Action,
    borrador: true,
    tabs: [
      {
        id: "antes",
        label: "Antes del live",
        title: "Cada prenda, un código.",
        text: "Cargas tus productos una vez y la Ticketera Pling imprime un sticker con su código único. Tu catálogo queda listo para salir al aire.",
        points: ["Catálogo listo en minutos", "Sticker #A1B2 impreso al instante", "Stock, tallas y precios al día"],
        img: screens.cargarProducto,
        borrador: true,
      },
      {
        id: "durante",
        label: "En el live",
        title: "Vende en vivo. Cobra seguro.",
        text: "Muestras la prenda, dices su código y la compradora la reserva. Durante 5 minutos es suya mientras paga por QR, y el banco confirma el pago en tiempo real.",
        points: ["Reserva de 5 minutos por prenda", "QR validado con el banco, sin comprobantes falsos", "El dinero va directo a tu cuenta"],
        img: screens.emisionCatalogo,
        borrador: true,
      },
      {
        id: "despues",
        label: "Después del live",
        title: "Una compradora, un paquete.",
        text: "Pling agrupa las prendas de cada compradora, ordena los envíos del día y te deja seguir cada paquete hasta que llega.",
        points: ["Pedidos agrupados por compradora", "Envíos de hoy y de mañana en orden", "0 ventas en el cuaderno"],
        img: screens.enviosHoy,
        borrador: true,
      },
    ],
  },
  sistemas: {
    subline: "Cómo vender más fácil por TikTok Live",
    title: { lead: "Tres sistemas,", accent: "un solo flujo" },
    borrador: true,
    nodes: [
      { id: "tiktok", label: "TikTok Live", detail: "Donde muestras y vendes", chaos: "Pedidos perdidos en los comentarios" },
      { id: "whatsapp", label: "WhatsApp", detail: "Donde la compradora confirma y paga", chaos: "Cientos de capturas por revisar" },
      { id: "inventario", label: "Inventario", detail: "Cada prenda con su código #A1B2", chaos: "El cuaderno a las 3:00 AM" },
    ],
    sinPling: {
      label: "Sin Pling",
      text: "El live en TikTok, los pedidos en capturas de WhatsApp y el inventario en un cuaderno. Tres sistemas que no se hablan.",
    },
    conPling: {
      label: "Con Pling",
      text: "Pling conecta TikTok Live, WhatsApp e inventario: cada venta, pago y envío se sincroniza en tiempo real.",
    },
  },
  porQue: {
    subline: "¿Por qué usar Pling?",
    title: { lead: "Por qué queremos", accent: "ayudarte" },
    cta: { label: "Nuestra filosofía", kind: "link", href: routes.filosofia } as Action,
    columns: [
      {
        id: "vendedores",
        title: "Para quien vende",
        text: "Queremos que más emprendedoras en Bolivia **pasen a ser empresarias**: con procesos, datos y control, el negocio crece sin depender de madrugadas.",
        img: photos.vendedora,
        borrador: true,
      },
      {
        id: "compradores",
        title: "Para quien compra",
        text: "Cada compra con código, pago verificado y envío en orden. Así crece una base de compradoras que **confían y vuelven a comprar** en vivo.",
        img: photos.compradora,
        borrador: true,
      },
    ],
  },
} as const;

export const ahorroPage = {
  meta: {
    title: "Cuánto te ahorra Pling",
    description: "Calcula cuántas horas y cuánto dinero recupera tu tienda de TikTok Live con Pling, y consulta las tarifas por prenda vendida.",
  },
  breadcrumbs: [
    { label: "Inicio", href: routes.home },
    { label: "Cuánto te ahorra", href: routes.ahorro },
  ],
  borrador: true,
  subline: "Cuánto cuesta Pling y cuánto te ahorra",
  title: { lead: "Cuánto te", accent: "ahorra", tail: "Pling" },
  intro: "Mueve los valores de tu tienda y mira en tiempo real las horas y el dinero que recuperas cada mes.",
  controlsTitle: "Tu tienda",
  accordion: { title: "¿Qué tareas manuales te ahorra Pling?" },
  heroCard: { beneficio: "Beneficio Neto Mensual", horas: "Horas Recuperadas" },
  desglose: {
    title: "Desglose de ahorros",
    tareasTitle: "Horas que dejas de dedicar a",
    tiempo: "Tiempo recuperado",
    perdidas: "Pérdidas evitadas (comprobantes falsos y paquetes confundidos)",
    costo: "Costo de Pling",
    total: "Beneficio neto",
  },
  tarifas: {
    title: "Tarifas por prenda vendida",
    intro: "Pagas solo por lo que vendes, con crédito prepago. Cuanto más vendes al mes, menos pagas por prenda.",
    colTramo: "Prendas vendidas al mes",
    colPrecio: "Precio por prenda",
    current: "Tu tramo",
  },
} as const;

export const nosotrosPage = {
  meta: {
    title: "Nosotros",
    description: "Pling nace en Bolivia para ordenar todo lo que pasa detrás del live: código por prenda, cobro verificado por banco y envíos en orden. Creado por Growists.",
  },
  breadcrumbs: [
    { label: "Inicio", href: routes.home },
    { label: "Nosotros", href: routes.nosotros },
  ],
  borrador: true,
  hero: {
    subline: "¿Para qué es Pling?",
    title: { lead: "Ordenamos todo lo que pasa", accent: "detrás del live" },
    text: "Pling nace en Bolivia para que vender por TikTok Live **deje de significar madrugadas, cuadernos y capturas**. Unimos el código de cada prenda, el cobro validado por el banco y el despacho en un solo flujo.",
    /** Fotos periféricas que flotan y siguen al ratón (nunca sobre el texto). */
    images: [photos.vendedoraSelfie, photos.empaqueCaja, photos.compradoraPaquete, photos.compradoraCelular],
    primary: ctas.quiero,
  },
  mision: {
    title: "Misión",
    text: "Dar a cada vendedora de TikTok Live un sistema simple para **cobrar seguro, saber dónde está cada prenda y entregar a tiempo**, sin cuadernos ni capturas.",
    img: photos.emprendedoraCajas,
  },
  vision: {
    title: "Visión",
    text: "Que en Bolivia y Latinoamérica **comprar en vivo sea tan confiable como comprar en una tienda**: cada prenda con su código, cada pago verificado y cada paquete en camino.",
    img: photos.equipoBodega,
  },
  porQueNace: {
    subline: "¿Por qué nace Pling?",
    title: { lead: "Dos razones para", accent: "empezar" },
    items: [
      {
        id: "empresarios",
        title: { lead: "Transformar", accent: "emprendedores", tail: "en", accent2: "empresarios", red: true },
        text: "Muchas tiendas venden cientos de prendas por semana y todavía dependen de la memoria y de la madrugada. Con procesos y datos claros, **un emprendimiento puede crecer, sumar equipo y planificar como una empresa**.",
      },
      {
        id: "confianza",
        title: { lead: "Generar", accent: "confianza", tail: "en los", accent2: "compradores", red: true },
        text: "Cuando cada compra tiene su código, su pago verificado y su envío en orden, **la compradora vuelve**. Esa confianza es la que hace crecer la venta en vivo en el país.",
      },
    ],
  },
  growists: {
    subline: "¿Quién está detrás de Pling?",
    title: { lead: "Pling está respaldada por", accent: "Growists" },
    intro: "Pling es un producto de Growists, empresa de tecnología que diseña, desarrolla y financia productos digitales. Esto es lo que le da a Pling:",
    bullets: [
      "**Estabilidad**: una empresa con estructura y visión a largo plazo detrás de cada tienda.",
      "**Conexión con los bancos**: la integración que valida cada pago QR en tiempo real.",
      "**Respaldo tecnológico**: equipo de producto, ingeniería y soporte que acompaña a cada tienda.",
      "**Financiamiento**: inversión para que Pling crezca al ritmo de sus tiendas.",
    ],
    link: { label: "Conocer Growists", href: parent.url },
    logo: { src: "/logo/growists-color.png", width: 1600, height: 349, alt: "Growists" },
    /** Lo que Growists le da a Pling: nodos con micro-información al pasar el ratón o enfocar. */
    nodes: [
      { id: "estabilidad", label: "Estabilidad", detail: "Estructura y visión a largo plazo" },
      { id: "bancos", label: "Conexión con bancos", detail: "Validación de QR en tiempo real" },
      { id: "tecnologia", label: "Respaldo tecnológico", detail: "Producto, ingeniería y soporte" },
      { id: "financiamiento", label: "Financiamiento", detail: "Inversión para crecer" },
    ],
  },
} as const;

export const filosofiaPage = {
  meta: {
    title: "Filosofía: de emprendedor a empresario",
    description: "La venta en vivo ya es la nueva vitrina de Bolivia y Latinoamérica. Así pasa una tienda de emprendimiento a empresa, y así la acompaña Pling.",
  },
  breadcrumbs: [
    { label: "Inicio", href: routes.home },
    { label: "Filosofía", href: routes.filosofia },
  ],
  borrador: true,
  hero: {
    subline: "Cómo vender por TikTok Live en Bolivia",
    title: { lead: "La venta en vivo ya es", accent: "la nueva vitrina" },
    text: "En Bolivia y Latinoamérica, miles de tiendas abren su live cada noche. **La cámara ya funciona; lo que falta es el sistema** que ordena todo lo demás.",
    stat: {
      value: 8.8,
      decimals: 1,
      suffix: " M",
      label: "cuentas de TikTok en Bolivia",
      source: { label: "Coolosa Comunicaciones, junio 2024 (vía La Razón)", url: "https://eju.tv/?p=4451041" },
    },
    images: [photos.empaqueCasa, photos.fotografiandoPaquetes],
  },
  carrusel: {
    subline: "Vender ropa por TikTok Live desde casa",
    title: { lead: "De emprendedora a", accent: "empresaria" },
    text: "Con un celular, desde su casa y con la ropa que ya tiene, una mujer puede abrir un live y empezar a vender esa misma noche. **TikTok Live es la forma más fácil de emprender**: democratiza el emprendimiento.",
    /** El argumento en tres pasos: emprender es fácil, crecer trae problemas, Pling da el salto. */
    steps: [
      { id: "emprender", title: "Emprender ya es fácil", text: "Un celular, la ropa que tienes y un live desde casa." },
      { id: "problemas", title: "Crecer trae problemas", text: "Pedidos en cuadernos, capturas de pago y envíos de madrugada." },
      { id: "empresa", title: "Pling da el salto", text: "Te ayudamos a pasar de **emprendedora a empresaria**." },
    ],
    slides: [
      { label: "Un celular y la ropa que ya tienes", img: photos.vendedoraSelfie },
      { label: "El primer live desde casa", img: photos.doblandoPrendas },
      { label: "Las primeras ventas", img: photos.empaqueCasa },
      { label: "Pedidos todos los días", img: photos.empaqueCaja },
      { label: "Llegan el cuaderno y las capturas", img: photos.cuadernoPedidos },
      { label: "Cada prenda con su código", img: photos.bodegaOrdenada },
      { label: "Un equipo que despacha", img: photos.empacadoraBodega },
      { label: "La empresa", img: photos.equipoBodega },
    ],
  },
  problemas: {
    subline: "Problemas al vender por TikTok Live",
    title: { lead: "Tres momentos de", accent: "caos", red: true },
    alarm: "Así termina hoy un live en Bolivia. **Cada uno de estos momentos cuesta horas, dinero y compradoras**, y es justo lo que Pling vino a resolver.",
    items: [
      {
        id: "inventario",
        step: "01",
        title: "Caos al hacer inventario manual",
        text: "Prendas sin etiqueta, tallas anotadas a mano y un stock que nadie conoce con certeza. **Cuando dos compradoras piden la misma blusa, el cuaderno no avisa.**",
        evidence: ["¿Queda la M negra?", "Stock: ¿12 o 9?", "Cuaderno, pág. 47"],
        emoji: "😵",
        img: photos.cuadernoPedidos,
      },
      {
        id: "live",
        step: "02",
        title: "Caos al vender por el live (QRs, capturas)",
        text: "Cientos de comentarios, capturas de pago por WhatsApp y comprobantes QR que hay que revisar uno por uno, **sin saber cuáles son falsos**.",
        evidence: ["Captura_0347.jpg", "¿Ya pagaste?", "Comprobante dudoso"],
        emoji: "😰",
        img: photos.vendedoraSelfie,
      },
      {
        id: "delivery",
        step: "03",
        title: "Caos al organizar el delivery de madrugada",
        text: "A las 3:00 AM toca cruzar capturas con bolsas, escribir direcciones y **esperar que cada paquete llegue a la compradora correcta**.",
        evidence: ["3:12 AM", "¿De quién es esta bolsa?", "Dirección incompleta"],
        emoji: "😴",
        img: photos.deliveryFurgon,
      },
    ],
  },
  solucion: {
    subline: "Cómo Pling ordena tu venta en vivo",
    title: { lead: "Un sistema para", accent: "cada momento", red: true },
    intro: "A cada momento de caos le corresponde una parte de Pling: **antes, durante y después del live**.",
    items: [
      { id: "inventario", stage: "Antes del live", title: "Inventario", text: "Cada prenda lleva un código impreso por la Ticketera Pling. **Sabes qué tienes, qué se vendió y a quién.**", img: screens.productoGuardado },
      { id: "pago", stage: "En el live", title: "Pago QR", text: "La compradora paga por QR directo a tu cuenta y **el banco valida el pago en tiempo real**. Sin comprobantes falsos.", img: screens.productoComprado },
      { id: "envio", stage: "Después del live", title: "Envío", text: "Pling agrupa los pedidos por compradora y **ordena los envíos del día**, con seguimiento hasta la entrega.", img: screens.enviosHoy },
    ],
  },
} as const;

/**
 * Qué hace Pling: todas las funciones por etapa del live, interpretadas de las
 * capturas reales de la app (`public/screens app`). Texto en borrador.
 */
export const queHacePage = {
  meta: {
    title: "Qué hace Pling: todas sus funciones",
    description:
      "Todo lo que hace Pling antes, durante y después de tu TikTok Live: catálogo con código por prenda, Ticketera, cobro QR validado por el banco, escaneo de prendas y envíos en orden.",
  },
  breadcrumbs: [
    { label: "Inicio", href: routes.home },
    { label: "Qué hace Pling", href: routes.queHace },
  ],
  borrador: true,
  hero: {
    subline: "¿Qué hace Pling?",
    title: { lead: "Todo lo que Pling hace", accent: "antes, durante", tail: "y", accent2: "después del live" },
    text: "Pling es la app que ordena tu venta por TikTok Live de principio a fin. **Estas son todas sus funciones**, en el orden en que las usas.",
    phones: [screens.catalogoResumen, screens.productoComprado, screens.enviosHoy],
    primary: ctas.probar,
    secondary: ctas.verDemo,
  },
  cta: ctas.probar,
  stages: [
    {
      id: "antes",
      label: "Antes del live",
      emoji: "🏷️",
      subline: "Cómo preparar un catálogo para TikTok Live",
      title: { lead: "Antes del live,", accent: "todo listo" },
      intro: "Cargas tus prendas una vez, cada una con su código, y tu catálogo queda listo para salir al aire.",
      features: [
        { id: "catalogo", title: "Crea el catálogo de tu live", text: "Le pones nombre, fecha y hora a tu transmisión. Pling arma el resumen: **cuántas prendas llevas, cuánto suman** y el enlace de tu tienda para compartir.", img: screens.catalogoResumen },
        { id: "cargar", title: "Carga cada prenda con su foto", text: "Tomas la foto o la subes de la galería y completas **precio, talla, color, variante y stock**. Es lo primero que verán tus compradoras.", img: screens.cargarProducto },
        { id: "codigo", title: "Cada prenda recibe su código", text: "Al guardar, Pling le asigna un **código único como #A1B2**. Así nunca confundes dos prendas parecidas.", img: screens.productoGuardado },
        { id: "ticketera", title: "Imprime el sticker con la Ticketera Pling", text: "Conectas la Ticketera Pling a tu celular y cada código sale impreso en un sticker. **Adiós a las etiquetas escritas a mano.**", img: screens.ticketera },
        { id: "organizar", title: "Organiza tus catálogos", text: "Tus lives próximos y finalizados en un solo lugar. **Mueves prendas de un catálogo a otro**, editas precios y empiezas a vender con un toque.", img: screens.catalogos },
      ],
    },
    {
      id: "durante",
      label: "Durante el live",
      emoji: "🔴",
      subline: "Cómo cobrar con QR en TikTok Live",
      title: { lead: "Durante el live,", accent: "vende y cobra" },
      intro: "Tú muestras la prenda frente a la cámara. Pling la pone a la venta, cobra y confirma cada pago.",
      features: [
        { id: "empezar", title: "Empieza el catálogo en vivo", text: "Abres el catálogo del día y **eliges qué prenda mostrar**. Todo tu inventario del live, a un toque.", img: screens.liveSeleccion },
        { id: "aire", title: "La prenda sale al aire", text: "La prenda queda en vivo con su código, su precio y una cuenta regresiva. **Ves cuántas personas intentan comprarla** en ese momento.", img: screens.emisionCatalogo },
        { id: "pago", title: "Cobro QR validado por el banco", text: "La compradora paga por QR directo a tu cuenta y **el banco confirma el pago en tiempo real**. Suena el ¡Pling!: sin capturas ni comprobantes falsos.", img: screens.productoComprado },
        { id: "cambiar", title: "Cambia de prenda en un toque", text: "Pasas a la siguiente prenda sin cortar el live, con **el tiempo en vivo** y lo vendido siempre a la vista.", img: screens.liveEjecucion },
        { id: "cierre", title: "Cierra el live con todo registrado", text: "Al terminar ves el catálogo finalizado: **cada venta ya tiene compradora, pago y código**. No queda nada que anotar.", img: screens.catalogoFinalizado },
      ],
    },
    {
      id: "despues",
      label: "Después del live",
      emoji: "📦",
      subline: "Cómo organizar los envíos de TikTok Live",
      title: { lead: "Después del live,", accent: "todo en orden" },
      intro: "Cada prenda encuentra a su compradora y cada paquete sale a tiempo, sin madrugadas.",
      features: [
        { id: "escanear", title: "Escanea el código de la prenda", text: "Apuntas la cámara al sticker #A1B2 o escribes el código. **Pling encuentra la prenda al instante.**", img: screens.leerCodigos },
        { id: "quien", title: "Sabes de quién es cada prenda", text: "Vendida o sin vender, con su precio, talla y catálogo. Si se vendió, **ves quién la compró** y abres su orden.", img: screens.prendaVendida },
        { id: "orden", title: "Una compradora, un paquete", text: "Pling junta en una orden **todas las prendas de cada compradora**, con su total, su WhatsApp y su dirección en el mapa.", img: screens.detalleOrden },
        { id: "cotizar", title: "Cotiza el envío", text: "Escribes el costo del delivery y Pling se lo manda a la compradora. **Cuando lo acepta, el envío queda aprobado.**", img: screens.cotizarEnvio },
        { id: "envios", title: "Los envíos del día, en orden", text: "Hoy, mañana y entregados, cada orden con su estado. Y **un tope de envíos por día** para que nunca te rebases.", img: screens.enviosHoy },
        { id: "seguimiento", title: "Seguimiento hasta la entrega", text: "Confirmas el envío con su enlace de seguimiento y **la orden pasa a recibida** cuando llega a su compradora.", img: screens.envioAprobado },
        { id: "avisos", title: "Avisos, cancelaciones y devoluciones", text: "Las notificaciones te dicen qué toca: cotizar, enviar o **responder una cancelación o devolución**, siempre con su motivo.", img: screens.notificaciones },
      ],
    },
  ],
} as const;

/**
 * FAQ: preguntas y respuestas FICTICIAS (`ejemplo: true`) para maquetar,
 * pedidas así por el cliente el 2026-10-16. Se sustituyen por las reales.
 */
export const faqPage = {
  meta: {
    title: "Preguntas frecuentes",
    description: "Resolvemos tus dudas sobre Pling: cómo empezar, precios por prenda vendida, la Ticketera, los pagos QR y los envíos.",
  },
  breadcrumbs: [
    { label: "Inicio", href: routes.home },
    { label: "Preguntas frecuentes", href: routes.faq },
  ],
  ejemplo: true,
  subline: "Preguntas frecuentes sobre Pling",
  title: { lead: "Preguntas", accent: "frecuentes" },
  intro: "Si tu duda no está aquí, escríbenos por WhatsApp y te respondemos al momento.",
  categories: [
    {
      id: "empezar",
      label: "Empezar con Pling",
      items: [
        { q: "¿Qué necesito para empezar a usar Pling?", a: "Un celular con internet, tu cuenta de TikTok y una cuenta bancaria para recibir los pagos QR. Nosotros te ayudamos a cargar tu primer catálogo y a conectar la Ticketera Pling." },
        { q: "¿Cuánto tarda la configuración?", a: "La mayoría de las tiendas hace su primer live con Pling el mismo día. Cargar productos toma pocos minutos y la etiqueta con el código se imprime al instante." },
        { q: "¿Puedo probar Pling antes de pagar?", a: "Sí. Puedes recorrer la demo y, si te convence, te acompañamos en tu primer live para que veas cómo funciona con tus propias prendas." },
        { q: "¿Mi equipo puede usar Pling al mismo tiempo?", a: "Sí. Cada persona entra con su propio acceso: quien transmite, quien cobra y quien empaca ven la misma información en tiempo real." },
      ],
    },
    {
      id: "precios",
      label: "Precios y cobro",
      items: [
        { q: "¿Cuánto cuesta Pling?", a: "Pagas por prenda vendida con crédito prepago. No hay mensualidad fija: si tu tienda no vende, no pagas." },
        { q: "¿Qué es la tarifa Tienda Pionera?", a: "Es una tarifa preferente para las primeras tiendas que confían en Pling. Mantiene un precio por prenda más bajo mientras sigas activa." },
        { q: "¿Cómo recargo mi crédito?", a: "Desde la app, con una transferencia o un pago QR. El crédito se descuenta solo cuando una venta se confirma." },
        { q: "¿Pling se queda con una parte de mis ventas?", a: "No. El dinero de cada venta va directo de la compradora a tu cuenta bancaria. Pling nunca custodia tu dinero." },
      ],
    },
    {
      id: "ticketera",
      label: "Ticketera y etiquetas",
      items: [
        { q: "¿Qué es la Ticketera Pling?", a: "Es una pequeña impresora térmica que se conecta a tu celular por Bluetooth e imprime un sticker con el código único de cada prenda, como #A1B2." },
        { q: "¿Necesito comprar la Ticketera?", a: "Te recomendamos usarla para aprovechar el código físico. Consúltanos por WhatsApp las opciones disponibles para tu tienda." },
        { q: "¿Qué pasa si se despega o pierdo una etiqueta?", a: "Puedes reimprimirla desde la ficha del producto en segundos. El código sigue siendo el mismo." },
      ],
    },
    {
      id: "live",
      label: "Durante el live",
      items: [
        { q: "¿Cómo compra una persona durante mi live?", a: "Dices el código de la prenda, la compradora la reserva y tiene 5 minutos para pagar por QR. Si no paga, la prenda vuelve a estar disponible." },
        { q: "¿Cómo sé que un pago QR es real?", a: "Pling valida cada pago con el banco en tiempo real. No dependes de capturas ni de comprobantes que se pueden editar." },
        { q: "¿Funciona con WhatsApp?", a: "Sí. La compradora recibe por WhatsApp el enlace para pagar y la confirmación de su compra." },
        { q: "¿Puedo usar Pling si vendo en Instagram o Facebook?", a: "Pling está pensado para TikTok Live, pero el código, el cobro y el despacho funcionan igual sin importar dónde muestres la prenda." },
      ],
    },
    {
      id: "envios",
      label: "Envíos",
      items: [
        { q: "¿Pling hace los envíos por mí?", a: "Pling no reparte paquetes: ordena tus envíos. Agrupa las prendas por compradora, te muestra qué sale hoy y te deja seguir cada paquete." },
        { q: "¿Puedo trabajar con mi propio delivery?", a: "Sí. Asignas cada envío a tu repartidor o empresa de confianza y actualizas su estado desde la app." },
        { q: "¿La compradora puede ver dónde está su paquete?", a: "Sí. Recibe un enlace de seguimiento con el estado de su envío." },
      ],
    },
    {
      id: "datos",
      label: "Seguridad y datos",
      items: [
        { q: "¿Mis datos y los de mis compradoras están seguros?", a: "Usamos conexiones cifradas y accesos por persona. Solo tu equipo ve la información de tu tienda." },
        { q: "¿Puedo exportar mis ventas?", a: "Sí. Puedes descargar tus ventas, productos y envíos cuando lo necesites." },
        { q: "¿Qué pasa si dejo de usar Pling?", a: "Tu crédito no usado y tus datos siguen siendo tuyos. Te ayudamos a exportarlos antes de cerrar tu cuenta." },
      ],
    },
  ],
  contacto: { title: "¿No encuentras tu respuesta?", cta: ctas.quiero },
} as const;

export const contactoPage = {
  meta: {
    title: "Contacto",
    description: "Habla con el equipo de Pling por WhatsApp: elige tu pregunta y te respondemos al momento.",
  },
  subline: "Contacto de Pling por WhatsApp",
  title: { lead: "Hablemos por", accent: "WhatsApp" },
  intro: "Sin formularios ni esperas: elige tu pregunta y abre la conversación con el mensaje ya escrito.",
  borrador: true,
  cards: whatsappCards,
  dataTitle: "Datos de la empresa",
  growistsNote: parent.credit,
  back: { label: "Volver al inicio", href: routes.home },
} as const;

/**
 * Política de privacidad: BORRADOR genérico para maquetar. No es un texto
 * legal revisado; debe validarlo un abogado antes de publicarse como definitivo.
 */
export const privacidadPage = {
  meta: {
    title: "Políticas de privacidad",
    description: "Cómo Pling recopila, usa y protege los datos de las tiendas y de sus compradoras.",
  },
  breadcrumbs: [
    { label: "Inicio", href: routes.home },
    { label: "Políticas de privacidad", href: routes.privacidad },
  ],
  borrador: true,
  notice: "Borrador pendiente de revisión legal.",
  subline: "Política de privacidad de Pling",
  title: { lead: "Políticas de", accent: "privacidad" },
  updated: "Última actualización: 16 de octubre de 2026",
  intro: "En Pling cuidamos la información de las tiendas que usan la plataforma y de las personas que les compran. Aquí explicamos qué datos tratamos, para qué y qué derechos tienes.",
  sections: [
    {
      id: "responsable",
      title: "Quién es responsable",
      body: [`Pling es un producto creado por Growists, con domicilio en ${contact.city}. Para cualquier consulta sobre privacidad puedes escribirnos a ${contact.email}.`],
    },
    {
      id: "datos",
      title: "Qué datos recopilamos",
      body: [
        "De las tiendas: nombre, datos de contacto, cuenta bancaria para recibir pagos, catálogo de productos y registro de ventas y envíos.",
        "De las compradoras: nombre, número de WhatsApp, dirección de entrega y el estado de sus pagos y pedidos.",
        "Del uso del sitio y de la app: datos técnicos como tipo de dispositivo, navegador y páginas visitadas.",
      ],
    },
    {
      id: "uso",
      title: "Para qué los usamos",
      body: [
        "Para prestar el servicio: identificar cada prenda, validar pagos QR, ordenar los envíos y avisar a la compradora del estado de su pedido.",
        "Para dar soporte, mejorar la plataforma y cumplir obligaciones legales. No vendemos datos personales a terceros.",
      ],
    },
    {
      id: "pagos",
      title: "Pagos",
      body: ["Los pagos van directo de la compradora a la cuenta bancaria de la tienda. Pling no custodia ese dinero; solo recibe del banco la confirmación necesaria para validar cada pago."],
    },
    {
      id: "compartir",
      title: "Con quién los compartimos",
      body: ["Solo con proveedores que nos ayudan a operar el servicio (alojamiento, mensajería y entidades bancarias para validar pagos), bajo acuerdos de confidencialidad, o cuando la ley lo exija."],
    },
    {
      id: "conservacion",
      title: "Cuánto tiempo los guardamos",
      body: ["Mientras la cuenta de la tienda esté activa y durante el tiempo que exijan las obligaciones legales y contables. Después se eliminan o se anonimizan."],
    },
    {
      id: "derechos",
      title: "Tus derechos",
      body: [`Puedes pedir acceso, corrección o eliminación de tus datos, y oponerte a ciertos usos, escribiendo a ${contact.email}. Te responderemos en un plazo razonable.`],
    },
    {
      id: "seguridad",
      title: "Seguridad",
      body: ["Usamos conexiones cifradas, accesos individuales por persona y copias de seguridad. Ningún sistema es infalible, pero trabajamos para proteger tu información."],
    },
    {
      id: "cookies",
      title: "Cookies",
      body: ["Este sitio informativo usa solo las cookies técnicas necesarias para funcionar. Si en el futuro usamos cookies de medición, lo indicaremos aquí."],
    },
    {
      id: "cambios",
      title: "Cambios en esta política",
      body: ["Si actualizamos esta política, publicaremos la nueva versión en esta página con su fecha de actualización."],
    },
  ],
} as const;

