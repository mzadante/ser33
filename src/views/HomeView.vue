<template>
  <div>
    <DestinyPortal @calculate="handleCalculation" />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useNumerologyStore } from '../stores/numerology';
import DestinyPortal from '../components/views/DestinyPortal.vue';

import { 
  calcLifePath, 
  calcSoulNumber, 
  calcPersonalityNumber, 
  calcDestinyNumber 
} from '../composables/useNumerology.js';
import { useNumerologyOmkin } from '../composables/useNumerologyOmkin.js';
import { useGematria } from '../composables/useGematria.js';
import { useAdvancedNumerology } from '../composables/useAdvancedNumerology.js';

const router = useRouter();
const store = useNumerologyStore();
const { calculateOmkin } = useNumerologyOmkin();
const { getGematriaReport } = useGematria();
const { getAdvancedReport } = useAdvancedNumerology();

const handleCalculation = (data) => {
  store.setFormData(data.fullName, data.birthDate);
  
  const [year, month, day] = data.birthDate.split('-').map(Number);
  
  const soul = calcSoulNumber(data.fullName);
  const personality = calcPersonalityNumber(data.fullName);
  const lifePath = calcLifePath(day, month, year);
  const destinyNumber = calcDestinyNumber(soul, personality);
  const omkin = calculateOmkin(data.birthDate);
  
  const results = {
    lifePath,
    soulNumber: soul,
    personalityNumber: personality,
    destinyNumber,
    omkin,
    gematria: getGematriaReport(data.fullName),
    advanced: getAdvancedReport(day, month, year, data.fullName, lifePath, destinyNumber),
    birthDay: day,
    birthMonth: month,
    birthYear: year
  };

  store.setResults(results);
  router.push('/results');
};
</script>
