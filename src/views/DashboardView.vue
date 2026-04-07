<template>
  <div class="results-view" v-if="results">
    <SoulDashboard 
      :results="results" 
      :computedName="computedName"
      @reset="resetForm" 
      @playAudio="playAudio"
      @playFrequency="playFrequencyCb"
      @viewNumber="openNumberDetail"
    />

    <GematriaSection 
      v-if="results.gematria" 
      :data="results.gematria" 
    />

    <AdvancedNumerologySection
      v-if="results.advanced"
      :data="results.advanced"
      :birthYear="results.birthYear"
    />
    
    <DivineLibrary />
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useNumerologyStore } from '../stores/numerology';
import { useAudioSynthesis } from '../composables/useAudioSynthesis';
import { useI18n } from 'vue-i18n';
import SoulDashboard from '../components/views/SoulDashboard.vue';
import GematriaSection from '../components/views/GematriaSection.vue';
import AdvancedNumerologySection from '../components/views/AdvancedNumerologySection.vue';
import DivineLibrary from '../components/monetization/DivineLibrary.vue';
import { interpretations } from '../data/interpretations';

// Lazy loading the components instead
// but since they are already dynamically shown, we will leave them imported normally for now
// and refactor for actual lazy loading correctly in step 2.3

const router = useRouter();
const store = useNumerologyStore();
const { playFrequency, playLifeScore } = useAudioSynthesis();
const { locale } = useI18n();

const results = computed(() => store.results);
const computedName = computed(() => store.formData.computedName);

onMounted(() => {
  if (!results.value) {
    console.warn('No results found in store, redirecting home...');
    router.replace('/');
  }
});

const resetForm = () => {
  store.clearResults();
  router.push('/');
};

const playAudio = () => playLifeScore(results.value);
const playFrequencyCb = (hz) => playFrequency(hz);

const openNumberDetail = ({ value, context, contextLabel, contextDescription }) => {
  const currentLang = locale.value || 'es';
  const numData = interpretations[currentLang].numbers[value];
  if (!numData) return;
  
  store.setSelectedNumber({
    value,
    data: numData,
    context,
    contextLabel,
    contextDescription
  });

  router.push(`/number/${value}`);
};
</script>

<style scoped>
.results-view {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
}
</style>
