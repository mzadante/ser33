import { describe, it, expect } from 'vitest';
import { useNumerologyOmkin } from '../useNumerologyOmkin';
import { reduceToDigit, calcLifePath } from '../useNumerology';

describe('Auditoría de Verdad Numerológica', () => {
  
  describe('Sistema Tántrico Omkin Kay (Fuente #9)', () => {
    const { calculateOmkin } = useNumerologyOmkin();

    it('Debe calcular correctamente el caso ejemplo del libro (20/11/1976)', () => {
      const results = calculateOmkin('1976-11-20');
      
      // Validaciones basadas en la página 11 del PDF #9
      expect(results.essence).toBe(2);     // 2+0
      expect(results.karma).toBe(11);      // Noviembre es 11 (No se reduce si es <= 11)
      expect(results.gift).toBe(4);       // 7+6 = 13 -> 4
      expect(results.pastLives).toBe(5);  // 1+9+7+6 = 23 -> 5
      expect(results.mission).toBe(9);    // 2+0+11+7+6 = 26? Espera, la suma del libro es 36 -> 9
    });

    it('Debe respetar la base 11 (No reducir 10 ni 11)', () => {
      const { reduceBase11 } = useNumerologyOmkin();
      expect(reduceBase11(10)).toBe(10);
      expect(reduceBase11(11)).toBe(11);
      expect(reduceBase11(12)).toBe(3);
    });
  });

  describe('Sistema Pitagórico (Fuente #4)', () => {
    it('Debe calcular correctamente el Camino de Vida', () => {
      // Ejemplo: 5 de Mayo de 1945 -> 5 + 5 + (1+9+4+5=19=10=1) = 5+5+1 = 11
      expect(calcLifePath(5, 5, 1945)).toBe(11);
    });

    it('Debe respetar los Números Maestros 11, 22, 33', () => {
      expect(reduceToDigit(11)).toBe(11);
      expect(reduceToDigit(22)).toBe(22);
      expect(reduceToDigit(33)).toBe(33);
    });
  });
});
