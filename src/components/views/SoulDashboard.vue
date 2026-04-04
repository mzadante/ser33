<template>
  <div class="dashboard-container" ref="dashboardRef">
    <!-- Encabezado de Resultados -->
    <div class="dashboard-header glass-panel mystic-fadeIn">
      <h2>{{ $t('results.title') }}</h2>
      <p class="subtitle">{{ computedName }}</p>
    </div>

    <!-- Zona Central: Números de Destino -->
    <div class="numerology-grid">
      <div class="number-card number-card-anim">
        <span class="label">{{ $t('results.lifePath') }}</span>
        <span class="value">{{ results.lifePath }}</span>
        <span class="desc">{{ $t('results.lifePathDesc') }}</span>
      </div>

      <div class="number-card number-card-anim">
        <span class="label">{{ $t('results.soul') }}</span>
        <span class="value">{{ results.soulNumber }}</span>
        <span class="desc">{{ $t('results.soulDesc') }}</span>
      </div>

      <div class="number-card number-card-anim">
        <span class="label">{{ $t('results.personality') }}</span>
        <span class="value">{{ results.personalityNumber }}</span>
        <span class="desc">{{ $t('results.personalityDesc') }}</span>
      </div>

      <div class="number-card highlight number-card-anim destiny-card">
        <span class="label">{{ $t('results.destiny') }}</span>
        <span class="value">{{ results.destinyNumber }}</span>
        <span class="desc">{{ $t('results.destinyDesc') }}</span>
      </div>
    </div>

    <!-- Nueva Sección: Mapa Tántrico Omkin (5 Factores) -->
    <div class="tantric-section glass-panel mystic-fadeIn">
      <div class="section-header">
        <h3>{{ $t('results.tantricTitle') }}</h3>
        <p class="section-desc">{{ $t('results.tantricDesc') }}</p>
      </div>
      
      <div class="tantric-layout">
        <div class="pentagon-visual-container">
          <img src="@/assets/omkin_factors_2.png" alt="Pentágono Omkin" class="pentagon-img" />
          <div class="factor-overlay">
            <!-- Los factores se posicionarán aquí dinámicamente en el futuro -->
          </div>
        </div>
        
        <div class="factors-grid">
          <div 
            class="factor-item" 
            v-for="(factor, key) in results.omkin" 
            :key="key"
            @click="selectFactor(key, factor)"
            :class="{ active: selectedKey === key }"
          >
            <div class="factor-info">
              <span class="factor-label">{{ $t(`results.factors.${key}`) }}</span>
              <span class="factor-value">{{ factor }}</span>
            </div>
            <span class="click-hint">{{ selectedKey === key ? '−' : '+' }}</span>
          </div>
        </div>
      </div>

      <!-- Panel de Interpretación Dinámico (Leer Más) -->
      <transition name="slide-fade">
        <div v-if="selectedFactorData" class="interpretation-panel glass-panel">
          <div class="panel-header">
            <h4>Número {{ selectedFactorValue }}: {{ selectedFactorData.keyword }}</h4>
            <p class="factor-context">{{ factorContext }}</p>
          </div>
          
          <div class="panel-content">
            <div class="meaning-group">
              <span class="meaning-label luz">Vibración en Luz:</span>
              <p>{{ selectedFactorData.light }}</p>
            </div>
            
            <div class="meaning-group">
              <span class="meaning-label sombra">Vibración en Sombra:</span>
              <p>{{ selectedFactorData.shadow }}</p>
            </div>

            <div class="meaning-group">
              <span class="meaning-label mision">Tarea Evolutiva:</span>
              <p>{{ selectedFactorData.mission }}</p>
            </div>
          </div>
          
          <button class="btn-gold outline-btn mini-btn" @click="closeFactor">Cerrar Sabiduría</button>
        </div>
      </transition>
    </div>

    <!-- Nueva Sección: Teorema de Pitágoras (Etapas de Vida) -->
    <div class="pythagoras-section glass-panel mystic-fadeIn">
      <div class="section-header">
        <h3>{{ $t('results.pythagorasTitle') }}</h3>
      </div>
      
      <div class="stages-visual">
        <img :src="getStageImage()" alt="Etapas de Vida" class="stages-img" />
      </div>
    </div>

    <!-- Nueva Sección: Códigos de Activación Sabios (Grabovoi / Tántricos) -->
    <div class="activation-section glass-panel mystic-fadeIn">
      <div class="section-header">
        <h3>Activación y Creación Diaria</h3>
        <p class="section-desc">Repite estos códigos para sintonizar tu realidad con la abundancia y la salud.</p>
      </div>

      <div class="codes-grid">
        <div class="code-card" v-for="code in activationCodes" :key="code.title">
          <span class="code-title">{{ code.title }}</span>
          <span class="code-digits">{{ code.digits }}</span>
          <button 
            class="btn-gold mini-btn" 
            :class="{ 'pulse-active': activeFreq === code.hz }"
            @click="handleFreqClick(code.hz)"
          >
            {{ activeFreq === code.hz ? 'Sintonizando...' : 'Sintonizar' }}
          </button>
        </div>
      </div>
      
      <div class="ritual-box">
        <p><strong>Ritual Tántrico Sugerido:</strong> Realiza la respiración 8-4-8-4 mientras visualizas tu número de Misión ({{ results.omkin.mission }}) rodeado de luz dorada.</p>
      </div>
    </div>

    <!-- Zona de Módulos Secundarios -->
    <div class="future-modules-grid">
      <!-- Módulo: Resonancia Solfeggio -->
      <div class="module-placeholder audio-module mystic-fadeIn">
        <div class="module-icon">
          <img src="@/assets/solfeggio_icon.png" alt="Solfeggio Icon" class="solfeggio-icon-img" />
        </div>
        <h3>Frecuencia Solfeggio</h3>
        <p>{{ $t('results.audioInstruction') }}</p>
        <button class="btn-gold outline-btn" @click="$emit('playAudio')">
          {{ $t('results.activateAudio') }}
        </button>
      </div>
    </div>

    <!-- Nueva Sección: Base de Conocimiento (Explicación de Herramientas) -->
    <div class="knowledge-base glass-panel mystic-fadeIn">
      <div class="section-header">
        <h3>Glosario de Sabiduría</h3>
        <p class="section-desc">Entiende las tecnologías de consciencia que estamos utilizando.</p>
      </div>

      <div class="glossary-grid">
        <div class="glossary-item">
          <strong>Numerología Pitagórica</strong>
          <p>Mapeo de la personalidad y el destino a través del valor vibratorio de las letras y la fecha, basado en los principios matemáticos de Pitágoras.</p>
        </div>
        <div class="glossary-item">
          <strong>Omkin Kay (Tántrica)</strong>
          <p>Un sistema de 5 factores que revela tu esencia profunda, tu karma, tus dones celestiales y tu misión de vida específica en esta encarnación.</p>
        </div>
        <div class="glossary-item">
          <strong>Frecuencias Solfeggio</strong>
          <p>Tonos electromagnéticos antiguos utilizados para armonizar el cuerpo y la mente (ej. 528Hz para transformación y reparación de ADN).</p>
        </div>
      </div>
    </div>

    <button @click="resetForm" class="btn-gold outline-btn back-btn mystic-fadeIn">{{ $t('results.resetBtn') }}</button>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import gsap from 'gsap';
