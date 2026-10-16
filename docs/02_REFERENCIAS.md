# 02 · Referencias — Sitio Web Informativo de Pling!

> De cada web de referencia tomamos **mecánicas concretas de movimiento, layout o interacción** y descartamos explícitamente lo que no encaja con la identidad de **Pling!**. Mezclarlas bajo las reglas del *Bible Brand System V3.0* (Material Design 3 *Light Mode Only*, *Pling Organic Mesh Background* y cero "carditis") garantiza un producto con personalidad propia: moderno, ágil y acogedor.

---

## Cómo se deben mirar estas referencias (instrucción para la IA y Desarrollo)
- Baja e inspecciona el **HTML/CSS/JS real** de cada URL antes de construir. Varias utilizan motores de animación modernos (GSAP, ScrollTrigger, Lenis, Framer Motion) y sus curvas de *easing* o estructuras DOM se pueden leer directamente. No trabajes de memoria.
- Extrae **valores concretos** (velocidades de scroll, escalas de transformación, comportamientos *sticky*) y enséñamelos antes de codear para confirmar que estamos alineados.
- De cada referencia toma **únicamente** lo que se indica abajo. Ignora el resto de su estética (especialmente los temas oscuros), aplicando siempre la paleta oficial, radios amplios y tipografías de **Pling!** (*Fredoka*, *Manrope*, *Exo 2 Light Italic*).

---

## Referencia 1 — https://flexion.ai
- **Qué tomar (Scroll, Parallax y Carrusel Inteligente):**
  - **Transición de deslizamiento:** El *smooth scroll* suave y fluido al navegar verticalmente.
  - **Efecto *Parallax*:** El desplazamiento diferencial sutil de las imágenes dentro de sus contenedores al hacer scroll.
  - **Sencillez luminosa:** Su limpieza visual y el amplio "aire" entre elementos.
  - **Carrusel reactivo:** El comportamiento del carrusel de imágenes que avanza solo y **acelera su velocidad cuando el usuario no hace scroll**, retomando un ritmo normal al interactuar. Ideal para la sección `[Tiendas de TikTok que trabajan con nosotros]`.
  - **Iluminación de textos (página `/news`):** El efecto de sombreados/iluminaciones de colores vivos en ciertas palabras clave que se mueven y cobran vida. En Pling!, lo aplicaremos con Azul Pling y Rojo Pling sobre textos en *Exo 2 Light Italic*.
- **Qué NO tomar:**
  - El fondo blanco excesivamente plano o la frialdad estética corporativa. Pling! utiliza su propio *Organic Mesh Background*.

## Referencia 2 — https://palo-seco.com
- **Qué tomar (Degradados con vida propia):**
  - **Movimiento autónomo:** La animación de la sección del "Banner estratégico", donde los degradados de fondo respiran, se desplazan y se funden solos sin depender del ratón del usuario.
  - **Fusión cromática:** Cómo los colores se solapan y aumentan su intensidad. En Pling! esto alimentará el fondo general en tonos pastel y los banners de alto impacto con Azul y Rojo.
- **Qué NO tomar:**
  - Su estética Dark Mode predominante y el estilo de agencia "bruto". Pling! es 100% *Light Mode*.

## Referencia 3 — https://www.unifygtm.com
- **Qué tomar (Layout y Escala):**
  - **Proporciones y Jerarquía:** El uso de letras gigantes (escala *Display*), imágenes de gran tamaño y el excelente respiro (espaciado) entre los bloques de texto y las ilustraciones.
  - **Ilustraciones animadas:** La forma en que animan ilustraciones de sistemas para explicar flujos de forma didáctica.
- **Qué NO tomar:**
  - Su excesiva seriedad B2B. Pling! no debe verse intimidante; tiene que percibirse como la herramienta más fácil de usar para una vendedora de TikTok.

## Referencia 4 — https://make-b.studio
- **Qué tomar (Estructura, Carga Progresiva y Cursores CTA):**
  - **Layout comprensible:** La claridad absoluta en la separación de sus bloques.
  - **Rotación de *Labels*:** El cambio dinámico de textos al inicio en el Hero, fluido y sin saltos de altura (perfecto para el Hero de Pling!).
  - ***Text Reveal* por Scroll:** La forma en que el texto se va "cargando" (iluminando de oscuro a claro) a medida que el usuario hace scroll hacia abajo.
  - **Aparición *Scale-up*:** Imágenes que emergen creciendo de tamaño chico a grande.
  - **Cursor CTA Magnético:** Al hacer *hover* en zonas clave, el puntero del mouse se transforma en un botón CTA tipo píldora que persigue al cursor.
  - **El Footer Definitivo:** La estructura con el cambio de labels, el enorme CTA link al final ("Adquirir Pling ↗") y la espectacular **animación de líquido** en el remate inferior.
- **Qué NO tomar:**
  - Su Dark Mode general.

## Referencia 5 — https://www.noth.in
- **Qué tomar (Efectos de Escala Inversa):**
  - **Aparición *Scale-down*:** El efecto donde las imágenes aparecen muy grandes inicialmente y, al hacer scroll hacia abajo, se van achicando progresivamente hasta encajar en su tamaño final/tarjeta. Ideal para `[Misión y Visión]`.
  - **Aparición de imágenes yFooter:** Su forma fluida de revelar assets.
