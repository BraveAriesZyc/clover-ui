<script setup lang="ts">
    import { computed } from 'vue'
    import { useRouter } from 'vue-router'
    import DisplayPage from '../../components/Layout/DisplayPage.vue'
    const router = useRouter()
    function goDocs() { router.push('/docs/fixed-grid') }

    const items = computed(() => Array.from({ length: 180 }, (_, i) => i + 1))
</script>

<template>
    <DisplayPage title="ZFixedGrid 固定网格" @goDocs="goDocs">
        <div class="gallery">
            <div class="gallery__meta">
                <span>列数：12</span>
                <span>数量：{{ items.length }}</span>
            </div>
            <div class="grid">
                <ZFixedGrid :items="items" :columns="12" :gap="8">
                    <template #cell="{ item }">
                        <div class="cell">#{{ item }}</div>
                    </template>
                </ZFixedGrid>
            </div>
        </div>
    </DisplayPage>
</template>

<style scoped>
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