import { interpretations } from '../../data/interpretations.js';

const props = defineProps({
  results: {
    type: Object,
    required: true
  },
  computedName: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['reset', 'playAudio', 'playFrequency']);
const dashboardRef = ref(null);

const activeFreq = ref(null);
const activationCodes = [
  { title: 'Abundancia Universal', digits: '5 2 0', hz: 528 },
  { title: 'Salud Perfecta', digits: '1 8 9 9 9 9 9', hz: 417 }
];

const handleFreqClick = (hz) => {
  activeFreq.value = hz;
  emit('playFrequency', hz);
  setTimeout(() => { activeFreq.value = null; }, 3000);
};

const selectedKey = ref(null);
const selectedFactorValue = ref(null);

const selectedFactorData = computed(() => {
  if (!selectedKey.value) return null;
  // Usamos el idioma español por defecto para esta fase, o inyectar i18n
  return interpretations.es.numbers[selectedFactorValue.value];
});

const factorContext = computed(() => {
  if (!selectedKey.value) return '';
  return interpretations.es.factors[selectedKey.value];
});

const selectFactor = (key, value) => {
  if (selectedKey.value === key) {
    selectedKey.value = null;
  } else {
    selectedKey.value = key;
    selectedFactorValue.value = value;
  }
};

const closeFactor = () => {
  selectedKey.value = null;
};

// Los factores vienen directamente de la nueva lógica integrada en App.vue
const getStageImage = () => {
  // Manejar imagen según idioma (i18n)
  const lang = document.documentElement.lang || 'es';
  return new URL(`../../assets/stages_${lang}.png`, import.meta.url).href;
};

onMounted(() => {
  // GSAP: Stagger Reveal
  gsap.fromTo('.mystic-fadeIn',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power2.out', delay: 0.2 }
  );

  // Animación de los factores Omkin
  gsap.from('.factor-item', {
    opacity: 0,
    x: -20,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out',
    delay: 1
  });
});

const resetForm = () => {
  // Animación de salida antes de resetear
  gsap.to(dashboardRef.value, {
    opacity: 0,
    y: 100,
    duration: 0.8,
    ease: 'power3.in',
    onComplete: () => emit('reset')
  });
};
</script>

<style scoped>
.dashboard-container {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.dashboard-header {
  text-align: center;
  margin-bottom: 1rem;
}

/* Grilla de Números Principales */
.numerology-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.number-card {
  background: var(--bg-glass);
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-glass);
  padding: 2rem; /* ¡Padding corregido! */
  border-radius: 12px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transition: all 0.3s;
}

.number-card:hover {
  border-color: var(--gold-radiant);
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.3);
}