- **Qué NO tomar:**
  - El Dark Mode y su diagramación fragmentada, dispersa o "rota". Pling! exige orden y alivio cognitivo inmediato.

## Referencia 6 — https://anubi.io
- **Qué tomar (Mundo 3D, Levitación y Carruseles Dinámicos):**
  - **Interfaces en móviles 3D:** Todas las capturas de Pling! deben vivir dentro de carcasas de celulares renderizados en 3D que reaccionan sutilmente al movimiento del ratón.
  - **Levitación orgánica:** Elementos y nodos que flotan en el espacio y se desplazan contigo al interactuar con el mouse, revelando información extra (sección *"Produzione creativa"*).
  - **Carrusel con torsión:** El efecto de carrusel (sección *"In evidenza"*) que se desplaza lateralmente donde la imagen central crece (`1.25x`) y las laterales se tuercen con perspectiva 3D.
- **Qué NO tomar:**
  - El exceso de decoraciones flotantes si invaden la zona central de lectura (la "Zona Segura" para titulares y conversión debe estar 0% obstruida).

---

## Síntesis
Una web en **Light Mode, luminosa y acogedora**, que combina el *scroll* y *parallax* limpio de `flexion.ai` con los degradados vivos y autónomos de `palo-seco.com`. Estructurada con **layouts gigantes y diagramas claros** (`unifygtm.com`, `make-b.studio`), donde **las pantallas de Pling viven en celulares 3D y sistemas de nodos que levitan reaccionando al mouse** (`anubi.io`). Todo hilado por **textos que se cargan al scrollear, fotos que escalan dinámicamente y un Footer coronado por un cierre líquido memorable** (`make-b.studio`, `noth.in`). 

**Regla de oro:** Cero Dark Mode, cero fondos de partículas, cero layouts desordenados y respeto total por la legibilidad (*Anti-caos*).

---

## Coreografía de Animaciones por Página y Sección

### A. Reglas Transversales (Toda la Web)
- **Carga de textos:** Revelado progresivo (*text scrubbing*) al hacer scroll hacia abajo.
- **Iluminación viva:** Sombreados de color (Azul/Rojo) que se mueven solos en palabras clave en cursiva.
- **Mockups 3D:** Toda interfaz de Pling vive en un celular 3D que se mueve con el mouse.
- **Cursor CTA:** En zonas de alta conversión o imágenes clave, el mouse se vuelve una píldora CTA magnética.
- **Componente `[CTA Final Pling]`:** Carrusel de 5 pantallas 3D que se mueve lateralmente; la central se agranda y las laterales se tuercen dinámicamente.
- **Componente `[Footer]`:** Gran enlace "Adquirir Pling ↗" y animación de base líquida.

### B. Página Principal (`/`)
- **`[Hero]`:** Texto rotativo a la izquierda (*labels* cambiantes). A la derecha, celular 3D que se inclina con el mouse, rodeado de micro-componentes de UI que levitan orgánicamente.
- **`[Tiendas de TikTok]`:** Carrusel continuo (*marquee*) que avanza más rápido cuando el usuario no hace scroll y se ralentiza al interactuar.
- **`[Funcionalidades de Pling]`:** **Secuestro de scroll (*Scroll-Jacking*)**. La pantalla se ancla mientras el scroll vertical transiciona entre *Antes del live*, *En el live* y *Después del live*, cambiando el celular 3D.
- **`[Sistemas Conectados]`:** Al hacer scroll, la fase "desconectados" se transforma atrayendo elementos hacia el centro. Los 3 nodos (Inventario, TikTok, WhatsApp) **levitan didácticamente** e interactúan orgánicamente con el cursor.
- **`[Por qué queremos ayudarte]`:** Tarjetas que aparecen creciendo (*scale-up*) con el scroll y brillan en *hover*.
- **`[Carga de datos]`:** Animación fluida de carga en textos de secciones informativas y contadores numéricos (Calculadora).

### C. Página Nosotros (`/nosotros`)
- **`[Hero]`:** Las fotografías periféricas flotan orgánicamente y siguen la física del mouse sin tapar el texto central.
- **`[Misión y Visión]`:** Las fotos inician en tamaño gigante y, al hacer scroll, **se achican (*scale-down*)** hasta encajar en el tamaño real de sus tarjetas.
- **`[¿Qué hace Pling?]`:** Aparición asimétrica por scroll: primero emerge la tarjeta derecha, luego continúa el scroll y aparece la izquierda.
- **`[Interacción Sistemas]`:** Nodos levitantes que despliegan micro-información al pasar el mouse.

### D. Página Filosofía (`/filosofia`)
- **`[Hero]`:** Animación numérica veloz en la gran data ("Cuentas que venden en TikTok") combinada con entrada dinámica de imágenes.
- **`[De Emprendedor a Empresario]`:** Carrusel de fotos superior con torsión y escala dinámica al desplazarse.
- **`[Problemas al vender]`:** **Secuestro de scroll (*Sticky Scroll-Jacking*)** para cambiar la interfaz de fondo y las evidencias mientras se explican los 3 problemas cronológicos (Inventario > Live > Delivery).
- **`[Pling como Solución]`:** Las 3 tarjetas inferiores se agrandan (*scale-up*) de forma notoria al hacer *hover*, iluminando su base.