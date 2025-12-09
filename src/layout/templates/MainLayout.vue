<script setup lang="ts">
    import Sidebar from '../components/Sidebar.vue'
    import ThemeSettings from '../components/ThemeSettings.vue'
    import { useThemeStore } from '../../stores/theme'
    import { ref } from 'vue'
    const theme = useThemeStore()
    const showSettings = ref(false)
</script>

<template>
    <div class="layout">
        <header class="app-header">
            <div class="app-title">Clover UI</div>
            <div class="app-actions">
                <button
                    class="app-action"
                    @click="theme.toggle()"
                    :title="theme.state.theme === 'light' ? '切换到暗色' : '切换到浅色'"
                >
                    <ZIcon :name="theme.state.theme === 'light' ? 'ri:moon-line' : 'ri:sun-line'" />
                </button>
                <button class="app-action" @click="showSettings = true" title="主题设置">
                    <ZIcon name="ri:palette-line" />
                </button>
            </div>
        </header>
        <div class="layout__body">
            <Sidebar />
            <main class="content">
                <slot />
            </main>
        </div>
        <ThemeSettings v-model="showSettings" />
    </div>
</template>

<style scoped>
    .layout {
        height: 100vh;
        background: var(--layout-bg);
    }
    .app-header {
        height: 52px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 16px;
        background: var(--layout-header-bg);
        color: var(--color-text);
        font-weight: 600;
        border-bottom: 1px solid var(--layout-border);
        box-sizing: border-box;
    }
    .app-title {
        font-weight: 600;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .app-actions {
        display: flex;
        align-items: center;
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
    .layout__body {
        display: flex;
        height: calc(100vh - 52px - 1px);
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
