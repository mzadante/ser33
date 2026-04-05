<template>
  <div class="number-detail-wrapper" ref="wrapperRef">
    <!-- Hero Cinematográfico -->
    <section class="hero-section">
      <span class="watermark-number">{{ number }}</span>
      <div class="hero-content" ref="heroContent">
        <span class="hero-tag" v-if="data.isMaster"><IconMasterStar :size="14" class="inline-icon" /> NÚMERO MAESTRO <IconMasterStar :size="14" class="inline-icon" /></span>
        <h1 class="hero-keyword">{{ data.keyword }}</h1>
        <p class="hero-essence">{{ data.essence }}</p>
        <div class="hero-meta">
          <span>{{ data.element }}</span>
          <span class="separator">•</span>
          <span>{{ data.geometry }}</span>
          <span class="separator">•</span>
          <span>{{ data.arcana }}</span>
        </div>
        <div class="hero-keywords">
          <span v-for="kw in data.keywords" :key="kw" class="kw-chip">{{ kw }}</span>
        </div>
      </div>
      <div class="scroll-indicator">
        <span class="scroll-text">Descubre tu vibración</span>
        <span class="scroll-arrow"><IconScrollDown :size="28" :animated="true" /></span>
      </div>
    </section>

    <!-- Bloque de Vibración -->
    <section class="vibration-section">
      <p class="vibration-quote reveal-block">"{{ data.vibration }}"</p>
    </section>

    <!-- Contexto Dinámico -->
    <section class="context-section reveal-block" v-if="context">
      <div class="context-badge">{{ contextLabel }}</div>
      <p class="context-text">{{ contextDescription }}</p>
    </section>

    <!-- Interpretación Profunda: Luz -->
    <section class="interpretation-section reveal-block">
      <div class="interp-card light-card">
        <div class="interp-icon"><IconSunLight :size="32" :glow="true" /></div>
        <h3>Vibración en Luz</h3>
        <p>{{ data.light }}</p>
      </div>
    </section>

    <!-- Interpretación Profunda: Sombra -->
    <section class="interpretation-section reveal-block">
      <div class="interp-card shadow-card">
        <div class="interp-icon"><IconMoonShadow :size="32" :glow="true" /></div>
        <h3>Vibración en Sombra</h3>
        <p>{{ data.shadow }}</p>
      </div>
    </section>

    <!-- Tarea Evolutiva -->
    <section class="interpretation-section reveal-block">
      <div class="interp-card mission-card">
        <div class="interp-icon"><IconTargetMission :size="32" :glow="true" /></div>
        <h3>Tu Tarea Evolutiva</h3>
        <p>{{ data.mission }}</p>
      </div>
    </section>

    <!-- Herramientas de Activación -->
    <section class="activation-section reveal-block">
      <h3 class="section-title">Herramientas de Activación</h3>
      <div class="activation-grid">
        <div class="activation-item">
          <span class="act-label">Frecuencia Solfeggio</span>
          <span class="act-value">{{ solfeggioHz }} Hz</span>
          <button class="btn-gold mini-btn" @click="$emit('playFrequency', solfeggioHz)">
            Sintonizar
          </button>
        </div>
        <div class="activation-item">
          <span class="act-label">Día ideal para este número</span>
          <p class="act-desc">{{ data.dayDesc }}</p>
        </div>
        <div class="activation-item">
          <span class="act-label">Año personal bajo esta vibración</span>
          <p class="act-desc">{{ data.yearDesc }}</p>
        </div>
      </div>
    </section>

    <!-- Responsabilidad Maestra -->
    <section class="master-section reveal-block" v-if="data.isMaster">
      <div class="master-box">
        <h3><IconLightning :size="20" class="inline-icon" /> Responsabilidad del Número Maestro</h3>
        <p>{{ data.responsibility }}</p>
      </div>
    </section>

    <!-- Botón de Retorno -->
    <section class="return-section">
      <button class="btn-gold outline-btn" @click="$emit('back')">
        ← Volver a tu Mapa
      </button>
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IconSunLight, IconMoonShadow, IconTargetMission, IconLightning, IconMasterStar, IconScrollDown } from '../icons';

gsap.registerPlugin(ScrollTrigger);

const props = defineProps({
  number: { type: Number, required: true },
  data: { type: Object, required: true },
  context: { type: String, default: null },    // "lifePath", "soul", "personality", "destiny", or omkin key
  contextLabel: { type: String, default: '' },
  contextDescription: { type: String, default: '' }
});

defineEmits(['back', 'playFrequency']);

const wrapperRef = ref(null);
const heroContent = ref(null);

const SOLFEGGIO_MAP = {
  1: 174, 2: 285, 3: 396, 4: 417, 5: 528,
  6: 639, 7: 741, 8: 852, 9: 963, 10: 432,
  11: 528, 22: 639, 33: 963
};

const solfeggioHz = computed(() => SOLFEGGIO_MAP[props.number] || 432);

