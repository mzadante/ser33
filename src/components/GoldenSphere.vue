<template>
  <div class="sphere-container">
    <div ref="sphere" class="golden-sphere">
      <div class="energy-texture"></div>
      <div class="glow"></div>
      <div class="core"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import gsap from 'gsap';

const sphere = ref(null);

onMounted(() => {
  // Animación base de respiración (432Hz spirit)
  gsap.to(sphere.value, {
    scale: 1.05,
    duration: 4,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });

  // Rotación cósmica sutil
  gsap.to(sphere.value, {
    rotation: 360,
    duration: 40,
    repeat: -1,
    ease: "linear"
  });
});
</script>

<style scoped>
.sphere-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 250px;
  position: relative;
  z-index: 0;
}

.golden-sphere {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  position: relative;
  /* El estilo visual de geometría sagrada real */
  background: url('@/assets/omkin_sphere.png') center/cover no-repeat;
  box-shadow: 
    0 0 50px var(--gold-glow),
    inset 0 0 40px rgba(0,0,0,0.8);
  filter: drop-shadow(0 0 15px var(--gold-radiant));
}

.energy-texture {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  border-radius: 50%;
  background: url('@/assets/energy_texture.png') center/cover;
  opacity: 0.25;
  mix-blend-mode: color-dodge;
  animation: rotate-slow 60s linear infinite;
}

@keyframes rotate-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(212, 175, 55, 0.2) 0%, transparent 60%);
  z-index: -1;
  pointer-events: none;
}

.core {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 1px dashed rgba(255, 255, 255, 0.3);
}

@keyframes pulse-ring {
  0% { transform: scale(1); opacity: 0.8; }
  100% { transform: scale(1.15); opacity: 0; }
}
</style>
