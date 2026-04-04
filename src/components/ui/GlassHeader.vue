<template>
  <header class="glass-header">
    <div class="logo-container">
      <h1 class="title">{{ $t('app.title') }}<span class="gold-text">33</span></h1>
      <p class="subtitle">{{ $t('app.subtitle') }}</p>
    </div>
    <div class="lang-selector">
      <select v-model="currentLocale" @change="changeLanguage" class="glass-select">
        <option value="es">🇪🇸 ES</option>
        <option value="en">🇬🇧 EN</option>
      </select>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();
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
</script>

<style scoped>
.glass-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: rgba(10, 10, 15, 0.4);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(212, 175, 55, 0.1);
  z-index: 100;
  transition: all 0.5s ease;
}

.logo-container {
  display: flex;
  align-items: baseline;
  gap: 10px;
}

.title {
  font-family: var(--font-mistic);
  font-size: 1.8rem;
  color: var(--text-main);
  margin: 0;
  letter-spacing: 2px;
}

.subtitle {
  font-family: var(--font-primary);
  font-size: 0.8rem;
  color: rgba(255,255,255,0.6);
  letter-spacing: 3px;
  text-transform: uppercase;
  margin: 0;
}

.gold-text {
  color: var(--gold-radiant);
}

.glass-select {
  background: rgba(255,255,255,0.05);
  backdrop-filter: blur(8px);
  border: 1px solid var(--border-glass);
  color: var(--gold-radiant);
  padding: 6px 12px;
  border-radius: 4px;
  font-family: var(--font-primary);
  font-size: 0.9rem;
  outline: none;
  cursor: pointer;
  transition: all 0.3s;
}

.glass-select:focus, .glass-select:hover {
  border-color: var(--gold-radiant);
  background: rgba(212, 175, 55, 0.1);
}
</style>
