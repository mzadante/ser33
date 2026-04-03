# 📑 Resumen Técnico Consolidado para el Equipo de Desarrollo

Este documento sirve como la "fuente central de la verdad" técnica y de producto para el proyecto **"Manual del Destino"**. Está diseñado para que los distintos equipos (Ingeniería, Diseño, Producto, Marketing) tengan un entendimiento claro de los requisitos.

## 1. Visión y Posicionamiento del Producto
El proyecto NO es una calculadora astrológica convencional, sino una **"tecnología de conciencia"** y una **"huella energética"**. Se basa en la premisa pitagórica de que los números son frecuencias vibratorias reales que rigen el universo. El producto decodifica este "código de barras" del alma de cada individuo.

## 2. Arquitectura de Software: Sesión Volátil (Client-Side First)
**Prioridad:** Bajo costo de infraestructura y privacidad absoluta (100% Client-Side).
- **Procesamiento:** Todo cálculo numerológico (sumas, reducciones, mapeo) debe ocurrir en el navegador web del usuario a través de JavaScript (Vue 3).
- **Persistencia Temporal:** Los datos sensibles del usuario (nombre y fecha de nacimiento) se mantienen temporalmente en *Session Storage* y *Local Storage*. NUNCA tocan un servidor backend base de datos central (excepto la pasarela de pagos al momento de desbloquear).
- **Data Purge:** Implementación obligatoria de una purga automática del Storage cuando se descargar el reporte PDF o se cierra la pestaña.
- **Backend:** Se reduce estrictamente a servir de host estático, procesar los pagos (Stripe/PayPal), y recolectar correos electrónicos voluntarios vía Google Sheets API para el newsletter.

## 3. Lógica del Motor Numérico (Reglas Estrictas)
El motor opera bajo reglas deterministas inviolables que respetan la pureza de la fuente:
- **Reducción Teosófica:** Se reduce iterativamente a un solo dígito (1-9) la suma de números... **EXCEPTO los Números Maestros (11, 22, 33)** que JAMÁS deben reducirse pues poseen una vibración intensa superior.
- **Camino de Vida:** Se calcula mediante la suma final de la reducción independiente del día, mes y año de nacimiento.
- **Número del Alma:** Surge ÚNICAMENTE de la suma pitagórica de las **vocales** del nombre legal completo (representan "el espíritu").
- **Número de Personalidad:** Surge ÚNICAMENTE de la suma pitagórica de las **consonantes** (representan "la estructura/máscara").
- **Número de Destino:** Síntesis total (Alma + Personalidad).
- **Ciclo Temporal:** Determinación del *Año Personal* actual del usuario (ciclos de 9 años), teniendo en cuenta que 2026 es "Año Universal 1".
- **Teorema de Pitágoras:** Modelo de división de vida en 3 grandes etapas dependientes de la edad (0-27, 27-54, 54-81).

## 4. Tecnologías de Conciencia (Módulo Avanzado)
El dashboard incorpora *Secuencias Numéricas Grabovoi* como códigos de manifestación (Ej. 189 9999 para salud, 520 para abundancia, 91688 para obstáculos).
- **Activación UI:** Deben estar preparadas para activación instantánea ("Modo Urgente", como una varita mental) y para contemplación pausada ("Modo Meditación").
- Deben respetarse estrictamente los ESPACIOS dentro de las frecuencias entregadas.

## 5. Web Audio API y Sonificación
El diferenciador core de la aplicación es que se pueda "escuchar" el destino.
- **Escala Base:** Afinación pitagórica basada en 432Hz.
- Cada número del 1 al 9 es mapeado a una frecuencia/nota musical. Los Números Maestros disparan armónicos complejos simultáneamente (el 33 actúa como diapasón espiritual puro).
- Se implementará un sintetizador de audio en tiempo real en Vue utilizando `AudioContext` nativo (eliminando la necesidad de cargar/procesar MP3 desde un backend).
- Permite la creación de la "Partitura del Destino", combinando la melodía fluida de las vocales con los ritmos de las consonantes.

## 6. Diseño Visual: Geometría Vibratoria (UI/UX)
- **Tema:** Colores vibracionales. Dorado Radiante (#D4AF37) para manifestación y números maestros, Azul Cerúleo para tránsitos, y esquema Cosmic Dark para el fondo.
- **Sincronicidad animada:** Componentes interactivos como la "Esfera Dorada" animada por GSAP, palpitando a la par de las frecuencias sonoras, y patrones que se desbloquean en horas espejo (11:11, etc.).
- **Amuleto Digital:** La interfaz debe transmitir limpieza geométrica (puntos, triángulos, y la Vesica Piscis), sin distracciones y completamente adaptable a móviles.

## 7. Estrategia de Monetización Freemium y Marketing
- **Tier 0 (Hook Gratis):** Camino de Vida + Vibración del Día Personal (ej: "Hoy es un Día 8 para ti, ideal para los negocios").
- **Tier 1 y 2 (Pago para Unlock):** Desarrollo completo del Mapa del Alma, Etapas Pitagóricas y Catálogo completo de códigos Grabovoi (Stripe/PayPal embed).
- **Reporte PDF Client-Side:** Generación de un PDF profesional (`jsPDF` u homólogos) inyectado con los resultados desbloqueados, creado localmente antes del Data Purge.
- **YouTube Lead SEO:** La app funcionará bajo un ecosistema de comunidad impulsado desde YouTube usando el patrón "Enganche, Valor, Duda". Los e-mails captados por donación se inyectarán en un newsletter gestionado orgánicamente vía Google Drive.
