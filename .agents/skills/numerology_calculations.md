---
name: Cálculos Numerológicos - Referencia de implementación
description: Skill con la lógica exacta de cada algoritmo numerológico, incluyendo tabla pitagórica con Ñ, reducción teosófica, y ejemplos de validación paso a paso.
---

# 🧮 Skill: Cálculos Numerológicos (Referencia Maestra)

## Uso
Este skill contiene la **fuente de verdad** para implementar los algoritmos en `src/composables/useNumerology.js`. Cada función debe seguir exactamente esta lógica.

## Tabla Pitagórica Completa (Incluye Ñ para español)

```javascript
const LETTER_VALUES = {
  'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9,
  'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'Ñ': 5, 'O': 6, 'P': 7, 'Q': 8, 'R': 9,
  'S': 1, 'T': 2, 'U': 3, 'V': 4, 'W': 5, 'X': 6, 'Y': 7, 'Z': 8
};

const VOWELS = ['A', 'E', 'I', 'O', 'U'];
const MASTER_NUMBERS = [11, 22, 33];
```

## Algoritmo: Reducción Teosófica

```javascript
/**
 * Reduce un número a un solo dígito EXCEPTO Números Maestros (11, 22, 33).
 * @param {number} num - Número a reducir
 * @returns {number} - Resultado entre 1-9 o 11, 22, 33
 */
function reduceToDigit(num) {
  while (num > 9 && !MASTER_NUMBERS.includes(num)) {
    num = String(num)
      .split('')
      .reduce((sum, digit) => sum + parseInt(digit, 10), 0);
  }
  return num;
}
```

### Ejemplo de Validación
- `reduceToDigit(29)` → 2+9 = **11** → NO se reduce (Maestro) ✅
- `reduceToDigit(38)` → 3+8 = **11** → NO se reduce ✅
- `reduceToDigit(47)` → 4+7 = **11** → NO se reduce ✅
- `reduceToDigit(25)` → 2+5 = **7** ✅
- `reduceToDigit(33)` → **33** (Maestro) ✅
- `reduceToDigit(44)` → 4+4 = **8** (44 NO es maestro) ✅

---

## Algoritmo: Número de Camino de Vida

```javascript
/**
 * Calcula el Número de Camino de Vida a partir de la fecha de nacimiento.
 * MÉTODO: Reducir día, mes y año POR SEPARADO, luego sumar.
 * 
 * @param {number} day - Día de nacimiento
 * @param {number} month - Mes de nacimiento
 * @param {number} year - Año de nacimiento
 * @returns {number} - Camino de Vida (1-9, 11, 22, 33)
 */
function calcLifePath(day, month, year) {
  const reducedDay = reduceToDigit(day);
  const reducedMonth = reduceToDigit(month);
  const reducedYear = reduceToDigit(
    String(year).split('').reduce((s, d) => s + parseInt(d), 0)
  );
  const total = reducedDay + reducedMonth + reducedYear;
  return reduceToDigit(total);
}
```

### Ejemplo Paso a Paso
**Fecha:** 29 de noviembre de 1990
1. Día: 29 → 2+9 = **11** (Maestro, no reducir)
2. Mes: 11 → **11** (Maestro, no reducir)
3. Año: 1990 → 1+9+9+0 = 19 → 1+9 = **10** → 1+0 = **1**
4. Total: 11 + 11 + 1 = **23** → 2+3 = **5**
5. **Camino de Vida: 5**

---

## Algoritmo: Número del Alma (Vocales)

```javascript
/**
 * Calcula el Número del Alma usando SOLO las vocales del nombre legal.
 * Las vocales representan el "aliento y espíritu" — los deseos internos.
 * 
 * @param {string} fullName - Nombre legal completo
 * @returns {{ number: number, vowels: string[], values: number[] }}
 */
function calcSoulNumber(fullName) {
  const normalized = fullName.toUpperCase().normalize('NFD')
    .replace(/[\u0300-\u0302\u0304-\u036f]/g, ''); // Quitar acentos EXCEPTO Ñ
  
  const vowels = [];
  const values = [];
  
  for (const char of normalized) {
    // Restaurar Ñ si fue descompuesta
    if (VOWELS.includes(char)) {
      vowels.push(char);
      values.push(LETTER_VALUES[char]);
    }
  }
  
  const total = values.reduce((sum, v) => sum + v, 0);
  return { number: reduceToDigit(total), vowels, values };
}
```

