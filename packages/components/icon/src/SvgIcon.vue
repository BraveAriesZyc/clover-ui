<script setup lang="ts">
import {computed, ref, watchEffect} from 'vue'

type SizeAlias = 'sm' | 'md' | 'lg'

const props = defineProps<{
  name: string
  size?: number | SizeAlias | string
  color?: string
  spin?: boolean
  title?: string
  ariaHidden?: boolean
}>()

const svgRaw = ref('')
const modules = import.meta.glob('/src/assets/icons/**/*.svg', {
  query: '?raw',
  import: 'default'
});

function resolveSize(v: typeof props.size) {
  if (typeof v === 'number') return `${v}px`
  if (!v) return '16px'
  if (v === 'sm') return '14px'
  if (v === 'md') return '16px'
  if (v === 'lg') return '20px'
  const n = Number(v)
  if (!Number.isNaN(n)) return `${n}px`
  return String(v)
}

const style = computed(() => ({
  fontSize: resolveSize(props.size),
  color: props.color
}))

watchEffect(async () => {
  const p = `/src/assets/icons/${props.name}.svg`
  const loader = modules[p]
  if (loader) {
    svgRaw.value = await loader() as  string
  } else {
    svgRaw.value = ''
  }
})
</script>

<template>
  <span class="z-icon" :class="{ 'z-icon--spin': !!props.spin }" :style="style" :title="props.title" :aria-hidden="props.ariaHidden ? 'true' : 'false'">
    <span v-html="svgRaw"></span>
  </span>
</template>
