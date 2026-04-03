import { describe, it, expect } from 'vitest';
import { 
  reduceToDigit, 
  calcLifePath, 
  calcSoulNumber, 
  calcPersonalityNumber, 
  calcDestinyNumber 
} from '../useNumerology.js';

describe('useNumerology.js - Motor de Cálculo Determinista', () => {

  describe('reduceToDigit (Reducción Teosófica)', () => {
    it('debe reducir a un solo dígito simple correctamente', () => {
      expect(reduceToDigit(25)).toBe(7);  // 2+5 = 7
      expect(reduceToDigit(19)).toBe(1);  // 1+9 = 10 -> 1+0 = 1
      expect(reduceToDigit(44)).toBe(8);  // 4+4 = 8 (44 no es maestro)
    });

    it('NUNCA debe reducir los Números Maestros (11, 22, 33)', () => {
      expect(reduceToDigit(29)).toBe(11); // 2+9 = 11 -> SE DETIENE
      expect(reduceToDigit(38)).toBe(11); // 3+8 = 11
      expect(reduceToDigit(47)).toBe(11); // 4+7 = 11
      expect(reduceToDigit(22)).toBe(22); // 22 -> SE DETIENE
      expect(reduceToDigit(33)).toBe(33); // 33 -> SE DETIENE
    });
  });

  describe('calcLifePath (Camino de Vida)', () => {
    it('debe calcular correctamente la fecha: 29 de noviembre de 1990', () => {
      // 29 -> 11
      // 11 -> 11
      // 1990 -> 19 -> 10 -> 1
      // 11 + 11 + 1 = 23 -> 5
      expect(calcLifePath(29, 11, 1990)).toBe(5);
    });

    it('debe mantener resultados si el total final es Maestro', () => {
      // Buscamos un caso real: 1 de Enero del 2007
      // 1 -> 1
      // 1 -> 1
      // 2007 -> 9
      // Total = 11 (Maestro)
      expect(calcLifePath(1, 1, 2007)).toBe(11);
    });
  });

  describe('calcSoulNumber (Suma Pitagórica de Vocales)', () => {
    it('debe calcular las vocales correctamente ignorando consonantes', () => {
      // "Maria": A(1)+I(9)+A(1) = 11 (Maestro)
      expect(calcSoulNumber('Maria')).toBe(11);
    });

    it('debe calcular correctamente con nombres que tienen acentos diacríticos', () => {
      // "María" debe tratar 'í' como 'I'(9)
      expect(calcSoulNumber('María')).toBe(11);
    });
  });

  describe('calcPersonalityNumber (Suma de Consonantes con letra Ñ)', () => {
    it('Suma pitagórica funciona con la letra especial Ñ', () => {
      // "IÑAKI" -> Consonantes: Ñ=5, K=2. Sum = 7.
      expect(calcPersonalityNumber('IÑAKI')).toBe(7);
    });
    
    it('Ignora los espacios en el nombre', () => {
      // "D V" -> D=4, V=4. Sum = 8
      expect(calcPersonalityNumber('D V')).toBe(8);
    });
  });

  describe('calcDestinyNumber (Alma + Personalidad)', () => {
    it('Suma el Alma y Personalidad reduciéndola adecuadamente', () => {
      // Si Alma = 11 (Maestro) y Personalidad = 7
      // Destino = 11 + 7 = 18 -> 9
      expect(calcDestinyNumber(11, 7)).toBe(9);
    });
  });

});
