<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import DisplayPage from '../../components/Layout/DisplayPage.vue'
import Sidebar from '../../layout/components/Sidebar.vue'
import ThemeSettings from '../../layout/components/ThemeSettings.vue'
import { useThemeStore } from '@/stores/theme.ts'
const collapsed = ref(false)
const theme = useThemeStore()
const showSettings = ref(false)
const router = useRouter()
function goDocs() {
  router.push('/docs/layout')
}
</script>

<template>
  <DisplayPage title="ZLayout 通用布局" @goDocs="goDocs">
    <ZLayout
      v-model:collapsed="collapsed"
      :header-height="52"
      :sidebar-width="200"
      :collapsed-width="72"
      fullHeight
      stickyHeader
      :contentPadding="16"
      scrollbar="none"
    >
      <template #header="{ toggle }">
        <ZLayoutHeader>
          <div class="brand">
            <ZIcon name="ri:leaf-line" size="md" />
            <span class="brand__name">Clover UI</span>
          </div>
          <div class="actions">

            <button class="btn" @click="theme.toggle()" :title="theme.state.theme === 'light' ? '切换到暗色' : '切换到浅色'">
              <ZIcon :name="theme.state.theme === 'light' ? 'ri:moon-line' : 'ri:sun-line'" />
              <span>主题</span>
            </button>
            <button class="btn" @click="showSettings = true" title="主题设置">
              <ZIcon name="ri:palette-line" />
              <span>设置</span>
            </button>
          </div>
        </ZLayoutHeader>
      </template>
      <template #sidebar="{ toggle, collapsed }">
        <ZLayoutSidebar :collapsed="collapsed">
          <Sidebar :collapsed="collapsed" :toggle="toggle" />
        </ZLayoutSidebar>
      </template>
      <ZLayoutContent>
        <div class="content">
          <div class="card">内容区域</div>
        </div>
      </ZLayoutContent>
    </ZLayout>
    <ThemeSettings v-model="showSettings" />
  </DisplayPage>
</template>

<style scoped>

.brand { display:flex; align-items:center; gap:8px; font-weight:700; }
.brand__name { letter-spacing:.3px; }
.actions { display:flex; gap:8px; }
.btn { display:flex; align-items:center; justify-content:center; gap:6px; height:28px; padding: 0 10px; border: 1px solid var(--color-border); border-radius: 6px; background: var(--color-bg); color: var(--color-muted); cursor: pointer; }
.content { padding:12px; }
.card { border:1px solid var(--color-border); border-radius:8px; padding:12px; background: var(--color-bg); }
</style>
