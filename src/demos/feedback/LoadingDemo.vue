<script setup lang="ts">
    import { ref } from 'vue'
    import { useLoading, openLoading } from '../../../packages/index'
    import { useRouter } from 'vue-router'
    const router = useRouter()
    function goDocs() {
        router.push('/docs/loading')
    }

    let manual: ReturnType<typeof openLoading> | null = null
    function manualStart() {
        manual = openLoading({ text: '手动开启', mask: true, variant: 'primary' })
    }
    function manualStop() {
        manual?.close()
        manual = null
    }

    function autoStart() {
        openLoading({ text: '自动关闭', mask: true, variant: 'success', duration: 1500 })
    }

    const localEl = ref<HTMLElement | null>(null)
    function localStart() {
        const loader = useLoading(undefined, {
            text: '局部加载',
            mask: true,
            variant: 'blue',
            target: localEl.value!,
        })
        loader.startLoading()
        setTimeout(() => loader.stopLoading(), 1500)
    }

    const variants = [
        'primary',
        'default',
        'danger',
        'success',
        'warning',
        'info',
        'secondary',
        'blue',
    ] as const
    function showVariant(v: (typeof variants)[number]) {
        openLoading({ text: `加载中（${v}）`, mask: true, variant: v, duration: 1200 })
    }
</script>

<template>
    <div class="section">
        <div class="section__title">
            Loading 加载 <ZButton size="sm" variant="default" @click="goDocs">文档</ZButton>
        </div>
        <div class="row">
            <ZButton variant="primary" @click="manualStart">手动开启</ZButton>
            <ZButton variant="default" @click="manualStop">手动关闭</ZButton>
            <ZButton variant="success" @click="autoStart">自动关闭</ZButton>
        </div>
        <div class="row">
            <div ref="localEl" class="local-box">
                <div class="local-content">这里是局部容器内容</div>
                <ZButton variant="blue" size="sm" @click="localStart">局部加载</ZButton>
            </div>
        </div>
        <div class="row">
            <ZButton v-for="v in variants" :key="v" :variant="v" @click="showVariant(v)">
                变体：{{ v }}
            </ZButton>
        </div>
    </div>
</template>

<style scoped>
    .section {
        padding: 16px;
    }

    .section__title {
        font-weight: 600;
        margin-bottom: 10px;
    }

    .row {
        display: flex;
        gap: 12px;
        align-items: center;
        flex-wrap: wrap;
        margin-bottom: 12px;
    }
    .local-box {
        position: relative;
        width: 360px;
        height: 180px;
        border: 1px solid var(--color-border);
        border-radius: 10px;
        padding: 12px;
        display: flex;
        gap: 12px;
        align-items: center;
        justify-content: space-between;
    }
    .local-content {
        color: var(--color-text);
    }
</style>
