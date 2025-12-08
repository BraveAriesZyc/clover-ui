<script setup lang="ts">
import MainLayout from './layout/templates/MainLayout.vue'
</script>

<template>
  <div class="app">
    <MainLayout>
      <router-view />
    </MainLayout>
  </div>
  
</template>

<style scoped>
.app { height: 100vh; background: var(--layout-bg); overflow: hidden; }
</style>
