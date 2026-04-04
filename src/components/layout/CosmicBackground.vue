<template>
  <div class="cosmic-canvas" ref="canvasContainer">
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
  // Animación Parallax y Pulsación Lenta (GSAP Puro)
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

  // Evento interactivo leve con el Mouse (Opcional)
  window.addEventListener('mousemove', (e) => {
    const xPos = (e.clientX / window.innerWidth - 0.5) * 40;
    const yPos = (e.clientY / window.innerHeight - 0.5) * 40;
    
    gsap.to('.stars-layer-1', { x: xPos, y: yPos, duration: 1, ease: 'power2.out' });
    gsap.to('.stars-layer-2', { x: xPos * 1.5, y: yPos * 1.5, duration: 1, ease: 'power2.out' });
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
  background: var(--bg-main);
  overflow: hidden;
  pointer-events: none; /* No bloquear clicks */
}

/* Base de estrellas usando CSS abstracto */
.stars-layer-1 {
  position: absolute;
  top: -5%; left: -5%; width: 110%; height: 110%;
  background-image: radial-gradient(2px 2px at 20px 30px, #ffffff, rgba(0,0,0,0)),
                    radial-gradient(2px 2px at 40px 70px, #ffffff, rgba(0,0,0,0)),
                    radial-gradient(1px 1px at 50px 160px, #ffffff, rgba(0,0,0,0)),
                    radial-gradient(1px 1px at 90px 40px, #ffffff, rgba(0,0,0,0)),
                    radial-gradient(2px 2px at 130px 80px, #ffffff, rgba(0,0,0,0));
  background-repeat: repeat;
  background-size: 200px 200px;
  opacity: 0.3;
}

.stars-layer-2 {
  position: absolute;
  top: -10%; left: -10%; width: 120%; height: 120%;
  background-image: radial-gradient(2px 2px at 10px 10px, var(--gold-radiant), rgba(0,0,0,0)),
                    radial-gradient(2px 2px at 150px 150px, #ffffff, rgba(0,0,0,0)),
                    radial-gradient(1.5px 1.5px at 60px 100px, var(--gold-radiant), rgba(0,0,0,0));
  background-repeat: repeat;
  background-size: 300px 300px;
  opacity: 0.5;
}

.glow-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.15;
}

.orb-1 {
  width: 400px;
  height: 400px;
  background: var(--gold-radiant);
  top: 20%;
  left: 30%;
}

.orb-2 {
  width: 600px;
  height: 600px;
  background: #4a6fa5;
  bottom: 0%;
  right: 10%;
}
</style>
