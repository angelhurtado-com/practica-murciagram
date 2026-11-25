# MurciaGram · El Pinterest de la Región de Murcia

Portal visual *Mobile-First* dedicado a la difusión turística, cultural y patrimonial de los municipios de la Región de Murcia, desarrollado íntegramente con **HTML5 semántico** y **CSS3 moderno**[cite: 6, 7].

🌐 **Demo en vivo:** [https://angelhurtado-com.github.io/practica-murciagram/](https://angelhurtado-com.github.io/practica-murciagram/)[cite: 6]

---

## Características técnicas implementadas

* **Arquitectura HTML5 Semántica:** Estructurado exclusivamente mediante etiquetas semánticas (`<header>`, `<aside>`, `<nav>`, `<main>`, `<article>`, `<figure>`, `<figcaption>`, `<footer>`) sin contenedores genéricos innecesarios[cite: 6].
* **SEO y Open Graph:** Configuración de `viewport` optimizada para dispositivos móviles, directiva `robots` (`index, follow`), meta-descripción y etiquetas `og:` para previsualización en redes sociales[cite: 6].
* **Diseño Mobile-First con Sintaxis de Rangos:** Estilos base diseñados para pantallas móviles (`< 600px`) en una sola columna y adaptaciones mediante operadores matemáticos de rango en CSS3 (`(width >= 600px) and (width <= 800px)` para tableta y `(width > 800px)` para escritorio con menú lateral fijo)[cite: 7].
* **Interactividad y Filtrado en CSS Puro:**
  * Filtrado por comarcas y zonas (*Huerta de Murcia*, *Costa Cálida*, *Noroeste y Valle*, *Altiplano*) mediante el selector `:target`[cite: 6, 7].
  * Tarjetas estilo Pinterest con transiciones mediante curva Bézier personalizada, superposición (*overlay*) informativa, enlace a portales turísticos oficiales y botón de *Me gusta* con estado persistente mediante `:has()`[cite: 6, 7].
  * Estructura preparada mediante atributos `data-zona` y clase `.is-liked` con propiedad `order` para la futura integración de reordenación dinámica en JavaScript[cite: 6, 7].
* **Modo Impresión (`@media print`):** Hoja de estilos específica que oculta la barra lateral y los controles interactivos, adaptando las tarjetas a alto contraste sobre fondo blanco[cite: 7].

## Optimización y automatización de imágenes

* **Carga adaptativa (`<picture>` + `loading="lazy"`):** Cada destino sirve versiones optimizadas de `400px` (`-mobile.jpg`) para móviles y `1000px` (`-desktop.jpg`) para pantallas mayores, posponiendo la carga de las tarjetas fuera del *viewport* inicial[cite: 6, 8].
* **Tarea automatizada en VS Code (`.vscode/tasks.json`):** Script de PowerShell integrado que utiliza la librería nativa `System.Drawing` de Windows para procesar por lotes los originales de `assets/raw/` y generar automáticamente las variantes redimensionadas en `assets/img/` al ejecutar `Ctrl + Shift + B`[cite: 8].

---

**Autor:** Ángel Hurtado · Desarrollo de Aplicaciones Web (2026)[cite: 6]