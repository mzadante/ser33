<template>
  <IconBase v-bind="$attrs">
    <!-- Crescent moon with mystical stars -->
    <path d="M15 4 A8 8 0 1 0 15 20 A6 6 0 0 1 15 4" />
    <!-- Scattered stars -->
    <circle cx="6.5" cy="7.5" r="0.5" fill="currentColor" stroke="none" />
    <circle cx="4.5" cy="13" r="0.35" fill="currentColor" stroke="none" />
    <circle cx="7.5" cy="18" r="0.4" fill="currentColor" stroke="none" />
    <!-- Tiny cross star -->
    <line x1="5" y1="10" x2="5.8" y2="10" />
    <line x1="5.4" y1="9.6" x2="5.4" y2="10.4" />
  </IconBase>
</template>

<script setup>
import IconBase from './IconBase.vue';
</script>
