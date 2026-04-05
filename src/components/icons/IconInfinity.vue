<template>
  <IconBase v-bind="$attrs">
    <!-- Lemniscate (infinity) with Flower of Life nodes -->
    <path d="M12 12 C12 8, 4 6, 4 12 C4 18, 12 16, 12 12 C12 8, 20 6, 20 12 C20 18, 12 16, 12 12" />
    <!-- Sacred nodes at centers of each loop -->
    <circle cx="7.5" cy="12" r="0.6" fill="currentColor" stroke="none" />
    <circle cx="16.5" cy="12" r="0.6" fill="currentColor" stroke="none" />
    <!-- Center point -->
    <circle cx="12" cy="12" r="0.5" fill="currentColor" stroke="none" />
  </IconBase>
</template>

<script setup>
import IconBase from './IconBase.vue';
</script>
