# 04 · Contenido — Sitio Web Informativo de Pling!

> **Única fuente de verdad (Single Source of Truth):** Este archivo concentra absolutamente todos los textos, titulares, *sublines*, etiquetas (*labels*), botones (CTAs), enlaces, estados dinámicos, tablas de precios y declaración de *assets* para construir la web de **Pling!** usando Next.js, React y Tailwind CSS[cite: 5]. Lo que aún requiere confirmación final está marcado como `TODO`.

---

## 1. Identidad y Datos de Marca

* **Nombre / Marca:** Pling![cite: 2, 9]
* **Tagline de marca:** *"Vende en vivo. Cobra seguro. Entrega en orden."*[cite: 9]
* **Tono y Personalidad:** Moderno, ágil y acogedor. Transmite alivio inmediato, familiaridad y control[cite: 5].
* **Teléfono / WhatsApp de atención al cliente:** `+591 76349206`
* **Email de contacto:** `hola@plin.com.bo`
* **Ubicación física (Google Maps):** `https://maps.app.goo.gl/mMwkrydF1nojERnk9`
* **Empresa matriz:** Growists (`https://growists.com`)[cite: 5].
* **Redes sociales oficiales:**
  * **TikTok:** `https://www.tiktok.com/@pling.bolivia`
  * **Instagram:** `https://www.instagram.com/pling.bo/`
  * **Facebook:** `https://www.facebook.com/profile.php?id=61582195003831`
* **Crédito legal del footer:** `"2026 desarrollado por https://growists.com · Pling ha sido creado por Growists"`[cite: 10].

---

## 2. Textos Clave y Voz de Marca

* **Titular de portada (Hero H1, con rotador dinámico incrustado):**
  > `"Vender por TikTok Live ya lo haces bien. Pling se encarga de todo lo demás: **[verificar QR automáticamente / un pago por cliente / producto con etiqueta siempre trackeado / enviar el producto al cliente]**"`[cite: 3].
* **Resumen central (Banderín):**
  > `"Pling es el sistema de gestión operativa para ventas por TikTok Live. Su interfaz refleja orden, logística rápida y control de inventario para reemplazar los cuadernos y el Excel."`[cite: 6]
* **CTA principal global:** `"Probar Pling"` (en Navbar)[cite: 3].
* **CTA secundario global:** `"Ver demo"`[cite: 3].
* **Cierre / Footer (Llamada final):** `"Quiero Pling"` y gran enlace `"Adquirir Pling ↗"`[cite: 3, 10].

---

## 3. Estado y Datos que se Repiten (Una Sola Fuente)

### 3.1. Las 4 Tarjetas de Conversión a WhatsApp (Para `[Modal Adquirir/Probar Pling]` y `/contacto`)[cite: 3, 10]
Todas apuntan al número `+591 76349206` y abren directamente la aplicación con un mensaje URL-encoded.

| Título de Tarjeta | Mensaje Precargado en WhatsApp (`?text=`) |
| :--- | :--- |
| **Quiero usar Pling**[cite: 3] | `"¡Hola equipo de Pling! 👋 Vendo por TikTok Live y quiero empezar a usar Pling en mi tienda."` |
| **¿Cómo pruebo Pling?**[cite: 3] | `"¡Hola! 👋 Me gustaría saber cómo puedo probar Pling para mis transmisiones de TikTok Live."` |
| **¿Cuánto cuesta Pling?**[cite: 3] | `"¡Hola! 👋 Quiero información sobre los precios de Pling y cómo funciona el cobro por prenda vendida."` |
| **¿Pling es difícil de usar?**[cite: 3] | `"¡Hola! 👋 Tengo dudas sobre cómo funciona Pling en el día a día y qué tan fácil es usarlo con mi equipo."` |

