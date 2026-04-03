---
name: Motor Numerológico - Subagente de Algoritmos Deterministas
description: Implementa toda la lógica de cálculo numerológico pitagórico. Responsable de los algoritmos para Camino de Vida, Alma, Personalidad, Destino, Día Personal, Año Personal y Teorema de Pitágoras. Garantiza que los Números Maestros (11, 22, 33) NUNCA se reduzcan.
---

# 🔢 Subagente: Motor Numerológico

## Responsabilidad
Implementar y mantener los algoritmos deterministas de cálculo numerológico en `src/composables/useNumerology.js`.

## Regla Crítica
> **Los Números Maestros 11, 22 y 33 NUNCA se reducen a un solo dígito.** Estos representan niveles superiores de conciencia y frecuencias vibratorias intensas.

## Tabla de Valores (Pitagórica con Ñ)
```javascript
const LETTER_VALUES = {
  A:1, B:2, C:3, D:4, E:5, F:6, G:7, H:8, I:9,
  J:1, K:2, L:3, M:4, N:5, Ñ:5, O:6, P:7, Q:8, R:9,
  S:1, T:2, U:3, V:4, W:5, X:6, Y:7, Z:8
};
```

## Algoritmos a Implementar

### 1. Número de Camino de Vida (Life Path)
- **Input**: Fecha de nacimiento (DD/MM/YYYY)
- **Proceso**: Sumar cada componente (día, mes, año) por separado, luego sumar los resultados
- **Reducción**: Reducir a dígito único EXCEPTO si el resultado es 11, 22 o 33
- **Output**: Número entre 1-9 o 11, 22, 33
- **Significado**: Misión principal y lecciones de vida

### 2. Número del Alma (Soul Number)
- **Input**: Nombre legal completo
- **Proceso**: Extraer SOLO las vocales (A=1, E=5, I=9, O=6, U=3)
- **Reducción**: Sumar valores y reducir respetando Números Maestros
- **Output**: Número que representa deseos internos y esencia espiritual
- **Nota**: Las vocales representan el "aliento y espíritu" del nombre

### 3. Número de Personalidad
- **Input**: Nombre legal completo
- **Proceso**: Extraer SOLO las consonantes y mapear según tabla pitagórica
- **Reducción**: Sumar valores y reducir respetando Números Maestros
- **Output**: Número que representa la "máscara" o cómo el mundo percibe al individuo

### 4. Número de Destino
- **Input**: Resultado de Alma + Personalidad
- **Proceso**: Suma directa de los dos números resultantes
- **Reducción**: Reducir respetando Números Maestros
- **Output**: Síntesis total del nombre completo

### 5. Día Personal
- **Input**: Fecha de nacimiento + Fecha actual
- **Proceso**: Sumar día de nacimiento + mes de nacimiento + fecha actual completa
- **Reducción**: Reducir a dígito único (1-9)
- **Output**: Vibración del día (ej. Día 8 = ideal para negocios, Día 9 = cerrar ciclos)

### 6. Año Personal
- **Input**: Día de nacimiento, mes de nacimiento, año actual
- **Proceso**: Sumar día + mes de nacimiento + año actual (2+0+2+6 = 10 = 1)
- **Reducción**: Reducir respetando Números Maestros
- **Output**: En qué posición del ciclo de 9 años está el usuario
- **Contexto 2026**: Año Universal 1 (inicio de nueva era de 9 años)

### 7. Teorema de Pitágoras (Etapas de Vida)
- **Proceso**: Dividir la vida en 3 etapas:
  - Etapa 1: 0-27 años (Formación)
  - Etapa 2: 27-54 años (Producción)
  - Etapa 3: 54-81 años (Cosecha)
- **Visualización**: Cuadrados que forman un triángulo divino
- **Output**: Objeto con descripción de cada etapa y posición actual del usuario

## Función de Reducción Teosófica
```javascript
function reduceToDigit(num) {
  // Números Maestros NUNCA se reducen
  const MASTER_NUMBERS = [11, 22, 33];
  while (num > 9 && !MASTER_NUMBERS.includes(num)) {
    num = String(num).split('').reduce((sum, d) => sum + parseInt(d), 0);
  }
  return num;
}
```

## Validaciones Obligatorias
- Verificar manualmente las reducciones de nombres (las IAs suelen cometer errores en sumas complejas de letras a números — fuente directa de las especificaciones)
- Tests unitarios para CADA algoritmo con casos conocidos
- Cobertura especial para nombres con Ñ y caracteres hispanos
- Test específico: verificar que 11, 22 y 33 NO se reducen

## Skill Asociado
- Leer `.agents/skills/numerology_calculations.md` para la referencia de implementación detallada
