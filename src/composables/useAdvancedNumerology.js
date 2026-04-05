// src/composables/useAdvancedNumerology.js
// Motor Numerológico Avanzado — 7 cálculos premium
// Fuentes: #1 Mi Numerología, #7 Scirica, #8 Slekis Riffel, #11 Deluxe Report

import { reduceToDigit } from './useNumerology.js';

const LETTER_VALUES = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
  J: 1, K: 2, L: 3, M: 4, N: 5, Ñ: 5, O: 6, P: 7, Q: 8, R: 9,
  S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8
};

/**
 * Reduce a single digit ONLY (no master number preservation).
 * Used for Challenges and some intermediate calculations.
 */
function reduceToSingleDigit(num) {
  let n = Math.abs(num);
  while (n > 9) {
    n = String(n).split('').reduce((s, d) => s + parseInt(d, 10), 0);
  }
  return n;
}

/**
 * Normaliza nombre para cálculos
 */
function normalizeName(name) {
  return name.toUpperCase().normalize('NFD')
    .replace(/[\u0300-\u0302\u0304-\u036f]/g, '');
}

// ═══════════════════════════════════════════════════
// 1. AÑO PERSONAL (Personal Year)
// Fórmula: Día_Nac + Mes_Nac + Año_Actual → reducir
// ═══════════════════════════════════════════════════
export function calcPersonalYear(birthDay, birthMonth, currentYear = new Date().getFullYear()) {
  const reducedDay = reduceToDigit(birthDay);
  const reducedMonth = reduceToDigit(birthMonth);
  let yearSum = 0;
  for (const digit of String(currentYear)) {
    yearSum += parseInt(digit, 10);
  }
  const reducedYear = reduceToDigit(yearSum);
  return reduceToDigit(reducedDay + reducedMonth + reducedYear);
}

// ═══════════════════════════════════════════════════
// 2. PINNACLES (4 Cimas de Vida)
// 1er Pinnacle: Mes + Día
// 2do Pinnacle: Día + Año
// 3er Pinnacle: 1er + 2do
// 4to Pinnacle: Mes + Año
// Duración: 1er = 36 - LifePath, luego 9 años cada uno
// ═══════════════════════════════════════════════════
export function calcPinnacles(day, month, year, lifePath) {
  const rDay = reduceToDigit(day);
  const rMonth = reduceToDigit(month);
  let yearSum = 0;
  for (const d of String(year)) yearSum += parseInt(d, 10);
  const rYear = reduceToDigit(yearSum);

  const p1 = reduceToDigit(rMonth + rDay);
  const p2 = reduceToDigit(rDay + rYear);
  const p3 = reduceToDigit(p1 + p2);
  const p4 = reduceToDigit(rMonth + rYear);

  // Timing
  const lp = typeof lifePath === 'number' ? lifePath : reduceToSingleDigit(lifePath);
  const firstEnd = 36 - lp;

  return [
    { value: p1, fromAge: 0,              toAge: firstEnd,      label: '1er Pinnacle' },
    { value: p2, fromAge: firstEnd + 1,    toAge: firstEnd + 9,  label: '2do Pinnacle' },
    { value: p3, fromAge: firstEnd + 10,   toAge: firstEnd + 18, label: '3er Pinnacle' },
    { value: p4, fromAge: firstEnd + 19,   toAge: 99,            label: '4to Pinnacle' }
  ];
}

// ═══════════════════════════════════════════════════
// 3. DESAFÍOS (4 Challenge Numbers)
// 1er Desafío: |Mes - Día|
// 2do Desafío: |Día - Año|
// 3er Desafío (Principal): |1er - 2do|
// 4to Desafío: |Mes - Año|
// Siempre reducir a single digit (sin maestros)
// ═══════════════════════════════════════════════════
export function calcChallenges(day, month, year, lifePath) {
  const rDay = reduceToSingleDigit(day);
  const rMonth = reduceToSingleDigit(month);
  let yearSum = 0;
  for (const d of String(year)) yearSum += parseInt(d, 10);
  const rYear = reduceToSingleDigit(yearSum);

  const c1 = Math.abs(rMonth - rDay);
  const c2 = Math.abs(rDay - rYear);
  const c3 = Math.abs(c1 - c2);
  const c4 = Math.abs(rMonth - rYear);

  // Same timing as pinnacles
  const lp = typeof lifePath === 'number' ? reduceToSingleDigit(lifePath) : reduceToSingleDigit(lifePath);
  const firstEnd = 36 - lp;

  return [
    { value: c1, fromAge: 0,              toAge: firstEnd,      label: '1er Desafío' },
    { value: c2, fromAge: firstEnd + 1,    toAge: firstEnd + 9,  label: '2do Desafío' },
    { value: c3, fromAge: firstEnd + 10,   toAge: firstEnd + 18, label: 'Desafío Principal' },
    { value: c4, fromAge: firstEnd + 19,   toAge: 99,            label: '4to Desafío' }
  ];
}

