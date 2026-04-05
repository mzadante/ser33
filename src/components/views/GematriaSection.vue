<template>
  <section class="gematria-section" ref="sectionRef">
    <div class="section-header">
      <h2 class="sacred-title">{{ $t('results.gematria.title') }}</h2>
      <p class="sacred-subtitle">{{ $t('results.gematria.subtitle') }}</p>
    </div>

    <div class="gematria-grid">
      <!-- Card: Chaldean -->
      <div class="gematria-card chaldean-card">
        <div class="card-icon">
          <IconMasterStar size="40" color="var(--gold-radiant)" />
        </div>
        <h3 class="card-title">{{ $t('results.gematria.chaldean') }}</h3>
        <p class="card-desc">{{ $t('results.gematria.chaldeanDesc') }}</p>
        <div class="counter-container">
          <span class="gematria-value">{{ data.chaldean }}</span>
        </div>
        <div class="card-decoration"></div>
      </div>

      <!-- Card: Simple -->
      <div class="gematria-card simple-card">
        <div class="card-icon">
          <IconInfinity size="40" color="var(--gold-radiant)" />
        </div>
        <h3 class="card-title">{{ $t('results.gematria.simple') }}</h3>
        <p class="card-desc">{{ $t('results.gematria.simpleDesc') }}</p>
        <div class="counter-container">
          <span class="gematria-value">{{ data.simple }}</span>
        </div>
        <div class="card-decoration"></div>
      </div>

      <!-- Card: Hebrew -->
      <div class="gematria-card hebrew-card">
        <div class="card-icon">
          <IconLightning size="40" color="var(--gold-radiant)" />
        </div>
        <h3 class="card-title">{{ $t('results.gematria.hebrew') }}</h3>
        <p class="card-desc">{{ $t('results.gematria.hebrewDesc') }}</p>
        <div class="counter-container">
          <span class="gematria-value">{{ data.hebrew }}</span>
        </div>
        <div class="card-decoration"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import gsap from 'gsap';
import IconMasterStar from '../icons/IconMasterStar.vue';
import IconInfinity from '../icons/IconInfinity.vue';
import IconLightning from '../icons/IconLightning.vue';

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
});

const sectionRef = ref(null);

onMounted(() => {
  gsap.from('.gematria-card', {
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: 'power4.out'
  });

  gsap.from('.gematria-value', {
    textContent: 0,
    duration: 2,
    ease: 'power2.out',
    snap: { textContent: 1 },
    stagger: 0.2
  });
});
</script>

<style scoped>
.gematria-section {
  width: 100%;
  max-width: 1100px;
  margin: 4rem auto;
  padding: 3rem;
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 215, 0, 0.1);
  border-radius: 2rem;
  position: relative;
  overflow: hidden;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.sacred-title {
  font-size: 2.5rem;
  font-weight: 300;
  letter-spacing: 4px;
  background: linear-gradient(to bottom, #fff, var(--gold-radiant));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.sacred-subtitle {
  color: rgba(255,255,255,0.5);
  font-weight: 300;
  letter-spacing: 1px;
}

.gematria-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.gematria-card {
  position: relative;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 3rem 2rem;
  border-radius: 1.5rem;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.gematria-card:hover {
  transform: translateY(-10px);
  border-color: var(--gold-radiant);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(212, 175, 55, 0.1);
}

.card-icon {
  filter: drop-shadow(0 0 10px rgba(212, 175, 55, 0.3));
}

.card-title {
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 500;
  color: #fff;
}

.card-desc {
  font-size: 0.9rem;
  color: rgba(255,255,255,0.4);
  line-height: 1.4;
  height: 2.5rem;
}

.counter-container {
  margin-top: 1rem;
}

.gematria-value {
  font-family: 'Outfit', sans-serif;
  font-size: 4rem;
  font-weight: 200;
  color: var(--gold-radiant);
  text-shadow: 0 0 30px rgba(212, 175, 55, 0.4);
}

.card-decoration {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 40%;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--gold-radiant), transparent);
  opacity: 0.3;
}

@media (max-width: 768px) {
  .gematria-section {
    padding: 2rem 1rem;
    margin: 2rem 1rem;
  }
}
</style>
