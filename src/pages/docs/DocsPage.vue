<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import docs from '../../data/docs'
import ComponentApi from '../../components/Api/ComponentApi.vue'

const route = useRoute()
const router = useRouter()
const name = computed(() => String(route.params.name || ''))

const titleMap: Record<string, string> = Object.fromEntries(docs.map(d => [d.key, d.title]))

const data = ref<{ attributes?: any[]; events?: any[]; slots?: any[]; functions?: any[]; configs?: Array<{ title: string; rows: any[] }>; types?: any[] } | null>(null)

const docItems = docs.map(d => ({ key: d.key, label: d.title }))

function nav(to: string) {
  router.push({ name: 'docsPage', params: { name: to } })
}

const docsModules = import.meta.glob('../../demos/docs/*.api.ts')
async function load(n: string) {
  const entry = Object.keys(docsModules).find(p => p.endsWith(`/${n}.api.ts`))
  if (!entry) { data.value = null; return }
  const mod: any = await (docsModules[entry] as any)()
  const cfgs = [] as Array<{ title: string; rows: any[] }>
  if (mod.configOpenLoading) cfgs.push({ title: 'openLoading(options) 配置', rows: mod.configOpenLoading })
  if (mod.configUseLoading) cfgs.push({ title: 'useLoading(config) 配置', rows: mod.configUseLoading })
  data.value = {
    attributes: mod.attributes ?? mod.attributesZIcon ?? mod.attributesSvgIcon,
    events: mod.events,
    slots: mod.slots,
    functions: mod.functions,
    types: mod.types,
    configs: cfgs.length ? cfgs : undefined,
  }
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