// ═══════════════════════════════════════════════════
// 4. NÚMERO DE MADUREZ
// Fórmula: Life Path + Destiny → reducir
// Se manifiesta a partir de los 35-40 años
// ═══════════════════════════════════════════════════
export function calcMaturityNumber(lifePath, destinyNumber) {
  return reduceToDigit(lifePath + destinyNumber);
}

// ═══════════════════════════════════════════════════
// 5. DEUDA KÁRMICA
// Detectar si 13, 14, 16 o 19 aparecen ANTES de reducir
// en cualquier posición de la carta numerológica
// ═══════════════════════════════════════════════════
export function detectKarmicDebt(day, month, year, fullName) {
  const KARMIC_NUMBERS = [13, 14, 16, 19];
  const debts = [];

  // Helper: suma sin reducir para detectar el número pre-reducción
  const sumDigits = (n) => String(n).split('').reduce((s, d) => s + parseInt(d, 10), 0);

  // Check Life Path pre-reduction
  const rDay = reduceToDigit(day);
  const rMonth = reduceToDigit(month);
  let yearSum = 0;
  for (const d of String(year)) yearSum += parseInt(d, 10);
  const rYear = reduceToDigit(yearSum);
  const lifePathRaw = rDay + rMonth + rYear;
  if (KARMIC_NUMBERS.includes(lifePathRaw)) {
    debts.push({ number: lifePathRaw, position: 'Camino de Vida', reducesTo: reduceToDigit(lifePathRaw) });
  }

  // Check Birthday
  if (KARMIC_NUMBERS.includes(day)) {
    debts.push({ number: day, position: 'Día de Nacimiento', reducesTo: reduceToDigit(day) });
  }

  // Check Expression/Destiny raw
  const normalized = normalizeName(fullName);
  let nameTotal = 0;
  for (const char of normalized) {
    nameTotal += LETTER_VALUES[char] || 0;
  }
  if (KARMIC_NUMBERS.includes(nameTotal)) {
    debts.push({ number: nameTotal, position: 'Número de Destino', reducesTo: reduceToDigit(nameTotal) });
  }

  // Check intermediate sums
  let vowelTotal = 0, consonantTotal = 0;
  const VOWELS = ['A', 'E', 'I', 'O', 'U'];
  for (const char of normalized) {
    if (VOWELS.includes(char)) {
      vowelTotal += LETTER_VALUES[char] || 0;
    } else if (LETTER_VALUES[char]) {
      consonantTotal += LETTER_VALUES[char] || 0;
    }
  }
  if (KARMIC_NUMBERS.includes(vowelTotal)) {
    debts.push({ number: vowelTotal, position: 'Número del Alma', reducesTo: reduceToDigit(vowelTotal) });
  }
  if (KARMIC_NUMBERS.includes(consonantTotal)) {
    debts.push({ number: consonantTotal, position: 'Número de Personalidad', reducesTo: reduceToDigit(consonantTotal) });
  }

  return debts;
}

// ═══════════════════════════════════════════════════
// 6. PASIÓN OCULTA (Hidden Passion)
// El número pitagórico que más veces aparece en tu nombre
// ═══════════════════════════════════════════════════
export function calcHiddenPassion(fullName) {
  const normalized = normalizeName(fullName);
  const freq = {};
  for (const char of normalized) {
    const val = LETTER_VALUES[char];
    if (val) {
      freq[val] = (freq[val] || 0) + 1;
    }
  }
  let maxCount = 0;
  let passion = 1;
  for (const [num, count] of Object.entries(freq)) {
    if (count > maxCount) {
      maxCount = count;
      passion = parseInt(num);
    }
  }
  return { number: passion, frequency: maxCount };
}

// ═══════════════════════════════════════════════════
// 7. YO SUBCONSCIENTE (Subconscious Self)
// Cuenta cuántos de los 9 números (1-9) están presentes
// en las letras de tu nombre. Máx = 9 (todas presentes)
// ═══════════════════════════════════════════════════
export function calcSubconsciousSelf(fullName) {
  const normalized = normalizeName(fullName);
  const present = new Set();
  for (const char of normalized) {
    const val = LETTER_VALUES[char];
    if (val) present.add(val);
  }
  return present.size;
}

// ═══════════════════════════════════════════════════
// COMPOSABLE EXPORT
// ═══════════════════════════════════════════════════
export function useAdvancedNumerology() {
  const getAdvancedReport = (day, month, year, fullName, lifePath, destinyNumber) => {
    const currentYear = new Date().getFullYear();
    return {
      personalYear: calcPersonalYear(day, month, currentYear),
      personalYearOf: currentYear,
      pinnacles: calcPinnacles(day, month, year, lifePath),
      challenges: calcChallenges(day, month, year, lifePath),
      maturity: calcMaturityNumber(lifePath, destinyNumber),
      karmicDebts: detectKarmicDebt(day, month, year, fullName),
      hiddenPassion: calcHiddenPassion(fullName),
      subconsciousSelf: calcSubconsciousSelf(fullName)
    };
  };

  return { getAdvancedReport };
}
