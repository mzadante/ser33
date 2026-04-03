---
description: Protocolo obligatorio para cerrar cada sesión de trabajo y guardar el contexto del proyecto
---

# 🔒 Workflow: Cierre de Sesión

Este workflow es **OBLIGATORIO** antes de finalizar cada sesión de trabajo.

## Pasos

1. **Recopilar lo realizado en esta sesión**
```
Listar TODOS los cambios realizados:
- Archivos creados
- Archivos modificados
- Funcionalidades implementadas
- Tests agregados
- Problemas resueltos
```

2. **Actualizar el estado del proyecto**
```
Editar `.agents/history/project_status.md` con:
- Fecha de la sesión
- Fase actual
- Porcentaje de avance estimado
- Tareas completadas (marcar con [x])
- Tareas pendientes
- Próximos pasos recomendados
- Bloqueos o dependencias identificadas
```

3. **Registrar cambios en el changelog**
```
Agregar al inicio de `.agents/history/changelog.md`:
- Fecha y hora
- Lista de cambios con categoría (feat/fix/docs/refactor)
- Archivos afectados
- Descripción breve de cada cambio
```

4. **Documentar bugs y soluciones (si aplica)**
```
Si hubo bugs durante la sesión, agregar a `.agents/history/bugs_and_solutions.md`:
- Descripción del problema
- Causa raíz
- Solución aplicada
- Prevención futura
- Estado: ✅ Resuelto / ⚠️ Workaround / ❌ Pendiente
```

5. **Confirmar con el usuario**
```
Mostrar resumen al usuario:
"Resumen de sesión guardado:
- X cambios registrados
- Fase actual: [N]
- Próximos pasos: [lista]
¿Es correcto?"
```

6. **Commit del historial (opcional)**
```
Si el usuario lo desea, hacer commit de los archivos de historial:
git add .agents/history/
git commit -m "session: [fecha] - [resumen breve]"
```
