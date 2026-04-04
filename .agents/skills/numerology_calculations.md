---
name: Cálculos Numerológicos - Referencia de implementación
description: Skill con la lógica exacta de cada algoritmo numerológico, incluyendo sistemas Pitagórico y Omkin Kay, reducción teosófica y validaciones.
---

# 🧮 Skill: Cálculos Numerológicos (Referencia Maestra de Síntesis)

## Uso
Este skill contiene la **fuente de verdad** para implementar los algoritmos en `src/composables/useNumerology.js` y `src/composables/useNumerologyOmkin.js`. Cada función debe seguir exactamente esta lógica para asegurar la "sinceridad" de la plataforma.

---

## 📐 1. Sistemas de Reducción

### A. Reducción Pitagórica (Base 9)
- **Uso**: Camino de Vida, Alma, Personalidad, Destino, Tránsitos.
- **Rango**: 1-9.
- **Excepciones Maestras**: **11, 22, 33**. NUNCA se reducen.
- **Lógica**: Suma recursiva de dígitos hasta alcanzar el rango o encontrar un número maestro.

### B. Reducción Omkin Kay / Tántrica (Base 11)
- **Uso**: Los 5 Factores (Esencia, Karma, Regalo, Vidas Pasadas, Misión).
- **Rango**: 1-11.
- **Excepciones**: Ninguna (el 10 y el 11 son números válidos e independientes en este sistema).
- **Lógica**: Si el número es > 11, se reduce sumando sus dígitos (Ej: 15 = 1+5 = **6** / 29 = 2+9 = **11**).

---

## 🔡 2. Tabla Pitagórica Completa (Incluye Ñ para español)

```javascript
const LETTER_VALUES = {
  'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9,
  'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'Ñ': 5, 'O': 6, 'P': 7, 'Q': 8, 'R': 9,
  'S': 1, 'T': 2, 'U': 3, 'V': 4, 'W': 5, 'X': 6, 'Y': 7, 'Z': 8
};

const VOWELS = ['A', 'E', 'I', 'O', 'U'];
const PITAGOREAN_MASTERS = [11, 22, 33];
```

## 🛠️ 3. Implementación de Algoritmos (Base 9 - Pitágora)

```javascript
/**
 * Reduce un número a un solo dígito EXCEPTO Números Maestros (11, 22, 33).
 */
function reduceBase9(num) {
  const MASTER_NUMBERS = [11, 22, 33];
  while (num > 9 && !MASTER_NUMBERS.includes(num)) {
    num = String(num).split('').reduce((sum, digit) => sum + parseInt(digit, 10), 0);
  }
  return num;
}
```

### Ejemplo de Validación Pitagórica
- `reduceBase9(29)` → 2+9 = **11** (Maestro) ✅
- `reduceBase9(33)` → **33** (Maestro) ✅

---

## 🛠️ 4. Implementación de Algoritmos (Base 11 - Omkin Kay)

```javascript
/**
 * Reduce un número al rango 1-11 (Omkin Kay).
 */
function reduceBase11(num) {
  while (num > 11) {
    num = String(num).split('').reduce((sum, digit) => sum + parseInt(digit, 10), 0);
  }
  return num;
}
```

### Ejemplo de Validación Omkin Kay
- `reduceBase11(29)` → 2+9 = **11** ✅
- `reduceBase11(15)` → 1+5 = **6** ✅

---

## 🧬 5. Funciones de Síntesis Avanzada

### Número de Camino de Vida
- **Método**: Reducir día, mes y año POR SEPARADO en Base 9, luego sumar y reducir final.

### Vibración Diaria
- **Fórmula**: (Reducción Base 9 de Día_Nac + Mes_Nac) + (Día_Actual + Mes_Actual + Año_Actual).

---

## ⚠️ Nota de Sinceridad
> "Las herramientas de IA generativa suelen cometer errores en sumas complejas de letras a números. Se requiere verificación manual o tests unitarios estrictos."
