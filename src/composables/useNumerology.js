// src/composables/useNumerology.js

// ==== TABLA PITAGÓRICA ====
// Incluye la letra Ñ, requerida para el idioma español
const LETTER_VALUES = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
  J: 1, K: 2, L: 3, M: 4, N: 5, Ñ: 5, O: 6, P: 7, Q: 8, R: 9,
  S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8
};

const VOWELS = ['A', 'E', 'I', 'O', 'U'];
const MASTER_NUMBERS = [11, 22, 33];

/**
 * Reduce un número a un solo dígito EXCEPTO si es un Número Maestro (11, 22, 33).
 * Fundamental para preservar las altas frecuencias vibratorias.
 * 
 * @param {number} num - El número a reducir
 * @returns {number} - El dígito reducido o el número maestro intacto
 */
export function reduceToDigit(num) {
  let current = num;
  while (current > 9 && !MASTER_NUMBERS.includes(current)) {
    current = String(current)
      .split('')
      .reduce((sum, digit) => sum + parseInt(digit, 10), 0);
  }
  return current;
}

/**
 * Calcula el Número de Camino de Vida (Life Path Number).
 * Suma por separado día, mes y año, respetando Números Maestros en el proceso.
 */
export function calcLifePath(day, month, year) {
  const reducedDay = reduceToDigit(day);
  const reducedMonth = reduceToDigit(month);
  
  // El año se suma dígito por dígito primero
  let yearSum = 0;
  for (let digit of String(year)) {
    yearSum += parseInt(digit, 10);
  }
  const reducedYear = reduceToDigit(yearSum);
  
  const total = reducedDay + reducedMonth + reducedYear;
  return reduceToDigit(total);
}

/**
 * Calcula el Número del Alma (Suma de Vocales).
 */
export function calcSoulNumber(fullName) {
  const normalized = fullName.toUpperCase().normalize('NFD')
    .replace(/[\u0300-\u0302\u0304-\u036f]/g, ''); // Remueve acentos pero no las letras como la eñe (Ñ) si se tratan con cuidado
  
  let total = 0;
  for (let char of normalized) {
    if (VOWELS.includes(char)) {
      total += LETTER_VALUES[char] || 0;
    }
  }
  return reduceToDigit(total);
}

/**
 * Calcula el Número de Personalidad (Suma de Consonantes).
 */
export function calcPersonalityNumber(fullName) {
  const normalized = fullName.toUpperCase();
  
  let total = 0;
  for (let char of normalized) {
    // Si la letra está en los valores y NO es una vocal conocida
    if (LETTER_VALUES[char] && !VOWELS.includes(char)) {
      total += LETTER_VALUES[char];
    }
  }
  return reduceToDigit(total);
}

/**
 * Calcula el Número de Destino (Alma + Personalidad).
 */
export function calcDestinyNumber(soul, personality) {
  return reduceToDigit(soul + personality);
}
