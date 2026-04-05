<template>
  <div class="advanced-section">
    <!-- Header de la Sección -->
    <div class="section-header glass-panel mystic-fadeIn">
      <h3>{{ $t('results.advanced.title') }}</h3>
      <p class="section-desc">{{ $t('results.advanced.subtitle') }}</p>
    </div>

    <!-- 1. Año Personal -->
    <div class="advanced-grid">
      <div class="glass-card personal-year-card mystic-fadeIn">
        <div class="card-title">
          <IconCalendar :size="20" class="gold-icon" />
          <h4>{{ $t('results.advanced.personalYear', { year: data.personalYearOf }) }}</h4>
        </div>
        
        <div class="number-display">
          <span class="big-number">{{ data.personalYear }}</span>
          <div class="number-meta">
            <span class="meaning-title">{{ yearMeaning.title }}</span>
            <span class="energy-tag">{{ yearMeaning.energy }}</span>
          </div>
        </div>

        <p class="meaning-text">{{ yearMeaning.description }}</p>
        
        <div class="tips-grid">
          <div class="tip-box do">
            <h5>✦ {{ $t('results.advanced.favors') }}</h5>
            <p>{{ yearMeaning.doThis }}</p>
          </div>
          <div class="tip-box avoid">
            <h5>✧ {{ $t('results.advanced.avoids') }}</h5>
            <p>{{ yearMeaning.avoidThis }}</p>
          </div>
        </div>
      </div>

      <!-- 2. Número de Madurez -->
      <div class="glass-card maturity-card mystic-fadeIn">
        <div class="card-title">
          <IconSunLight :size="20" class="gold-icon" />
          <h4>{{ $t('results.advanced.maturity') }}</h4>
        </div>
        <div class="number-display">
          <span class="big-number">{{ data.maturity }}</span>
          <div class="number-meta">
            <span class="meaning-title">{{ $t('results.advanced.maturitySubtitle') }}</span>
          </div>
        </div>
        <p class="meaning-text">{{ maturityMeaning }}</p>
      </div>
    </div>

    <!-- 3. Cimas (Pinnacles) -->
    <div class="pinnacles-section glass-panel mystic-fadeIn">
      <div class="card-title">
        <IconMountain :size="24" class="gold-icon" />
        <h4>{{ $t('results.advanced.pinnacles') }}</h4>
      </div>
      <p class="sub-desc">{{ $t('results.advanced.pinnaclesDesc') }}</p>
      
      <div class="timeline-grid">
        <div 
          v-for="(p, index) in data.pinnacles" 
          :key="index" 
          class="timeline-item"
          :class="{ active: isCurrentStage(p) }"
        >
          <div class="item-number">{{ p.value }}</div>
          <div class="item-content">
            <span class="item-label">{{ $t(`results.advanced.pinnacleNames[${index}]`) }}</span>
            <span class="item-ages">{{ $t('results.advanced.age') }}: {{ p.fromAge }} - {{ p.toAge > 90 ? '∞' : p.toAge }}</span>
            <p class="item-desc">{{ getPinnacleDesc(p.value) }}</p>
          </div>
          <div v-if="isCurrentStage(p)" class="active-badge">{{ $t('results.advanced.currentStage') }}</div>
        </div>
      </div>
    </div>

    <!-- 4. Desafíos (Challenges) -->
    <div class="challenges-section glass-panel mystic-fadeIn">
      <div class="card-title">
        <IconShield :size="24" class="gold-icon" />
        <h4>{{ $t('results.advanced.challenges') }}</h4>
      </div>
      <p class="sub-desc">{{ $t('results.advanced.challengesDesc') }}</p>
      
      <div class="challenges-grid">
        <div 
          v-for="(c, index) in data.challenges" 
          :key="index" 
          class="challenge-card"
          :class="{ active: isCurrentStage(c) }"
        >
          <div class="challenge-value">{{ c.value }}</div>
          <div class="challenge-info">
            <span class="challenge-label">{{ $t(`results.advanced.challengeNames[${index}]`) }}</span>
            <p class="challenge-desc">{{ getChallengeDesc(c.value) }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 5. Pasión Oculta & Yo Subconsciente -->
    <div class="advanced-grid bottom">
      <div class="glass-card small mystic-fadeIn">
        <div class="card-title">
          <IconHeart :size="18" class="gold-icon" />
          <h4>{{ $t('results.advanced.hiddenPassion') }}</h4>
        </div>
        <div class="sm-number-display">
          <span class="sm-number">{{ data.hiddenPassion.number }}</span>
          <p>{{ hiddenPassionMeaning }}</p>
        </div>
      </div>

      <div class="glass-card small mystic-fadeIn">
        <div class="card-title">
          <IconUser :size="18" class="gold-icon" />
          <h4>{{ $t('results.advanced.subconsciousSelf') }}</h4>
        </div>
        <div class="sm-number-display">
          <span class="sm-number">{{ data.subconsciousSelf }} <small>/ 9</small></span>
          <p>{{ subconsciousMeaning }}</p>
        </div>
      </div>
    </div>

    <!-- 6. Deuda Kármica (Condicional) -->
    <div v-if="data.karmicDebts.length > 0" class="karma-section glass-panel alert mystic-fadeIn">
      <div class="card-title">
        <IconAlertTriangle :size="24" class="red-icon" />
        <h3>{{ $t('results.advanced.karmicAlert') }}</h3>
      </div>
      <div class="debts-list">
        <div v-for="(debt, idx) in data.karmicDebts" :key="idx" class="debt-item">
          <div class="debt-header">
            <span class="debt-value">{{ debt.number }} / {{ debt.reducesTo }}</span>
            <span class="debt-pos">{{ $t('results.advanced.detectedIn') }}: {{ debt.position }}</span>
          </div>
          <p class="debt-text">{{ getKarmicDetail(debt.number).lesson }}</p>
          <div class="transmutation">
            <strong>{{ $t('results.advanced.transmutation') }}:</strong> {{ getKarmicDetail(debt.number).transmutation }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { 
  IconCalendar, 
  IconSunLight, 
  IconMountain, 
  IconShield, 
  IconHeart, 
  IconUser,
  IconAlertTriangle 
} from '../icons';
import { interpretations } from '../../data/interpretations.js';
import { PDF_CONTENT } from '../../data/pdfContent.js';

const { locale } = useI18n();

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  birthYear: {
    type: Number,
    required: true
  }
});

