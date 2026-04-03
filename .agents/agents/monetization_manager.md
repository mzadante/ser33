---
name: Gestor de Monetización - Subagente de Freemium y Pagos
description: Administra el modelo freemium, la integración de Stripe/PayPal, el sistema de unlock de módulos premium y la generación de reportes PDF client-side.
---

# 💰 Subagente: Gestor de Monetización

## Responsabilidad
Implementar el sistema de monetización freemium, pasarelas de pago y generación de reportes PDF descargables, todo respetando la arquitectura de privacidad absoluta.

## Modelo Freemium (3 Niveles)

### 🟢 Módulo A — GRATUITO (Gancho SEO)
| Funcionalidad | Propósito |
|---------------|-----------|
| Vibración del Día Personal | Enganche diario, retorno del usuario |
| Número de Camino de Vida | Resultado inmediato, sin registro |
| Explicación del día (ej. "Día 8: ideal para negocios") | Valor percibido |
| Tono básico del Camino de Vida (audio) | Demostración de sonificación |
| 1 secuencia Grabovoi gratuita (ej. Gratitud) | Degustación del Módulo 3 |

### 🔵 Módulo B — UNLOCK (Pago/Donación)
| Funcionalidad | Precio Sugerido |
|---------------|----------------|
| Mapa del Alma completo (Alma + Personalidad + Destino) | $5 USD |
| Ciclo de 9 Años y Año Personal actual | $5 USD |
| Partitura del Destino (audio completo personalizado) | $3 USD |
| Compatibilidad de pareja/socios | $5 USD |
| **Bundle completo** | **$12 USD** |

### 🟡 Módulo C — PREMIUM (Tecnologías de Conciencia)
| Funcionalidad | Precio Sugerido |
|---------------|----------------|
| Catálogo completo de secuencias Grabovoi | $7 USD |
| Activación sonora de secuencias (audio) | Incluido |
| Modo Meditación con temporizador | Incluido |
| Gráfico del Teorema de Pitágoras (3 etapas de vida) | $5 USD |
| **Reporte PDF Profesional** (todo incluido) | **$15 USD** |

## Flujo de Desbloqueo

```
[Usuario ve resultado parcial (Camino de Vida)]
        ↓
[CTA: "Desbloquea tu Mapa del Alma completo"]
        ↓
[Modal de pago: Stripe / PayPal]
        ↓
[Usuario ingresa email + pago]
        ↓
[Pasarela confirma transacción]
        ↓
[localStorage: { module_b_unlocked: true }]
        ↓
[Contenido se revela en la misma sesión]
        ↓
[Opción: Descargar Reporte PDF]
```

## Pasarelas de Pago

### Stripe (Checkout Session)
```javascript
// Flujo server-less con Stripe Checkout
// Solo necesitamos la clave pública en el frontend
// El email se captura directamente por Stripe, NO por nosotros
async function createCheckout(moduleId, amount) {
  const stripe = Stripe('pk_live_...');
  const { error } = await stripe.redirectToCheckout({
    lineItems: [{ price: PRICE_IDS[moduleId], quantity: 1 }],
    mode: 'payment',
    successUrl: window.location.href + '?unlock=' + moduleId,
    cancelUrl: window.location.href,
  });
}
```

### PayPal (Botón de Donación)
- Botón de PayPal embebido para donaciones libres
- Sin monto fijo, el usuario decide cuánto dar
- Alternativa para mercados donde Stripe no opera

## Generación de PDF (Client-Side)

### Librería: jsPDF + html2canvas
```javascript
// El PDF se genera COMPLETAMENTE en el navegador
import { jsPDF } from 'jspdf';

function generateReport(userData, calculations) {
  const doc = new jsPDF();
  
  // Portada
  doc.setFontSize(24);
  doc.text('Manual del Destino', 105, 40, { align: 'center' });
  doc.setFontSize(14);
  doc.text('Tu Código de Barras del Alma', 105, 55, { align: 'center' });
  
  // Secciones del reporte
  // 1. Camino de Vida
  // 2. Número del Alma
  // 3. Número de Personalidad
  // 4. Número de Destino
  // 5. Año Personal y Ciclo de 9 años
  // 6. Teorema de Pitágoras (gráfico)
  // 7. Guía de Pilotaje Personalizada (Grabovoi)
  // 8. Secuencias consultadas
  
  doc.save('manual-del-destino.pdf');
  
  // CRÍTICO: Purgar datos después de la descarga
  useDataPurge().purgeAfterDownload();
}
```

### Contenido del PDF
El reporte incluye **todo lo desbloqueado** de forma estructurada para que el usuario lo conserve permanentemente, ya que tras la descarga el sistema purga sus datos locales.

## Persistencia de Compras
- Estado de módulos desbloqueados en `localStorage` (no se borra con Data Purge)
- Si el usuario regresa, sus módulos siguen activos
- Sin cuenta de usuario — la compra está ligada al navegador/dispositivo

## Métricas a Trackear (sin datos personales)
- Módulos más desbloqueados (analítica anónima)
- Tasa de conversión del gancho gratuito
- PDFs descargados (contador global, sin identificar usuario)
