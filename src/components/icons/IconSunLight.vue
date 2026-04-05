<template>
  <IconBase v-bind="$attrs">
    <!-- Sacred sun: circle + inner triangle + 8 rays with diamond tips -->
    <circle cx="12" cy="12" r="4" />
    <path d="M12 9.5 L14 13 L10 13 Z" />
    <circle cx="12" cy="11.5" r="0.5" fill="currentColor" stroke="none" />
    <!-- Cardinal rays -->
    <line x1="12" y1="2.5" x2="12" y2="6.5" />
    <line x1="12" y1="17.5" x2="12" y2="21.5" />
    <line x1="2.5" y1="12" x2="6.5" y2="12" />
    <line x1="17.5" y1="12" x2="21.5" y2="12" />
    <!-- Diagonal rays -->
    <line x1="5.3" y1="5.3" x2="8" y2="8" />
    <line x1="16" y1="16" x2="18.7" y2="18.7" />
    <line x1="18.7" y1="5.3" x2="16" y2="8" />
    <line x1="8" y1="16" x2="5.3" y2="18.7" />
    <!-- Diamond tips on cardinal rays -->
    <path d="M12 2 L12.4 2.5 L12 3 L11.6 2.5Z" fill="currentColor" stroke="none" />
    <path d="M12 21 L12.4 21.5 L12 22 L11.6 21.5Z" fill="currentColor" stroke="none" />
    <path d="M2 12 L2.5 11.6 L3 12 L2.5 12.4Z" fill="currentColor" stroke="none" />
    <path d="M21 12 L21.5 11.6 L22 12 L21.5 12.4Z" fill="currentColor" stroke="none" />
  </IconBase>
</template>

<script setup>
import IconBase from './IconBase.vue';
</script>