const currentLang = computed(() => locale.value || 'es');

const yearMeaning = computed(() => {
  return PDF_CONTENT[currentLang.value].personalYearMeanings[props.data.personalYear] || {};
});

const maturityMeaning = computed(() => {
  return interpretations[currentLang.value].maturityMeanings[props.data.maturity] || '';
});

const hiddenPassionMeaning = computed(() => {
  return PDF_CONTENT[currentLang.value].hiddenPassionMeanings[props.data.hiddenPassion.number] || '';
});

const subconsciousMeaning = computed(() => {
  return PDF_CONTENT[currentLang.value].subconsciousMeanings[props.data.subconsciousSelf] || '';
});

const getPinnacleDesc = (val) => interpretations[currentLang.value].pinnacleMeanings[val] || '';
const getChallengeDesc = (val) => interpretations[currentLang.value].challengeMeanings[val] || '';
const getKarmicDetail = (num) => interpretations[currentLang.value].karmicDebtDetails[num] || {};

const isCurrentStage = (stage) => {
  const currentYear = new Date().getFullYear();
  const age = currentYear - props.birthYear;
  return age >= stage.fromAge && age <= stage.toAge;
};
</script>

<style scoped>
.advanced-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  margin-top: 2rem;
}

.section-header {
  padding: 2rem;
  text-align: left;
  border-left: 4px solid var(--gold-radiant);
}

.section-header h3 {
  font-family: var(--font-mistic);
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

.section-desc {
  color: var(--text-muted);
}

.advanced-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 1.5rem;
}

@media (max-width: 900px) {
  .advanced-grid {
    grid-template-columns: 1fr;
  }
}

.glass-card {
  background: var(--bg-glass);
  backdrop-filter: blur(12px);
  border: 1px solid var(--border-glass);
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: transform 0.3s ease;
}

.glass-card:hover {
  transform: translateY(-5px);
  border-color: rgba(212, 175, 55, 0.3);
}

