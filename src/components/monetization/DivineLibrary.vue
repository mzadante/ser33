<template>
  <div class="divine-library-wrapper">
    <div class="library-header">
      <h3 class="title">Biblioteca del Despertar</h3>
      <p class="subtitle">Herramientas Recomendadas para tu Camino</p>
    </div>

    <!-- Carrusel Mockup (Contenedores Abstractos) -->
    <div class="library-carousel">
      
      <!-- Mock Book 1 -->
      <div class="book-card-mockup">
        <div class="book-cover type-kybalion">
          <span class="symbol">☿</span>
        </div>
        <div class="book-info">
          <h4>El Kybalión</h4>
          <span class="author">Tres Iniciados</span>
          <button class="amazon-btn disabled">Adquirir</button>
        </div>
      </div>

      <!-- Mock Book 2 -->
      <div class="book-card-mockup">
        <div class="book-cover type-grabovoi">
          <span class="symbol">∞</span>
        </div>
        <div class="book-info">
          <h4>Concentración</h4>
          <span class="author">Grigori Grabovoi</span>
          <button class="amazon-btn disabled">Adquirir</button>
        </div>
      </div>

      <!-- Mock Book 3 -->
      <div class="book-card-mockup">
        <div class="book-cover type-numerology">
          <span class="symbol">33</span>
        </div>
        <div class="book-info">
          <h4>Números Sagrados</h4>
          <span class="author">Pitágoras</span>
          <button class="amazon-btn disabled">Adquirir</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import gsap from 'gsap';

onMounted(() => {
  gsap.fromTo('.book-card-mockup',
    { opacity: 0, x: 50 },
    { opacity: 1, x: 0, duration: 1, stagger: 0.15, ease: 'power2.out', delay: 1 }
  );
});
</script>

<style scoped>
.divine-library-wrapper {
  margin-top: 4rem;
  padding: 3rem 0;
  border-top: 1px solid rgba(212, 175, 55, 0.15);
  width: 100%;
}

.library-header {
  text-align: center;
  margin-bottom: 2rem;
}

.library-header .title {
  font-family: var(--font-mistic);
  color: var(--gold-radiant);
  font-size: 1.8rem;
  margin: 0 0 0.5rem 0;
}

.library-header .subtitle {
  color: rgba(255,255,255,0.6);
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.library-carousel {
  display: flex;
  gap: 2rem;
  overflow-x: auto;
  padding: 1rem;
  scroll-snap-type: x mandatory;
  justify-content: center;
}

/* Ocultar scrollbar */
.library-carousel::-webkit-scrollbar {
  display: none;
}

.book-card-mockup {
  scroll-snap-align: center;
  min-width: 220px;
  background: rgba(10, 10, 15, 0.8);
  border: 1px solid rgba(212, 175, 55, 0.2);
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
}

.book-card-mockup:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.5), 0 0 15px rgba(212, 175, 55, 0.2);
}

.book-cover {
  height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a1a24 0%, #0a0a0f 100%);
  border-bottom: 1px solid rgba(255,255,255,0.05);
}

.book-cover .symbol {
  font-size: 4rem;
  color: rgba(212, 175, 55, 0.5);
  filter: drop-shadow(0 0 10px rgba(212, 175, 55, 0.3));
}

.type-kybalion {
  background: linear-gradient(135deg, #2c1e16 0%, #0a0a0f 100%);
}

.type-grabovoi {
  background: linear-gradient(135deg, #161e2c 0%, #0a0a0f 100%);
}

.type-numerology {
  background: linear-gradient(135deg, #2c2916 0%, #0a0a0f 100%);
}

.book-info {
  padding: 1.5rem;
  text-align: center;
}

.book-info h4 {
  margin: 0 0 0.5rem 0;
  color: var(--text-main);
  font-family: var(--font-primary);
}

.book-info .author {
  display: block;
  font-size: 0.8rem;
  color: rgba(255,255,255,0.5);
  margin-bottom: 1rem;
}

.amazon-btn {
  background: transparent;
  border: 1px solid var(--gold-radiant);
  color: var(--gold-radiant);
  padding: 6px 15px;
  border-radius: 4px;
  font-family: var(--font-primary);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