.number-card .label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--text-muted);
}

.number-card .value {
  font-family: var(--font-title);
  font-size: 2.5rem;
  color: var(--gold-radiant);
}

.number-card .desc {
  font-size: 0.85rem;
  color: var(--text-main);
}

.number-card.highlight {
  border: 1px solid var(--gold-radiant);
  background: rgba(212, 175, 55, 0.05);
}

.section-header {
  text-align: left;
  margin-bottom: 1.5rem;
  border-left: 3px solid var(--gold-radiant);
  padding-left: 1rem;
}

.section-header h3 {
  font-family: var(--font-mistic);
  font-size: 1.5rem;
  color: var(--text-main);
  margin: 0;
}

.section-desc {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-top: 0.3rem;
}

/* Omkin Section */
.tantric-layout {
  display: flex;
  align-items: center;
  gap: 3rem;
}

.pentagon-visual-container {
  position: relative;
  width: 100%;
  max-width: 320px;
  height: auto;
  margin: 0 auto;
}

.pentagon-img {
  width: 100%;
  max-height: 300px;
  object-fit: contain;
  filter: drop-shadow(0 0 15px rgba(212, 175, 55, 0.2));
}

.factors-grid {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  flex: 1;
}

/* Pythagoras Section Refinada */
.stages-visual {
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 15px 40px rgba(0,0,0,0.6);
  border: 1px solid var(--border-glass);
}

.stages-img {
  width: 100%;
  max-height: 420px; /* ¡Altura controlada! */
  object-fit: contain;
  background: #000;
  display: block;
}

.factor-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.04);
  padding: 0.8rem 1.2rem;
  border-radius: 8px;
  border-right: 2px solid transparent;
  transition: all 0.3s;
  cursor: pointer;
}

.factor-item:hover, .factor-item.active {
  background: rgba(212, 175, 55, 0.12);
  border-right-color: var(--gold-radiant);
}

/* Panel de Interpretación */
.interpretation-panel {
  margin-top: 2rem;
  padding: 1.5rem;
  border: 1px solid var(--gold-radiant);
  background: rgba(5, 5, 5, 0.95);
  border-radius: 12px;
}

.panel-header h4 {
  color: var(--gold-radiant);
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.mini-btn {
  padding: 0.6rem 1.2rem !important;
  font-size: 0.85rem !important;
  width: auto !important;
  min-width: 130px;
  position: relative;
  overflow: hidden;
}

.pulse-active {
  animation: sintonizando 1s infinite alternate;
  background: white !important;
  color: black !important;
}

@keyframes sintonizando {
  from { box-shadow: 0 0 5px var(--gold-radiant); }
  to { box-shadow: 0 0 20px var(--gold-radiant); }
}

.code-card {
  background: rgba(255, 255, 255, 0.05);
  padding: 1.2rem;
  border-radius: 12px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  border: 1px solid rgba(255,255,255,0.05);
}

.code-digits {
  font-family: var(--font-title);
  font-size: 1.8rem;
  letter-spacing: 4px;
  color: var(--gold-radiant);
}

/* Glosario */
.glossary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  text-align: left;
}

.glossary-item strong {
  display: block;
  color: var(--gold-radiant);
  margin-bottom: 0.5rem;
  font-family: var(--font-primary);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.glossary-item p {
  font-size: 0.85rem;
  color: var(--text-muted);
  line-height: 1.5;
}

/* Animations */
.slide-fade-enter-active {
  transition: all 0.5s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from, .slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

.pulse-anim {
  animation: pulse-gold 2s infinite;
}

@keyframes pulse-gold {
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.4); }
  70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(212, 175, 55, 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(212, 175, 55, 0); }
}

.solfeggio-icon-img {
  width: 60px;
  height: 60px;
  object-fit: contain;
  margin-bottom: 0.5rem;
}

@media (max-width: 768px) {
  .tantric-layout {
    flex-direction: column;
  }
  .pentagon-visual-container {
    width: 100%;
    height: 300px;
  }
  .codes-grid {
    grid-template-columns: 1fr;
  }
}
</style>
