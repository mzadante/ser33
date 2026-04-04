<template>
  <div class="sphere-container">
    <div ref="sphere" class="golden-sphere">
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
  width: 150px;
  height: 150px;
  border-radius: 50%;
  position: relative;
  /* El estilo visual de geometría sagrada */
  background: radial-gradient(circle at 30% 30%, #ffd700, #d4af37 40%, #8a6a1c 80%, #2f2409 100%);
  box-shadow: 
    0 0 40px rgba(212, 175, 55, 0.4),
    inset -10px -10px 20px rgba(0,0,0,0.5),
    inset 10px 10px 20px rgba(255,255,255,0.4);
}

.golden-sphere::before {
  content: "";
  position: absolute;
  top: -2px; left: -2px; right: -2px; bottom: -2px;
  border-radius: 50%;
  border: 1px solid rgba(212, 175, 55, 0.3);
  animation: pulse-ring 4s infinite alternate;
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
