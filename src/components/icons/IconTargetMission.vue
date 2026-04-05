<template>
  <IconBase v-bind="$attrs">
    <!-- Star of David (Hexagram): two overlapping triangles -->
    <path d="M12 4 L5.6 16 L18.4 16 Z" />
    <path d="M12 20 L5.6 8 L18.4 8 Z" />
    <!-- Sacred center point -->
    <circle cx="12" cy="12" r="1.2" />
    <circle cx="12" cy="12" r="0.4" fill="currentColor" stroke="none" />
  </IconBase>
</template>

<script setup>
import IconBase from './IconBase.vue';
</script>
