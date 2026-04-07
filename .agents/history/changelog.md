# 📝 Changelog — Manual del Destino

> Registro cronológico de todos los cambios realizados en el proyecto.  
> Formato: `[CATEGORÍA] Descripción — Archivo(s) afectado(s)`

---
## 2026-04-07 — Sesión 9: Auditoría Técnica y Refactor (Fase 1, 2 y 3) 🚀
- `[audit]` **Auditoría Técnica Integral**: Realizada evaluación exhaustiva de 10 sectores, identificando deudas críticas. Se creó `.agents/history/technical_audit.md`.
- `[plan]` **Roadmap (5 Fases)**: Diseñado plan maestro para PO/PM — `future_roadmap.md`.
- `[feat]` **Persistencia Notion**: Sincronización automática de auditorías a la BD de Stakeholders.
- `[security]` **Higiene Crítica (Fase 1)**: Limpieza local del repo de `chrome_profile`, retiro de token expuesto en `.env` (tras validar inexistencia en Git), movidos `dotenv` originando dependencias limpias.
- `[i18n]` **Traducción Total**: Agregadas >20 variables al `es.json` y `en.json` (NumberDetail, Dashboard, SoulCard), eliminando textos hardcodeados y emojis conflictivos.
- `[refactor]` **Arquitectura Pro (Fase 2)**: Sustitución de `v-if/else` en App por enrutamiento real mediante `vue-router` (`/`, `/results`, `/number/:id`).
- `[state]` **Pinia Store Central**: Centralización del estado numerológico global, limpiando parámetros dispersos de la app.
- `[perf]` **Lazy Loading Extremo**: Las librerías masivas `jsPDF`, `html2canvas` y fuentes TTF pesadas ahora se importan asíncronamente bajo demanda, ahorrando ~1.5MB de bundle inicial.
- `[feat]` **Escudo Analítico**: Integrada regex RegExp para proteger parámetros en DestinyPortal e inyectados mensajes internacionalizados para entradas erróneas.
- `[seo]` **SEO Foundations (Fase 3)**: Integración de `@unhead/vue` para manejo dinámico de title y og:meta.
- `[analytics]` **Tracking (Fase 3)**: Integración de `@vercel/analytics` y creación de `vercel.json` estricto para Vue Router SPA fallbacks y caché persistente de `.webp`.

---

## 2026-04-05 — Sesión 8: Motor Gráfico Social, Soul Cards y Patrones UI 🎨
- `[feat]` **Soul Cards Dinámicas**: Implementado el módulo `SoulCardGenerator.vue` con `html2canvas` para crear imágenes ricas 9:16 listas para Instagram (Phase 1 Growth).
- `[fix]` **Blindaje de Descarga Asíncrona**: Implementación del "Patrón de Descarga en 2 Pasos" (Async User-Gesture Bypass) usando `canvas.toBlob()` nativo para asegurar la extensión PNG.
- `[fix]` **Crash de HTML2Canvas**: Reparado `addColorStop non-finite` colocando el lienzo oculto en posición física real `fixed` y modulando la visibilidad mediante callback virtual `onclone`.
- `[refactor]` **CSS Architecture**: Inyectadas reglas globales y flexbox directos al Dashboard para resolver el colapso visual de los botones de descarga.
- `[docs]` **Agent SKILL de UI/UX**: Creado `.agents/skills/frontend_ui_standards/SKILL.md` para dotar de memoria a los agentes sobre reglas de vidrio, escalas y uso imperativo del `.webp`.
- `[perf]` **Optimización de Repositorio**: Conversión total del banco de imágenes (sol, luna y assets pesados) a webp, aligerando drásticamente el peso del repo en github.

---

## 2026-04-05 — Sesión 7: Internacionalización Total y Estabilidad de Reportes 🌍
- `[feat]` **i18n Global (EN/ES)**: Traducción completa de la Biblioteca del Despertar, glosarios, sufijos (1st, 2nd, etc.) e interpretaciones avanzadas — `es.json`, `en.json`, `interpretations.js`, `pdfContent.js`.
- `[fix]` **Estabilización del Motor PDF**: Solución al fallo de descarga de `blob:` mediante descarga forzada por enlace y `doc.save()` nativo — `usePdfGenerator.js`.
- `[fix]` **Layout Dinámico PDF**: Implementación de cálculo de alturas en tiempo real para evitar desbordamientos y solapamientos de texto en el manual — `usePdfGenerator.js`.
- `[fix]` **Crash de Deuda Kármica**: Reparación de `TypeError: title of undefined` mediante adición de metadatos faltantes en el diccionario — `interpretations.js`.
- `[refactor]` **UX de Reporte**: Normalización de nombres de archivo dinámicos y limpieza de caracteres especiales para compatibilidad con SO — `usePdfGenerator.js`.
- `[docs]` **Protocolo de Cierre**: Actualización de historial de avance y lecciones aprendidas (Sesión 7).

