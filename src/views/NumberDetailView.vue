<template>
  <NumberDetail
    v-if="selectedNumber"
    :number="selectedNumber.value"
    :data="selectedNumber.data"
    :context="selectedNumber.context"
    :contextLabel="selectedNumber.contextLabel"
    :contextDescription="selectedNumber.contextDescription"
    @back="goBack"
    @playFrequency="playFrequencyCb"
  />
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useNumerologyStore } from '../stores/numerology';
import { useAudioSynthesis } from '../composables/useAudioSynthesis';
import NumberDetail from '../components/views/NumberDetail.vue';

const router = useRouter();
const store = useNumerologyStore();
const { playFrequency } = useAudioSynthesis();

const selectedNumber = computed(() => store.selectedNumber);

onMounted(() => {
  if (!selectedNumber.value) {
    router.replace('/results');
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

const goBack = () => {
  router.push('/results');
};

const playFrequencyCb = (hz) => playFrequency(hz);
</script>
