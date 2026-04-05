// src/data/pdfContent.js
// Premium textual content for the Destiny Manual (PDF)
// Each section includes educational context for user understanding

export const PDF_CONTENT = {
  es: {
    intro: {
      title: 'Bienvenido a Tu Manual del Destino',
      body: `La numerología pitagórica es una tradición milenaria que descifra el "código de barras" de tu alma. Cada número no es un simple dato matemático: es una frecuencia vibratoria que revela tu misión, tus talentos ocultos, tus desafíos y tu potencial más elevado.

Este manual fue generado exclusivamente para ti. Contiene el análisis completo de tu carta numerológica, calculado a partir de tu nombre legal de nacimiento y tu fecha de nacimiento — los dos datos que definen tu vibración única en el universo.

Léelo con calma, reflexiona sobre cada sección, y recuerda: los números no determinan tu destino, te muestran el mapa. Tú decides el camino.`
    },
    howToRead: {
      title: 'Cómo Leer Este Manual',
      body: `Cada número en tu carta tiene dos polaridades: Luz (tu máximo potencial) y Sombra (tus lecciones pendientes). No te alarmes si te identificas con la sombra — es precisamente la consciencia de ella lo que te permite transmutarla.

Los números aparecen en distintos "contextos" de tu vida:
• Camino de Vida: Tu misión principal en esta encarnación.
• Alma: Tus deseos más profundos, lo que anhela tu ser interior.
• Personalidad: La máscara que presentas al mundo exterior.
• Destino: La síntesis total de tu potencial.
• Año Personal: La energía que rige tu ciclo anual actual.
• Pinnacles: Las 4 grandes oportunidades de tu vida.
• Desafíos: Los 4 obstáculos que te fortalecerán.`
    },
    sections: {
      pythagorean: {
        title: 'Tu Código Pitagórico',
        intro: `La tabla pitagórica asigna un valor numérico del 1 al 9 a cada letra del alfabeto. Al sumar y reducir las letras de tu nombre y los dígitos de tu fecha, emergen los números que definen tu esencia. Este sistema fue desarrollado por Pitágoras (570-495 a.C.), quien afirmaba que "todo es número".`
      },
      lifePath: {
        title: 'Camino de Vida',
        what: 'Se calcula sumando tu día, mes y año de nacimiento. Es el número más importante de toda tu carta.',
        why: 'Representa tu misión de vida, el propósito central por el cual tu alma eligió esta encarnación.'
      },
      soul: {
        title: 'Número del Alma',
        what: 'Se obtiene sumando únicamente las vocales de tu nombre completo de nacimiento.',
        why: 'Revela tus deseos más íntimos, las motivaciones que mueven tu corazón cuando nadie te observa.'
      },
      personality: {
        title: 'Número de Personalidad',
        what: 'Se obtiene sumando únicamente las consonantes de tu nombre completo.',
        why: 'Es tu "máscara social" — la imagen que proyectas al mundo y cómo los demás te perciben inicialmente.'
      },
      destiny: {
        title: 'Número de Destino',
        what: 'Es la suma del Número del Alma + el Número de Personalidad.',
        why: 'Sintetiza tu potencial total. Es la meta máxima hacia la cual toda tu existencia apunta.'
      },
      omkin: {
        title: 'Mapa Tántrico Omkin Kay',
        intro: `El sistema Omkin Kay (numerología tántrica) opera en Base 11 y revela 5 factores de consciencia derivados exclusivamente de tu fecha de nacimiento. A diferencia del sistema pitagórico, aquí no se usan letras — todo proviene de los números de tu fecha.`,
        factors: {
          essence: 'Tu identidad más secreta. Quién eres cuando nadie te ve.',
          karma: 'Tu máscara social y el aprendizaje que vienes a trabajar con el mundo exterior.',
          gift: 'Un talento celestial gratuito otorgado en esta encarnación para ayudarte.',
          pastLives: 'Lo que tu alma ya dominó en vidas anteriores. Tu equipaje de sabiduría.',
          mission: 'La meta de perfección. El camino hacia tu felicidad y realización absoluta.'
        }
      },
      gematria: {
        title: 'Gematría Sagrada',
        intro: `La Gematría es un sistema ancestral que asigna valores numéricos a las letras. A diferencia de la numerología pitagórica, la gematría conserva los valores altos sin reducirlos, revelando la "firma energética" total de tu nombre.`,
        chaldean: 'Sistema Caldeo (Babilonia): Usa valores del 1 al 8 basados en la vibración fonética. El 9 se considera sagrado y no se asigna.',
        simple: 'Gematría Simple: A=1, B=2... Z=26. La suma directa del valor ordinal de cada letra.',
        hebrew: 'Gematría Hebrea Fonética: Mapea las letras latinas a sus equivalentes en el Aleph-Bet sagrado (1 a 400).'
      },
      personalYear: {
        title: 'Tu Año Personal',
        intro: `La vida se mueve en ciclos de 9 años. Tu Año Personal indica en qué punto del ciclo te encuentras ahora, revelando las energías predominantes y las oportunidades que se presentan.`,
        what: 'Se calcula sumando tu día y mes de nacimiento al año actual.',
        why: 'Te dice qué tipo de energía domina este año y cómo aprovecharla al máximo.'
      },
      pinnacles: {
        title: 'Las 4 Cimas de Tu Vida (Pinnacles)',
        intro: `Los Pinnacles representan cuatro períodos de vida que traen oportunidades específicas y experiencias de crecimiento. Cada cima tiene un número que revela qué tipo de logros están disponibles para ti en esa etapa.`,
        what: 'Se calculan combinando las reducciones de tu día, mes y año de nacimiento.',
        why: 'Son como las cuatro estaciones de una vida entera. Conocerlos te prepara para capitalizar cada fase.'
      },
      challenges: {
        title: 'Los 4 Desafíos de Tu Vida',
        intro: `Los Desafíos revelan tus "eslabones débiles" — las lecciones que debes aprender para crecer. A diferencia de los Pinnacles que se suman, los desafíos se calculan mediante restas, representando lo que debes superar.`,
        what: 'Se obtienen restando los componentes de tu fecha (siempre el menor del mayor).',
        why: 'Conocer tus desafíos te da la capacidad de transformar debilidades en fortalezas conscientes.',
        pinnacleNames: ['1er Pinnacle', '2do Pinnacle', '3er Pinnacle', '4to Pinnacle'],
        challengeNames: ['1er Desafío', '2do Desafío', 'Desafío Principal', '4to Desafío']
      },
      maturity: {
        title: 'Número de Madurez',
        intro: `Este número revela quién te estás convirtiendo. Es la vibración que se intensifica a partir de los 35-40 años y define tu propósito en la segunda mitad de la vida.`,
        what: 'Camino de Vida + Número de Destino, reducidos.',
        why: 'Muestra tu "yo verdadero" que emerge con la madurez, sabiduría y experiencia de vida.'
      },
      karmicDebt: {
        title: 'Deuda Kármica',
        intro: `Los números 13, 14, 16 y 19 son considerados "deudas kármicas" cuando aparecen antes de ser reducidos. Indican lecciones intensas heredadas de vidas pasadas que tu alma eligió trabajar en esta encarnación.`,
        clean: 'Tu carta numerológica NO presenta deudas kármicas. Esto sugiere un alma con lecciones bien integradas de ciclos anteriores.',
        debts: {
          13: 'Deuda 13/4 — La Pereza Ancestral: En vidas pasadas evitaste el trabajo duro. Ahora debes construir con disciplina y perseverancia. Cada atajo te aleja de tu meta.',
          14: 'Deuda 14/5 — El Exceso de Libertad: Abusaste de la libertad en encarnaciones previas. Tu lección es usar la adaptabilidad con responsabilidad, sin caer en el libertinaje.',
          16: 'Deuda 16/7 — El Ego Descontrolado: Tu ego dominó vidas anteriores. Ahora debes cultivar la humildad, la espiritualidad y la aceptación de la impermanencia.',
          19: 'Deuda 19/1 — El Poder Mal Utilizado: Usaste tu poder para dominación. Tu misión es aprender el liderazgo desde el servicio, la independencia desde la cooperación.'
        }
      },
      hiddenPassion: {
        title: 'Pasión Oculta',
        intro: `Tu Pasión Oculta revela un talento innato que brilla con especial intensidad. Es el número que más veces aparece entre las letras de tu nombre, señalando un área donde posees habilidades naturales excepcionales.`,
        what: 'El valor pitagórico que más se repite en las letras de tu nombre completo.',
        why: 'Señala tu fuente de motivación más profunda y el ámbito donde puedes destacar de forma natural.'
      },
      subconsciousSelf: {
        title: 'Yo Subconsciente',
        intro: `El Yo Subconsciente mide tu nivel de resiliencia interna. Indica cuántos "recursos vibracionales" diferentes posees para enfrentar situaciones inesperadas.`,
        what: 'Conteo de cuántos de los 9 números posibles (1-9) aparecen en tu nombre.',
        why: 'Un número más alto indica mayor versatilidad y preparación para lo inesperado. El máximo es 9 (todas las frecuencias representadas).'
      },
      grabovoi: {
        title: 'Códigos de Activación Grabovoi',
        intro: `Los códigos Grabovoi son secuencias numéricas desarrolladas por el matemático ruso Grigori Grabovoi, diseñadas para sintonizar tu campo energético con frecuencias específicas de abundancia, salud y transformación.`
      }
    },
    personalYearMeanings: {
      1: {
        title: 'Año de Nuevos Comienzos',
        energy: 'Iniciativa, independencia, siembra',
        description: 'Este es el primer año de un nuevo ciclo de 9 años. Todo lo que siembres ahora determinará la cosecha de los próximos 8 años. Es momento de tomar la iniciativa, comenzar proyectos, y atreverte a liderar.',
        doThis: 'Inicia proyectos, toma decisiones valientes, define tu visión a largo plazo.',
        avoidThis: 'Evita depender de otros o postergar. Este año no espera por nadie.'
      },
      2: {
        title: 'Año de Paciencia y Cooperación',
        energy: 'Diplomacia, relaciones, espera',
        description: 'Las semillas del año 1 necesitan tiempo. Este es un año para cultivar paciencia, fortalecer relaciones y cooperar. Los frutos no son visibles aún, pero están germinando bajo la superficie.',
        doThis: 'Fortalece alianzas, practica la diplomacia, cuida los detalles.',
        avoidThis: 'No fuerces resultados ni tomes decisiones impulsivas.'
      },
      3: {
        title: 'Año de Expresión Creativa',
        energy: 'Comunicación, alegría, expansión social',
        description: 'Tu voz se amplifica. Es el año para expresarte, crear, socializar y dejar que tu carisma natural brille. La creatividad es tu superpoder este año.',
        doThis: 'Crea contenido, socializa, expresa tus ideas, disfruta la vida.',
        avoidThis: 'No te disperses en demasiados proyectos ni caigas en la superficialidad.'
      },
      4: {
        title: 'Año de Construcción y Disciplina',
        energy: 'Trabajo duro, estructura, cimientos',
        description: 'Hora de poner los ladrillos. Este año demanda trabajo metódico, organización y disciplina. Lo que construyas ahora será la base sólida de tu futuro.',
        doThis: 'Organiza tus finanzas, establece rutinas, trabaja duro en tus metas.',
        avoidThis: 'No tomes atajos ni evites responsabilidades.'
      },
      5: {
        title: 'Año de Cambio y Libertad',
        energy: 'Aventura, transformación, adaptabilidad',
        description: 'El universo te sacude para que no te estanques. Espera cambios inesperados, viajes, nuevas experiencias. La clave es fluir con la corriente en lugar de resistirte.',
        doThis: 'Viaja, experimenta cosas nuevas, abraza el cambio.',
        avoidThis: 'No te aferres a lo viejo ni temas lo desconocido.'
      },
      6: {
        title: 'Año de Hogar y Responsabilidad',
        energy: 'Amor, familia, servicio, armonía',
        description: 'El foco se centra en la familia, el hogar y las relaciones cercanas. Es un año para asumir responsabilidades con amor y crear armonía en tu entorno inmediato.',
        doThis: 'Cuida a tu familia, embellece tu hogar, resuelve conflictos.',
        avoidThis: 'No descuides tus propias necesidades por complacer a todos.'
      },
      7: {
        title: 'Año de Introspección y Sabiduría',
        energy: 'Meditación, estudio, espiritualidad',
        description: 'Año de mirar hacia adentro. La soledad elegida es tu maestra. Estudia, medita, profundiza en temas espirituales. Las respuestas están dentro de ti, no afuera.',
        doThis: 'Medita, estudia, lleva un diario, busca conocimiento profundo.',
        avoidThis: 'No busques validación externa ni tomes grandes decisiones materiales.'
      },
      8: {
        title: 'Año de Cosecha y Abundancia',
        energy: 'Poder, logros materiales, reconocimiento',
        description: 'Es hora de cosechar los frutos de los años anteriores. La abundancia material está disponible. Negocios, ascensos, inversiones — todo lo que plantaste comienza a dar rendimiento.',
        doThis: 'Negocia, invierte, toma el control de tus finanzas.',
        avoidThis: 'No seas codicioso ni uses tu poder para manipular.'
      },
      9: {
        title: 'Año de Cierre y Liberación',
        energy: 'Completación, soltar, servicio humanitario',
        description: 'El ciclo de 9 años llega a su fin. Es momento de cerrar capítulos, perdonar, soltar lo que ya no sirve y prepararte para el renacimiento del próximo año 1.',
        doThis: 'Perdona, suelta, cierra ciclos, haz servicio a otros.',
        avoidThis: 'No comiences proyectos nuevos ni te aferres a relaciones muertas.'
      }
    },
    hiddenPassionMeanings: {
      1: 'Tu pasión oculta es el liderazgo y la independencia. Tienes un impulso natural para iniciar, dirigir y abrir caminos.',
      2: 'Tu pasión oculta es la conexión y la cooperación. Brillas cuando creas armonía entre personas y facilitas acuerdos.',
      3: 'Tu pasión oculta es la expresión creativa. La comunicación, el arte y la alegría son tus motores internos.',
      4: 'Tu pasión oculta es la construcción y el orden. Encuentras satisfacción profunda al crear estructuras sólidas.',
      5: 'Tu pasión oculta es la libertad y la aventura. Tu alma necesita movimiento, variedad y experiencias nuevas.',
      6: 'Tu pasión oculta es el amor y la responsabilidad. Cuidar, proteger y armonizar es tu vocación natural.',
      7: 'Tu pasión oculta es la búsqueda de la verdad. Tu mente necesita profundidad, misterio y conocimiento espiritual.',
      8: 'Tu pasión oculta es el poder y la abundancia. Tienes un talento innato para manejar recursos y manifestar metas.',
      9: 'Tu pasión oculta es el servicio humanitario. Tu compasión te impulsa a mejorar el mundo y cerrar ciclos con gracia.'
    },
    subconsciousMeanings: {
      1: 'Con solo 1 de 9 frecuencias presentes, tu campo es altamente especializado pero vulnerable ante lo inesperado. Cultiva versatilidad.',
      2: 'Con 2 frecuencias, tienes un enfoque concentrado. Fortalece otras áreas para mayor resiliencia.',
      3: 'Con 3 frecuencias presentes, estás en desarrollo. Cada nueva experiencia amplía tu espectro vibracional.',
      4: 'Con 4 frecuencias, tienes una base sólida. Estás preparado para los desafíos comunes de la vida.',
      5: 'Con 5 frecuencias, posees equilibrio. Tienes recursos internos para la mayoría de situaciones.',
      6: 'Con 6 frecuencias, tu versatilidad es notable. Pocas situaciones te tomarán desprevenido.',
      7: 'Con 7 de 9 frecuencias, tu preparación es sobresaliente. Tienes herramientas para casi cualquier desafío.',
      8: 'Con 8 frecuencias presentes, eres excepcionalmente resiliente. Tu sabiduría interna es vasta.',
      9: 'Con las 9 frecuencias representadas, posees la carta completa. Tu subconsciente tiene acceso a todos los arquetipos y energías.'
    },
    resources: {
      title: 'Recursos Recomendados para Profundizar',
      books: {
        title: 'Libros de Acceso Libre (Dominio Público)',
        items: [
          {
            title: 'The Key to the Universe',
            author: 'Harriette Augusta Curtiss (1917)',
            description: 'Clásico que conecta la numerología con las leyes universales y la evolución espiritual.',
            url: 'https://archive.org/details/keytouniverse00curtrich'
          },
          {
            title: 'Numbers: Their Occult Power and Mystic Virtues',
            author: 'W. Wynn Westcott (1911)',
            description: 'Estudio profundo de las propiedades ocultas de los números desde Pitágoras hasta la Cábala.',
            url: 'https://archive.org/details/numberstheiroccuwestuoft'
          },
          {
            title: 'The Romance in Arithmetick (Chapter on Number Symbolism)',
            author: 'Varios autores, compilaciones de dominio público',
            description: 'Compilación histórica sobre el simbolismo numérico y su influencia en civilizaciones antiguas.',
            url: 'https://www.gutenberg.org/'
          }
        ]
      },
      youtube: {
        title: 'Canales de YouTube Recomendados',
        items: [
          {
            name: 'Ann Perry — Professional Numerologist',
            subscribers: '~35K',
            specialty: 'Análisis mensuales detallados, educación profunda sobre todos los números.',
            url: 'https://www.youtube.com/@annperry-numerologist'
          },
          {
            name: 'Felicia Bender — The Practical Numerologist',
            subscribers: '~22K',
            specialty: 'Enfoque práctico y accesible. Ideal para principiantes y números maestros.',
            url: 'https://www.youtube.com/@FeliciaBender'
          },
          {
            name: 'Josh Siegel — Numerology',
            subscribers: '~15K',
            specialty: 'Puente entre el misticismo numerológico y la mentalidad moderna.',
            url: 'https://www.youtube.com/@JoshSiegelNumerology'
          }
        ]
      }
    },
    closing: {
      title: 'Tu Camino Continúa',
      body: `Este manual es un mapa, no un destino. Los números no te definen — te iluminan. Cada vibración que descubriste aquí es una invitación a conocerte más profundamente y a vivir con mayor consciencia.

Recuerda: el número más poderoso es el que eliges hacer con tu vida.

Con luz y propósito,
— ser33 | Manual del Destino`
    },
    disclaimer: 'Este reporte fue generado por algoritmos basados en la numerología pitagórica, el sistema tántrico Omkin Kay y la gematría. Es un instrumento de autoconocimiento y reflexión, no un sustituto de asesoramiento profesional. Las fuentes utilizadas incluyen las obras de Mi Numerología, Simbologías del Mundo, Graciela Slekis Riffel, María Rita Scirica, Omkin Kay y el Deluxe Report de John Johnson.'
  },
  en: {
    intro: {
      title: 'Welcome to Your Destiny Manual',
      body: `Pythagorean numerology is an ancient tradition that deciphers your soul's "barcode." Each number is not a simple mathematical data point: it's a vibrational frequency that reveals your mission, your hidden talents, your challenges, and your highest potential.

This manual was generated exclusively for you. It contains the complete analysis of your numerological chart, calculated from your legal birth name and your date of birth—the two data points that define your unique vibration in the universe.

Read it calmly, reflect on each section, and remember: numbers do not determine your destiny, they show you the map. You decide the path.`
    },
    howToRead: {
      title: 'How to Read This Manual',
      body: `Each number in your chart has two polarities: Light (your maximum potential) and Shadow (your pending lessons). Don't be alarmed if you identify with the shadow—it's precisely the awareness of it that allows you to transmute it.

Numbers appear in different "contexts" of your life:
• Life Path: Your primary mission in this incarnation.
• Soul: Your deepest desires, what your inner self yearns for.
• Personality: The mask you present to the outside world.
• Destiny: The total synthesis of your potential.
• Personal Year: The energy that rules your current annual cycle.
• Pinnacles: The 4 great opportunities of your life.
• Challenges: The 4 obstacles that will strengthen you.`
    },
    sections: {
      pythagorean: {
        title: 'Your Pythagorean Code',
        intro: `The Pythagorean table assigns a numerical value from 1 to 9 to each letter of the alphabet. By adding and reducing the letters of your name and the digits of your date, the numbers that define your essence emerge. This system was developed by Pythagoras (570-495 BC), who stated that "all is number."`
      },
      lifePath: {
        title: 'Life Path',
        what: 'It is calculated by adding your day, month, and year of birth. It is the most important number in your entire chart.',
        why: 'It represents your life mission, the central purpose for which your soul chose this incarnation.'
      },
      soul: {
        title: 'Soul Number',
        what: 'It is obtained by adding only the vowels of your full birth name.',
        why: 'It reveals your most intimate desires, the motivations that move your heart when no one is watching.'
      },
      personality: {
        title: 'Personality Number',
        what: 'It is obtained by adding only the consonants of your full name.',
        why: 'It is your "social mask"—the image you project to the world and how others initially perceive you.'
      },
      destiny: {
        title: 'Destiny Number',
        what: 'It is the sum of the Soul Number + the Personality Number.',
        why: 'It synthesizes your total potential. It is the ultimate goal toward which your entire existence points.'
      },
      omkin: {
        title: 'Omkin Kay Tantric Map',
        intro: `The Omkin Kay system (tantric numerology) operates in Base 11 and reveals 5 consciousness factors derived exclusively from your date of birth. Unlike the Pythagorean system, here no letters are used—everything comes from the numbers of your date.`,
        factors: {
          essence: 'Your most secret identity. Who you are when no one sees you.',
          karma: 'Your social mask and the learning you come to work on with the outside world.',
          gift: 'A free celestial talent granted in this incarnation to help you.',
          pastLives: 'What your soul already mastered in previous lives. Your baggage of wisdom.',
          mission: 'The goal of perfection. The path to your absolute happiness and realization.'
        }
      },
      gematria: {
        title: 'Sacred Gematria',
        intro: `Gematria is an ancestral system that assigns numerical values to letters. Unlike Pythagorean numerology, gematria preserves high values without reducing them, revealing the total "energy signature" of your name.`,
        chaldean: 'Chaldean System (Babylon): Uses values from 1 to 8 based on phonetic vibration. 9 is considered sacred and is not assigned.',
        simple: 'Simple Gematria: A=1, B=2... Z=26. The direct sum of the ordinal value of each letter.',
        hebrew: 'Phonetic Hebrew Gematria: Maps Latin letters to their equivalents in the sacred Aleph-Bet (1 to 400).'
      },
      personalYear: {
        title: 'Your Personal Year',
        intro: `Life moves in 9-year cycles. Your Personal Year indicates where in the cycle you are now, revealing the predominant energies and the opportunities that arise.`,
        what: 'It is calculated by adding your day and month of birth to the current year.',
        why: 'It tells you what type of energy dominates this year and how to make the most of it.'
      },
      pinnacles: {
        title: 'The 4 Pinnacles of Your Life',
        intro: `Pinnacles represent four life periods that bring specific opportunities and growth experiences. Each pinnacle has a number that reveals what type of achievements are available to you at that stage.`,
        what: 'They are calculated by combining the reductions of your day, month, and year of birth.',
        why: 'They are like the four seasons of an entire life. Knowing them prepares you to capitalize on each phase.'
      },
      challenges: {
        title: 'The 4 Challenges of Your Life',
        intro: `Challenges reveal your "weak links"—the lessons you must learn to grow. Unlike the Pinnacles which are added, challenges are calculated through subtractions, representing what you must overcome.`,
        what: 'They are obtained by subtracting the components of your date (always the smaller from the larger).',
        why: 'Knowing your challenges gives you the ability to transform weaknesses into conscious strengths.',
        pinnacleNames: ['1st Pinnacle', '2nd Pinnacle', '3rd Pinnacle', '4th Pinnacle'],
        challengeNames: ['1st Challenge', '2nd Challenge', 'Main Challenge', '4th Challenge']
      },
      maturity: {
        title: 'Maturity Number',
        intro: `This number reveals who you are becoming. It is the vibration that intensifies from ages 35-40 and defines your purpose in the second half of life.`,
        what: 'Life Path + Destiny Number, reduced.',
        why: 'It shows your "true self" that emerges with maturity, wisdom, and life experience.'
      },
      karmicDebt: {
        title: 'Karmic Debt',
        intro: `The numbers 13, 14, 16, and 19 are considered "karmic debts" when they appear before being reduced. They indicate intense lessons inherited from past lives that your soul chose to work on in this incarnation.`,
        clean: 'Your numerological chart presents NO karmic debts. This suggests a soul with well-integrated lessons from previous cycles.',
        debts: {
          13: 'Debt 13/4 — Ancestral Laziness: In past lives you avoided hard work. Now you must build with discipline and perseverance. Each shortcut will take you further from your goal.',
          14: 'Debt 14/5 — Excess of Freedom: You abused freedom in previous incarnations. Your lesson is to use adaptability responsibly, without falling into debauchery.',
          16: 'Debt 16/7 — Uncontrolled Ego: Your ego dominated past lives. Now you must cultivate humility, spirituality, and acceptance of impermanence.',
          19: 'Debt 19/1 — Misused Power: You used your power for domination. Your mission is to learn leadership through service, independence through cooperation.'
        }
      },
      hiddenPassion: {
        title: 'Hidden Passion',
        intro: `Your Hidden Passion reveals an innate talent that shines with special intensity. It is the number that appears most often among the letters of your name, pointing to an area where you possess exceptional natural abilities.`,
        what: 'The Pythagorean value that repeats the most in the letters of your full name.',
        why: 'It points to your deepest source of motivation and the area where you can naturally stand out.'
      },
      subconsciousSelf: {
        title: 'Subconscious Self',
        intro: `The Subconscious Self measures your level of internal resilience. It indicates how many different "vibrational resources" you possess to face unexpected situations.`,
        what: 'Count of how many of the 9 possible numbers (1-9) appear in your name.',
        why: 'A higher number indicates greater versatility and preparation for the unexpected. The maximum is 9 (all frequencies represented).'
      },
      grabovoi: {
        title: 'Grabovoi Activation Codes',
        intro: `Grabovoi codes are numerical sequences developed by Russian mathematician Grigori Grabovoi, designed to tune your energy field with specific frequencies of abundance, health, and transformation.`
      }
    },
    personalYearMeanings: {
      1: {
        title: 'Year of New Beginnings',
        energy: 'Initiative, independence, sowing',
        description: 'This is the first year of a new 9-year cycle. Everything you sow now will determine the harvest of the next 8 years. It is time to take the initiative, start projects, and dare to lead.',
        doThis: 'Start projects, take brave decisions, define your long-term vision.',
        avoidThis: 'Avoid depending on others or procrastinating. This year waits for no one.'
      },
      2: {
        title: 'Year of Patience and Cooperation',
        energy: 'Diplomacy, relationships, waiting',
        description: 'The seeds of year 1 need time. This is a year to cultivate patience, strengthen relationships, and cooperate. The fruits are not visible yet, but they are germinating under the surface.',
        doThis: 'Strengthen alliances, practice diplomacy, take care of details.',
        avoidThis: 'Don\'t force results or take impulsive decisions.'
      },
      3: {
        title: 'Year of Creative Expression',
        energy: 'Communication, joy, social expansion',
        description: 'Your voice is amplified. It is the year to express yourself, create, socialize, and let your natural charisma shine. Creativity is your superpower this year.',
        doThis: 'Create content, socialize, express your ideas, enjoy life.',
        avoidThis: 'Don\'t scatter yourself in too many projects or fall into superficiality.'
      },
      4: {
        title: 'Year of Construction and Discipline',
        energy: 'Hard work, structure, foundations',
        description: 'Time to lay the bricks. This year demands methodical work, organization, and discipline. What you build now will be the solid foundation of your future.',
        doThis: 'Organize your finances, establish routines, work hard on your goals.',
        avoidThis: 'Don\'t take shortcuts or avoid responsibilities.'
      },
      5: {
        title: 'Year of Change and Freedom',
        energy: 'Adventure, transformation, adaptability',
        description: 'The universe shakes you so you don\'t stagnate. Expect unexpected changes, trips, new experiences. The key is to flow with the current instead of resisting.',
        doThis: 'Travel, experience new things, embrace change.',
        avoidThis: 'Don\'t cling to the old or fear the unknown.'
      },
      6: {
        title: 'Year of Home and Responsibility',
        energy: 'Love, family, service, harmony',
        description: 'The focus centers on family, home, and close relationships. It is a year to assume responsibilities with love and create harmony in your immediate environment.',
        doThis: 'Take care of your family, beautify your home, resolve conflicts.',
        avoidThis: 'Don\'t neglect your own needs to please everyone.'
      },
      7: {
        title: 'Year of Introspection and Wisdom',
        energy: 'Meditation, study, spirituality',
        description: 'Year of looking inward. Chosen solitude is your teacher. Study, meditate, deepen in spiritual topics. The answers are inside you, not outside.',
        doThis: 'Meditate, study, keep a journal, seek deep knowledge.',
        avoidThis: 'Don\'t seek external validation or take big material decisions.'
      },
      8: {
        title: 'Year of Harvest and Abundance',
        energy: 'Power, material achievements, recognition',
        description: 'It is time to harvest the fruits of previous years. Material abundance is available. Businesses, promotions, investments—everything you planted starts to yield.',
        doThis: 'Negotiate, invest, take control of your finances.',
        avoidThis: 'Don\'t be greedy or use your power to manipulate.'
      },
      9: {
        title: 'Year of Completion and Liberation',
        energy: 'Completion, letting go, humanitarian service',
        description: 'The 9-year cycle comes to an end. It is time to close chapters, forgive, let go of what no longer serves, and prepare for the rebirth of next year 1.',
        doThis: 'Forgive, let go, close cycles, do service to others.',
        avoidThis: 'Don\'t start new projects or cling to dead relationships.'
      }
    },
    hiddenPassionMeanings: {
      1: 'Your hidden passion is leadership and independence. You have a natural drive to initiate, direct, and open paths.',
      2: 'Your hidden passion is connection and cooperation. You shine when you create harmony between people and facilitate agreements.',
      3: 'Your hidden passion is creative expression. Communication, art, and joy are your internal engines.',
      4: 'Your hidden passion is construction and order. You find deep satisfaction in creating solid structures.',
      5: 'Your hidden passion is freedom and adventure. Your soul needs movement, variety, and new experiences.',
      6: 'Your hidden passion is love and responsibility. Caring, protecting, and harmonizing is your natural vocation.',
      7: 'Your hidden passion is the search for truth. Your mind needs depth, mystery, and spiritual knowledge.',
      8: 'Your hidden passion is power and abundance. You have an innate talent for managing resources and manifesting goals.',
      9: 'Your hidden passion is humanitarian service. Your compassion drives you to improve the world and close cycles with grace.'
    },
    subconsciousMeanings: {
      1: 'With only 1 of 9 frequencies present, your field is highly specialized but vulnerable to the unexpected. Cultivate versatility.',
      2: 'With 2 frequencies, you have a concentrated focus. Strengthen other areas for greater resilience.',
      3: 'With 3 frequencies present, you are in development. Each new experience expands your vibrational spectrum.',
      4: 'With 4 frequencies, you have a solid base. You are prepared for life\'s common challenges.',
      5: 'With 5 frequencies, you possess balance. You have internal resources for most situations.',
      6: 'With 6 frequencies, your versatility is notable. Few situations will take you by surprise.',
      7: 'With 7 of 9 frequencies, your preparation is outstanding. You have tools for almost any challenge.',
      8: 'With 8 frequencies present, you are exceptionally resilient. Your internal wisdom is vast.',
      9: 'With all 9 frequencies represented, you possess the full chart. Your subconscious has access to all archetypes and energies.'
    },
    resources: {
      title: 'Recommended Resources to Deepen',
      books: {
        title: 'Free Access Books (Public Domain)',
        items: [
          {
            title: 'The Key to the Universe',
            author: 'Harriette Augusta Curtiss (1917)',
            description: 'Classic that connects numerology with universal laws and spiritual evolution.',
            url: 'https://archive.org/details/keytouniverse00curtrich'
          },
          {
            title: 'Numbers: Their Occult Power and Mystic Virtues',
            author: 'W. Wynn Westcott (1911)',
            description: 'Deep study of the occult properties of numbers from Pythagoras to Kabbalah.',
            url: 'https://archive.org/details/numberstheiroccuwestuoft'
          },
          {
            title: 'The Romance in Arithmetick (Chapter on Number Symbolism)',
            author: 'Various authors, public domain compilations',
            description: 'Historical compilation on number symbolism and its influence on ancient civilizations.',
            url: 'https://www.gutenberg.org/'
          }
        ]
      },
      youtube: {
        title: 'Recommended YouTube Channels',
        items: [
          {
            name: 'Ann Perry — Professional Numerologist',
            subscribers: '~35K',
            specialty: 'Detailed monthly analysis, deep education on all numbers.',
            url: 'https://www.youtube.com/@annperry-numerologist'
          },
          {
            name: 'Felicia Bender — The Practical Numerologist',
            subscribers: '~22K',
            specialty: 'Practical and accessible approach. Ideal for beginners and master numbers.',
            url: 'https://www.youtube.com/@FeliciaBender'
          },
          {
            name: 'Josh Siegel — Numerology',
            subscribers: '~15K',
            specialty: 'Bridge between numerological mysticism and modern mindset.',
            url: 'https://www.youtube.com/@JoshSiegelNumerology'
          }
        ]
      }
    },
    closing: {
      title: 'Your Journey Continues',
      body: `This manual is a map, not a destination. Numbers don't define you—they illuminate you. Each vibration you discovered here is an invitation to know yourself more deeply and to live with greater awareness.

Remember: the most powerful number is the one you choose to make with your life.

With light and purpose,
— ser33 | Destiny Manual`
    },
    disclaimer: 'This report was generated by algorithms based on Pythagorean numerology, the Omkin Kay tantric system, and gematria. It is an instrument for self-knowledge and reflection, not a substitute for professional advice. Sources used include the works of Mi Numerología, Simbologías del Mundo, Graciela Slekis Riffel, María Rita Scirica, Omkin Kay, and John Johnson\'s Deluxe Report.'
  }
};