---

## 2026-04-05 — Sesión 6: Gematría, Reportes PDF y Orquestación "Cero Olvido" 📜
- `[feat]` **Gematría Sagrada**: Motor de cálculo y sección visual para Gematría Caldea, Simple y Hebrea.
- `[feat]` **Activo Maestro (PDF)**: Integración de `jsPDF` para manuales descargables personalizados.
- `[config]` **Protocolo Cero Olvido**: Commits de Git y síncrono con Notion tras cada avance significativo.
- `[docs]` **Log de Lecciones**: Historial acumulativo de aprendizajes en `.agents/history/session_lessons.md`.

---

## 2026-04-04 — Sesión 5: Geometría Sagrada y Visual Branding 🔮
- `[feat]` **Sacred Icon System**: Creación de una biblioteca propia de 14 iconos SVG manuales (Sol, Luna, Estrella de David, Lemniscata, etc.) con trazo fino dorado y animaciones `pulse`.
- `[refactor]` **Branding Unificado**: Eliminación total de emojis Unicode (☀️🌑🎯⚡) e iconos genéricos (+ − → ↓ ✦) en `NumberDetail.vue`, `SoulDashboard.vue` y `DivineLibrary.vue`.
- `[refactor]` **Optimización de Assets**: Reemplazo del icono PNG de Solfeggio por una versión SVG geométrica, reduciendo el peso de carga.
- `[feat]` **UI Animations**: Implementación de efectos de resplandor (`sacred-glow`) y animaciones sutiles para la iconografía sagrada.
- `[docs]` **Sincronización Final**: Protocolo de cierre de sesión con actualización de historial y Notion DB.

---

## 2026-04-04 — Sesión 4: Auditoría Maestra, Guion Espiritual y Calidad Visual
- `[feat]` **Guionista de la Consciencia**: Activación del motor de interpretación `interpretations.js` con significados de Luz/Sombra para números 1-11.
- `[feat]` **Activación Cuántica**: Implementación de códigos Grabovoi interactivos con efectos de sintonización y audio Solfeggio.
- `[fix]` **Auditoría Visual 2.0**: Eliminación del "fondo gris" mediante reubicación del portal y unificación de variables CSS.
- `[fix]` **Control de Escala**: Normalización de imágenes del Teorema de Pitágoras (máx 420px) e iconos de audio gigantes.
- `[fix]` **Estabilidad**: Reparación de errores SFC en `SoulDashboard.vue` y `DestinyPortal.vue` (Invalid end tags).
- `[test]` **Auditoría de Verdad**: Ejecución de 13 pruebas unitarias validando cálculos contra libros PDF oficiales.

---

## 2026-04-04 — Sesión 3: Estructura de Síntesis Maestra y Nuevas Fuentes

- `[feat]` Implementación del **Motor de Síntesis** unificado (Pitagórica + Omkin Kay) en la definición de agentes.
- `[feat]` Rediseño del **Ingeniero de Sonificación** con soporte para **Frecuencias Solfeggio** y afinación 432Hz profesional.
- `[feat]` Nuevo subagente: **Ingeniero de Prompts Visionario** para la generación de activos visuales mediante IA externa.
- `[feat]` Nuevas herramientas de cálculo: Creación de skills para **Omkin Kay (Tántrica)** y **Gematría Heb/Eng**.
- `[docs]` Actualización profunda de todos los agentes para reflejar las 17 nuevas fuentes del `/context`.
- `[docs]` Sincronización oficial iniciada con **Notion DB** para persistencia de la visión del proyecto.

---

## 2026-04-03 — Sesión 2: Arquitectura Master UI y Refactorización

