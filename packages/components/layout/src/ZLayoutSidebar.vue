<script setup lang="ts">
defineProps<{ collapsed?: boolean }>()
</script>

<template>
  <div class="z-layout-sidebar" :data-collapsed="collapsed ? 'true' : 'false'">
    <slot />
  </div>
</template>

