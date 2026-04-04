import { createI18n } from 'vue-i18n';
import es from './locales/es.json';
import en from './locales/en.json';

const i18n = createI18n({
  legacy: false, // Usar modo Composition API (requerido para Vue 3 y script setup)
  locale: 'es', // Idioma por defecto
  fallbackLocale: 'en', // Idioma de respaldo
  messages: {
    es,
    en
  }
});

export default i18n;