- `[feat]` Implementado **Master UI Layout** con arquitectura de micro-componentes: `CosmicBackground`, `GlassHeader`, `DestinyPortal`, `SoulDashboard`, `DivineLibrary`.
- `[feat]` Integración de animaciones **GSAP** (stagger reveals, parallax, pulse effects) en toda la interfaz.
- `[feat]` Soporte avanzado de Internacionalización (`vue-i18n`) con persistencia en localStorage.
- `[fix]` Corregida lógica de `handleCalculation` en `App.vue` para el parseo exacto de fechas (Day/Month/Year).
- `[fix]` Añadido script `"test": "vitest"` en `package.json` para validación continua de QA.
- `[docs]` Creado `bugs_and_solutions.md` para documentar la incompatibilidad de Selenium con Chrome 131.
- `[cleanup]` Eliminación de experimentos fallidos de automatización (NotebookLM MCP) y audio para mantener la estabilidad del núcleo.

## 2026-04-03 — Sesión 1 (Update): Expansión de Arquitectura

## 2026-04-03 — Sesión 1 (Implementación Testing & Setup): ser33
- `[feat]` Implementadas las Suites de Pruebas Automáticas con Vitest (QA Expert) en `useNumerology.spec.js`.
- `[fix]` Añadida configuración en `.gitignore` para saltarse los archivos de env (`.env` local).
- `[config]` Archivos HTML y Package parseados para nombrar el proyecto con la identidad visual solicitada: **ser33**.
- `[config]` Inyectado todo el andamiaje al sistema de versionado Git en commit basal.
- `[docs]` Creado subagente Especialista en Documentación (Notion) — `.agents/agents/documentation_specialist.md`
- `[docs]` Creado subagente Animador Digital Especialista UI/UX — `.agents/agents/ui_ux_animator.md`
- `[tool]` Creado y ejecutado el script real en Node.js de subida a Notion — `scripts/sync-notion.js`
- `[tool]` Creado script para reportes push a Notion — `scripts/push-report.js`

### Internacionalización y SEO
- `[feat]` Instalado e integrado `vue-i18n`. Arquitectura multilingüe funcional con `es`/`en`.
- `[fix]` Configurado correctamente el SEO Local de Meta Descriptions y cambio a `<html lang="es">`.

### Infraestructura de Agentes
- `[docs]` Creado subagente QA Experto y Testing — `.agents/agents/qa_expert.md`
- `[docs]` Integración de plan publicitario y "Fuentes de Verdad" en el Plan de Implementación de Antigravity.

### Workflows
- `[docs]` Creado workflow de sincronización con Notion API — `.agents/workflows/sync-notion.md`

### Historia
- `[docs]` Actualizado el Estado del Proyecto (`project_status.md`) con las nuevas tareas de Fase 0 a Fase 5.

---

## 2026-04-03 — Sesión 1: Planificación Inicial de Agentes

### Infraestructura de Agentes
- `[docs]` Creado Agente Director del proyecto — `.agents/AGENT.md`
- `[docs]` Creado subagente Motor Numerológico — `.agents/agents/numerology_engine.md`
- `[docs]` Creado subagente Ingeniero de Sonificación — `.agents/agents/audio_engineer.md`
- `[docs]` Creado subagente Arquitecto de la Conciencia — `.agents/agents/consciousness_architect.md`
- `[docs]` Creado subagente Ingeniero de Seguridad — `.agents/agents/security_engineer.md`
- `[docs]` Creado subagente Estratega Digital — `.agents/agents/digital_strategist.md`
- `[docs]` Creado subagente Gestor de Monetización — `.agents/agents/monetization_manager.md`

### Skills
- `[docs]` Creado skill de Cálculos Numerológicos — `.agents/skills/numerology_calculations.md`
- `[docs]` Creado skill de Catálogo Grabovoi — `.agents/skills/grabovoi_sequences.md`
- `[docs]` Creado skill de Interpretaciones Numerológicas — `.agents/skills/numerology_interpretations.md`

### Workflows
- `[docs]` Creado workflow de Inicio de Sesión — `.agents/workflows/session-start.md`
- `[docs]` Creado workflow de Cierre de Sesión — `.agents/workflows/session-end.md`

### Historia
- `[docs]` Creado sistema de historial persistente — `.agents/history/`
- `[docs]` Creado resumen técnico para el equipo — `.agents/history/tech_summary.md`

### Investigación
- `[research]` Extracción de texto de 10 PDFs del contexto (40,895 caracteres)
- `[research]` Análisis de tabla pitagórica con soporte para Ñ
- `[research]` Consolidación de especificaciones técnicas de las fuentes

### Utilidades
- `[tool]` Script de extracción de PDFs — `_extract_context.js`
- `[deps]` Instalado `pdf-parse` y `pdfjs-dist` para lectura de fuentes
