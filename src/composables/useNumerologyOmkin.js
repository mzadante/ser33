import { computed } from 'vue';

/**
 * Motor Tántrico Omkin Kay (Base 11)
 * Fuente de Verdad: Skill omkin_kay_calculations.md
 */
export function useNumerologyOmkin() {
  
  /**
   * Reduce un número al rango 1-11 (Sistema Tántrico)
   */
  const reduceBase11 = (num) => {
    let n = parseInt(num);
    while (n > 11) {
      n = String(n).split('').reduce((sum, digit) => sum + parseInt(digit, 10), 0);
    }
    return n;
  };

  /**
   * Calcula los 5 factores de la fecha de nacimiento
   */
  const calculateOmkin = (birthDate) => {
    if (!birthDate) return null;
    
    const date = new Date(birthDate);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const yearStr = String(date.getUTCFullYear());
    const yearDigits = yearStr.split('').map(Number);
    const lastTwoDigits = parseInt(yearStr.slice(-2));

    const essence = reduceBase11(day);
    const karma = reduceBase11(month);
    const gift = reduceBase11(lastTwoDigits);
    const pastLives = reduceBase11(yearDigits.reduce((a, b) => a + b, 0));
    
    // Misión: Suma total de todos los dígitos
    const totalSum = String(day + '' + month + '' + yearStr)
      .split('')
      .map(Number)
      .reduce((a, b) => a + b, 0);
    const mission = reduceBase11(totalSum);

    return { essence, karma, gift, pastLives, mission };
  };

  return { calculateOmkin, reduceBase11 };
}
