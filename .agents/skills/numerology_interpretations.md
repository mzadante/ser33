---
name: Interpretaciones Numerológicas - Base de conocimiento
description: Skill con las interpretaciones espirituales de cada número (1-9 y maestros 11, 22, 33), significado de los años personales y las horas espejo. Extraído de las fuentes originales.
---

# 📖 Skill: Interpretaciones Numerológicas

## Uso
Referencia para poblar las descripciones en la UI cuando se muestran resultados. Cada interpretación proviene de las fuentes verificadas del proyecto.

## Números del 1 al 9

```javascript
export const NUMBER_MEANINGS = {
  1: {
    essence: 'El Líder / El Pionero',
    keywords: ['Inicio', 'Independencia', 'Innovación', 'Voluntad'],
    geometry: 'Punto luminoso',
    element: 'Fuego',
    vibration: 'Creación pura, origen de todo',
    lifePathDesc: 'Tu misión es liderar y abrir caminos nuevos. Eres un iniciador nato.',
    dayDesc: 'Día ideal para iniciar proyectos, tomar decisiones y actuar con determinación.',
    yearDesc: 'Año de nuevos comienzos. Siembra las semillas de los próximos 9 años.',
    arcana: 'El Mago'
  },
  2: {
    essence: 'El Diplomático / El Cooperador',
    keywords: ['Dualidad', 'Cooperación', 'Sensibilidad', 'Equilibrio'],
    geometry: 'Línea (conexión entre dos puntos)',
    element: 'Agua',
    vibration: 'Receptividad, alianzas y dualidad',
    lifePathDesc: 'Tu misión es mediar, cooperar y encontrar el equilibrio en las relaciones.',
    dayDesc: 'Día para la diplomacia, colaboración y fortalecer vínculos.',
    yearDesc: 'Año de paciencia. Las semillas necesitan tiempo para germinar.',
    arcana: 'La Sacerdotisa'
  },
  3: {
    essence: 'El Creador / La Trinidad',
    keywords: ['Expresión', 'Creatividad', 'Alegría', 'Comunicación'],
    geometry: 'Triángulo (Divina Trinidad)',
    element: 'Fuego/Aire',
    vibration: 'Manifestación creativa, el poder del 3-6-9 de Tesla',
    lifePathDesc: 'Tu misión es crear, comunicar y expresar tu visión al mundo.',
    dayDesc: 'Día para expresarte, crear contenido, socializar y comunicar ideas.',
    yearDesc: 'Año de expansión creativa. Tu voz se amplifica.',
    arcana: 'La Emperatriz'
  },
  4: {
    essence: 'El Constructor / La Base',
    keywords: ['Estructura', 'Orden', 'Disciplina', 'Estabilidad'],
    geometry: 'Cuadrado (fundamento sólido)',
    element: 'Tierra',
    vibration: 'Cimientos, orden y trabajo metódico',
    lifePathDesc: 'Tu misión es construir estructuras duraderas con disciplina y orden.',
    dayDesc: 'Día para organizar, planificar, construir bases y trabajar con método.',
    yearDesc: 'Año de trabajo duro. Estás poniendo los cimientos del futuro.',
    arcana: 'El Emperador'
  },
  5: {
    essence: 'El Aventurero / El Cambio',
    keywords: ['Libertad', 'Aventura', 'Cambio', 'Versatilidad'],
    geometry: 'Pentagrama (5 sentidos)',
    element: 'Aire',
    vibration: 'Movimiento, adaptación y experiencia',
    lifePathDesc: 'Tu misión es explorar, adaptarte y vivir la vida como una aventura.',
    dayDesc: 'Día de cambios, viajes, nuevas experiencias y romper rutinas.',
    yearDesc: 'Año de libertad y cambios inesperados. Adáptate y fluye.',
    arcana: 'El Hierofante'
  },
  6: {
    essence: 'El Armonizador / El Amor',
    keywords: ['Armonía', 'Responsabilidad', 'Hogar', 'Amor'],
    geometry: 'Hexágono (equilibrio perfecto)',
    element: 'Agua/Tierra',
    vibration: 'Amor incondicional, frecuencia base 432Hz',
    lifePathDesc: 'Tu misión es crear armonía, cuidar y amar incondicionalmente.',
    dayDesc: 'Día ideal para la familia, el hogar, el amor y resolver conflictos.',
    yearDesc: 'Año de responsabilidad familiar y relaciones. Cuida tu entorno.',
    arcana: 'Los Enamorados'
  },
  7: {
    essence: 'El Místico / El Buscador',
    keywords: ['Espiritualidad', 'Introspección', 'Sabiduría', 'Análisis'],
    geometry: 'Heptágono (misterio)',
    element: 'Agua',
    vibration: 'Búsqueda interior, conexión con lo divino',
    lifePathDesc: 'Tu misión es buscar la verdad espiritual y la sabiduría profunda.',
    dayDesc: 'Día para meditar, estudiar, introspección y conexión espiritual.',
    yearDesc: 'Año de reflexión profunda. Busca respuestas dentro de ti.',
    arcana: 'El Carro'
  },
  8: {
    essence: 'El Poderoso / La Abundancia',
    keywords: ['Poder', 'Abundancia', 'Autoridad', 'Logro'],
    geometry: 'Octágono / Infinito (∞)',
    element: 'Tierra/Fuego',
    vibration: 'Manifestación material, ciclo infinito de dar y recibir',
    lifePathDesc: 'Tu misión es dominar el mundo material con ética y abundancia.',
    dayDesc: 'Día ideal para negocios, finanzas, tomar el control y manifestar.',
    yearDesc: 'Año de cosecha material. Tus esfuerzos dan fruto económico.',
    arcana: 'La Justicia'
  },
  9: {
    essence: 'El Humanitario / El Cierre',
    keywords: ['Universalidad', 'Compasión', 'Cierre', 'Sabiduría'],
    geometry: 'Eneágono / Espiral',
    element: 'Fuego/Agua',
    vibration: 'Completación del ciclo, liberación y servicio',
    lifePathDesc: 'Tu misión es servir a la humanidad con compasión y sabiduría universal.',
    dayDesc: 'Día para cerrar ciclos, perdonar, soltar y servir a otros.',
    yearDesc: 'Año de cierres. Deja ir lo que ya no sirve para renacer.',
    arcana: 'El Ermitaño'
  }
};
```

