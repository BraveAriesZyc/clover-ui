<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const search = ref('')
const modules = import.meta.glob('/src/assets/icons/**/*.svg')
const all = Object.keys(modules).map(p => p.replace('/src/assets/icons/', '').replace(/\.svg$/, ''))

const names = computed(() => {
  const q = search.value.trim().toLowerCase()
  return q ? all.filter(n => n.toLowerCase().includes(q)) : all
})
</script>

<template>
  <div class="section">
    <div class="section__title">SVG Icons <ZButton size="sm" variant="default" @click="() => router.push('/docs/svg')">文档</ZButton></div>
    <div class="tools">
      <input class="search" v-model="search" placeholder="搜索本地 SVG（按名称包含）"/>
    </div>

    <div class="gallery">
      <div class="gallery__meta">
        <span>数量：{{ names.length }}</span>
      </div>
      <div class="grid">
        <ZVirtualGrid :items="names" :columns="12" :gap="8" :item-width="160" :item-height="44" :buffer-rows="1" edge-gutters>
          <template #cell="{ item }">
            <div class="cell" :title="item">
              <ZIcon :icon="`svg-icon:${item}`" size="24"/>
              <span class="cell__name">{{ item }}</span>
            </div>
          </template>
        </ZVirtualGrid>
      </div>
    </div>
  </div>
</template>

<style scoped>
.section { padding: 16px; display: flex; flex-direction: column; }
.section__title { font-weight: 600; margin-bottom: 10px; }
.tools { position: sticky; top: 0; z-index: 5; display: flex; align-items: center; gap: 12px; margin-bottom: 12px; flex-wrap: wrap; padding: 8px 0; background: var(--color-bg); border-bottom: 1px solid var(--color-border); }
.search { height: 28px; padding: 0 8px; border: 1px solid var(--color-border); border-radius: 6px; background: var(--color-bg); color: var(--color-text); min-width: 220px; }
.gallery__meta { display: flex; gap: 16px; color: var(--color-muted); font-size: 12px; margin-bottom: 8px; }
.gallery { flex: 1; min-height: 0; display: flex; flex-direction: column; }
.grid { display: block; flex: 1; min-height: 0; }
.cell { display: grid; grid-template-columns: 28px 1fr; align-items: center; gap: 8px; padding: 8px; border: 1px solid var(--color-border); border-radius: 8px; background: var(--color-bg); }
.cell__name { overflow: hidden; white-space: nowrap; text-overflow: ellipsis; font-size: 12px; color: var(--color-muted); }
</style>
