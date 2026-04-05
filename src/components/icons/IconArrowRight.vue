<template>
  <IconBase v-bind="$attrs">
    <!-- Sacred arrow with diamond tip -->
    <line x1="4" y1="12" x2="17" y2="12" />
    <path d="M17 12 L20 10 L22 12 L20 14 Z" fill="currentColor" stroke="none" />
    <!-- Small origin circle -->
    <circle cx="4" cy="12" r="0.6" fill="currentColor" stroke="none" />
  </IconBase>
</template>

<script setup>
import IconBase from './IconBase.vue';
</script>
