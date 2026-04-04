<template>
  <div class="cosmic-layout">
    <div class="lang-selector">
      <select v-model="currentLocale" @change="changeLanguage" class="glass-select">
        <option value="es">🇪🇸 Español</option>
        <option value="en">🇬🇧 English</option>
      </select>
    </div>

    <header class="app-header">
      <h1 class="title">{{ $t('app.title') }}<span class="gold-text">33</span></h1>
      <p class="subtitle">{{ $t('app.subtitle') }}</p>
    </header>

    <main class="main-content">
      <GoldenSphere />

      <div class="glass-panel form-container" v-if="!results">
        <h2>{{ $t('form.title') }}</h2>
        <p class="instruction">{{ $t('form.instruction') }}</p>
        
        <form @submit.prevent="calculateDestiny" class="destiny-form">
          <div class="input-group">
            <label for="fullName">{{ $t('form.nameLabel') }}</label>
            <input 
              id="fullName" 
              v-model="formData.fullName" 
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
              v-model="formData.birthDate" 
              type="date" 
              required 
            />
          </div>

          <button type="submit" class="btn-gold">{{ $t('form.submitBtn') }}</button>
        </form>
      </div>

      <div class="glass-panel results-container" v-else>
        <h2>{{ $t('results.title') }}</h2>
        
        <div class="numerology-grid">
          <div class="number-card">
            <span class="label">{{ $t('results.lifePath') }}</span>
            <span class="value">{{ results.lifePath }}</span>
            <span class="desc">{{ $t('results.lifePathDesc') }}</span>
          </div>
          
          <div class="number-card">
            <span class="label">{{ $t('results.soul') }}</span>
            <span class="value">{{ results.soulNumber }}</span>
            <span class="desc">{{ $t('results.soulDesc') }}</span>
          </div>
          
          <div class="number-card">
            <span class="label">{{ $t('results.personality') }}</span>
            <span class="value">{{ results.personalityNumber }}</span>
            <span class="desc">{{ $t('results.personalityDesc') }}</span>
          </div>
          
          <div class="number-card highlight">
            <span class="label">{{ $t('results.destiny') }}</span>
            <span class="value">{{ results.destinyNumber }}</span>
            <span class="desc">{{ $t('results.destinyDesc') }}</span>
          </div>
        </div>

        <button @click="resetForm" class="btn-gold outline-btn">{{ $t('results.resetBtn') }}</button>
      </div>
    </main>

    <footer class="app-footer">
      <a href="#" class="ethics-link">{{ $t('app.footerLink') }}</a>
    </footer>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import GoldenSphere from './components/GoldenSphere.vue';
import { 
  calcLifePath, 
  calcSoulNumber, 
  calcPersonalityNumber, 
  calcDestinyNumber 
} from './composables/useNumerology.js';

const { t, locale } = useI18n();
const currentLocale = ref(locale.value);

const changeLanguage = () => {
  locale.value = currentLocale.value;
  localStorage.setItem('ser33-lang', currentLocale.value);
};

onMounted(() => {
  const savedLang = localStorage.getItem('ser33-lang');
  if (savedLang) {
    currentLocale.value = savedLang;
    locale.value = savedLang;
  }
});

const formData = reactive({
  fullName: '',
  birthDate: ''
});

const results = ref(null);

const calculateDestiny = () => {
  if (!formData.fullName || !formData.birthDate) return;
  
  const dateObj = new Date(formData.birthDate);
  // Importante: getUTCDate() para evitar desfase de zonas horarias al recuperar la fecha del input type="date"
  const day = dateObj.getUTCDate();
  const month = dateObj.getUTCMonth() + 1;
  const year = dateObj.getUTCFullYear();

  const lifePath = calcLifePath(day, month, year);
  const soulNumber = calcSoulNumber(formData.fullName);
  const personalityNumber = calcPersonalityNumber(formData.fullName);
  const destinyNumber = calcDestinyNumber(soulNumber, personalityNumber);

  results.value = {
    lifePath,
    soulNumber,
    personalityNumber,
    destinyNumber
  };
};

const resetForm = () => {
  results.value = null;
  formData.fullName = '';
  formData.birthDate = '';
};
</script>

<style scoped>
.lang-selector {
  position: absolute;
  top: 1.5rem;
  right: 2rem;
  z-index: 20;
}

.glass-select {
  background: var(--bg-glass);
  backdrop-filter: blur(8px);
  border: 1px solid var(--border-glass);
  color: var(--text-main);
  padding: 8px 12px;
  border-radius: 8px;
  font-family: var(--font-primary);
  font-size: 0.9rem;
  outline: none;
  cursor: pointer;
  transition: all 0.3s;
}

.glass-select:focus, .glass-select:hover {
  border-color: var(--gold-radiant);
}
.cosmic-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.app-header {
  text-align: center;
  margin-bottom: 2rem;
  z-index: 10;
}

.title {
  font-size: 3rem;
  letter-spacing: 4px;
}

.gold-text {
  color: var(--gold-radiant);
}

.subtitle {
  color: var(--text-muted);
  font-size: 1.1rem;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.form-container, .results-container {
  width: 100%;
  max-width: 500px;
  padding: 2.5rem;
  text-align: center;
  animation: fadeIn 1s ease-out;
}

.form-container h2 {
  font-size: 1.8rem;
  color: var(--gold-radiant);
  margin-bottom: 0.5rem;
}

.instruction {
  color: var(--text-muted);
  font-size: 0.9rem;
  margin-bottom: 2rem;
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
  gap: 0.5rem;
}

.input-group label {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--text-muted);
}

.numerology-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin: 2rem 0;
}

.number-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.number-card.highlight {
  grid-column: span 2;
  border-color: var(--gold-radiant);
  background: rgba(212, 175, 55, 0.05);
}

.number-card .label {
  font-size: 0.8rem;
  text-transform: uppercase;
  color: var(--text-muted);
  letter-spacing: 1px;
}

.number-card .value {
  font-family: var(--font-title);
  font-size: 3rem;
  color: var(--gold-radiant);
  margin: 0.5rem 0;
  text-shadow: 0 0 20px rgba(212, 175, 55, 0.5);
}

.number-card .desc {
  font-size: 0.75rem;
  color: #888;
}

.outline-btn {
  background: transparent;
  border: 1px solid var(--gold-radiant);
  color: var(--gold-radiant);
  width: 100%;
}

.outline-btn:hover {
  background: rgba(212, 175, 55, 0.1);
}

.app-footer {
  text-align: center;
  padding-top: 3rem;
}

.ethics-link {
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.8rem;
  border-bottom: 1px dashed var(--text-muted);
  transition: color 0.3s ease;
}

.ethics-link:hover {
  color: var(--text-main);
  border-bottom-color: var(--text-main);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 600px) {
  .numerology-grid {
    grid-template-columns: 1fr;
  }
  .number-card.highlight {
    grid-column: 1;
  }
}
</style>
