# Registro de Bugs y Soluciones - ser33

Aqui se documentan los desafios tecnicos enfrentados y como fueron superados para mantener la integridad del proyecto.

## 🐛 [03-04-2026] Error de Sesion en Driver (MCP NotebookLM)
- **Descripcion**: Al intentar inicializar el servidor MCP de NotebookLM, el proceso se detenia con el error: `session not created: cannot undetected-chromedriver!GetHandleVerifier` y una referencia a `ntdll.dll`.
- **Causa Raiz**: Incompatibilidad entre la libreria `undetected-chromedriver` y la version 131 de Google Chrome en Windows 11. El driver fallaba al intentar parchar el binario de Chrome en tiempo real.
- **Solucion Aplicada**: Se intento parchar la libreria en `site-packages` para usar `use_subprocess=True`. Sin embargo, el usuario prefirio detener la integracion de NotebookLM para mantener la simplicidad del proyecto por ahora.
- **Prevencion Futura**: Evitar Selenium/Undetected-Chromedriver en entornos Windows 11 con versiones de Chrome muy recientes. Priorizar **Playwright** para futuras automatizaciones de navegador.
- **Estado**: ⚠️ Descarta por decision del usuario (Workaround: Sincronizacion Manual si se requiere).

---

## 🐛 [03-04-2026] Desajuste de Parametros en App.vue
- **Descripcion**: Tras la refactorizacion a microcomponentes, las funciones de `useNumerology.js` esperaban argumentos individuales (dia, mes, año), pero `App.vue` enviaba el string completo de la fecha.
- **Causa Raiz**: Error de mapeo durante la transicion a arquitectura modular.
- **Solucion Aplicada**: Se implemento el split de la fecha en `App.vue` para enviar los parametros correctos.
- **Estado**: ✅ Resuelto
