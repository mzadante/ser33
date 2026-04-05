<template>
  <IconBase v-bind="$attrs">
    <!-- Sacred cross with diamond terminals -->
    <line x1="12" y1="4" x2="12" y2="20" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <!-- Diamond terminals -->
    <path d="M12 3 L12.6 4 L12 5 L11.4 4Z" fill="currentColor" stroke="none" />
    <path d="M12 19 L12.6 20 L12 21 L11.4 20Z" fill="currentColor" stroke="none" />
    <path d="M3 12 L4 11.4 L5 12 L4 12.6Z" fill="currentColor" stroke="none" />
    <path d="M19 12 L20 11.4 L21 12 L20 12.6Z" fill="currentColor" stroke="none" />
  </IconBase>
</template>

<script setup>
import IconBase from './IconBase.vue';
</script>
