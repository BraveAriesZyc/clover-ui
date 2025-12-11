<script setup lang="ts">
import Sidebar from '../components/Sidebar.vue'
import ThemeSettings from '../components/ThemeSettings.vue'
import {useThemeStore} from '@/stores/theme.ts'
import {ref} from 'vue'

const collapsed = ref(false)
const theme = useThemeStore()
const showSettings = ref(false)
</script>

<template>

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
                <div class="header_box">
                    <div class="sidebar__title">

                        <button
                            class="app-action"
                            @click="toggle"
                            :title="collapsed ? '展开' : '折叠'"
                        >
                            <ZIcon :name="collapsed ? 'bx:chevrons-right' : 'bx:chevrons-left'"/>
                        </button>
                    </div>
                    <div class="app-actions">

                        <button
                            class="app-action"
                            @click="theme.toggle()"
                            :title="theme.state.theme === 'light' ? '切换到暗色' : '切换到浅色'"
                        >
                            <ZIcon :name="theme.state.theme === 'light' ? 'ri:moon-line' : 'ri:sun-line'"/>
                        </button>
                        <button class="app-action" @click="showSettings = true" title="主题设置">
                            <ZIcon name="ri:palette-line"/>
                        </button>
                    </div>
                </div>
            </ZLayoutHeader>
        </template>
        <template #sidebar="{ toggle, collapsed }">
            <ZLayoutSidebar :collapsed="collapsed">
                <Sidebar :collapsed="collapsed" :toggle="toggle">
               <template #header>
                   <span class="sidebar__brand">Clover UI</span>
               </template>
                </Sidebar>
            </ZLayoutSidebar>
        </template>
        <ZLayoutContent>
            <div class="content">
                <slot/>
            </div>
        </ZLayoutContent>
        <ThemeSettings v-model="showSettings"/>
    </ZLayout>

</template>

<style scoped>

.header_box {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
}

 .sidebar__brand{
     color: var(--color-muted);
 }
.app-actions {

    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
    flex-shrink: 0;
}

.app-action {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 28px;
    border: 1px solid var(--color-border);
    border-radius: 6px;
    background: var(--color-bg);
    color: var(--color-muted);
    cursor: pointer;
}

.app-action:hover {
    border-color: var(--color-border-hover);
}


.content {
    flex: 1;
    padding: 16px;
    overflow: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
}

.content::-webkit-scrollbar {
    width: 0;
    height: 0;
}
</style>
