<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
function goDocs() { router.push('/docs/card') }
</script>

<template>
  <div class="section">
    <div class="section__title">Card Demo <ZButton size="sm" variant="default" @click="goDocs">文档</ZButton></div>
    <div class="grid">
      <ZCard padding="sm" hoverable bordered>
        <div class="demo-line">SM · Hoverable</div>
      </ZCard>
      <ZCard padding="md" shadow="sm" bordered>
        <div class="demo-line">MD · Shadow SM</div>
      </ZCard>
      <ZCard padding="lg" shadow="md" bordered clickable>
        <div class="demo-line">LG · Shadow MD · Clickable</div>
      </ZCard>
      <ZCard padding="md" shadow="lg">
        <div class="demo-line">No Border · Shadow LG</div>
      </ZCard>
    </div>
  </div>
</template>

<style scoped>
.section { padding: 16px; }
.section__title { font-weight: 600; margin-bottom: 12px; }
.grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
.demo-line { display: flex; align-items: center; justify-content: center; height: 64px; color: var(--color-muted); }
</style>
