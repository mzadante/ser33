// src/composables/useGematria.js

/**
 * Tablas de Gematría para el Manual del Destino
 * 
 * 1. Caldea (Vibracional 1-8)
 * 2. Simple/Inglesa (A=1...Z=26)
 * 3. Hebrea (Mapeo Fonético Latín a Valores Sagrados)
 */

const CHALDEAN_TABLE = {
  A: 1, I: 1, J: 1, Q: 1, Y: 1,
  B: 2, K: 2, R: 2,
  C: 3, G: 3, L: 3, S: 3,
  D: 4, M: 4, T: 4,
  E: 5, H: 5, N: 5, X: 5,
  U: 6, V: 6, W: 6,
  O: 7, Z: 7,
  F: 8, P: 8,
  Ñ: 5 // Mapeo para español (sonido N)
};

const HEBREW_MAPPING = {
  A: 1,   // Aleph
  B: 2,   // Bet
  C: 3,   // Gimel
  D: 4,   // Dalet
  E: 5,   // He
  F: 8,   // Het (Sonido F/H)
  G: 3,   // Gimel
  H: 8,   // Het
  I: 10,  // Yod
  J: 10,  // Yod
  K: 20,  // Kaf
  L: 30,  // Lamed
  M: 40,  // Mem
  N: 50,  // Nun
  Ñ: 50,  // Nun
  O: 70,  // Ayin
  P: 80,  // Pe
  Q: 100, // Kof
  R: 200, // Resh
  S: 60,  // Samekh
  T: 9,   // Tet
  U: 6,   // Vav
  V: 6,   // Vav
  W: 6,   // Vav
  X: 60,  // Samekh (Sonido S/X)
  Y: 10,  // Yod
  Z: 7    // Zayin
};

export function useGematria() {
  
  /**
   * Limpia y normaliza el nombre
   */
  const normalize = (name) => {
    return name.toUpperCase()
      .normalize('NFD')
      .replace(/[\u0300-\u0302\u0304-\u036f]/g, '');
  };

  /**
   * 1. Cálculo Caldeo (Resultados 1-52/90 comunes)
   */
  const calculateChaldean = (name) => {
    const cleanName = normalize(name);
    let total = 0;
    for (const char of cleanName) {
      total += CHALDEAN_TABLE[char] || 0;
    }
    return total;
  };

  /**
   * 2. Gematría Simple (A=1, B=2...)
   */
  const calculateSimple = (name) => {
    const cleanName = normalize(name);
    let total = 0;
    for (const char of cleanName) {
      if (char >= 'A' && char <= 'Z') {
        total += char.charCodeAt(0) - 64;
      }
    }
    return total;
  };

  /**
   * 3. Gematría Hebrea Fonética
   */
  const calculateHebrew = (name) => {
    const cleanName = normalize(name);
    let total = 0;
    for (const char of cleanName) {
      total += HEBREW_MAPPING[char] || 0;
    }
    return total;
  };

  /**
   * Genera el reporte completo de Gematría para un nombre
   */
  const getGematriaReport = (name) => {
    if (!name) return null;
    
    return {
      chaldean: calculateChaldean(name),
      simple: calculateSimple(name),
      hebrew: calculateHebrew(name),
      name: name
    };
  };

  return {
    getGematriaReport,
    normalize
  };
}
