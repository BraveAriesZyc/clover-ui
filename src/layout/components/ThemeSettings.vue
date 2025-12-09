<script setup lang="ts">
    import { ref } from 'vue'
    import { useThemeStore } from '../../stores/theme'
    const theme = useThemeStore()
    const open = defineModel<boolean>({ default: false })
    const colors = [
        '#409eff',
        '#67c23a',
        '#e6a23c',
        '#f56c6c',
        '#2979ff',
        '#9b59b6',
        '#10b981',
        '#ff7a45',
    ]
    const custom = ref('#409eff')
    function pick(c: string) {
        theme.setPrimary(c)
        custom.value = c
        open.value = false
    }
    function applyCustom() {
        theme.setPrimary(custom.value)
        open.value = false
    }
</script>

<template>
    <div v-if="open" class="ts-overlay" @click="open = false"></div>
    <div v-if="open" class="ts-panel">
        <div class="ts-title">
            <span>主题设置</span>
            <button class="ts-close" @click="open = false" aria-label="close">
                <ZIcon name="bx:x" />
            </button>
        </div>
        <div class="ts-grid">
            <button
                v-for="c in colors"
                :key="c"
                class="ts-swatch"
                :style="{ background: c }"
                @click="pick(c)"
            ></button>
        </div>
        <div class="ts-custom">
            <input class="ts-input" type="color" v-model="custom" />
            <button class="ts-apply" @click="applyCustom">应用</button>
        </div>
    </div>
</template>

<style scoped>
    .ts-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.25);
        backdrop-filter: blur(2px);
        z-index: 40;
    }
    .ts-panel {
        position: fixed;
        right: 16px;
        top: 68px;
        z-index: 41;
        width: 300px;
        background: var(--color-bg);
        color: var(--color-text);
        border: 1px solid var(--color-border);
        border-radius: 12px;
        box-shadow: 0 12px 28px rgba(0, 0, 0, 0.16);
        padding: 14px;
        transform: translateY(-6px);
        opacity: 0;
        animation: ts-in 120ms ease-out forwards;
    }
    .ts-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        font-weight: 600;
        margin-bottom: 12px;
    }
    .ts-close {
        width: 28px;
        height: 28px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: 1px solid var(--color-border);
        border-radius: 999px;
        background: var(--color-bg);
        color: var(--color-text);
    }
    .ts-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;
    }
    .ts-swatch {
        width: 100%;
        height: 36px;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        box-shadow: 0 1px 0 rgba(0, 0, 0, 0.04);
    }
    .ts-swatch:focus-visible {
        outline: 0;
        box-shadow: 0 0 0 4px var(--focus-ring);
    }
    .ts-custom {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-top: 14px;
    }
    .ts-input {
        flex: 1;
        height: 34px;
        border: 1px solid var(--color-border);
        border-radius: 10px;
        background: var(--color-bg);
        box-shadow: inset 0 1px 0 rgba(0, 0, 0, 0.06);
    }
    .ts-input::-webkit-color-swatch-wrapper {
        padding: 4px;
        border-radius: 8px;
    }
    .ts-input::-webkit-color-swatch {
        border: none;
        border-radius: 8px;
    }
    .ts-input::-moz-color-swatch {
        border: none;
        border-radius: 8px;
    }
    .ts-apply {
        height: 34px;
        padding: 0 12px;
        border: 1px solid var(--color-border);
        border-radius: 8px;
        background: var(--color-bg);
        color: var(--color-text);
    }
    .ts-apply:hover {
        border-color: var(--color-border-hover);
    }

    @keyframes ts-in {
        from {
            transform: translateY(-6px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }

    @media (max-width: 520px) {
        .ts-panel {
            right: 12px;
            left: 12px;
            width: auto;
        }
        .ts-grid {
            grid-template-columns: repeat(3, 1fr);
        }
    }
</style>
