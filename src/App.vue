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

const formData = reactive({
  computedName: ''
});

const results = ref(null);

const handleCalculation = (data) => {
  formData.computedName = data.fullName;
  
  // Extraer día, mes y año de la fecha YYYY-MM-DD
  const [year, month, day] = data.birthDate.split('-').map(Number);
  
  // Realizar cálculos
  const soul = calcSoulNumber(data.fullName);
  const personality = calcPersonalityNumber(data.fullName);
  
  results.value = {
    lifePath: calcLifePath(day, month, year),
    soulNumber: soul,
    personalityNumber: personality,
    destinyNumber: calcDestinyNumber(soul, personality)
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
  padding: 6rem 1rem 2rem 1rem; /* Pad top para el glass header fijo */
  position: relative;
  z-index: 2;
  width: 100%;
}

.results-view {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.app-footer {
  text-align: center;
  padding: 2rem;
  z-index: 2;
  position: relative;
}

.ethics-link {
  color: rgba(255,255,255,0.4);
  text-decoration: none;
  font-size: 0.8rem;
  transition: color 0.3s;
}

.ethics-link:hover {
  color: var(--gold-radiant);
}
</style>
