---
description: Protocolo obligatorio para iniciar cada sesión de trabajo en el proyecto Manual del Destino
---

# 🚀 Workflow: Inicio de Sesión

Este workflow es **OBLIGATORIO** al iniciar cada sesión de trabajo.

## Pasos

1. **Leer el estado actual del proyecto**
// turbo
```
Abrir y leer el archivo `.agents/history/project_status.md`
```

2. **Leer el historial de cambios recientes**
// turbo
```
Abrir y leer el archivo `.agents/history/changelog.md`
```

3. **Revisar bugs y problemas conocidos**
// turbo
```
Abrir y leer el archivo `.agents/history/bugs_and_solutions.md`
```

4. **Identificar la fase actual**
```
Según el project_status.md, determinar:
- ¿En qué fase estamos? (1-5)
- ¿Qué tareas están pendientes?
- ¿Hay bloqueos o dependencias?
```

5. **Reportar al usuario**
```
Informar al usuario de forma concisa:
- Estado del proyecto (fase actual, % completado)
- Últimos cambios realizados
- Bugs pendientes
- Propuesta de tareas para esta sesión
```

6. **Confirmar prioridades**
```
Preguntar al usuario qué quiere abordar en esta sesión antes de comenzar.
```
