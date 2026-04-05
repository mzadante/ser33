<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    class="sacred-icon"
    :class="{ 'sacred-icon--animated': animated, 'sacred-icon--glow': glow }"
    fill="none"
    stroke="currentColor"
    :stroke-width="strokeWidth"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <slot />
  </svg>
</template>

<script setup>
defineProps({
  size: { type: [Number, String], default: 24 },
  strokeWidth: { type: [Number, String], default: 1.5 },
  animated: { type: Boolean, default: false },
  glow: { type: Boolean, default: false }
});
</script>
