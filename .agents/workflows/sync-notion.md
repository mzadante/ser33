---
description: Flujo de trabajo para sincronizar la documentación oficial del proyecto desde Antigravity hacia Notion DB
---

# 📚 Workflow: Sync con Notion

Este workflow se ejecuta a demanda o al finalizar sesiones críticas para asegurar que los lineamientos, roles de agentes y fuentes de la verdad sean persistidos en la cuenta de Notion del equipo.

## Setup Inicial (Solo una vez)
Si el script aún no está implementado o le falta la variable de entorno:
1. Asegurarle al usuario que necesita su propio Integration Token.
2. Crear un archivo local `.env` o configurarlo en el OS: `NOTION_TOKEN` e `NOTION_PAGE_ID`.
3. Instalar la librería si no existe en las dependencias globales o del proyecto local: `npm install @notionhq/client`

## Ejecución del Script de Sincronización
// turbo
```
Correr el script (una vez creado) `node scripts/sync-notion.js`
```

## Validación Post-Sincronización
1. Consultar el status terminal para verificar qué archivos Markdown se enviaron.
2. Informar al usuario que sus archivos en `.agents/` y los changelogs se subieron como bloques a su página de Notion.

## Elementos a Sincronizar Prioritarios:
- `.agents/AGENT.md` (Visión y Director Principal)
- `.agents/history/project_status.md` (Avance global visual para Stakeholders)
- `.agents/history/tech_summary.md` (Para onboarding humano)
