---
name: Cálculos Omkin Kay (Tántricos) - Referencia de implementación
description: Skill con la lógica exacta de los 5 factores de la numerología Omkin Kay (Esencia, Karma, Regalo, Vidas Pasadas, Misión) y sus reglas de reducción base 11.
---

# 🧘 Skill: Cálculos Omkin Kay (Tántricos)

## Uso
Este skill contiene la **fuente de verdad** para implementar el motor `src/composables/useNumerologyOmkin.js`. Se basa en la reducción base 11 y el análisis de los 5 cuadrantes energéticos.

---

## 📐 Regla de Reducción Base 11
En este sistema, se conservan los números del **1 al 11**. Cualquier número mayor a 11 se reduce sumando sus dígitos.

```javascript
function reduceBase11(num) {
  while (num > 11) {
    num = String(num).split('').reduce((sum, digit) => sum + parseInt(digit, 10), 0);
  }
  return num;
}
```

---

## 🧬 Los 5 Factores (Cuadrantes)

### 1. Esencia (Quién soy por dentro)
- **Cálculo**: Día de nacimiento.
- **Reducción**: `reduceBase11(day)`.
- **Significado**: Motivación interna, lo que eres cuando estás solo.

### 2. Karma / Personalidad (Cómo me ven/Ego)
- **Cálculo**: Mes de nacimiento.
- **Reducción**: `reduceBase11(month)`.
- **Significado**: Tu máscara externa, cómo te proyectas al mundo.

### 3. Regalo Divino (Dones de Dios)
- **Cálculo**: Suma de las dos últimas cifras del año de nacimiento.
- **Reducción**: `reduceBase11(lastTwoDigits)`.
- **Significado**: Un talento especial que se te ha dado para esta vida. Siempre es positivo.

### 4. Vidas Pasadas (Conocimiento acumulado)
- **Cálculo**: Suma de las cuatro cifras del año de nacimiento.
- **Reducción**: `reduceBase11(yearSum)`.
- **Significado**: Lo que ya aprendiste en encarnaciones anteriores.

### 5. Misión (Propósito superior)
- **Cálculo**: Suma de todos los dígitos de la fecha completa (Día + Mes + Año).
- **Reducción**: `reduceBase11(totalSum)`.
- **Significado**: El sendero de perfección que has venido a realizar.

---

## 🧪 Ejemplos de Validación
**Fecha: 29/11/1990**
1. **Esencia**: 29 → 2+9 = **11** ✅
2. **Karma**: 11 → **11** ✅
3. **Regalo**: 9+0 = **9** ✅
4. **Vidas Pasadas**: 1+9+9+0 = 19 → 1+9 = **10** ✅
5. **Misión**: (Día 11) + (Mes 11) + (Regalo 9) + (Vidas 10) = 41 → 4+1 = **5** 
   *(Nota: La misión también se puede calcular sumando 2+9+1+1+1+9+9+0 = 32 → 3+2 = 5)* ✅

---

## 🧘 Guía de Equilibrio (Sinceridad)
Cada número tiene una polaridad:
- **En equilibrio**: Virtud y fuerza.
- **En desequilibrio**: Desafío y bloqueo.
*Referencia: Fuente #9 del Contexto.*
