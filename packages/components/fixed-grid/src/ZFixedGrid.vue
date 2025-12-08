<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  items: any[]
  columns: number
  gap?: number
  span?: number | ((item: any, index: number) => number)
}>()

const gap = computed(() => props.gap ?? 8)

function getSpan(item: any, i: number) {
  const s = props.span
  const v = typeof s === 'function' ? s(item, i) : (s ?? 1)
  const clamped = Math.max(1, Math.min(props.columns, Number(v) || 1))
  return clamped
}
</script>

<template>
  <div class="z-fixed-grid" :style="{ gridTemplateColumns: `repeat(${props.columns}, minmax(0, 1fr))`, gap: gap + 'px' }">
    <div
      v-for="(item,i) in props.items"
      :key="i"
      class="z-fixed-grid__cell"
      :style="{ gridColumn: `span ${getSpan(item, i)}` }"
    >
      <slot name="cell" :item="item" :index="i"></slot>
    </div>
  </div>
  
</template>

