<script setup lang="ts">
    const props = defineProps<{
        title: string
        columns: Array<{ key: string; label: string }>
        rows: Array<Record<string, any>>
    }>()
</script>

<template>
    <div class="doc-section">
        <div class="doc-section__title">{{ props.title }}</div>
        <table class="doc-table">
            <thead>
                <tr>
                    <th v-for="c in props.columns" :key="c.key">{{ c.label }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(r, i) in props.rows" :key="i">
                    <td v-for="c in props.columns" :key="c.key">
                        <span v-if="typeof r[c.key] === 'string'">{{ r[c.key] }}</span>
                        <span v-else-if="Array.isArray(r[c.key])">{{
                            (r[c.key] as any[]).join(', ')
                        }}</span>
                        <span v-else>{{ r[c.key] }}</span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
    .doc-section {
        margin-top: 16px;
    }
    .doc-section__title {
        font-weight: 600;
        margin-bottom: 8px;
    }
    .doc-table {
        width: 100%;
        border-collapse: collapse;
    }
    .doc-table th,
    .doc-table td {
        border: 1px solid var(--color-border);
        padding: 8px;
        text-align: left;
        font-size: 13px;
    }
    .doc-table thead th {
        background: var(--color-bg-mute);
    }
</style>
