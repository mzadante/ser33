<template>
  <div class="soul-card-generator">
    <button v-if="!finalDownloadUrl" @click="generateAndPrepare" class="btn-gold" style="display: flex; align-items: center; gap: 0.5rem; justify-content: center; width: auto;" :disabled="isGenerating">
      <span v-if="isGenerating">{{ $t('results.soulCard.generating') }}...</span>
      <span v-else>{{ $t('results.soulCard.button') }}</span>
    </button>

    <a v-else :href="finalDownloadUrl" :download="finalFilename" class="btn-gold" style="display: flex; align-items: center; gap: 0.5rem; justify-content: center; width: auto; text-decoration: none;">
      <span>{{ $t('results.savePng') }}</span>
    </a>

    <!-- Canvas Template (Oculto vía opacidad 0 en posición fija, para asegurar dimensiones físicas exactas del DOM) -->
    <div id="soul-card-offscreen-wrapper" style="position: fixed; top: 0; left: 0; opacity: 0; pointer-events: none; z-index: -9999;">
      <div 
        ref="cardRef"
        id="soul-card-capture"
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
const finalDownloadUrl = ref(null);
const finalFilename = ref("");
const bgImage = ref(bgImageSrc);

const generateAndPrepare = async () => {
  if (!cardRef.value) return;
  isGenerating.value = true;
  
  try {
    // Renderear con html2canvas utilizando el DOM Clonado para manipular la visibilidad sin afectar la UI real
    const canvas = await html2canvas(cardRef.value, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#0a0a0f',
      onclone: (documentClone) => {
        const wrapper = documentClone.getElementById('soul-card-offscreen-wrapper');
        if (wrapper) {
          // Encendemos la opacidad solo en el clon de la foto, reteniendo su física intacta para el degradado
          wrapper.style.opacity = '1';
        }
      }
    });
    
    // Extracción limpia a Blob nativo
    canvas.toBlob((blob) => {
      if (!blob) {
        console.error("El canvas falló al empaquetar el objeto BLOB.");
        isGenerating.value = false;
        return;
      }
      
      const safeName = (props.userName || 'user')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z0-9]/g, '_');
        
      const fileUrl = window.URL.createObjectURL(blob);
      
      // En vez de simular el click, activamos el botón de descarga nativo final
      finalFilename.value = `SoulCard_ser33_${safeName}.png`;
      finalDownloadUrl.value = fileUrl;
      
      isGenerating.value = false;
      
      // Auto-revertir el botón a su estado original luego de 1 minuto para prevenir pérdida de memoria
      setTimeout(() => {
        if (finalDownloadUrl.value === fileUrl) {
           window.URL.revokeObjectURL(fileUrl);
           finalDownloadUrl.value = null;
        }
      }, 60000);
      
    }, "image/png", 1.0);

  } catch (error) {
    console.error("Error generando la Soul Card:", error);
    isGenerating.value = false;
  }
};
</script>

<style scoped>
.soul-card-generator {
  display: inline-block;
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
