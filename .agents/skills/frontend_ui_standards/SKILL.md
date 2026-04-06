---
name: Frontend UI Standards & Design System
description: Official guidelines for UI development, styling, and aesthetic consistency on the Ser33 Nuumerology Platform. This skill MUST be referenced by any agent attempting to modify CSS, Vue components, or layout structures.
---

# Ser33 Frontend Architecture & UI Standards

Bienvenido al sistema de diseño oficial del proyecto **Ser33** (Manual del Destino). Cualquier Agente (Antigravity u otros) que deba modificar estilos, añadir botones, crear nuevos módulos u organizar layouts **DEBE OBEDECER IMPERATIVAMENTE** estas reglas para evitar solapamientos, código basura local (estilos duplicados) y garantizar una experiencia "Premium/Mística".

## 1. Reglas Core de Diseño 👑
El diseño del portal no tolera improvisaciones. Toda la plataforma está anidada sobre un esquema *Glassmorphism* (Efectos de Vidrio).

*   **Tipografía Principal:** `Inter` (legibilidad, números) y `Cormorant Garamond` u `Outfit` (títulos, nombres místicos, "ser33").
*   **Aura Premium:** Prohibido usar bordes sólidos rígidos. Siempre emplear bordes semitransparentes `rgba(255, 255, 255, 0.1)`.
*   **Shadows & Glows:** El resaltado de elementos interactivos debe ser dorado (`rgba(212, 175, 55, 0.4)`).
*   **Glassmorphism (Vidrio):** Todo panel grande o carta debe tener `backdrop-filter: blur(10px)` (o similar) y un fondo `background: rgba(10, 10, 15, 0.6)` apoyado sobre fondos estrellados cósmicos o esféricos misteriosos.

## 2. Paleta de Colores (Variables CSS Globales) 🎨
No hardcodees colores como `#fff` o `#000` si hay una variable equivalente. Utiliza las definidas en `src/assets/index.css` o equivalente global.

*   **Oro Premium:** `#D4AF37` / `#FFD700`
*   **Fondo Cósmico:** `#0A0A0F` (Dark theme space)
*   **Blancos Ópticos:** `rgba(255, 255, 255, 0.85)` (texto regular para prevenir cansancio visual, evite el blanco absoluto FF puro a menos que sea un "Glow").

## 3. Manejo de Botones y Solapamientos (CRÍTICO) 🚧
*Nunca* inventes clases CSS locales dentro de un componente Vue para elementos que ya existen en el ecosistema (por ejemplo: Botones de Descarga).
*   **Botón Primario / Descarga:** Si debes colocar un nuevo botón de acción principal junto al que ya existe (ej. Descargar PDF), **NO** inventes un `.share-btn`. Utiliza directamente las clases globales establecidas: `class="btn-gold download-btn"` (o equivalentes existentes).
*   **Flexbox Mandatory:** Si dos botones van unidos, siempre envuélvelos en un contenedor con `display: flex; gap: 1.5rem; flex-wrap: wrap; justify-content: center;` para garantizar que la UI no se rompa si la ventana se comprime (mobile).
*   **Evita `!important` si es posible**, mejor usa herencia clara. Sin embargo, en el botón PDF se acepta si es de la capa de componentes base (`.download-btn`).

## 4. Manipulación de Medios (Assets) 🖼️
*   **Formato Único:** **ABOSLUTAMENTE TODAS LAS IMÁGENES DEBEN SER `.webp`.** Está estrictamente prohibido usar o sugerir subir archivos `.png` o `.jpg` al repositorio. Los iconos deben ser escalables en CSS puro si es posible, o WebP (ej. `dia1.webp`... `dia9.webp`).
*   **Imágenes HTML2Canvas:** Si se implementa un generador de imágenes de la pantalla (Soul Cards, etc.), el contenedor del lienzo DOM virtual HTML **NO** debe estar configurado con `height: 0; width: 0;` (Esto genera archivos corruptos de 0x0). El estándar es usar la técnica *Off-Screen* con un tamaño absoluto real:
    ```css
    style="position: absolute; left: -9999px; top: -9999px; width: 540px; height: 960px; overflow: hidden;"
    ```

## 5. Algoritmos de Funcionalidad Numerológica
Cero Divagues (Zero Tolerance for Nonsense). Se respeta exclusivamente la ruta pura **Pitagórica** matemática.

*   **Paso a Paso Seguro:** Si vas a añadir "El Clima Vibracional Diario" o cualquier otra feature de "Fase 2", valida primero con la base de datos en `interpretations.js`. No inventes descripciones externas.

> *Nota de Arquitectura Frontend para Futuros Agentes: Al inicio de tu sesión, por favor revisa este archivo y ajusta tus propuestas visuales en consonancia. Un diseño "feo" o "básico" se considerará un error grave.*
