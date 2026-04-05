<template>
  <div class="cosmic-layout">
    <CosmicBackground />
    <GlassHeader />

    <main class="main-content">
      <!-- Orbe dorado si no estamos en resultados -->
      <GoldenSphere v-if="!results" />

      <!-- Vista: Portal de Entrada -->
      <DestinyPortal 
        v-if="!results && !selectedNumber" 
        @calculate="handleCalculation" 
      />

      <!-- Vista: Detalle de Número (GTA VI Style) -->
      <NumberDetail
        v-else-if="selectedNumber"
        :number="selectedNumber.value"
        :data="selectedNumber.data"
        :context="selectedNumber.context"
        :contextLabel="selectedNumber.contextLabel"
        :contextDescription="selectedNumber.contextDescription"
        @back="closeNumberDetail"
        @playFrequency="(hz) => playFrequency(hz)"
      />

      <!-- Vista: Dashboard de Resultados -->
      <div v-else class="results-view">
        <SoulDashboard 
          :results="results" 
          :computedName="formData.computedName"
          @reset="resetForm" 
          @playAudio="() => playLifeScore(results)"
          @playFrequency="(hz) => playFrequency(hz)"
          @viewNumber="openNumberDetail"
        />

        <GematriaSection 
          v-if="results.gematria" 
          :data="results.gematria" 
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
import NumberDetail from './components/views/NumberDetail.vue';
import DivineLibrary from './components/monetization/DivineLibrary.vue';

import { 
  calcLifePath, 
  calcSoulNumber, 
  calcPersonalityNumber, 
  calcDestinyNumber 
} from './composables/useNumerology.js';

import { useNumerologyOmkin } from './composables/useNumerologyOmkin.js';
import { useGematria } from './composables/useGematria.js';
import { useAudioSynthesis } from './composables/useAudioSynthesis.js';
import { interpretations } from './data/interpretations.js';
import GematriaSection from './components/views/GematriaSection.vue';

const { calculateOmkin } = useNumerologyOmkin();
const { getGematriaReport } = useGematria();
const { playFrequency, playLifeScore } = useAudioSynthesis();

const formData = reactive({
  computedName: ''
});

const results = ref(null);
const selectedNumber = ref(null);

const handleCalculation = (data) => {
  formData.computedName = data.fullName;
  
  const [year, month, day] = data.birthDate.split('-').map(Number);
  
  const soul = calcSoulNumber(data.fullName);
  const personality = calcPersonalityNumber(data.fullName);
  const omkin = calculateOmkin(data.birthDate);
  
  results.value = {
    lifePath: calcLifePath(day, month, year),
    soulNumber: soul,
    personalityNumber: personality,
    destinyNumber: calcDestinyNumber(soul, personality),
    omkin: omkin,
    gematria: getGematriaReport(data.fullName)
  };
};

const openNumberDetail = ({ value, context, contextLabel, contextDescription }) => {
  const numData = interpretations.es.numbers[value];
  if (!numData) return;
  
  selectedNumber.value = {
    value,
    data: numData,
    context,
    contextLabel,
    contextDescription
  };

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const closeNumberDetail = () => {
  selectedNumber.value = null;
};

const resetForm = () => {
  results.value = null;
  selectedNumber.value = null;
  formData.computedName = '';
};
</script>

<style>
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
  padding: 8rem 2rem 4rem 2rem;
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
  gap: 3rem;
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
