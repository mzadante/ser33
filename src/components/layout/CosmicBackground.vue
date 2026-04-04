<template>
  <div class="cosmic-canvas" ref="canvasContainer">
    <div class="background-texture"></div>
    <div class="stars-layer-1"></div>
    <div class="stars-layer-2"></div>
    <div class="glow-orb orb-1"></div>
    <div class="glow-orb orb-2"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import gsap from 'gsap';

const canvasContainer = ref(null);

onMounted(() => {
  // Animación Parallax de la textura de fondo
  gsap.to('.background-texture', {
    scale: 1.15,
    duration: 30,
    yoyo: true,
    repeat: -1,
    ease: 'sine.inOut'
  });

  gsap.to('.orb-1', {
    x: '20vw',
    y: '10vh',
    duration: 15,
    yoyo: true,
    repeat: -1,
    ease: 'sine.inOut'
  });

  gsap.to('.orb-2', {
    x: '-15vw',
    y: '-20vh',
    duration: 20,
    yoyo: true,
    repeat: -1,
    ease: 'sine.inOut'
  });

  // Parallax interactivo leve con el Mouse
  window.addEventListener('mousemove', (e) => {
    const xPos = (e.clientX / window.innerWidth - 0.5) * 60;
    const yPos = (e.clientY / window.innerHeight - 0.5) * 60;
    
    gsap.to('.background-texture', { x: xPos * 0.1, y: yPos * 0.1, duration: 1.5, ease: 'power2.out' });
    gsap.to('.stars-layer-1', { x: xPos * 0.4, y: yPos * 0.4, duration: 1, ease: 'power2.out' });
    gsap.to('.stars-layer-2', { x: xPos * 0.8, y: yPos * 0.8, duration: 1, ease: 'power2.out' });
  });
});
</script>

<style scoped>
.cosmic-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  background: #000; /* Base sólida */
  overflow: hidden;
  pointer-events: none;
}

.background-texture {
  position: absolute;
  top: -10%;
  left: -10%;
  width: 120%;
  height: 120%;
  background: url('@/assets/cosmic_bg_2.png') center/cover no-repeat;
  filter: brightness(0.7);
}

/* Capas de estrellas dinámicas sobre la textura */
.stars-layer-1 {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background-image: radial-gradient(1px 1px at 20px 30px, #ffffff, rgba(0,0,0,0)),
                    radial-gradient(1px 1px at 40px 70px, #ffffff, rgba(0,0,0,0));
  background-repeat: repeat;
  background-size: 200px 200px;
  opacity: 0.2;
}

.stars-layer-2 {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background-image: radial-gradient(1.5px 1.5px at 10px 10px, var(--gold-radiant), rgba(0,0,0,0)),
                    radial-gradient(1.5px 1.5px at 150px 150px, #ffffff, rgba(0,0,0,0));
  background-repeat: repeat;
  background-size: 300px 300px;
  opacity: 0.3;
}

.orb-1 { 
  width: 800px; 
  height: 800px; 
  background: radial-gradient(circle, var(--gold-glow) 0%, transparent 70%);
  top: -20%; 
  left: -10%; 
  filter: blur(150px);
  opacity: 0.15;
}
</style>