## Números Maestros

```javascript
export const MASTER_MEANINGS = {
  11: {
    essence: 'El Iluminador / Intuición Maestra',
    keywords: ['Intuición', 'Inspiración', 'Canal espiritual', 'Visión'],
    frequency: 'Vibración intensa amplificada',
    description: 'Posees una antena espiritual amplificada. Canal entre lo divino y lo terrenal.',
    responsibility: 'Con gran poder vibratorio viene gran responsabilidad de guiar a otros.',
    audioNote: 'Dos osciladores simultáneos (binaural) para reflejar la dualidad iluminada'
  },
  22: {
    essence: 'El Constructor Maestro',
    keywords: ['Manifestación', 'Construcción global', 'Visión masiva', 'Legado'],
    frequency: 'Vibración de construcción cósmica',
    description: 'Capacidad de materializar visiones a gran escala. Arquitecto del destino colectivo.',
    responsibility: 'Debes construir algo que trascienda tu vida individual.',
    audioNote: 'Cuatro osciladores en cuadrado armónico (estructura suprema)'
  },
  33: {
    essence: 'El Maestro de Maestros / Diapasón Espiritual',
    keywords: ['Servicio divino', 'Sanación', 'Amor universal', 'Ascensión'],
    frequency: 'Diapasón espiritual que resuena con los chakras',
    description: 'El número más elevado. Envías vibraciones que sanan y elevan a quienes te rodean.',
    responsibility: 'Tu vida entera es un acto de servicio y elevación de conciencia.',
    audioNote: 'Armónicos de 3ª y 5ª (diapasón completo)',
    vesicaPiscis: true  // Representación visual: dos círculos superpuestos
  }
};
```

## Horas Espejo (Sincronicidades)

```javascript
export const MIRROR_HOURS = {
  '11:11': { message: 'Despertar espiritual. El universo confirma tu camino.', urgency: 'alta' },
  '22:22': { message: 'Tus pensamientos se están manifestando. Mantén la fe.', urgency: 'alta' },
  '12:12': { message: 'Mantén una actitud positiva. Algo bueno viene en camino.', urgency: 'media' },
  '13:13': { message: 'Transformación en proceso. Confía en el cambio.', urgency: 'media' },
  '14:14': { message: 'Los ángeles te protegen. Estás en el camino correcto.', urgency: 'baja' },
  '15:15': { message: 'Cambios significativos se acercan. Prepárate.', urgency: 'media' },
  '16:16': { message: 'Suelta el control. Confía en el proceso divino.', urgency: 'media' },
  '17:17': { message: 'Estás alineado con tu propósito. Sigue adelante.', urgency: 'baja' },
  '21:21': { message: 'Tu vibración está elevada. Aprovecha este momento.', urgency: 'media' },
  '00:00': { message: 'Portal de reinicio. Un nuevo ciclo comienza ahora.', urgency: 'alta' },
  '3:33':  { message: 'Los maestros ascendidos te acompañan.', urgency: 'alta' },
  '4:44':  { message: 'Protección divina activa. Estás rodeado de guía.', urgency: 'alta' },
  '5:55':  { message: 'Cambio masivo inminente. Prepárate para transformarte.', urgency: 'alta' },
};
```

## Contexto 2026

```javascript
export const UNIVERSAL_YEAR_2026 = {
  number: 1,  // 2+0+2+6 = 10 = 1
  description: 'Año Universal 1: Después del cierre y caos del 2025 (Año 9), el 2026 marca el inicio de una nueva era de 9 años. Es un "terreno fértil" para sembrar nuevas intenciones.',
  keywords: ['Nuevo comienzo', 'Semilla', 'Terreno fértil', 'Era nueva'],
  advice: 'Siembra ahora lo que quieres cosechar en los próximos 9 años.'
};
```
