<template>
  <IconBase v-bind="$attrs">
    <!-- Vesica Piscis (two overlapping circles) with 33 essence -->
    <!-- Left circle -->
    <circle cx="9.5" cy="12" r="6" />
    <!-- Right circle -->
    <circle cx="14.5" cy="12" r="6" />
    <!-- Sacred lens center point -->
    <circle cx="12" cy="12" r="0.6" fill="currentColor" stroke="none" />
    <!-- Vertical axis through vesica -->
    <line x1="12" y1="6.5" x2="12" y2="17.5" opacity="0.4" />
  </IconBase>
</template>

<script setup>
import IconBase from './IconBase.vue';
</script>
