<template>
    <div class="portal-container glass-panel" ref="portalRef">
      <!-- Mural decorativo superior -->
      <div class="portal-visual-header" ref="visualRef"></div>

      <h2>{{ $t('form.title') }}</h2>
      <p class="instruction">{{ $t('form.instruction') }}</p>
      
      <form @submit.prevent="submitForm" class="destiny-form">
        <div class="input-group">
          <label for="fullName">{{ $t('form.nameLabel') }}</label>
          <input 
            id="fullName" 
            v-model="localData.fullName" 
            type="text" 
            required 
            :placeholder="$t('form.namePlaceholder')"
            autocomplete="off"
          />
        </div>

        <div class="input-group">
          <label for="birthDate">{{ $t('form.dateLabel') }}</label>
          <input 
            id="birthDate" 
            v-model="localData.birthDate" 
            type="date" 
            required 
          />
        </div>

        <button type="submit" class="btn-gold">{{ $t('form.submitBtn') }}</button>
      </form>
    </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import gsap from 'gsap';

const emit = defineEmits(['calculate']);
const portalRef = ref(null);
const visualRef = ref(null);

const localData = reactive({
  fullName: '',
  birthDate: ''
});

onMounted(() => {
  // GSAP Entrada Inicial
  gsap.fromTo(visualRef.value, 
    { opacity: 0, scale: 0.8, filter: 'blur(30px)' },
    { opacity: 0.6, scale: 1, filter: 'blur(0px)', duration: 2.5, ease: 'power2.out' }
  );

  gsap.fromTo(portalRef.value, 
    { opacity: 0, y: 50, scale: 0.95 },
    { opacity: 1, y: 0, scale: 1, duration: 1.5, delay: 0.5, ease: 'power3.out' }
  );
});

const submitForm = () => {
  // Ocultar suavemente
  gsap.to([portalRef.value, visualRef.value], {
    opacity: 0,
    y: (i) => i === 0 ? -50 : 0,
    scale: 0.95,
    filter: 'blur(10px)',
    duration: 0.8,
    stagger: 0.2,
    ease: 'power2.in',
    onComplete: () => {
      emit('calculate', localData);
    }
  });
};
</script>

<style scoped>
.portal-container {
  width: 100%;
  max-width: 480px;
  position: relative;
  z-index: 10;
  margin-top: 2rem;
  overflow: hidden; /* Importante para redondear la imagen superior */
}

.portal-visual-header {
  width: 110%;
  margin-left: -5%;
  height: 180px;
  background: url('@/assets/destiny_portal.png') center/cover no-repeat;
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--gold-glow);
  mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
}

.instruction {
  margin-bottom: 2rem;
  color: rgba(255,255,255,0.7);
  font-size: 0.95rem;
  padding: 0 2rem;
}

.destiny-form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.input-group label {
  font-family: var(--font-primary);
  font-size: 0.8rem;
  color: var(--gold-radiant);
  margin-bottom: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 600;
}
</style>
