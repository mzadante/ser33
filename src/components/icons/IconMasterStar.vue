<template>
  <IconBase v-bind="$attrs">
    <!-- 8-pointed star: two overlapping rotated squares -->
    <rect x="7" y="7" width="10" height="10" rx="0.5" />
    <path d="M12 4 L19.5 12 L12 20 L4.5 12 Z" />
    <!-- Inner sacred circle -->
    <circle cx="12" cy="12" r="2.5" />
    <circle cx="12" cy="12" r="0.8" fill="currentColor" stroke="none" />
  </IconBase>
</template>

<script setup>
import IconBase from './IconBase.vue';
</script>
