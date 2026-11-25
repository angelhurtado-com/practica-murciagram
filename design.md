# Sistema de Diseño · MurciaGram (Auth & UI Design Tokens)

Este documento define las directrices visuales, tokens de diseño y comportamientos de interfaz para mantener la coherencia estética entre la galería principal (`index.html`) y los módulos de registro (`registro.html`) e inicio de sesión (`login.html`).

---

## 1. Paleta de Colores

| Token CSS | Valor HEX | Uso principal |
| :--- | :--- | :--- |
| `--color-primary` | `#9e1b32` | Color institucional (bandera Región de Murcia): cabecera, botones principales, enlaces activos y foco. |
| `--color-primary-dark` | `#751224` | Estado `:hover` de botones principales y énfasis de alto contraste. |
| `--color-bg` | `#f4f5f7` | Fondo general de la aplicación y fondo interior de inputs en reposo. |
| `--color-surface` | `#ffffff` | Superficie de tarjetas (`pin-card` y contenedores de formulario). |
| `--color-text` | `#1e293b` | Texto principal, títulos y etiquetas de formulario. |
| `--color-muted` | `#64748b` | Textos secundarios, placeholders y subtítulos. |
| `--color-border` | `#cbd5e1` | Bordes de campos de formulario en estado normal. |
| `--color-error` | `#dc2626` | Mensajes de error de validación y bordes de campos inválidos. |
| `--color-error-bg` | `#fef2f2` | Fondo suave para alertas de error. |
| `--color-success` | `#16a34a` | Confirmación de registro/login correcto y campos validados. |

---

## 2. Tipografía y Jerarquía de Textos

* **Familia tipográfica:** `system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif` (tipografía nativa de alto rendimiento y legibilidad).
* **Jerarquía:**
  * **Título de marca (`h1`):** `1.6rem` (`25.6px`), peso `700`, `letter-spacing: -0.5px`.
  * **Título de formulario (`h2`):** `1.45rem` (`23.2px`), peso `700`, color `--color-text`.
  * **Subtítulo / Descripción:** `0.92rem` (`14.7px`), peso `400`, color `--color-muted`.
  * **Etiquetas (`label`):** `0.88rem` (`14px`), peso `600`, color `--color-text`.
  * **Texto de entrada (`input`):** `0.95rem` (`15.2px`), peso `400`.
  * **Mensajes de validación / Ayuda:** `0.8rem` (`12.8px`), peso `500`.

---

## 3. Espaciados, Bordes, Radios y Sombras

* **Sistema de espaciado:** Escala base de `0.25rem` (`4px`):
  * Separación entre etiqueta e input: `0.4rem`.
  * Separación entre grupos de campos: `1.15rem`.
  * Relleno interior (*padding*) de tarjeta de formulario: `2rem` en escritorio y `1.5rem` en móvil.
* **Radios de borde:**
  * Tarjeta principal: `--radius-card: 16px`.
  * Campos de entrada (`input`) y botón principal: `10px`.
  * Etiquetas/píldoras: `999px`.
* **Sombras:**
  * Reposo: `--shadow-card: 0 4px 14px rgba(0, 0, 0, 0.08)`.
  * Elevación / Hover: `--shadow-hover: 0 14px 28px rgba(158, 27, 50, 0.18)`.

---

## 4. Componentes y Estados Interactivos

### Campos de Formulario (`input`)
* **Normal:** Fondo `#ffffff`, borde `1.5px solid #cbd5e1`, texto `#1e293b`, altura mínima `44px`, padding horizontal `0.9rem` (o `2.6rem` a la izquierda/derecha cuando llevan icono).
* **Foco (`:focus`):** Borde `1.5px solid #9e1b32`, anillo exterior `box-shadow: 0 0 0 3px rgba(158, 27, 50, 0.15)`, `outline: none`.
* **Error (`.is-invalid`):** Borde `1.5px solid #dc2626`, fondo `#fef2f2`, mensaje descriptivo visible debajo en `#dc2626`.
* **Válido (`.is-valid`):** Borde `1.5px solid #16a34a`.
* **Deshabilitado (`:disabled`):** Fondo `#e2e8f0`, color `#94a3b8`, cursor `not-allowed`.

### Botones
* **Primario (`.btn-primary`):** Fondo `#9e1b32`, texto `#ffffff`, peso `600`, altura `46px`, transición `0.25s cubic-bezier(0.22, 1, 0.36, 1)`.
  * *Hover:* Fondo `#751224`, leve elevación `translateY(-1px)`.
  * *Active:* `translateY(0)`.
  * *Disabled:* Opacidad `0.6`, cursor `not-allowed`.
* **Botón mostrar/ocultar contraseña (`.toggle-password`):** Botón transparente posicionado dentro del extremo derecho del campo contraseña (`color: #64748b`, *hover* `#9e1b32`).

---

## 5. Iconografía y Adaptación Responsive

* **Iconos:** Librería **Font Awesome 6.5.1** (`fa-solid` y `fa-regular`), manteniendo coherencia con la cabecera y tarjetas de `index.html`.
* **Responsive (Mobile-First con sintaxis de rangos CSS3):**
  * **Móvil (`width < 600px`):** Tarjeta ocupando el `100%` del ancho disponible con márgenes laterales de `1rem`; campos apilados en 1 columna.
  * **Tableta y Escritorio (`width >= 600px`):** Tarjeta centrada con ancho máximo de `460px` (login) y `560px` (registro con filas dobles para Nombre/Apellidos y Contraseña/Repetir).