### 3.2. Micro-componentes Levitantes (Badges de UI)[cite: 7]
* **Badge Código Físico:** `CÓDIGO` · `#A1B2` (Tipografía *Monospace* técnica)[cite: 7].
* **Badge Venta Verificada:** `¡Pling! +Bs 120`[cite: 7].
* **Badge Transmisión:** `● LIVE` (Fondo Rojo Coral `#FF4A3D`, texto blanco)[cite: 7].
* **Burbuja de Compradora:** `"¡Lo quiero! ✓✓"`[cite: 7].
* **Badge de Validación:** `✓` (Checkmark Azul Pling)[cite: 7].

### 3.3. Reglas del Modelo de Negocio (Calculadora)[cite: 9]
* **Regla de Oro:** *"Ganamos cuando la tienda vende. Si la tienda no vende, no paga."* (Crédito prepago por prenda vendida)[cite: 9, 17].
* **Estado del Selector:** `tarifa_activa = "pionera"` (Alternable entre `"Tienda Pionera"` y `"Estándar"`)[cite: 3].
* **Ejemplo de Costo Fijo Base (Referencia Calculadora):** `"Bs 180 al mes · 72 prendas por semana · Desde Bs X por prenda."`[cite: 3].

---

## 4. Componentes Transversales Globales

### 4.1. Cabecera Fija (`[Navbar]`)[cite: 5, 10]
* **Izquierda:** Logo de Pling[cite: 3].
* **Centro (Enlaces en *Manrope*):** `Ver demo`, `Cuánto te ahorra`, `Nosotros`, `FAQ`, `Filosofía`[cite: 3, 10].
* **Derecha (Botón CTA en *Fredoka*):** `Probar Pling` (Abre el Modal WhatsApp)[cite: 3, 10].

### 4.2. Modal Global de Conversión (`[Modal Adquirir/Probar Pling]`)[cite: 5, 10]
* **Título H2:** `Contacto directo por WhatsApp`[cite: 10].
* **Cuerpo:** Renderiza las 4 Tarjetas de WhatsApp descritas en la sección 3.1[cite: 3, 10].

### 4.3. Cierre de Conversión Pre-Footer (`[CTA Final Pling]`)[cite: 3, 10]
* **Subline:** `Plataforma Pling`[cite: 10].
* **Botones:** `Quiero Pling` (Primario) y `Probar demo` (Secundario) centrados[cite: 3, 10].
* **Carrusel de Pantallas Móviles:** 5 imágenes de interfaces móviles (1. Agregar productos, 2. Empezar live, 3. Compra de un cliente web, 4. Escanear código, 5. Proceso delivery). La foto central es más grande e incluye descripción[cite: 3, 10].

### 4.4. Pie de Página (`[Footer]`)[cite: 3, 10]
* **Columna Izquierda:** Logo de Pling[cite: 3].
* **Columna Central (Enlaces):** `Quiero Pling`, `Ver Demo`, `Nosotros`, `Preguntas frecuentes`, `Filosofía de emprendedor a empresario`, `Políticas de privacidad`[cite: 3, 10].
* **Columna Derecha:** Redes sociales (TikTok, Instagram, Facebook) y botón `Quiero Pling`[cite: 3, 10].
* **Base:** `2026 desarrollado por https://growists.com`[cite: 3, 10].

---

## 5. Contenido Detallado por Página y Sección

### PÁGINA 1: Homepage (`/`)[cite: 10]

#### 1.1 Hero Section[cite: 10]
* **Subline:** `App de gestión de TikTok Live`[cite: 3].
* **Título H1:** `Vender por TikTok Live ya lo haces bien. Pling se encarga de todo lo demás:`[cite: 3].
* **Rotador de Textos:** `"verificar QR automáticamente"` | `"un pago por cliente"` | `"producto con etiqueta siempre trackeado"` | `"enviar el producto al cliente"`[cite: 3].
* **Gráfico Dinámico Sincronizado:** 3 vistas (Validación QR → Un producto: un código → Producto / compra / cliente sincronizados)[cite: 3].

