<template>
  <div class="cosmic-layout">
    <CosmicBackground />
    <GlassHeader />

    <main class="main-content">
      <!-- Orbe dorado si no estamos en resultados -->
      <GoldenSphere v-if="$route.meta.showGoldenSphere" />

      <!-- Vue Router maneja dinámicamente las vistas aquí -->
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <footer class="app-footer">
      <a href="#" class="ethics-link">{{ $t('app.footerLink') }}</a>
    </footer>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import CosmicBackground from './components/layout/CosmicBackground.vue';
import GlassHeader from './components/ui/GlassHeader.vue';
import GoldenSphere from './components/GoldenSphere.vue';
</script>

<style>
.cosmic-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bg-main);
  color: var(--text-main);
  position: relative;
  overflow-x: hidden;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 8rem 2rem 4rem 2rem;
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.app-footer {
  text-align: center;
  padding: 3rem;
  z-index: 2;
  position: relative;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.ethics-link {
  color: rgba(255,255,255,0.3);
  text-decoration: none;
  font-size: 0.85rem;
  letter-spacing: 1px;
  transition: all 0.3s;
}

.ethics-link:hover {
  color: var(--gold-radiant);
  text-shadow: 0 0 10px var(--gold-glow);
}

/* Transición básica entre vistas */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
