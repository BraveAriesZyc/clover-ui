<script setup lang="ts">
    import { computed } from 'vue'
    import { useRouter } from 'vue-router'
    const router = useRouter()
    function goDocs() {
        router.push('/docs/virtual-grid')
    }

    const items = computed(() => Array.from({ length: 2000 }, (_, i) => i + 1))
</script>

<template>
    <div class="section">
        <div class="section__title">
            ZVirtualGrid 虚拟网格
            <ZButton size="sm" variant="default" @click="goDocs">文档</ZButton>
        </div>
        <div class="gallery">
            <div class="gallery__meta">
                <span>可视渲染：窗口内</span>
                <span>数量：{{ items.length }}</span>
            </div>
            <div class="grid">
                <ZVirtualGrid :items="items" :item-width="160" :item-height="64" :gap="8">
                    <template #cell="{ item }">
                        <div class="cell">#{{ item }}</div>
                    </template>
                </ZVirtualGrid>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .section {
        padding: 16px;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    .section__title {
        font-weight: 600;
        margin-bottom: 10px;
    }
    .gallery {
        flex: 1;
        min-height: 0;
        display: flex;
        flex-direction: column;
    }
    .gallery__meta {
        display: flex;
        gap: 16px;
        color: var(--color-muted);
        font-size: 12px;
        margin-bottom: 8px;
    }
    .grid {
        display: block;
        flex: 1;
        min-height: 0;
    }
    .cell {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 64px;
        border: 1px solid var(--color-border);
        border-radius: 8px;
        background: var(--color-bg);
        color: var(--color-muted);
    }
</style>