#### 1.2 Banderín[cite: 10]
* **Subline:** `Qué es Pling`[cite: 3].
* **Texto Central:** Un resumen claro de cómo Pling resuelve el caos del Live Commerce centralizando etiquetado, cobro y despacho[cite: 10].

#### 1.3 Ahorro con Pling (Calculadora)[cite: 10]
* **Subline / Título:** `Ahorro con Pling`[cite: 3].
* **Labels Interactivos:** `Lives por semana`, `Prendas por live`, `Personas en el equipo`, `Precio promedio de la prenda`[cite: 3].
* **Resultados Dinámicos:** Muestra "Beneficio neto estimado / mes" y "Costo de Pling"[cite: 3].

#### 1.4 Casos de Éxito (Prueba Social)[cite: 10]
* **Subline:** `Tiendas de TikTok que trabajan con nosotros`[cite: 3].
* **Contenido:** Marquee horizontal con logotipos de tiendas reales pioneras en Bolivia[cite: 10].
* **Tiendas a mostrar:**
  1. `Lemak Boutique` (Logo extraído de `https://www.tiktok.com/@lemakboutique`).
  2. `EcoArmario`[cite: 1].
  3. *8 Tiendas adicionales (Utilizar logos placeholder / inventados temporalmente para completar el carrusel).*

#### 1.5 Funcionalidades de Pling[cite: 10]
* **Labels (Tabs):** `Antes del live`, `En el live`, `Después del live`[cite: 3].
* **Contenido:** A la izquierda título de *features*, a la derecha imagen representativa de cada etapa operativa[cite: 10].

#### 1.6 Conexión de 3 Sistemas[cite: 10]
* **Estado 1 (Sin Pling):** Muestra TikTok Live, WhatsApp e Inventario totalmente desconectados[cite: 3].
* **Estado 2 (Con Pling):** Muestra los 3 nodos interconectados con el logo de Pling en el centro, sincronizando la operación en tiempo real[cite: 3].

#### 1.7 Por qué queremos ayudarte[cite: 10]
* **Columna Vendedores:** Explicar cómo ayudamos a formalizar y escalar negocios de emprendedores a empresarios en Bolivia[cite: 3].
* **Columna Compradores:** Explicar cómo el orden genera una base creciente de compradores confiados en Bolivia[cite: 3].

---

### PÁGINA 2: Cuánto te ahorra (`/cuanto-te-ahorra`)[cite: 10]
* **Breadcrumbs / Subline:** `Inicio / Cuánto te ahorra`[cite: 10].
* **Columna Izquierda (Sticky):** Presets rápidos (`Recién empezando` / `Alto volumen`) y controles deslizables[cite: 3, 10]. Acordeón oculto `"¿Qué tareas manuales te ahorra Pling?"`[cite: 3, 10].
* **Columna Derecha (Scroll):** Hero Card con el `Beneficio Neto Mensual` y `Horas Recuperadas`. Desglose de ahorros y tabla de tarifas según el Toggle `Tienda Pionera / Estándar`[cite: 3, 10].

---

### PÁGINA 3: Nosotros (`/nosotros`)[cite: 10]
* **Hero:** Propuesta de valor de Pling, rodeada de imágenes orgánicas flotantes (Ej: Vendedora transmitiendo, Empaque, Comprador)[cite: 10].
* **Misión y Visión:** Dos cajas asimétricas. Misión (Imagen arriba, texto abajo) y Visión (Texto arriba, imagen abajo)[cite: 3].
* **Por qué nace Pling:** 2 motivos principales: transformar emprendedores en empresarios y generar confianza en los compradores[cite: 3].
* **Growists:** Sección dedicada a validar el soporte y financiamiento tecnológico de la empresa matriz `https://growists.com`[cite: 3].

---

