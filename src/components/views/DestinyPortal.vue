<template>
  <div class="portal-container glass-panel" ref="portalRef">
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

const localData = reactive({
  fullName: '',
  birthDate: ''
});

onMounted(() => {
  // GSAP Entrada Inicial del Formulario
  gsap.fromTo(portalRef.value, 
    { opacity: 0, y: 50, scale: 0.95 },
    { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: 'power3.out' }
  );
});

const submitForm = () => {
  // Ocultar formulario suavemente antes de emitir y desmontar
  gsap.to(portalRef.value, {
    opacity: 0,
    y: -50,
    scale: 0.95,
    filter: 'blur(10px)',
    duration: 0.8,
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
  max-width: 500px;
  margin: 0 auto;
  position: relative;
  z-index: 10;
}

.instruction {
  margin-bottom: 2rem;
  color: rgba(255,255,255,0.7);
}

.destiny-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.input-group label {
  font-family: var(--font-primary);
  font-size: 0.9rem;
  color: var(--gold-radiant);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

input {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-glass);
  padding: 1rem;
  border-radius: 8px;
  color: var(--text-main);
  font-family: var(--font-primary);
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;
}

input:focus {
  background: rgba(255, 255, 255, 0.1);
  border-color: var(--gold-radiant);
  box-shadow: 0 0 15px rgba(212, 175, 55, 0.2);
}
</style>
