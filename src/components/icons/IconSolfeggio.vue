<template>
  <IconBase v-bind="$attrs">
    <!-- Cosmic tuning fork: circle frame + sine wave + resonance -->
    <circle cx="12" cy="12" r="9.5" />
    <!-- Sound wave passing through -->
    <path d="M3 12 Q6 6, 9 12 T15 12 T21 12" />
    <!-- Inner resonance circles -->
    <circle cx="12" cy="12" r="3.5" />
    <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
  </IconBase>
</template>

<script setup>
import IconBase from './IconBase.vue';
</script>
