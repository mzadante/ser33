---
name: Cálculos de Gematría - Referencia de implementación
description: Skill con el mapeo de letras a valores numéricos hebreos y la lógica de síntesis para el análisis profundo del nombre completo.
---

# ✡️ Skill: Cálculos de Gematría

## Uso
Este skill contiene la **fuente de verdad** para implementar el motor `src/composables/useGematria.js`. Permite analizar el peso energético de las palabras y nombres en español/inglés a través de su equivalencia numérica hebrea.

---

## 🔡 Mapeo de Alfabeto (Sistema Caldeo/Místico)
Este sistema asigna valores del 1 al 8 a las letras, basándose en su sonido y vibración energética.

```javascript
const GEMATRIA_VALUES = {
  A: 1, B: 2, C: 3, D: 4, E: 5, U: 6, O: 7, F: 8,
  I: 1, K: 2, G: 3, M: 4, H: 5, V: 6, Z: 7, P: 8,
  J: 1, R: 2, L: 3, T: 4, N: 5, W: 6,  // Frecuencias adicionales
  Y: 1, Q: 1,                      // Frecuencias unitarias
};
```

---

## 📐 Algoritmo de Síntesis de Nombre
1.  **Valor del Nombre**: Suma de todos los valores de las letras del nombre.
2.  **Reducción**: Se suma hasta obtener un número entre 1-22 (asociado a los senderos del Árbol de la Vida).

```javascript
function calcGematriaTotal(name) {
  const normalized = name.toUpperCase().replace(/ /g, '');
  let total = 0;
  for (const char of normalized) {
    total += GEMATRIA_VALUES[char] || 0;
  }
  return total; // Se puede usar el total directo o reducir a 22.
}
```

---

## 🌳 Relación con el Árbol de la Vida (Sefirot)
Los resultados se vinculan con los 10 Sefirot y los 22 senderos:
- **1-10**: Manifestación directa de los Sefirot (Kether a Malkuth).
- **11-22**: Senderos de transición de consciencia.

*Referencia: Fuente #10 y #15 del Contexto.*
