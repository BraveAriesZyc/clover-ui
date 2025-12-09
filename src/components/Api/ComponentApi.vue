<script setup lang="ts">
    import DocTable from './DocTable.vue'

    type Row = Record<string, any>

    const props = defineProps<{
        attributes?: Row[]
        events?: Row[]
        slots?: Row[]
        functions?: Row[]
        configs?: Array<{ title: string; rows: Row[] }>
        types?: Array<{ name: string; definition: string; usage: string }>
    }>()

    const attrColumns = [
        { key: 'name', label: '属性' },
        { key: 'description', label: '说明' },
        { key: 'type', label: '类型' },
        { key: 'values', label: '可选值' },
        { key: 'default', label: '默认值' },
    ]

    const eventColumns = [
        { key: 'name', label: '事件' },
        { key: 'description', label: '说明' },
        { key: 'parameters', label: '参数' },
    ]

    const slotColumns = [
        { key: 'name', label: '插槽' },
        { key: 'description', label: '说明' },
    ]

    const funcColumns = [
        { key: 'name', label: '方法' },
        { key: 'description', label: '说明' },
        { key: 'parameters', label: '参数' },
        { key: 'returns', label: '返回' },
    ]

    const configColumns = [
        { key: 'name', label: '配置项' },
        { key: 'description', label: '说明' },
        { key: 'type', label: '类型' },
        { key: 'default', label: '默认值' },
    ]

    const typeColumns = [
        { key: 'name', label: '类型名' },
        { key: 'definition', label: '类型定义' },
        { key: 'usage', label: '作用/用途' },
    ]
</script>

<template>
    <div class="component-api">
        <DocTable
            v-if="props.attributes && props.attributes.length"
            title="属性"
            :columns="attrColumns"
            :rows="props.attributes"
        />
        <DocTable
            v-if="props.events && props.events.length"
            title="事件"
            :columns="eventColumns"
            :rows="props.events"
        />
        <DocTable
            v-if="props.slots && props.slots.length"
            title="插槽"
            :columns="slotColumns"
            :rows="props.slots"
        />
        <DocTable
            v-if="props.functions && props.functions.length"
            title="方法"
            :columns="funcColumns"
            :rows="props.functions"
        />
        <template v-if="props.configs && props.configs.length">
            <DocTable
                v-for="cfg in props.configs"
                :key="cfg.title"
                :title="cfg.title"
                :columns="configColumns"
                :rows="cfg.rows"
            />
        </template>
        <DocTable
            v-if="props.types && props.types.length"
            title="类型"
            :columns="typeColumns"
            :rows="props.types"
        />
    </div>
</template>

<style scoped>
    .component-api {
        margin-top: 16px;
    }
</style>
