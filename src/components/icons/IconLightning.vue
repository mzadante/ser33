<template>
  <IconBase v-bind="$attrs">
    <!-- Geometric lightning bolt with sacred nodes -->
    <path d="M13 2 L8.5 11 L12 11 L11 22" />
    <!-- Energy nodes at inflection points -->
    <circle cx="13" cy="2.5" r="0.6" fill="currentColor" stroke="none" />
    <circle cx="10.5" cy="11" r="1.2" />
    <circle cx="11" cy="21.5" r="0.6" fill="currentColor" stroke="none" />
  </IconBase>
</template>

<script setup>
import IconBase from './IconBase.vue';
</script>
