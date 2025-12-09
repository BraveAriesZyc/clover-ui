<script setup lang="ts">
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'
    const router = useRouter()
    function goDocs() {
        router.push('/docs/scroll-chips')
    }

    const items = Array.from({ length: 100 }, (_, i) => ({
        label: `标签 ${i + 1}`,
        value: String(i + 1),
    }))
    const selected = ref<string>('1')
</script>

<template>
    <div class="section">
        <div class="section__title">
            ScrollChips Demo <ZButton size="sm" variant="default" @click="goDocs">文档</ZButton>
        </div>

        <div class="row">
            <ZScrollChips
                v-model="selected"
                :items="items"
                buttonSize="sm"
                activeVariant="primary"
                inactiveVariant="default"
                :scrollAmount="240"
                :centerOnSelect="true"
                :snapCenter="true"
                :smoothScroll="true"
                markerDirection="lr"
            />
        </div>

        <div class="row">
            <div>当前选中：{{ selected }}</div>
        </div>

        <div class="row">
            <ZScrollChips
                v-model="selected"
                :items="items"
                buttonSize="md"
                activeVariant="success"
                inactiveVariant="secondary"
                :scrollAmount="320"
                :centerOnSelect="false"
                :smoothScroll="true"
                markerDirection="lr"
            />
        </div>

        <div class="row">
            <ZScrollChips
                v-model="selected"
                :items="items"
                buttonSize="lg"
                activeVariant="warning"
                inactiveVariant="default"
                :scrollAmount="200"
                :centerOnSelect="true"
                :smoothScroll="true"
                markerDirection="ud"
            />
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
        margin-bottom: 16px;
        width: 100%;
    }
</style>