### PÁGINA 4: Filosofía (`/filosofia`)[cite: 10]
* **Hero:** Explicación del Live Commerce en Latam con un dato numérico masivo de cuentas de TikTok[cite: 10].
* **De Emprendedores a Empresarios:** Carrusel de imágenes que muestra el crecimiento de negocios informales a empresas[cite: 3].
* **Problemas al vender (x3):** 1) Caos al hacer inventario manual, 2) Caos al vender por el live (QRs, capturas), 3) Caos al organizar el delivery de madrugada[cite: 3].
* **Pling como Solución:** 3 tarjetas con iconos detallando cómo Pling resuelve el inventario, el pago QR y el envío[cite: 3].

---

### PÁGINA 5: Preguntas Frecuentes (`/faq`)[cite: 10]
* **Estructura:** Categorías de ayuda a la izquierda. Preguntas y respuestas en formato acordeón a la derecha[cite: 3].

---

### PÁGINA 6: Contacto (`/contacto`)[cite: 10]
* *Nota:* Vista encapsulada estricta (SIN Navbar, SIN Footer, SIN Breadcrumbs)[cite: 10].
* **Hero:** Título invitando a la conversión directa. Renderiza las 4 Tarjetas de WhatsApp[cite: 3].
* **Datos de Empresa:** Mapa embebido de Google Maps (`https://maps.app.goo.gl/mMwkrydF1nojERnk9`) a la izquierda. Información de contacto, email (`hola@plin.com.bo`), redes sociales y nota de respaldo de Growists a la derecha[cite: 10].

---

## 6. Inventario de Imágenes, Rendimiento SEO y Assets (`docs/`)

### 6.1. Optimización SEO y Rendimiento en Next.js
Para garantizar la mejor puntuación en Core Web Vitals y accesibilidad nivel AA, el tratamiento de las imágenes es una prioridad absoluta[cite: 5].
* **Uso estricto de `next/image`:** Absolutamente todas las imágenes (tanto fotografías consumidas por la API de Pexels como recursos locales) deben renderizarse utilizando el componente `<Image />` nativo de Next.js.
* **Formatos y Carga:** Next.js se encargará de servir automáticamente los assets en formatos modernos (WebP/AVIF)[cite: 5]. Se debe aplicar `priority={true}` a las imágenes ubicadas en las áreas de Hero (Above the fold) y carga diferida (`lazy`) al resto.
* **Atributos `alt`:** Es obligatorio el uso de etiquetas `alt` descriptivas en todas las fotografías y diagramas para asegurar una indexación SEO correcta y lectura por screen-readers.

### 6.2. Assets Locales e Iconos
* **Logos y Branding:** Logo de Pling en versión bicolor y blanco, Favicon, Logo de Growists, Logo de Lemak Boutique, Logo de EcoArmario[cite: 1, 10].
* **Tipografías:**
  * **Títulos y Botones:** `Fredoka` (SemiBold / Bold)[cite: 7].
  * **Textos, Descripciones y Chips:** `Manrope` (Regular / Medium)[cite: 7].
  * **Énfasis de conexión:** `Exo 2` (Light Italic)[cite: 7].
  * **Hardware/Etiquetas:** Tipografía `Monospace` (Se importará de Google Fonts)[cite: 7].
* **Colores Principales:** Azul Pling (`#3B42D9` / `#454DF4`) y Rojo Pling (`#FF4A3D` / `#B23119`)[cite: 7].
* **Imágenes Editoriales:** Conectadas mediante API de Pexels para mostrar vendedoras latinas y procesos de empaque en la sección de Filosofía y Nosotros.

### 6.3. Pendientes por Completar (`TODO`)
* [ ] **`TODO` (Extracción de Logo):** Descargar el avatar oficial de *Lemak Boutique* desde su perfil de TikTok y optimizarlo para el carrusel de marcas.
* [ ] **`TODO` (Logos Placeholders):** Generar los 8 logos inventados (ficticios) restantes para rellenar la barra de desplazamiento (*marquee*) de Casos de Éxito hasta que existan autorizaciones de nuevas tiendas reales.
* [ ] **`TODO` (Subida de Assets):** Terminar de exportar los SVG de logotipos, tipografías e interfaces hacia la carpeta final `/docs` del repositorio Next.js.