<template>
  <IconBase v-bind="$attrs">
    <!-- Triple chevron with cascading opacity -->
    <polyline points="7 6 12 11 17 6" opacity="0.3" />
    <polyline points="7 11 12 16 17 11" opacity="0.6" />
    <polyline points="7 16 12 21 17 16" />
  </IconBase>
</template>

<script setup>
import IconBase from './IconBase.vue';
</script>
