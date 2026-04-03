---
name: Catálogo de Secuencias Grabovoi - Referencia verificada
description: Skill con el catálogo completo de secuencias de Grabovoi extraídas y verificadas manualmente desde las fuentes. Incluye formato correcto con espacios, categorías y guía de activación.
---

# 🔮 Skill: Catálogo de Secuencias Grabovoi

## Uso
Referencia para implementar la librería de constantes en `src/composables/useGrabovoi.js`. Cada secuencia fue extraída directamente de las fuentes del proyecto.

## ⚠️ Regla Crítica
> "El sistema debe respetar los **espacios** dentro de las secuencias, ya que cada número y su orden generan una frecuencia vibratoria específica. Verificar manualmente cada secuencia antes de la carga masiva."

## Catálogo Verificado

```javascript
export const GRABOVOI_SEQUENCES = {
  // === SALUD Y BIENESTAR ===
  salud_eterna: {
    code: '189 9999',
    category: 'salud',
    name: 'Salud Eterna',
    description: 'Prevención de enfermedades y salud óptima',
    activation: 'Repetir mentalmente como una varita mágica ante urgencia',
    mode: 'urgente',  // puede activarse inmediatamente
    premium: true
  },

  // === ABUNDANCIA Y ÉXITO ===
  dinero_inesperado: {
    code: '520',
    category: 'abundancia',
    name: 'Dinero Inesperado',
    description: 'Atracción de abundancia económica inesperada',
    activation: 'Repetir con intención y respiración profunda',
    mode: 'meditacion',
    premium: true
  },
  prosperidad_largo_plazo: {
    code: '7 1 2 7 3 2 1 8 9 3',
    category: 'abundancia',
    name: 'Prosperidad a Largo Plazo',
    description: 'Construcción sostenida de riqueza y éxito',
    activation: 'Meditación diaria de 5 minutos con la secuencia',
    mode: 'meditacion',
    premium: true
  },

  // === RESOLUCIÓN DE CONFLICTOS ===
  remover_obstaculos: {
    code: '91688',
    category: 'resolucion',
    name: 'Remover Obstáculos',
    description: 'Eliminar bloqueos y barreras en el camino',
    activation: 'Decir mental o verbalmente ante un obstáculo',
    mode: 'urgente',
    premium: false  // GRATUITA — secuencia de enganche
  },
  cambio_animo: {
    code: '1888 948',
    category: 'resolucion',
    name: 'Cambio Rápido de Ánimo',
    description: 'Transición rápida de estado negativo a positivo',
    activation: 'Repetir 3 veces con intención firme',
    mode: 'urgente',
    premium: true
  },

  // === MANIFESTACIÓN UNIVERSAL ===
  todo_es_posible: {
    code: '519 7148',
    category: 'manifestacion',
    name: 'Todo es Posible',
    description: 'Activación de fe y posibilidad infinita',
    activation: 'Meditar visualizando el resultado deseado',
    mode: 'meditacion',
    premium: true
  },

  // === CONEXIÓN Y GRATITUD ===
  conexion_creador: {
    code: '11981',
    category: 'conexion',
    name: 'Conexión con el Creador',
    description: 'Fortalecer vínculo espiritual universal',
    activation: 'En estado de quietud, repetir con reverencia',
    mode: 'meditacion',
    premium: true
  },
  gratitud: {
    code: '5 4 8 1 2 3',
    category: 'conexion',
    name: 'Gratitud Universal',
    description: 'Activar estado de agradecimiento profundo',
    activation: 'Repetir al despertar o antes de dormir',
    mode: 'meditacion',
    premium: false  // GRATUITA — secuencia de enganche
  }
};
```

## Modos de Activación (UX)

### Modo Urgente (`mode: 'urgente'`)
- Botón "Activar ahora" prominente
- Secuencia se muestra grande en pantalla
- Instrucción: "Dilo mentalmente como una varita mágica"
- Sin temporizador, activación instantánea

### Modo Meditación (`mode: 'meditacion'`)
- Entorno visual relajado (fondo oscuro, esfera dorada pulsante)
- Temporizador configurable (3, 5, 10 minutos)
- Frecuencia sonora de fondo (432Hz ajustada al Día Personal)
- Instrucción: "Respira profundo y repite el código con intención"
- Guía de respiración visual (inhalar 4s, sostener 4s, exhalar 4s)

## Sugerencia Inteligente por Día Personal
```javascript
// Si el usuario está en un Día 8 (negocios), priorizar secuencia 520
const DAY_SUGGESTIONS = {
  1: 'todo_es_posible',      // Día de inicios → manifestación
  2: 'gratitud',             // Día de cooperación → gratitud
  3: 'prosperidad_largo_plazo', // Día de expresión → prosperidad
  4: 'remover_obstaculos',   // Día de estructura → quitar bloqueos
  5: 'cambio_animo',         // Día de cambio → transformar ánimo
  6: 'conexion_creador',     // Día de armonía → conexión espiritual
  7: 'salud_eterna',         // Día de introspección → salud
  8: 'dinero_inesperado',    // Día de poder/negocios → abundancia
  9: 'gratitud',             // Día de cierre → agradecimiento
};
```

## Inclusión en el Reporte PDF
La "Guía de Pilotaje Personalizada" del PDF debe incluir:
1. Secuencias que el usuario consultó durante la sesión
2. Secuencia recomendada según su Año Personal
3. Instrucciones de activación para cada una
