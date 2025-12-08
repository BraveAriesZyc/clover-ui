<script setup lang="ts">
import { computed } from 'vue'
import { Icon as IconifyIcon } from '@iconify/vue'

type SizeAlias = 'sm' | 'md' | 'lg'

const props = defineProps<{
  icon?: string | Record<string, any>
  name?: string | Record<string, any>
  size?: number | SizeAlias | string
  color?: string
  spin?: boolean
  title?: string
  ariaHidden?: boolean
}>()

const iconInput = computed(() => props.icon ?? props.name)

const isLocalSvg = computed(() => typeof iconInput.value === 'string' && iconInput.value.startsWith('svg-icon:'))

const svgName = computed(() => {
  if (!isLocalSvg.value) return ''
  const s = iconInput.value as string
  return s.slice('svg-icon:'.length)
})

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
</script>

<template>
  <span class="z-icon" :class="{ 'z-icon--spin': !!props.spin }" :style="style" :title="props.title" :aria-hidden="props.ariaHidden ? 'true' : 'false'">
    <SvgIcon v-if="isLocalSvg" :name="svgName" :size="props.size" :color="props.color" :spin="props.spin" />
    <IconifyIcon v-else :icon="iconInput as any" :inline="true" />
  </span>
</template>
