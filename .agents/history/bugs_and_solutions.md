# Registro de Bugs y Soluciones - ser33

Aqui se documentan los desafios tecnicos enfrentados y como fueron superados para mantener la integridad del proyecto.

## 🐛 [05-04-2026] Desbordamiento y Corte sugerido de Texto en PDF
- **Descripción**: Las interpretaciones largas (Pinnacles, Desafíos) se cortaban o se solapaban en el reporte PDF descargable.
- **Causa Raíz**: Uso de contenedores de altura fija (`h = 60`) en `usePdfGenerator.js` que no consideraban el contenido real.
- **Solución Aplicada**: Implementación de un motor de layout dinámico que calcula la altura por cada bloque y gestiona saltos de página inteligentes.
- **Estado**: ✅ Resuelto

## 🐛 [05-04-2026] Fallo en Descarga de PDF (blob URL)
- **Descripción**: El manual no se descargaba correctamente; en su lugar, se abría una URL tipo `blob:http://localhost...` que fallaba en algunos navegadores.
- **Causa Raíz**: Uso de `window.open(blobUrl)` que es bloqueado por políticas de seguridad modernas o mal manejado por navegadores.
- **Solución Aplicada**: Implementación de descarga forzada mediante creación de un elemento `<a>` oculto con atributo `download` y limpieza de acentos en el nombre del archivo.
- **Estado**: ✅ Resuelto

## 🐛 [05-04-2026] Crash TypeError: Cannot read properties of undefined (reading 'title')
- **Descripción**: El generador de PDF fallaba al intentar imprimir la sección de Deudas Kármicas.
- **Causa Raíz**: Falta de la propiedad `title` en el diccionario `karmicDebtDetails` y acceso incorrecto a la propiedad `d.value` (debería ser `d.number`).
- **Solución Aplicada**: Se agregaron los títulos faltantes a `interpretations.js` y se corrigió el acceso a las propiedades en `usePdfGenerator.js`.
- **Estado**: ✅ Resuelto

---

## 🐛 [03-04-2026] Error de Sesion en Driver (MCP NotebookLM)
- **Descripción**: Al intentar inicializar el servidor MCP de NotebookLM, el proceso se detenia con el error: `session not created: cannot undetected-chromedriver!GetHandleVerifier`.
- **Solución Aplicada**: Se detuvo la integración de NotebookLM para priorizar la estabilidad de la App core.
- **Estado**: ⚠️ Descarta por decisión del usuario.

## 🐛 [03-04-2026] Desajuste de Parametros en App.vue
- **Estado**: ✅ Resuelto
