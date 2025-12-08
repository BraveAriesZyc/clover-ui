<script setup lang="ts">
import { computed } from 'vue'

type Padding = 'sm' | 'md' | 'lg'
type Shadow = 'none' | 'sm' | 'md' | 'lg'

const props = defineProps<{ bordered?: boolean; hoverable?: boolean; padding?: Padding; shadow?: Shadow; clickable?: boolean }>()

const bordered = computed(() => props.bordered ?? true)
const hoverable = computed(() => props.hoverable ?? false)
const padding = computed(() => props.padding ?? 'md')
const shadow = computed(() => props.shadow ?? 'none')
const clickable = computed(() => props.clickable ?? false)

const classes = computed(() => [
  'z-card',
  bordered.value ? 'z-card--bordered' : '',
  hoverable.value ? 'z-card--hoverable' : '',
  clickable.value ? 'z-card--clickable' : '',
  `z-card--pad-${padding.value}`,
  `z-card--shadow-${shadow.value}`,
])
</script>

<template>
  <div :class="classes">
    <div class="z-card__body"><slot /></div>
  </div>
  
</template>

<style scoped>
.z-card { display: block; background: var(--color-bg); color: var(--color-text); border-radius: 8px; border: 1px solid transparent; transition: box-shadow .2s ease, border-color .2s ease, background-color .2s ease; }
.z-card--bordered { border-color: var(--color-border); }
.z-card--hoverable:hover { border-color: var(--color-border-hover); box-shadow: 0 4px 12px rgba(0,0,0,0.06); }
.z-card--clickable { cursor: pointer; }
.z-card--pad-sm .z-card__body { padding: 8px; }
.z-card--pad-md .z-card__body { padding: 12px; }
.z-card--pad-lg .z-card__body { padding: 16px; }
.z-card--shadow-none { box-shadow: none; }
.z-card--shadow-sm { box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
.z-card--shadow-md { box-shadow: 0 4px 16px rgba(0,0,0,0.08); }
.z-card--shadow-lg { box-shadow: 0 8px 24px rgba(0,0,0,0.12); }
</style>
