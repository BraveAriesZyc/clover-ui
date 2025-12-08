<script setup lang="ts">
import { computed } from 'vue'
import Icon from './Icon.vue'

type SizeAlias = 'sm' | 'md' | 'lg'

const props = defineProps<{
  name?: string | Record<string, any>
  icon?: string | Record<string, any>
  size?: number | SizeAlias | string
  color?: string
  spin?: boolean
  title?: string
  ariaHidden?: boolean
}>()

const iconInput = computed(() => props.icon ?? props.name)
</script>

<template>
  <Icon :icon="iconInput" :size="props.size" :color="props.color" :spin="props.spin" :title="props.title" :ariaHidden="props.ariaHidden" />
</template>
