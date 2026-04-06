<template>
  <div class="soul-card-generator">
    <button @click="generateAndDownload" class="btn-primary share-btn" :disabled="isGenerating">
      <span v-if="isGenerating">{{ $t('results.soulCard.generating') }}...</span>
      <span v-else>✨ {{ $t('results.soulCard.button') }}</span>
    </button>

    <!-- Canvas Template (Hidden but rendered for html2canvas) -->
    <div style="position: absolute; overflow: hidden; height: 0; width: 0;">
      <div 
        ref="cardRef" 
        class="soul-card-template"
        :style="{ backgroundImage: `url(${bgImage})` }"
      >
        <div class="card-content">
          <div class="card-brand">
            <span class="ser-text">ser</span><span class="gold-text">33</span>
          </div>
          
          <h2 class="card-name">{{ userName }}</h2>
          <div class="card-date">{{ birthDate }}</div>
          
          <div class="numbers-layout">
            <div class="main-number">
              <span class="number-label">{{ $t('results.lifePath') }}</span>
              <span class="number-value gold-glow">{{ lifePathValue }}</span>
            </div>
            
            <div class="secondary-numbers">
              <div class="num-box">
                <span class="s-label">{{ $t('results.soul') }}</span>
                <span class="s-value">{{ soulValue }}</span>
              </div>
              <div class="num-box">
                <span class="s-label">{{ $t('results.destiny') }}</span>
                <span class="s-value">{{ destinyValue }}</span>
              </div>
            </div>
          </div>

          <div class="card-footer">
            <p class="insight">{{ essenceText }}</p>
            <span class="website">www.ser33.com</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import html2canvas from 'html2canvas';
import bgImageSrc from '@/assets/El Lienzo del Alma.webp';

const props = defineProps({
  userName: String,
  birthDate: String,
  lifePathValue: [Number, String],
  soulValue: [Number, String],
  destinyValue: [Number, String],
  essenceText: String
});

const cardRef = ref(null);
const isGenerating = ref(false);
const bgImage = ref(bgImageSrc);

const generateAndDownload = async () => {
  if (!cardRef.value) return;
  isGenerating.value = true;
  
  try {
    // Renderear con html2canvas asegurando estilos oscuros y transparentes
    const canvas = await html2canvas(cardRef.value, {
      scale: 2, // Alta calidad para retina displays/Instagram
      useCORS: true,
      backgroundColor: '#0a0a0f'
    });
    
    const image = canvas.toDataURL("image/png", 1.0);
    const link = document.createElement('a');
    
    const safeName = (props.userName || 'user').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '_');
    link.download = `SoulCard_ser33_${safeName}.png`;
    link.href = image;
    link.click();
  } catch (error) {
    console.error("Error generando la Soul Card:", error);
  } finally {
    setTimeout(() => {
      isGenerating.value = false;
    }, 1000);
  }
};
</script>

<style scoped>
.soul-card-generator {
  display: inline-block;
}

.share-btn {
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(139, 115, 36, 0.4) 100%);
  border: 1px solid var(--gold-glow);
  color: var(--text-main);
  padding: 12px 24px;
  border-radius: 8px;
  font-family: var(--font-mistic);
  font-size: 1.1rem;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 15px rgba(212, 175, 55, 0.15);
}

.share-btn:hover {
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.3) 0%, rgba(139, 115, 36, 0.6) 100%);
  transform: translateY(-2px);
  box-shadow: 0 0 25px rgba(212, 175, 55, 0.3);
}

.share-btn:disabled {
  opacity: 0.7;
  cursor: wait;
}

/* Plantilla de Tarjeta para Generación Estática (Ancho/Alto fijo para Instagram Stories ratio aproximado 9:16) */
.soul-card-template {
  width: 540px;
  height: 960px;
  background-size: cover;
  background-position: center;
  position: relative;
  font-family: 'Inter', sans-serif;
  color: #fff;
}

.card-content {
  position: absolute;
  inset: 0;
  padding: 60px 40px;
  display: flex;
  flex-direction: column;
  background: linear-gradient(to bottom, rgba(10,10,15,0.2) 0%, rgba(10,10,15,0.85) 100%);
}

.card-brand {
  text-align: center;
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.5rem;
  font-weight: 300;
  margin-bottom: 60px;
}
.ser-text { text-transform: lowercase; opacity: 0.9; }
.gold-text { color: #D4AF37; font-weight: 600; margin-left: 2px; }

.card-name {
  font-family: 'Cormorant Garamond', serif;
  text-align: center;
  font-size: 3.2rem;
  font-weight: 600;
  color: #FFD700;
  margin: 0 0 10px 0;
  text-shadow: 0 4px 15px rgba(212, 175, 55, 0.4);
}

.card-date {
  text-align: center;
  font-size: 1.2rem;
  letter-spacing: 4px;
  opacity: 0.8;
  margin-bottom: 80px;
}

.numbers-layout {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
}

.main-number {
  text-align: center;
}

.number-label {
  display: block;
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 10px;
}

.number-value {
  display: block;
  font-size: 7rem;
  font-weight: 700;
  line-height: 1;
  color: transparent;
  background: linear-gradient(135deg, #FFD700 0%, #FFF 50%, #B8860B 100%);
  -webkit-background-clip: text;
  background-clip: text;
  text-shadow: 0 0 40px rgba(212, 175, 55, 0.3);
}

.secondary-numbers {
  display: flex;
  width: 100%;
  justify-content: space-around;
  margin-top: 20px;
}

.num-box {
  text-align: center;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(212,175,55,0.3);
  padding: 20px 40px;
  border-radius: 12px;
  backdrop-filter: blur(5px);
}

.s-label {
  display: block;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  opacity: 0.7;
}

.s-value {
  display: block;
  font-size: 3.5rem;
  color: #D4AF37;
  font-weight: 600;
}

.card-footer {
  text-align: center;
  margin-top: auto;
}

.insight {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 1.5rem;
  color: rgba(255,255,255,0.9);
  line-height: 1.4;
  margin-bottom: 30px;
  padding: 0 20px;
}

.website {
  font-size: 0.9rem;
  letter-spacing: 3px;
  opacity: 0.5;
}
</style>
