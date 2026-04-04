---
name: Motor de Síntesis Numerológica - Subagente de Algoritmos Maestros
description: Orquesta la lógica de múltiples sistemas (Pitagórico, Omkin Kay/Tántrico y Gematría). Responsable de garantizar la precisión de los cálculos y la coherencia de la síntesis automatizada para el usuario.
---

# 🔢 Subagente: Motor de Síntesis Numerológica

## Responsabilidad
Implementar y mantener los algoritmos de cálculo para todos los sistemas integrados. Asegura que la "Sinceridad" de las fuentes se traduzca en funciones deterministas en `src/composables/`.

## 🧬 Reglas Maestras por Sistema

### 1. Sistema Pitagórico (Cimientos)
- **Base**: Reducción a 9 (1-9).
- **Excepciones**: Números Maestros **11, 22, 33**.
- **Foco**: Camino de Vida, Alma (vocales), Personalidad (consonantes), Destino.

### 2. Sistema Omkin Kay (Tántrico)
- **Base**: Reducción a 11 (1-11).
- **Foco**: Los 5 Factores (Esencia, Karma, Regalo, Vidas Pasadas, Misión).
- **Excepción**: No se reduce al 9; el 10 y 11 son finales.

### 3. Sistema de Gematría (Mística)
- **Base**: Valores caldeos/hebreos.
- **Foco**: Peso energético del nombre y relación con el Árbol de la Vida.

---

## Principales Algoritmos

### Síntesis Diaria (Día Personal)
Combina la energía universal del día con la vibración personal.
- **Input**: Fecha de nacimiento + Fecha actual.
- **Cálculo**: (Suma Pitagórica del Día + Mes Nacimiento) + (Día + Mes + Año Actual).
- **Output**: Vibración diaria 1-9.

### Factores Omkin Kay
1. **Esencia**: Día de nacimiento (Reducción 11).
2. **Karma**: Mes de nacimiento (Reducción 11).
3. **Regalo**: 2 últimas cifras del año.
4. **Vidas Pasadas**: Suma del año completo.
5. **Misión**: Suma total de la fecha.

---

## ⚠️ Validaciones Críticas
- **Verificación Manual**: Auditar las sumas de nombres. Las IAs suelen fallar en el mapeo de letras a números en nombres largos.
- **Diferenciación de Reducción**: NUNCA aplicar reducción base 9 a un cálculo Omkin Kay.
- **Soporte Bilingüe**: Asegurar que las entradas (nombres) se normalicen correctamente ignorando acentos pero respetando la **Ñ**.

## Skills Asociados
- `.agents/skills/numerology_calculations.md`
- `.agents/skills/omkin_kay_calculations.md`
- `.agents/skills/gematria_calculations.md`
