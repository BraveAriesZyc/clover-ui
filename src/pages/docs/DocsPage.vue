<script setup lang="ts">
    import { ref, computed, watch } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import docs from '../../data/docs'
    import ComponentApi from '../../components/Api/ComponentApi.vue'

    const route = useRoute()
    const name = computed(() => String(route.params.name || ''))

    const titleMap: Record<string, string> = Object.fromEntries(docs.map((d) => [d.key, d.title]))

    const data = ref<{
        attributes?: any[]
        events?: any[]
        slots?: any[]
        functions?: any[]
        configs?: Array<{ title: string; rows: any[] }>
        types?: any[]
    } | null>(null)


    const docsModules = import.meta.glob('../../demos/docs/*.api.ts')
    async function load(n: string) {
        const entry = Object.keys(docsModules).find((p) => p.endsWith(`/${n}.api.ts`))
        if (!entry) {
            data.value = null
            return
        }
        const mod: any = await (docsModules[entry] as any)()
        const cfgs = [] as Array<{ title: string; rows: any[] }>
        if (mod.configOpenLoading)
            cfgs.push({ title: 'openLoading(options) 配置', rows: mod.configOpenLoading })
        if (mod.configUseLoading)
            cfgs.push({ title: 'useLoading(config) 配置', rows: mod.configUseLoading })
        data.value = {
            attributes: mod.attributes ?? mod.attributesZIcon ?? mod.attributesSvgIcon,
            events: mod.events,
            slots: mod.slots,
            functions: mod.functions,
            types: mod.types,
            configs: cfgs.length ? cfgs : undefined,
        }
    }

    watch(
        name,
        (n) => {
            load(n)
        },
        { immediate: true },
    )
</script>

<template>
    <div class="docs">
        <div class="docs__content">
            <div class="docs__title">{{ titleMap[name] || name }}</div>
            <ComponentApi v-if="data" v-bind="data" />
            <div v-else class="empty">暂未提供文档</div>
        </div>
    </div>
</template>

<style scoped>
    .docs {
        display: flex;

        gap: 12px;
        padding: 16px;
    }

    .docs__content {
        flex: 1;
        padding-left: 4px;
    }
    .docs__title {
        font-weight: 600;
        margin-bottom: 10px;
    }
    .empty {
        color: var(--color-muted);
    }
</style>
