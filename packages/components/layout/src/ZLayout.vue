<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{
  headerHeight?: number
  sidebarWidth?: number
  collapsedWidth?: number
  collapsed?: boolean
  fullHeight?: boolean
  stickyHeader?: boolean
  contentPadding?: number
  scrollbar?: 'none' | 'auto'
}>()
const emit = defineEmits<{
  (e: 'update:collapsed', v: boolean): void
  (e: 'toggle', v: boolean): void
}>()
const headerH = computed(() => props.headerHeight ?? 52)
const sideW = computed(() => props.sidebarWidth ?? 200)
const collapseW = computed(() => props.collapsedWidth ?? 72)
function toggle() {
  const next = !props.collapsed
  emit('update:collapsed', next)
  emit('toggle', next)
}
const cssVars = computed(() => ({
  '--z-header-h': String(headerH.value),
  '--z-sidebar-w': String(sideW.value),
  '--z-sidebar-cw': String(collapseW.value),
  '--z-content-pd': String(props.contentPadding ?? 12),
}))
</script>

<template>
  <div class="z-layout" :class="{ 'z-layout--full': props.fullHeight }" :data-collapsed="props.collapsed ? 'true' : 'false'" :style="cssVars">
    <header class="z-layout__header" :class="{ 'z-layout__header--sticky': props.stickyHeader }">
      <slot name="header" :toggle="toggle" :collapsed="props.collapsed" />
    </header>
    <aside class="z-layout__sidebar" :data-collapsed="props.collapsed ? 'true' : 'false'">
      <slot name="sidebar" :collapsed="props.collapsed" :toggle="toggle" />
    </aside>
    <main class="z-layout__content" :class="{ 'z-layout__content--no-scrollbar': props.scrollbar === 'none' }">
      <slot />
    </main>
  </div>
</template>
