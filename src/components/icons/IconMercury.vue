<template>
  <IconBase v-bind="$attrs">
    <!-- Mercury alchemical symbol: crescent + circle + cross -->
    <!-- Top crescent (horns of wisdom) -->
    <path d="M8 5 A4 4 0 0 1 16 5" />
    <!-- Central circle (spirit) -->
    <circle cx="12" cy="10" r="4" />
    <!-- Lower cross (matter) -->
    <line x1="12" y1="14" x2="12" y2="21" />
    <line x1="9" y1="18" x2="15" y2="18" />
    <!-- Sacred dot at center -->
    <circle cx="12" cy="10" r="0.6" fill="currentColor" stroke="none" />
  </IconBase>
</template>

<script setup>
import IconBase from './IconBase.vue';
</script>