### Ejemplo
**Nombre:** "María García López"
- Vocales: A(1), I(9), A(1), A(1), I(9), A(1), O(6), E(5)
- Suma: 1+9+1+1+9+1+6+5 = **33** 
- **Número del Alma: 33** (Maestro, no reducir) ✅

---

## Algoritmo: Número de Personalidad (Consonantes)

```javascript
/**
 * Calcula el Número de Personalidad usando SOLO las consonantes del nombre.
 * Las consonantes representan la "máscara" — cómo el mundo percibe al individuo.
 * 
 * @param {string} fullName - Nombre legal completo
 * @returns {{ number: number, consonants: string[], values: number[] }}
 */
function calcPersonalityNumber(fullName) {
  const normalized = fullName.toUpperCase();
  const consonants = [];
  const values = [];
  
  for (const char of normalized) {
    if (LETTER_VALUES[char] && !VOWELS.includes(char)) {
      consonants.push(char);
      values.push(LETTER_VALUES[char]);
    }
  }
  
  const total = values.reduce((sum, v) => sum + v, 0);
  return { number: reduceToDigit(total), consonants, values };
}
```

---

## Algoritmo: Número de Destino

```javascript
/**
 * Síntesis total: Alma + Personalidad.
 * 
 * @param {number} soulNumber - Número del Alma
 * @param {number} personalityNumber - Número de Personalidad
 * @returns {number}
 */
function calcDestinyNumber(soulNumber, personalityNumber) {
  return reduceToDigit(soulNumber + personalityNumber);
}
```

---

## Algoritmo: Día Personal

```javascript
/**
 * Calcula la vibración del día actual para el usuario.
 * 
 * @param {number} birthDay - Día de nacimiento
 * @param {number} birthMonth - Mes de nacimiento
 * @param {Date} today - Fecha actual
 * @returns {number} - Vibración del día (1-9)
 */
function calcPersonalDay(birthDay, birthMonth, today = new Date()) {
  const currentDay = today.getDate();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();
  
  const total = birthDay + birthMonth + currentDay + currentMonth + currentYear;
  return reduceToDigit(total);
}
```

---

## Algoritmo: Año Personal

```javascript
/**
 * Calcula en qué posición del ciclo de 9 años está el usuario.
 * Contexto 2026: Año Universal 1 (inicio de nueva era).
 * 
 * @param {number} birthDay - Día de nacimiento
 * @param {number} birthMonth - Mes de nacimiento
 * @param {number} currentYear - Año actual (default: 2026)
 * @returns {number} - Año Personal (1-9, 11, 22)
 */
function calcPersonalYear(birthDay, birthMonth, currentYear = 2026) {
  const yearDigits = String(currentYear).split('').reduce((s, d) => s + parseInt(d), 0);
  const total = reduceToDigit(birthDay) + reduceToDigit(birthMonth) + reduceToDigit(yearDigits);
  return reduceToDigit(total);
}
```

---

## Algoritmo: Teorema de Pitágoras (Etapas de Vida)

```javascript
/**
 * Divide la vida en 3 grandes etapas representadas como cuadrados
 * que forman un triángulo divino.
 * 
 * @param {number} currentAge - Edad actual del usuario
 * @returns {{ stage: number, stages: object[], currentStage: object }}
 */
function calcPythagorasStages(currentAge) {
  const stages = [
    { id: 1, name: 'Formación', from: 0, to: 27, element: 'Fuego/Tierra',
      description: 'Período de aprendizaje, formación de identidad y raíces.' },
    { id: 2, name: 'Producción', from: 27, to: 54, element: 'Aire/Agua',
      description: 'Período de creación, construcción profesional y madurez.' },
    { id: 3, name: 'Cosecha', from: 54, to: 81, element: 'Oro/Espíritu',
      description: 'Período de sabiduría, legado y trascendencia espiritual.' }
  ];
  
  const currentStage = stages.find(s => currentAge >= s.from && currentAge < s.to) || stages[2];
  return { stage: currentStage.id, stages, currentStage };
}
```

## ⚠️ Nota Crítica de las Fuentes
> "Las herramientas de IA generativa suelen cometer errores en sumas complejas de letras a números. El equipo de desarrollo debe **verificar manualmente** las reducciones de nombres."

**Tests unitarios son OBLIGATORIOS** para cada función con al menos 5 casos de prueba verificados manualmente.