onMounted(() => {
  // Hero animations (GTA VI style)
  const tl = gsap.timeline();
  
  tl.from('.watermark-number', {
    scale: 3, opacity: 0, duration: 1.2, ease: 'power3.out'
  })
  .from('.hero-keyword', {
    y: 60, opacity: 0, duration: 0.8, ease: 'power2.out'
  }, '-=0.5')
  .from('.hero-essence', {
    y: 40, opacity: 0, duration: 0.6, ease: 'power2.out'
  }, '-=0.3')
  .from('.hero-meta span', {
    y: 20, opacity: 0, stagger: 0.1, duration: 0.5, ease: 'power2.out'
  }, '-=0.2')
  .from('.kw-chip', {
    scale: 0, opacity: 0, stagger: 0.08, duration: 0.4, ease: 'back.out(1.7)'
  }, '-=0.2');

  // Scroll indicator pulse
  gsap.to('.scroll-arrow', {
    y: 10, yoyo: true, repeat: -1,
    duration: 1.2, ease: 'sine.inOut'
  });

  // Scroll-triggered reveals (GTA VI text reveal style)
  gsap.utils.toArray('.reveal-block').forEach(block => {
    gsap.from(block, {
      y: 60, opacity: 0, duration: 1,
      scrollTrigger: {
        trigger: block,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  });
});
</script>

<style scoped>
.number-detail-wrapper {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 10;
}

/* Hero Section */
.hero-section {
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  padding: 2rem;
}

.watermark-number {
  position: absolute;
  font-family: var(--font-title);
  font-size: clamp(12rem, 30vw, 20rem);
  color: rgba(212, 175, 55, 0.06);
  z-index: 0;
  user-select: none;
  line-height: 1;
}

.hero-content {
  position: relative;
  z-index: 1;
}

.hero-tag {
  display: inline-block;
  color: var(--gold-radiant);
  font-size: 0.75rem;
  letter-spacing: 4px;
  text-transform: uppercase;
  margin-bottom: 1rem;
  padding: 0.4rem 1.2rem;
  border: 1px solid var(--gold-radiant);
  border-radius: 20px;
}

.hero-keyword {
  font-family: var(--font-title);
  font-size: clamp(2.5rem, 6vw, 4rem);
  color: var(--gold-radiant);
  margin: 0.5rem 0;
  line-height: 1.1;
}

.hero-essence {
  font-size: 1.2rem;
  color: var(--text-muted);
  font-style: italic;
  margin-bottom: 1.5rem;
}

.hero-meta {
  display: flex;
  justify-content: center;
  gap: 0.8rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
  font-size: 0.85rem;
  color: rgba(255,255,255,0.5);
}

.separator {
  color: var(--gold-radiant);
}

.hero-keywords {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.kw-chip {
  padding: 0.3rem 0.8rem;
  border: 1px solid rgba(212, 175, 55, 0.3);
  border-radius: 16px;
  font-size: 0.75rem;
  color: var(--gold-radiant);
  letter-spacing: 1px;
  text-transform: uppercase;
}

/* Scroll Indicator */
.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.scroll-text {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: rgba(255,255,255,0.3);
}

.scroll-arrow {
  font-size: 1.5rem;
  color: var(--gold-radiant);
  opacity: 0.6;
}

/* Vibration Section */
.vibration-section {
  padding: 4rem 2rem;
  text-align: center;
}

.vibration-quote {
  font-family: var(--font-title);
  font-size: clamp(1.4rem, 3vw, 2rem);
  color: rgba(255,255,255, 0.7);
  font-style: italic;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
}

/* Context Section */
.context-section {
  padding: 2rem;
  margin: 2rem 0;
}

.context-badge {
  display: inline-block;
  background: rgba(212, 175, 55, 0.15);
  color: var(--gold-radiant);
  padding: 0.4rem 1rem;
  border-radius: 4px;
  font-size: 0.75rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.context-text {
  font-size: 1.1rem;
  color: var(--text-main);
  line-height: 1.7;
}

/* Interpretation Cards */
.interpretation-section {
  padding: 1rem 2rem;
}

.interp-card {
  background: var(--bg-glass);
  backdrop-filter: blur(16px);
  border: 1px solid var(--border-glass);
  border-radius: 16px;
  padding: 2.5rem;
  position: relative;
  overflow: hidden;
}

.interp-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.interp-card h3 {
  font-family: var(--font-primary);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 3px;
  margin-bottom: 1rem;
}

.interp-card p {
  font-size: 1rem;
  line-height: 1.8;
  color: rgba(255,255,255,0.85);
}

.light-card {
  border-left: 4px solid #a3e635;
}
.light-card h3 { color: #a3e635; }

.shadow-card {
  border-left: 4px solid #f87171;
}
.shadow-card h3 { color: #f87171; }

.mission-card {
  border-left: 4px solid var(--gold-radiant);
}
.mission-card h3 { color: var(--gold-radiant); }

/* Activation Section */
.activation-section {
  padding: 3rem 2rem;
}

.section-title {
  font-family: var(--font-title);
  font-size: 1.5rem;
  color: var(--gold-radiant);
  text-align: center;
  margin-bottom: 2rem;
}

.activation-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
}

.activation-item {
  background: var(--bg-glass);
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-glass);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  align-items: center;
}

.act-label {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--text-muted);
}

.act-value {
  font-family: var(--font-title);
  font-size: 1.8rem;
  color: var(--gold-radiant);
}

.act-desc {
  font-size: 0.9rem;
  color: rgba(255,255,255,0.7);
  line-height: 1.5;
}

/* Master Section */
.master-section {
  padding: 2rem;
}

.master-box {
  background: linear-gradient(135deg, rgba(212,175,55,0.1) 0%, rgba(0,0,0,0.4) 100%);
  border: 1px solid var(--gold-radiant);
  border-radius: 16px;
  padding: 2.5rem;
  text-align: center;
}

.master-box h3 {
  color: var(--gold-radiant);
  font-family: var(--font-title);
  font-size: 1.3rem;
  margin-bottom: 1rem;
}

.master-box p {
  font-size: 1.1rem;
  line-height: 1.7;
  color: rgba(255,255,255,0.85);
}

/* Return Section */
.return-section {
  padding: 4rem 2rem;
  text-align: center;
}

.mini-btn {
  padding: 0.6rem 1.2rem !important;
  font-size: 0.85rem !important;
  width: auto !important;
}
</style>
