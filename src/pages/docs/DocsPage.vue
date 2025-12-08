<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ComponentApi from '../../components/Api/ComponentApi.vue'

const route = useRoute()
const router = useRouter()
const name = computed(() => String(route.params.name || ''))

const titleMap: Record<string, string> = {
  'button': 'Button 按钮',
  'input': 'Input 输入框',
  'card': 'Card 卡片',
  'scroll-chips': 'ScrollChips 滚动标签',
  'fixed-grid': 'ZFixedGrid 固定网格',
  'virtual-grid': 'ZVirtualGrid 虚拟网格',
  'loading': 'Loading 加载',
  'icon': 'Icon 图标',
  'svg': 'SVG 图标',
}

const data = ref<{ attributes?: any[]; events?: any[]; slots?: any[]; functions?: any[]; configs?: Array<{ title: string; rows: any[] }> } | null>(null)

const docItems = [
  { key: 'button', label: 'Button 按钮' },
  { key: 'input', label: 'Input 输入框' },
  { key: 'card', label: 'Card 卡片' },
  { key: 'scroll-chips', label: 'ScrollChips 滚动标签' },
  { key: 'fixed-grid', label: 'ZFixedGrid 固定网格' },
  { key: 'virtual-grid', label: 'ZVirtualGrid 虚拟网格' },
  { key: 'loading', label: 'Loading 加载' },
  { key: 'icon', label: 'Icon 图标' },
  { key: 'svg', label: 'SVG 图标' },
]

function nav(to: string) {
  router.push({ name: 'docsPage', params: { name: to } })
}

async function load(n: string) {
  if (n === 'button') {
    const mod = await import('../../demos/docs/button.api.ts')
    data.value = { attributes: mod.attributes, events: mod.events, slots: mod.slots }
    return
  }
  if (n === 'input') {
    const mod = await import('../../demos/docs/input.api.ts')
    data.value = { attributes: mod.attributes, events: mod.events, slots: mod.slots, types: mod.types }
    return
  }
  if (n === 'card') {
    const mod = await import('../../demos/docs/card.api.ts')
    data.value = { attributes: mod.attributes, slots: mod.slots }
    return
  }
  if (n === 'scroll-chips') {
    const mod = await import('../../demos/docs/scroll-chips.api.ts')
    data.value = { attributes: mod.attributes, events: mod.events, types: mod.types }
    return
  }
  if (n === 'fixed-grid') {
    const mod = await import('../../demos/docs/fixed-grid.api.ts')
    data.value = { attributes: mod.attributes, slots: mod.slots }
    return
  }
  if (n === 'virtual-grid') {
    const mod = await import('../../demos/docs/virtual-grid.api.ts')
    data.value = { attributes: mod.attributes, slots: mod.slots }
    return
  }
  if (n === 'loading') {
    const mod = await import('../../demos/docs/loading.api.ts')
    data.value = { attributes: mod.attributes, functions: mod.functions, configs: [
      { title: 'openLoading(options) 配置', rows: mod.configOpenLoading },
      { title: 'useLoading(config) 配置', rows: mod.configUseLoading },
    ] }
    return
  }
  if (n === 'icon') {
    const mod = await import('../../demos/docs/icon.api.ts')
    data.value = { attributes: mod.attributesZIcon }
    return
  }
  if (n === 'svg') {
    const mod = await import('../../demos/docs/icon.api.ts')
    data.value = { attributes: mod.attributesSvgIcon }
    return
  }
  data.value = null
}

watch(name, n => { load(n) }, { immediate: true })
</script>

<template>
  <div class="docs">
    <aside class="docs__sidebar">
      <div class="docs__sidebar-title">文档目录</div>
      <div class="docs__sidebar-items">
        <button
          v-for="it in docItems"
          :key="it.key"
          class="docs__sidebar-item"
          :data-active="name === it.key ? 'true' : 'false'"
          @click="nav(it.key)"
        >{{ it.label }}</button>
      </div>
    </aside>
    <div class="docs__content">
      <div class="docs__title">{{ titleMap[name] || name }}</div>
      <ComponentApi v-if="data" v-bind="data" />
      <div v-else class="empty">暂未提供文档</div>
    </div>
  </div>
  
</template>

<style scoped>
.docs { display: grid; grid-template-columns: 220px 1fr; gap: 12px; padding: 16px; }
.docs__sidebar { border-right: 1px solid var(--color-border); padding-right: 12px; }
.docs__sidebar-title { font-weight: 600; font-size: 12px; color: var(--color-muted); margin-bottom: 8px; }
.docs__sidebar-items { display: flex; flex-direction: column; gap: 6px; }
.docs__sidebar-item { text-align: left; padding: 6px 8px; border-radius: 6px; border: none; background: transparent; cursor: pointer; color: var(--color-text); }
.docs__sidebar-item:hover { background: var(--color-bg-muted); }
.docs__sidebar-item[data-active="true"] { color: var(--color-primary); background: var(--nav-active-bg); }
.docs__content { padding-left: 4px; }
.docs__title { font-weight: 600; margin-bottom: 10px; }
.empty { color: var(--color-muted); }
</style>
