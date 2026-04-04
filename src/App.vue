<template>
  <div class="cosmic-layout">
    <CosmicBackground />
    <GlassHeader />

    <main class="main-content">
      <!-- Orbe dorado de fondo central si no estamos en resultados -->
      <GoldenSphere v-if="!results" />

      <!-- Vistas dinámicas -->
      <DestinyPortal 
        v-if="!results" 
        @calculate="handleCalculation" 
      />

      <div v-else class="results-view">
        <SoulDashboard 
          :results="results" 
          :computedName="formData.computedName"
          @reset="resetForm" 
          @playAudio="() => playLifeScore(results)"
          @playFrequency="(hz) => playFrequency(hz)"
        />
        
        <DivineLibrary />
      </div>
    </main>

    <footer class="app-footer">
      <a href="#" class="ethics-link">{{ $t('app.footerLink') }}</a>
    </footer>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import CosmicBackground from './components/layout/CosmicBackground.vue';
import GlassHeader from './components/ui/GlassHeader.vue';
import GoldenSphere from './components/GoldenSphere.vue';
import DestinyPortal from './components/views/DestinyPortal.vue';
import SoulDashboard from './components/views/SoulDashboard.vue';
import DivineLibrary from './components/monetization/DivineLibrary.vue';

import { 
  calcLifePath, 
  calcSoulNumber, 
  calcPersonalityNumber, 
  calcDestinyNumber 
} from './composables/useNumerology.js';

import { useNumerologyOmkin } from './composables/useNumerologyOmkin.js';
import { useAudioSynthesis } from './composables/useAudioSynthesis.js';

const { calculateOmkin } = useNumerologyOmkin();
const { playFrequency, playLifeScore } = useAudioSynthesis();

const formData = reactive({
  computedName: ''
});

const results = ref(null);

const handleCalculation = (data) => {
  formData.computedName = data.fullName;
  
  // Extraer día, mes y año de la fecha YYYY-MM-DD
  const [year, month, day] = data.birthDate.split('-').map(Number);
  
  // Realizar cálculos Pitagóricos
  const soul = calcSoulNumber(data.fullName);
  const personality = calcPersonalityNumber(data.fullName);
  
  // Realizar cálculos Omkin Kay
  const omkin = calculateOmkin(data.birthDate);
  
  results.value = {
    lifePath: calcLifePath(day, month, year),
    soulNumber: soul,
    personalityNumber: personality,
    destinyNumber: calcDestinyNumber(soul, personality),
    omkin: omkin // Añadido sistema Tántrico
  };
};

const resetForm = () => {
  results.value = null;
  formData.computedName = '';
};
</script>

<style>
/* Estilos globales y reseteos para la estructura fluida */
.cosmic-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bg-main);
  color: var(--text-main);
  position: relative;
  overflow-x: hidden;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 8rem 2rem 4rem 2rem; /* Más espacio lateral y superior */
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.results-view {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem; /* Espacio entre el dashboard y la biblioteca */
}

.app-footer {
  text-align: center;
  padding: 3rem;
  z-index: 2;
  position: relative;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.ethics-link {
  color: rgba(255,255,255,0.3);
  text-decoration: none;
  font-size: 0.85rem;
  letter-spacing: 1px;
  transition: all 0.3s;
}

.ethics-link:hover {
  color: var(--gold-radiant);
  text-shadow: 0 0 10px var(--gold-glow);
}
</style>
