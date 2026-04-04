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

    <!-- Placeholders Funcionales para la Lógica Futura -->
    <div class="future-modules-grid">
      
      <!-- Placeholder: Síntesis de Sonido 432Hz -->
      <div class="module-placeholder audio-module mystic-fadeIn">
        <div class="module-icon">🎵</div>
        <h3>Resonancia 432Hz</h3>
        <p>Pendiente: Motor de Síntesis Web Audio</p>
        <button class="btn-gold outline-btn disabled" disabled>
          Próximamente
        </button>
      </div>

      <!-- Placeholder: Secuencias Grabovoi -->
      <div class="module-placeholder grabovoi-module mystic-fadeIn">
        <div class="module-icon">🔢</div>
        <h3>Secuencias de Activación</h3>
        <p>Pendiente: Lógica de Física Rusa</p>
        <div class="grabovoi-mock">318 798</div>
      </div>
      
    </div>

    <button @click="resetForm" class="btn-gold outline-btn back-btn mystic-fadeIn">{{ $t('results.resetBtn') }}</button>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import gsap from 'gsap';

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

const emit = defineEmits(['reset']);
const dashboardRef = ref(null);

onMounted(() => {
  // GSAP: Stagger Reveal para un efecto WoW
  gsap.fromTo('.mystic-fadeIn', 
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power2.out', delay: 0.2 }
  );

  // Animar las cartas de numeros una por una
  gsap.fromTo('.number-card-anim',
    { opacity: 0, scale: 0.8, rotationX: -15 },
    { opacity: 1, scale: 1, rotationX: 0, duration: 0.8, stagger: 0.15, ease: 'back.out(1.2)', delay: 0.5 }
  );
  
  // Destello extra en la carta de destino
  gsap.to('.destiny-card', {
    boxShadow: '0 0 30px rgba(212, 175, 55, 0.4)',
    duration: 2,
    yoyo: true,
    repeat: -1,
    ease: 'sine.inOut',
    delay: 2
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
  gap: 2rem;
}

.dashboard-header {
  text-align: center;
  padding: 2rem;
}

.dashboard-header .subtitle {
  color: var(--gold-radiant);
  font-family: var(--font-primary);
  letter-spacing: 2px;
  font-size: 1.2rem;
  margin-top: 0.5rem;
  text-transform: uppercase;
}

/* Modulos Futuros Placeholders */
.future-modules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 1rem;
}

.module-placeholder {
  background: rgba(10, 10, 15, 0.6);
  backdrop-filter: blur(10px);
  border: 1px dashed rgba(255,255,255,0.2);
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s;
}

.module-placeholder:hover {
  border-color: rgba(212, 175, 55, 0.5);
}

.module-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  opacity: 0.8;
}

.module-placeholder h3 {
  font-family: var(--font-mistic);
  color: var(--text-main);
  margin-bottom: 0.5rem;
}

.module-placeholder p {
  color: rgba(255,255,255,0.5);
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
}

.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.grabovoi-mock {
  font-family: var(--font-primary);
  font-size: 1.8rem;
  color: var(--gold-radiant);
  letter-spacing: 5px;
  background: rgba(212, 175, 55, 0.1);
  padding: 10px;
  border-radius: 6px;
  display: inline-block;
}

.back-btn {
  align-self: center;
  margin-top: 1rem;
}
</style>
