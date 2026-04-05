<template>
  <IconBase v-bind="$attrs">
    <!-- Ornamental line with diamond terminals -->
    <line x1="5" y1="12" x2="19" y2="12" />
    <path d="M3 12 L5 10.5 L7 12 L5 13.5Z" fill="currentColor" stroke="none" />
    <path d="M17 12 L19 10.5 L21 12 L19 13.5Z" fill="currentColor" stroke="none" />
  </IconBase>
</template>

<script setup>
import IconBase from './IconBase.vue';
</script>