.card-title {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.card-title h4 {
  font-family: var(--font-primary);
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 0.9rem;
  color: var(--text-muted);
}

.gold-icon {
  color: var(--gold-radiant);
}

.number-display {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.big-number {
  font-family: var(--font-title);
  font-size: 4rem;
  color: var(--gold-radiant);
  line-height: 1;
}

.number-meta {
  display: flex;
  flex-direction: column;
}

.meaning-title {
  font-size: 1.4rem;
  color: #fff;
  font-weight: 600;
}

.energy-tag {
  font-size: 0.8rem;
  color: var(--gold-dim);
  text-transform: uppercase;
}

.meaning-text {
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--text-secondary);
}

.tips-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 0.5rem;
}

.tip-box {
  padding: 1rem;
  border-radius: 10px;
  font-size: 0.85rem;
}

.tip-box h5 {
  font-size: 0.75rem;
  margin-bottom: 0.4rem;
  letter-spacing: 1px;
}

.tip-box.do {
  background: rgba(40, 167, 69, 0.05);
  border: 1px solid rgba(40, 167, 69, 0.2);
}

.tip-box.do h5 { color: #51cf66; }

.tip-box.avoid {
  background: rgba(220, 53, 69, 0.05);
  border: 1px solid rgba(220, 53, 69, 0.2);
}

.tip-box.avoid h5 { color: #ff6b6b; }

/* Timeline Cimas */
.pinnacles-section, .challenges-section {
  padding: 2.5rem;
}

.sub-desc {
  font-size: 0.9rem;
  color: var(--text-muted);
  margin-bottom: 2rem;
}

.timeline-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.timeline-item {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 12px;
  padding: 1.5rem;
  position: relative;
  transition: all 0.3s;
}

.timeline-item.active {
  background: rgba(212, 175, 55, 0.08);
  border-color: var(--gold-radiant);
  box-shadow: 0 0 20px rgba(212, 175, 55, 0.1);
}

.item-number {
  font-family: var(--font-title);
  font-size: 2.5rem;
  color: var(--gold-radiant);
  margin-bottom: 0.5rem;
}

.item-label {
  display: block;
  font-size: 0.8rem;
  text-transform: uppercase;
  color: #fff;
  margin-bottom: 0.2rem;
}

.item-ages {
  font-size: 0.75rem;
  color: var(--text-muted);
  display: block;
  margin-bottom: 1rem;
}

.item-desc {
  font-size: 0.85rem;
  line-height: 1.4;
  color: var(--text-secondary);
}

.active-badge {
  position: absolute;
  top: -10px;
  right: 15px;
  background: var(--gold-radiant);
  color: #000;
  font-size: 0.65rem;
  font-weight: 800;
  padding: 3px 10px;
  border-radius: 20px;
  text-transform: uppercase;
}

/* Challenges */
.challenges-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

@media (max-width: 600px) {
  .challenges-grid { grid-template-columns: 1fr; }
}

.challenge-card {
  display: flex;
  gap: 1.5rem;
  padding: 1.5rem;
  background: rgba(0,0,0,0.2);
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.05);
}

.challenge-value {
  font-family: var(--font-title);
  font-size: 2.2rem;
  color: #ff6b6b;
  min-width: 40px;
}

.challenge-info {
  display: flex;
  flex-direction: column;
}

.challenge-label {
  font-size: 0.8rem;
  color: #fff;
  margin-bottom: 0.4rem;
}

.challenge-desc {
  font-size: 0.85rem;
  color: var(--text-muted);
  line-height: 1.4;
}

/* Small cards */
.sm-number-display {
  display: flex;
  align-items: flex-start;
  gap: 1.2rem;
}

.sm-number {
  font-family: var(--font-title);
  font-size: 2.22rem;
  color: var(--gold-radiant);
  line-height: 1;
}

.sm-number-display p {
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

/* Karma Section */
.karma-section {
  border: 1px solid rgba(255, 107, 107, 0.3);
  background: rgba(220, 53, 69, 0.05) !important;
}

.red-icon {
  color: #ff6b6b;
}

.debts-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.debt-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.debt-value {
  font-size: 1.4rem;
  font-weight: 700;
  color: #ff6b6b;
}

.debt-pos {
  font-size: 0.75rem;
  text-transform: uppercase;
  color: var(--text-muted);
}

.transmutation {
  margin-top: 0.8rem;
  padding: 0.8rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  font-size: 0.9rem;
}
</style>
