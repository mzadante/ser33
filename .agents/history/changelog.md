# 📝 Changelog — Manual del Destino

> Registro cronológico de todos los cambios realizados en el proyecto.  
> Formato: `[CATEGORÍA] Descripción — Archivo(s) afectado(s)`

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
