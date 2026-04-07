# 📔 Log de Lecciones Acumulativo — ser33

Este archivo registra el conocimiento destilado de cada sesión: lo aprendido, lo que falló y las soluciones maestras.

---
5: 
6: ## 🔬 Sesión 9 (2026-04-07) — Auditoría y Plan de Producción
7: - **Aprendido**:
8:     - **Seguridad Crítica**: Si un secreto (como el token de Notion) estuvo alguna vez en un archivo `.env` local, debe considerarse comprometido y rotarse inmediatamente al pasar a fase de prep-producción.
9:     - **Navegación SPA**: El control de flujo mediante `v-if` en `App.vue` es un cuello de botella para SEO y analítica. La migración a `vue-router` es prioritaria para permitir deep-linking de resultados numerológicos.
10:     - **Optimización de Assets Pesados**: Importar fuentes de PDF en Base64 de forma síncrona añade `>1MB` de carga innecesaria al inicio. Se requiere *Lazy Loading* (import dinámico) solo cuando el usuario haga clic en "Generar PDF".
11: - **Fallido**: Auditoría visual automatizada (error de capacidad de modelo). Se resolvió mediante análisis profundo de código estático y lógica de componentes.
12: - **Próximo Paso**: Ejecución de Fase 1 (Revocación de secretos y limpieza de repo).
13: 
14: ---

## 🧭 Sesión 7 (2026-04-05) — Especialización y Estabilidad PDF
- **Aprendido**:
    - **PDF Layout Dinámico**: Nunca utilizar alturas fijas (`h=60`) para bloques de texto variables. Medir las líneas resultantes con `doc.splitTextToSize` antes de dibujar el rectángulo de fondo para evitar que el texto "se desborde".
    - **Descargas Blobs**: El uso de `window.open(blob)` es inconsistente entre navegadores. La creación de un enlace dinámico `<a>` con `setAttribute('download')` y disparo manual de evento es el estándar de oro para descargas robustas.
    - **Localización de Ordinales**: Al localizar elementos como "1st, 2nd, 3er, 4to", es más limpio usar un array de strings en el JSON de i18n y acceder por índice (`$t('pinnacleNames[0]')`) que intentar lógica de sufijos por código.
    - **Seguridad en Fallbacks**: Al usar `doc.save()`, siempre envolver en un `try-catch` para disparar el método del Blob como respaldo. Esto garantiza que la descarga ocurra incluso si el método directo tiene problemas de memoria o permisos.
- **Fallido**: Intento de hardcodear variables de traducción en el composable (causó desincronización con el modo de idioma del usuario).
- **Pendiente**: Integración de pasarelas de pago y metadatos SEO avanzados.

---

## 🔮 Sesión 6 (2026-04-05) — Gematría y Automatización
- **Aprendido**: El mapeo de fonética hebrea a numerología necesita una tabla de equivalencias clara (Aleph-Bet sagrado).

---

## 🦄 Sesión 5 y anteriores (Resumen)
- **Aprendido**: El uso de SVGs puros en lugar de emojis Unicode garantiza que el branding se vea idéntico en Windows, Mac y Android.
- **Fallido**: Uso de `undetected-chromedriver` en Windows 11 (causó problemas de driver ntdll.dll).
- **Solución**: Se desistió del scraping dinámico para priorizar la estabilidad del núcleo del proyecto.